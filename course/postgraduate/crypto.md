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

<div style="text-align:center">
<img src="/static/course/postgraduate/crypto/general_scheme.png"  alt=""/>
</div>

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

For symmetric encryption scheme $\\{E_e | e \in K\\}$ and $\\{D_d | d \in K\\}$, $\\{e, d\\}$ are 
easy to derived from each other or just $e = d$

- Also known as: secret-key, single-key, one-key, shared-key,
  conventional encryption.

# Historical Ciphers

- **Caesar Cipher**

    $C = E(K, M) = (M + K) \mod 26$

    $M = D(K, C) = (C - K) \mod 26$

    where $M, C \in Alphabets$ and $Alphabets$ are mapped into $\\{0, 1, ..., 25\\}$

    Especially, when we set $K = 13$, the function is called `ROT13`, where $E$ is equivalent to $D$


- **Playfair Cipher**

    steps:
  1. Pick keyword (here: monarchy)
  2. Construct matrix: fill in letters of keyword (minus duplicates)
     left2right & top2bottom, and remaining letters in alphabetic
     order, where I and J count as one letter.
  3. Plaintext is encrypted two letters at a time:  
  4. If a pair is a repeated letter, insert filler like ‘X’ (e.g., “BALLOON” ; “BA LX LO ON"). Add
     an ‘X’ also at the end, if needed (or any other character).
  5. If both letters fall in the same row, replace each with letter to right, wrapping back to start
      from end (e.g., “AR" is encrypted as “RM").
  6. If both letters fall in the same column, replace each with the letter below it, wrapping to top
      from bottom (e.g., “MU” is encrypted as “CM").
  7. Otherwise each letter is replaced by the letter in the same row and in the column of the
      other letter of the pair (e.g., “HS" becomes “BP" and “EA" becomes “IM", or “JM", as the
      encipherer wishes)

<div style="text-align:center">
<img src="/static/course/postgraduate/crypto/playfair.png"  alt=""/>
</div>


- **Vigenere Cipher**

  - a sequence of plaintext letters $P = p_0, p_1, p_2, ..., p_{n−1}$,
  - a key consisting of the sequence of letters $K = k_0, k_1, k_2, ..., k_{m−1}$,
    typically $m < n$. 
    
  The encryption/decryption is as follows:

  $C_i = (P_i + k_{i \mod m}) \mod 26$

  and

  $P_i = (C_i − k_{i \mod m}) \mod 26$

<div style="text-align:center">
<img src="/static/course/postgraduate/crypto/vigenere.png"  alt=""/>
</div>


- **Vernam Cipher**

    $P \oplus K = C$

    $C \oplus K = P$


- **Rail Fence Cipher**

<div style="text-align:center">
<img src="/static/course/postgraduate/crypto/railfence.png"  alt=""/>
</div>

- **Columnar transposition cipher**

    Example:

<div style="text-align:center">
<img src="/static/course/postgraduate/crypto/columnar.png"  alt=""/>
</div>

Also, we could perform another encryption to be more secure.

# Feistel Cipher

Composite (product) ciphers: combining both substitution and transposition

Encryption:

<div style="text-align:center">
<img src="/static/course/postgraduate/crypto/feistelenc.png"  alt=""/>
</div>

# DES Encryption

# Block Cipher Modes

- **ECB**

- **CBC**

- **CFB**

- **OFB**

# Number Theory

- GCD & Extended GCD

# RSA

- Primitives
  
  We must get two factors $p$ and $q$ of $n$, which is hard.

- Generate keys
  1. Select prime numbers
     
      $p, q$
  
  2. Calculate $n = p * q$ and $\phi(n) = (p - 1) * (q - 1)$
  3. select $e$ where,
      
      $1 < e < \phi(n)$, relatively prime to $\phi(n)$
  
  4. Compute $d = e^{-1} \mod \phi(n)$
  5. Set public key $(e, n)$ and private key $(d, n)$
  
- Encryption and Decryption

  $C = M^e \mod n$

  and 

  $M = C^d \mod n$

# Asymmetric algorithms for distribution

- Digital envelope
  
  Using asymmetric algorithm to encrypt symmetric key, for example, RSA

  Sender: $C = (C_1, C_2) = (K^e \mod n, E(M, K))$

  Receiver: $K = C_1^d \mod n$ and then $M = D(C_2, K)$

- Key exchange algorithms

# Diffie-Hellman Key Exchange

- Discrete logarithms
  
  $\forall b \in \mathbb{Z}, \exist i in \\{1,...,p-1\\}$, there is $b = s^i \mod p$
