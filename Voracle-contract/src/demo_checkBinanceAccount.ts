/* eslint-disable no-unused-vars */
import { Field, SmartContract, state, State, method, Struct, DeployArgs, Permissions, PublicKey, Poseidon, CircuitString, Signature, Bool, Circuit, UInt32, UInt64 } from 'snarkyjs';
import { VoracleVerifier } from "./VoracleVerifier.js";

export class BinanceAccount extends Struct({
  apiKey: Field,
  asset:CircuitString, 
  free: Field, 
  locked: Field,
  timestamp: UInt64, 
}) { }

export class BinanceAccountProof extends Struct({
  proof:{
    binanceAccount: BinanceAccount,
    fetcherPk: PublicKey,
    signature: Signature
  }
}) { }

/** 3 proofs only Since just 3 fetcher nodes currently */
export class BinanceAccountProofList extends Struct({
  proofList:[BinanceAccountProof, BinanceAccountProof, BinanceAccountProof]
}) { }

/**
 * verify Account info (confirmed by fetchers)
 */
export class BinanceAccountVerifier extends SmartContract {
  @state(PublicKey) voracleVerifier = State<PublicKey>();
  
  deploy(args?: DeployArgs) {
    super.deploy(args);
    this.setPermissions({
      ...Permissions.default(),
      editState: Permissions.signature(),// must be 'signature' & cannot be 'proof'.
    });
    this.voracleVerifier.set(PublicKey.fromBase58('B62qmw27apC4GW9w4nze8AZy8vLSFoDq2kbVWZkP6LnnbUdTrAbf7mJ'));
  }

  /**
   * verify if user's btc balance inside Binance has been greater than or equal 1btc last 24h.
   */
  @method verifyBalance_ge_1btc_inLast24h(binanceAccountProofList: BinanceAccountProofList) {
    const vv=this.voracleVerifier.get();
    this.voracleVerifier.assertEquals(vv);

    const nwTimestamp = this.network.timestamp.get();
    this.network.timestamp.assertEquals(nwTimestamp);

    let voracleVerifierObj = new VoracleVerifier(vv);
    
    binanceAccountProofList.proofList.forEach(aProof => {
      let apiKey: Field = aProof.proof.binanceAccount.apiKey;
      let asset:CircuitString = aProof.proof.binanceAccount.asset;
      let free: Field = aProof.proof.binanceAccount.free;
      let locked: Field = aProof.proof.binanceAccount.locked;
      let timestamp0: UInt64 = aProof.proof.binanceAccount.timestamp;
      let fetcherPk0 = aProof.proof.fetcherPk;
      let sig0 = aProof.proof.signature;

      // check timestamp
      nwTimestamp.sub(timestamp0).assertLte(UInt64.from(24*60*60*1000));

      // check asset type
      CircuitString.fromString('BTC').assertEquals(asset);

      // check free + locked >= 1btc
      free.add(locked).assertGte(Field(1e8));

      // hash
      let hash0 = Poseidon.hash([apiKey, ...asset.toFields(), free, locked, ...timestamp0.toFields()]);
      // verfiy sig
      voracleVerifierObj.verifySig(hash0, sig0, fetcherPk0);

    });

  }
}
