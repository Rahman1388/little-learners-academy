# Native build staging — review-only, not a store binary (4 November 2026)

This folder documents an automated **first build preparation** step. It does not publish or produce Apple .ipa or Google .aab files. The existing PWA remains the only deployed app.

## Reproducible asset stage
From the repository root with Node.js 22 or higher:

1. Run: `node scripts/prepare-store-assets.cjs`
2. Verify: `node scripts/test-store-assets.cjs`
3. Inspect the generated `native-build/www` directory locally. It is ignored by Git.
4. The new CI workflow `store-assets-review.yml` checks these steps before the preparation scripts are approved.

The staged output copies public app assets (HTML, JavaScript, CSS, graphics, bilingual MP3, manifest) while excluding Git, source scripts, Markdown documentation and generated builds. It is an asset review step, **not** an export that has been cleared for the Kids category.

## iPhone / iPad build next
- Obtain verified Apple Developer Program membership, a unique bundle ID and access to macOS with Xcode (or an authorised macOS CI build), appropriate signing and privacy/app-store documents.
- Capacitor is one possible native packaging approach: https://capacitorjs.com/docs/getting-started and https://capacitorjs.com/docs/ios
- Capacitor 8 requires a separate web asset directory and Xcode. Set `webDir` to the prepared output during a dedicated packaging iteration. **Do not assume current service-worker, links or localStorage behaviour is identical under the iOS native origin.**
- Implement native Kids-category parental gate for all links leaving the app, native-level app navigation, offline reliability and accessibility. Do **not** submit a plain WebView wrapper: Apple guideline 4.2 requires sufficient app-like functionality and value (https://developer.apple.com/app-store/review/guidelines/).
- Test on a physical iPhone and iPad with VoiceOver, working English/Arabic audio, fresh and returning user data, offline playback, and safe content. Submit only after educational, child privacy, naming, licensing and owner sign-off.

## Android build next
- Choose whether to package with Capacitor or a TWA/Bubblewrap. TWA requires HTTPS domain and Digital Asset Links verification: https://developer.chrome.com/docs/android/trusted-web-activity
- Google Play currently requires target API 36+ for new apps/updates (as at November 2026): https://support.google.com/googleplay/android-developer/answer/11926878
- Prepare signed App Bundle and Play App Signing. Protect the keystore and account credentials; **never commit keys or passwords**.
- Personal Play developer accounts created after 13 November 2023 generally need at least 12 closed testers continuously opted in for 14 days before requesting production access: https://support.google.com/googleplay/android-developer/answer/14151465
- Confirm Families Policy, child data disclosure, publisher identity, app-store listing, age suitability and optional parental controls before submitting.

## Important limits
- All 475 production source-audited questions are on GitHub main, but the Grade 3 Fraction Garden and child-led UX prototypes are currently separate drafts. A staging step from main does not include unmerged changes.
- Automated checks verify structural file copies only. They do not verify real device app behaviour, native packaging/signing, native English or Arabic pronunciation, app-review approval, school curriculum or completeness.
- Existing external-source links and parent/reviewer pages require parent-gating decisions before any Kids-category native release.
- Brand and intellectual-property clearance for Little Learners Academy is pending. This is not a promise of launch timing, rank or revenue.

For owner-readable milestones and release blockers, see `APP-STORE-LAUNCH-READINESS-2026-11-04.md` on the other active review branch and `PROJECT-CONTINUITY.md` on main.
