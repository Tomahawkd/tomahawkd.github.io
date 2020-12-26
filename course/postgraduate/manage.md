---
permalink: /course/postgraduate/manage
title: Security Management
---

{% include title_patch.html %}

{% include latex_support.html %}

{% include gen_index.html %}

# Introduction

## Definitions

- **Information Security**  
  The practice of preventing unauthorised access, use, disclosure, disruption, 
  modification, inspection, recording or destruction of information.


- **Threat Agent**:  
  An entity who can manifest a threat. 
  It could be internal or external to the organisation or network.
  

- **Threat**:  
  A threat is a potential cause of an incident that may result in harm to 
  a system or organisation (ISO 27002).

  In other words, what can go wrong and how can it hurt the organisation?

  This includes a number of categories, such as rootkits, backdoors, malware, 
  natural disasters, etc.
  

- **Vulnerability**:  
  A vulnerability is a weakness of an asset or a group of assets that can 
  be exploited by one or more threats (ISO 27002). This may be in a procedure, 
  hardware or software.
  
  In other words, a vulnerability tells us why an asset is not protected 
  from a threat.
  

- **Risk**:  
  A risk is the potential that a given threat will exploit vulnerabilities 
  of an asset or a group of assets and thereby cause harm to the organisation 
  (ISO 27002).

  We could also view this as the likelihood of a threat agent taking advantage 
  of a vulnerability and the resultant impact to the organisation’s assets.


- **Impact**:  
  The impact is the result of a risk materialising, caused by a threat, 
  which affects assets (ISO 27005).

  In other words, if the asset is exploited, what is the real cost 
  to the organisation?
  

- **Safeguard**:  
  Also known as risk treatment action, safeguards can be used to mitigate, 
  transfer or remove the threat altogether.

**Relationship**

<div style="text-align:center">
<img src="/static/course/postgraduate/manage/relation.png"  alt=""/>
</div>

## Risk Management

- **Definition**  
  Coordinated activities to direct and control an organisation with regard to 
  cyber security risks (ISO27005).  
  Risk management ensures that security measures are:  
  - relevant
  - timely
  - responsive to threats
  - cost-effective.

- **Lifecycle and steps**

<div style="text-align:center">
<img src="/static/course/postgraduate/manage/lifecycle.png"  alt=""/>
</div>

1. **Asset Identification**  
  Analysis of the main organisation assets and the value they have for
  the organisation. This is crucial to be able to understand and analyse
  the impact of a risk in an organisation.
  

2. **Threat Assessment**  
    Analysis of which entities could pose a threat to the organisation, so 
    as to understand them better and be able to ascertain what they
    would like from an organisation.
  

3. **Vulnerability Assessment**  
  Testing of the organisation’s systems, policies, procedures and
  physical environment to determine socio-technical and physical
  vulnerabilities that threats could exploit.
  

4. **Risk Assessment**  
  Combination of the three previous analyses to analyse the risks the
  organisation faces.
   

5. **Risk Treatment**  
   A consideration of the best course of action (Reduce, Transfer, Avoid
   or Accept the risk) to mitigate a risk, based on the risk analysis.


6. **Risk Monitoring**  
   A process of continuously updating the previous analyses to identify
   changes in terms of assets, threats, vulnerabilities and resulting
   risks, in order to determine whether the risk treatment needs to
   change.
   

## Asset categories

- **Pure Information**
- **Physical Assets**
- **Software**

# Threat and Vulnerability Assessment

## Asset valuation

The value of an asset is prioritised by the contribution it makes 
to the business. This may include:

- how it contributes to security properties – eg CIA and other requirements 
  (eg non-reputation)
- information classification policies (public vs highly sensitive information)
- cost of compromise (replacement equipment)
- interdependencies with other business systems/processes
- personal injury or death.

## Threat Assessment

Threat assessment identifies the threats to an organisation, and identifies 
the likely culprits of attacks.

### Threat Agents

- Natural Threats
- Accidental Threats
- Malicious Agents

<div style="text-align:center">
<img src="/static/course/postgraduate/manage/threatagent.png"  alt=""/>
</div>

### Threat Assessment Methodology

Formula:

$TC = (Q * 4) + (T * 3) + (H * 7) + (U * 6) + Pr$

| Factor\Score                     | 1                   | 2                   | 3                     | 4                        | 5                      | 6                                      |
|----------------------------------|---------------------|---------------------|-----------------------|--------------------------|------------------------|----------------------------------------|
| Group Size (Q)                   | 1-25                | 26-50               | 51-100                | 101-200                  | 201-300                | >300                                   |
| History of relevant activity (H) | None                | Intermittent        | Occasional            | Occasional               | Regular                | Regular and widespread                 |
| Technical expertise (T)          | None                | Very limited        | Limited               | Limited                  | Adequate               | High level                             |
| Prowess within community (Pr)    | Not part of a group | Peripheral interest | Interest within group | Significant within group | Important within group | Very important within group            |
| Reason for target selection (U)  | Curiosity           | Rebellion           | Criminal Gain         | Criminal Gain            | Belief                 | Revenge, religion, racism, nationalism |


## Vulnerability Assessment

### Vulnerability categories
- Technical Vulnerabilities
- Hardware Vulnerabilities
- Application Vulnerabilities
- System Configuration
- Social Engineering

### Assurance Techniques

Techniques that allow us to establish the level of
assurance we have about how secure a system is

Different techniques to find vulnerabilities in systems
  - Cost-effective decisions to choose which techniques to apply
  - But domain decisions too!

<div style="text-align:center">
<img src="/static/course/postgraduate/manage/assurancetechniques.png"  alt=""/>
</div>

# Risk Assessment and Management

## Qualitative Risk Assessment

A qualitative risk analysis prioritizes the identified project risks
using a pre-defined rating scale. Risks will be scored based on
their probability or likelihood of occurring and the impact on
project objectives should they occur.

- Qualitative probabilities (Likelihoods)
- Qualitative/Quantitative Impact

Risk = Likelihoods (Threat x Vulnerability) x Impact

<div style="text-align:center">
<img src="/static/course/postgraduate/manage/owasprisk.png"  alt=""/>
</div>

## Quantitative Risk Assessment

A quantitative risk analysis is a further analysis of the highest priority
risks during a which a numerical or quantitative rating is assigned
in order to develop a probabilistic analysis of the project.

<div style="text-align:center">
<img src="/static/course/postgraduate/manage/quantitativerisk.png"  alt=""/>
</div>

# Risk Treatment and Monitoring

## Risk Treatment

<div style="text-align:center">
<img src="/static/course/postgraduate/manage/risktreatment.png"  alt=""/>
</div>

- **Avoid**  
  Not doing something that incurs risk. That is, to not do or
  to stop doing a business activity because it puts the organisation
  at too much risk.
- **Accept**  
  The organisation is willing to live with or tolerate the risk.
- **Reduce**  
  This is when security controls are applied to reduce the risk.
  - Reduce the threat
  - Reduce the vulnerability
  - Reduce the impact
- **Transfer**  
  This is where the risk is passed on to another entity or organisation.
  - Outsourcing:   
    Risk is moved to a third party when the relevant expertise
    to manage the risk is not available within the organisation.
    
  - Insurance policy:  
    This is an especially appropriate method when the impact of the risk
    can be measured as a purely financial one and is estimated to be high.
    
# Risk Monitoring

The frequency of monitoring may vary according to the type of threat:

- some threats may change very quickly and will require monitoring
  at frequent intervals
- others, however, will change little over long periods of time
  and will only need occasional monitoring.
  
The whole risk management cycle should be repeated over time, 
as some threats might disappear completely and new threats might emerge. 
The interval will depend largely upon the risk appetite of the organisation 
and may well be documented in a risk management strategy or policy document.

# Challenge for Risk Management

- Unanticipated threats
- AI
- Supply chains

# Security Organisation, Policies, and Compliance

## Security Culture

Information Security is more than just technical countermeasures. 
It is as much about people as it is about anything else. 
People have to be educated, motivated and appropriately regulated.

## New CISO

### Four faces

- Technologist
- Guardian
- Strategist
- Advisor

### Challenges

- Narrow perspective
- Communications and collaboration
- Talent shortage
- False sense of security
- Competing agendas

## Security Policies

### Policy
A high-level statement of an organisation’s values, goals and 
objectives in a specific area. 

A policy doesn’t say how it should be implemented, but it states the end-goal.

### Standard

More prescriptive than a policy, a standard quantifies what needs 
to be done and provides consistency in controls that can be measured.

Designed to support policy and states what must be done and 
how it should be achieved.

### Procedure

A set of detailed working instructions that describe what, when, 
how and by whom something should be done.

### Guideline

Guidelines provide advice, direction and best practice in instances 
where it is often difficult to regulate how something should be done.

## Compliance

### Check compliance

- Risk management
- security policies and control
- Reports of breaches/incidents

# Security Controls

## Types

- Technical
- Procedural
- Physical

