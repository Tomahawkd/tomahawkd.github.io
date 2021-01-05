---
permalink: /course/postgraduate/engineering
title: Security Engineering
---

{% include title_patch.html %}

{% include latex_support.html %}

{% include gen_index.html %}

# Buffer Overflow Vulnerability

## Basics

- Reasoning:  
    Index for data r/w out of buffer's bounds.
  
- Stack & Stack Frame:

<div style="text-align:center">
<img src="/static/course/postgraduate/engineering/stack.png"  alt=""/>
</div>

## Key Points

- Find offset:  
To overwrite saved return address, aka saved `$eip` in gdb, you need to figure out 
  the offset from `$esp+buffer` to `$eip`.
  
- The address:
You need to overwrite `$eip`, so that a new address would be declared. Usually 
  this could be the shellcode address.

<div style="text-align:center">
<img src="/static/course/postgraduate/engineering/buffer.png"  alt=""/>
</div>

# Format String Vulnerability

## Basics

- Reasoning:  
    Attacker could control format string, that is, the user controlled string 
  are directly passed to `printf` series functions.

- Format string syntax:
```c
%[parameter][flags][field width][.precision][length]type
```
- parameter:  
    Can be ignored or `n$`, which `n` is the nth parameter of the printf function
  
- field width:  
    The minimum width of the number, if not enough, printf would pad in it
  
- type:  
  type of the data
  - u: decimal unsigned int
    - x: hex unsigned int
    - s: string
    - p: pointer
    - %: % itself
    - **n: write the number of printed char into corresponding data pointer**
    
## Key points

- Format String
    - `%X$p`: Used to read data at `$esp+X`
    - `%Yc%x$n`: 
      Used to write char `Y` at `[$esp+X]` (treat `$esp+X` as a pointer)  
      
    Note: You could also use `%Yu%X$n` to write `unsigned int`. Change type to
meet your requirement.


- Check Offset  
    Since you could write data to where `$esp+X` is pointing to, you need 
  to deal with the offset `X` and the position of the address to write data.

<div style="text-align:center">
<img src="/static/course/postgraduate/engineering/fmt.png"  alt=""/>
</div>

# Shellcode

## General features (offline, local exploitation)

- Contains execution command: `/bin/sh`
- System call: `execve(char *pathname, char *const argv[], char *const envp[])`
- No `NULL`: Shellcode would be cut off if exist

## Example

```asm
.global start // export name to c

start:
    jmp str_addr
back:
    popl %ebx // (char *pathname) $ebx -> string address
    xorl %eax, %eax // get \x00 to use

    movl %ebx, 0x8(%ebx) // store string pointer
    movl %eax, 0xc(%ebx) // add null after string pointer
    movb %al, 0x7(%ebx) // add null right after string

    leal 0x8(%ebx), %ecx // (char *const argv[]) $ecx -> string address
    movl %eax, %edx // (char *const envp[]) $edx -> env pointer = NULL

    movb $0xb, %al // syscall index
    int $0x80 // interrupt signal

str_addr:
    call back // use call to record string address
    .string "/bin/sh"
```

<div style="text-align:center">
<img src="/static/course/postgraduate/engineering/shell.png"  alt=""/>
</div>

