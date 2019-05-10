---
permalink: /security/cs
title: OpenSSL C/S Implementation Demo
---
{% include title_patch.html %}

利用OpenSSL实现简单的Client-Server通信系统

- Client

```c
#include <sys/socket.h>
#include <arpa/inet.h>
#include <openssl/ssl.h>
#include <openssl/err.h>

#define HOST_NAME "127.0.0.1"
#define HOST_PORT "4433"

int verify(int t, X509_STORE_CTX *ctx) {
    return 1;
}

void handleFailure(int t) {
    long e = ERR_get_error();
    printf(ERR_error_string(e, NULL));
    exit(t);
}

int main() {

    long res = 1;

    SSL_CTX *ctx = NULL;
    BIO *web = NULL, *out = NULL;
    SSL *ssl = NULL;

    SSL_library_init();
    SSL_load_error_strings();

    const SSL_METHOD *method = TLSv1_2_method();
    if (NULL == method) handleFailure(1);

    ctx = SSL_CTX_new(method);
    if (ctx == NULL) handleFailure(2);

/* Cannot fail ??? */
    SSL_CTX_set_verify(ctx, SSL_VERIFY_PEER, verify);

/* Cannot fail ??? */
    SSL_CTX_set_verify_depth(ctx, 4);

/* Cannot fail ??? */
    const long flags = SSL_OP_NO_SSLv2 | SSL_OP_NO_SSLv3 | SSL_OP_NO_COMPRESSION;
    SSL_CTX_set_options(ctx, flags);

    web = BIO_new_ssl_connect(ctx);
    if (web == NULL) handleFailure(4);

    res = BIO_set_conn_hostname(web, HOST_NAME":"HOST_PORT);
    if (1 != res) handleFailure(5);
    
    BIO_get_ssl(web, &ssl);
    if (ssl == NULL) handleFailure(6);

    const char *const PREFERRED_CIPHERS = "HIGH:!aNULL:!kRSA:!PSK:!SRP:!MD5:!RC4";
    res = SSL_set_cipher_list(ssl, PREFERRED_CIPHERS);
    if (1 != res) handleFailure(7);

    res = SSL_set_tlsext_host_name(ssl, HOST_NAME);
    if (1 != res) handleFailure(8);

    out = BIO_new_fp(stdout, BIO_NOCLOSE);
    if (NULL == out) handleFailure(9);

    res = BIO_do_connect(web);
    if (1 != res) handleFailure(10);

    res = BIO_do_handshake(web);
    if (1 != res) handleFailure(11);

/* Step 1: verify a server certificate was presented during the negotiation */
    X509 *cert = SSL_get_peer_certificate(ssl);
    if (cert) { X509_free(cert); } /* Free immediately */
    if (NULL == cert) handleFailure(12);

/* Step 3: hostname verification */
/* An exercise left to the reader */

    BIO_puts(web, "GET / HTTP/1.1\r\n"
                  "Host: " HOST_NAME "\r\n"
                  "Connection: close\r\n\r\n");
    BIO_puts(out, "\n");

    int len = 0;
    do {
        char buff[1536] = {};
        len = BIO_read(web, buff, sizeof(buff));

        if (len > 0)
            BIO_write(out, buff, len);

    } while (len > 0 || BIO_should_retry(web));

    if (out)
        BIO_free(out);

    if (web != NULL)
        BIO_free_all(web);

    if (NULL != ctx)
        SSL_CTX_free(ctx);
}
```

- Server

```c
#include <stdio.h>
#include <unistd.h>
#include <string.h>
#include <sys/socket.h>
#include <arpa/inet.h>
#include <openssl/ssl.h>
#include <openssl/err.h>

int sock;
SSL_CTX *ctx;

int create_socket(int port) {
    int s;
    struct sockaddr_in addr;

    addr.sin_family = AF_INET;
    addr.sin_port = htons(port);
    addr.sin_addr.s_addr = htonl(INADDR_ANY);

    s = socket(AF_INET, SOCK_STREAM, 0);
    if (s < 0) {
        perror("Unable to create socket");
        exit(EXIT_FAILURE);
    }

    if (bind(s, (struct sockaddr *) &addr, sizeof(addr)) < 0) {
        perror("Unable to bind");
        exit(EXIT_FAILURE);
    }

    if (listen(s, 1) < 0) {
        perror("Unable to listen");
        exit(EXIT_FAILURE);
    }

    return s;
}

SSL_CTX *create_context() {
    const SSL_METHOD *method;
    SSL_CTX *c;

    method = TLSv1_2_server_method();

    c = SSL_CTX_new(method);
    if (!c) {
        perror("Unable to create SSL context");
        ERR_print_errors_fp(stderr);
        exit(EXIT_FAILURE);
    }

    return c;
}

void configure_context(SSL_CTX *c) {
    SSL_CTX_set_ecdh_auto(c, 1);

    // Set the key and cert
    // Use openssl req -x509 -newkey rsa:2048 -keyout key.pem -out cert.pem -days 365 -nodes
    if (SSL_CTX_use_certificate_file(c, "cert.pem", SSL_FILETYPE_PEM) <= 0) {
        ERR_print_errors_fp(stderr);
        exit(EXIT_FAILURE);
    }

    if (SSL_CTX_use_PrivateKey_file(c, "key.pem", SSL_FILETYPE_PEM) <= 0) {
        ERR_print_errors_fp(stderr);
        exit(EXIT_FAILURE);
    }
}

void cleanup() {
    close(sock);
    SSL_CTX_free(ctx);
    EVP_cleanup();
}

int main(int argc, char **argv) {

    // sign ctrl-C for server shutting down
    signal(SIGINT, (void (*)(int)) cleanup);

    SSL_load_error_strings();
    OpenSSL_add_ssl_algorithms();
    SSL_library_init();
    
    ctx = create_context();

    configure_context(ctx);

    sock = create_socket(4433);

    // Handle connections
    while (1) {
        struct sockaddr_in addr;
        uint len = sizeof(addr);
        SSL *ssl;
        const char reply[] = "HTTP/1.1 200 OK\r\nServer: Openssl\r\n\r\n";

        int client = accept(sock, (struct sockaddr *) &addr, &len);
        if (client < 0) {
            perror("Unable to accept");
            exit(EXIT_FAILURE);
        }

        ssl = SSL_new(ctx);
        SSL_set_fd(ssl, client);

        if (SSL_accept(ssl) <= 0) {
            ERR_print_errors_fp(stderr);
        } else {
            char buf[2048];
            SSL_read(ssl, buf, sizeof(buf));
            printf("%s\n", buf);
            SSL_write(ssl, reply, strlen(reply));
        }

        SSL_free(ssl);
        close(client);
    }
}
```

运行情况:

- Client

命令行中服务器收到客户端信息

![server-cli](/static/security/1.2.1.png)

Wireshark中截取的结果

![server-wireshark](/static/security/1.2.2.png)

- Server

命令行中客户端收到服务器信息

![server-cli](/static/security/1.2.3.png)

Wireshark中截取的结果

![server-wireshark](/static/security/1.2.4.png)
