# School Updates & Official Sources — safety audit (19 October 2026)

Status: Draft and held for review, **not a live emergency system, Ministry service, or approved commercial module**.

## Sources cross-checked
MOEHE: https://www.edu.gov.qa/en/Content/AnnualCalendar; https://www.edu.gov.qa/en/Content/TestsTimetable (2026–2027 mid-semester exam reference); https://www.edu.gov.qa/en/News?newsType=gallery
Hukoomi: https://hukoomi.gov.qa/en/news
Government Communications Office: https://www.gco.gov.qa/en/media-centre/top-news/
Qatar News Agency official RSS: https://qna.org.qa/en/Pages/RSS-Feeds/Qatar (real feed parser still needs live integration check)
UNESCO: https://www.unesco.org/en/articles/2026-global-education-monitoring-report-access-and-equity-countdown-2030?hub=355
OECD: https://www.oecd.org/en/publications/2026/09/education-at-a-glance-2026_3bce4131.html

## Privacy, safety and accuracy
- Adult-facing source links only; no child account, name, GPS, microphone, login, submission, push notifications or third-party analytics.
- QNA automated headlines are GENERAL NEWS; source date, last successful fetch, stale warning after 12 hours; after 7 days they are hidden. Exam dates, individual school notices, closures and emergencies are NOT inferred or verified automatically.
- Only trusted HTTPS domains and QNA article URL forms may be rendered. Dynamic titles use textContent. CSP disallows scripts/data fetches to third parties.
- QNA importer rejects unexpected or malformed feed/article formats rather than falsely logging success. Retrieval failure preserves prior snapshot.
- Source links need periodic manual quality checks. A link to an official page does not mean content was approved by that organization.

## Engineering and release gates
- Standalone draft branch and PR; the public app (main) is unchanged.
- Offline feed fixture tests, static syntax, mobile/desktop Playwright review, expiry behavior and external-request checks are configured in .github/workflows/school-news-review.yml.
- Real QNA RSS access to be checked in the optional diagnostic job; successful fixture tests alone cannot prove production feed compatibility.
- Scheduled GitHub Actions news publishing cannot run from this unmerged feature branch, because scheduled workflows run on default branch only. The workflow itself has a main-branch guard.
- Pending: technical checks, iOS Safari/VoiceOver, Arabic specialist, official notification terms and copyright review, owner release approval and school-specific verification process.
