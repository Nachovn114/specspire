# Quality Gates — Evidence Before Approval

[Español](../QUALITY.md) · [Workflow](WORKFLOW.md) · [Quick start](QUICKSTART.md) · [UI/UX design (es)](../DESIGN.md) · [Back to README](../../README.md)

**It is never enough to claim "it works".** Every gate requires observed, reproducible evidence proportional to the project's real risk. This document defines the evidence protocol; the phase progression is mapped in the [development workflow](WORKFLOW.md).

## Quality controls

| Gate | Minimal required evidence | If it fails |
|---|---|---|
| **Requirements** | Observable acceptance scenarios reviewed against spec | Correct specification or implementation |
| **Testing** | Fresh terminal output from real test execution | Fix the defect and re-execute |
| **Code cleanliness** | Human/agent diff review; no unjustified duplication or abstractions | Simplify code and re-check diff |
| **Integration** | Critical user flows executed end-to-end | File a corrective task before proceeding |
| **Security** | Inputs, permissions, secrets, and auth audited per threat model | Fix vulnerability before delivery |
| **Privacy (if applicable)** | Data minimization, legal basis, retention, and notices (P01–P06) | Fix data flow or transparency texts before delivery |
| **UI/UX (if applicable)** | Browser validation: responsive viewports, a11y, and interactive states | Log findings in review matrix and re-test |
| **Reproducibility** | Cold-start instructions tested from a clean environment | Fix README, package manifest, or scripts |

## Result states

Specspire enforces a four-state vocabulary across all review templates and responsive matrices:

| State | Definition |
|---|---|
| `PASS` | Executed and observed outcome meets the acceptance criterion |
| `FAIL` | Executed and does not meet the criterion; requires a corrective task |
| `BLOCKED` | Execution prevented by an identified external constraint (permissions, hardware, environment) |
| `NOT VERIFIED` | Not executed, or required tool / capability was unavailable |

`BLOCKED` and `NOT VERIFIED` never count as `PASS`. An unresolved mandatory gate in either state halts completion.

### Clarification on N/A in privacy controls

The `N/A` state is reserved strictly for privacy controls P01–P06 when a specific control is demonstrably inapplicable to the evaluated data processing. Every `N/A` requires a documented justification in the review. Inferring `N/A` automatically from the mere absence of a backend, persistent storage, network access, or cookies is prohibited: transient in-memory processing remains personal data processing, absence of network does not in itself rule out third-party processors, and lack of cookies neither rules out terminal operations nor waives personal data evaluation.

## Real execution, zero simulation

A valid failing (RED) test must fail because of a genuine unimplemented requirement, **not** because of syntax or compilation errors. A passing (GREEN) test requires actually running the command and observing its outcome.

Evidence format for `review.md`:

```text
Requirement: FR-01
Test/Action: npm test
Observed result: [real command output]
Status: PASS / FAIL / BLOCKED / NOT VERIFIED
Evidence: [log excerpt, file path, command, or screenshot]
```

Never fabricate command outputs, logs, or metrics.

## What Specspire must never impose

- Docker, Kubernetes, distributed architecture, or complex auth where not required.
- Hundreds of brittle tests that do not verify actual business logic or user behavior.
- Third-party runtime dependencies without a concrete, documented justification.
- Unrequested refactors of existing codebase components outside the task scope.

Enterprise architectural complexity is justified only by **demonstrated real-world needs**: high availability, compliance, security boundaries, throughput, and cross-team coordination; never for the appearance of sophistication.

Further details: [Workflow guide](WORKFLOW.md) · [UI/UX design (es)](../DESIGN.md) · [Back to README](../../README.md) · [Versión en español](../QUALITY.md)
