---
permalink: /course/undergraduate/security
title: Network Security
---

{% include title_patch.html %}

{% include gen_index.html %}

# Network Security Summary

## Web 

### Vulnerabilities

XSS: Reflected, Store, DOM

SQL Injection

Shellcode

### Defense

HTTPS

Blacklist: Malformed URL(gogle.com)/Filtering XSS/SQL Injection

Defend Shellcode: Static/Dynamic

Static: Fast but easily bypassed

Dynamic: Slow but complete filtered

## Botnet

### Attack

LifeCycle: Attack -> Connect to CnC -> Control

Topology: 

- Star
- Multi CnC
- Hierarchical
- Decentralized

Pathfind: 

- Static list
- Flux: IP/Domain
  - IP Flux: Change DNS for one domain
  - Domain Flux: Generate Domain and search for available

### Detection

- Host based: Scan virus/Symptoms/Suspicious network traffic
- IDS: Detect signature(Cannot detect unknown signature)
- Anormal Behaviour: Compare with normal behaviour
- HoneyPot: Catch -> Supervise -> Discover CnC

## E-Mail

### Vulnerability

- Confidentiality: Clear text -> Sniff

- Integrity: No hash to check -> Modify
- Origin Identity: No signature to check -> Spoof
- Non-Repudiation: Deny message
- Spam mail/Virus

### Defense

PGP&S/MIME: Digital envelope based(enc)

## Spam

### Attack

- Direct
- Unauthenticated mail servers
- Botnets
- Hijacked IP(BGP): Use large mask(eg. /8)
  - typicially not filtered
  - hard to find client

### Defense

- Text classification: cannot process img/encoded messge
- IP filter: Cannot filter BGP
- Behaviour blacklist: Spam signature are same to filter

## Security Bug

### Static Analysis

Symbolic Execution: Generate tree forked by condition

### Dynamic Analysis

Fuzzing:

- Random: Ineffcient

- Mutation Based: Normal input and mutate
- Generation Based: Generate from standard

Fuzzing for full of coverage of codes

## DOS

### Attack

- Forge sender to redirect traffic
- SYN flood/SSL Flood/DNS Flood: take up server resources
- GET Flood: Using HTTP GET to Flood
- Route Hijack: redirect stream to victim

### Defense

SYN Flood: 

- syncookies: generate seq using target infomation. Allocate resource for valid seq number

Generic:

- Puzzle: server challenge client
  - Hard to solve but unfriendly to cellphone etc.
  - Use memory-bound functions to lower cost
- Captcha: machine cannot recognize

### Source Identification

- Ingress filtering: ISP check source IP
  - Few ISP do not implement -> no defense
- Traceback:
  - record router IP: take up much space
  - Edge Sampling: Record segment of path, get large packets to reconstruct path
- Capability based defense: declare capability to clients, path identifier to limit requests
- Pushback: negative feedback to previous where has mass traffic

## Network Defense

#### TCP/IP: Use VPN

- IPSEC: Transport Mode(Single package)/Tunnel Mode(New Header) -> AH(Authenticate)/ESP(Encryption)

#### Local Area Network Firewall: split local net and internet

- packet filter: statically filtering source ip and port
- Dynamic filter: allow external packets pass if requested
  - Malformed TCP offset will overwrite target ip and port
- Proxy firewall: filter application layer packets
- IDS:
  - Misuse model: Blacklist
  - Anomaly model: Whitelist

#### Network Infrastructure

- #### BGP

  ##### Vulnerability

  - Malformed message from attackers/buggy program

  ##### Defense
  
  - Verify certificate whether it correspond to specific blocks
  - Verify route path using certificate
  
- #### DNS

  Cache poisoning

  - Sign to DNS records with signature

  DNS Rebinding attack: Rebind dns record to get leaked information from local network

  - Browser: Bind IP with one domain but can tear down service if server IP changes
  - Server: Check header and authenticate without IP
  - Firewall: Refuse external domain to resolve internal IP

終わり