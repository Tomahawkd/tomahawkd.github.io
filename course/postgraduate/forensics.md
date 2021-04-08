---
permalink: /course/postgraduate/forensics
title: Computer Forensics and Cybercrime
---

{% include title_patch.html %}

{% include gen_index.html %}

# W1: Introduction to cybercrime and computer forensics

## Cybercrime

1. **Crime**: An act contravening the criminal law in a particular jurisdiction.
2. **Digital Crime**: Any crime that involves a digital device.
3. **Cyber Crime**: Originally, this was defined as a digital crime involving 
   networks. Nowadays, the meaning is more or less the same as digital crime, 
   however, it is technically a subset of digital crime as not all 
   digital devices are networked.
4. **Computer Crime**: Originally, crime involving mainframe computers.

### Digitally-assisted crime

Conventional crimes which may involve the use of a digital system 
when they are committed.  
For example: forgery, fraud, blackmail, extortion, embezzlement, theft, etc.

### Digitally-related crime

Crimes where the intention is to alter the contents or operation of 
a digital system or network.  
For example: hacking, malware, denial of service, etc.

## Malware
Malware is malicious software that was unwillingly and/or unwittingly 
installed on a user's computer.  
Once an attacker has malicious software running on a victim computer, 
they can perform any action that the owner of that computer can perform.

### Types of malware
- Virus
- Worms
- Trojans
- Spyware
- Adware
- Ransomware
- Rootkit
- SPAM
- Bots

### Behaviours
- Sabotage
- Fraud
- Theft
- SPAM
- Service misuse

# W2: Advanced malware and worldwide SPAM economy

## Terms
- **Infection Vector**: The method malware uses to propagate itself 
  or infect a system or device.
  
## Malware Infection
### Social Engineering
The first way in which computer users are infected with malware 
is social engineering. That is, users are made to believe that 
they are installing a useful program instead of a malicious one. 
The most common vehicles are:

- **Email Attachments**
- **Software Updates**
- **Scareware**: Malware scares the user by telling them 
  that their computer is infected with other malware, 
  and tricks them into downloading malicious software.
  
### Drive-by-download
In a drive-by download attack, a vulnerability on the user’s computer 
is exploited to have the computer automatically download and 
install malicious software.

Common components that are exploited:
- **Web browser**
- **Flash plugin**
- **ActiveX plugin**

Procedure: 
1. The user clicks on a link and is redirected to a malicious site.
2. Malware is downloaded to the user’s computer.
3. By exploiting a vulnerability, malware is executed 
   and spread without the user’s interaction.

## Malware Hiding
- **Instruction Reordering**  
  Reordering is where the order of the instructions is changed 
  so that the output is the same, however, again the signature 
  is different.
- **Instruction Substitution**  
  Substitution is where different instructions are used which 
  produce the same result, eg adding to itself, rather than 
  multiplying by two.
  
## Botnet
### Botnet Types
#### Traditional Botnets: IRC botnets
IRC bots were later adapted to control malware: malicious
programs would join a IRC channel - the botmaster would connect
to the same channel and type in commands that the bots had to
carry out.  
**Problems**: known protocol, easy to filter, researchers could join the
channels and read the commands issued by the botmaster.

#### Traditional Botnets: proprietary protocols
Cybercriminals moved to proprietary protocols: bots will connect to
a command and control server under their control, using a custom
encrypted protocol.  
**Problem**: Single C&C server, easy to blacklist.

#### The Evolution of Botnets: multi-tier botnets
To make blacklisting more difficult, cybercriminals started using
multiple command and control servers for their botnets.  
In particular, these C&C servers are organised in a hierarchy:
Bots would connect to a first layer of servers (proxies).  
Proxies would then relay the connections to the main C&C server
(mothership).

#### The Evolution of Botnets: peer to peer botnets
To make their infrastructures even more resilient, cybercriminals
added peer to peer capabilities to their botnets.  
Specific bots (those with better network connectivity) are selected
as proxies, and the other bots are instructed to connect to them.  
**Problems**: this makes infiltration by researchers easier – they can
pretend to be a bot and be selected as a proxy by the botnet.  
At that point, they can intercept the communication between the
lower tier bots and the C&C server.

### Botnet Algorithms
#### Fast flux
C&C servers are accessible through domain names (eg, malicious.com), 
but the physical servers (IP addresses) that these domains point to 
are constantly changed.

#### Domain Generation Algorithm
To make things even more robust, cybercriminals constantly change 
the domain names of their C&C servers.  
In particular, bots follow a Domain Generation Algorithm (DGA) that, 
at each point in time, tells them where they can contact 
the active C&C server.

## SPAM economy
### Monetising Botnets
- Sending email spam
- Posting malicious content on social networks
- Performing advertisement fraud
- Encrypting victim data and asking for a ransom
- Stealing the victim’s financial information

### Service Provided
- **Botmasters**: infect computers, create botnets, and rent them.
- **Harvesters**: crawl the internet looking for valid email addresses.
- **Search engine optimisation (SEO) experts**: make sure that malicious sites 
  are highly ranked on search engines.
- **Spam affiliate programs**: Set up sites selling goods – spammers can sign up 
  to these programs and receive their cut.
  
# W3: Malware Uses and Monetization
## Information Stealing Malware
Malware monitors its victim’s activity and copies login information to
online accounts (Gmail, Facebook, etc) as well as financial information
(credit card numbers, bank account numbers).

### Man-in-the-browser Attacks
A technique used by financial malware: the malicious
program changes the browser window and makes the
user think that they are performing a legitimate
transaction when they are sending money to the
attacker instead.

### Mobile Banking Trojans
1. Overlay the real banking app and steal credentials
2. Hijack the auth code sent via SMS to the victims' phone
3. Confirm the transaction and steal the money

## Ransomware
Emerging type of malware – after infection, the user’s
files are encrypted and cybercriminals ask for a
ransom to decrypt them again.

## Monetization
Cybercriminals gather in online communities to trade services. 
Such communities include forums, Internet Relay Chat (IRC) channels, 
web stores and crowdsourcing platforms. Due to the dishonesty of 
the involved parties, underground communities face the risk of becoming a 
lemon market, so underground markets cope with fraud by self-policing. 
They employ specialised people to vet new buyers and sellers through:

- scrutinising newly listed products and services
- interviewing people who want to join the community
- requiring recommendations of members who are already in the community to join.

Alternatively, communities can employ an escrow system: payments are made 
to the community administrator, and they are forwarded to the seller only 
after the authenticity of the service/product has been confirmed by the buyer.

### Money Mule
The criminal will recruit a person and send money to them by using traceable means 
(eg, a check or wire transfer). This money could come from a stolen bank account. 
The mule will then have to transfer the money to an account used by the criminal 
using untraceable means (eg, Western Union). These transactions have to be 
carried out in person and are therefore a weak point in the operation.

|          | Before Discovery | After Discovery |
| -------- | ---------------- | --------------- |
| Victim   | -$100            | $0              |
| Bank     | $0               | $0              |
| Mule     | +$10             | -$100           |
| Attacker | +$90             | +$90            |

Gains and losses of the various parties for a $100
fraudulent transfer via a mule. Before discovery the victim
is down the full amount and the mule receives 10%. After
discovery the bank makes the victim whole (as required by
Regulation E), and reverses the payment to the mule. The
attacker is in effect stealing from the mule and not from the
account he has compromised. If the mule has insufficient
funds to cover the reversal, the bank is left with a (perhaps
uncollectible) debt.
[Phishing and Money Mules](https://doi.org/10.1109/WIFS.2010.5711465)

### Captcha
To perform activities such as creating fake accounts and posting spam comments 
on blogs, cybercriminals needed to solve many CAPTCHAs. For this reason, 
specialised services appeared in the form of automated software solvers 
and humans that manually solve CAPTCHAs.

### Fake Social Media Accounts
Social networks are another potential source of revenue, and a key element 
needed by criminals to promote content and products on social media is 
fake accounts. The creation of these accounts presents multiple challenges 
(rate limiting, solving CAPTCHAs, etc) and is therefore usually carried out 
by specialised actors.

### Proxies
Another service cybercriminals use is a proxy. A proxy is a server that 
relays connections to and from a host. It is commonly used to hide the 
location of a host or to circumvent censorship. In addition to 
legitimate proxy servers, criminal ones exist. They often use infected computers 
or compromised servers as proxies.

### Exploit Kits
To streamline the process, tools that can automatically exploit a number of 
vulnerabilities are sold on the underground market. They are called exploit kits. 
Exploit kits include hundreds of exploits for different program versions and 
system configurations.

### Credit card processing and cryptocurrencies
Most transactions online are performed by credit cards. To collect as 
many customers as possible, cybercriminals tend to accept credit card payments too.
As an alternative to credit card payments, cybercriminals can also use bitcoin and 
other cryptocurrencies.

# W4: Cybercrime mitigations
## Engineering
The most obvious countermeasures might be **antivirus software and 
intrusion detection systems (IDS)**. One way to characterise IDS is by 
distinguishing the type of identification they employ. For example, 
misuse-based IDS rely on models of malicious behaviour (traditionally signatures) 
to identify matching entries in the event stream, whereas anomaly-based IDS 
rely on models of normal behaviour to identify anomalous entries in the event stream.

**Anti-malware technology** can prevent malware from infecting computers, 
but this detection is not bulletproof. To reduce the number of vulnerabilities 
in a user’s computer, it is important to patch any vulnerabilities as soon as 
they are discovered. Modern software usually applies security patches automatically 
(eg, Microsoft’s ‘Patch Tuesday’ or Google Chrome’s automatic updates).

Another easy countermeasure to employ against malware operations is 
to recognise IP addresses that are involved in malware activity and block 
any traffic directed to/from them. To make this operation easier, multiple services 
compile blacklists of known malicious IP addresses. **Blacklists** roughly fall 
in two categories:

1. Blacklists that protect against infected computers  
   These services tell their users whether a certain computer that is trying to 
   communicate with them is known to be infected with malware.

2. Blacklists that protect against malicious servers  
   These services tell their users whether the server or webpage that they are 
   trying to communicate with is known to be malicious. Some blacklists 
   contain information about C&C servers (eg, Spamhaus XBL), others about 
   malicious web pages (eg, Google Safebrowsing).
   
### Mitigating blackhat search engine optimisation
Firstly, the search engine provider can penalise any malicious search results, 
for example by adding a ‘hacked’ label next to malicious search results. 
These work, but are an arms race as criminals continuously adapt. The second way 
is to seize the domains themselves. This is similar to blacklisting and involves 
taking down a domain that takes part in SEO once it is detected. 
However, this is slow and cybercriminals have time to react. There is a constant push 
and pull, and a constant need to balance the various trade-offs.

Large online services receive huge quantities of abuse. Such abuse can 
be clustered in three ways:

1. Similar content: the provider can monitor similar messages that are sent in bulk.
2. Same sending host: the provider can monitor hosts (IP addresses) that have 
   sent malicious emails in the past.
3. Same sending account: the provider can monitor accounts that have sent 
   malicious emails in the past.
   
### Botnets Mitigation
#### Clean up email lists from non-existing addresses
An effective mitigation consists of reporting to known bots that the 
email address they tried to contact does not exist. This places spammers 
in a catch 2 situation:

- If spammers accept this feedback, they will remove valid addresses from their lists.
- If spammers do not accept this feedback, they are stuck with email lists that 
are mostly composed of non-existing addresses.
  
#### Retry multiple times in the case of network errors
Spamming bots are typically located in home networks, and they often have 
bad network connections. Spammers optimise the performance of their bots 
by having them retry multiple times after receiving network errors 
(ie, after a network timeout).

#### Do not use too many bots
Researchers could cripple the efficiency of a botnet by registering 
fake bots to it. These bots would speak the C&C protocol correctly, 
but would not perform any malicious activity.

#### Botnet Take down
##### Seizing active C&C servers
Infected computers can’t cause harm if they cannot reach their C&C servers. 
For this reason, seizing C&C servers is a priority when performing a botnet takedown. 
Botnet takedowns can be performed by law enforcement after receiving authorisation 
by a court, or they can be performed by ISPs after identifying that malware operators 
are in breach of their terms and conditions.

##### Mitigating existing infections
Taking down C&C servers is the first step, but existing infected computers 
can still be a problem. If the botnet used a DGA algorithm to locate the C&C, 
cybercriminals could set up new servers and have their botnet back in business.

##### Cleaning up infected computers
The last step of an effective takedown is cleaning up victim computers 
from the malware that infects them.

## Economics
### Effects of the engineering countermeasures
A less efficient botnet also brings less money to its botmaster.  
Similarly, making a botmaster believe that their bots are performing 
poorly will force them to purchase new ones, losing money

### Intervening on the price of domains
Botnets usually use domains to tell their bots how to
contact the C&C – in the case where a DGA is used,
many domains are required.

### Intervening on rogue ISPs
Internet service providers are linked to each other, in the
mutual understanding that none of them should act maliciously.  
A bullet-proof hosting provider is a provider that commits to
not respond to enquiries by law enforcement and to not take
down its customers’ systems.

### Intervening on rogue banks
Banks need to keep good relationships with other financial institutions who 
will otherwise stop doing business with them.

### cryptocurrencies
- Victims might find it difficult to make payments in the required currency, 
  resulting in lower efficiency for the cybercriminal operation.
- Customers might prefer other crooks who accept more traditional forms of payment, for
  example, Paypal.

## Education
### Initiatives to educate the general public
User awareness can help with reducing the rate of malware infections.  
Education campaigns can raise awareness on matters such as:
- Social engineering, on how to avoid installing scareware.
- Software updates, on how to keep systems up to date to avoid drive-by download attacks.
- Scams, on how not to fall victim to money mule or reshipping mule scams.

## Law
### Arresting criminals is more effective
Botnet takedowns are effective in stopping current cybercriminal operations.

However, if the mastermind behind a botnet is still out there, nothing prevents 
them from setting up a new operation.

Creating another instance of a botnet is easy when the malware code needed to do so
is already written.

In addition, the malware author can learn from what made the takedown possible and 
make the operation more resilient.

For this reason, prosecuting malware authors and sending them to prison is often 
considered a more lasting mitigation against cybercriminal operations.

### Takedowns are often initiated by court orders
Law enforcement needs authorisation by a court before proceeding with 
taking down C&C servers.

In general, this authorisation can be granted for two reasons:
- Because the act of misusing computers through malware is illegal.
- Because the operations that the botnet carried out are illegal.

Depending on the country where a certain crime is prosecuted, going through 
the second route might be easier.

### Prosecuting the act of using malware
Infecting user computers is illegal in most countries.

In the UK, these matters are regulated by the Computer Misuse Act from 1990.

This act considers three criminal offences:
- Unauthorised access to computer material, punishable by 2 years imprisonment.
- Unauthorised access to computer material with intent to commit further offences, 
  punishable by 5 years imprisonment.
- Unauthorised modification of computer material, punishable by 10 years imprisonment.

### Prosecuting the crime committed through malware
The Computer Misuse Act is particularly tough against illicit computer access geared
towards committing additional offences.

Such additional offences, however, can be prosecuted on their own and are regulated 
by their own pieces of legislation.

# W5: Legal Framework
## Key pieces of legislation
1. [Computer Misuse Act](https://www.legislation.gov.uk/ukpga/1990/18/crossheading/computer-misuse-offences)
2. [Investigatory Powers Act](https://www.legislation.gov.uk/ukpga/2016/25/contents/enacted)

## Regulation of security technologies
The following principles for the handling of digital electronic evidence come from 
the Association of Chief Police Officers (ACPO).

1. No action taken by law enforcement agencies or their agents should change data 
   held on a computer or storage media which may subsequently be relied upon in court.
   
2. In circumstances where a person finds it necessary to access original data held 
   on a computer or on storage media, that person must be competent to do so and 
   be able to give evidence explaining the relevance and the implications of their 
   actions.
   
3. An audit trail or other record of all processes applied to computer-based 
   electronic evidence should be created and preserved. An independent third party 
   should be able to examine those processes and achieve the same result.
   
4. The person in charge of the investigation (the case officer) has 
   overall responsibility for ensuring that the law and these principles are adhered to.
   

# W6: The Forensics Process

# W7: Memory and Network Forensics

# W8: Anti-forensics

# W9: Incident Management