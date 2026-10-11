# Curriculum alignment strategy

## Target learner
**Primary Level 1, age 6–7 in Qatar.**

The app uses the Qatar Grade 1 age band as the anchor. For international-school families, this is mapped to:
- **Qatar curriculum:** Grade 1
- **English National Curriculum:** typically Year 2 at age 6–7 in Qatar's international-system equivalency tables
- **USA:** Grade 1
- **Early literacy bridge:** selected Year 1 phonics skills remain available because many bilingual/EAL learners benefit from explicit decoding practice

This is a **supplementary curriculum bridge**, not a claim that British and American curricula are identical.

## Why British-first with an American crosswalk
Qatar's Ministry private-school search system lists both British and American curricula among the major private-school options. British-curriculum schools are especially prominent in Doha, while American schools are also an important segment.

The app therefore prioritises the overlap that serves the largest practical audience:
- early English literacy and phonics
- speaking and listening
- number sense and place value
- addition and subtraction
- shapes, measure and time
- living things, body/senses and materials
- life skills, creativity and memory practice

## British references
Official England primary curriculum:
- https://www.gov.uk/national-curriculum/key-stage-1-and-2
- https://www.gov.uk/government/publications/national-curriculum-in-england-english-programmes-of-study/national-curriculum-in-england-english-programmes-of-study
- https://www.gov.uk/government/publications/national-curriculum-in-england-mathematics-programmes-of-study/national-curriculum-in-england-mathematics-programmes-of-study

## American references
Common Core Grade 1 overlap for ELA and mathematics:
- https://corestandards.org/english-language-arts-standards/
- https://corestandards.org/mathematics-standards/

American science varies by state/school system, so the app currently uses internationally common early-primary science themes rather than falsely claiming one national US science curriculum.

## Qatar requirements
Qatar MOEHE regulates private schools and requires compulsory national-content areas across private-school systems, including Arabic, Islamic Education and Qatar History according to applicable policies and grade sequence.

Official references:
- https://privateschoolssearch.edu.gov.qa/en/pages/privateschoolsearch.aspx
- https://www.edu.gov.qa/en/News/Details/1621800
- https://privateschoolssearch.edu.gov.qa/Documents/PolticPrivateSchoolsEnglish.pdf

The app keeps Arabic, Islamic Studies and Qatar History as **review-locked modules** until qualified specialist review. This avoids publishing unreviewed religious, linguistic or national-history content.

## Product principle
The app should remain simple for children:
**SEE → LISTEN → SAY → LEARN → DO → RECALL → QUIZ → REWARD**

Memory features use pictures, colour, association and active recall. No claim is made that colour alone improves memory or that the app uses an official proprietary Tony Buzan programme.

## Grade 2 mathematics readiness pilot (limited)

The `grade2-pilot.html` screen contains **24 independently checkable questions** in four six-question strands: base-ten place value, two-digit addition/subtraction, length/time tools, and geometric/data reasoning. It is not a complete Grade 2 programme or an assessment of mastery. Progress lives in the separate `lla-grade2-pilot-v1` key and does not alter Grade 1 achievements.

Reference themes: Common Core `2.NBT.A`, `2.NBT.B`, `2.MD.A`, `2.MD.C`, `2.MD.D`, `2.G.A` and England Years 2/3 maths. The grade-age equivalency depends on the school system and is not asserted as one-to-one. Official references: https://corestandards.org/mathematics-standards/ and https://www.gov.uk/government/publications/national-curriculum-in-england-mathematics-programmes-of-study.

`node scripts/check-learning-content.cjs` checks fixed answer keys, counts, unique options, maths arithmetic, stable IDs, and the previously ambiguous capital-letter item. This **technical/content integrity check is not teacher approval**; Arabic support text and pedagogy still need specialist review before formal launch. Grades 3–6 remain roadmap-only.
