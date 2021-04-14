---
permalink: /course/postgraduate/network
title: Network Security
---

{% include title_patch.html %}
{% include latex_support.html %}
{% include gen_index.html %}

# Introduction
## Security Properties
- Confidentiality
- Integrity
- Availability

For more see at [Cryptography](/course/postgraduate/crypto)

## OSI Security Architecture
- **Security Attack**: Any action that compromises the security of information
  owned by an organization
- **Security Mechanism**: A process (or a device incorporating such a
  process) that is designed to detect, prevent, or recover
  from a security attack
- **Security Service**: A processing or communication service that
  enhances the security of the data processing systems and
  the information transfers of an organization

## 5D of Perimeter Security
- **Deter**: dissuade the potential attackers before they try to
  compromise the security service
    - Make attack difficult
- **Detect**: monitor for attacks
    - IDS
- **Deny**: prevent unauthorised access 
    - Firewall, access control
- **Delay**: slow down the attacker
    - maximize the time between the detection of the attack and 
      the attack reaching the target
- **Defend**: fight with the attacker
    - More suitable for physical security
    - Drop malicious packets as close to the source as possible 
    
## Security Mechanisms
### X.800
- Access control
    - Enforce a policy of limiting access to a resource to only those users who
      are authorised
- Traffic padding
    - Insertion of bits into gaps in a data stream to frustrate traffic analysis
- Notarisation
    - Trusted third party to assure certain property of data exchange
- Security audit trail
    - Data collected and potentially used to facilitate a security audit
- Security recovery
    - Deals with requests from security mechanisms, such as event handling
      and management functions, and takes recovery actions

## Security Attack
### Jamming
- takes up the transmission channel regardless of the rules
specified by network protocols
- affects availability for legitimate packets

### Sniffing
- Listening to the network conversations that are not intended for you
- Network interface card (NIC) can be set to promiscuous mode to get all packets
from network
- Packet sniffers intercept and log network traffic that they can see via the NIC

### Spoofing
- Masquerading/impersonation – pretend to be somebody you are not

# TCP/IP Architecture

| Physical Layer | Data Link Layer | Network Layer | Transport Layer | Application Layer |
| ---- | ---- | ---- | ---- | --- |
| Wired/Wireless | MAC | IPv4/IPv6 | TCP/UDP/... | HTTP/... |

## Physical Interception
**Passive Interception**: promiscuous mode (The network must broadcast all packages 
such as wireless)
**Active Interception**: port mirroring, network tapping

## Traffic Analysis
### Data Acquisition
Data acquisition is the process of understanding the meaning of the
captured traffic

**BPF (Berkeley Packet Filter)**

Problem:
- Packet filter module sits on top of packet capture module
- Each packet received is copied always, to a buffer, which is then
sent upstream to the packet filter, which may decide to discard the
packet.
- Many CPU cycles will be wasted copying unwanted packets 
  

BPF solution:
- Filter the packet before buffering the required parts of it
- The filter is defined by users (which are network sniffers here)
- 100 times faster than the existing packet capture tool at the time

<div style="text-align:center">
<img src="/static/course/postgraduate/network/bpf_struct.png"  alt=""/>
</div>

- BPF feeds the packet to each participating process’ filter.
This user-defined filter decides whether a packet is
to be accepted and how many bytes of each packet
should be saved.
- For each filter that accepts the packet, BPF copies the
requested amount of data to the buffer associated with
that filter.
  
### Traffic Analysis
Types of traffic analysis
- Protocol analysis: analyse individual protocol inside a packet
- Packet analysis: analyse protocols of different layers inside a set of
packets
  - Pattern matching
    - Identify packets of interest by matching specific values in the
    packet capture
    - E.g., if source IP address = foo
  - Parsing protocol fields
    - Extract the contents of particular protocol fields
    - E.g., Wireshark shows the contents of each field in an IP packet
  - Packet filtering
    - Separate packets based on the values of fields in protocol
      metadata
    - E.g., showing ICMP packet only
- Flow analysis: analyse a flow composed of multple packets
  - List conversations and flows
    - List all conversations and/or flows within a packet capture or only
      specific flows based on their characteristics
  - Export a flow
    - Isolate a flow or multiple flows, and store the flow(s) of interest to
  disk for further analysis
  - File and data carving
    - Extract files or other data of interest from the reassembled flow

# Network Attacks
## ARP Spoofing
### ARP
- To avoid having to send an ARP request packet each time by broadcasting,
a host can cache the IP and the corresponding MAC address in its ARP
table (ARP cache)
- Each entry in the ARP table is usually “aged” and contents are erased if no
activity occurs within a period
- ARP table is updated when hearing an ARP request or ARP reply
- ARP is a stateless protocol, so most operating systems will update their
table
  - If a request is received, regardless whether they are the target
  - If a reply is received, regardless whether they have sent out an actual
    request

### Attack
- Construct spoofed ARP replies and actively join the ARP protocol run
- A target computer A could be convinced to send frames destined for
computer B to the attacker instead
- Computer A will have no idea that this redirection took place

### Application
1. **MitM**
<div style="text-align:center">
<img src="/static/course/postgraduate/network/arp_mitm.png"  alt=""/>
</div>

2. **MAC Flooding**
- Switches have an internal CAM (Content Addressable Memory) table,
  which maps switch ports to MAC addresses.
- When a frame arrives at switches, this lookup table is checked to know
  which port to forward each specific packet out of where the receiver is
  located
- In a MAC flooding attack, a switch is fed many Ethernet frames, each
  containing different spoofed source MAC addresses to consume the
  limited memory in the switch

## DHCP Starvation
### DHCP Protocol
<div style="text-align:center">
<img src="/static/course/postgraduate/network/dhcp.png"  alt=""/>
</div>

- Discovery: client broadcast message to discover the server
- Offer: server unicast message offering IP
- Request: client accepting the IP offered
- Acknowledge: server acknowledges the IP and sends other related configuration

<div style="text-align:center">
<img src="/static/course/postgraduate/network/dhcpdata.png"  alt=""/>
</div>

### Attack
1. If the legitimate DHCP server in the network starts responding to all 
   bogus DHCP_REQUEST messages with random generated MAC address, 
   available IP addresses in the DHCP server scope will be depleted 
   within a very short span of time.

2. Once the available number of IP addresses in the DHCP server is depleted,
   network attackers could set up a bogus DHCP server and respond to new
   DHCP DISCOVERY message from network DHCP clients

3. The rogue server starts distributing IP addresses and other TCP/IP
   configuration settings including default gateway and DNS server IP
   addresses, which can now point to an IP address controlled by the attacker. 
   Facilitates man-in-the-middle attack and sniffing attacks
   
## ICMP Smurfing
Smurfing: amplification  
Small amount of traffic are converted into large amounts of
traffic, in order to attack the target

### Spoofed ECHO_REQUEST
1. Smurf malware is used to generate a fake Echo request, containing a spoofed
   source IP, which is actually the target server address
2. The request is sent to an intermediate IP broadcast network
3. The request is transmitted to all of the network hosts on the network
4. Each host sends a ping response (ICMP ECHO_REPLY) to the spoofed source
   address
5. With enough ICMP ECHO_REPLY forwarded, the target server is brought down
   which causes denial of service (DoS)

## NTP (Network Time Protocol) Amplification DDoS Attack
1. The attacker uses a botnet to prepare NTP request packets with **spoofed
   addresses** to NTP servers, which have their monlist command enabled. The spoofed
   IP address is the victim’s IP address
2. The botnet sends the NTP request (a UDP packet) to NTP servers using its monlist
   command, resulting in a large response
3. The server responds to the spoofed address with the resulting data, normally of
   much larger size than the original NTP request
4. The victim receives the response and the surrounding network infrastructure
   becomes overwhelmed with the amplification of traffic, resulting in a DoS attack.
   
## TCP SYN Flooding
SYN is the initial package that establishing the connection

For TCP see at [Computer Network (Chinese Version)](/course/undergraduate/network)

1. The attacker, who is a botmaster here, instructs the bots to send a high
   volume of SYN packets to the targeted server, often with spoofed IP addresses.

2. The server then responds to each one of SYN packets and leaves an open port
   ready to receive the response 

3. While the server waits for the final ACK packet, which never arrives, the attacker
   continues to send more SYN packets. The arrival of each new SYN packet causes the
   server to temporarily maintain a new open port connection for a certain length of time,
   and once all the available resources have been utilised the server is unable to function
   normally.
   
## TCP Session Hijacking
<div style="text-align:center">
<img src="/static/course/postgraduate/network/tcphijack.png"  alt=""/>
</div>

- Source IP address + port number
- Destination IP address + port number
- Sequence number

The attacker could also pretend to be the client to ask data from server.

**Off-path Hijack**
- Blindly spoofs as the client, and sends a SYN packet to the server as if it was
from the client
- The attacker must get the sequence number correct

Guess the initial seq num:
- Unfortunately, BSD Unix TCP/IP stack did not adhere to these
recommendations.
- The sequence number for BSD TCP/IP stacks increases by 128,000 every second and
by 64,000 for every new TCP connection.
- Such a sequence is relatively easy to predict and can be much more readily
exploited than one which follows the RFC standard

<div style="text-align:center">
<img src="/static/course/postgraduate/network/offpathhijack.png"  alt=""/>
</div>

**What the attacker does**
1. Swamp the Client C with ICMP flooding, taking it out of the picture (because the
   attacker wants to spoof as C)
2. Create a real connection to port 80 on the web Server, and record the sequence
   number returned by the web Server.
3. Close the connection with the Server.
4. Create a raw IP socket, change its protocol to that of TCP, and change its source IP to
   that of the Client (by writing in the kernel)
5. Send a SYN packet (supposedly from the Client) to port 80 on the web server.
6. The server then sends an SYN+ACK to the Client C, which is silently ignored because C
   is under ICMP flooding attack
7. Send an ACK packet to the server with the acknowledgement number equal to the
   sequence number previously recorded plus N+1

**After connection is established and hijacked**
- Send data to the Server, taking care to increment the sequence number each time by the
   amount of data sent. The Server thought the data comes from the Client.

## BGP Route Hijacking
- **Autonomous System**: On the Internet, an autonomous system (AS) is the unit of router
policy, either a single network or a group of networks that is controlled by a common
network administrator (or group of administrators) on behalf of a single administrative
entity (such as a university, a business enterprise, or a business division).
- An autonomous system is also sometimes referred to as a routing domain.
- An autonomous system is assigned a globally unique number, sometimes called an
Autonomous System Number (ASN).
- ASs perform **longest** prefix matching to select which neighbours to route through

**Attack**  
1. **BGP prefix hijacking**
- When an AS announces route to network prefixes that it does not actually control
- Such false information is added to routing tables in BGP routers across the Internet

<div style="text-align:center">
<img src="/static/course/postgraduate/network/bgphijack.png"  alt=""/>
</div>

2. **BGP sub-prefix hijacking**
- The attacker lies about a subset of the prefix rather than the whole prefix belonging
  to another AS
- The false route is chosen because BGP prefers longest prefix matching

<div style="text-align:center">
<img src="/static/course/postgraduate/network/bgphijack2.png"  alt=""/>
</div>

## DNS Cache Poisoning
<div style="text-align:center">
<img src="/static/course/postgraduate/network/dns.png"  alt=""/>
</div>

1. **Query QID Attack**
- Every DNS query has a QID
- DNS use connectionless UDP
- If the attacker responds to query with the right QID, then it wins,
  over the real nameserver’s response!
  
2. **RRSet attack**
- DNS response contains different Resource Record Sets, or RRSets.
- In particular, an “additional” section, where name server can
  give additional info that may be “useful” for future lookups
- In an iterative query, the .com nameserver says you can ask ns.example.com for the
  IP address of example.com. To help next request, an additional record might give IP
  for ns.example.com.
- Darth abuses this feature and adds a record that says the IP address of
  victim.com is 88.88.88.88
- **FIX**: Bailiwick checking (when asking for www.google.com, do not allow
  www.victim.com to be accepted as an additional record)

<div style="text-align:center">
<img src="/static/course/postgraduate/network/dnsheader.png"  alt=""/>
</div>

# Firewall
## Objectives
- Attempts to prevent bad things from happening (such as users sending
  company secrets outside, or outside people breaking into system inside)
- Without preventing good things from happening (such as employees
  accessing information available externally)
  

Main task: Access Control

## Techniques for firewalls to control access
- Service control (**what**): determines the types of Internet services that can be
accessed, inbound or outbound
    - Internet service/applications are provided through transport layer ports
- Direction control (**where**): determines the direction in which particular
service requests may be initiated and allowed to flow through the firewall
- User control (**who**): controls access to a service according to which user is
attempting to access it
- Behaviour control (**how**): controls how particular services are used 

## Firewall Types
- A firewall can operate as
    - A positive filter, passing only packets that meet specific criteria
        - The assumption is everyone is a baddy
    - A negative filter, rejecting any packets that meet specific criteria
        - The assumption is everyone is a goody
- Depending on the type of firewall, it may examine
    - One or more protocol headers in each packet
    - They payload of each packet, or
    - The pattern generated by a sequence of packets
    
## Limitations
Canot protect
- From attacks bypassing it
- Against malware imported via laptop, PDA, storage infected outside
- Against access via WiFi networks if improperly secured against external use
- Against internal threats

## Packet Filtering Firewall
- Examines each IP packet and permits or denies the packet according to rules
- Applies a set of rules to each incoming and outgoing IP
packet and then forwards or discards the packet
- The firewall is typically configured to filter packets going in both directions 

### Filter Rules
- A packet filtering firewall is typically set up as a set of rules based on
matches to fields in IP or TCP header.
- In each set, rules are applied top to bottom.
- If there is a match to one of the rules, that rule is invoked to determine
whether to forward or discard the packet.
- If there is no match to any rule, then a default action is taken.

**Default = discard**
- Positive filtering
- Use a whitelist
- That which is not expressively permitted is prohibited  
**Default = forward**
- Negative filtering
- Use a blacklist
- That which is not expressively prohibited is permitted

### Pros and Cons
#### Pros
- Very simple
- Typically are transparent to users and are very fast

#### Cons
- No examination of upper-layer data, hence no prevention of attacks that
employ application-specific vulnerabilities or functions.
- Because of the limited information available to the firewall, the logging
functionality present in packet filter firewalls is limited.
- Most packet filter firewalls do not support advanced user authentication
schemes (also due to lack of upper-layer functionality).
- Generally vulnerable to attacks and exploits that take advantage of
problems within the TCP/IP specification and protocol stack, such
as network layer address spoofing.
- Due to the small number of variables used in decisions, packet
filtering firewalls are susceptible to security breaches caused by
improper configurations
  
### attacks and countermeasures
#### IP address spoofing
- The intruder transmits packets from the outside within a source IP address field
containing an address of an internal host.
- Fake source address to be trusted
- Attacker hopes that use of a spoofed address will allow penetration of systems that
employ simple source address security, in which packets from specific trusted internal
hosts are accepted.  
**Countermeasure**
- Add filters on router to block such packets
- Discard packets with an inside source address if the packet arrives on an external
interface
- This countermeasure is often implemented at the router external to the firewall

#### Source routing attack
- Source routing: In the Internet, there is an option for the the sender of a packet (the
source node) to include information in the packet that tells the route the packet should
take to get to its destination.
- Source routing is seldom used, only in debugging network problems or easing network
congestion control
- An attacker can generate traffic claiming to be from inside the firewall (although the
packet is sent from outside)
- Attacker specifies the route that a packet should take as it crosses the Internet, in the
hopes that this will bypass security measures that do not analyse the source routing
information  
**Countermeasure**
- Block source routed packets
- Discard all packets that use this option

#### Tiny fragment attacks
- Split headers information over several tiny packets
- Attacker uses the IP fragmentation option to create extremely small fragments and
force the TCP header information into a separate packet fragment.
- Attack designed to circumvent filtering rules that depend on TCP header information.
- Typically, a packet filter makes a filtering decision on the first fragment of a packet.
- Attacker hopes that the filtering firewall examines only the first fragment and that the
remaining fragments are passed through.  
**Countermeasure**
- Discard all packets which use the TCP protocol and is fragmented
- Enforce a rule that the first fragment of a packet must contain a predefined minimum
amount of the transport header. 
  
# Intrusion Detection and Prevention Systems
- An IDS’s main function is to detect and report intrusion attempts to the network.
- An IDS is a security camera after the gate.
- An IDS alerts any intrusion attempts to the security administrator

## Terms
- Intrusion: unwanted and unauthorised intentional access of computerised
network resources
- Intrusion detection: detecting unauthorised use of a system or network,
detecting attacks upon a system or network
- Intrusion detection system (IDS): does for network what anti-virus software
does with incoming files
    - Components: sensors, alerts

- Intrusion prevention system (IPS): an IDS with an automated response
    - Shut down attacker connections
    - Try to back-trace attacker
    - Counter-attack
    
## Intrusion Detection
- Reputation detection
    - Detect host communication with someone of bad reputation
    - Idea: detect host communicating with someone with bad reputation
    - Based on (public or private) blacklists
- Anomaly-based detection
    - Normal system behaviour is defined first
    - Involves the collection of data relating to the behaviour of
      legitimate users over a period of time
    - Then statistical tests are applied to observed behaviour to
      determine whether that behaviour is not legitimate user behaviour
    - Threshold detection: this approach involves defining thresholds,
      independent of user, for the frequency of occurrence of various
      events
    - Profile based: a profile of the activity of each user is developed and
      used to detect changes in the behaviour of individual accounts
      - Focuses on characterising the past behaviour of the user or a group of users
      and then detects significant variations.
    - Can be thought as the whitelist in firewall rule

- Misuse-based detection
    - Abnormal system behaviour is defined first
    - Involves an attempt to define a set of rules or attack patterns that
      can be used to decide that a given behaviour is that of an intruder
    - Advantages
        - Generate few false alarms
        - Provides an explanation for alerts
        - It is fast
        - It is (more) resilient to evasion
    - Disadvantage
        - It detects only known attacks
        - It needs continuous updating
        - It is vulnerable to over-stimulation attacks
    
## IDS classification
- Timeliness:
    - Real-time (on-line, continuously running)
    - Non real-time (off-line, periodic)
- Response type:
    - Passive (generates alerts)
    - Active (blocks malicious traffic)
- State-dependency:
    - Stateful analysis
    - Stateless analysis
- System type:
    - Software
    - Hardware
    
## How an IDS works 
- Input information
    - Application-specific information: correct data flow, etc.
    - Host-specific information: local logs, syscalls, file system changes
    - Network-specific information: packets, etc
- Intrusion detection policies
    - Known bad: blacklist with known attacks or attackers
        - Reputation-based detection
        - Signature-based/rule-based/misuse-based detection
    - Known good: alert anything out of usual
        - Anomaly-based detection
- Response on intrusions
    - Passive response
    - Active response
    
# Honeypots
- A honeypot is a trap set to detect, deflect, or in some
manner counteract attempts at unauthorised use of information or network systems
- Honeypots are decoy systems that are designed to lure a
potential attacker away from critical systems
- It can be viewed as an intrusion detection technique used to
    - Learn from unknown attacks
    - Study intruders modus operandi
    - Better identify, understand and protect against threats
- Traffic landing in a honeypot is unsolicited
- Flexible tool with multiple applications
    - Prevention
    - Detection
    - Information gathering
    
## Classification
- By purpose
    - Production honeypots:
        - Meant to be used in production environments of companies
        - Characterised by ease of deployment and utilisation
        - Trade-off between ease of operation and the quantity of collected information
    - Research honeypots
        - Provide comprehensive information about attacks
        - More difficult to deploy
- By level of interaction
    - Low interaction honeypots
        - Emulates a small set of services, applications
        - Cannot be exploited to get complete access to the honeypot
        - The attacker is limited to the level of emulation
        - Tend to be production honeypots
        - Advantages: low risk, easy to deploy/maintain
        - Disadvantages: they capture limited information
    - High interaction honeypots
        - Use real operating system and applications
        - Attacker gain full access at network/system
        - Tend to be research honeypots
        - Advantages: capture extensive information
        - Disadvantages: high risk and time intensive to maintain
- By implementation
    - Physical honeypot:
        - A real machine on the network
    - Virtual honeypot:
        - Simulated or virtualised by a host machine that forwards the
          network traffic to the virtual honeypot
        - Multiple virtual honeypots can be simulated on a single host
        - Usually high-interaction honeypots
- By direction of the interaction
    - Server honeypots
    - Client honeypots
    
## Honeypots Workflow
### Phase: data control
Honeypots control and contain the activities of an attacker by interacting
with the attacker through network protocols

### Phase: data capture
-Honeypots monitor and log all of the activities of an attacker within the honeypot
- Keep it all at all levels
- Stores all captured data in one central location

### Phase: data analysis
- Honeypots analyse the data being collected
- Human-driven analysis
    - Rely on automated tools to process the data
- Machine-driven analysis
    - Assume that network connection are either
        - Malicious
        - anomalous
    
# IPsec
## Authentication Header (AH)
**Header**: 
<div style="text-align:center">
<img src="/static/course/postgraduate/network/ah.png"  alt=""/>
</div>

**Two Modes**:
<div style="text-align:center">
<img src="/static/course/postgraduate/network/ahmode.png"  alt=""/>
</div>

## Encapsulating Security Payload (ESP)
**Header**: 
<div style="text-align:center">
<img src="/static/course/postgraduate/network/esp.png"  alt=""/>
</div>

**Transport Mode**: 
<div style="text-align:center">
<img src="/static/course/postgraduate/network/esptrans.png"  alt=""/>
</div>

**Tunnel Mode**:
<div style="text-align:center">
<img src="/static/course/postgraduate/network/esptun.png"  alt=""/>
</div>

# Internet Key Exchange (IKE)
For DH Key Exchange and Perfect Forward Secrecy see 
[Cryptography](/course/postgraduate/crypto)



# SSL/TLS
<div style="text-align:center">
<img src="/static/course/postgraduate/network/sslhand.png"  alt=""/>
</div>

For vulnerability see [ssl vulnerabilities](/security/ssl)

# Privacy and Anonymity
- Privacy:
  - A state in which one is not observed or disturbed by others
  - You choose what you let other people know.
  - Confidentiality of information that you don’t want to share.
- Anonymity:
    - A condition in which your true identity is not known.
    - Confidentiality of your identity.
    - Unobservability of our actions when they occur.
    
## Anonymity
**Attacks**  
- Passive traffic analysis
    - Infer from network traffic who is talking to whom
    - To hide your traffic, you must carry other people’s traffic!
- Active traffic analysis
    - Inject packets or put a timing signature on packet flow
- Compromise of network nodes (routers)
    - It is not obvious which nodes have been compromised
    - Attacker may be passively logging traffic
    - Better not to trust any individual node
    - Assume that some fraction of nodes is good, but don’t know which

Requirement: anonymise the sender and/or the receiver
- Provide confidentiality of principal’s identities
- Linkage to actual identity only in restricted cases
- IT equivalent: online usernames
- Pseudonyms need sometimes to be resolved into the proper (underlying) names
- But naming and name resolution can be quite problematic.

## Mix Networks
- Public-key cryptography plus trusted re-mailer (Mix)
    - Public keys used as persistent pseudonyms.
    - Untrusted communication medium: designed to work in environment with an
      active attacker who
        1. Can learn origin, destination(s), and representation of all messages in the
          communication system;
        2. Can inject, remove, or modify messages;
        3. However, cannot determine anything about the correspondence between a set of
          encrypted items and the corresponding set of unencrypted items, or create
          forgeries.

### Single Mix
<div style="text-align:center">
<img src="/static/course/postgraduate/network/mixnet.png"  alt=""/>
</div>
For sending message M to agent at address B

$\\{r_1, \\{r_0, M\\}\_{pk_b}, B\\}\_{pk_{mix}} \rightarrow \\{r_0, M\\}_{pk_b}, B$  

- Input to Mix on left hand side of $\rightarrow$
- Mix generates output on right hand side and sends first component to B
- $r_i$ are padding strings of random bits
- This is just a variant of single proxy, with padding and encryption
- Mix also performs additional operations to foil traffic analysis

**Foiling Traffic Analysis Requirements**  
1. Agents/mixes work with uniformly sized items
   i.e., messages split (or padded) into fixed size blocks
2. Order of arrival hidden by outputting items in batches
   - Can use fix ordering (e.g., lexicographic) or random ordering
3. Repeated information must be blocked
   - So mixes must filter duplicates, cross-checking across batches
   - Or string r include, e.g., a time stamp
4. Sufficient traffic from a large anonymity set is required
   - Few clients sending entails weak anonymity
   - Solution involves clients regularly sending (and receiving dummy messages).

**Untraceable Return Addresses**  
- To respond to an anonymous sender x with a return message $M’$
- Single Mix case (with key $pk_{mix_1}$)
    - Sender includes “return address”: $\\{r_1, A_x\\}\_{pk_{mix_1}}, pk_x$
        - $r_1$ is a random string that can also be used as a shared key
        - $pk_x$ is a fresh public key, created for this purpose
        - $A_x$ is x’s actual address
    - Receiver sends to the “response” Mix: $\\{r_1, A_x\\}\_{pk_{mix_1}}, \\{r_0, M'\\}_{pk_x}$
    - The “response” Mix transforms this to
        - Second part sent to: $A_x$
- Encryption with $r_1$ masks input/output correlation $A_x, \\{\\{r_0, M'\\}\_{pk_x}\\}_{r_1}$
- Only the original sender can decrypt as he created both $pk_x$ and $r_1$

**Attacks**  
- (n-1) attack
    - What happens if an attacker knows (e.g., has sent himself) n-1 of the n messages 
      input to a mix?
    - Performed by flooding a node with fake messages alongside a single message to be
    traced.
    - The attacker can recognise her messages and therefore link the sender with the 
      receiver of the single message under surveillance.
    - This is an active attack

## Dining cryptographers (DC)
1. Each of the three cryptographers $C_1, C_2$ and $C_3$ flips an unbiased coin keeping
   the result $b_i$ secret ($i \in \\{1,2,3\\}$).
2. Each cryptographer whispers the result $b_i$ in the ear of the person to their
   immediate left.
3. Each cryptographer computes $d_i = b_i \oplus b_{i-1}$, where
   § where $b_i$ is the cryptographer’s own coin flip and
   § $b_{i-1}$ is the coin flip of the person on the right
   § Note that $d_0 = d_3$ and $b_0 = b_3$
4. A cryptographer that did not pay for the meal announces her own $d_i$
   A cryptographer that did pay for the meal lies by announcing the negation of $d_i$
   i.e., $d_i \oplus 1$.

# Wireless and IoT security
## Wireless security risk factors
- Channel:
    - Wireless networking typically involves broadcast communication, which is far
      more susceptible to eavesdropping and jamming than wired network
    - Wireless networks are also more vulnerable to active attacks that exploit 
      vulnerabilities in communications protocols
- Mobility:
    - Wireless devices are far more portable and mobile than wired devices
- Resources:
    - Some wireless devices, such as smartphones and tablets, have sophisticated
      operations systems but limited memory and processing resources with which to
      counter threats, including DoS and malwares
- Accessibility:
    - Some wireless devices, such as sensors and robots, may be left unattended in
      remote and / or hostile locations
    - This greatly increases their vulnerability to physical attacks
    
## IoT Security
### IoT vulnerabilities by layers
- Device-based: vulnerabilities associated with the hardware
- Network-based: vulnerabilities caused by weakness
originated from communication protocol
- Software-based: vulnerabilities related to the firmware
and/or the software of IoT device. 
  