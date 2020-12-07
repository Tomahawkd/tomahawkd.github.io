---
permalink: /course/postgraduate/crypto
title: Cryptography
---

{% include title_patch.html %}

{% include latex_support.html %}

# Definitions

- **Information security**: 
  protecting information and information systems from unauthorized access, 
  use, disclosure, disruption, modification, or destruction.

# Security Properties

- **Confidentiality**: 
  - No improper disclosure of information. or  
  - No unauthorized access to information.

- **Privacy**: Confidentiality of information that you don’t want to share.

- **Anonymity**: Confidentiality of your identity.

- **Integrity**: 
  - No improper modification of information. or  
  - No unauthorized modification of information.

- **Availability**: 
  - No improper impairment of functionality/service. or  
  - No unauthorized impairment of functionality

- **Authentication**: Principals or data origin can be identified accurately

- **Non-repudiation**: Actions done cannot be denied

- **Accountability**: Actions can be traced to responsible principals

# Encryption Scheme

![general_scheme](/static/course/postgraduate/crypto/general_scheme.png)

where $E(Key_1, P) = C$ and $D(Key_2, C) = P$.

- Symmetric algorithms:
  - $Key_1 = Key_2$, or are easily derived from each other.
- Asymmetric algorithms:
  - $Key_1 \neq Key_2$
  - Public key can be published without compromising private key.
  
**Security depends only on secrecy of the key, not on the algorithm**

# Mathematical Formalization

Let $M$ be the **message space**, and $m \in M$ is **plaintext**.

Similarly, let $C$ be the **ciphertext space**, and $c \in C$ is **ciphertext**.

Let $K$ be the **key space**, and $e, d \in K$.

For each $e \in K$ determines a **bijective function** $E_e$ from $M$ to $C$, and 
similarly, for each $d \in K$ determines a **bijective function** $D_d$ from $C$ to $M$.

So we could represent as follows:

$E_e(M) = C$ or $E(M, e) = C$

and

$D_d(C) = M$ or $D(C, d) = M$

Since that the encryption function $E$ and decryption function $D$ are **bijiective**, 
for each element in set $M$ and $C$ should have its pair in the opposite set.

# Characteristics of Cryptographic Systems

- **Type of operations** used to transform plaintext into ciphertext
  - based on two general principles:
    - **Substitution**: each element in plaintext (bit, letter) is **mapped** into another element.
    - **Transposition**: elements in plaintext are **rearranged**
  - Most systems involve multiple stage substitutions and transpositions.

- **Number of keys** used
  - **Symmetric, single-key, secret-key, or conventional encryption**: sender and receiver use same key
  - **Asymmetric, two-key, public-key encryption**: sender and receiver use different keys

- **Way in which plaintext is processed**
  - Block cipher: processes input one block of elements at a time,
    producing an output block for each input block.
  - Stream cipher: processes input elements continuously, producing
    in output one element at a time, as it goes along.

# Symmetric key encryption

For symmetric encryption scheme ${E_e | e \in K}$ and ${D_d | d \in K}$, ${e, d}$ are 
easy to derived from each other or just $e = d$

- Also known as: secret-key, single-key, one-key, shared-key,
  conventional encryption.

# Historical Ciphers

- Caesar Cipher

- Playfair Cipher

- Vigenere Cipher

- Rail Fence Cipher

# Feistel Cipher

# DES Encryption

# Block Cipher Modes

- ECB

- CBC

- CFB

- OFB

# Number Theory

- GCD & Extended GCD

# RSA

# Diffie-Hellman Key Exchange

