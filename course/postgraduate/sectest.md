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

