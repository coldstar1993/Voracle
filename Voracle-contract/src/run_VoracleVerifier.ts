import {
    AccountUpdate,
    isReady,
    Mina,
    PrivateKey,
    PublicKey,
    shutdown,
} from 'snarkyjs';
import { VoracleVerifier } from './VoracleVerifier.js';

let proofsEnabled = true;

let deployerAccount: PrivateKey,
    zkAppAddress: PublicKey,
    zkAppPrivateKey: PrivateKey,
    zkApp: VoracleVerifier;


await isReady;
if (proofsEnabled) await VoracleVerifier.compile();
console.log('........');

const Local = Mina.LocalBlockchain({ proofsEnabled });
Mina.setActiveInstance(Local);
deployerAccount = Local.testAccounts[0].privateKey;
zkAppPrivateKey = PrivateKey.random();
zkAppAddress = zkAppPrivateKey.toPublicKey();
zkApp = new VoracleVerifier(zkAppAddress);


async function localDeploy() {
    const txn = await Mina.transaction(deployerAccount, () => {
        AccountUpdate.fundNewAccount(deployerAccount);
        zkApp.deploy();
    });
    await txn.prove();
    // this tx needs .sign(), because `deploy()` adds an account update that requires signature authorization
    await txn.sign([zkAppPrivateKey]).send();
}

await localDeploy();






setTimeout(shutdown, 0);