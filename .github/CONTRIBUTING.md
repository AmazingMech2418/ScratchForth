# Contribution Guidelines

## Bug Reports
If you would like to document a bug or vulnerability in this software, please create an issue in this repository. Your issue should describe the steps to reproduce the bug or vulnerability, and potential impacts of this bug/vulnerability. Any suggestions for how to fix this would also be appreciated.

## Suggestions
If you would like to suggest a feature, please create an issue in this repository. Your suggestion should be clear and it will then be open to discussion. Currently, I (AmazingMech2418) am the only maintainer, but anyone can discuss the suggestion.

## Pull Requests
If you would like to fix a bug or implement a suggestion, it is best that you work to fix those with highest priority. Labels will be added to issues labelling a priority from 1 through 5.

*Please note that the greater the number, the greater priority.*

Here is a breakdown of these priority levels:
- 1: Feature request - Should be implemented but not critical to add
- 2: Improvement suggestion - Suggestion to improve the security of the XSS protection system, but not linked to a clear vulnerability
- 3: Low priority bug - A bug that is extremely difficult to exploit, such as one that someone can possibly exploit, but not through an arbitrary JavaScript code snippet alone (i.e. tampering with the browser engine or exploiting a buffer overflow)
- 4: Medium priority bug - A bug that can be exploited, but has restrictions to what it can do
- 5: Critical Vulnerability - A vulnerability allowing arbitrary bypass of the request blocking system or allowing XSS through the system in some way

If an issue does not have a priority label, you can feel free to submit a PR, but consider what priority it would be labelled as first before attempting to submit the PR.

If an issue has the `needs discussion` label, please attempt to refrain from submitting a pull request, since in these cases, it is not known if this will even need to be implemented. It is better to spend your time working on issues with confirmed priority.

If you submit a PR for an issue with `needs discussion`, your PR might take a while to be reviewed, or might be closed if the request in the issue is rejected. An `unconfirmed priority` label will be placed on these pull requests.

Please do not submit a PR that is not linked to an issue. If you have a suggestion you know how to implement, create the issue and then the PR for it.

If an issue has an `in progress` label, also please do not submit a PR since a solution to the issue would already be in the process of being made. Additionally, a `help wanted` label would mean that the issue does not have a known solution, and discussion and pull requests are highly welcomed.

When submitting a pull request, also please note that this project is meant to only be one file, so please do not create more files for the code. Doing so will automatically cause your pull request to be closed.
