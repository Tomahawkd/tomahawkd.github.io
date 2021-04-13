---
permalink: /course/postgraduate/network
title: Network Security
---

{% include title_patch.html %}

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
