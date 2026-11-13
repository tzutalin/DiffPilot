# DiffPilot Proprietary License Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a root proprietary license that protects the DiffPilot website project and clearly states permitted website access.

**Architecture:** A single root-level `LICENSE` document establishes the project’s ownership, limited visitor permission, prohibited reuse, and legal disclaimer. No executable components, dependencies, or runtime configuration are involved.

**Tech Stack:** Plain-text legal notice (Markdown-compatible text)

**Spec:** `docs/superpowers/specs/2026-11-13-diffpilot-proprietary-license-design.md`

## Global Constraints

- Copyright notice must state `Copyright © 2026 DiffPilot. All rights reserved.`
- Visitors may access and use the hosted DiffPilot website only for its intended purpose.
- Copying, redistribution, modification, derivative works, reverse engineering, and commercial use require prior written permission from DiffPilot.
- Cover source code, design, branding, content, and associated materials.
- Include “as is” warranty and liability disclaimers.
- This file is a repository license, not website Terms of Service, a privacy policy, or a customer agreement.

## Review Focus

- **Hosted-site access:** Test by reading for a clear, limited permission to use the hosted site as intended; it must not be confused with permission to reuse repository materials.
- **Ownership scope:** Test by reading for code, design, branding, content, and associated materials; omission could leave primary website assets ambiguous.
- **Unauthorized reuse:** Test by reading for the six prohibited categories: copying, redistribution, modification, derivative works, reverse engineering, and commercial use.
- **Written-consent exception:** Test by reading that prior written permission from DiffPilot is the only exception to the reuse restrictions.
- **Disclaimer coverage:** Test by reading for both an “as is” warranty disclaimer and a limitation of liability.

---

### Task 1: Root Proprietary License

**Files:**
- Create: `LICENSE`
- Test: manual content verification of `LICENSE`

**Interfaces:**
- Consumes: the requirements in `docs/superpowers/specs/2026-11-13-diffpilot-proprietary-license-design.md`
- Produces: a root-level repository license for consumers, contributors, and website visitors.

- [ ] **Step 1: Define the acceptance check**

Verify `LICENSE` contains each required phrase or concept:

```text
Copyright © 2026 DiffPilot. All rights reserved.
access and use the hosted DiffPilot website for its intended purpose
source code, design, branding, content, and associated materials
copying, redistribution, modification, derivative works, reverse engineering, and commercial use
prior written permission from DiffPilot
AS IS
limitation of liability
```

- [ ] **Step 2: Confirm the root license file is absent**

Run: `test ! -e LICENSE`

Expected: command exits with status `0` before creation.

- [ ] **Step 3: Create `LICENSE`**

Write a document titled `DiffPilot Proprietary License` that includes these sections:

1. Copyright and ownership.
2. A narrow permission to access and use the hosted DiffPilot website for its intended purpose.
3. Prohibited reuse of the source code, design, branding, content, and associated materials, unless DiffPilot grants prior written permission.
4. An “as is” warranty disclaimer and limitation of liability.

Use plain, direct language. Do not label the document as open source or grant a source-code use license.

- [ ] **Step 4: Verify the license content**

Run: `grep -Ei 'Copyright.*2026.*DiffPilot|All rights reserved|hosted.*website|source code|design|branding|content|associated materials|copying|redistribution|modification|derivative works|reverse engineering|commercial use|prior written permission|AS IS|liability' LICENSE`

Expected: output confirms every acceptance concept in Step 1 is present.

- [ ] **Step 5: Commit**

```bash
git add LICENSE
git commit -m "docs: add DiffPilot proprietary license"
```
