# Prompt Library

## New feature

**Context:** Describe the current files, state model, and existing behavior.

**Goal:** Implement one narrowly scoped user-facing behavior.

**Constraints:** Preserve public APIs, use existing patterns, avoid new dependencies, and work on a branch.

**Acceptance criteria:** List observable outcomes, with every criterion checkable by a unit, component, or end-to-end test.

**Examples:** Provide representative inputs, outputs, and edge cases.

## Bug fix

Context: identify the failing behavior and reproduction.
Goal: correct the root cause.
Constraints: keep the change scoped and preserve unrelated behavior.
Acceptance criteria: add a regression test that fails before the fix and passes after it.
Examples: include the failing input and expected output.

## Refactor

Context: name the duplicated or difficult-to-maintain code.
Goal: improve structure without changing behavior.
Constraints: keep the public behavior unchanged and avoid unrelated formatting.
Acceptance criteria: existing tests pass and focused tests cover the moved logic.
Examples: show before/after ownership or module boundaries.

## Generate tests

Context: describe the feature and its test seams.
Goal: add meaningful tests for success, failure, and boundary cases.
Constraints: tests must fail when the behavior is intentionally broken and must not weaken production code.
Acceptance criteria: tests assert observable outcomes and reach the requested coverage.
Examples: include stable selectors and representative fixtures.

## Review diff

Context: provide the diff and the original acceptance criteria.
Goal: identify correctness, regression, accessibility, and test gaps.
Constraints: report findings before praise or summary and do not rewrite code during review.
Acceptance criteria: every finding has a severity, location, and concrete impact.
Examples: include commands run and known limitations.

## Commit message

Context: summarize the user-visible change.
Goal: create a concise imperative commit message.
Constraints: use the repository's conventional style and mention scope when useful.
Acceptance criteria: the message explains what changed without implementation trivia.
Examples: `feat: add category filtering to expense ledger`.

# Add expense task prompt

## Context
The app is a Vite React expense tracker. `App` owns the expense collection, and UI components receive data and callbacks through props. Categories are Food, Travel, Bills, and Other.

## Goal
Implement an add-expense form that accepts a title, amount, and category and appends valid expenses to the ledger.

## Constraints
Keep state in `App` and keep one component per file. Use existing React and browser APIs only. Reject empty titles, non-numeric amounts, zero/negative amounts, and amounts over 100,000. Add stable `data-cy` selectors. Do not edit tests to make a failing behavior pass.

## Acceptance criteria

1. Submitting a non-empty title, positive numeric amount, and supported category adds exactly one row.
2. The added row shows the title, category, and amount with two decimal places.
3. An empty or whitespace-only title shows a validation error and adds no row.
4. A non-numeric, zero, or negative amount shows a validation error and adds no row.
5. An amount greater than 100,000 shows a validation error and adds no row.
6. A valid submission clears the title and amount fields.

Each criterion must be covered by an automated test.

## Examples

- `Lunch`, `250`, `Food` adds one Food row displaying `$250.00`.
- `Cab`, `400`, `Travel` adds one Travel row displaying `$400.00`.
- `   `, `25`, `Food` is rejected.
- `Lunch`, `-1`, `Food` is rejected.
- `Car`, `100001`, `Bills` is rejected.
