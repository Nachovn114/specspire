# Annex · Data Protection, Privacy by Design and Legal Compliance

> [!NOTE]
> **Legal framework and effective dates (official BCN consultation: 31-10-2026):** In Chile, **Ley N° 19.628** is currently in force. The comprehensive reform under **Ley N° 21.719** was promulgated and published in the Official Gazette on 13-12-2024, with its effective date established for **01-12-2026** (Art. 1° transitorio); when designing software it is mandatory to verify whether this date was amended by subsequent statutes. For projects in other jurisdictions (e.g. GDPR in the EU, LGPD in Brazil, CCPA in California), apply exclusively the relevant territorial regulations and do not extrapolate Chilean legislation outside its territorial scope.
>
> **Jurisdiction and territorial applicability:** Do not assume that a website is automatically subject to the GDPR merely because it is accessible from Europe; evaluate establishment in the EU, explicitly targeted offerings to individuals in the EU, or active monitoring of their behavior (Art. 3.2 GDPR), as well as the specific processing activities. Verify applicable regulations and status against official sources when relevant. Do not impose requirements from the European ePrivacy Directive (terminal equipment access/storage) on Chile without a substantiated legal analysis based on applicable Chilean law.

This annex is conditional: it activates **only if the project processes personal data** or uses cookies and persistent storage. Do not load for offline CLI utilities, mathematical algorithms, or software operating exclusively on abstract data.

## 1. Activation Criteria and Processing Scenarios

The collection, use, or processing of personal data constitutes data processing even when no permanent storage exists. The agent must distinguish three scenarios:

- **Scenario A · Local demo with fictitious data:** UI tests or prototypes using synthetic mock data ("Juan Pérez", example email addresses). Requires simplified analysis; do not generate artificial privacy policies or legal notices.
- **Scenario B · Interface processing real personal data exclusively in memory:** Utilities receiving real personal data (e.g. RUT formatters, salary calculators, or in-browser validators) without transmitting or persisting them. Requires evaluating transient processing: transparently inform the user in the interface about local processing, do not transmit data to third parties, do not persist to disk/cookies, and do not log PII in console or file logs. Do not assume automatic exemption from lawfulness and purpose limitation principles.
- **Scenario C · Application with persistence, transmission, or third parties:** Systems storing in databases, transmitting over networks, or consuming external APIs. Requires evaluating the entirety of controls P01–P06, lawful bases, data processors, and corresponding legal documentation.

### Proportionality and domain delimitation
- **Public data of identifiable individuals:** Do not automatically classify publicly available data of athletes or other identifiable individuals as exempt from data protection; the public nature of the information does not extinguish its status as personal data nor exempt it from principles of lawfulness and accuracy. Contextual evaluation is required, but a specific legal basis must not be assigned automatically. Commercial terms and conditions are not a universal privacy requirement.
- **Contextual rather than universal governance:** Do not declare universal obligations for Records of Processing Activities (ROPA/RAT) or Data Processing Agreements (DPA) without verifying the applicable threshold. The actual roles of controller, processor, and independent third parties must be determined. Not every data provider, hosting provider, or API is automatically a data processor.
- **Distinction between pending decision, pending risk, and actual blocker:** Do not declare that choosing Google Analytics, Meta Pixel, a data vendor, or a specific architecture prevents starting Phase 1 if those decisions can be investigated during specification or design. Do not turn clinical architecture or technical integration decisions (e.g. HL7/FHIR, cloud model, electronic signature type) into premature blockers for starting specification when they can still be investigated in later design stages. Distinguish precisely:
  - *Pending decision:* A technical or functional alternative yet to be finalized that can mature progressively during specification or design without halting the start of the phase.
  - *Pending risk:* An identified technical or legal threat requiring safeguards or mitigation prior to production, but which does not prevent formulating requirements.
  - *Actual blocker:* Absence of essential input data, irreconcilable contradiction in requirements, or documented technical/regulatory impediment that effectively prevents advancing to the next actionable step.
- **Scope fidelity:** Do not add unrequested features to the MVP as approved requirements.

## 2. Data Classification and Inventory

- *Identifying and contact data:* Name, RUT/National ID, email, phone number, address, username.
- *Technical and telemetry data:* IP address, device ID, tracking cookies, geolocation, User-Agent. Do not assume that lacking user accounts implies not processing personal data when network or terminal identifiers are processed.
- *Special/Sensitive categories (Art. 10 Ley 19.628 / Art. 14 Ley 21.719 / Art. 9 GDPR):* Health, biometrics, political opinions, religious or philosophical beliefs. Require a reinforced legal basis or qualified explicit consent.
- *Data of children and adolescents (specifically Art. 16 Ley 21.719 / Art. 8 GDPR):* Require consent from legal guardians or progressive capacity rules according to age and context, with strict data minimization.
- **Minimization and purpose limitation (Art. 14 quáter Ley 21.719):** Collect only the fields strictly indispensable for the stated purpose. Distinguish aggregated statistics (global dissociated metrics without individual identification) from individual or pseudonymous personal data.

## 3. Lawful Bases, Governance and Architecture (Arts. 12, 13, 14 quáter, 14 quinquies and 15 bis)

- **Identify legal basis per purpose (Chile: Arts. 12 and 13 Ley 21.719; EU: Art. 6 GDPR):**
  - *Consent (Art. 12):* Prior, freely given, informed, specific and unambiguous. Demonstrable; never pre-ticked checkboxes or forced consent for separate services.
  - *Other bases (Art. 13):* Performance of a contract, legal obligation, or balanced legitimate interest with right to object.
- **Controller and processors (Art. 15 bis Ley 21.719 / P05):** Identify the data controller and external vendors/APIs acting as processors. The actual roles of controller, processor, and independent third parties must be determined; not every data vendor, hosting provider, or API is automatically a data processor. The absence of internet, APIs, or telemetry does not in itself prove that third-party processors do not exist; a third party can process data via physically delivered files or local execution. All processing by a processor requires a contract (DPA) with instructions and duties of confidentiality and security. Do not demand a DPA when no third-party processors are involved. If the relationship is unconfirmed, P05 must remain NOT VERIFIED or BLOCKED when a documented actual blocker exists; N/A only applies when the inapplicability of the control is sufficiently justified.
- **International transfers:** Record recipient, country, purpose, and safeguards whenever data leaves the applicable jurisdiction.
- **Security, pseudonymization and data flows (Art. 14 quinquies Ley 21.719):**
  - Forbidden to log passwords, tokens, or PII in console logs or plaintext.
  - *Pseudonymization vs. anonymization:* Pseudonymization via hashing (e.g. salted hash of IP addresses or identifiers) reduces technical risk, but does not equate to full, irreversible anonymization as long as re-identification or correlation remains possible; the prior processing of the IP address before hashing constitutes personal data processing.
- **Terminals, cookies, analytics and trackers (ePrivacy Art. 5(3) / directives):**
  - *Terminal operations:* Evaluate any read or write operation on terminal equipment (cookies, `localStorage`, `sessionStorage`, scripts, or digital fingerprinting). The absence of cookies does not prove the absence of personal data processing, nor does it rule out terminal operations.
  - *Technical / essential:* Necessary for session, authentication, CSRF, or storing preferences explicitly requested by the user (e.g. light/dark theme in `localStorage` without tracking identifiers); these do not require an invasive consent banner; documenting their use is sufficient. Preference storage requested by a user may benefit from exceptions under applicable regulations, without declaring a universal exemption for any persistent localStorage.
  - *Analytics and tracking technologies:* Do not assume that "without cookies" equals anonymity or that cookieless analytics is always exempt from consent; evaluate actual read/write operations on terminals, IP addresses, User-Agent headers, scripts, tracking pixels, and data transfers.
  - *Consent Management Platforms (CMP):* Do not assume that any analytics tool automatically mandates installing a CMP. Do not mandate an IAB CMP for every website, and eliminate obsolete references to TCF v2.2 as a current recommendation in 2026. If recommending consent technology, verify its version, scope of application, and concrete requirements. Do not generate decorative cookie banners if the system does not use trackers.
- **Data subject rights (ARCOP - Arts. 5 to 9 Ley 21.719):** Technical mechanisms to handle requests for Access, Rectification, Cancellation/Erasure, Opposition, Blocking, and Portability.

## 4. Contextual Legal Documentation (Art. 14 ter) and Impact Assessment (Art. 15 ter)

The agent drafts documentation tailored to technical reality without fabricating data:
- Policies or notices must reflect actual processing, applicable jurisdictions, and verified obligations.
- **Notice at collection point:** Brief and direct upon registration or submitting real forms.
- **Privacy and cookies policy:** Controller, purposes, recipients, retention period, and rights.
- **Data Protection Impact Assessment (DPIA / EIPD - Art. 15 ter Ley 21.719 / Art. 35 GDPR):** Mandatory for high-risk processing on substantiated grounds (automated decisions or profiling with legal effects, large-scale processing of sensitive data, or systematic monitoring). Reasonably assess the need for a DPIA without automatically declaring it mandatory for every project or prototype.
- **Mandatory placeholder:** Any corporate or legal detail not confirmed by the user must be flagged as `[ACLARAR: legal entity, tax ID/RUT, address, or DPO pending]`. Never invent legal entities or corporate identities.

## 5. Privacy Evidence Matrix (for review.md)

Record in `review.md` whenever the feature processes personal data (even exclusively in memory) or accesses terminal equipment.

> [!IMPORTANT]
> **Strict evidence and separation of domains:** Never mark a control `PASS` based solely on proposed architecture, theoretical examples, design intentions, or pending documentation. A design decision does not constitute compliance evidence. Likewise, technical verification of safeguards (technical PASS) does not automatically equate to legal certification or validation of statutory compliance.

### Maturity hierarchy and technical distinction:
1. **Specified requirement:** Scoped in `spec.md` with observable criteria.
2. **Designed control:** Outlined in `plan.md` or architecture.
3. **Implemented control:** Code, configuration, and functional copy in the project.
4. **Effectively verified control:** Demonstrated with executable evidence, automated tests, or real technical inspection.

### Individual evaluation of controls P01–P06:
Controls P01–P06 are evaluated individually according to the specific processing and not in bulk. For example:
- A CLI processing personal logs in memory requires P01 (data inventory and purpose), P02 (lawful basis), and P03 (security measures with no PII in logs or outputs).
- P04 may be N/A if no applicable cookie or terminal tracking technologies exist.
- P05: The absence of internet, APIs, or telemetry does not in itself prove that third-party processors do not exist (a third party can process data via physically delivered files or local execution). The actual roles of controller, processor, and independent third parties must be determined; not every data vendor, hosting provider, or API is automatically a data processor. If the relationship is unconfirmed, P05 must remain NOT VERIFIED or BLOCKED when a documented actual blocker exists; N/A only applies when the inapplicability of the control is sufficiently justified.

### Formal states:
- **PASS:** Control implemented and effectively verified with real technical evidence of execution, tests, or storage/network inspection (does not automatically equate to legal certification).
- **FAIL:** Verified control displaying demonstrated defects, vulnerabilities, or non-compliance.
- **BLOCKED:** Verification blocked by a documented external or technical dependency.
- **NOT VERIFIED:** Control specified or designed but pending implementation or actual testing.
- **N/A:** The specific control is not applicable to the evaluated processing, with documented justification. **Rule of non-inference:** N/A cannot be inferred solely from the absence of storage, user accounts, backend, internet connection, or cookies; transient in-memory processing still constitutes personal data processing, the absence of network access does not in itself prove the non-existence of processors, and the absence of cookies does not demonstrate the absence of personal data processing.

| Control | Verification criterion | Status | Evidence required for PASS |
|---|---|---|---|
| P01 | Data inventory, scenario (A/B/C) and documented purpose | PASS / FAIL / BLOCKED / NOT VERIFIED / N/A | Verified inventory in code/contracts; indispensable vs requested fields |
| P02 | Lawful basis (granular consent or demonstrable statutory basis) | PASS / FAIL / BLOCKED / NOT VERIFIED / N/A | Consent flow or legal basis implemented and tested, no pre-ticked checkboxes |
| P03 | Technical security measures (no PII in logs, secure storage) | PASS / FAIL / BLOCKED / NOT VERIFIED / N/A | Automated tests of no leakage in logs/outputs, verified encryption and reviewed configs |
| P04 | Cookies and trackers (prior consent if analytics/marketing exist) | PASS / FAIL / BLOCKED / NOT VERIFIED / N/A | Real inspection of `Application/Storage` and `Network` (0 non-essential cookies without prior consent) |
| P05 | Data processors and external transfers mapped with safeguards | PASS / FAIL / BLOCKED / NOT VERIFIED / N/A | Controller/processor roles delimited, verified network traffic or physical flows, and formalized DPA contracts when processors are involved |
| P06 | Contextual legal documents aligned with implementation | PASS / FAIL / BLOCKED / NOT VERIFIED / N/A | Notices and copy audited against real published behavior, no placeholder data |

**Notice of professional limitations:** Specspire provides software architecture support, technical traceability, and structured drafts. It does not constitute formal legal advice nor certify automated legal compliance; high-risk processing and final policies require review by a legal specialist.

