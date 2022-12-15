import {
  isReady,
  shutdown,
  Mina,
  PrivateKey,
  PublicKey,
  AccountUpdate,
} from 'snarkyjs';
import { Voracle } from './Voracle';

/*
 * This file specifies how to test the `Add` example smart contract. It is safe to delete this file and replace
 * with your own tests.
 *
 * See https://docs.minaprotocol.com/zkapps for more info.
 */

let proofsEnabled = false;

describe('Voracle', () => {
  let deployerAccount: PrivateKey,
    zkAppAddress: PublicKey,
    zkAppPrivateKey: PrivateKey,
    zkApp: Voracle;

  beforeAll(async () => {
    await isReady;
    if (proofsEnabled) Voracle.compile();
  });

  beforeEach(() => {
    const Local = Mina.LocalBlockchain({ proofsEnabled });
    Mina.setActiveInstance(Local);
    deployerAccount = Local.testAccounts[0].privateKey;
    zkAppPrivateKey = PrivateKey.random();
    zkAppAddress = zkAppPrivateKey.toPublicKey();
    zkApp = new Voracle(zkAppAddress);
  });

  afterAll(() => {
    // `shutdown()` internally calls `process.exit()` which will exit the running Jest process early.
    // Specifying a timeout of 0 is a workaround to defer `shutdown()` until Jest is done running all tests.
    // This should be fixed with https://github.com/MinaProtocol/mina/issues/10943
    setTimeout(shutdown, 0);
  });

  async function localDeploy() {
    const txn = await Mina.transaction(deployerAccount, () => {
      AccountUpdate.fundNewAccount(deployerAccount);
      zkApp.deploy();
    });
    await txn.prove();
    // this tx needs .sign(), because `deploy()` adds an account update that requires signature authorization
    await txn.sign([zkAppPrivateKey]).send();
  }

  it('update ', async () => {
    await localDeploy();
    


    // const num = zkApp.num.get();
    // expect(num).toEqual(Field(1));
  });

  it('correctly updates the num state on the `Add` smart contract', async () => {
    await localDeploy();

    // // update transaction
    // const txn = await Mina.transaction(deployerAccount, () => {
    //   zkApp.update();
    // });
    // await txn.prove();
    // await txn.send();

    // const updatedNum = zkApp.num.get();
    // expect(updatedNum).toEqual(Field(3));
  });
});
