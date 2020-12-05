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

- **Confidentiality**: No improper disclosure of information. or  
  No unauthorized access to information.

- **Privacy**: Confidentiality of information that you don’t want to share.

- **Anonymity**: Confidentiality of your identity.

- **Integrity**: No improper modification of information. or  
  No unauthorized modification of information.

- **Availability**: No improper impairment of functionality/service. or  
  No unauthorized impairment of functionality

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

# Characteristics of Cryptographic Systems

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

