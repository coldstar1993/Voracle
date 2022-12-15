/* eslint-disable no-unused-vars */
import { Field, SmartContract, state, State, method, Struct, DeployArgs, Permissions, PublicKey, Poseidon, CircuitString, Signature, Bool, Circuit, UInt32 } from 'snarkyjs';

/**
 * This design is not good to fix the number of '*fetchers*'. 
 * so will use **MerkleMap** & **MerkleMapWitness** to replace this design
 */
export class FetcherPKList extends Struct([
  Field, Field, Field
]) { }

export class Voracle extends SmartContract {
  @state(FetcherPKList) fetcherPKList = State<FetcherPKList>();

  deploy(args?: DeployArgs) {
    super.deploy(args);
    this.setPermissions({
      ...Permissions.default(),
      editState: Permissions.signature(),// must be 'signature' & cannot be 'proof'.
    });

    let fetcher0 = Poseidon.hash(PublicKey.fromBase58("B62qr5gawtLkgKHQNstAbtpyCpbF7eUjs8A1SSZ4d8yN1ge68c8aSds").toFields());
    let fetcher1 = Poseidon.hash(PublicKey.fromBase58("B62qmaGeCZrbSMDjAqBujy1ARCbVAAhDAPpjoKwcAtTn7zkBFMdBmBZ").toFields());
    let fetcher2 = Poseidon.hash(PublicKey.fromBase58("B62qnFsdNiXL1BGNXWWN6GADSnZA3yiq55tq2UyVjXnzeYdFeYPVdq5").toFields());

    this.fetcherPKList.set(FetcherPKList.fromFields([fetcher0, fetcher1, fetcher2]));
  }

  /**
   * zkapp owner will help maintain the fetchers with signature by zkappPrivateKey.
   * 
   * @param fetcherPkOld 
   * @param fetcherPkNew 
   * @param pkIdx 
   */
  @method updateFetcher(fetcherPkOld: PublicKey, fetcherPkNew: PublicKey, pkIdx: UInt32) {
    const indx0 = Number.parseInt(pkIdx.toString());
    const fpkOldTmp = Poseidon.hash(fetcherPkOld.toFields());
    const fpkNewTmp = Poseidon.hash(fetcherPkNew.toFields());

    const fetcherPKList = this.fetcherPKList.get();
    fetcherPKList.forEach((p, idx) => {
      this.fetcherPKList.get()[idx].assertEquals(p);

      Circuit.if(Bool(indx0 != idx), (()=>{
        // fetcherPkNew cannot equal to exising ones
        Circuit.if(Bool(fpkNewTmp.equals(p)), (()=>{Field(1).assertEquals(Field(1))})(), (()=>{})());
      })(), (()=>{
        // provided fetcherPkOld must equal to the one at its own position
        fetcherPKList[indx0].assertEquals(fpkOldTmp);
      })());
    });

    fetcherPKList[Number.parseInt(pkIdx.toString())] = fpkNewTmp;
  }
}
