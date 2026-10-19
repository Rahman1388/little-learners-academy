# Grade 2 -ing Phonics Visual Micro-Lesson — Reviewer Handoff
**Draft: 19 October 2026. NOT RELEASED OR EDUCATOR APPROVED.**

## Purpose
An original English phonics review lesson for young bilingual learners with **draft Arabic instructions**. The target is to recognize the repeated **-ing** spelling/rime in **ring** (r + ing), **sing** (s + ing) and, after modelling, independently choose **king** (k + ing). This demonstrates **Watch → Connect → Try** across maths and language.

## What exists
- Standalone static development files: grade2-ing-visual-phonics.html and grade2-ing-visual-phonics.js.
- Three user-paced captioned scenes (ring → sing → comparison), original color-linked two-branch map, and new independent application question: choose king, not sand/hand. Wrong choices produce constructive feedback and optional hint/retry in both languages.
- English spoken whole-word playback **only when manually tapped**, on scenes where one English word is shown. It uses SpeechSynthesisUtterance, the **device voice**—NOT an approved/recorded child narrator, not isolated phoneme recordings or a verified phonics pronunciation. Voice selection and possible cloud/offline behavior depend on the OS.
- On-device in-session state only. No account, chat, profiles, microphones, uploaded recordings, analytics, saved score, direct network calls or advertising. English word tokens remain LTR with Arabic RTL instructions.
- Neither a released lesson nor an additional audited activity in the established inventory. Draft PR #13 and the public child-facing app remain untouched.

## Outstanding qualified review
- **English phonics educator:** confirm r/s/k + ing decomposition and age-appropriate scope, word meanings, target pronunciation, clarity of examples, and limits of picture + print associations. Correct choice does not prove oral decoding.
- **Arabic educator:** check all Arabic captions, prompts, feedback, RTL reading order and English term use.
- **Real iPhone/Android + accessibility:** verify whole-word English device speech in normal/slow rates; mute/stop/pause behavior; screen reader navigation; small screens, captions, alternative adult model and sound clarity.
- **Parent/teacher trial:** whether 6.5-second caption timing is too fast, cognitive load and word generalization to king.
- **Privacy:** browser code makes no service calls, but device voices can depend on the platform. Do not claim universal offline operation.

## Release gates
Run Grade 2 -ing visual phonics browser review (Playwright/Chromium), application validation and child-security checks. A passing automated check is **not** educator certification, native Arabic proofreading, or real-device audio testing. Keep the PR draft/unmerged until owner approval following those human reviews. Do not publish a new public SEBT lesson link or add to child navigation without approval.