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

    let fetcher0 = Poseidon.hash(PublicKey.fromBase58("B62qikWxvd7g3smTA6vDEPqeXDnP6LnxU46gKFmB9rdC8ohdnPu1AoL").toFields());
    let fetcher1 = Poseidon.hash(PublicKey.fromBase58("B62qk522nBpiyG8sowkEbao2csaGm6PBtTUwSSLxkg6QTRfVDjG5xdg").toFields());
    let fetcher2 = Poseidon.hash(PublicKey.fromBase58("B62qooLE6R54n9vBkqf5N2w4kzB3ZSvGRXcXATXnX86kpiFp7jCDd7r").toFields());

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
