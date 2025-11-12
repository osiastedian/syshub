# UI-DESIGN-AUDITOR AGENT SPECIFICATION

**Status**: Ready for Implementation
**Date**: 2025-11-12
**Type**: New Specialized Agent for Design Compliance Auditing

---

## AGENT DEFINITION

### Name
**ui-design-auditor**

### Purpose
Comprehensive visual comparison and auditing of implemented UI against Figma design specifications. This agent identifies visual discrepancies, analyzes root causes, and provides implementation recommendations.

### When to Use This Agent

Use this agent for:
- ✅ Comparing Figma design with live development server implementation
- ✅ Auditing new page redesigns against specifications
- ✅ Identifying CSS and visual issues blocking production
- ✅ Design specification compliance verification
- ✅ Pre-deployment design reviews
- ✅ Creating cross-check comparison reports
- ✅ Verifying color tokens, typography, spacing implementation
- ✅ Analyzing responsive design at different breakpoints

### What This Agent Does

**Phase 1: Setup & Navigation**
- Navigate to live development server (localhost or staging)
- Open Figma design file
- Position for side-by-side comparison

**Phase 2: Visual Comparison**
- Take screenshots of both Figma design and live implementation
- Compare section-by-section (hero, cards, spacing, etc.)
- Document visual discrepancies with evidence
- Note color accuracy, typography, alignment, spacing

**Phase 3: Root Cause Analysis**
- Inspect HTML structure of live page
- Examine CSS files for styling issues
- Search for missing imports, incorrect values, wrong selectors
- Trace issues to specific files and lines
- Identify if issues are CSS, component, or asset-related

**Phase 4: Report Generation**
- Document all findings in structured format
- Include screenshots showing discrepancies
- Provide root cause explanations
- List affected file paths with line numbers
- Categorize by severity (critical, high, medium, low)

**Phase 5: Implementation Recommendations**
- Provide code examples for fixes
- Suggest file changes needed
- Estimate fix complexity and time
- Create actionable issue reports

---

## AGENT CAPABILITIES

### Required Tools Access
- ✅ `mcp__browsermcp__browser_navigate` - Navigate to pages
- ✅ `mcp__browsermcp__browser_screenshot` - Capture rendered output
- ✅ `mcp__browsermcp__browser_snapshot` - Get page structure
- ✅ `mcp__figma-desktop__get_screenshot` - Capture Figma design
- ✅ `mcp__figma-desktop__get_metadata` - Get Figma structure
- ✅ File read tools (Read, Glob) - Inspect source code
- ✅ Bash/grep tools - Search CSS and HTML
- ✅ Text comparison - Analyze differences

### What It Can Analyze
- **Typography**: Font families, sizes, weights, line-heights
- **Colors**: Brand colors, text colors, backgrounds, borders
- **Spacing**: Padding, margins, gaps, alignment
- **Layout**: Grid/flex layouts, responsive breakpoints, positioning
- **Effects**: Shadows, gradients, filters, opacity
- **Components**: Card styling, button states, form elements
- **Images**: Asset loading, sizing, filters

### Limitations
- ❌ Cannot modify live code (read-only)
- ❌ Cannot run automated tests (use visual-tester for that)
- ❌ Cannot generate code directly (provides recommendations)
- ❌ Cannot test interactive states in detail (screenshots only)

---

## EXAMPLE USE CASES

### Use Case 1: About Page Redesign Audit (Like We Just Did)
```
Task: "Compare the About page redesign (localhost:3000/about) with Figma design (node 2015:791) and identify visual discrepancies"

Agent Will:
1. Navigate to localhost:3000/about
2. Take screenshot of rendered page
3. Get Figma design screenshot (node 2015:791)
4. Compare both visually
5. Inspect source code (_design-tokens.scss, _about.scss, etc.)
6. Identify: wrong fonts, purple bar, spacing issues
7. Create detailed comparison report with:
   - Visual evidence (screenshots)
   - Root causes (missing font imports, BackgroundInner type)
   - File paths and line numbers
   - Recommended fixes with code examples
8. Return comprehensive audit report
```

### Use Case 2: Pre-Deployment Design Review
```
Task: "Audit the new homepage redesign to ensure it matches Figma before production deployment"

Agent Will:
1. Navigate to staging or dev server
2. Get latest Figma design
3. Section-by-section comparison
4. Verify all design tokens applied
5. Check responsive design
6. Identify any blocking issues
7. Create deployment readiness report
```

### Use Case 3: Design System Compliance Check
```
Task: "Verify that the new features page uses correct colors and typography from the design system"

Agent Will:
1. Navigate to features page
2. Get Figma design reference
3. Compare color usage against tokens
4. Verify typography hierarchy
5. Check spacing consistency
6. Report compliance findings
```

---

## SAMPLE INVOCATION

```
User: "Use the ui-design-auditor agent to compare the About page at localhost:3000/about with the Figma design at node 2015-791. Identify any visual discrepancies and provide a detailed report."

Agent Will:
- Navigate to http://localhost:3000/about
- Take screenshot of live page
- Get Figma screenshot (node 2015:791)
- Inspect CSS/HTML files
- Compare visually and technically
- Generate comprehensive audit report
- Return findings with recommendations
```

---

## OUTPUT FORMAT

The agent should provide:

### 1. Executive Summary
- Overall compliance status (✅ Ready / ⚠️ Minor Issues / 🔴 Blocking Issues)
- Number of discrepancies found
- Severity breakdown

### 2. Visual Comparison
- Side-by-side screenshots
- Annotated differences
- Section-by-section analysis

### 3. Detailed Findings
For each issue:
- **Issue**: What's wrong
- **Expected**: What Figma shows
- **Actual**: What's rendered
- **Root Cause**: Why it's happening
- **Location**: File path and line number
- **Severity**: Critical/High/Medium/Low
- **Fix**: Recommended solution with code

### 4. Root Cause Analysis
- CSS issues (missing rules, wrong values)
- Missing imports (fonts, images)
- Component prop issues
- File reference problems

### 5. Implementation Recommendations
- Priority order for fixes
- Code examples
- Estimated fix time
- Files to modify

---

## DISTINCTION FROM OTHER AGENTS

### vs visual-tester Agent
| Aspect | visual-tester | ui-design-auditor |
|--------|---------------|-------------------|
| Approach | Automated Playwright tests | Manual visual comparison |
| Purpose | Regression testing | Design compliance audit |
| Output | Test pass/fail | Detailed issue reports |
| Root cause analysis | Limited | Comprehensive |
| Figma comparison | No | Yes |
| Code inspection | No | Yes |

### vs ux-design-reviewer Agent
| Aspect | ux-design-reviewer | ui-design-auditor |
|--------|-------------------|-------------------|
| Purpose | Review completed implementation | Audit design vs implementation |
| Timing | After implementation | During/before deployment |
| Tools | Browser rendering | Browser + Figma MCP |
| Scope | Component accuracy | Full design compliance |

### vs component-builder Agent
| Aspect | component-builder | ui-design-auditor |
|--------|-------------------|-------------------|
| Purpose | Create component styles | Audit existing styles |
| Action | Generates SCSS | Analyzes and reports |
| Scope | Individual components | Full pages/sections |

---

## IMPLEMENTATION CHECKLIST

- [ ] Agent registered in task framework
- [ ] Tool access configured (Browser MCP, Figma MCP, File tools)
- [ ] Documentation created
- [ ] Example prompts documented
- [ ] Integration tested with About page audit
- [ ] Output format standardized
- [ ] Error handling defined
- [ ] Added to agent selection guide

---

## EXAMPLE PROMPTS FOR USERS

### Prompt 1: Full Page Audit
```
"Use the ui-design-auditor to compare localhost:3000/about with Figma design (node 2015-791). Create a comprehensive audit report identifying all visual discrepancies, root causes, and recommended fixes."
```

### Prompt 2: Specific Section Check
```
"Audit the hero section of the About page. Verify that typography, colors, and layout match the Figma design. Identify any CSS issues preventing the design from rendering correctly."
```

### Prompt 3: Pre-Deployment Review
```
"Perform a design compliance audit of the new features page. Check that all design tokens are applied correctly, responsive design works at all breakpoints, and everything matches the Figma specification. Flag any blocking issues."
```

### Prompt 4: Design System Verification
```
"Verify that the colors, typography, and spacing on the governance page match our design system tokens. Report any discrepancies and suggest fixes."
```

---

## SUCCESS CRITERIA

An audit is successful when it:
- ✅ Identifies all visual discrepancies between Figma and live
- ✅ Traces discrepancies to root causes in code
- ✅ Provides evidence (screenshots, file references)
- ✅ Categorizes issues by severity
- ✅ Recommends fixes with code examples
- ✅ Estimates complexity and time
- ✅ Delivers actionable implementation guidance
- ✅ Unblocks deployment decision-making

---

## TECHNICAL NOTES

### Performance Considerations
- Agent should compare one section at a time for large pages
- Use focused screenshots rather than full-page scrolls
- Cache comparisons if re-auditing same design

### Quality Assurance
- Screenshots should be at standard viewport (1440px desktop)
- Also test responsive at 768px (tablet) and 375px (mobile)
- Document all tool calls and results
- Provide reproducible findings

### Error Handling
- Handle Figma access issues gracefully
- Manage slow network on local dev server
- Handle missing assets or broken images
- Report clearly when tools are unavailable

---

## RELATED DOCUMENTATION

- FIGMA_DESIGN_SPECIFICATIONS.md - Design spec reference
- LIVE_UI_CRITICAL_ISSUES.md - Example audit output
- FIGMA_VS_SPEC_MEASUREMENTS.md - Detailed measurements

---

## APPROVAL STATUS

**Proposed**: 2025-11-12
**Author**: Claude Code (Senior Frontend Engineer)
**Status**: 🟢 Ready for Implementation
**Priority**: High (Needed for design compliance auditing workflow)

---

This agent fills a critical gap in the design-to-implementation workflow by enabling comprehensive visual auditing and design compliance verification.
