# Little Learners Academy — Security, independent backups and recovery
_Last verified: 18 October 2026. Internal owner guidance; not a security certification._

## Our current GitHub situation
- [Our GitHub repository](https://github.com/Rahman1388/little-learners-academy) is **PUBLIC** (verified). Anyone may read public files, current changes and potentially historical copies. GitHub version history helps recover code but it is neither a private vault nor a complete independent backup.
- The live site is published through GitHub Pages from our project. Prototype feature changes remain in [draft PR #13](https://github.com/Rahman1388/little-learners-academy/pull/13); the live app is not changed merely by updating that draft.
- GitHub does **not** store students' phone-local progress. Some optional phonics stages reset whenever the page reloads.
- The existing child-security checks are valuable but cannot guarantee security, discover every leaked credential, verify all Git history, or establish Qatar legal compliance.

## Non-negotiable: never put private information in this public repository
Keep private school curriculum PDFs, copyrighted textbooks, officials' replies, teachers' identifying feedback, student names, recordings, photos, test scores, access credentials, payment data and private ZIP backups out of GitHub. Put them in a separately secured location controlled by the owner. Share public-facing activity wording and anonymized corrections only if permitted.

An accidental public secret must be immediately revoked/rotated, not simply deleted: old Git history, forks and external clones may retain it. Follow [GitHub's sensitive-data removal guide](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/removing-sensitive-data-from-a-repository).

## Immediate settings for the owner
1. **Account security:** Enable GitHub two-factor authentication/passkey, use a unique password, review sessions and authorized applications; remove unnecessary collaborators or tokens.
2. **Protect the default branch:** The repository's rulesets API showed **no configured rulesets** when checked on 18 October. On desktop open Repository → Settings → Rules → Rulesets. Create a branch ruleset targeting main that blocks deletion/force push and requires a pull request and passing checks (at least Validate app and Child App Security Gate), and inspect bypass access. This setup has not been made from this ChatGPT connection; branch-protection API access was denied.
3. **Security features:** Check GitHub security settings for secret scanning, push protection and dependency alerts and enable what the plan offers. Their current account-level settings could not be verified.
4. **Release policy:** Keep educational enhancements in draft branches until automated checks, educator input, real-iPhone/VoiceOver checks and child-privacy assessment are complete.

GitHub's official documentation: [branch protection](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches) and [repository rulesets](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/creating-rulesets-for-a-repository).

## Keep an independent backup outside GitHub
A second **private, access-controlled copy** reduces reliance on one service. Schedule it after each significant release and at least monthly; periodically verify that it opens.

**Mobile-friendly code snapshot:** Open our GitHub repository, choose Code → Download ZIP (in some mobile browsers choose desktop website). Save a dated copy in iPhone Files, then move it to a secure separate storage location; retain only recent needed versions. The ZIP is a point-in-time code snapshot. It does **not** include complete commit history, repository security settings, issues, pull-request discussions, unpublished private teacher correspondence or child progress.

**Laptop full Git-history copy:** On an authorized computer with Git installed:
```bash
git clone --mirror https://github.com/Rahman1388/little-learners-academy.git
```
Store the mirror on a separate encrypted medium/cloud and update or replace the backup regularly. Mirror backups do not automatically cover GitHub issues, configurations and future Git LFS assets. Use [GitHub's backup guidance](https://docs.github.com/en/repositories/archiving-a-github-repository/backing-up-a-repository), and occasionally test recovery into a nonpublic test location.

**Backup status:** A separate downloadable or offsite backup has **not** been created or verified in this chat. It needs the owner's action or an authorized storage connection; a GitHub draft branch is *not* an offsite backup.

## Developer protections added to draft PR #13
- A new filename guard checks Git-tracked paths and blocks common private folders, office documents, school PDF files, credential files and backup archives from being newly committed to this public repository.
- The existing credential-pattern security scan still runs in GitHub Actions. A passing filename guard does **not** detect private text inside an allowed file or private data already in Git history.
- Our .gitignore lists example private paths to reduce accidental commits. Ignored files can still be force-added or already tracked; the guard and human checks are complementary.

## After a call or lost chat context
Use [START-HERE.md](./START-HERE.md) for recovery status, and review [draft PR #13](https://github.com/Rahman1388/little-learners-academy/pull/13) for unpublished features. This restores our development context, not the missing transcript or phone-local learning progress. No editing happens automatically when the chat is closed.
