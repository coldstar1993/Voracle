/* eslint-disable no-unused-vars */
import { Field, SmartContract, state, State, method, Struct, DeployArgs, Permissions, PublicKey, Poseidon, CircuitString, Signature, Bool, Circuit, UInt32 } from 'snarkyjs';
import { Voracle } from "./Voracle.js";

export class VoracleVerifier extends SmartContract {
  @state(PublicKey) voracleAddr = State<PublicKey>();

  deploy(args?: DeployArgs) {
    super.deploy(args);
    this.setPermissions({
      ...Permissions.default(),
      editState: Permissions.proofOrSignature(),
    });
    this.voracleAddr.set(PublicKey.fromBase58('B62qjUdKdPu4aqm1jwi9Zuwi8Vm31k9sPVKiu9bwH8kS25CTg3wf3yr'));
  }

  /**
   * old key cannot equal to new key.
   * @param voracleAddr0 
   */
  @method changeVoracleAddr(voracleAddr0: PublicKey) {
    const vaddr = this.voracleAddr.get();
    this.voracleAddr.assertEquals(vaddr);

    this.voracleAddr.set(voracleAddr0);
  }

  @method verifySig(data: CircuitString, sig: Signature, fetcherPk: PublicKey) {
    const vaddr = this.voracleAddr.get();
    this.voracleAddr.assertEquals(vaddr);
    
    const vocl = new Voracle(this.voracleAddr.get());
    const fetcherPKList = vocl.fetcherPKList.get();
    vocl.fetcherPKList.assertEquals(fetcherPKList);

    const fpkHash = Poseidon.hash(fetcherPk.toFields());
    // provided fetcherPkOld must equal to the one at its own position
    fetcherPKList.arr.map(v=>v.equals(fpkHash)).reduce(Bool.or).assertTrue();

    sig.verify(fetcherPk, [Poseidon.hash(data.toFields())]).assertTrue();
  }
}
