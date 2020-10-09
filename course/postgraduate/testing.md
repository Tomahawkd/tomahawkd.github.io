---
permalink: /course/postgraduate/testing
title: Software Measurement and Testing
---

{% include title_patch.html %}

# Week 1: Nutshell

### Objectives:
- Introduce the range of software verification and validation activities
- Provide a rationale for selecting and combining them within a software development process. 
  
## Validation & Verification (V&V)
- Terms: 
    - **Validation**:  
       Does the software system meets the user's real needs?  
       *Are we building the right software?*
    - **Verification**:  
       Does the software system meets the requirements specifications?  
       *Are we building the software right?*

- V&V start as soon as we decide to build a software product, or even before.  
(Test is not a (late) phase of software development)
    - The feasibility study of a new project must take into account 
      the required qualities and their impact on the overall cost, including:
        - risk analysis
        - measures needed to assess and control quality at
        each stage of development.
        - assessment of the impact of new features and new
        quality requirements
        - contribution of quality control activities to
        development cost and schedule.

- V&V last far beyond the product delivery as long as the software is in use, 
  to cope with evolution and adaptations to new conditions
  - Maintenance activities include
    - analysis of changes and extensions
    - generation of new test suites for the added functionalities
    - re-executions of tests to check for non regression of software functionalities 
      after changes and extensions
    - fault tracking and analysis

    
## Analysis & Testing (A&T)
- A&T during development aim at revealing faults 
- We must specify the required level of **dependability** and 
  determine when that level has been attained.

### Analysis
- Includes:
    - manual inspection techniques
    - automated analysis
- can be applied at any development stage
- well suited for the early stages of specifications and design

### Testing
- Start as early as possible
- Early test generation has several advantages
    - Tests generated independently of code, when the specifications are fresh 
      in the mind of analysts
    - The generation of test cases may highlight inconsistencies and 
      incompleteness of the corresponding specifications
    - tests may be used as compendium of the specifications by the programmers
    
## Dependability
- **Availability**: measures the quality of service in terms of running versus down time
- **Mean time between failures (MTBF)**: measures the quality of the service in terms of time
  between failures
- **Reliability**: indicates the fraction of all attempted operations that complete
  successfully (= probability of failure-free operation)
  
### Dependability Qualities
- **Correctness**: A program is correct if it is consistent with its specification
    - seldom practical to check fully for non-trivial systems
    - either correct or incorrect
    - meaningfulness of correctness depends fully on the quality of the specification (see the lift example)
- **Reliability**: probability of failure-free software operation for a specified period in a specified environment
    - relative to a specification and usage profile
    - statistical approximation to correctness (100% reliable = correct)
- **Safety**: preventing hazards (considered separately from correctness)
- **Robustness**: acceptable (degraded) behavior under extreme conditions

![Relationships](/static/course/postgraduate/testing/relationships.png)

### Assessing Dependability
- Randomly generated tests
- **Alpha test**: Tests performed by users in a controlled environment, observed by the development organisation.
- **Beta test**: Tests performed by real users in their own environment, 
  performing actual tasks without interference or close monitoring.
  
# Framework for A&T
### Objectives
- Introduce dimensions and tradeoff between test and analysis activities
- Distinguish validation from verification activities
- Understand limitations and possibilities of test and analysis

### Terms
- Optimistic inaccuracy: We may accept some programs that 
  do not possess the property (i.e. it may not detect all violations)
    - testing
- Pessimistic inaccuracy: It is not guaranteed to accept a program 
  even if the program does possess the property being analysed.
    - automated program analysis techniques
- Simplified properties: Reduce the degree of freedom for simplifying the property to check.

- Safe: A safe analysis has no optimistic inaccuracy, i.e., it accepts only correct programs.
- Sound: An analysis of a program P with respect to a formula F is sound if the analysis returns
  true only when the program does satisfy the formula. (conservative)
- Complete: An analysis of a program P with respect to a formula F is complete if the
  analysis always returns true when the program actually does satisfy the formula. (optimistic)
  
# Basic Principles
### Objectives
- Understand the basic principles undelying A&T techniques
- Grasp the motivations and applicability of the main principles

## Main A&T Principles
- General engineering principles:
    - Partition: divide and conquer
        - Divide testing into unit, integration, subsystem and system testing
        - Hard testing and verification problems can be handled by suitably partitioning the input space
    - Visibility: judging status(making information accessible)
        - X visibility = ability to judge how we are doing on X
    - Feedback: tuning the development process
        - Learning from experience: Each project provides information to improve the next
- Specific A&T principles:
    - Sensitivity: better to fail every time than sometimes
        - Machine independency
        - every run of the test should provide the same result.
    - Redundancy: making intentions explicit
        - Static type checking is made redundant with dynamic type checking, 
          but still reveals mismatches earlier (upon compilation).
    - Restriction: making the problem easier
        - Can reduce hard (unsolvable) problems to be simpler (solvable) problems.

They can be used to understand advantages and limits of different approaches and compare different techniques