# Voracle - Verifiable Oracle Platform Based On Mina 
In various scenarios such as insurance, finance, random forecasting, and the Internet of Things, the oracle has demonstrated its irreplaceable value in the blockchain: as the tentacle of the extension of the blockchain, it has built a trusted bridge between the inside and outside of the chain, and built a mutually integrated value ecosystem.

## What is Oracle
**The mechanism by which information outside the blockchain is written into the blockchain is generally called oracle mechanism.**

The function of the oracle is to write the external information into the blockchain and complete the data exchange between the blockchain and the real world. It allows certain smart contracts to react to the uncertain external world. **It is the only way for smart contracts to interact with the outside world, and also the interface for blockchain to interact with the real world.**

To be simplified, if we compare the public chain to the operating system, and the DAPP analogy is APP, so the oracle machine can be vividly compared to the API interface (API is a set of definitions, programs and protocols, through which computer software can communicate with each other). Although this analogy is not accurate, the oracle machine plays such a role. The oracle machine is the link between the blockchain and the real world, and can be a tool for data exchange.

## Why Oracle Matters
**Blockchain is a deterministic and closed system environment.** At present, blockchain can only obtain the data inside the chain, but not the real world data outside the chain. *Blockchain is separated from the real world*.

Generally, the execution of smart contracts requires trigger conditions. When the trigger conditions of smart contracts are external information (outside the chain), a oracle machine must be required to provide data services. Real world data is input to the blockchain through the oracle machine, because smart contracts do not support external requests.

Blockchain is a deterministic environment, which does not allow uncertain things or factors. Smart contracts must be consistent whenever and wherever they run, so virtual machines (VMs) cannot allow smart contracts to have network calls, otherwise the results will be uncertain.

That is to say, the smart contract cannot perform I/O (Input/Output, that is, input/output), so it cannot actively obtain external data. It can only send data to the smart contract through a oracle machine.

The above is why the blockchain needs a oracle, because smart contracts cannot actively acquire data outside the chain, and can only passively accept data.

## Challenges of Oracle
It sounds like a oracle machine is nothing but a middleware that calls external data and returns the data to the blockchain. However, the ideal is simple and the reality is bone deep. If you think about it, you will find that there are several difficulties in the use process:
```
    How to ensure the authenticity of the external data source? 
    How to ensure the security of data during transmission and processing?
    Timeliness, cost?
    ...
```

There are many problems like this. In order to prevent these problems, the decentralized oracle needs to be carefully and comprehensively designed.

**Normal Solutions are as belows:**

##### A. Multi oracle node
In order to prevent the trust problem of single node oracle, multiple nodes are required to jointly execute the request processing of oracle data. The data inconsistency problem caused by multiple nodes requires data aggregation. Common aggregation algorithms include BFT consensus algorithm or threshold signature algorithm.
##### B. "Submission disclosure" mechanism
The data broadcasting between oracle nodes will lead to the Free loading problem, that is, a oracle does not access data sources to obtain data, but copies the answers of other oracle machines. When the nodes with empty pay account for the majority, if these nodes copy a wrong answer, it will become a majority attack, endangering the system security. We can solve this problem through the "submit expose" mechanism. The oracle node submits data answers in two stages. The answers submitted in the first stage are encrypted. All answers are decrypted after receiving enough oracle answers.
##### C. Multiple data sources or trusted single data source
The integrity of data sources is difficult to solve, because it is not a problem of oracle, but an external problem. When using the oracle machine, users should confirm that the data source they access is safe and reliable. When users access an insecure data source, the insecure data is likely to cause the oracle machine to return an incorrect result. Of course, using multiple data sources to access data can prevent a few data sources from doing evil to some extent, but this practice is not universal, because not every piece of data has multiple external data sources.
##### D. Benefit distribution
Decentralized oracle machine needs to design a set of incentive mechanism to give rewards and punishments corresponding to the behavior of oracle machine nodes. The oracle node needs to pay a certain margin when joining the decentralized network to prevent the node from doing evil. Theoretically, all the oracle machines that get the same answer as the consensus result should get the same reward, because they are all contributors to the consensus conclusion. In terms of punishment rules, we can't punish a oracle node because its answer is different from the consensus result, or it can't immediately return the request result, because we can't tell whether the oracle node is doing evil or the data source is doing evil. As for the free loading problem, once the node is found to be eating empty rates in the "disclosure submission" phase, the pledged deposit needs to be deducted in a certain proportion.

## Two Models of Oracle
At present, there are two models of oracle machine, one is a **single model**, the other is a **multiple model**, and sometimes the *multiple model* is also called Oracle network.

The *single model* only contains one oracle, which is trusted and will execute code correctly. The contract participants can be sure that it will not collude with one of the contract participants. The *single model* is similar to a software as a service provider. For most applications, a *single model* is safe enough and economical. At present, an instance of a *single model* is Oracle.

*multiple model*s include multiple oracle machines, even oracle networks. Although a single trusted oracle machine is enough for most users, high-value asset processing requires a higher degree of trust, which requires *multiple model*s. In this model, code execution is distributed among several independent oracle machines, such as 10. Set the data of these 10 oracle machines to a trusted threshold. The number of intelligent oracle machines with critical values must agree on the results. For example, if the user uses the 7/10 model, the contract can be executed only when more than seven intelligent oracle machines are consistent. This model has set aside three buffers. Maybe some intelligent oracle machines are offline, have problems or are attacked by hackers, as long as no more than three buffers do not affect the execution of contract code. *multiple model*s are more complex and costly than *single model*s, but they provide better security.

## What is Voracle
**Voracle ** is a Verifiable Oracle Platform Based On Mina, which locates between **Single Model** and **multiple model** and will go ahead forwards **multiple model** . 

Initial Stage, Voracle is still a little baby, providing basic service as below.

* External API Access Service
  * Obtain on-chain Data like from Mina.
  * Obtain price data、account data from CEX like Binance.
* VRF Service

Next Stage, Voracle will grow with further Services as below:

* Price Feed
* Automatically Trigger zkApp 
* ...




## Overview of Techical Architect

Initial Stage, Voracle Network is still a little baby, Providing common services with a Simplified Technical Architect.

![voracle-tech-arch](./pic/voracle-tech-arch.png)

Currently, Voracle **as a baby** consists of:

* **Voracle Gateway**, acting as API gateway for Unified entrance of All zkApps, And also as Aggregator for responses from various *Voracle Fetcher Nodes*.
* **Voracle Fetcher Nodes**,  acting as Providers within Voracle Platform, Connecting with External DataSource, and return result with their respective signature.
* **Voracle tool libs**, acting as dependency providing for all zkApps looking for Oracle service from Voracle, such as invoking request to Voracle Gateway, as well as Voracle Contract Verifying data responded from each *Voracle Fetcher Nodes*.
* **Voracle zkApp**, consisting of contracts & website, storing all Info of current registered *Fetcher Nodes* and make a presentation of all Info (service quality, service status, fetcher nodes status, etc. ) of Voracle Platform.

## Integrate with Voracle
To integrate with Voracle, You first had better go to the repo belows:

* Voracle Gateway:  https://www.github.com/coldstar1993/v

* Voracle Fetcher: https://www.github.com/coldstar1993/v

* Voracle Tool&Libs: https://www.github.com/coldstar1993/v

* Voracle zkApp: https://www.github.com/coldstar1993/v

All You project need to do is to integrate **Voracle Tool&Libs** which provide capabilities of looking for Oracle service from Voracle, such as invoking request to **Voracle Gateway**, as well as Voracle Contract Verifying data responded from each **Voracle Fetcher Nodes** and so on.

To be SIMPLIFIED for Mina Activity, currently **Voracle Tool&Libs** has not been published to public NPM repo. So, to make a dependency on it,  You could just copy the key component as a package into your project,

* You could just import the key contract--*VoracleVerifier.ts* into your files,  then compile it & leverage it!! ( UseCase Demo is *run_VoracleVerifier.ts*)
* You could just import the key utility *VoralceUtil.ts* including complete api to invoke  **Voracle Gateway** for current supported service into your files.


## How to run Voracle Locally
Currently, There are fixed amount of **Voracle Fetcher**  registered into the **Voracle Contract**, which you could directly find inside the  contract file *Voracle.ts*. Therefore, During Mina Activity, You could easily boot the whole Voracle Service Locally.

So to run the whole *baby* Voracle,  steps are as belows:

* download **Voracle Fetcher** & **Voracle Gateway** repo to local disk, and Install it respectively.

* step into **Voracle Fetcher** , config env as below:

  

  ```
  EKF9DU363vSSFnp2reh3EeeQYPJBbVWhtU11WxtKpMpf55jPZ3hN
  B62qikWxvd7g3smTA6vDEPqeXDnP6LnxU46gKFmB9rdC8ohdnPu1AoL
  --------------
  EKEyRQWVRPKLcafRzNMvbfUTDSRowXii8xUTCkc9839X1MUqNA81
  B62qk522nBpiyG8sowkEbao2csaGm6PBtTUwSSLxkg6QTRfVDjG5xdg
  --------------
  EKFTVCvBQKqBd5vGwpqCGyPUEBq6gnrLPYeGDLHAtRdRB8fm2LFL
  B62qooLE6R54n9vBkqf5N2w4kzB3ZSvGRXcXATXnX86kpiFp7jCDd7r
  ```

* `npm run dev`




## The RoadMap of Voracle
TODO
* tokens for staking & fee
* become an Oracle NETWORK



 