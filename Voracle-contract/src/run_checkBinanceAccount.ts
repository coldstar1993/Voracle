/* eslint-disable no-unused-vars */
import { AccountUpdate, CircuitString, Field, isReady, Mina, Poseidon, PrivateKey, PublicKey, shutdown, Signature, UInt64 } from 'snarkyjs';

import { Voracle } from "./Voracle.js";
import { VoracleVerifier } from "./VoracleVerifier2.js";
import { BinanceAccount, BinanceAccountProof, BinanceAccountProofList, BinanceAccountVerifier } from './demo_checkBinanceAccount2.js';

await isReady;
let proofsEnabled = true;

let deployerAccount: PrivateKey,
    zkAppBinanceAccountVerifierAddress: PublicKey,
    zkAppBinanceAccountVerifierPrivateKey: PrivateKey,
    zkAppBinanceAccountVerifier: BinanceAccountVerifier;

await Voracle.compile();
console.log('Voracle.compile() done.');
await VoracleVerifier.compile();
console.log('VoracleVerifier.compile() done.');
await BinanceAccountVerifier.compile();
console.log('BinanceAccountVerifier.compile() done.');

const Local = Mina.LocalBlockchain({ proofsEnabled });
Mina.setActiveInstance(Local);
deployerAccount = Local.testAccounts[0].privateKey;

let zkAppVoraclePrivateKey = PrivateKey.random();
let zkAppVoracleAddress = zkAppVoraclePrivateKey.toPublicKey();
let zkAppVoracle = new Voracle(zkAppVoracleAddress);

let zkAppVoracleVerifierPrivateKey = PrivateKey.random();
let zkAppVoracleVerifierAddress = zkAppVoracleVerifierPrivateKey.toPublicKey();
let zkAppVoracleVerifier = new VoracleVerifier(zkAppVoracleVerifierAddress);

zkAppBinanceAccountVerifierPrivateKey = PrivateKey.random();
zkAppBinanceAccountVerifierAddress = zkAppBinanceAccountVerifierPrivateKey.toPublicKey();
zkAppBinanceAccountVerifier = new BinanceAccountVerifier(zkAppBinanceAccountVerifierAddress);

async function localDeployVoracle() {
    const txn = await Mina.transaction(deployerAccount, () => {
        AccountUpdate.fundNewAccount(deployerAccount);
        zkAppVoracle.deploy();
    });
    await txn.prove();
    // this tx needs .sign(), because `deploy()` adds an account update that requires signature authorization
    await txn.sign([zkAppVoraclePrivateKey]).send();
}
await localDeployVoracle();

async function localDeployVoracleVerifier() {
    const txn = await Mina.transaction(deployerAccount, () => {
        AccountUpdate.fundNewAccount(deployerAccount);
        zkAppVoracleVerifier.deploy();
    });
    await txn.prove();
    // this tx needs .sign(), because `deploy()` adds an account update that requires signature authorization
    await txn.sign([zkAppVoracleVerifierPrivateKey]).send();
}
await localDeployVoracleVerifier();

async function localDeployBinanceAccountVerifier() {
    const txn = await Mina.transaction(deployerAccount, () => {
        AccountUpdate.fundNewAccount(deployerAccount);
        zkAppBinanceAccountVerifier.deploy();
    });
    await txn.prove();
    // this tx needs .sign(), because `deploy()` adds an account update that requires signature authorization
    await txn.sign([zkAppBinanceAccountVerifierPrivateKey]).send();
}
await localDeployBinanceAccountVerifier();

const tx1 = await Mina.transaction(deployerAccount, ()=>{
    zkAppVoracleVerifier.changeVoracleAddr(zkAppVoracleAddress);
});
await tx1.prove();
await tx1.sign([zkAppVoracleVerifierPrivateKey]);
await tx1.send();
console.log(`after zkAppVoracleVerifier.voracleAddr: ${zkAppVoracleVerifier.voracleAddr.get().toBase58()}`);

const tx2 = await Mina.transaction(deployerAccount, ()=>{
    zkAppBinanceAccountVerifier.changeVoracleVerifierAddr(zkAppVoracleVerifierAddress);
});
await tx2.prove();
await tx2.sign([zkAppBinanceAccountVerifierPrivateKey]);
await tx2.send();
console.log(`after zkAppBinanceAccountVerifier.voracleVerifier: ${zkAppBinanceAccountVerifier.voracleVerifier.get().toBase58()}`);


// verify if user's btc balance inside Binance has been greater than or equal 1btc last 24h.
// 1. construct responses from 3 fetcher nodes.
// ==============response from fetcher node0
let apiKey0 = Poseidon.hash(CircuitString.fromString('1234REWQ').toFields());
let asset0 = 'BTC';
let free0 = '10000000';
let locked0 = '1100000000';
let timestamp0 = 1671353770000;
let fetcherPk0 = 'EKF9DU363vSSFnp2reh3EeeQYPJBbVWhtU11WxtKpMpf55jPZ3hN';
let pkIdx0 = 0;

// hash
let apiKey01 = Field(apiKey0);
let asset01 = CircuitString.fromString(asset0);
let free01 = Field(free0);
let locked01 = Field(locked0);
let timestamp01 = UInt64.from(timestamp0);
let hash0 = Poseidon.hash([apiKey01, ...asset01.toFields(), free01, locked01, ...timestamp01.toFields()]);
console.log('hash0.toJSON(): '+hash0.toJSON());
// sign
const fetchSig0 = Signature.create(PrivateKey.fromBase58(fetcherPk0), [hash0]).toJSON();

Signature.fromJSON(fetchSig0).verify(PrivateKey.fromBase58(fetcherPk0).toPublicKey(), [hash0]).assertTrue();

const binanceAccount0 = new BinanceAccount({ apiKey: apiKey01, asset: asset01, free: free01, locked: locked01, timestamp: timestamp01 });
const binanceAccountProof0 = new BinanceAccountProof({proof:{
    binanceAccount: binanceAccount0,
    fetcherPk: PrivateKey.fromBase58(fetcherPk0).toPublicKey(),
    signature: Signature.fromJSON(fetchSig0)
}});

// ==============response from fetcher node1
let apiKey1 = Poseidon.hash(CircuitString.fromString('1234REWQ').toFields());
let asset1 = 'BTC';
let free1 = '10000000';
let locked1 = '1100000000';
let timestamp1 = 1671353770000;
let fetcherPk1 = 'EKEyRQWVRPKLcafRzNMvbfUTDSRowXii8xUTCkc9839X1MUqNA81';
let pkIdx1 = 1;

// hash
let apiKey11 = Field(apiKey1);
let asset11 = CircuitString.fromString(asset1);
let free11 = Field(free1);
let locked11 = Field(locked1);
let timestamp11 = UInt64.from(timestamp1);
let hash1 = Poseidon.hash([apiKey11, ...asset11.toFields(), free11, locked11, ...timestamp11.toFields()]);
console.log('hash1.toJSON(): '+hash1.toJSON());

// sign
const fetchSig1 = Signature.create(PrivateKey.fromBase58(fetcherPk1), [hash1]).toJSON();

const binanceAccount1 = new BinanceAccount({ apiKey: apiKey11, asset: asset11, free: free11, locked: locked11, timestamp: timestamp11 });
const binanceAccountProof1 = new BinanceAccountProof({proof:{
    binanceAccount: binanceAccount1,
    fetcherPk: PrivateKey.fromBase58(fetcherPk1).toPublicKey(),
    signature: Signature.fromJSON(fetchSig1)
}});

// ==============response from fetcher node2
let apiKey2 = Poseidon.hash(CircuitString.fromString('1234REWQ').toFields());
let asset2 = 'BTC';
let free2 = '10000000';
let locked2 = '1100000000';
let timestamp2 = 1671353770000;
let fetcherPk2 = 'EKFTVCvBQKqBd5vGwpqCGyPUEBq6gnrLPYeGDLHAtRdRB8fm2LFL';
let pkIdx2 = 2;

// hash
let apiKey21 = Field(apiKey2);
let asset21 = CircuitString.fromString(asset2);
let free21 = Field(free2);
let locked21 = Field(locked2);
let timestamp21 = UInt64.from(timestamp2);
let hash2 = Poseidon.hash([apiKey21, ...asset21.toFields(), free21, locked21, ...timestamp21.toFields()]);
console.log('hash2.toJSON(): '+hash2.toJSON());

// sign
const fetchSig2 = Signature.create(PrivateKey.fromBase58(fetcherPk2), [hash2]).toJSON();

const binanceAccount2 = new BinanceAccount({ apiKey: apiKey21, asset: asset21, free: free21, locked: locked21, timestamp: timestamp21 });
const binanceAccountProof2 = new BinanceAccountProof({proof:{
    binanceAccount: binanceAccount2,
    fetcherPk: PrivateKey.fromBase58(fetcherPk2).toPublicKey(),
    signature: Signature.fromJSON(fetchSig2)
}});

// 2. aggregate all proofs
const binanceAccountProofList = new BinanceAccountProofList({proofList:[binanceAccountProof0, binanceAccountProof1, binanceAccountProof2]});

// 3. verify
let tx = await Mina.transaction(deployerAccount, () => {
    zkAppBinanceAccountVerifier.verifyBalance_ge_1btc_inLast24h(binanceAccountProofList);
  });
  let [proof] = await tx.prove();
  await tx.send();

setTimeout(shutdown, 0);