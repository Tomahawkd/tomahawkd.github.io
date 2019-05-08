---
title: SSL/TLS Previous Vulnerabilities
---
{% include title_patch.html %}

### Padding Oracle On Downgraded Legacy Encryption (POODLE)

Related CVE: CVE-2014-3566

Target: SSLv3, CBC

- some servers/clients still support SSL 3.0 for interoperability and compatibility with legacy systems (casting)
- a vulnerability that exists in SSL v3.0 which is related to Block Padding (attacking)



1. Cast to SSLv3  
![POODLE attack](https://d3eaqdewfg2crq.cloudfront.net/wp-content/uploads/2017/01/image29.png)

2. Attack SSLv3

CBC encryption in SSL 3.0 is that its block cipher padding is not deterministic, and not covered by the MAC

```c
block-ciphered struct {
	opaque content[SSLCompressed.length];
	opaque MAC[CipherSpec.hash_size];
	uint8 padding[GenericBlockCipher.padding_length];
	uint8 padding_length;
} GenericBlockCipher;
```

MAC generation:

```
hash(MAC_write_secret + pad_2 +
	hash(MAC_write_secret + pad_1 + seq_num +
		SSLCompressed.type + SSLCompressed.length + SSLCompressed.fragment));
```

> pad_1:  The character 0x36 repeated 48 times for MD5 or 40 times for SHA.
>
> pad_2:  The character 0x5c repeated 48 times for MD5 or 40 times for SHA.
>
> seq_num:  The sequence number for this message.
>
> hash:  Hashing algorithm derived from the cipher suite.

#### Padding Oracle

Target: CBC



### Browser Exploit Against SSL/TLS attack (BEAST)

Related CVE: CVE-2011-3389

Target: SSLv3/TLSv1, CBC

An attacker can “decrypt” data exchanged between two parties by taking advantage of a vulnerability in the implementation of the Cipher Block Chaining (CBC) mode in TLS 1.0 which allows them to perform chosen plaintext attack.



### Compression Ratio Info-leak Made Easy (CRIME)

Related CVE: CVE-2012-4929

Target: TLS Compression

![compression ratio](https://d3eaqdewfg2crq.cloudfront.net/wp-content/uploads/2017/01/image14.png)

![CRIME attack](https://d3eaqdewfg2crq.cloudfront.net/wp-content/uploads/2017/01/image02-1.png)

![CRIME attack](https://d3eaqdewfg2crq.cloudfront.net/wp-content/uploads/2017/01/image02-1.png)

![bruteforce](https://d3eaqdewfg2crq.cloudfront.net/wp-content/uploads/2017/01/image08.png)



### Browser Reconnaissance and Exfiltration via Adaptive Compression of Hypertext (BREACH)

Related CVE: CVE-2013-3587

Target: HTTP Compression in TLS Communication

Same as above



### HeartBleed

Related CVE: CVE-2014-0160

![TLS vulnerability - heartbleed](https://d3eaqdewfg2crq.cloudfront.net/wp-content/uploads/2017/01/image07.png)

![heartbeat message](https://d3eaqdewfg2crq.cloudfront.net/wp-content/uploads/2017/01/image10.png)

```c
#define n2s(c,s)((s=(((unsigned int)(c[0]))<< 8)| \
		(((unsigned int)(c[1]))    )),c+=2)
#define s2n(s,c) ((c[0]=(unsigned char)(((s)>> 8)&0xff), \
		 c[1]=(unsigned char)(((s)    )&0xff)),c+=2)

int dtls1_process_heartbeat(SSL *s) {
	unsigned char *p = &s->s3->rrec.data[0], *pl;
    unsigned short hbtype;
    unsigned int payload;
    unsigned int padding = 16; /* Use minimum padding */
 
    /* Read type and payload length first */
	hbtype = *p++;
    n2s(p, payload);
    pl = p;
 
	//do something with the payload
 
    if (s->msg_callback)
        s->msg_callback(0, s->version, TLS1_RT_HEARTBEAT,
            &s->s3->rrec.data[0], s->s3->rrec.length,
            s, s->msg_callback_arg);
 
    if (hbtype == TLS1_HB_REQUEST) {
        unsigned char *buffer, *bp;
        int r;
 
        /* Allocate memory for the response, size is 1 byte
         * message type, plus 2 bytes payload length, plus
         * payload, plus padding
         */
		buffer = OPENSSL_malloc(1 + 2 + payload + padding);
		//allocate all that memory without any checks
        
        bp = buffer;
 
        /* Enter response type, length and copy payload */
        *bp++ = TLS1_HB_RESPONSE;
        s2n(payload, bp);
        memcpy(bp, pl, payload);
        bp += payload;
        /* Random padding */
        RAND_pseudo_bytes(bp, padding);
 
		r = dtls1_write_bytes(s, TLS1_RT_HEARTBEAT, buffer, 3 + payload + padding);
		//send the response back, even the stuff the attacker wasn't supposed to see
 
        if (r >= 0 && s->msg_callback)
            s->msg_callback(1, s->version, TLS1_RT_HEARTBEAT,
                buffer, 3 + payload + padding,
                s, s->msg_callback_arg);
 
        OPENSSL_free(buffer);
 
        if (r tlsext_hb_seq) {
            dtls1_stop_timer(s);
            s->tlsext_hb_seq++;
            s->tlsext_hb_pending = 0;
        }
	}
    return 0;
}
```



## Conclusion

1. Some logical vulnerabilities in **operating mode of block cipher** (padding oracle)
2. Partically verifing data structure (SSLv3 GenericBlockCipher)
3. Misconfigure in client and server (POODLE)
4. Vulnerbilities in SSL/TLS implement (Heartbleed)