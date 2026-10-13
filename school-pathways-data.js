/* Parent-facing school-topic guide: thematic bridges, not certified standards crosswalk.
 * Grade numbers represent the selected pathway, not equivalent international placements.
 * Every link targets a real app activity; null means this topic has no dedicated pilot.
 */
(()=>{"use strict";
const topic=(id,title,ar,goal,href,scope="limited")=>({id,title,ar,goal,href,scope});
const grade={
1:{
math:[
topic("number","Counting and place value","العد والقيمة المكانية","Represent and order numbers; build groups of tens.","./ten-frame-lab.html"),
topic("operations","Addition and subtraction","الجمع والطرح","Model simple adding and taking away, including within 20.","./number-bonds.html"),
topic("shape","2-D shapes","الأشكال الهندسية","Describe familiar shapes and their features.","./activity-library.html?subject=math&skill=Shapes"),
topic("measure","Time and measurement","الوقت والقياس","Compare lengths and introduce clock reading.","./clock-time-lab.html")],
english:[
topic("decoding","Letters and early decoding","الحروف والقراءة الأولية","Connect print and words; isolated phonics audio still needs teacher review.","./phonics-adventure.html"),
topic("vocabulary","Everyday vocabulary","المفردات اليومية","Identify common words using pictures and context.","./match-learn.html"),
topic("reading","Listening and story understanding","فهم القصص","Recall simple story ideas and answer basic questions.","./story-garden.html"),
topic("sentences","Simple sentence conventions","تكوين الجمل","Spot basic sentences, capital letters and punctuation.","./activity-library.html?subject=english&skill=Sentences")],
science:[
topic("plants","Plants and living things","النباتات والكائنات الحية","Recognise familiar plants and animals.","./science-sort.html"),
topic("senses","Body and senses","الجسم والحواس","Identify senses and body parts.","./activity-library.html?subject=science"),
topic("materials","Everyday materials","المواد اليومية","Classify common materials by simple properties.","./science-sort.html"),
topic("observe","Observing and comparing","الملاحظة والمقارنة","Describe, group and compare objects and living things.","./daily-discovery.html")]},
2:{
math:[
topic("place","Two-digit place value","القيمة المكانية","Use tens and ones in two-digit numbers.","./grade2-pilot.html"),
topic("operations","Two-digit operations","عمليات على عددين","Practise adding and subtracting with place value.","./grade2-pilot.html"),
topic("measure","Length and time","الطول والوقت","Solve introductory measurement and time questions.","./grade2-pilot.html"),
topic("geometry","Shapes and data","الأشكال والبيانات","Recognise shapes and read simple data.","./grade2-pilot.html")],
english:[
topic("fluency","Word and sentence fluency","طلاقة القراءة","Read short passages and answer questions.","./grade2-english.html"),
topic("meaning","Reading for meaning","فهم المقروء","Find details in short texts.","./grade2-english.html"),
topic("grammar","Sentence conventions","قواعد الجملة","Notice capitals, punctuation and clear sentence meaning.","./grade2-english.html"),
topic("writing","Independent writing","الكتابة المستقلة","Write connected sentences; a dedicated writing module is still needed.",null,"gap")],
science:[
topic("plants","Plants and growth","النباتات والنمو","Observe how plants grow and what they need.","./grade2-science.html"),
topic("habitats","Animals and habitats","الحيوانات والموائل","Connect living things with their environments.","./grade2-science.html"),
topic("materials","Materials","المواد","Recognise and compare common materials.","./grade2-science.html"),
topic("investigate","Scientific enquiry","الاستقصاء العلمي","Plan an observation and record evidence; practical investigations need more depth.",null,"gap")]},
3:{
math:[
topic("multiply","Multiplication and division","الضرب والقسمة","Explore equal groups and basic multiplication facts.","./grade3-preview.html"),
topic("place","Three-digit numbers","الأعداد من ثلاث خانات","Use hundreds, tens and ones; a dedicated Grade 3 pilot is still needed.",null,"gap"),
topic("fractions","Simple fractions","الكسور البسيطة","Interpret fractions as equal parts.","./grade3-preview.html"),
topic("measure","Measure and money","القياس والنقود","Solve elementary everyday measure questions; a dedicated Grade 3 pilot is still needed.",null,"gap")],
english:[
topic("meaning","Reading comprehension","فهم المقروء","Answer questions about short passages.","./grade3-english.html"),
topic("detail","Details and inference","التفاصيل والاستنتاج","Find information and make simple inferences.","./grade3-english.html"),
topic("language","Vocabulary in context","المفردات في السياق","Use passage clues to understand words.","./grade3-english.html"),
topic("writing","Paragraph writing","كتابة الفقرات","Organise an independent paragraph; dedicated instruction is still needed.",null,"gap")],
science:[
topic("plants","Plant growth","نمو النباتات","Observe plant life cycles.","./grade3-science.html"),
topic("forces","Forces and magnets","القوى والمغناطيس","Explore push, pull and magnets.","./grade3-science.html"),
topic("materials","Rocks and materials","الصخور والمواد","Compare physical properties; a dedicated Grade 3 materials activity is still needed.",null,"gap"),
topic("investigate","Fair tests","التجارب العادلة","Plan and explain an investigation; more hands-on tasks are needed.",null,"gap")]},
4:{
math:[
topic("place","Four-digit place value","القيمة المكانية","Compare and round larger numbers.","./grade4-math.html"),
topic("operations","Multi-digit operations","العمليات الحسابية","Apply multiplication, division, addition and subtraction.","./grade4-math.html"),
topic("fractions","Fractions and decimals","الكسور والأعداد العشرية","Compare basic fractions and decimal representations.","./grade4-math.html"),
topic("data","Measurement and data","القياس والبيانات","Solve introductory measure and data problems.","./grade4-math.html")],
english:[
topic("reading","Text comprehension","فهم النصوص","Read and answer questions about original passages.","./grade4-reading.html"),
topic("inference","Inference and evidence","الاستنتاج والأدلة","Use details from a passage to support a response.","./grade4-reading.html"),
topic("vocab","Vocabulary in context","المفردات في السياق","Use words and context to interpret meaning.","./grade4-reading.html"),
topic("writing","Structured writing","الكتابة المنظمة","Organise multi-paragraph writing; no dedicated module yet.",null,"gap")],
science:[
topic("living","Living things and habitats","الكائنات الحية وموائلها","Classify living things and consider habitats.","./grade4-science.html"),
topic("matter","States of matter","حالات المادة","Explore solids, liquids and gases.","./grade4-science.html"),
topic("energy","Energy and electricity","الطاقة والكهرباء","Explore electrical circuits and energy; no dedicated Grade 4 electricity module yet.",null,"gap"),
topic("investigate","Scientific investigations","التحقيق العلمي","Collect evidence with fair tests; fuller investigations are still needed.",null,"gap")]},
5:{
math:[
topic("large","Large numbers","الأعداد الكبيرة","Read and operate with larger place values.","./grade5-math.html"),
topic("fractions","Fractions and decimals","الكسور والعشريات","Connect common fractions and decimals.","./grade5-math.html"),
topic("operations","Multi-step calculations","الحساب متعدد الخطوات","Solve more complex number problems.","./grade5-math.html"),
topic("measure","Geometry and measures","الهندسة والقياس","Practise introductory geometry and measurement.","./grade5-math.html")],
english:[
topic("reading","Longer passages","النصوص الأطول","Follow ideas in extended original texts.","./grade5-reading.html"),
topic("inference","Evidence-based answers","الإجابة بالأدلة","Support comprehension with textual details.","./grade5-reading.html"),
topic("vocab","Academic vocabulary","المفردات الأكاديمية","Interpret unfamiliar words with context clues.","./grade5-reading.html"),
topic("writing","Extended writing","الكتابة المطولة","Plan and revise organised writing; no dedicated module yet.",null,"gap")],
science:[
topic("life","Living things and life cycles","الكائنات الحية ودورات الحياة","Explore life cycles and habitats.","./grade5-science.html"),
topic("earth","Earth and space","الأرض والفضاء","Explore introductory Earth and space concepts.","./grade5-science.html"),
topic("materials","Changes in materials","تغير المواد","Review properties and changes of materials.","./grade5-science.html"),
topic("investigate","Evidence and enquiry","الأدلة والاستقصاء","Practise extended investigations with measurements; more depth needed.",null,"gap")]},
6:{
math:[
topic("ratio","Ratios and unit rates","النسب ومعدل الوحدة","Use ratio language, percentages and rate contexts.","./grade6-math.html"),
topic("algebra","Expressions and equations","التعابير والمعادلات","Use variables and solve simple equations.","./grade6-math.html"),
topic("fractions","Fractions and decimals","الكسور والعشريات","Calculate with fractions, decimals and percentages.","./grade6-math.html"),
topic("data","Geometry and statistics","الهندسة والإحصاء","Explore introductory area, volume and data questions.","./grade6-math.html")],
english:[
topic("complex","Complex text comprehension","فهم النصوص المركبة","Try three original English reading passages; wider text genres and full course coverage remain missing.","./grade6-reading.html"),
topic("evidence","Citing textual evidence","الاستشهاد بالأدلة","Answer questions on claims and evidence in original English passages; formal analytical writing is still missing.","./grade6-reading.html"),
topic("writing","Structured essays","كتابة المقالات","Plan, draft and revise longer writing.",null,"gap"),
topic("vocab","Advanced vocabulary","المفردات المتقدمة","Understand academic words in context.",null,"gap")],
science:[
topic("ecosystem","Ecosystems","النظم البيئية","Explore a limited mangrove-coast observation case, not full ecosystem coverage.","./grade6-science.html"),
topic("earth","Earth and space systems","أنظمة الأرض والفضاء","Use evidence to explain Earth and space phenomena.",null,"gap"),
topic("matter","Matter and energy","المادة والطاقة","Investigate basic solar energy transfer and filtering/dissolving in an introductory pilot.","./grade6-science.html"),
topic("experiment","Data and investigations","البيانات والتجارب","Discuss safe fair tests and sample limitations; practical data analysis remains incomplete.","./grade6-science.html")]}
};
const sources={
qatar:[{label:"Qatar MOEHE curriculum section",url:"https://www.edu.gov.qa/en/Content/CurriculumSection"}],
british:[
{label:"England mathematics programmes",url:"https://www.gov.uk/government/publications/national-curriculum-in-england-mathematics-programmes-of-study"},
{label:"England English programmes",url:"https://www.gov.uk/government/publications/national-curriculum-in-england-english-programmes-of-study"},
{label:"England science programmes",url:"https://www.gov.uk/government/publications/national-curriculum-in-england-science-programmes-of-study"}],
american:[
{label:"US Common Core maths",url:"https://www.thecorestandards.org/Math/"},
{label:"US Common Core English language arts",url:"https://www.thecorestandards.org/ELA-Literacy/"}]
};
window.LLA_SCHOOL_PATHWAYS=Object.freeze({grade,sources});
})();