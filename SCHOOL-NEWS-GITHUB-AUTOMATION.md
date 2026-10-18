# School Updates & Alerts — GitHub-only development plan

**Status (18 October 2026): DEVELOPMENT / NOT PUBLISHED.** The user chose to keep Little Learning Academy on GitHub; development of the separate Floot news experiment has stopped. No existing public app or main branch has been replaced.

## What is now built on the GitHub review branch

- `school-updates.html`, `school-updates.js`, `school-updates-data.js`: bilingual adult-facing school-news menu, official Ministry school calendar/exam source links, Ministry/Government news, emergency verification guidance, and selected UNESCO/OECD publications.
- `scripts/refresh-school-news.cjs`: reads **Qatar News Agency (QNA) official Qatar RSS**, safely selects *general education reporting* by title keywords, checks QNA article URLs and publication dates, and writes the static `school-live-news.json` snapshot. Title keywords are approximate; unrelated or missing articles are possible.
- `school-live-news.json` is initially **unpopulated** (`lastSuccessfulFetch: null`), so the review branch never falsely claims to have the latest news. A script run replaces it only after successful retrieval/validation.
- `.github/workflows/school-news-refresh.yml`: proposed schedule of **every six hours** and manual dispatch, but its job is guarded to **main only** and scheduled GitHub Actions run only from the repository's **default branch**. This new workflow is **not active while held on the review branch**. It requires release approval and merge to `main` before ordinary scheduled operation begins.
- `scripts/test-refresh-school-news.cjs` and `scripts/test-school-updates.cjs`: deterministic feed parsing and browser checks, including untrusted-link rejection, timestamp/stale-data display, no tracking, and 280–1024px layouts.

## What is automatic after a future approved release

1. GitHub Actions attempts to fetch QNA RSS **approximately every 6 hours** (GitHub scheduling can be delayed or skipped).
2. For each story, restrict links to official QNA news article URLs, require an education-related title, and limit articles to the preceding 30 days. Keep at most 12 dated headlines. These are news articles, **not verified exam circulars**.
3. On successful retrieval, GitHub commits **only `school-live-news.json`**, so the app can display the last successful retrieval time and QNA publication dates. If the fetch fails, the workflow fails and **the previous snapshot is preserved**, not silently relabelled as current.
4. The website reads only its **same-origin JSON**. It shows a **stale warning after 12 hours**, or an explicit unavailable/uninitialized message. Parents can always open the original official source.
5. No child account, location, push subscription, recording or analytics is introduced. Routine automatic updates do not equal continuous monitoring.

## Important safety boundaries

- **Emergency closures, weather warnings and urgent health/safety notices: NOT automatically monitored.** Parents must follow the school, Ministry and Government Communications Office directly. Never display a routine QNA keyword match as an emergency alert.
- **Exam schedules and calendar dates: NOT automatically imported or verified.** The section links to the official Ministry calendar and related notices; the school must confirm the correct year, level and any circulars.
- **International research:** selected UNESCO/OECD source references are **editorially maintained, not a live research feed**. Automatic research-feed integration requires separate reliable source and licensing/relevance verification.
- **Site release:** still requires specialist educational/Arabic review and owner authorisation; the scheduled workflow has repository `contents: write` permissions specifically to publish generated news JSON after release. Ensure the repository allows GitHub Actions bot commits, review the workflow permissions, and confirm GitHub Pages rebuilds as expected.
- **Floot:** Do not develop or publish the separate Floot news experiment further. Its existing project is not the source of truth. This decision does **not delete** any Floot project.

## Verification record — 18 October 2026

**Automated engineering QA: PASS.** [GitHub Actions Grade 2 & school-news run #39152945539](https://github.com/Rahman1388/little-learners-academy/actions/runs/39152945539) checked code commit `9db9caed` and reported eight successful checks: QNA RSS parsing and trusted URL validation; 20-skill Grade 2 content and persistence; teacher-preview package; eight word-family phonics journey; private educator feedback; mobile preview navigation; and School Updates source tabs, snapshot freshness, stale/failure warnings and no emergency-alert claims.

**Scope of verification:** The feed parser test used a deterministic synthetic RSS fixture, **not a live scheduled production update**. Live QNA access was separately checked during development, but GitHub's scheduled fetch has **not started on the review branch**. Until approved and merged into the default branch, the sample feed metadata remains deliberately uninitialized.
