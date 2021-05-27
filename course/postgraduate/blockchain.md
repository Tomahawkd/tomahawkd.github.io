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
- The address represents the destination of a payment, and acts to redeem the encumbrance of a payment.

<div style="text-align:center">
<img src="/static/course/postgraduate/blockchain/addrconv.png"  alt=""/>
</div>

**Merkle Tree**  
To prove transaction K included in hash, need only provide 4 hashes (each 32 bytes long): 
hashes for L, IJ, MNOP \& ABCDEFGH.

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
  - Implied difference between outputs and inputs is taken by the miner as a fee for processing the transaction
  
# Mining
## Transaction Outputs
For most transaction, there are two parts:
- An amount of Bitcoin (denominated in satoshis)
- A locking script (an “encumbrance”)
  - The amount is locked unless specific conditions are met

The intended recipient has to provide something to redeem the payment
- Typically they provide their signature (which encodes their private key) and a hash of their public key 
  (their Bitcoin address)
- They may also provide their signature (which encodes their private key) and a hash of a script 
  (a program written in the Bitcoin language Script).
- Some transactions require multiple parties to provide something before the locking script is unlocked.
  
## Unspent Transaction Output (UTXO)
UTXO is the output of a transaction which may be spent as an input in a subsequent transaction.

- “Sending” a recipient some bitcoin is done by creating some UTXO registered to their address
  - Encumbered to their public key hash or to a script
- All the UTXO of the system is known by every node
  - It is held in a database called the UTXO set or UTXO pool.
- It is locked to a specific address and may be scattered.
- A wallet will aggregate the UTXO belonging to a single address

The main **advantages** of an UTXO system are:
- UTXO allows for Simple Payment Verification, where a client verifying payment does not need to download 
  the entire Bitcoin blockchain.
- This allows for multiple verification processes checking on different transactions can do so in parallel 
  since they are checking on different inputs, which allows for greater scalability.
- UTXO systems allow users to generate different system addresses for the outputs for each transaction, 
  which supports privacy of transactions.
  

The main **disadvantages** of UTXO are:
- Apps built on top of the Bitcoin blockchain are limited in the amount of blockchain state they can impact. 
  This feature may be considered by some to be a security advantage, since it reduces the potential impact of programs 
  running over the blockchain.
- Each output is owned by one user (the user having the private key for that Bitcoin address), 
  whereas use of smart contracts may often require outputs to be owned by multiple users.


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
2. Independent aggregation of those transactions into new blocks by mining nodes, together with 
   demonstrated computation through a Proof-of-Work algorithm
3. Independent verification of the new blocks by every node and assembly into a chain
4. Independent selection, by every node, of the chain with the most cumulative computation demonstrated 
   through Proof-of-Work.
   
## The Generation Transaction (Coinbase reward)
- The bitcoin earnt by mining are awarded via the first transaction of each new block
  - The Generation (or Coinbase) transaction
- There are no UTXO inputs for these transactions
- Generation transactions do not have an unlocking script (since there is no UTXO). 
  So the field can have arbitrary content:
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
- the degree to which the reputation system accepts inputs from entities that do not have a chain of trust linking them 
  to a trusted entity, 
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

Faced with the CAP Theorem, designers cannot forgo partition tolerance, so must choose between Consistency 
or Availability.
This is a trade-off and choice will depend on the requirements of the domain and the use-cases
  - If speed of response is not an issue, then choose Consistency.
  - If response needs to be immediate, then choose Availability.
   
The Bitcoin blockchain opts for Availability
  - This may be considered a weakness for a financial system.
  - Although not Consistent, Bitcoin blockchain is eventually consistent

There is no master or central node to enforce Consistency. So there needs to be a consensus algorithm, 
for nodes to vote on the true state of the database(the blockchain).

Bitcoin blockchain is open, so it cannot use simple majority voting
- No way to ensure that a majority is present
- No node has overall view of all other nodes
- A majority could be manipulated (via a Sybil attack)

## Fork in Bitcoin
**Regular operations (or internal) fork**: The temporary existence of competing chains as miners 
process competing blocks
- Resolved through consensus protocol.

**Software fork**: In open-source software projects, a fork is a new software project trajectory 
that starts from an earlier project.

- **Soft fork**: The new version of the software is **backwards-compatible**
  - In other words, nodes do not need to adopt the new version of the software.
    In a blockchain, nodes can still recognize new blocks even if they are running the old software version.
  - The network will typically have a mix of nodes running the old & the new software.
- **Hard fork**: The new version is **not** backwards compatible.
  - Every node needs to adopt the new version of the software to recognize new blocks.
    
## Consensus Protocols
### Proof of Work (PoW)
Proposed to provide disincentive to Sybil attacks to make it less likely that malicious nodes could take over the network.

Requires compute which uses a lot of power.

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

### Comparison
<div style="text-align:center">
<img src="/static/course/postgraduate/blockchain/procon.png"  alt=""/>
</div>

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
- A and B have an agreement to exchange bitcoin for some offline goods or fiat money
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
### Fiat Money
Fiat money is a currency (a medium of exchange) established as money, often by government regulation.
Fiat money does not have intrinsic value and does not have use value.
It has value only because a government maintains its value, or because parties engaging in exchange agree on its value.

### Inflation
- If banks issue too much money (or make lending too easy), then
  - There is more money available than goods to be purchased (at least in the short-term)
  - The price of goods rises (because demand for them exceeds supply)
  - The average price of goods rises, and so we get inflation
    - The rate of increase of prices per unit time.
- There is no upper limit on the level of inflation
- Hyperinflation: When inflation rate exceeds 50% per month.

### Stable Coin
Stable coins are the digital currencies pegged to the cost of fiat money, or any other asset.
- is a price stable cryptocurrency
- whose market price is pegged to another stable asset

#### Fiat Collateralized
Backed by a real-world currency.
Supported by fiat money or physical values (Tether, TrueUSD).

Pros:
- Simplest
- 100% price stable
- Less vulnerable to hacks since no collateral held on the blockchain

Cons:
- Centralized as a trusted custodian must store the fiat
- Need audits ensure transparency
- Highly regulated
- Expensive and slow liquidation to fiat

#### Crypto-Collateralized
Backed by a cryptocurrency.
The price is tied to the value of other cryptocurrencies (Dai).

Pros: 
- More decentralized
- Can liquidate cheaply and quickly into underlying crypto collateral
- Easy for everyone to inspect the collateralization ratio of the stable coin

Cons:
- Less price stable than fiat
- Can be auto-liquidated during a price crash
- Tied to the health of a particular cryptocurrency
- Inefficient use of capital
- Highest complexity

#### Non-Collateralized
Stable price by itself using smart contract.
The price is regulated by the issue of coins, but at the same time it is not supported by 
either traditional money or other cryptocurrencies (Carbon, Havven).

Pros:
- No collateral required
- Most decentralized and independent
- Not tied to any cryptocurrency or fiat

Cons:
- Most vulnerable to crypto decline or crash with no ability to liquidate
- Some complexity
- Difficult to analyse safety bounds or health
- Require continual growth

## functions of cryptocurrencies
A cryptocurrency may be useful as:
- A medium of exchange
- A common measure of value, and a unit of account
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
**Supply-side**:
- Is the supply fixed
  - Bitcoin: Supply fixed at 21 million
- Can the supply be altered easily?
  - For BTC, new Bitcoins are issued according to an algorithm
- Is the supply under the control of the community or of a smaller group?
  - For Bitcoin, change to the supply algorithm would require a fork (and thus community agreement)
  - Not the case for all cryptocurrencies. 

**Demand side**:
- Is there an underlying application that would create a demand?
  - For example, tokens for a babysitting club.
- If there is an underlying application, what is the demand likely to be?
  - In Short Run and in Long Term
  - Are there similar or competing tokens?
- Is there any demand from investors (or likely to be)?

# Initial Coin Offering (ICO) and Token Generation Events (TGE)
## Money Raise for Startup
- FF&F – Founders, Friends and Family
- Angel investors
- Government grants and loans
- Commercial lenders (eg, banks)
- Venture Capital (VC) firms
- Initial Public Offers (IPO)
  - When the company lists on a stock exchange
  - Shares are now for sale to the public.

### Newer Forms of Fundraising
- Traditional forms of lending
  - Savers place deposits into banks, building societies, credit unions
  - Banks etc aggregate the savings
  - Then lend larger amounts to borrowers (individuals, companies)
- Crowd Funding
  - Aggregation done via a web-site or a crowd-funding service
  - Large number of investors invest a small amount each
- Peer-to-Peer lending
  - Lenders connect directly to borrowers
  - An intermediary may match borrowers and lenders (and do credit checks)
- ICOs
  - Presale of tokens

## Check on investors
- **KYC**: Know Your Customer regulations  
  The know your customer or know your client (KYC) guidelines in financial services require that 
  professionals make an effort to verify the identity, suitability, and risks involved with maintaining 
  a business relationship. The procedures fit within the broader scope of a bank's Anti-Money Laundering (AML) policy.
  - Identity
  - Location
  - Wealth & assets
  - Other investments
- **AML**: Anti-Money Laundering regulations  
  Anti-money laundering (AML) refers to the laws, regulations and procedures intended to prevent criminals 
  from disguising illegally obtained funds as legitimate income.
  - the source(s) of funds
- Money-laundering
  - Proceeds of criminal activity (often in cash)
  - Proceeds of transactions with entities under sanctions
  
### Howey Test
The Howey Test refers to the U.S. Supreme Court case for determining whether a transaction qualifies 
as an "investment contract," and therefore would be considered a security and subject to disclosure 
and registration requirements under the Securities Act of 1933 and the Securities Exchange Act of 1934.

Under the Howey Test, a transaction is an investment contract for securities if four conditions are satisfied:
- It is an investment of money
  - "Money" may include other forms of near money
- There is an expectation of profits from the investment
- The investment of money is in a common enterprise
  - Pooling of funds into a joint-stock company or similar joint enterprise
- Any profit comes from the efforts of a promoter or third party
  - If profit arises from investor’s own actions, then likely not a security.

## ICO/IPO
Initial Coin Offering (ICO) is the cryptocurrency equivalent of an Initial Public Offering (IPO), where a company goes
from private to public status by selling shares for equity. This is typically done to get funds without the need to go
to a Venture Company (VC) or bank. An ICO solves the basic problem of initial coin distribution. Also called a Token
Generation Event (TKE).

ICOs also retain at least two important structural **differences** from IPOs. 
1. ICOs are largely unregulated, meaning that government organizations like the 
Securities and Exchange Commission (SEC) do not oversee them. 
2. Due to their decentralization and lack of regulation, ICOs are much freer in terms of structure than IPOs.

## Token Standards (Ethereum)
A protocol for tokens to interact on the Ethereum network
- So that tokens can easily be sent and be received without developers of new tokens have to re-create interaction code
  for each new token.
- So that wallets & exchanges can have a single API for dealing with new tokens.

### ERC223 token standard
- An update on ERC20
- Does not permit tokens to be transferred to a smart contract which does not permit tokens to be withdrawn.

### ERC721 – The Ethereum standard for Non-Fungible Tokens (NFTs)
- These are tokens intended to represent unique objects, each of which may be bought and sold
- Fungible means replaceable
- Non-Fungible means unique

## Concerns of Regulators
- To prevent scams and frauds
- To ensure promoters reveal all they know to investors regarding
    - Past records of promoters
    - True plans & intentions of company
    - Legal & regulatory status
    - Insider deals and connections
- Risks
- Types of risks
    - Market demand
    - Competitors
    - Regulatory risks
    - Technology developments

## Stages of an ICO
- Private token allocation
    - To friends & employees
- Private token allocation
    - Typically to large investors and crypto-hedge funds
- Public token allocation
    - To anyone (perhaps subject to constraints eg, Not to citizens or residents of the USA, China or South Korea)
    - Money raised on basis of a White Paper and a Prospectus
- Development of Platform and creation of tokens
- Launch of Business and use of the tokens

## Token Allocation Mechanisms
- A variety of allocation mechanisms are used to allocate tokens in the public sale
    - Usually an auction with tokens awarded to highest bidder
- Basic Attention Token (BATCoin) ICO
    - May 2017: $35 million raised in 30 seconds
    - 130 investors only
    - Top 20 addresses control more than 50% of tokens
- Bancor ICO
    - 12 June 2017
    - $153 million (in Ether) raised in 3 hours
    - $51 million more than planned
- Criticisms
    - Favouritism to insiders
    - Speed
    - Not capping total tokens

## Risk
- Risks of any business investmentInvestment may fail
    - Market demand may not be present
        - Especially for products seeking to create new market categories
    - Scams & frauds
- Risks of investments in new technologies
    - Technology may move on
    - Shortage of skilled people
    - Competition may arise
    - Network effects & path dependence
- Risks particular to ICOs
    - Tech is new & immature, and not yet well understood
    - Regulatory risks (eg, prosecution by regulators)
    - May be a Ponzi scheme
    - Class-action suits by investors
        - Earlier investors may be sued by later investors.

# Distributed Ledger Technologies (DLT) Platform
## Distributed Ledger
- Technologies where transactions are witnessed & validated
- Participants share state of certain variables
- Transactions are linked together to strengthen resistance to attack & to fraudulent revision
- Key elements:
    - P2P (decentralized) data sharing
    - Rule-governed processes to enable interactions between entities lacking mutual trust.

<div style="text-align:center">
<img src="/static/course/postgraduate/blockchain/dlts.png"  alt=""/>
</div>


## Difference with Blockchain
A distributed ledger is decentralized to eliminate the need for a central authority or intermediary to process,
validate or authenticate transactions. Enterprises use distributed ledger technology to process,
validate or authenticate transactions or other types of data exchanges. Typically, these records are only
ever stored in the ledger when the consensus has been reached by the parties involved.

A blockchain is essentially a shared database filled with entries that must be confirmed and encrypted.
The name blockchain refers to the "blocks" that get added to the chain of transaction records.
To facilitate this, the technology uses cryptographic signatures called a hash.
In short, blockchain is a specific type of distributed ledger. It is designed to record transactions or
digital interactions and bring much-needed transparency, efficiency, and added security to businesses.

## Main Benefits of DLT
- Shared state
  - Different organizations needing the same data
- Stateful (history kept)
- Stored data is effectively immutable
  - It cannot be altered surreptitiously
  - It is adamantine
- Unique allocations & co-ordinated allocation
  - Solution to double-spend problem
- Witnessing of transactions
- In case of transfer of digital assets, settlement is immediate

A distributed ledger gives control of all its information and transactions to the users and promotes transparency. 
They can minimise transaction time to minutes and are processed 24/7 saving businesses billions. 
The technology also facilitates increased back-office efficiency and automation.

Distributed ledgers such as blockchain are exceedingly useful for financial transactions. 
They cut down on operational inefficiencies (which ultimately saves money). 
Greater security is also provided due to their decentralized nature, as well as the fact that the ledgers are immutable.

Alternatively, blockchain technology offers a way to securely and efficiently create a tamper-proof log 
of sensitive activity. This includes anything from international money transfers to shareholder records. 
Financial processes are radically upgraded to offer companies a secure, digital alternative to processes run 
by a clearinghouse. Altogether avoiding these often bureaucratic, time-consuming, paper-heavy, and expensive processes.

When you write data to a blockchain, it gets etched on the network. When you have a series of transactions over time, 
you gain an accurate and immutable audit trail. This is very useful for financial audits. 
Having data stored in a place where no single entity owns or controls it, and no one can change what’s already written, 
gives you benefits similar to double-entry book-keeping. Ultimately, this means that there are fewer chances of errors 
or fraud.

## Major Use Cases
- Shared state: Cross-organizational workflows
- Stateful (history kept): Provenance tracking
- Immutability of stored data: Permanent records/Provenance tracking
- Unique allocations /co-ordinated allocation: Solution to double-spend problem
- Witnessing: Multi-party aggregation
- Immediate settlement for digital assets

<div style="text-align:center">
<img src="/static/course/postgraduate/blockchain/usecase.png"  alt=""/>
</div>


## Ethereum
- Language for Bitcoin Blockchain (Script) is limited
    - Desired a blockchain with a full programming language
- Blockchain platform with a full language Solidity
- Turing-complete language (so able to do loops)
- Times:
    - 2013: Proposed by Vitalik Buterin
    - July-August 2014: ICO raised US$18.4 million
    - 30 July 2015: System live
- Ethereum is a public (open) distributed ledger with an external cryptocurrency, called Ether
    - Ethereum 2.0 launched December 2020
- Ethereum MainNet uses proof-of-work
    - Ethereum 2.0 uses Proof-of-Stake
    - Both protocols will operate for a transition period
- Main intended application: A programmable DL (smart contracts)
- Imagines a state-transition machine (Ethereum Virtual Machine)
    - The machine exists on all the full nodes of the network
    - Smart contracts are programs which seek to change the state of the machine

### Ethereum Gas
Gas is an internal currency in Ethereum used to control demand and supply of transaction processing on the platform, 
and to prevent infinite loops.
- Ethereum separates cryptocurrency from measurement of work done
- Gas cost – unit of measurement for transactions
    - eg, 6 gas for each 256-bit hash
    - Like KiloWatts (units of measurement of electricity)
    - Based on complexity of processing, bandwidth needed, memory usage
    - The more complex the commands, the more gas you need to offer
- Gas price (measured in ETH)
    - How much initiator is willing to pay for the transaction to be processed
- Initiator of transaction specifies in ETH the price he/she is willing to pay per gas and the total number of gas
  permitted to be used
- Total processing fee in ETH $=$ Gas limit (total # of gas to be used) $*$ gas price in ETH.


- Miners can accept proposed gas price or not
    - A low gas price will mean the transaction is not processed quickly or maybe never
- If accepted, the miner processes until the gas limit is reached.
- If a transaction fails or is incomplete, initiator still pay the fee (because resources were used), but the state of
  the EVM remains as it was before the attempt to process the transaction.

#### Why have Ethereum Gas?
- To ensure programmers pay for the cost of processing smart contracts
- To decouple payment for processing from the market value of the currency
- To eliminate infinite loops and to hinder DoS attacks
    - Eventually an infinite program will run out of finite gas
    - Makes an attacker pay for the resources they use
- The more complex the programming commands requested, the more gas the initiator needs to offer.
- I understand that Facebook’s proposed Diem cryptocurrency (previously called Libra) will also use gas
    - But the same coin will be used for gas and for the currency.

### Ethereum Virtual Machine (EVM)
- Ethereum Virtual Machine
    - Runtime environment for smart contracts
    - 256-bit register stack
- Isolated from the network and from the file systems of clients
- The platform is designed so that Smart Contracts, when processed by miners, will change the state of the EVM.
    - Hence, Ethereum has been called a global computer.

## Corda
- Project initiated by a consortium of banks
- Established 2015 to develop distributed ledger technologies for banking and financial applications
- Created a platform called CORDA
    - Open-source DL platform released 30 November 2016
    - For scalability and support, will require enterprise version (which is licensed) called R3 Corda.

### Features
- Transactions private to the parties involved
    - Witnessed by notaries
    - Only participants to a transaction can view it
    - Not even the existence of a transaction is known to others
- No single chain
- No global state
- No native crypto-currency
- Records an explicit link between legal code and smart contracts
- Supports a variety of consensus mechanisms
- Can include transaction within arbitrary workflows.

### Problem
- Contracts between 2+ financial entities
    - Legal document
    - Shared facts are just between the entities
    - Visible to appropriate regulators
    - CAP theorem – different users may prioritise consistency over availability

**Design**

- Consensus
    - Just parties to a transaction, not the entire community
- Validation
    - Just legitimate stakeholders, not the entire community
- Use of Independent notaries
    - For time-stamping & prevention of replayed transactions
- Focus on inter-operability
    - With legal code
    - With legacy IT systems.

## Other Technologies
A central database with secure private messaging and with

- A private network (closed to entities without permission)
- Digital signatures (public/private keys) for secure identity
- Encryption of messages between participants
- Each participant holding relevant data in their own database
- A consensus mechanism (possibly)


- To ensure immutability, periodic hashing of database contents to a public blockchain (eg Ethereum)
- Eg, Everledger does this with diamonds records

## Comparison
<div style="text-align:center">
<img src="/static/course/postgraduate/blockchain/comparison1.png"  alt=""/>
</div>

<div style="text-align:center">
<img src="/static/course/postgraduate/blockchain/comparison2.png"  alt=""/>
</div>

## Conclusion
- The technology is still immature & functionalities are limited
    - Eg, Scalability is still a challenge
- Dev Tools are still lacking and immature
- Development experience is limited
    - Bitcoin Blockchain and Ethereum are still the only large-scale deployment of open DLT technology
    - There are, as yet, still no large-scale commercial applications
    - Systems in production: Vakt / Komgo / InsurWave
- Consortium of energy trading companies & banks recently conducted a trial
    - Open Development Challenge (ODC)
    - December 2017-January 2018
    - Approx. 50 companies approached, 10 invited to build PoC (2 weeks)
    - Different platforms trialled
    - No platform is obviously or uniformly best for this problem domain

# Smart Contracts
Smart contract is an automated computer programme or script, usually based on agreement between two or more parties,
that autonomously executes at a trigger.
Distributed ledger is a neutral platform enabling sharing of data in a tamper-proof way.

- A Bitcoin script is a basic smart contract.
    - They are conditions coded into a transaction stating the requirements for spending the output of the transaction.
    - Bitcoin Script language designed deliberately not to be too powerful.
- Ethereum designed to enable smart contracts:
    - Each smart contract to be programmed using a Turing complete language (Solidity); and
    - Each smart contract to add to and modify its associated data store in the ledger.
- A Turing complete language allows the developer full programming power (eg, recursion, loops, etc). 

## Modifying Data Storage
- Allowing a smart contract to modify its associated data storage, in any manner described in its implementation,
  provides the developer with flexibility over the smart contract's storage model.
- This storage model can now include basic distributed ledger information
  (eg how much cryptocurrency does this smart contract hold), as well as user-defined parameters
- eg, strings, integers, classes . . .
- Smart contract code is usually placed in a transaction in a block, it has certain computational restrictions.
- So even if you can code your smart contract using a Turing complete language, you still have to consider the
  computational restrictions of the distributed ledger you will deploy your smart contract code onto.

## Smart contracts and trust
- A smart contract:
  - Adds trust to the system by allowing:
    - logic and (any associated) state to be independently verified
    - verification to be completed in near real time.
  - Automates code.
- Deploying code as a smart contract onto a distributed ledger increases trust in this code because:
  - The smart contract code cannot be modified.
  - If the smart contract has any associated data storage, this data can only be modified by satisfying the conditions
    encoded within the smart contract.
  - The smart contract code will always run when invoked by another transaction of the distributed ledger.
  - The distributed ledger will record all interactions with this smart contract.

### Using DLT to prove agreements exist
A Stampery is a service that stamps a document to certify its existence at a particular date and time.
This provides a proof-of-agreement service.
- You upload your manually-signed document to the Stampery, which
  - Hashes it (normally with a specified hash algorithm),
  - Combines the hash with others in a Merkle Tree, and
  - Posts the Merkle Tree root to one or more distributed ledgers.
- Subsequently, you can prove the document has been unedited by:
  - Producing your original signed document
  - Running the hash algorithm on the original
  - Showing the hash value generated by the original equals the hash value posted to the distributed ledgers
  
## Agreements using smart contracts
- Smart contracts on a distributed ledger are readable by others
  - If the ledger is permissioned (not open), then only those entities with access permission may see it.
- By calling a function on a smart contract you implicitly agree to the execution of that function and any consequences
  that arise from its execution.
- Functions can be grouped into:
  - Getters: Get functions return the value of some current parameter
  - Setters: Set functions change the state of the blockchain and can change the agreements between individuals. 
    - Other users can be alerted to the change of state of an agreement by either using a get function or subscribing to 
      events that can be automatically fired from functions.
      
## Conclusion
- Smart contracts are automated programs that run over distributed ledgers.
- They are executed at every full node.
  - They act to change the state of a virtual machine which is sitting on each node.
- They may or may not represent an agreement between two or more parties in the real world outside the ledger.
  - Many SCs are created by developers to implement some desired functionality in a complex business process.
  - See the Appendix slides for an example developed by Dr Luke Riley.
- They need to run at every node, and may run at slightly different times.
  - Therefore they cannot rely on inputs that off the blockchain, as these inputs may alter. Their inputs have to be
    either on the blockchain or in another SC (eg, a variable access by a getter function).
  - They cannot be random algorithms – they are all deterministic.

# Challenges
## Research Challenges
- Conceptual framework
  - What is the space of possible designs?
  - What is the fit between designs and applications?
    - For instance: what level of privacy is appropriate for each application(eg, Zerocash protocol)
- Technical
  - Platforms & tools still immature
  - Scale
  - Speed
  - Appropriate designs
  - Verification
  - Robustness against attack
  - Privacy on public networks
  
## Implementation Challenges
- Organizational challenges
  - Managing stakeholders
  - Managing revocation and cancellation
  - Business Process Engineering/Re-engineering
    - Especially for inter-organization workflows
  - Governance of the Distributed Ledger
- Legal and Regulatory aspects
- Technical
  - User friendliness
  - Managing multiple DLs
  - Integration with legacy systems
  - Production readiness
    - eg, security, compliance & monitoring requirements, analytics capabilities

## Key Technical Challenge: Scaling
- Current DLT Blockchain not adequate for most financial applications
  - Number of Bitcoin transactions per day: under 300K
  - Credit card transactions: 300 million per day (100 billion pa)
- One possible solution: Sharding
  - Split the space of accounts into sub-spaces
  - Each sub-space gets its own set of witnesses (validators)
- Side-chains
  - Private blockchains with occasional posting to a larger chain (eg, Bitcoin)
  - Everledger (diamond blockchain).
  
