---
permalink: /course/postgraduate/forensics
title: Computer Forensics and Cybercrime
---

{% include title_patch.html %}
{% include latex_support.html %}
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

**Amendments**
The amendments to the Computer Misuse Act 1990 by Part 5 of 
the Police and Justice Act 2006 are:
- Section 35. Unauthorised access to computer material, punishable by up to 2 years 
  in prison or a fine or both
- Section 36. Unauthorised acts with intent to impair operation of computer, 
  etc. punishable by up to 10 years in prison or a fine or both. This covers 
  Denial of Service (DoS) attacks.
- Section 37. Making, supplying or obtaining articles intended for use in 
  computer misuse offences, punishable by up to 2 years in prison or a fine or both

2. [Investigatory Powers Act](https://www.legislation.gov.uk/ukpga/2016/25/contents/enacted)

**Provisions of the Act**
- introduced new powers, and restated existing ones, for UK intelligence agencies and law
enforcement to carry out targeted interception of communications, bulk collection
of communications data, and bulk interception of communications;
- created an Investigatory Powers Commission (IPC) to oversee the use of all investigatory
powers, alongside the oversight provided by the Intelligence and Security Committee of
Parliament and the Investigatory Powers Tribunal. The IPC consists of a number of serving
or former senior judges. It combined and replaced the powers of the Interception of
Communications Commissioner, Intelligence Services Commissioner, and Chief
Surveillance Commissioner;
- established a requirement for a judge serving on the IPC to review warrants for accessing
the content of communications and equipment interference authorised by a Secretary of
State before they come into force;
- required communication service providers (CSPs) to retain UK internet users' "Internet
connection records" – which websites were visited but not the particular pages and not the
full browsing history – for one year;
- allowed 48 authorities such as police, intelligence officers and other government
department managers (including HMRC, the Department of Health, the Food Standards
Agency, the Gambling Commission, the Department for Work and Pensions, and
the Department for Transport) to see the Internet connection records, as part of a targeted
and filtered investigation, without a warrant;
- permitted the police and intelligence agencies to carry out targeted equipment interference,
that is, hacking into computers or devices to access their data, and bulk equipment
interference for national security matters related to foreign investigations;
- placed a legal obligation on CSPs to assist with targeted interception of data, and
communications and equipment interference in relation to an investigation; foreign
companies are not required to engage in bulk collection of data or communications;
- maintained an existing requirement on CSPs in the UK to have the ability to remove
encryption applied by the CSP; foreign companies are not required to remove encryption;
- put the Wilson Doctrine* on a statutory footing for the first time as well as safeguards for
other sensitive professions such as journalists, lawyers and doctors;
- provided local government with some investigatory powers, for example to investigate
someone fraudulently claiming benefits, but not access to Internet connection records;
- created a new criminal offence for unlawfully accessing internet data;
- created a new criminal offence for a CSP or someone who works for a CSP to reveal that
  data has been requested.

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
## The Investigative Methodology
### Differences between Conventional and Digital Forensics
**Conventional forensics** is built on top of **Locard's Exchange Principle**. 
This principle says that every contact leaves a trace, because it results in 
an exchange of physical material. When there is physical contact, 
there is indeed an exchange of physical material.

In theory, one might be able to cover digital tracks, and someone could actually 
commit the perfect cybercrime.
In practice, this is not realistic or devices generate a great number of 
logs with each action that we take and with every interaction that we make. 
This is the reason why **isolating a crime scene** is also very important in 
digital forensics.

In addition to isolation, the scenes have to be **frozen** as well. This also brings 
important challenges with respect to conventional forensics.

### Forensic Investigation
In a forensic investigation, these are the main methods that define 
a sound forensic process. First, we have the **acquisition process**. 
Once evidence is acquired, it needs to be properly **preserved**. 
A cornerstone process is to be able to **search** among the data and **analyse 
and evaluate** the evidence. Finally, probably the most boring, but yet 
the most important step is to **report** the findings and the conclusions 
that you have reached throughout your investigation. This has to be done 
in a thorough manner.

#### Acquisition
This is a process that starts with a **warrant** and for this, 
a judge needs to have **reasonable suspicion**.
There is a limitation on the type of devices that a forensic can seize. 
This is usually bounded by the warrant, based on such suspicions.
The **place where a device is found** is important to determine whether it's relevant 
or not.
In all the cases, the acquisition process is characterised by careful **documentation** 
of the elements seized. Forensic analysts have to always take photographs, 
tag all the bags with all the details where a device has been found and watch out 
for hidden devices in plain sight, like for example, USB drives that don't look 
like USB drives.

#### Preservation
In traditional forensics, you can destroy part of the evidence 
when you measure it with interventions. In computer forensics, however, 
you have tools to make **bit-for-bit images of all seized media**. 
You can do that with tools like Write-blocker, shown in the image, 
that modes all drive devices as read-only. Then you need to use 
**cryptographic hashes** to make sure the integrity of the files you have collected 
can be verified in the future.

#### Searching
**Keyword Searching**  
Keyword-searching provides perhaps the greatest potential to drastically reduce 
the data volume to a manageable and reviewable level. A method that is generally used 
is **keyword-searching**. However, there are certain files that will not be accessible 
to keyword-searching.  
**Handling Special Files**  
Some examples are encrypted files or password protected files, 
certain files in binary format, for example. These special files include 
also compressed archives, encoded attachments in emails, and so on. Luckily, 
there are tools to search on these files too.

So, what happens if you find evidence of **another crime**? Obviously, you must 
report the crime, but you **cannot** collect evidence for that crime. You must 
start an independent process, which includes getting a warrant and make sure 
that none of those processes overlap to avoid biases.

#### Analysis & Evaluation of Evidence
This is the **cornerstone process** of the forensic method. Because even if you find 
many pieces of evidence, if you're not able to correlate them to your hypothesis, 
explain their timeline, and identify what has happened, then you've got nothing.  
The other cornerstone of the investigation is every time that you come across evidence, 
you need to confront it. First, you need to assess how strong that evidence is, 
and then you need to challenge your own hypothesis using the evidence that 
you just found. As a result, you will be able to know how compelling evidence 
is during the evaluation process.

#### Reporting
This process tries to inform how the forensic analysis has reached a conclusion. 
It has to be done in a form and style that lets both **technical experts 
validate their findings**, but also so that **legal personnel and juries 
can understand it**. 
For this, a forensic analyst has to address an important trade-off that is not 
generally easy. To help here, it is customary to have at the beginning of 
the report an executive summary that puts in layman's terms what the evidence means. 
This is for possible presentation in a court of law.

### Scientific Method
Digital evidence can be used to answer fundamental questions relating to a crime,
including **sequencing** (when things happened), **linkage** (who interacted with whom),
**evaluation** of source (the origin of items) and **attribution** (who is responsible).
However, its complexity is a potential pitfall, even for experienced practitioners.

The complexity of computer systems requires the understanding that individual pieces 
of evidence may have multiple interpretations. To deal with digital evidence, you 
need to understand and make use of the scientific method. The scientific method 
combined with the digital forensics methodologies will enable you to adapt to 
differing circumstances and requirements and ensure that correct conclusions are drawn.

1. **Gather information and make observations**:  
   Firstly, legal evidence is acquired, preserved and searched. 
   You need to verify the integrity and authenticity of the discovered evidence 
   and survey all of it to determine how to proceed most effectively. 
   When working with digital evidence, this involves preprocessing, 
   salvaging deleted data, handling any special files, filtering out 
   irrelevant data and extracting embedded metadata. However, it is important 
   not to forget that not all evidence relevant to an investigation is digital 
   and to remember to include all information you have access to.
   
2. **Form a hypothesis to explain observations**:
3. **Evaluate the hypothesis**:  
   Once evidence is handled, you must form and evaluate a hypothesis. 
   This involves developing possible explanations and is most influenced 
   by the experience of the forensic practitioner. It is important not to 
   skew our thinking and analysis in favour of the working hypothesis. This is 
   called confirmation bias. People have a tendency to favour evidence and 
   facts that suit their hypothesis and discard or discredit that which 
   does not fit. The aim is to suppress biases and hunches, and try to 
   disprove the current working theory through experimentation.   

4. **Draw conclusions and communicate findings:**  
   Finally, when we have an explanation that is supported by the evidence we 
   must communicate our findings to decision makers. This may involve 
   being explicit about our degree of certainty, reporting how likely or unlikely 
   a given scenario is.

The scientific method is a **cyclic process**, requiring the forensic analyst 
to repeat the steps until a conclusion is reached.

### Uses of digital forensic analysis
**Attributing activities** on a computer to a particular person can be challenging. 
For example, logs showing that an internet account was used to commit a crime 
do not prove that the owner of that account was responsible, since someone else 
could have used the individual’s account. However, **personal communications** and 
**access to online banking** or **e-commerce accounts** can make it difficult for a person 
to deny responsibility for the illegal activities on the computer around 
the same time. It is important to use evidence from multiple independent sources.

**Assessing alibis** can also be tricky. Again, the use of evidence from multiple sources 
is essential, as it is not difficult to alter the clock on a machine or change 
the creation time of a file. However, **evidence of clock tampering** may enable a 
forensic practitioner to conclude that the computer owner intentionally backdated
a digital document for example.

**Determining intent** can be done by analysing **internet search history**, 
**suspicious behaviour** or simply through **notes** and **plans** that were not deleted. 
In several cases, internet searches on suspects’ computers revealed their intent 
to commit murder.

**Evaluating sources** of data can reveal that the piece of evidence was produced by 
a specific source, is a segment of the source, or was altered by the source. 
File formats have characteristics that may be associated with their source, 
eg, EXIF metadata. Comparing an item of evidence to an exemplar can reveal 
investigatively useful class characteristics or even individual characteristics, 
and lead to further breakthroughs.

Finally, there is **document authentication**. Significant attributes such as 
the author of a document or its date of creation can be tampered with, as 
was already mentioned. In these cases, it is possible to use **date-time stamps 
on files and in log files**, look for nuances on date-time stamps, look for 
meta-data within files or inspect the files through digital stratigraphy. 
Stratigraphy, which is a building block process in archeology, is the study of layers 
to determine elements such as the origin, the composition, or the time frame 
of every layered component. Digital stratigraphy is the process for which 
an in-depth analysis of a digital device is used to extract attributes buried 
within storage media.

## The e-discovery process
Exchange of data between parties in civil or criminal litigation.

In that case, Judge Shira A. Scheindlin ruled that reasonably accessible data is:

1. active, online data, such as hard drive information
2. near-line data, to include robotic tape libraries
3. offline storage, such as CDs or DVDs.

On the other hand, not reasonably accessible data is:
1. backup tapes
2. erased, fragmented, and damaged data.

### Electronic Discovery Reference Model
The steps outlined go through the whole life cycle of 
electronically stored information (ESI), from creation to disposal.
The model then outlines the following stages of the process.

1. **Preservation**  
   Ensuring that ESI is protected against inappropriate alteration or destruction.
2. **Collection**  
   Gathering ESI for further use in the e-discovery process (processing, review, etc).
3. **Processing**  
   Reducing the volume of ESI and converting it, if necessary, 
   to forms more suitable for review and analysis.
4. **Review**  
   Evaluating ESI for relevance and privilege.
5. **Analysis**  
   Evaluating ESI for content and context, including key patterns, 
   topics, people and discussion.
6. **Production**  
   Delivering ESI to others in appropriate forms and 
   using appropriate delivery mechanisms.
7. **Presentation**  
   Displaying ESI before audiences (at depositions, hearings, trials, etc), 
   to elicit further information, validate existing facts or positions, 
   or persuade an audience.

# W7: Memory and Network Forensics
## Device Forensics
Primary sources of evidence are storage devices: hard disk drives (HDDs) 
solid state drives (SSDs) and external media, such as USB sticks. 
Data stored on those devices can be understood through the model of 
data abstraction layers. The higher layers include the types below.
- **Physical media**  
  The lowest level examinations are performed on this layer. 
  It is accessed through a host bus adapter (HBA) interface. 
  HBAs implement standard protocol low-level operations: SATA and SCSI.
- **Block Devices**
  HBAs present a block device abstraction of sequences of fixed-size blocks, 
  between 512 and 4096 bytes in size. The term sector is used as the units 
  of magnetic hard disks. Data acquisition at the block level is done 
  through imaging.
- **File System**
  The block device has no notion of files or directories, so it is the task 
  of the file system to organise the block storage into a file-based store. 
  It is this layer that provides files with attributes such as name, size, 
  owner, timestamps, access permissions, etc.
- **Application Artifacts**
  This final layer is where we find executable binaries, libraries, 
  configuration and log files and registry entries. Actions of the system 
  at this level require greater effort and more expert knowledge to reconstruct. 
  They are particularly costly in closed systems like Windows.

**Physical data acquisition** is the process of obtaining data directly from 
hardware media, without the mediation of any potentially untrusted 
third-party software. This is not always possible, so we use **logical data 
acquisition** which relies on one or more software layers as intermediaries to 
acquire the data from the storage device.

### File content carving
When data is in fragments and can’t be recovered whole, we use a process 
called file content carving. This is a process of reassembling file contents 
from fragments, usually in the absence of file system metadata.

The reason why this process works is because most file formats have 
specific beginning and end tags. Additionally, file systems strongly favour 
a sequential file layout to maximise throughput, so related files are often 
stored near each other.

<div style="text-align:center">
<img src="/static/course/postgraduate/forensics/device%20forensics.png"  alt=""/>
</div>

The first type, **contiguous**, is simplest. The header of file A is followed by 
the contents of file A and ends with a footer of that file. Then the header of 
the next file B is present, followed by the contents and the footer.

The second type is **nested**. This is when the header of file A is followed by 
a part of that file’s content, then the header of file B is present followed 
by the content and footer of that file. Only then do we find the rest of file 
A’s content and its footer.

The third type is called **bifragmented**. This is when the header and some part 
of file A is present, followed by some unrelated data, followed by the remains 
of the content and the footer. The recovery of this file will depend on 
how easily the unrelated data is recognised and separated from the contents 
of the file.

The fourth type is **interleaved**. This is when we encounter the header and part 
of file A, then the header and part of file B, then the rest of file A with 
its footer, and then finally the rest of file B with its footer.

## Memory and Network Forensics
### Motivation
The main reason why we are interested in doing memory forensics is 
that data can persist for quite a long time in volatile memory. 
Volatile memory is a very rich ecosystem that can contain information that 
never makes it to the hard drive, such as passwords to decrypt and 
encrypt drives, and so on. But there are also other reasons why one 
may want to do live forensics. An example being the need to analyse 
a SCADA system or any system that needs to be 24/7 online.

### Memory Forensics
#### Process Information
It is actually practical to identify and enumerate all **running processes**, 
**threads and loaded system modules**. We can actually obtain a **copy of the 
individual processes' code, the stack, the heap and all the data segments**. 
All this is particularly useful when analysing compromised machines, 
as it allows you to identify suspicious services, abnormal parent and child 
relationships, and more generally, to search for known symptoms of compromise 
and patterns of attacks.
#### Artifacts and Fragments
The memory management system tends to be reactive and leaves a lot of 
artefact traces behind. This is primarily an effort to avoid any processing 
that is not necessary for the functioning of the system. Caching disk and 
network data tends to leave traces in memory for a long time.
#### File Information
We can also identify any **open files**, **shared libraries**, **shared memory** and
**anonymously mapped memory**. This is particularly useful for identifying
correlated user actions and file system activities, potentially
demonstrating their intent.
#### Network Connections
One can also extract from memory open and recently **closed network connections** 
and **protocol information**. This type of information could readily be used to 
identify related parties and communication patterns between them.

### Network Forensics
It relates to the monitoring and analysis of computer network traffic 
for the purposes of information gathering, legal evidence, or intrusion detection.

#### Scenarios
The first, relating to security, involves monitoring a network for 
anomalous traffic and identifying intrusions. An attacker may be able to 
**erase all log files on a compromised host**. But network-based evidence might 
therefore be the only evidence available for forensic analysis.

The second form relates to law enforcement. In this case, 
analysis of capture network traffic can include tasks such as 
**reassembling transmitted files**, **searching for keywords** and **parsing 
human communications** like emails and chat sessions.

**Strategies**
- **catch-it-as-you-can**  
  This is where all packets passing through a certain traffic point are captured 
  and written to storage with analysis being done subsequently in batch mode.
  This approach requires large amounts of storage.
  
- **Stop, Look, Listen**  
  This is where each packet is analysed in a rudimentary way in memory, and only 
  certain information is saved.

#### Medium
1. **Ethernet**  
   Applying forensic methods on the ethernet layer is done by 
   eavesdropping beta streams with tools called sniffers.
   
2. **Wireless**  
   The main goal of wireless forensics is to provide a methodology and 
   tools required to collect and analyse wireless network traffic that 
   can be presented as valid digital evidence in a court of law.

# W8: Anti-forensics
Anti-forensics is the discipline that tries to evade and thwart the forensic process through 
the implementation of attacks and adoption of adversarial actions.

## Adversarial Actions
- **Destroy**  
  Potentially useful digital forensic evidence of their activities (wiping logs)
- **Divert by**  
  Planting misleading digital forensic evidence (spoofing the source IP address 
  of a cyberattack)
- **Deceive by**  
  Hiding potentially useful digital forensic evidence (steganography or onion routing)
- **Deny**  
  Access to potentially useful digital forensic evidence (cryptography)
  
## An Example (Full Disk Encryption)
a disk has been encrypted using full disk encryption (FDE).

**Countermeasure**:  
In order for the full disk encryption system to operate, 
the decryption key must be stored somewhere, typically in memory or 
in a separate device.

The use of live forensic techniques on the main memory 
might be able to retrieve the password encryption key that has been used 
for full disk encryption.

When the full disk encryption system is not in operation, the key might be stored 
in a trusted platform model like what happens for example in Android, 
or mostly in iOS, in iPhone, or it can be hidden in a partition or somewhere else. 
In an alternative approach, you can actually freeze the RAM. This kind of attack 
is called a **cold boot attack** and would allow you to recover the encryption keys 
that are stored in RAM memory.

### Forensic Soundness considerations
- Collecting data from a live system causes changes
    - An examiner will need to explain the changes
  
- Some schools argue that the acquisitions should not alter the evidence
    - This does not happen in traditional forensics
    - The methods are forensically sound
    
- Key to forensic soundness
    - Documentation

### Forensic Examination
In cases when credentials for decrypting a disk are not available at the time 
of acquisition, a forensic duplicate of the encrypted disk can be acquired 
using a normal method. Data can be decrypted later in a number of ways.

- Attempt decryption
- Load duplicate into a virtual environment
- Restore to a working hard disk
- Boot a restored clone of the original disk

# W9: Incident Management
## Intrusion response and incident handling
- Incident: An unexpected event that disrupts the normal operation of a system
- Objective: Return the service to normal as quickly as possible after disruption
- Aim: Create as little negative impact on the business as possible

### Incident Management Process
The incident management process generally has two modes of operation.   
**In practice**, the team managing the incident try to find a **temporal workaround 
to ensure services are up and running**.   
**In parallel**, the incident management team **investigates the incident**, 
**identifies the cause root** and **finds a permanent fix**.

### Incident Managment Workflow
<div style="text-align:center">
<img src="/static/course/postgraduate/forensics/workflow.png"  alt=""/>
</div>

## Intrusion analysis, monitoring and logging
<div style="text-align:center">
<img src="/static/course/postgraduate/forensics/lifecycle.png"  alt=""/>
</div>

### Logging Element
- Event: Single occurrence within an environment
  - Event Field: Describes one characteristic of the event.
  - Event Record: Collection of event fields
- Log: Collection of event records
- Audit: Process of evaluating logs
- Recording: Process of tracking events fields
- Logging: Process of saving events into logs
- Security Incident: Occurrence of a security event (eg,
  intrusion attempt, data leakage, DoS, etc).

### Normalisation
Logs come in different formats, syntax and types, eg, ASCII, binary, etc. 
There are some standards, but generally there is a lack of consensus. 
Normalisation is the procedure in which all logs that are processed by 
an intrusion detection system are processed and stored in a common format, 
and all relevant attributes of the event are identified and processed.

### Security information and event management (SIEM)
**Security information management (SIM)**  
The practice of collecting, monitoring and analysing security-related data from 
computer logs.

A security information management system (SIMS) automates that practice. 
It is a type of software that automates the collection of event log data from 
security devices, such as firewalls, proxy servers, intrusion-detection systems 
and antivirus software. It translates the logged data into correlated and 
simplified formats and has strong log management capabilities.

SIEM systems gather data from many devices, correlate events and provide information 
and knowledge in the form of reports and alerts.

**OSSIM (Open Source SIM) Architecture**
<div style="text-align:center">
<img src="/static/course/postgraduate/forensics/sim.png"  alt=""/>
</div>

A diagram showing a frontend connected to the management server which 
contains the server and framework. The server is connected to DB. 
It is also connected to the sensor which hosts the agent and plugins 
such as snort and spade.

The OSSIM evaluates the risk as follows:  
$Risk = (Asset * Priority * Reliability) / 25$

- **Asset** is the quantitative measure of the importance and/or a notion of 
  how vulnerable a given asset is.
- **Priority** is the threat or impact of the attack.
- **Reliability** is the probability that a given set of events will 
  actually be an attack.
  
## Sensing strategies
A sensing strategy defines how the SIEM is deployed. It details where 
to place the different sensors, how these sensors are interconnected, 
what the security measures are, who the people in charge of each sensor are, etc.

Here is an example diagram of a university network, courtesy of S. Pastrana.

<div style="text-align:center">
<img src="/static/course/postgraduate/forensics/example.jpg"  alt=""/>
</div>