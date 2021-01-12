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

Threat agent Characteristics:
- **Motivation** - Why are they doing this?
- **Capability** - Can they do it and to what level?
- **Catalyst** - What set them off?,
- **Inhibitors** - What has/could put them off?
- **Amplifiers** - What has/could push them on?

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

The least suitable techniques in this case may be testing techniques, such
as penetration testing and vulnerability scans, as any issue caused by this
more active assurance techniques will entail a risk of information loss and
infrastructure unavailability.


# Risk Assessment and Management

**Risk Register**:

- the threats and the vulnerabilities they might exploit
- the assessed impact and likelihood, and the overall risk 
  calculated from these
- the recommended treatment (accept, avoid, reduce, transfer)
- the actual action(s) to be taken and the person or department 
  responsible for carrying out this work and the date by which 
  it is expected to be completed.


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

The Annualized Rate of Occurrence (ARO) is a business-friendly measure of 
the probability of occurrence of an event that measures how likely an event 
is to happen during a year.

The Annual Loss Expectancy (ALE) is a business-friendly measure of a risk 
in a quantitative risk assessment approach. It is calculated based on the 
annual rate of occurrence (ARO) and the single loss expectancy (SLE) for 
each risk.

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
  Key issue in Adversarial ML: bad actors will attempt to
  exploit the ML model itself
  - Evasion attacks: Attacks on ML, where malicious objects are deliberately
    transformed to make a ML model make wrong predictions. For instance, 
    a software binary can be manipulated to make a machine-learning based 
    anti-malware model predict that it is not malware.

- Supply chains

# Security Organisation, Policies, and Compliance

## Security Culture

Information Security is more than just technical countermeasures. 
It is as much about people as it is about anything else. 
People have to be educated, motivated and appropriately regulated.

## New CISO

Responsible for protecting their organisation’s computers, networks 
and data against threats, such as security breaches, computer viruses or 
attacks by cyber-criminals.

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

## Security Roles

- **System administrator**  
  A person who manages the operation of a computer system or a particular 
  electronic communication service.

- **Security auditor**  
  A person who works with a company to provide an audit of security systems 
  used by that company.

- **System user**  
  A person who interacts with a system, typically through an interface, 
  to extract some functional benefit.

- **Incident response member**  
  A person who is part of the incident response team. They are responsible 
  for resolving incidents as they arise.

- **Security champion**  
  A person who is appointed to oversee the enforcement of security policies 
  within their group and to report incidents to management.

- **Security officer/guard**  
  A person employed by the organisation to protect the assets from a variety 
  of hazards by enforcing preventative measures.


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

## Externally imposed requirements
Risk assessment and management are key elements that inform the 
security policy hierarchy, but they are not the only ones. For instance, 
an organisation also needs to comply with external requirements.

### Statutory requirements
Statutory requirements are legal requirements that must be fulfilled. 
For instance law enforcement agencies must be contacted should certain laws 
be broken or are suspected of being broken. The downloading of child 
pornography would be such a case. Compliance with these requirements may 
influence how an enterprise’s incident reporting procedures are organised. 
For example how, when and by whom should the authorities be contacted? 
Privacy legislation such as the Data Protection Act will influence how 
information is stored and managed within the enterprise and how resources 
are deployed to ensure that it complies with this legislation.

### Regulatory requirements
Regulatory requirements are often imposed by trade bodies, and they specify 
how an enterprise should operate to conform to certain standards. Although 
they are not legal obligations, regulatory bodies have extensive powers, and 
failure to comply could lead to possible fines or, in extreme cases, exclusion 
from trading in a particular environment. The finance sector is a good example 
of this as it maintains strict controls to prevent financial malpractices 
such as fraud or money laundering.

### Advisory requirements
Advisory requirements may arise from government agencies or utility companies 
and may provide advice as to what arrangements should be put into place 
to help cope with instances such as fires, natural disasters and acts 
of terrorism. These requirements are not legally binding and are generally 
issued to help encourage best practice.

# Security Controls

**Preventative security** attempts to stop an exploit from being exploited.   
**Detective security** tries to discover if an attack is underway.   
**Reactionary** tries to respond to an attack and reduce its impact.


## Types

- **Technical**
- **Procedural**  
  Procedural controls are those controls that cover the rules, regulations and
  policies that an organisation puts in place to help reduce the risk of issues
  arising. An example is a Clear Screen and Desk Policy.
- **Physical**
  Physical controls rely on the presence of physical limitations to the 
  activities that a criminal or other unauthorised person may wish to 
  carry out.

# Relevant legislation for Security Control

Legislation applies to all types of security controls: 
technical, physical and procedural. Whether writing policy, 
designing CCTV or other monitoring systems, procuring storage 
and backup from third parties, everything needs to be checked 
against relevant legislation.

Privacy laws exist to protect the rights of individuals.

The rights of employees are also vital to consider.

Finally, it is worth emphasising that most of the time 
when gathering information we care only about the 
meta-data (data about data), not the data itself.

# Cloud Computing Security

The practice of using a network of remote servers hosted on the
Internet to store, manage, and process data, rather than a local server
or a personal computer.

Cloud computing is the practice of using a network of remote serves hosted 
on the Internet to store, manage, and process data, rather than a local 
server or a personal computer. It is useful as it allows a small company 
to gain access to powerful computers that would normally be out of reach.

**Legal implications**: 
They must consider the physical location of services
(Data Protection Rules), access to information (cloud provider can read all
data), if GANT can audit the cloud provider (verify if the cloud is keeping
the data secure) and legal issues around the cloud providers sub-contractors.

**Security Risks**: 
Cloud providers can be hacked and the information is leaked
publicly. This is an example of risk-sharing as while the cloud provider is
liable - the data leaked can be embarassing to the organisation. Also the
data can be deleted/lost if the cloud provider suffers a crash and does not
keep regular backups. Or the data could not be deleted completely when
needed.

**Data Deletion**:
Multiple copies of data; Virtualization; Multiple users (Data gets tangled
together); Multiple components; Multiple logical layers; Underlying hardware
(E.g., Different storage media - SSDs); Third-party and Offline backups (-
e.g., other services / tapes)

<div style="text-align:center">
<img src="/static/course/postgraduate/manage/cloudcomputing.png"  alt=""/>
</div>

# Security Economics

### Moral Hazard

A moral hazard is a situation in which one party gets involved 
in a risky event knowing that it is protected against the risk.

In Information Security, this would apply when people engage 
in activities that can cause an Information Security risk thinking 
they are somehow protected.

For instance, one may engage with riskier and less secure 
websites thinking that the anti-malware they have installed 
will protect them.

### Market for Lemons

The market for lemons was an example introduced by 
Akerlof (Noble prize winner) in 1970 to explain the 
concept of asymmetric information in economics. 

It presents the following simple yet profound 
insight: suppose that there are 100 used cars for 
sale in a town: 50 well-maintained cars worth 2000 dollar 
each, and 50 lemons (said of a car that turns out to 
have several manufacture defects not apparent to the 
buyer) worth 1000 dollar. The sellers know which is which, 
but the buyers don't. What is the market price of a 
used car? You might think 1500 dollar; but at that price no 
good cars will be offered for sale. So the market 
price will be close to 1000 dollar. This is one reason 
poor security products predominate. When users can't 
tell good from bad, they might as well buy a cheap 
antivirus product for 10 dollar as a better one for 20 dollar, 
and we may expect a race to the bottom on price.

# Business Continuity Management (BCM)

Business continuity management (BCM) is a holistic management process 
that identifies potential impacts that threaten an organisation and 
provides a framework for building resilience and capability for 
an effective response that safeguards the interests of its 
key stakeholders, reputation, brand and value creation activities.

## Business Continuity Plan

1. **Assigning responsibilities**
   - Senior management must approve the plan.
   - Likely an appointment at boardroom or executive level to oversee,
     and an appointment to take the programme forward.
2. **Establishing and implementing the plan**
   - Scope, aim and objectives, and the activities required if the plan is
     triggered, i.e. What are the likely problems that will pop up? How
     can we deal with them?
3. **Ongoing management**
   - Regular review of the continuity plan (i.e. it can easily become out
     of date and no longer reflect real business operations). Similar to the
     Plan-Do-Check-Act model.


In order to create an effective business continuity plan, we need to:
- understand the organisation and its risks, so this relates to 
  risk management and assessment as seen in this module in previous weeks
- determine the BCM strategy, identifying the actions needed to 
  maintain critical activities to support the organisation’s products 
  and services
- develop and implement the BCM response, which includes answering 
  questions such as: How do we meet our expected recovery times? 
  What tactics can we deploy to protect resources?

### Business impact analysis

Business impact analysis predicts the consequences of disruption 
of a business function and process, and gathers information 
needed to develop recovery strategies.

First, list products that could be disrupted and for each 
identified product, consider the impact of disruption 
in terms of stakeholders and the organisation’s ability to 
meet its aims and objectives. 

Secondly, we need to figure out what the maximum length that 
the disruption can be managed without interrupting the business is. 
In other words, if a service or a product is disrupted, how long 
will it take for the disruption to be felt by the business 
in terms of profit, reputation, etc. 

We also need to identify the recovery time objective (RTO), 
which is a point in time at which each key product or service 
would need to be resumed in the event of a disruption.

Finally, we need to identify the critical activities necessary 
to deliver the products and services. These are the activities 
that we need to protect and in order to do that we need to 
quantify the resources (people, premises, technology, 
information, suppliers, etc) required over time to maintain 
these activities at an acceptable level to and meet our RTO.

### Developing and implementing the busines continuity plan

- incident management
- business continuity
- business recovery

#### Outline:

- **Purpose, scope and content**
- **Document maintainer**
- **Plan invocation**  
  The method by which the plan is invoked should be 
  clearly documented, setting out the individuals who have 
  the authority to invoke the plan and under what circumstances. 
  The plan should also set down the process for mobilising and 
  standing down the relevant teams.
- **Roles and responsibilities**
- **Incident management**
  Document the required tasks to manage the initial phase of 
  the incident and who is responsible for each task. The tasks include:
  - site evacuation and mobilisation of safety
  - first-aid or evacuation-assistance teams
  - locating and accounting for those who were on site and the immediate 
    vicinity
  - ongoing employee and customer communications and safety briefings
  - up to date contract list and location of plan
  - identifying robust rooms to manage the incident.
- **Business continuity and recovery**  
  In terms of business continuity and recovery the plan should:
  - set out the critical activities to be recovered 
  - the timescales in which they are to be recovered and the needed 
    recovery levels
  - the resources available at different points in time to deliver 
    your critical activities
  - the process for mobilising these resources and the detailed actions 
    needed to ensure the continuity and recovery of your critical activities.

The plan must be exercised regularly in order to ensure that 
arrangements are reliable.

#### Discussion based exercises
Bring staff together and inform them about their responsibilities. 
Discuss with staff to identify problems and solutions.
#### Testing
Not everything can be tested, however, you can consider the contact list, 
activation process and the relied upon hardware such as communication lines, 
power supply, etc.
#### Table-top exercise (ie think board games)
In this exercise, you bring staff together around a table to make decisions 
as events unfold in the same way as if the incident actually happened. 
This can take between a couple of hours and half a day. The benefit of 
this format is that it can generate high levels of realism and lets everyone 
know each other.
#### Live exercise
Live exercises are necessary for some components such as evacuation 
that cannot be tested effectively in any other way. While single 
component tests are relatively simple to set up, full tests are much more 
complex and can be costly.

# Disaster recovery

## Main goals

- To minimise interruptions to the normal operations
- To limit the extent of disruption and damage
- To minimise the economic impact of the disaster
- To establish means of operations in advance
- To train personnel in emergency procedures
- To provide smooth and rapid restoration of services

## Recovery Plan Contents

- **Introduction**  
  A summary of the objectives and scope of the plan, including IT
  services and locations covered, the different services, and testing
  and maintenance activities. Also includes a revision history to track
  changes.

- **Roles and responsibilities**  
  A list of the internal and external stakeholders involved 
  in each DR process covered, complete with their contact details 
  and a description of their duties.
- **Incident response**
  When should the DR plan be triggered, and how and when should
  employees, management, partners and customers be notified?
- **Disaster recovery procedures**  
  When the plan is triggered, the stakeholders can start to 
  action the process for each affected IT service. These processes 
  have to be set out step by step.
- **Appendices**
  A collection of any other lists, forms and documents relevant to
  the DR plan, such as details on alternate work locations, insurance
  policies, and the storage and distribution of DR resources.


# BCM and DR

Disaster recovery is that part of business continuity that addresses 
the need to recover IT services and voice services and data following 
a business-threatening impact. 

Disaster recovery prioritises those services and information that 
are critical to the business. Disaster recovery includes planning for 
crisis situations and having in place the means to identify incidents, 
contain and recover them.

# Usable Security

According to the computing research association, usable security is “Give
end-users security controls they can understand and privacy they can control
for the dynamic, pervasive computing environments of the future”. One
example could be the indicators in browsers about whether a connection is
secure (HTTPS) or insecure (HTTP).


- Make it “just work”
  - Invisible security
- Make security understandable
  - Make it visible
  - Make it intuitive
  - Use metaphors that users can relate to
- Train the user

