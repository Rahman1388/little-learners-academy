# Apple App Store + Google Play Launch Readiness — 4 November 2026

**Source of truth:** https://github.com/Rahman1388/little-learners-academy
**Current usable PWA:** https://rahman1388.github.io/little-learners-academy/
**Status:** Not yet submitted to Apple or Google; no IPA/AAB signed here. Maintain the published PWA while completing the release gates. This is a realistic launch plan, not a guaranteed approval date.

## Why not submit the current PWA ZIP directly?
- The current repo is a static Progressive Web App and GitHub Pages site, **not** a signed native iOS IPA or Android AAB.
- **Apple guideline 4.2:** apps must go beyond merely wrapping a website and provide sufficient app-like function, quality and enduring value. Do not submit a bare WebView shortcut; design/test a meaningful standalone native experience. Source: https://developer.apple.com/app-store/review/guidelines/
- Android options include a Trusted Web Activity (TWA) via Bubblewrap, requiring verified origin with Digital Asset Links and native app signing, or a Capacitor Android bundle. TWA guidance: https://developer.chrome.com/docs/android/trusted-web-activity
- iOS option: a properly bundled Capacitor iOS application built with Xcode on macOS, requiring offline self-contained child activities, native-friendly navigation, iOS-specific testing and approved developer credentials. A wrapper **does not guarantee App Store approval**. Capacitor docs: https://capacitorjs.com/docs/ios and https://capacitorjs.com/docs/getting-started

## External publisher obligations (verified against official documentation, November 2026)
- [ ] Apple Developer Program enrolled, verified and active; currently **US$99/year** (regional taxes/currency may vary): https://developer.apple.com/programs/
- [ ] Google Play Console developer account enrolled and verified; currently **US$25 one-time fee**: https://support.google.com/googleplay/android-developer/answer/6112435?hl=en
- [ ] New Google Play **personal** accounts created after 13 November 2023 generally require **12 opted-in testers for 14 continuous days** on a closed test before requesting production access: https://support.google.com/googleplay/android-developer/answer/14151465?hl=en
- [ ] Google Play new apps and updates target Android **API level 36+** from 31 August 2026 (consult current policy when uploading): https://support.google.com/googleplay/android-developer/answer/11926878?hl=en-en
- [ ] Google Play Families Policy (target age, app content, data safety, advertising, in-app purchases) audited: https://support.google.com/googleplay/android-developer/answer/9893335?hl=en
- [ ] Apple Kids Category: select appropriate 6–8 and/or 9–11 age band if applicable, meet parental-gate, external-link, tracking and privacy requirements; check age policy for Grade 6 older pupils: https://developer.apple.com/app-store/categories/ and https://developer.apple.com/app-store/review/guidelines/
- [ ] Owner selects individual vs organisation publisher identity, checks rights to brand/name/icon, and supplies contact email and privacy-policy URL. Do not commit private ID, addresses or developer credentials.

## Child education and safety: blocking QA
- [ ] Grade-specific curriculum reviewer compares each lesson against actual Qatar school materials; document sources and grade/year; do not claim Qatar MOEHE endorsement.
- [ ] English early-literacy/phonics educator and Arabic early-literacy educator review bilingual words, diacritics, letter-sound mapping, natural speaker articulation and culturally appropriate language. See BILINGUAL-AUDIO-NATURE-QUALITY-2026-11-04.md.
- [ ] Native-speaker human listening assessment on real iPhone/iPad + Android speaker/headphones for each phonics clip; technical file checks alone cannot establish clear native-like pronunciation.
- [ ] iPhone Safari/VoiceOver, Android TalkBack, tablets and offline functionality checked. All navigation and buttons child-usable, touch targets large, text high contrast, optional animations and sounds, no background audio masking speech.
- [ ] Privacy policy matches actual SDKs and traffic; ensure no child analytics, child-targeted advertising, open chat, inappropriate external links, unnecessary permissions or student data. Parental gates for any out-of-app links in a Kids-category native build; current website has public navigation links and must be reviewed.
- [ ] Parent/child supervised usability trials with consent, without collecting names, recordings or child identifiers; monitor confusion, frustration, reading ease, stopping points and parent trust.
- [ ] Content licenses: every illustration, story, sound, voice and screenshot original or properly licensed.
- [ ] No unverified claims: no teacher approval, MOEHE accreditation, expert-certified phonics, native child voice or complete Grade 1–6 curriculum until verified.

## App packaging, build, testing and launch sequence
1. Freeze first-launch scope around a usable, high-quality **minimum lovable release**, not the future 600-lesson / 2,400-activity goal. A clear Grade 1 foundation and clearly labelled higher-grade supplementary pilots are preferable to unfinished, inflated claims.
2. Finalize app name (Little Learners Academy remains provisional pending trademark/store check), store icon and screenshots, Arabic and English store descriptions, keyword and category research based on truthful functionality.
3. Build a self-contained **iOS Capacitor native app**, with offline assets, correct iOS bundle identifier and versioning, Xcode signing, actual native device QA, app review metadata, TestFlight beta testing. Do not attempt Xcode build on Windows-only machine unless an authorized macOS build environment is available.
4. Build a signed **Android App Bundle** using Capacitor or TWA/Bubblewrap, targeting required API, verify Digital Asset Links if TWA, set Play App Signing, launch internal/closed testing and address issues. Keep signing keys out of the public repo and conversation.
5. Complete privacy / kids-age disclosures, screenshots, age rating, content questionnaire, support URL, privacy-policy URL, accessibility and store metadata in each platform. Verify no screenshots contain real children’s data.
6. Conduct external family and teacher pilot, fix blockers, obtain owner release approval and submit to Apple/Google. Store teams alone decide approval and timing.
7. After release: respond to app reviews and genuine user-reported bugs; track crash and support trends in a privacy-conscious way without collecting child identifiers. Update both app binaries as platform rules evolve.

## High ranking is a separate long-term outcome
- Honest bilingual app metadata and indexable public site; original well-structured content and appropriate age category.
- Actual learning quality, reliable audio, fast offline response, accessible interfaces and parent recommendations drive trust and retention more than a high raw item count.
- Request feedback from adults only; no manipulating children to leave ratings or using fake reviews.
- Publication, ranking and revenue **cannot be promised**. The 600-lesson / 2,400-activity goal remains future roadmap.

## Current release decision
**NOT READY FOR STORE SUBMISSION.** Current website may be used as an existing supplementary web pilot with clear disclaimers; do not claim reviewed native binaries or complete school curricula. Current feature/branch drafts need app validation, child privacy/security, native English + Arabic sound review and actual-device educational checks.
