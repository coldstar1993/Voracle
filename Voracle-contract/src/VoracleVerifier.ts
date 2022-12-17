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
  }

  /**
   * old key cannot equal to new key.
   * @param voracleAddr 
   */
  @method changeVoracleAddr(voracleAddr: PublicKey) {
    const vaddr = this.voracleAddr.get();
    vaddr.assertEquals(this.voracleAddr.get());

    Circuit.if(vaddr.equals(voracleAddr), (() => { Field(0).assertEquals(Field(1)) })(), (() => {
      this.voracleAddr.set(voracleAddr);
    })());
  }

  @method verifySig(data: CircuitString, sig: Signature, fetcherPk: PublicKey) {
    const vaddr = this.voracleAddr.get();
    this.voracleAddr.assertEquals(vaddr);

    const vocl = new Voracle(this.voracleAddr.get());
    const fetcherPKList = vocl.fetcherPKList.get();
    vocl.fetcherPKList.assertEquals(fetcherPKList);



    sig.verify(fetcherPk, [Poseidon.hash(data.toFields())]).assertTrue();
  }
}
