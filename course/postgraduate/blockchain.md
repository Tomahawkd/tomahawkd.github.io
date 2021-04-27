---
permalink: /course/postgraduate/blockchain
title: Distribute Ledger and Cryptocurrencies
---

{% include title_patch.html %}

{% include gen_index.html %}

# Cryptography
## Hashing
Hashing in Bitcoin blockchain:
- Hashing of public keys for bitcoin address
- Encryption of private keys
- The work for Proof-of-Work (PoW) (hashcash algorithm)
- Each block contains hash of the merkle root of the transactions in that block.
- Each block contains hash of the header of the previous block
- Payloads may be hashed

<div style="text-align:center">
<img src="/static/course/postgraduate/blockchain/hash.png"  alt=""/>
</div>

A bitcoin address is a string of 26-35 alphanumeric characters in Base58Check
encoding, beginning with the number 1 or 3
- It is a hash of a public key or the hash of a script.
- Two common types of transaction pay to such addresses:
    - P2PKH ( Pay-to-Public-Key-Hash )
    - P2SH ( Pay-to-Script-Hash )
- The address represents the destination of a payment, and acts to redeem the
  encumbrance of a payment.

<div style="text-align:center">
<img src="/static/course/postgraduate/blockchain/addrconv.png"  alt=""/>
</div>

**Merkle Tree**  
To prove transaction K included in hash, need only provide 4 hashes (each 32
bytes long): hashes for L, IJ, MNOP & ABCDEFGH.

<div style="text-align:center">
<img src="/static/course/postgraduate/blockchain/merkle.png"  alt=""/>
</div>

## Bitcoin Blockchain
### Components
- Users with wallets
- Transactions
- Miners
- Light vs. full clients

### Scripting Language
- Called “Script” 
  - Reverse-Polish notation stack-based execution language 
  - Instead of (3+5) X 2, we write 35+2X 
  - The syntax of Script is like that of the programming language Forth

- Two stack operations: 
  - Push (adds an item to the top of the stack) 
  - Pop (removes the item at the top of the stack)
  
- Items are processed left to right 
  - Eg: OP_ADD
    - Pops two items from stack, adds them, and pushes sum to stack.

- Script is deliberately simple & widely applicable
  - Not hardware dependent
  - Enables execution on devices with limited memory (eg, embedded devices)
  - Stateless
    - No state prior to execution, no state saved after execution
- Deliberately does not permit loops or complex program control features
  - This means predictable execution times
  - No infinite loops
  - Make attacks more difficult
  - Not Turing-complete.
- Ethereum was developed to allow Turing-complete computation over a blockchain.

### Wallet
- Wallet is the primary user interface
  - Controls access to a user’s bitcoin
  - Manage keys and addresses
  - Tracks current balance
  - Enables creation and signing of transactions.
- May be held on client machine or on an exchange
- Wallet can keep a copy of the transaction
  - Or can query the chain when needed
- Wallet also refers to the data structure used to store and manage a 
  user’s keys and address
  
### Transactions
<div style="text-align:center">
<img src="/static/course/postgraduate/blockchain/trans.png"  alt=""/>
</div>

- Transactions move value from inputs to outputs
- A transaction has at least 1 input and at least 1 output
- If the Value of Outputs < Value of Inputs
  - Implied difference between outputs and inputs is taken by the miner as a 
  fee for processing the transaction
  
# Mining
## Transaction Outputs
For most transaction, there are two parts:
- An amount of Bitcoin (denominated in satoshis)
- A locking script (an “encumbrance”)
  - The amount is locked unless specific conditions are met

The intended recipient has to provide something to redeem the payment
- Typically they provide their signature (which encodes their private key) and a
  hash of their public key (their Bitcoin address)
- They may also provide their signature (which encodes their private key) and a
  hash of a script (a program written in the Bitcoin language Script).
- Some transactions require multiple parties to provide something before the
  locking script is unlocked.
  
## Unspent Transaction Output (UTXO)
UTXO is the output of a transaction which may be spent as an input 
in a subsequent transaction.

- “Sending” a recipient some bitcoin is done by creating some UTXO
registered to their address
  - Encumbered to their public key hash or to a script
  
- All the UTXO of the system is known by every node
  - It is held in a database called the UTXO set or UTXO pool. 
  
- It is locked to a specific address and may be scattered.
- A wallet will aggregate the UTXO belonging to a single address

## Standard Transactions
These are based on what is needed to redeem the payment (ie, to satisfy the encumbrance)

- Pay-to-Public-Key-Hash (P2PKH)
  - A hash of a specific public key (a Bitcoin address) is needed to redeem
  
- Pay-to-Public-Key
  - Mostly used in coinbase transactions
  
- Multi-sig (multiple-signature)
  - Limited to 15 keys
  - M of N schemes (ie, M signatures of N total signatures are needed, eg 2/3).
  
- Pay-to-Script-Hash (P2SH)

- Data Output
  - 40 bytes of non-payment data to a Transaction output.
  
## Decentralized Consensus
1. Independent verification of each transaction, by every full node
2. Independent aggregation of those transactions into new blocks by
mining nodes, together with demonstrated computation through a
Proof-of-Work algorithm
3. Independent verification of the new blocks by every node and
assembly into a chain
4. Independent selection, by every node, of the chain with the most
cumulative computation demonstrated through Proof-of-Work.
   
## The Generation Transaction (Coinbase reward)
- The bitcoin earnt by mining are awarded via the first transaction of each new block
  - The Generation (or Coinbase) transaction
  
- There are no UTXO inputs for these transactions
  
- Generation transactions do not have an unlocking script (since there is no
UTXO). So the field can have arbitrary content:
  - Eg, Satoshi Nakamoto on 03-01-2009 added to the genesis block
  
## Mining Problem
- Proof-of-Work is designed to create a hurdle to mining
  - Otherwise, nodes would spin-up multiple sock-puppet nodes to win the reward
  - A form of Sybil attack
  
**Sybil Attack**  
The Sybil attack in computer security is an attack wherein a reputation system 
is subverted by creating multiple identities. A reputation system's vulnerability 
to a Sybil attack depends on 
- how cheaply identities can be generated, 
- the degree to which the reputation system accepts inputs from entities that 
  do not have a chain of trust linking them to a trusted entity, 
- and whether the reputation system treats all entities identically.


- The problems get harder over time
  - To ensure that a new block is created and accepted about every 10 minutes.
  
- Problem: Find the hash a specified object with a nonce parameter which
  is less than sum pre-specified total.
  - Problem designed to be hard to do and easy to check.
  - Can only be solved by trial and error.
  
## Intending Miners
- When a new block arrives, miners tackle the next PoW problem
  
- Meanwhile, they assemble transactions that are not in a block into a candidate block
  - Prioritized by age (how many blocks since the UTXO was recorded) &
  - Size of transaction
  
- High priority:
  - 1 Bitcoin, aged 1 day
  
- As new blocks added, unused TXs increase in age
  
- When miner is restarted, its TX pool is wiped.

## Decision between Competing Blocks
- Nodes keep three collections of blocks
  - Those on the main blockchain
  - Those that form branches off the main blockchain
  - Orphan blocks – those without a parent block
  
- The main chain is the chain with the most cumulative difficulty associated with it
  - Usually the chain with the most blocks
  - If two chains are equal length, then the main chain is the one with most PoW
  
- Forks usually resolved within 1 block
  
- 10 minutes for each block time is a compromise between
  - Fast confirmation times & the probability of a fork.
  
# Protocols
## Byzantine Faults
<div style="text-align:center">
<img src="/static/course/postgraduate/blockchain/byzantine.png"  alt=""/>
</div>

- Byzantine faults – faults which appear different to different observers
  - A general sends different messages to different colleagues
  - Attack / Retreat
  
- A malicious node may send different blocks to different other nodes
  
- Byzantine Fault Tolerance
  - A system designed to withstand such attacks
  
- Bitcoin blockchain is Byzantine Fault Tolerant
  - Because it makes it costly to send false messages
  - Nodes have to do Work to have a block successfully included in chain
  
## CAP Theorem
Only 2 of the following 3 properties are possible to achieve simultaneously:
  - Consistency of data
    - Any data written must be valid according to all rules & constraints
    - Reads of same data must be the same
  - Availability of data
  - Partition-tolerance (how the data is stored or distributed)

Faced with the CAP Theorem, designers cannot forgo partition tolerance, 
so must choose between Consistency or Availability.
This is a trade-off and choice will depend on the requirements of the domain 
and the use-cases
  - If speed of response is not an issue, then choose Consistency.
  - If response needs to be immediate, then choose Availability.
   
The Bitcoin blockchain opts for Availability
  - This may be considered a weakness for a financial system.
  - Although not Consistent, Bitcoin blockchain is eventually consistent

There is no master or central node to enforce Consistency. So there needs to be 
a consensus algorithm, for nodes to vote on the true state of the database 
(the blockchain).

Bitcoin blockchain is open, so it cannot use simple majority voting
- No way to ensure that a majority is present
- No node has overall view of all other nodes
- A majority could be manipulated (via a Sybil attack)

## Fork in Bitcoin
**Regular operations (or internal) fork**: The temporary existence of
competing chains as miners process competing blocks
- Resolved through consensus protocol.

**Software fork**: In open-source software projects, a fork is a new
software project trajectory that starts from an earlier project.

- **Soft fork**: The new version of the software is **backwards-compatible**
  - In other words, nodes do not need to adopt the new version of the software.
    In a blockchain, nodes can still recognize new blocks even if they are
    running the old software version.
  - The network will typically have a mix of nodes running the old & the new
    software.
- **Hard fork**: The new version is **not** backwards compatible.
  - Every nodes needs to adopt the new version of the software to recognize
    new blocks.
    
## Consensus Protocols
### Proof of Work (PoW)
Proposed to provide disincentive to Sybil attacks to make it less likely that 
malicious nodes could take over the network.

Requires compute which uses a lot of power

### Proof of Stake (PoS)
Nodes validate blocks in proportion to their financial stake in the system
- ie, how much of the internal currency the node has
- This is a weighted turn-taking protocol (weighted according to stake)

Then other nodes have to approve
- Could be a majority of all other nodes (eg, Tendermint)
- Or a random selection of nodes

If nodes behave badly, they forfeit their stake
- No coin creation needed to reward mining, but internal currency still needed

- Need to pay validators only after a block is confirmed
- Vitalik Buterin’s Metaphor:
  - 100 people sitting around a table signing competing documents
  - Each person only gets paid if they sign the documents that a majority of
    other people sign
  - So payment can only be at the end. 
  
#### Possible Flaws
- Initial distribution problem
  - How to incentivize users who have initial coins to transfer coin ownership,
    since their stake is valuable?
  
- Validators signing competing blocks
  - This is rational if there is a fork
  - aka Nothing-at-stake problem
  
- Cartel Problem
  - How to prevent cartels
  
- Finality Problem
  - How to stop blocks being removed later
  - For PoW systems, the hashing power required to remove a very old block is
    immense.

### Proof of Authority (PoA)

- Nodes with authority to process blocks are chosen to do so
  - Either chosen randomly or according to some pre-determined rules
  - Nodes may take it in turns to mine blocks
  - Nodes may act as miners for other certain other nodes (eg, as Notaries)
  
- For example:
  - Companies in a consortium together each take turns to process blocks
  
- Requires trust in the nodes, and hence only suitable for permissioned ledgers
  - Permissioned ledgers normally have a consortium agreement between the
    companies involved, which governs investmens and penalties
  - There is a business in being an independent notary (eg, BT, NCC Group).
  
- R3’s CORDA platform
  - Uses Notaries to witness & process transactions
  - But this is not strictly a blockchain.
  
### Other Protocols
- Protocols could simply decide which nodes should process blocks on 
  some agreed basis, eg
  - Random assignment
  - Time since they last had a turn
  
- Proof of Elapsed Time (PoET)
  - Developed by Intel as part of their Sawtooth Lake services running on the 
    Hyperledger platform
  - Intended to be run in a secure hardware environment for permissioned ledgers
    - So perhaps less prone to attack by malicious nodes.
  
## Consensus Attacks
### Sybil attacks
- A malicious node creates proxies that appear to be run by different owners
- In a system using PoW, these would only succeed if the group has sufficient
combined hashing power
- They may succeed under other protocols.

### 51% Attacks
- Where a miner or a cartel of miners are able to attack the network because
of their combined hashing power
- A majority is not necessarily needed – simulations show that these attacks
may succeed with only 1/3 of hashing power (depending on distribution of
hash power and structure of network)
- Chinese miners currently could engineer such attacks on Bitcoin.
  - Would it be in their economic interest to do so?
  - Would it be in their strategic political interest to do so?

- Create deliberate forks
- Execute DoS (Denial of Service) attacks against specific Transactions
or Addresses
  - Just refuse to process these transactions or transactions to/from these
    addresses
    
### Double-spend attacks
How it works:
- A and C are attackers, B is the mark (victim)
- A and B have an agreement to exchange bitcoin for some offline goods or
fiat money
- TX1: Attacker A sends bitcoin to B
- B sees TX1 is confirmed & pays A the offline goods or fiat money
- TX2: A spends same bitcoin with C (aligned with A)
- A and colleagues put hash power behind TX2

So the blockchain eventually confirms TX2 and not TX1.


- Attackers can only double-spend their own transactions
  - since they have to sign transactions.
  
- What can B do to avoid loss?
  - Do not accept a single confirmation of TX1 (ie, wait for more blocks)
    - Eg, wait 24 hours (or 144 blocks)
  - Use an escrow (multi-sig) account for the goods/fiat currency
  
# Money
## Money Properties
- As a medium of exchange
- As a common measure of value and a unit of account
- As a store of value
  – Holds its value over time (assuming no inflation)
- As a means of anonymous payments
- As a means of deferred payments

- Fungibility
  - Notes/coins are interchangeable
  - Unlike (say) diamonds or rare stamps 

- Portability
  - Unlike say houses or land 
  
- Durability
  - Paper vs plastic notes
  - Cf: Australia’s first polymer dollar notes. 
  
- Divisibility
  - Unlike say cattle 
  
- Verifiability
  - Need to verify authenticity
  - Use of watermarks, holograms 

- Storability
  - Unlike say cattle (which eventually die) 

- Not easy to counterfeit
  - Use of watermarks, holograms.
  
## Inflation and Hyperinflation

- If banks issue too much money (or make lending too easy), then
  - There is more money available than goods to be purchased (at least in the 
    short-term)
  - The price of goods rises (because demand for them exceeds supply)
  - The average price of goods rises, and so we get inflation
    - The rate of increase of prices per unit time.
  
- There is no upper limit on the level of inflation
  
- Hyperinflation: When inflation rate exceeds 50% per month.

## functions of cryptocurrencies
A cryptocurrency may be useful as:
- A medium of exchange
- A common measure of value and a unit of account
- A store of value
- A means of anonymous payments
- A means of deferred payments

However
- Its usefulness for buying & selling real-world goods & services will be
  inversely proportional to its stability.
- As a store of value, a cryptocurrency may be particularly valuable for
  people moving assets across national borders.
  
## users of cryptocurrencies
- Criminals and people laundering money
  
- Governments & people evading international sanctions
  - eg, DPRK, Iran, Russia
  
- People in countries with capital export controls, hyperinflation or with
  high levels of corruption
  - eg, Zimbabwe, Venezuela, Indonesia
  
- Anyone having a need for money for any legal or illegal purpose
  
- Investors - People purchasing the cryptocurrency to sell it later
  - ie, to take advantage of any rise in its value. 
  
## value a cryptocurrency
Supply-side:
- Is the supply fixed
  - Bitcoin: Supply fixed at 21 million
  
- Can the supply be altered easily?
  - For BTC, new Bitcoins are issued according to an algorithm
  
- Is the supply under the control of the community or of a smaller group?
  - For Bitcoin, change to the supply algorithm would require a fork (and thus
    community agreement)
  - Not the case for all cryptocurrencies. 

Demand side
- Is there an underlying application that would create a demand?
  - For example, tokens for a babysitting club.
  
- If there is an underlying application, what is the demand likely to be?
  - In Short Run and in Long Term
  - Are there similar or competing tokens?
  
- Is there any demand from investors (or likely to be)?

# Initial Coin Offering (ICO)
