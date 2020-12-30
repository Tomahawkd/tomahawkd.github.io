---
permalink: /course/postgraduate/testing
title: Software Measurement and Testing
---

{% include title_patch.html %}

{% include latex_support.html %}

{% include gen_index.html %}

# Nutshell

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

<div style="text-align:center">
<img src="/static/course/postgraduate/testing/relationships.png"  alt=""/>
</div>

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
- **Optimistic inaccuracy**: We may accept some programs that 
  do not possess the property (i.e. it may not detect all violations)
    - testing
- **Pessimistic inaccuracy**: It is not guaranteed to accept a program 
  even if the program does possess the property being analysed.
    - automated program analysis techniques
- **Simplified properties**: Reduce the degree of freedom for simplifying the property to check.

- **Safe**: A safe analysis has no optimistic inaccuracy, i.e., it accepts only correct programs.
- **Sound**: An analysis of a program P with respect to a formula F is sound if the analysis returns
  true only when the program does satisfy the formula. (conservative)
- **Complete**: An analysis of a program P with respect to a formula F is complete if the
  analysis always returns true when the program actually does satisfy the formula. (optimistic)
  
# Basic Principles
### Objectives
- Understand the basic principles undelying A&T techniques
- Grasp the motivations and applicability of the main principles

## Main A&T Principles
- General engineering principles:
    - **Partition**: divide and conquer
        - Divide testing into unit, integration, subsystem and system testing
        - Hard testing and verification problems can be handled by suitably partitioning the input space
    - **Visibility**: judging status(making information accessible)
        - X visibility = ability to judge how we are doing on X
    - **Feedback**: tuning the development process
        - Learning from experience: Each project provides information to improve the next
- Specific A&T principles:
    - **Sensitivity**: better to fail every time than sometimes
        - Machine independency
        - every run of the test should provide the same result.
    - **Redundancy**: making intentions explicit
        - Static type checking is made redundant with dynamic type checking, 
          but still reveals mismatches earlier (upon compilation).
    - **Restriction**: making the problem easier
        - Can reduce hard (unsolvable) problems to be simpler (solvable) problems.

They can be used to understand advantages and limits of different approaches and compare different techniques

# Finite Models and Finite Machines

## Control Flow Graph (CFG)

nodes: regions of source code (basic blocks)

directed edges: possibility that program execution
proceeds from the end of one region directly to the
beginning of another

## Finite State Machines

nodes: finite set of states

edges: set of transitions among states

# Data Flow
## Def-Use

A definition-clear path is a path along the CFG
from a definition to a use of the same variable
**without** another definition of the same
variable between

If, instead, another definition is present on the
path, then the latter definition **kills** the former

<div style="text-align:center">
<img src="/static/course/postgraduate/testing/dupair.png"  alt=""/>
</div>

## Dominators

- Pre-dominators: Node M dominates node N if **every path** from 
the root to N passes through M

- Post-dominators: Calculated in the reverse of the
control flow graph, using a special exit node as the
root.
  
## Adequacy

$C_{DU_pairs} = \frac{\text{number of exercised DU pairs}}{\text{number of DU pairs}}$

## Reach Algorithm

$Reach(n) = \bigcup\limits_{m \in pred(n)} ReachOut(m)$

$ReachOut(n) = (Reach(n) \\ kill(n)) \cup gen(n)$

$gen(n) = \\{v_n \| \text{v is defined or modified at n}\\}$

$kill(n) = \\{v_x \| \text{v is defined or modified at x, x} \neq \text{n}\\}$

# Functional and Combinatorial Testing

## Functional testing
Deriving test cases from program specifications.

Steps: From specification to test cases

1. Decompose the specification
2. Select representatives  
    Representative values of each input, or  
    Representative behaviors of a model  
3. Form test specifications
4. Produce and execute actual tests

## Random Testing

All of the test inputs are generated randomly.

Random Testing as a four-step procedure:
1. The input domain is identified
2. Test inputs are selected independently from
   the domain
3. The system under test is executed on these
   inputs. This inputs constitude a random test
   set.
4. The results are compared to the system
   spesification. The test is a failure if any input
   leads to incorrect results; otherwise it is a
   success.
   
## Combinatorial Testing

### Category partition

1. Decompose the specification into independently
   testable features
   - Choosing categories
   - Categories reflect test designer's judgment
   - Choosing categories well requires experience
     and knowledge
2. Identify relevant values
   - Identify (list) representative classes of values
     for each of the categories
   - Representative values may be identified by
     applying
     - Boundary value testing
       - select extreme values within a class
       - select values outside but as close as possible to the class
       - select interior (non-extreme) values of the class
     - Erroneous condition testing
       - select values outside the normal domain of the program
3. Introduce constraints
    - A combination of values for each category
      corresponds to a test case specification
    - Introduce constraints to
      - rule out impossible combinations
      - reduce the size of the test suite if too large
    
### Pairwise
Generate combinations that efficiently cover all
pairs (triples,…) of classes (instead of exhaustive)

# Structural Testing

## Statement testing
Adequacy criterion: each statement (or node in
the CFG) must be executed at least once

## Branch Testing
Adequacy criterion: each branch (edge in the
CFG) must be executed at least once

## Basic Condition Testing
Adequacy criterion: each basic condition must be
executed at least once

## Modified Condition/Decision (MC/DC)
Motivation: Effectively test **important
combinations** of conditions, without
exponential blowup in test suite size

**Important combinations**: Each basic
condition shown to **independently** affect the
outcome of each decision

## Path Testing
Adequacy criterion: each path must be
executed at least once

# Fault Based Testing
Testing based on common software faults

## Error seeding Technique
- No mutants are present
- Source code is tested within itself
- Errors are introduced directly
- Test cases which detect errors are used for testing
- It is less efficient error testing technique

## Mutation Technique
- Mutants are developed for testing
- Mutants are combined, compared for testing to find error introduced
- Special techniques are used to introduce errors
- Test cases which kill mutants are used for testing
- It is more efficient than error seeding

Note:
- A mutant may be equivalent to the original program
- Or the test suite could be inadequate

# Unit Testing

## Regression Testing

- A test suite of all tests ever created prevents old bugs creeping back into
production
- Every time a bug is found, a test must be added to the test suite to stop it ever
  reappearing.
- Whenever a change is made to the system, the relevant parts of the regression
suite are run again
  
## Unit Testing

- Every new unit must have tests created for it.
- Every bug fix should ideally have an accompanying unit test that stops it
reappearing
  
# System Testing

