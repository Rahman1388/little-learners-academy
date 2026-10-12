# Little Learners Academy — Apple App Store & Google Play release preparation

**Status (October 2026): PREPARATION ONLY.** A public PWA exists, but **no signed iOS IPA or Android AAB, no TestFlight/Play testing track, and no approved store listing** is established by this document. Never claim a store launch without verification.

Public app: https://rahman1388.github.io/little-learners-academy/

## Product and audience
- English name: **Little Learners Academy**. Arabic reference: **أكاديمية المتعلمين الصغار**.
- Intended first-release audience: children approximately 6–7 / Grade 1, adult supervised, families in Qatar.
- Free bilingual supplementary education: vocabulary, English whole-word listening, mathematics, science, picture-memory games, progress and parent features.
- **Do not claim Grades 1–6 completion**: Grade 2 pages are pilots, Grades 3–6 remain a roadmap.
- **Do not claim official Qatar Ministry of Education, school, phonics, curriculum or voice approval**.
- Voices currently used are **adult synthetic styles**, not recordings of girls/boys. Arabic female audio and isolated phonics need independent review.
- Progress is stored on the local device/browser. No automatic cloud synchronization between web and native containers.
- Keep children clear of advertising, external links, analytics, unnecessary permissions, microphone/camera access and collection of names/precise locations.

## Phase 1 — iPhone / iPad foundation (in progress)
- [x] Responsive web application, service-worker caching and home-screen install guidance.
- [x] Privacy/data controls are available at `privacy.html`; recheck wording on the actual app package.
- [ ] Audit Safari and **real iPhone** navigation, audio playbacks, reinstall behavior, safe areas, text sizing, offline mode, and VoiceOver.
- [ ] Create **native mobile app experience** with substantial app-specific features beyond a simple WebView. Consider a maintained Capacitor-based container only *after* deciding how to bundle local assets/offline content and meaningful native integration; reject a URL-only wrapper.
- [ ] Confirm child-safe parental gate for all outbound external links, parent areas and any store-related controls. Test bypass attempts.
- [ ] Replace SVG-only store icons with properly sized **original PNG iOS icon**, launch assets and a consistent App Store presentation.
- [ ] Decide final unique Apple Bundle ID and Android Application ID, under an account actually owned by the publisher. Do not use placeholders in a submitted app.
- [ ] Build and sign in Xcode; test on actual iPhone, iPad if supported and TestFlight.
- [ ] Record real screenshots of the genuine running iOS app for required device sizes.
- [ ] Have a qualified English/Arabic reviewer check the content and pronunciation before presenting any formal instruction as verified.

## Phase 2 — Android
- [ ] Reuse the reviewed offline-ready content with a proper Android application project.
- [ ] Build a **signed Android App Bundle (AAB)** with current Play target SDK, app icon, adaptive icon, tested permissions and correct package ID.
- [ ] Test Chrome/PWA and then actual Android phones/tablets, TalkBack, audio, performance and offline behavior.
- [ ] Complete Play Console **Target Audience and Content**, Families declarations, Data safety and IARC content rating accurately.
- [ ] If a new **personal Play Console** account is subject to closed testing, recruit **at least 12 opted-in testers for 14 continuous days** before applying for production access (verify at submission time).
- [ ] Capture genuine screenshots from the Android build, not mockups.

## Phase 3 — Store and child privacy compliance
- [ ] Apple Developer Program membership in the publisher's name; Apple Store Connect app record.
- [ ] Google Play Console developer registration in the publisher's name.
- [ ] Confirm business/individual publisher naming, support contact and a privacy policy URL fit for store review.
- [ ] Privacy counsel / knowledgeable reviewer to consider Qatar data protection laws and applicable child privacy laws where distributed.
- [ ] No trackers or ads by default. Verify with packaged app's dependencies and network traffic, not only source-code claims.
- [ ] Apple's Kids Category restrictions: external navigation, purchases and distractions need **parental gating**. Avoid a false age-screen or a simple yes/no checkbox.
- [ ] Google Families restrictions: no standalone URL-only WebView, no unnecessary identifiers, no forbidden SDKs and accurate disclosures.
- [ ] Store **age ratings, screenshots, title, description, accessibility, data privacy answers and content rights** complete.
- [ ] Test offline audio on device after installation and device restarts.
- [ ] Make it easy for adults to see local data, erase it, and understand that uninstalling/reinstalling may lose stars.
- [ ] Register and verify actual ownership of store developer accounts before signing and uploading.
- [ ] Use phased testing and submit each signed binary to the respective store. Approval is made **by Apple/Google**.

## Draft store description (verify numbers/features before submission)

**Title:** Little Learners Academy

**Short description:** A playful English–Arabic learning world for early primary learners.

**Long description:**
Little Learners Academy helps young children practise early learning skills through friendly, colourful activities. Explore number games, picture pairs, beginner English vocabulary, science discovery, creative patterns, and short learning challenges. Arabic support helps families navigate and understand selected activities.

Children can earn local achievement badges, revisit games and learn at their own pace. Parents can review progress and find helpful practice suggestions. This version is designed for Grade 1 learners, with some Grade 2 pilot content clearly marked as supplementary.

The app does not require a child's name or an account and does not include in-app advertising. It is independent educational practice and is not affiliated with or certified by any school or education ministry. Spoken practice uses synthetic voices; pronunciation quality and curricular content require ongoing educational review.

## Official reference links (check again before each submission)
- Apple review: https://developer.apple.com/app-store/review/guidelines/
- Apple account: https://developer.apple.com/programs/enroll/
- Apple screenshots: https://developer.apple.com/help/app-store-connect/reference/app-information/screenshot-specifications
- Google Families: https://support.google.com/googleplay/android-developer/answer/9893335
- Google Play account: https://support.google.com/googleplay/android-developer/answer/6112435
- Google closed testing: https://support.google.com/googleplay/android-developer/answer/14151465

## Important limitation
The `install-app.html` page documents Safari/Chrome **home screen installation only**. It is not the native Apple or Android application and does not guarantee either store's approval. Publishing and developer enrollment **require an explicit action by the actual account owner**.
