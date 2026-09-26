export interface ArticleItem {
  id: string;
  numericId?: number;
  category: string;
  tag: string;
  title: string;
  readTime: string;
  date: string;
  desc: string;
  author: string;
  cover?: string;
  sections?: {
    heading: string;
    content: string[];
  }[];
  content: string[];
  faqs?: { question: string; answer: string }[];
  citations?: { name: string; url: string }[];
}

export const articlesList: ArticleItem[] = [
  {
    id: "anal-cancer",
    numericId: 1,
    category: "CLINICAL CARE",
    tag: "CLINICAL CARE",
    title: "Anal Cancer: Comprehensive Guide to Causes, Staging, Prevention & Treatment",
    readTime: "10 min read",
    date: "Sep 23, 2026",
    desc: "An exhaustive clinical analysis of anal cancer types, staging, HPV risk factors, diagnostic anoscopy, chemoradiation therapy, and long-term surveillance by researcher Suditi Saha.",
    author: "Suditi Saha | Researcher",
    content: [
      "Anal cancer is a malignancy originating in the anus—the distal opening of the gastrointestinal tract. Most commonly, it is a squamous cell carcinoma arising in the anal canal. Less frequent types include adenocarcinoma, small-cell carcinoma, and melanoma.",
      "Understanding the distinct types of anal cancer is crucial because treatment protocols, surgical indications, and overall prognosis vary significantly across histologic classifications.",
      "Preventive strategies have proven exceptionally effective due to the strong etiology linking anal cancer with Human Papillomavirus (HPV) infection, particularly HPV-16 and HPV-18.",
      "Modern first-line management with combined chemoradiation therapy (CRT) offers high cure rates while preserving anal sphincter function, avoiding permanent colostomy for the majority of early to locally advanced patients.",
    ],
    sections: [
      {
        heading: "What is Anal Cancer?",
        content: [
          "Anal cancer is a malignancy originating in the anus—the distal opening of the gastrointestinal tract (approx. 4 cm in length). Most commonly, it is a squamous cell carcinoma arising in the anal canal. Less frequent types include adenocarcinoma, small-cell carcinoma, and melanoma.",
        ],
      },
      {
        heading: "Types of Anal Cancer",
        content: [
          "Anal cancer is categorized based on the type of cells from which it originates:",
          "• Squamous Cell Carcinoma (SCC): Most common type (about 85–90% of all cases). It arises from squamous epithelial cells lining the anal canal, often linked to Human Papillomavirus (HPV) infection (especially HPV-16). Subtypes include Keratinizing (external anal margin) and Non-keratinizing (deeper anal canal).",
          "• Adenocarcinoma: Develops from glandular cells near anal glands or rectum (less than 10% of cases). Resembles colorectal cancer in behavior.",
          "• Basaloid or Cloacogenic Carcinoma: Arises near the transformation zone where glandular and squamous cells meet. Considered an aggressive variant of SCC.",
          "• Melanoma of the Anus: Rare and highly aggressive, originating from pigment-producing melanocytes. May present as a dark lump or ulcer.",
          "• Small Cell Carcinoma / Neuroendocrine Tumors: Extremely rare and highly malignant, requiring systemic small-cell lung cancer chemotherapy protocols.",
        ],
      },
      {
        heading: "Location & Staging",
        content: [
          "Location: Occurs in the anal canal, the passage leading from rectum to external opening.",
          "Staging: TNM system from Stage I (localized) to Stage IV (distant metastasis). German clinical data indicate 5-year survival rates: Stage I (77–90%), Stage II (67–75%), Stage IIIA/B (51–64%), and Stage IV (5–15%).",
        ],
      },
      {
        heading: "Symptoms & Red Flags",
        content: [
          "Common signs include:",
          "1. Anal or rectal bleeding or blood in stool",
          "2. Pain, pressure, or a felt lump/mass",
          "3. Persistent itching, irritation, or abnormal discharge",
          "4. Altered bowel habits, such as stool caliber or frequency changes",
          "5. Later stages: fatigue, unexplained weight loss, or fecal incontinence",
        ],
      },
      {
        heading: "Statistics and Extent",
        content: [
          "Accounts for ~0.5% of all new cancer cases. Incidence has risen since the 1990s, particularly among women over 65 (reaching 11.4 per 100,000 in white women). Overall 5-year survival in the U.S. is approximately 68%.",
        ],
      },
      {
        heading: "Prevention of Anal Cancer",
        content: [
          "• HPV Vaccination: Protects against HPV types 16 & 18 (causing ~90% of anal cancers). Recommended for all adolescents before sexual debut, with catch-up up to age 26 (and up to age 45).",
          "• Safe Sexual Practices: Condom use during intercourse lowers transmission risk.",
          "• Smoking Cessation: Smoking damages mucosal epithelial cells and weakens immune defenses (smokers are 2–3X more likely to develop anal cancer).",
          "• Screening: Regular high-resolution anoscopy (HRA) and anal Pap smears for high-risk groups (MSM, people with HIV, transplant recipients).",
        ],
      },
      {
        heading: "Diagnosis & Clinical Workup",
        content: [
          "• Digital Rectal Exam (DRE) & Anoscopy / Proctoscopy: Lighted tube inspection of mucosal lining.",
          "• Biopsy: Gold standard for establishing histologic cancer type and grade.",
          "• Staging Imaging: MRI Pelvis (local tumor spread & sphincters), CT Abdomen/Pelvis (lymph nodes & distant organs), PET scan, and Endoanal Ultrasound.",
        ],
      },
      {
        heading: "Treatment Options",
        content: [
          "1. Combined Chemoradiation Therapy (CRT): Standard first-line therapy using 5-fluorouracil (5-FU) and Mitomycin C (or Cisplatin) with daily radiation over 5–6 weeks. Preserves sphincter control and avoids surgery.",
          "2. Surgery: Reserved for small superficial margin tumors or CRT treatment failure (salvage surgery). Includes Local Excision or Abdominoperineal Resection (APR requiring permanent colostomy).",
          "3. Immunotherapy: Checkpoint inhibitors (Nivolumab, Pembrolizumab) for advanced or metastatic disease.",
        ],
      },
    ],
    faqs: [
      { question: "Is anal cancer contagious?", answer: "No. Cancer itself is not contagious. However, the main causative agent—HPV—is sexually transmitted." },
      { question: "Can anal cancer be completely cured?", answer: "Yes, particularly when detected early. Over 80% of stage I and II cases respond well to chemoradiation with no recurrence." },
      { question: "Do I need a colostomy bag?", answer: "Not usually. Chemoradiation preserves the anus in most cases. Permanent colostomy is only required if salvage surgery is necessary." },
      { question: "How often should I get follow-up care?", answer: "Surveillance physical exams and imaging are conducted every 3–6 months for the first 2 years, then every 6–12 months up to year 5." },
    ],
    citations: [
      { name: "National Cancer Institute (NCI) - Anal Cancer", url: "https://www.cancer.gov/types/anal" },
      { name: "Mayo Clinic - Anal Cancer Symptoms & Diagnosis", url: "https://www.mayoclinic.org/diseases-conditions/anal-cancer" },
      { name: "Cleveland Clinic - Anal Cancer Overview", url: "https://my.clevelandclinic.org/health/diseases/16815-anal-cancer" },
      { name: "MedlinePlus (U.S. National Library of Medicine)", url: "https://medlineplus.gov/analcancer.html" },
      { name: "American Cancer Society (ACS)", url: "https://www.cancer.org/cancer/anal-cancer.html" },
    ],
  },
  {
    id: "bone-cancer",
    numericId: 2,
    category: "CLINICAL CARE",
    tag: "CLINICAL CARE",
    title: "Bone Cancer: Primary Types, Staging, Causes, Symptoms & Multidisciplinary Care",
    readTime: "12 min read",
    date: "Sep 24, 2026",
    desc: "Detailed breakdown of primary bone sarcomas (Chondrosarcoma, Osteosarcoma, Ewing Sarcoma), cell types, TNM staging, symptoms, and surgical treatments.",
    author: "Adrito Hazra | Researcher & Aryaka Sikdar | Proofreading Manager",
    content: [
      "Bone cancer is a malignant growth that develops in bone tissue (primary bone cancer) as opposed to occurring in bone due to spread from another organ (metastatic bone disease).",
      "Primary bone cancers represent distinct histologic types each with different expansion patterns, affected age groups, and therapeutic strategies.",
    ],
    sections: [
      {
        heading: "What is Bone Cancer?",
        content: [
          "Primary bone cancer starts in cells of the bone. Doctors use the term bone sarcoma when referring to primary bone cancers, distinguishing them from far more frequent metastatic bone lesions.",
          "Primary bone cancers occur at ~1 new case per 100,000 individuals in the United States annually (~1 to 3 cases per million worldwide).",
          "Bone cell structure: Osteoblasts (make new bone), Osteoclasts (break down extra bone framework), and Osteocytes (maintain bone structure). Marrow spaces contain blood-forming stem cells.",
        ],
      },
      {
        heading: "Types of Primary Bone Cancer",
        content: [
          "• Chondrosarcoma: Most common primary bone cancer type, developing from cartilage cells (most often in adults aged 30–60).",
          "• Osteosarcoma: Second most common, developing from bone-forming cells. Common in children, teenagers, young adults, and older adults (70s–80s).",
          "• Ewing Sarcoma: Affects children and adolescents, developing in bone or soft tissues (muscle, fat, blood vessels).",
          "• Round Cell Sarcoma: Related to Ewing sarcoma and defined by specific gene mutations.",
          "• Rarer Types: Undifferentiated pleomorphic sarcoma of bone, Fibrosarcoma, Leiomyosarcoma, Spindle cell sarcoma, and Chordoma (along spine or skull base).",
        ],
      },
      {
        heading: "Locations & TNM Staging",
        content: [
          "Common locations: Osteosarcoma (metaphysis of long bones like distal femur, proximal tibia/humerus); Ewing sarcoma (shaft of long bones, pelvis, ribs); Chondrosarcoma (pelvis, femur, humerus); Chordoma (spine or skull base).",
          "Staging (TNM & Grades G1-G3): Stage 1A/1B (localized low grade) to Stage 4A/4B (distant metastasis to lungs, liver, brain, or other bones).",
        ],
      },
      {
        heading: "Symptoms & Risk Factors",
        content: [
          "Common symptoms: Persistent bone pain (worse at night/rest), visible swelling or lump, limping/stiffness, pathological fractures from minor injury, fever, sweats, and weight loss.",
          "Risk factors: Genetic inherited syndromes like Li-Fraumeni syndrome (TP53 mutation) and retinoblastoma syndrome (RB1 mutation); prior radiation therapy to bones; Paget's disease of bone.",
        ],
      },
      {
        heading: "Diagnosis & Multidisciplinary Treatment",
        content: [
          "Diagnosis: X-rays (reveals bone destruction), MRI (tumor size & soft tissue extent), CT scan (lung metastases), PET-CT (bone spread), and Biopsy (determines tumor grade/type).",
          "Treatment: Limb-sparing surgery with reconstruction (prosthesis/bone graft), Chemotherapy (pre-op to shrink tumor & post-op), Radiotherapy, Targeted therapies (denosumab), Bisphosphonates, RFA, and palliative care.",
        ],
      },
    ],
    faqs: [
      { question: "Is bone cancer the same as bone metastasis?", answer: "No. Primary bone cancer begins in bone cells; metastases originate from cancers elsewhere in the body." },
      { question: "What are the chances of cure?", answer: "The 5-year relative survival rate for localized bone cancer is 68.2%, with lower-stage tumors having very favorable survival rates." },
      { question: "Are there screening tests?", answer: "No standard population screening exists; individuals with hereditary syndromes are monitored closely." },
      { question: "Will diet prevent bone cancer?", answer: "No dietary prevention has been scientifically proven." },
    ],
    citations: [
      { name: "National Cancer Institute (NCI) - Bone Cancer", url: "https://www.cancer.gov" },
      { name: "Mayo Clinic - Bone Sarcomas", url: "https://www.mayoclinic.org" },
      { name: "American Cancer Society (ACS)", url: "https://www.cancer.org" },
      { name: "World Health Organization (WHO)", url: "https://www.who.int" },
    ],
  },
  {
    id: "brain-cancer",
    numericId: 3,
    category: "CLINICAL CARE",
    tag: "CLINICAL CARE",
    title: "Brain Tumors and Cancer: Classifications, Symptoms, Seizure Protocols & Therapies",
    readTime: "11 min read",
    date: "Sep 24, 2026",
    desc: "A definitive guide to benign vs malignant brain tumors, location-specific neurological symptoms, seizure management, and advanced neuro-oncology treatments.",
    author: "Rajannya Das | Chief Executive Officer",
    content: [
      "Brain tumors are abnormal growths of cells that can develop in any part of the brain or skull, including its protective lining, brainstem, sinuses, and nasal cavity.",
      "In India, brain cancer accounts for ~24,820 new cases and 18,330 deaths projected for 2025. NCI data show it represents 1.2% of new cancer cases with a 5-year relative survival of 33.0%.",
    ],
    sections: [
      {
        heading: "Benign vs Malignant Brain Tumors",
        content: [
          "All brain cancers are tumors, but not all brain tumors are cancerous. Over 40 types exist:",
          "• Benign Brain Tumors: Grow slowly, rarely spread, distinct borders. Can still compress brain structures. Examples: meningioma, vestibular schwannoma, pituitary adenoma.",
          "• Malignant Brain Tumors: Cancerous, grow rapidly, invade surrounding healthy brain tissue. Examples: glioblastoma, astrocytoma, medulloblastoma.",
        ],
      },
      {
        heading: "Types & Anatomical Locations",
        content: [
          "• Gliomas: Most common primary brain tumor type (glioblastoma, astrocytoma, oligodendroglioma).",
          "• Meningiomas: Arise from meninges (brain protective linings); usually benign in adults.",
          "• Medulloblastomas: Arise in cerebellum; most common malignant tumor in children.",
          "• Metastatic Brain Tumors: 4 times more common than primary brain tumors.",
          "• Lobe-specific symptoms: Frontal lobe (reasoning/speech), Temporal lobe (memory/language), Parietal lobe (writing/spatial perception), Occipital lobe (vision loss), Cerebellum (balance/posture), Brain stem (partial paralysis/seizures).",
        ],
      },
      {
        heading: "General Symptoms & Seizure Management",
        content: [
          "Symptoms: Persistent worsening headaches (in >53% of patients), seizures, cognitive/speech difficulty, personality changes, weakness/paralysis, nausea/vomiting, vision changes, and sleep disturbances.",
          "Seizure Protocols: Focal aware, focal impaired, motor, non-motor. During seizure: stay calm, protect from injury, turn gently on side, do NOT force anything into mouth, note duration. Call emergency help if seizure >5 minutes.",
        ],
      },
      {
        heading: "Diagnosis & Neuro-Oncology Treatment",
        content: [
          "Diagnosis: Physical & neurological exam, Ophthalmoscope visual check, CT/MRI scans, PET/SPECT, brain biopsy, spinal tap (lumbar puncture), and genetic testing.",
          "Treatment: Craniotomy surgery, Focused Radiation therapy, Chemotherapy (temozolomide), Targeted therapy, Immunotherapy, and Clinical trials.",
          "Prognosis: Medulloblastoma (good prognosis), Glioblastoma (median 15 months), Brainstem glioma (poorest), Oligodendroglioma (median up to 16.7 years).",
        ],
      },
    ],
    faqs: [
      { question: "Can brain cancer come back after treatment?", answer: "Yes, recurrence is possible, requiring periodic MRI follow-up monitoring." },
      { question: "Do mobile phones cause brain tumors?", answer: "Myth: Using mobile phones, artificial sweeteners, or past head injuries are NOT proven to cause brain tumors." },
      { question: "What is a balanced diet for brain cancer patients?", answer: "Non-starchy vegetables (spinach, broccoli), healthy fats (nuts, olive oil, avocado), lean proteins (chicken, fish, tofu), and whole grains." },
    ],
    citations: [
      { name: "National Cancer Institute (NCI)", url: "https://www.cancer.gov" },
      { name: "American Brain Tumor Association (ABTA)", url: "https://www.abta.org" },
    ],
  },
  {
    id: "breast-cancer",
    numericId: 4,
    category: "CLINICAL CARE",
    tag: "CLINICAL CARE",
    title: "Breast Cancer: Global Impact, Risk Factors, Early Symptoms, Stages & Modalities",
    readTime: "11 min read",
    date: "Sep 24, 2026",
    desc: "Comprehensive overview of ductal/lobular carcinomas, global statistics, genetic risk factors (BRCA1/2), clinical staging, and multimodal therapeutic approaches.",
    author: "Soushree Chakraborty | Chief Research Officer",
    content: [
      "In 2022, approximately 2.3 million women were diagnosed with breast cancer worldwide, causing 670,000 deaths (6.9% of total cancer deaths).",
      "Breast cancer develops in milk ducts (ductal carcinoma) or lobules inside the breast.",
    ],
    sections: [
      {
        heading: "Salient Points & Global Data",
        content: [
          "Breast cancer ranked as the most common form of cancer among women in 157 out of 185 countries in 2022. Nearly half of all deaths occurred in Eastern, South-Central, and South-Eastern Asia.",
          "In India, breast cancer caused 98,337 deaths in 2022. Male breast cancer accounts for 0.5% to 1% of total cases.",
          "HDI inequalities: High HDI nations (1 in 12 women develop, 1 in 71 die); Low HDI nations (1 in 27 develop, 1 in 48 die).",
        ],
      },
      {
        heading: "Who is at Risk? (Genetic & Environmental)",
        content: [
          "Risk factors: Increasing age, obesity, sedentary lifestyle, alcohol abuse, tobacco, radiation history, early age onset of menstruation / late menopause.",
          "Hereditary genes: BRCA1, BRCA2, and PALB-2 mutations dramatically raise lifetime risk, requiring chemoprevention or surgical risk reduction.",
        ],
      },
      {
        heading: "Signs, Symptoms & Clinical Stages",
        content: [
          "Symptoms: Painless lump or thickening in breast, size/shape changes, skin dimpling/redness/pitting, nipple inversion or bloody discharge.",
          "Stages: Stage 0 (In Situ / DCIS confined to ducts); Stage I (small localized tumor); Stage II & III (larger tumor with axillary lymph node / pectoral muscle spread); Stage IV (Metastatic spread to lungs, liver, brain, bones).",
        ],
      },
      {
        heading: "Multimodal Treatments",
        content: [
          "Surgical excision (lumpectomy or mastectomy), Radiation therapy, Stereotactic radiosurgery, Chemotherapy, Targeted therapy, Hormone therapy (tamoxifen/aromatase inhibitors), Immunotherapy (for TNBC/HER2+), and CAR-T clinical trials.",
        ],
      },
    ],
    faqs: [
      { question: "What is breast cancer?", answer: "Breast cancer occurs when cells in breast tissue grow uncontrollably, forming lumps or tumors." },
      { question: "Can boys get breast cancer?", answer: "Yes. While rare, boys and men can develop breast cancer (~0.5-1% of cases) and follow identical treatment principles." },
      { question: "Should we panic if diagnosed?", answer: "No. Panicking is not productive. Early detection and modern treatment modalities yield high survival rates." },
    ],
    citations: [
      { name: "World Health Organization (WHO)", url: "https://www.who.int" },
      { name: "World Cancer Research Fund (WCRF)", url: "https://www.wcrf.org" },
      { name: "PubMed Central (PMC) / Cancer Research UK", url: "https://www.cancerresearchuk.org" },
    ],
  },
  {
    id: "burkitt-lymphoma",
    numericId: 5,
    category: "CLINICAL CARE",
    tag: "CLINICAL CARE",
    title: "Burkitt Lymphoma: Clinical Subtypes, MYC Translocation & Urgent Care Protocols",
    readTime: "10 min read",
    date: "Sep 24, 2026",
    desc: "In-depth review of endemic, sporadic, and immunodeficiency-associated Burkitt Lymphoma, rapid growth pathology, Ann Arbor staging, and high-dose chemo.",
    author: "Suditi Saha | Researcher",
    content: [
      "Burkitt lymphoma (BL) is an aggressive, very fast-growing B-cell non-Hodgkin lymphoma characterized by MYC oncogene translocation and near 100% Ki-67 proliferation index.",
    ],
    sections: [
      {
        heading: "Clinical Subtypes (WHO Grouping)",
        content: [
          "• Endemic (African) BL: Predominantly in equatorial Africa and Papua New Guinea among children (peak age 4-7). Presents as jaw/facial bone tumor; strongly linked to EBV and holoendemic malaria.",
          "• Sporadic BL: Worldwide (North America & Europe). Affects children and young adults; presents as abdominal masses (ileocecal, mesentery, ovaries, kidneys).",
          "• Immunodeficiency-Associated BL: Occurs in patients with HIV infection or post-transplant immunosuppression.",
        ],
      },
      {
        heading: "Ann Arbor Staging & Diagnostic Pathology",
        content: [
          "Tissue diagnosis reveals classic 'starry-sky' microscopic pattern. Cytogenetics showing MYC translocation confirms diagnosis.",
          "Ann Arbor Staging (Stages I-IV): Evaluates single node regions up to Stage IV marrow or CNS involvement. Diagnostic lumbar puncture is required.",
        ],
      },
      {
        heading: "Intensive Chemotherapy & TLS Prevention",
        content: [
          "Curative therapy relies on short-course multi-agent chemotherapy (cyclophosphamide, vincristine, doxorubicin, methotrexate, cytarabine) + Rituximab (anti-CD20).",
          "CNS intrathecal chemo prophylaxis is mandatory. Tumor Lysis Syndrome (TLS) prophylaxis with hydration and rasburicase/allopurinol is imperative.",
        ],
      },
    ],
    faqs: [
      { question: "What is Burkitt lymphoma?", answer: "A highly aggressive B-cell non-Hodgkin lymphoma driven by MYC translocation, curable with prompt intensive chemotherapy." },
      { question: "Does EBV cause BL?", answer: "EBV is strongly associated with endemic BL and variable sporadic cases, contributing to B-cell proliferation." },
    ],
    citations: [
      { name: "NCI / NIH Burkitt Lymphoma Overview", url: "https://dceg.cancer.gov" },
      { name: "StatPearls / NCBI Bookshelf", url: "https://www.ncbi.nlm.nih.gov" },
      { name: "Mayo Clinic & Cleveland Clinic", url: "https://www.mayoclinic.org" },
    ],
  },
  {
    id: "cardiac-tumour",
    numericId: 6,
    category: "CLINICAL CARE",
    tag: "CLINICAL CARE",
    title: "Cardiac Tumours: Primary Benign vs Malignant Heart Neoplasms, Symptoms & Resection",
    readTime: "12 min read",
    date: "Sep 24, 2026",
    desc: "Comprehensive examination of cardiac myxomas, sarcomas, metastasized heart tumors, tumor plop diagnostic signs, complex ex-situ surgical removal, and care.",
    author: "Siran Pramanick | Deputy Chief Editor & Riddhima Saha | Researcher",
    content: [
      "Cardiac tumors (heart tumors) are abnormal growths in the heart ranging from <1 cm to 15 cm. Primary tumors are rare (0.001%-0.3% autopsy); metastatic tumors are more frequent (2.3%-18.3%).",
    ],
    sections: [
      {
        heading: "Benign Primary Heart Tumors",
        content: [
          "75% to 95% of primary heart tumors are benign:",
          "• Adults: Myxoma (~50% of cases, left atrium, embolic risk), Papillary fibroelastoma (aortic/mitral valves, age >60), Lipoma, Hemangioma.",
          "• Children: Cardiac rhabdomyoma (clusters, often regresses), Teratoma, Fibroma, and Purkinje cell hamartoma.",
        ],
      },
      {
        heading: "Malignant & Metastatic Heart Tumors",
        content: [
          "5-25% of primary heart tumors are malignant (Sarcomas: Angiosarcoma right atrium, Rhabdomyosarcoma, MFH, Lymphoma).",
          "Metastatic heart tumors spread from melanoma, lung, breast, kidney, or esophageal cancers.",
        ],
      },
      {
        heading: "Symptoms & 'Tumor Plop' Sign",
        content: [
          "Diagnostic Sign: Distinctive 'tumor plop' sound heard during stethoscope auscultation as pedunculated tumor blocks mitral valve during diastole.",
          "Clinical signs: Heart failure dyspnea/edema, weight loss, fatigue, hemoptysis, arrhythmias, chest pain, embolic stroke-like symptoms, and pericardial effusion.",
        ],
      },
      {
        heading: "Surgical Resection & Care",
        content: [
          "Diagnostics: Echocardiography (TTE/TEE), Chest X-ray, Endomyocardial Biopsy, Cardiac MRI, PET scan.",
          "Surgery: Simple tumor removal (myxomas), Complex tumor removal (Fontan circulation), Ex-situ tumor removal (temporary heart removal for excision before reimplantation), Total Artificial Heart (TAH), or Heart transplantation.",
        ],
      },
    ],
    faqs: [
      { question: "Can a heart tumor go undetected?", answer: "Yes. Small or benign cardiac tumors may cause no noticeable symptoms and are discovered incidentally during imaging." },
      { question: "What is recovery time after surgery?", answer: "Recovery typically ranges from several weeks to 2-3 months." },
    ],
    citations: [
      { name: "Cleveland Clinic - Cardiac Tumors", url: "https://my.clevelandclinic.org" },
      { name: "Mayo Clinic - Heart Tumors", url: "https://www.mayoclinic.org" },
    ],
  },
  {
    id: "cervical-cancer",
    numericId: 7,
    category: "CLINICAL CARE",
    tag: "CLINICAL CARE",
    title: "Cervical Cancer: Anatomy, HPV Etiology, Screening, Staging & Combined CRT",
    readTime: "11 min read",
    date: "Sep 24, 2026",
    desc: "Detailed guide to cervical squamous cell carcinoma and adenocarcinoma, HPV DNA co-testing, colposcopy, staging, chemoradiotherapy, and primary prevention.",
    author: "Nishka Majumder | Researcher",
    content: [
      "Cervical cancer recorded 660,000 new cases and 350,000 deaths worldwide in 2022. Originates at the squamocolumnar transition zone connecting endocervix and ectocervix.",
    ],
    sections: [
      {
        heading: "Histologic Types of Cervical Cancer",
        content: [
          "• Squamous Cell Carcinoma (SCC): Accounts for up to 90% of cases, arising in exocervix transition zone.",
          "• Adenocarcinoma: Arises from mucus-producing gland cells of the endocervix.",
          "• Adenosquamous Carcinoma: Mixed tumor displaying both squamous and glandular features.",
        ],
      },
      {
        heading: "Screening & Diagnostic Workup",
        content: [
          "Screening: Pap test cytology + HPV-DNA testing (cotesting sensitivity ~94.1%). Takes 3-7 years for abnormal cells to become invasive cancer.",
          "Diagnostic Procedures: Colposcopy magnification, targeted Biopsy, LEEP or Cone biopsy.",
          "Imaging: CT, MRI, PET scan, and Sentinel Lymph Node Biopsy.",
        ],
      },
      {
        heading: "Stages & Chemoradiation Treatment",
        content: [
          "Stages: Stage 0 (Carcinoma in situ) to Stage IVB (distant organ metastasis).",
          "Treatment: Radical Hysterectomy / Trachelectomy (early stage); Concurrent Chemoradiotherapy CTRT with Cisplatin and external beam/brachytherapy (locally advanced); Immunotherapy.",
          "Prevention: HPV vaccination (strains 16 & 18), safe sex, and WHO 2030 elimination targets.",
        ],
      },
    ],
    faqs: [
      { question: "What causes cervical cancer?", answer: "Prolonged infection with high-risk HPV strains. Risk factors include smoking, weak immunity, and lack of Pap testing." },
      { question: "Can I get pregnant after treatment?", answer: "After most radical treatments (hysterectomy or pelvic radiation), pregnancy is not possible." },
    ],
    citations: [
      { name: "World Health Organization (WHO)", url: "https://www.who.int" },
      { name: "Cancer Research UK - Cervical Guidelines", url: "https://www.cancerresearchuk.org" },
    ],
  },
  {
    id: "childhood-cancer",
    numericId: 8,
    category: "CARE GIVING",
    tag: "CARE GIVING",
    title: "Childhood Cancer: Overview, Pediatric Sarcomas, Leukemias, Early Signs & Care",
    readTime: "11 min read",
    date: "Sep 24, 2026",
    desc: "Extensive resource on pediatric oncology, common childhood cancer types, warning signs, genetics, stem cell transplants, and long-term late effect monitoring.",
    author: "Siran Pramanick | Deputy Chief Editor",
    content: [
      "Childhood cancer occurs in children (ages 0-14) and teenagers (ages 15-19). ~400,000 children are diagnosed annually worldwide. >80% cured in high-income countries vs <30% in low-income regions.",
    ],
    sections: [
      {
        heading: "Types of Childhood Cancer",
        content: [
          "• Leukemias: ALL (Acute Lymphoblastic) & AML.",
          "• Lymphomas: Hodgkin & Non-Hodgkin (Burkitt).",
          "• Brain & CNS: Medulloblastoma, Glioma, DIPG, Ependymoma.",
          "• Solid Tumors: Neuroblastoma, Retinoblastoma (RB1 gene mutation), Wilms Tumor (kidney), Hepatoblastoma, Osteosarcoma, Ewing Sarcoma, Sarcomas.",
        ],
      },
      {
        heading: "Warning Signs (Symptoms)",
        content: [
          "Bone/joint pain prone to fractures, unexplained swelling/lumps, sudden weight loss, lethargy, persistent fever, leukocoria (white eye reflex/squint), and changes in speech/gait/head size.",
        ],
      },
      {
        heading: "Diagnostics & Multimodal Treatments",
        content: [
          "Blood tests, CT/MRI/PET imaging, Biopsy, Bone Marrow Biopsy & Aspiration, Lumbar puncture, and Genetic testing.",
          "Treatment: Dose-adjusted Chemotherapy, Stem Cell Transplant (allogeneic/autologous), Surgery, Immunotherapy & Targeted therapy.",
          "Late Effects: Monitoring organ function, growth, cognition, and second cancer risks.",
        ],
      },
    ],
    faqs: [
      { question: "What does the gold ribbon symbolize?", answer: "The gold ribbon symbolizes all types of cancer affecting children and adolescents." },
      { question: "Key Awareness Days?", answer: "February 15 (International Childhood Cancer Day) and September (Childhood Cancer Awareness Month)." },
    ],
    citations: [
      { name: "Cleveland Clinic - Pediatric Cancer", url: "https://my.clevelandclinic.org" },
      { name: "WHO - Cancer in Children", url: "https://www.who.int" },
      { name: "American Cancer Society (ACS)", url: "https://www.cancer.org" },
    ],
  },
  {
    id: "colon-cancer",
    numericId: 9,
    category: "CLINICAL CARE",
    tag: "CLINICAL CARE",
    title: "Colon and Colorectal Cancer: Polyp Genesis, TNM Staging, Risk Factors & Surgeries",
    readTime: "12 min read",
    date: "Sep 25, 2026",
    desc: "Comprehensive analysis of colorectal adenocarcinoma, mucinous subtypes, screening colonoscopy, numeric/TNM staging, colectomy procedures, and diet.",
    author: "Adrija Majumder | Researcher",
    content: [
      "Colorectal cancer (CRC) starts as non-cancerous polyps inside the colon or rectum. Second leading cause of cancer deaths worldwide (1.9M cases, 930k deaths in 2020).",
    ],
    sections: [
      {
        heading: "Types of Colon Cancer",
        content: [
          "• Adenocarcinoma: >90% of cases. Subtypes: Mucinous Adenocarcinoma (~55% mucin, spreads rapidly) and Signet Cell Carcinoma (rare & aggressive).",
          "• Other Types: GI carcinoid tumors, Lymphoma, GIST (<7000 cases/yr), Sarcoma, Melanoma metastasis, Leiomyosarcoma.",
        ],
      },
      {
        heading: "Symptoms & Red Flags",
        content: [
          "Abdominal pain, bloody/black stool, bowel habit changes (constipation/diarrhea), narrow stool, excessive gas, fatigue/anemia, unexplained weight loss, and feeling of incomplete evacuation.",
        ],
      },
      {
        heading: "Numeric & TNM Staging",
        content: [
          "Numeric: Stage 0 CIS to Stage 4C (distant metastasis).",
          "TNM System: T0-T4b (depth through mucosal/muscle/serosal layers), N0-N2b (lymph node counts), M0-M1c (peritoneal & organ spread).",
        ],
      },
      {
        heading: "Diagnostics & Surgical Interventions",
        content: [
          "Diagnostics: Stool FOBT / FIT (90% detection), Stool DNA test, Colonoscopy with polypectomy, Biopsy, CT scans.",
          "Treatment: Colectomy surgery, Lymph node dissection, Chemotherapy, Laparoscopy, HIPEC (cytoreductive surgery + hyperthermic chemo), HAIP (hepatic artery pump for liver metastasis), Polypectomy, Radiotherapy, Targeted therapy, and Palliative care.",
        ],
      },
    ],
    faqs: [
      { question: "What should I eat to prevent colon cancer?", answer: "Eat a high-fiber diet with soluble/insoluble fibers (oats, brown rice, legumes, vegetables), probiotics, limit red/processed meat, alcohol, and caffeine." },
      { question: "Hemorrhoids vs Colon Cancer?", answer: "Hemorrhoids are swollen veins around anus causing minor bleeding; colon cancer is a serious invasive tumor starting from polyps requiring colonoscopy." },
    ],
    citations: [
      { name: "GLOBOCAN / WHO Colorectal Statistics", url: "https://www.who.int" },
      { name: "American Cancer Society (ACS)", url: "https://www.cancer.org" },
    ],
  },
  {
    id: "craniopharyngioma",
    numericId: 10,
    category: "CLINICAL CARE",
    tag: "CLINICAL CARE",
    title: "Craniopharyngioma: Subtypes, Sellar-Suprasellar Impact, Surgery & Endocrine Care",
    readTime: "12 min read",
    date: "Sep 25, 2026",
    desc: "Clinical breakdown of adamantinomatous (ACP) and papillary (PCP) craniopharyngiomas, visual field loss, endoscopic transsphenoidal surgery, and hormone replacement.",
    author: "Siran Pramanick | Deputy Chief Editor",
    content: [
      "Craniopharyngioma is a rare, benign brain tumor arising from embryonic pituitary rest cells near Rathke's pouch. Accounts for 2-5% of primary brain tumors (bimodal age 5-14 & 50-74).",
    ],
    sections: [
      {
        heading: "Tumor Subtypes (ACP vs PCP)",
        content: [
          "1. Adamantinomatous Craniopharyngioma (ACP): Predominantly affects children; cystic with solid areas; calcifications present in ~90% of cases.",
          "2. Papillary Craniopharyngioma (PCP): Found almost exclusively in adults; solid composition; rare calcification; almost all contain BRAF gene mutations.",
          "3. Mixed / Transitional Subtype.",
        ],
      },
      {
        heading: "Location & Clinical Impact",
        content: [
          "Suprasellar Region (95% of cases): Compresses optic chiasm (bitemporal hemianopsia vision loss in 62-84%), hypothalamus, and pituitary stalk (causing polydipsia, polyuria, cortisol/thyroid/growth hormone deficits, and hydrocephalus ICP).",
        ],
      },
      {
        heading: "Diagnostics, Surgery & Hormone Therapy",
        content: [
          "Diagnostics: MRI (gold standard for tumor size & cystic component), CT scans (detects calcifications), Visual Field Testing (perimetry), and Endocrine blood panels.",
          "Surgery: Endoscopic Endonasal Transsphenoidal (EET) or Transcranial approaches guided by Puget & Kassam classification systems.",
          "Therapies: Stereotactic radiosurgery, Brachytherapy, Intracystic chemo, BRAF-targeted therapy for PCP, and lifelong post-op hormone replacement (hydrocortisone, levothyroxine).",
        ],
      },
    ],
    faqs: [
      { question: "Is craniopharyngioma hereditary?", answer: "No. Craniopharyngiomas are not known to be hereditary and genetic testing is not indicated for asymptomatic family members." },
      { question: "Can craniopharyngiomas recur?", answer: "Yes, especially if subtotal resection was performed. Recurrences are most common within 3 years." },
    ],
    citations: [
      { name: "Journal of Neurosurgery - Craniopharyngioma", url: "https://thejns.org" },
      { name: "NIH / NCI Neuro-Oncology", url: "https://www.cancer.gov" },
    ],
  },
  {
    id: "ependymoma",
    numericId: 11,
    category: "CLINICAL CARE",
    tag: "CLINICAL CARE",
    title: "Ependymoma: Central Nervous System Grades, Symptoms, Diagnostics & Radiosurgery",
    readTime: "11 min read",
    date: "Sep 25, 2026",
    desc: "Complete guide to WHO Grade I-III ependymomas in posterior fossa and spinal cord, neurological symptoms, surgical resection, and targeted radiation.",
    author: "Siran Pramanick | Deputy Chief Editor",
    content: [
      "Ependymoma is a rare tumor arising from ependymal cells lining the CSF-filled ventricles in the brain and central canal of the spinal cord (9% of pediatric CNS tumors).",
    ],
    sections: [
      {
        heading: "WHO Grades & Histologic Classification",
        content: [
          "• Subependymoma (Grade 1): Slow-growing, ventricles, adults.",
          "• Classic Ependymoma (Grade 2): Both children & adults.",
          "• Myxopapillary Ependymoma (Grade 2): Lower spinal cord, adult men.",
          "• Anaplastic Ependymoma (Grade 3): Fast-growing, aggressive, brain base.",
        ],
      },
      {
        heading: "Locations & Symptoms",
        content: [
          "Location: Posterior fossa (54.4% in children), Supratentorial (32.5%), Spinal cord (64.1% in adults).",
          "Brain symptoms: Blurry vision, confusion, headaches, irritability, nausea, seizures, vomiting.",
          "Spinal cord symptoms: Back/neck pain, leg weakness, numbness, bowel/bladder changes.",
        ],
      },
      {
        heading: "Diagnosis & Multimodal Treatment",
        content: [
          "Diagnostics: Neurological exam, Contrast MRI, Lumbar puncture CSF testing, Biopsy, CT scan.",
          "Treatment: Surgical resection (maximal safe removal), Radiation therapy, Radiosurgery, Chemotherapy (recurrent cases), Targeted therapy, and Clinical trials.",
        ],
      },
    ],
    faqs: [
      { question: "Is ependymoma cancer?", answer: "Grade I and II ependymomas are low-grade tumors; Grade III anaplastic ependymomas are malignant fast-growing cancers." },
      { question: "What happens if there is a recurrence?", answer: "Requires re-operation, radiation/chemotherapy, or clinical trial participation." },
    ],
    citations: [
      { name: "Mayo Clinic - Ependymoma Overview", url: "https://www.mayoclinic.org" },
      { name: "Cancer Therapy Advisor", url: "https://www.cancertherapyadvisor.com" },
      { name: "National Cancer Institute (NCI)", url: "https://www.cancer.gov" },
    ],
  },
  {
    id: "esophageal-cancer",
    numericId: 12,
    category: "CLINICAL CARE",
    tag: "CLINICAL CARE",
    title: "Esophageal Cancer: Adenocarcinoma vs SCC, Risk Factors, EUS Staging & Treatments",
    readTime: "11 min read",
    date: "Sep 25, 2026",
    desc: "Thorough guide to esophageal carcinoma, GERD and Barrett's esophagus links, upper endoscopy diagnostics, esophagectomy, and chemoradiation.",
    author: "Nishka Majumder | Researcher",
    content: [
      "Esophageal cancer caused >0.6 million new cases and 0.54 million deaths globally in 2020 (11th most common cancer worldwide).",
    ],
    sections: [
      {
        heading: "Types of Esophageal Cancer",
        content: [
          "• Adenocarcinoma: Most common in US. Arises in lower esophagus glandular cells; linked to GERD acid reflux & Barrett's esophagus.",
          "• Squamous Cell Carcinoma (SCC): Most common in India & globally. Arises in upper/middle esophagus squamous cells; linked to tobacco, alcohol, and hot liquids.",
        ],
      },
      {
        heading: "Risk Factors & Red Flags",
        content: [
          "Risk factors: Age >55, Male (3X risk), hot beverage habit, GERD, Barrett's esophagus, low fruit/veg diet, obesity, chest radiation, dry cleaning solvent exposure, achalasia, tylosis.",
          "Symptoms: Persistent cough/hoarseness, dysphagia (difficult swallowing), indigestion/heartburn, chest burning, unexplained weight loss, food regurgitation.",
        ],
      },
      {
        heading: "Diagnostics & Surgical Staging",
        content: [
          "Diagnostics: Upper endoscopy (EGD), Endoscopic Ultrasound (EUS), Biopsy, CT scan, Barium swallow X-ray study, Bronchoscopy, PET scan.",
          "Treatment: Surgery (Esophagectomy, EMR/ESD endoscopic resection), Chemotherapy (neoadjuvant/adjuvant), Radiation therapy (External beam/IORT), Targeted TKIs, and Immunotherapy checkpoint inhibitors.",
        ],
      },
    ],
    faqs: [
      { question: "Can esophageal cancer be cured?", answer: "Early-stage localized tumors treated with surgery and chemoradiation achieve favorable long-term survival." },
      { question: "How to reduce risk?", answer: "Avoid tobacco/alcohol, treat GERD acid reflux, maintain healthy weight, and let hot drinks cool before consuming." },
    ],
    citations: [
      { name: "MD Anderson Cancer Center", url: "https://www.mdanderson.org" },
      { name: "Mayo Clinic - Esophageal Cancer", url: "https://www.mayoclinic.org" },
    ],
  },
  {
    id: "ewing-sarcoma",
    numericId: 13,
    category: "CLINICAL CARE",
    tag: "CLINICAL CARE",
    title: "Ewing Sarcoma: Translocation Genetics, Bone & Soft Tissue Staging, Chemo & Care",
    readTime: "11 min read",
    date: "Sep 25, 2026",
    desc: "Exhaustive review of Ewing Sarcoma Family of Tumors (ESFT), EWSR1-FLI1 fusion, onion-skin X-ray signs, VDC-IE chemotherapy regimens, and limb-sparing surgery.",
    author: "Jiya Haldar | Chief Editor",
    content: [
      "Ewing Sarcoma is a rare, aggressive malignant tumor originating in bone or soft tissues (ESFT family: Classic bone, Extraosseous, pPNET, Askin tumor).",
    ],
    sections: [
      {
        heading: "Genetic Translocations & Causes",
        content: [
          "Genetic driver: In 85% of cases, chromosomal translocation t(11;22)(q24;q12) creates the EWSR1-FLI1 fusion gene.",
          "Affects children and adolescents (ages 5-25, peak 10-20 yrs). More prevalent in males and European descent.",
        ],
      },
      {
        heading: "Symptoms & Anatomical Sites",
        content: [
          "Sites: Pelvis (most frequent), femur, tibia, ribs (Askin tumor), humerus, spine.",
          "Symptoms: Persistent progressive bone pain, swelling/lump, warmth, fractures, fever, fatigue, weight loss, anemia, night sweats.",
        ],
      },
      {
        heading: "Diagnostics, VDC-IE Chemo & Surgery",
        content: [
          "Diagnostics: X-ray ('onion skin' periosteal reaction), MRI, CT, Bone scan, PET-CT, Biopsy (small round blue cells, CD99+), FISH / RT-PCR genetic testing.",
          "Treatment: Alternating VDC-IE Chemotherapy (Vincristine, Doxorubicin, Cyclophosphamide / Ifosfamide, Etoposide), Wide surgical excision (limb-sparing), Radiotherapy, High-Dose Chemo with Stem Cell Rescue.",
          "Prognosis: 70-80% 5-yr survival for localized disease.",
        ],
      },
    ],
    faqs: [
      { question: "Can Ewing Sarcoma spread to lungs?", answer: "Yes — the lungs are the most common site for distant metastasis in Ewing Sarcoma." },
      { question: "Is Ewing Sarcoma curable?", answer: "Yes, if localized and treated promptly with multimodal chemotherapy and surgery." },
    ],
    citations: [
      { name: "National Cancer Institute (NCI) - Ewing Sarcoma", url: "https://www.cancer.gov" },
      { name: "American Cancer Society (ACS)", url: "https://www.cancer.org" },
    ],
  },
  {
    id: "eye-cancer",
    numericId: 14,
    category: "CLINICAL CARE",
    tag: "CLINICAL CARE",
    title: "Eye Cancer & Ocular Oncology: Melanoma, Retinoblastoma, Diagnostics & Surgeries",
    readTime: "11 min read",
    date: "Sep 25, 2026",
    desc: "Detailed study of intraocular melanoma, retinoblastoma, ultrasound biomicroscopy, vision preservation, thermotherapy, and enucleation protocols.",
    author: "Hrilekha Sengupta | Proofreader",
    content: [
      "Eye cancer (ocular oncology) encompasses primary malignancies in the eyeball, lacrimal glands, or eyelids, as well as secondary metastases. India hosts ~30% of global cases.",
    ],
    sections: [
      {
        heading: "Subtypes of Eye Cancer",
        content: [
          "• Ocular Melanoma: Uveal melanoma (iris, ciliary body, choroid), Eyelid melanoma, Conjunctival melanoma.",
          "• Retinoblastoma: Malignant retinal tumor observed primarily in young children (ages 2-3).",
          "• Carcinomas: Basal Cell Carcinoma (BCC eyelid) and Squamous Cell Carcinoma (SCC).",
        ],
      },
      {
        heading: "Symptoms & Diagnostic Modalities",
        content: [
          "Symptoms: Dark iris spots, blurred/double vision, floaters, light flashes, blind spot, eyelid lump, eye bulging (proptosis), redness, and pain.",
          "Diagnostics: Dilated Eye exam, Retinal Imaging, UBM ultrasound biomicroscopy, MRI, CT, Angiography dye, Family history, Biopsy.",
        ],
      },
      {
        heading: "Therapies & Enucleation",
        content: [
          "Treatment: Radiation therapy plaque, Laser thermotherapy, Chemotherapy, Surgery (Local resection or Enucleation eyeball removal with prosthetic fitting), Cryotherapy, Immunotherapy (Tebentafusp).",
        ],
      },
    ],
    faqs: [
      { question: "Is eyeball removal unavoidable?", answer: "No. Radiation plaque therapy and laser thermotherapy preserve vision in many early-stage ocular melanomas." },
      { question: "Can dark-skinned people get eye cancer?", answer: "Yes, though less common, ocular melanomas can develop in non-sun-exposed areas regardless of skin tone." },
    ],
    citations: [
      { name: "Ocular Oncology Research / Mayo Clinic", url: "https://www.mayoclinic.org" },
      { name: "National Eye Institute (NEI)", url: "https://www.nei.nih.gov" },
    ],
  },
  {
    id: "gall-bladder-cancer",
    numericId: 15,
    category: "CLINICAL CARE",
    tag: "CLINICAL CARE",
    title: "Gallbladder Cancer: Carcinoma Types, Jaundice Symptoms, ERCP Staging & Palliative Care",
    readTime: "12 min read",
    date: "Sep 25, 2026",
    desc: "Comprehensive guide to gallbladder adenocarcinoma, gallstone risk links, biliary stent/catheter palliative management, cholecystectomy, and diet.",
    author: "Adrija Majumder | Researcher",
    content: [
      "Gallbladder cancer is a rare, hard-to-detect GI malignancy arising in the gallbladder mucosal lining (22nd most common cancer worldwide).",
    ],
    sections: [
      {
        heading: "Histologic Types of Gallbladder Cancer",
        content: [
          "• Adenocarcinoma (~90%): Non-papillary, Papillary (better prognosis), Mucinous Adenocarcinoma.",
          "• Other Types: Squamous cell, Adenosquamous, Sarcoma, Lymphoma, Small cell neuroendocrine.",
        ],
      },
      {
        heading: "Symptoms & Diagnostic Procedures",
        content: [
          "Symptoms: Upper right belly pain/bloating, palpable lesion, weight loss, post-meal pain, vomiting, Jaundice (yellow skin/eyes), itchy skin, dark urine, pale lumpy stools.",
          "Diagnostics: Liver blood tests, CT/MRI, Laparoscopy, Ultrasound guided needle biopsy, MRCP bile duct scan, MRA blood vessels, ERCP endoscopic contrast.",
        ],
      },
      {
        heading: "Surgical Resection & Palliative Care",
        content: [
          "Surgery: Cholecystectomy (gallbladder removal) or Radical resection (removing gallbladder + liver wedge & bile duct).",
          "Palliative Management: Biliary Stent / Biliary Catheter / Biliary Bypass to relieve jaundice obstruction.",
          "Prevention: Weight control, alcohol & tobacco avoidance, healthy diet.",
        ],
      },
    ],
    faqs: [
      { question: "What is survival rate for gallbladder cancer?", answer: "Localized gallbladder cancer has a 65% 5-year survival rate, dropping to 2% for distant metastasized cases." },
      { question: "Do only women get gallbladder cancer?", answer: "No, but risk is higher in women (71% of cases)." },
    ],
    citations: [
      { name: "Johns Hopkins Medicine - Gallbladder Cancer", url: "https://www.hopkinsmedicine.org" },
      { name: "Cleveland Clinic GI Oncology", url: "https://my.clevelandclinic.org" },
    ],
  },
  {
    id: "germ-cell-tumor",
    numericId: 16,
    category: "CLINICAL CARE",
    tag: "CLINICAL CARE",
    title: "Germ Cell Tumors: Gonadal vs Extragonadal, Seminomas, Biomarkers & Treatments",
    readTime: "11 min read",
    date: "Sep 25, 2026",
    desc: "Detailed breakdown of teratomas, yolk sac tumors, seminomas vs non-seminomas, serum tumor markers, surgical staging, and platinum chemotherapy.",
    author: "Siran Pramanick | Deputy Chief Editor",
    content: [
      "Germ cell tumors (GCTs) develop from reproductive germ cells in testicles and ovaries (or extragonadal belly, brain, chest). Most common solid tumor in males 15-40.",
    ],
    sections: [
      {
        heading: "Classifications & Subtypes",
        content: [
          "• Teratomas: Mature dermoid cysts (benign) or Immature (malignant).",
          "• Yolk Sac Tumors: Malignant, common in children.",
          "• Germinomas: Dysgerminoma (ovaries) & Seminoma (testicles).",
          "• Other Subtypes: Embryonal cell carcinoma, Polyembryomas, Choriocarcinoma (placental origin), Mixed GCTs.",
          "• Seminomas (slow-growing) vs Non-seminomas (fast-growing).",
        ],
      },
      {
        heading: "Symptoms & Diagnostic Markers",
        content: [
          "Symptoms: Palpable lump, body pain, testicle deformity, abdominal swelling, constipation, cough, headache.",
          "Diagnostics: Scrotal/pelvic ultrasound, CT, MRI, Blood tumor markers (AFP, Beta-hCG, LDH), Surgical biopsy.",
          "Treatment: Surgical orchiectomy/resection, Cisplatin chemotherapy, Radiation therapy.",
        ],
      },
    ],
    faqs: [
      { question: "Are germ cell tumors inherited?", answer: "No. They do not seem to be inherited, though cryptorchidism (undescended testicles) raises risk." },
      { question: "What are metastases?", answer: "Metastases occur when the tumor spreads from gonads to liver, lungs, or distant lymph nodes." },
    ],
    citations: [
      { name: "Mayo Clinic - Germ Cell Tumors", url: "https://www.mayoclinic.org" },
      { name: "ScienceDirect / Cancer Research UK", url: "https://www.cancerresearchuk.org" },
    ],
  },
  {
    id: "gynecologic-cancer",
    numericId: 17,
    category: "CLINICAL CARE",
    tag: "CLINICAL CARE",
    title: "Gynecologic Cancers: Ovarian, Endometrial, Vaginal, Cervical & Vulvar Care Pathways",
    readTime: "12 min read",
    date: "Sep 25, 2026",
    desc: "Comprehensive guide covering all 5 female reproductive system malignancies, screening protocols, CA-125 markers, surgical cytoreduction, and liquid biopsies.",
    author: "Siran Pramanick | Deputy Chief Editor",
    content: [
      "Gynecologic cancers affect the female reproductive system: Ovarian, Endometrial (Uterine), Vaginal, Cervical, and Vulvar cancers (1.47 million cases in 2022).",
    ],
    sections: [
      {
        heading: "The 5 Gynecologic Cancer Types",
        content: [
          "1. Ovarian / Primary Peritoneal: 7th most common; includes Epithelial, Fallopian tube, PPC, Germ cell, Sex cord stromal.",
          "2. Endometrial (Uterine): Most common (~60,000 cases/yr); presents with postmenopausal bleeding.",
          "3. Vaginal Cancer: Rare (ages 50-70).",
          "4. Cervical Cancer: Almost always caused by persistent HPV.",
          "5. Vulvar Cancer: External genitalia; linked to Lichen Sclerosus & HPV.",
        ],
      },
      {
        heading: "Symptoms & Diagnostic Screening",
        content: [
          "Symptoms: Abnormal vaginal bleeding/discharge, pelvic pain, dysuria, bloating, early satiety.",
          "Diagnostics: Pap test, HPV-DNA test (94.1% sensitivity), Transvaginal ultrasound (5mm cutoff for endometrial thickness), CA-125 blood marker, Endometrial sampling, Liquid biopsies, AI diagnostics.",
          "Treatment: Hysterectomy / Oophorectomy surgery, Radiation, Chemotherapy, Hormone therapy, Targeted PARP inhibitors, Immunotherapy.",
        ],
      },
    ],
    faqs: [
      { question: "Why see a gynecologic oncologist?", answer: "Gynecologic oncologists specialize in surgical cytoreduction and complex pelvic cancer management for superior outcomes." },
      { question: "Who needs genetic testing?", answer: "Women with family history of breast/ovarian cancer (BRCA1/2) or endometrial/colon cancer (Lynch Syndrome)." },
    ],
    citations: [
      { name: "Society of Gynecologic Oncology (SGO)", url: "https://www.sgo.org" },
      { name: "National Cancer Institute (NCI)", url: "https://www.cancer.gov" },
    ],
  },
  {
    id: "kidney-cancer",
    numericId: 18,
    category: "CLINICAL CARE",
    tag: "CLINICAL CARE",
    title: "Kidney Cancer: Renal Cell Carcinoma Subtypes, TNM Staging, Nephrectomy & Ablation",
    readTime: "10 min read",
    date: "Sep 25, 2026",
    desc: "Exhaustive guide to clear cell and papillary RCC, collecting duct carcinomas, partial/radical nephrectomy, cryoablation, and targeted therapies.",
    author: "Ekoparnika Mukherjee | Researcher",
    content: [
      "Kidney cancer is the 12th most common cancer worldwide (>400,000 cases annually). Renal Cell Carcinoma (RCC) accounts for ~85% of malignant kidney tumors.",
    ],
    sections: [
      {
        heading: "Types of Kidney Cancer",
        content: [
          "• Clear Cell RCC: ~75% of cases.",
          "• Papillary RCC: 10-15% (Chromophobe 5%, Clear Cell Papillary 2-4%).",
          "• Aggressive Types: Collecting Duct Carcinoma (1%), Medullary Cancer (1% sickle cell trait link), Urothelial Carcinoma of renal pelvis, Wilms Tumor (pediatric ages 2-5), Renal Sarcoma (<1%).",
        ],
      },
      {
        heading: "Symptoms & Risk Factors",
        content: [
          "Symptoms: Hematuria (pink/red blood in urine), loss of appetite, persistent flank/back pain, tiredness, weight loss.",
          "Risk factors: Older age, tobacco smoking, obesity, hypertension, VHL disease, Birt-Hogg-Dube, Tuberous sclerosis, family history.",
        ],
      },
      {
        heading: "TNM Staging & Treatments",
        content: [
          "Staging: Stage I (<7 cm in kidney) to Stage IVB (distant organ metastasis).",
          "Treatment: Radical Nephrectomy, Partial Nephrectomy (kidney-sparing), Cryoablation (freezing), Radiofrequency Ablation (RFA heating), Radiation, Targeted TKIs.",
        ],
      },
    ],
    faqs: [
      { question: "Is chemotherapy effective for kidney cancer?", answer: "Generally no. RCC is resistant to standard chemo; targeted TKIs and immunotherapies are first-line." },
      { question: "Can a person live with one kidney?", answer: "Yes. Following a nephrectomy, the remaining single kidney adapts to filter blood effectively for life." },
    ],
    citations: [
      { name: "GLOBOCAN / WHO Kidney Data", url: "https://www.who.int" },
      { name: "National Cancer Institute (NCI)", url: "https://www.cancer.gov" },
    ],
  },
  {
    id: "liver-cancer",
    numericId: 19,
    category: "CLINICAL CARE",
    tag: "CLINICAL CARE",
    title: "Liver Cancer: Hepatocellular Carcinoma, BCLC Staging, Resection, Ablation & TACE",
    readTime: "11 min read",
    date: "Sep 25, 2026",
    desc: "Detailed breakdown of primary liver cancer, cirrhosis and hepatitis B/C etiology, BCLC and TNM staging, radiofrequency ablation, TACE, and systemic therapy.",
    author: "Soushree Chakraborty | Chief Research Officer",
    content: [
      "Liver cancer caused 866,136 new cases in 2022 (10th most common cancer). Hepatocellular Carcinoma (HCC) is the major adult primary liver cancer.",
    ],
    sections: [
      {
        heading: "Functions & Causes",
        content: [
          "Liver functions: Bile production, glycogen energy storage, blood filtration.",
          "Major risk factors: Hepatitis B or C viruses, Cirrhosis scarring, heavy alcohol, NAFLD fatty liver disease.",
        ],
      },
      {
        heading: "Symptoms & Red Flags",
        content: [
          "Hard lump right upper abdomen, right shoulder pain, ascites abdominal swelling, Jaundice (yellow eyes/skin), easy bruising, fatigue, nausea, weight loss, clay-colored stools, dark urine, fever.",
        ],
      },
      {
        heading: "BCLC Staging & Advanced Treatments",
        content: [
          "BCLC Staging: Stage 0 (Very Early) to Stage D (Terminal).",
          "Treatment: Surgical Resection, Liver Transplant, RFA / MWA Thermal Ablation, TACE Chemoembolization, Radioembolization microspheres, Targeted sorafenib/lenvatinib, Immunotherapy atezolizumab/nivolumab, SBRT radiation.",
        ],
      },
    ],
    faqs: [
      { question: "Can liver cancer be cured?", answer: "If diagnosed early (BCLC Stage 0/A), surgical resection or liver transplantation offers potential cure." },
      { question: "How to prevent liver cancer?", answer: "Get vaccinated against Hepatitis B, prevent Hepatitis C, avoid heavy alcohol, and maintain a healthy weight." },
    ],
    citations: [
      { name: "World Cancer Research Fund (WCRF)", url: "https://www.wcrf.org" },
      { name: "AASLD / WHO Liver Guidelines", url: "https://www.aasld.org" },
    ],
  },
  {
    id: "lung-cancer",
    numericId: 20,
    category: "CLINICAL CARE",
    tag: "CLINICAL CARE",
    title: "Lung Cancer: NSCLC & SCLC Histologies, Detailed Staging, Prevention & Therapies",
    readTime: "14 min read",
    date: "Sep 25, 2026",
    desc: "Definitive clinical guide to non-small cell and small cell lung carcinoma, detailed stage IA-IVB groupings, bronchoscopy diagnostics, SBRT, and targeted therapies.",
    author: "Rajannya Das | Chief Executive Officer",
    content: [
      "Lung cancer is the most often diagnosed and deadly cancer in the world (2.2M cases, 1.8M deaths in 2020).",
    ],
    sections: [
      {
        heading: "Histologic Classifications",
        content: [
          "• NSCLC (85% of cases): Adenocarcinoma (alveoli mucus cells), Squamous Cell Carcinoma (epidermoid bronchial lining), Adenosquamous, Sarcomatoid.",
          "• SCLC (15% of cases): Small cell carcinoma (oat cell) and combined small cell carcinoma; fast-growing, strongly linked to tobacco.",
        ],
      },
      {
        heading: "Detailed Stage Groupings (Stage 0 to IVB)",
        content: [
          "• Stage 0: Carcinoma in situ (TisN0M0).",
          "• Stage IA1-IA3 & IB: Tumors 1-4 cm without nodal spread.",
          "• Stage IIA-IIB: Tumors 4-7 cm or ipsilateral hilar nodes (N1).",
          "• Stage IIIA-IIIC: Mediastinal nodes (N2/N3) or chest wall/diaphragm invasion.",
          "• Stage IVA-IVB: Malignant pleural effusion or distant metastasis to brain, bones, liver.",
        ],
      },
      {
        heading: "Symptoms & Advanced Therapies",
        content: [
          "Symptoms: Chronic worsening cough, hemoptysis (coughing blood), dyspnea, wheezing, hoarseness, pleural effusion.",
          "Treatment: Surgical Lobectomy, SBRT radiation, Chemotherapy, Targeted therapy (EGFR/ALK), Immunotherapy (pembrolizumab).",
          "Prevention: No smoking, avoid secondhand smoke, test home for radon, wear workplace protection masks.",
        ],
      },
    ],
    faqs: [
      { question: "Can someone survive lung cancer?", answer: "Yes. Early identification and surgical treatment result in 5-year survival rates as high as 80-90%." },
      { question: "Does vaping cause lung cancer?", answer: "Vaping inhales toxic compounds that cause severe lung damage and potential oncogenic risks." },
    ],
    citations: [
      { name: "National Cancer Institute (NCI) - Lung Cancer", url: "https://www.cancer.gov" },
      { name: "American Lung Association", url: "https://www.lung.org" },
    ],
  },
  {
    id: "melanoma",
    numericId: 21,
    category: "CLINICAL CARE",
    tag: "CLINICAL CARE",
    title: "Melanoma: Cutaneous & Mucosal Subtypes, Acral Lesions, SLNB Staging & Immunotherapy",
    readTime: "10 min read",
    date: "Sep 25, 2026",
    desc: "Comprehensive review of aggressive skin melanoma, acral lentiginous variants common in India, Breslow depth biopsy, sentinel lymph node biopsy, and checkpoint inhibitors.",
    author: "Aryaka Sikdar | Proofreading Manager",
    content: [
      "Melanoma is an aggressive skin tumor originating in melanocytes. In India, 70-80% of cases are Acral Lentiginous Melanoma (soles, palms, nails) and Mucosal Melanoma.",
    ],
    sections: [
      {
        heading: "Types of Melanoma",
        content: [
          "• Acral Lentiginous Melanoma: Soles of feet, palms, under nails.",
          "• Superficial Spreading Melanoma: Sun-exposed skin.",
          "• Nodular Melanoma: Aggressive nodule anywhere on body.",
          "• Lentigo Maligna Melanoma: Sun-damaged face/scalp in elderly.",
          "• Mucosal Melanoma: Oral cavity & genital tract.",
        ],
      },
      {
        heading: "Symptoms & ABCDE Rule",
        content: [
          "Dark irregular lesion changing in size/color/shape, bleeding/itching, sole/palm lesions, lymph node swelling.",
          "ABCDE Rule: Asymmetry, Border, Color, Diameter >6mm, Evolving.",
          "Diagnostics: Excisional Biopsy (Breslow depth), Sentinel Lymph Node Biopsy (SLNB), CT/MRI/PET-CT.",
          "Treatment: Surgical excision, Lymph node dissection, Immunotherapy (pembrolizumab, nivolumab), Targeted BRAF/NRAS, Radiotherapy, Chemotherapy.",
        ],
      },
    ],
    faqs: [
      { question: "Can dark-skinned people get melanoma?", answer: "Yes. Melanoma in dark-skinned individuals occurs primarily on non-sun-exposed soles, palms, and nail beds." },
      { question: "Is melanoma curable?", answer: "Yes. Localized melanoma treated with wide surgical excision has very high survival rates." },
    ],
    citations: [
      { name: "AIIMS Delhi & Tata Memorial Melanoma Data", url: "https://www.tmc.gov.in" },
      { name: "Melanoma Research Foundation", url: "https://www.melanoma.org" },
    ],
  },
  {
    id: "merkel-cell-carcinoma",
    numericId: 22,
    category: "CLINICAL CARE",
    tag: "CLINICAL CARE",
    title: "Merkel Cell Carcinoma: MCPyV Etiology, AEIOU Signs, SLNB & Immunotherapy",
    readTime: "11 min read",
    date: "Sep 25, 2026",
    desc: "Detailed guide to highly aggressive neuroendocrine skin cancer, Merkel cell polyomavirus link, AEIOU clinical mnemonic, wide local excision, and Avelumab/Pembrolizumab.",
    author: "Jiya Haldar | Chief Editor",
    content: [
      "Merkel Cell Carcinoma (MCC) is a rare, highly aggressive neuroendocrine skin cancer originating in epidermal Merkel touch cells.",
    ],
    sections: [
      {
        heading: "Causes & Risk Factors",
        content: [
          "• Merkel Cell Polyomavirus (MCPyV): Integrated into tumor cell DNA in 80% of cases.",
          "• UV Radiation: Chronic exposure on sun-exposed face, neck, arms.",
          "• Risk factors: Age >50 (median 74), immunosuppression (HIV, transplant, leukemia), fair skin, male.",
        ],
      },
      {
        heading: "AEIOU Mnemonic & Symptoms",
        content: [
          "Pink/red/purple painless nodule expanding rapidly over weeks.",
          "AEIOU Mnemonic: Asymptomatic, Expanding rapidly, Immune suppressed, Older than 50, UV-exposed fair skin site.",
        ],
      },
      {
        heading: "Diagnostics, SLNB & Immunotherapy",
        content: [
          "Diagnostics: Skin biopsy showing small round blue cells, IHC positive for Cytokeratin-20 (CK20 perinuclear dot pattern 90%), Synaptophysin, SLNB, CT/MRI/PET-CT.",
          "Treatment: Wide Local Excision WLE (1-2 cm margins), SLNB, Adjuvant Radiation, Lymph node dissection, Immunotherapy (Avelumab, Pembrolizumab), Chemotherapy (Cisplatin/Carboplatin + Etoposide).",
          "Prognosis: 5-yr survival Stage I 75%, Stage II 60%, Stage III 40%, Stage IV 20-24%.",
        ],
      },
    ],
    faqs: [
      { question: "Is Merkel Cell Carcinoma curable?", answer: "Early-stage MCC can be cured with surgery and radiation. Advanced cases respond well to anti-PD-1/PD-L1 immunotherapies." },
      { question: "How quickly does MCC grow?", answer: "Very rapidly — nodules often double in size within weeks." },
    ],
    citations: [
      { name: "National Cancer Institute (NCI) - MCC", url: "https://www.cancer.gov" },
      { name: "Merkel Cell Carcinoma Network", url: "https://www.merkelcell.org" },
    ],
  },
  {
    id: "myeloma",
    numericId: 23,
    category: "CLINICAL CARE",
    tag: "CLINICAL CARE",
    title: "Multiple Myeloma: Plasma Cell Pathology, CRAB Criteria, SPEP Diagnostics & Transplants",
    readTime: "11 min read",
    date: "Sep 25, 2026",
    desc: "In-depth guide to multiple myeloma, bone marrow crowding, CRAB diagnostic criteria, serum protein electrophoresis, immunomodulatory drugs, and stem cell transplants.",
    author: "Aryaka Sikdar | Proofreading Manager",
    content: [
      "Multiple Myeloma (MM) is a plasma cell white blood cell cancer in bone marrow (10-15% of hematological cancers in India).",
    ],
    sections: [
      {
        heading: "The CRAB Diagnostic Criteria",
        content: [
          "C - Calcium elevation (hypercalcemia)",
          "R - Renal failure (kidney damage)",
          "A - Anemia (low red blood cells)",
          "B - Bone lesions (lytic bone lesions & fractures)",
          "Common Sites: Spine, ribs, pelvis, skull, long bones.",
        ],
      },
      {
        heading: "Diagnostics & Treatment Options",
        content: [
          "Diagnostics: Serum Protein Electrophoresis (SPEP) & Immunofixation (M-protein), Bone marrow biopsy, Free Light Chain Assay, X-ray/MRI/PET-CT, Kidney function tests.",
          "Treatment: Chemotherapy & Immunomodulatory drugs (lenalidomide, thalidomide, bortezomib), Corticosteroids, Autologous Stem Cell / Bone Marrow Transplant (ASCT), Bisphosphonates, Radiotherapy, Maintenance lenalidomide.",
        ],
      },
    ],
    faqs: [
      { question: "Is myeloma curable?", answer: "Myeloma is treatable but not usually curable. Modern therapies achieve long-term remissions." },
      { question: "Who is at risk?", answer: "Older males (>50 yrs), family history, and chronic chemical/pesticide exposure." },
    ],
    citations: [
      { name: "International Myeloma Foundation (IMF)", url: "https://www.myeloma.org" },
      { name: "AIIMS Delhi Hematology Department", url: "https://www.aiims.edu" },
    ],
  },
  {
    id: "pancreatic-cancer",
    numericId: 24,
    category: "CLINICAL CARE",
    tag: "CLINICAL CARE",
    title: "Pancreatic Cancer: Exocrine Adenocarcinoma, CA19-9 Markers, Whipple Surgery & Diet",
    readTime: "12 min read",
    date: "Sep 25, 2026",
    desc: "Comprehensive guide to pancreatic ductal adenocarcinoma and neuroendocrine tumors, early vague symptoms, EUS fine needle aspiration, surgical resection, and enzyme replacement.",
    author: "Riddhima Saha | Researcher",
    content: [
      "Pancreatic cancer develops in exocrine digestive enzyme cells (93% ductal adenocarcinoma) or endocrine hormone cells. Low 5-year survival rate (~12%).",
    ],
    sections: [
      {
        heading: "Location, Causes & Symptoms",
        content: [
          "Location: 65-70% occur in the head of pancreas near duodenum.",
          "Causes: DNA mutations, tobacco smoking, type 2 diabetes, obesity, family history (Lynch/BRCA), chronic pancreatitis, heavy alcohol.",
          "Symptoms: Belly pain to back, appetite/weight loss, Jaundice (yellow skin/eyes), light floating stool, dark urine, itchy skin, worsening diabetes, fatigue.",
        ],
      },
      {
        heading: "Diagnostics & Whipple Resection",
        content: [
          "Diagnostics: Ultrasound, CT, MRI, PET, Endoscopic Ultrasound (EUS) with Fine Needle Aspiration (FNA) biopsy, CA19-9 tumor marker blood test, Genetic testing.",
          "Treatment: Chemotherapy, Radiation, Targeted therapy, Immunotherapy, Surgery (Whipple procedure pancreaticoduodenectomy), Palliative care.",
          "Maintenance: Pancreatic enzyme supplements (PERT), small frequent meals, blood sugar monitoring.",
        ],
      },
    ],
    faqs: [
      { question: "Can pancreatic cancer go undetected?", answer: "Yes. Early stages have vague symptoms and deep anatomical location makes small tumors hard to detect." },
      { question: "Is full recovery possible?", answer: "Yes, according to Johns Hopkins, full recovery is possible if detected very early when localized and surgically resected." },
    ],
    citations: [
      { name: "Johns Hopkins Medicine - Pancreatic Cancer", url: "https://www.hopkinsmedicine.org" },
      { name: "Pancreatic Cancer Action Network (PanCAN)", url: "https://www.pancan.org" },
    ],
  },
  {
    id: "penile-cancer",
    numericId: 25,
    category: "CLINICAL CARE",
    tag: "CLINICAL CARE",
    title: "Penile Cancer: Squamous Cell Variants, HPV Link, Organ-Sparing Surgery & ILND",
    readTime: "11 min read",
    date: "Sep 25, 2026",
    desc: "Exhaustive clinical guide to penile carcinoma, PeIN precursor lesions, HPV-16/18 risk factors, organ-preserving Mohs/laser surgery, and inguinal lymph node dissection.",
    author: "Suditi Saha | Researcher",
    content: [
      "Penile cancer (penile carcinoma) originates in glans head or foreskin prepuce cells. Squamous Cell Carcinoma (SCC) accounts for ~95% of cases.",
    ],
    sections: [
      {
        heading: "Subtypes & HPV Etiology",
        content: [
          "• Penile Intraepithelial Neoplasia (PeIN / CIS): Non-invasive red/white patches (erythroplasia/leukoplakia).",
          "• SCC Variants: Keratinizing, basaloid, warty, verrucous, sarcomatoid. Basaloid & warty are strongly HPV-16/18 related.",
          "• Risk factors: HPV, Phimosis & smegma chronic inflammation, lack of neonatal circumcision, smoking, Lichen sclerosus.",
        ],
      },
      {
        heading: "Diagnostics & Organ-Sparing Therapies",
        content: [
          "Symptoms: Persistent sore/lump/ulcer on glans or foreskin, malodorous discharge, groin lymph node swelling.",
          "Diagnostics: Clinical exam, Punch/Excisional Biopsy, Ultrasound/MRI/CT/PET, Sentinel node biopsy / FNA.",
          "Treatment: Organ-sparing surgery (wide local excision, glansectomy, Mohs, CO2 laser), Topical 5-FU/imiquimod, Radiation, Inguinal Lymph Node Dissection (ILND), Platinum chemotherapy, Reconstructive surgery.",
        ],
      },
    ],
    faqs: [
      { question: "Will treatment remove the penis?", answer: "Not always. Early stage tumors are treated with organ-preserving approaches (local excision, glansectomy, laser)." },
      { question: "Does circumcision prevent penile cancer?", answer: "Circumcision in infancy substantially reduces lifetime risk by eliminating phimosis and smegma buildup." },
    ],
    citations: [
      { name: "National Cancer Institute (NCI) - Penile Cancer", url: "https://www.cancer.gov" },
      { name: "Cleveland Clinic - Penile Cancer Guidelines", url: "https://my.clevelandclinic.org" },
    ],
  },
  {
    id: "small-intestine-cancer",
    numericId: 26,
    category: "CLINICAL CARE",
    tag: "CLINICAL CARE",
    title: "Small Intestine Cancer: Duodenal & Ileal Neoplasms, Capsule Endoscopy & Treatments",
    readTime: "11 min read",
    date: "Sep 25, 2026",
    desc: "Detailed breakdown of rare small bowel malignancies (carcinoid, adenocarcinoma, GIST, lymphoma), capsule pill endoscopy, surgical resection, and somatostatin analogs.",
    author: "Ekoparnika Mukherjee | Researcher",
    content: [
      "Small intestine cancer is one of the rarest GI tract cancers (~3% of GI tumors), occurring mostly in duodenum or ileum.",
    ],
    sections: [
      {
        heading: "Types of Small Bowel Cancer",
        content: [
          "• Carcinoid Tumors (~50%): Neuroendocrine tumors producing hormones.",
          "• Adenocarcinoma (~33%): Glandular lining cells.",
          "• Sarcoma (GIST): Gastrointestinal Stromal Tumors.",
          "• Lymphoma: Lymphatic cells.",
        ],
      },
      {
        heading: "Diagnostics & Capsule Endoscopy",
        content: [
          "Symptoms: Abdominal cramps/pain, lump, nausea/vomiting/diarrhea, weight loss, anemia, jaundice, bloody dark stool, purplish skin flushing.",
          "Diagnostics: Blood CBC & chemistry, Upper Endoscopy, Double-balloon enteroscopy, Capsule (pill) endoscopy camera, CT/MRI enterography, Barium X-rays.",
          "Treatment: Surgical Resection & anastomosis, Bypass surgery, Somatostatin analogs (lanreotide, octreotide), Chemotherapy, Radiation, Targeted, Immunotherapy.",
        ],
      },
    ],
    faqs: [
      { question: "What is capsule endoscopy?", answer: "A procedure where the patient swallows a tiny capsule camera that records thousands of GI images as it travels." },
      { question: "Who is at risk?", answer: "Age >65, males, hereditary FAP / Peutz-Jeghers / Lynch syndrome, Crohn's / celiac disease, salty/smoked meat diet." },
    ],
    citations: [
      { name: "American Cancer Society - Small Intestine Cancer", url: "https://www.cancer.org" },
      { name: "National Institutes of Health (NIH)", url: "https://www.nih.gov" },
    ],
  },
  {
    id: "stomach-cancer",
    numericId: 27,
    category: "CLINICAL CARE",
    tag: "CLINICAL CARE",
    title: "Stomach (Gastric) Cancer: Risk Factors, Endoscopic Resection, Gastrectomy & Diet",
    readTime: "12 min read",
    date: "Sep 25, 2026",
    desc: "Comprehensive review of gastric carcinoma, H. pylori and dietary risk factors, endoscopy diagnostics, numeric staging 1A-4, gastrectomy procedures, and nutrition.",
    author: "Riddhima Saha | Researcher",
    content: [
      "Stomach cancer (gastric cancer) develops in stomach mucosa. 4th leading cause of cancer deaths global (1.1M cases 2020, 66% males, age >45).",
    ],
    sections: [
      {
        heading: "Risk Factors & Symptoms",
        content: [
          "Risk factors: Helicobacter pylori infection, smoking, obesity, alcohol, pernicious anemia, salty/smoked/pickled food diet.",
          "Symptoms: Poor appetite, weight loss, belly pain above navel, early satiety, heartburn/indigestion, nausea/vomiting with/without blood, dark stool, anemia, jaundice.",
        ],
      },
      {
        heading: "Staging & Gastrectomy Surgery",
        content: [
          "Staging: Stage 1A/1B (mucosa/submucosa) to Stage 4 (distant metastasis to liver/lungs/peritoneum).",
          "Diagnostics: Endoscopy (EGD), Biopsy, Blood tests, FOBT stool test.",
          "Treatment: Endoscopic Mucosal Resection (EMR for early stage), Partial or Total Gastrectomy surgery, Endoluminal stent placement, Gastrojejunostomy, Radiation, Chemotherapy.",
          "Diet: Small digestible meals, avocados, nut butter, olive oil, broths; avoid salty/smoked/spicy/fatty foods, red meat, added sugar, alcohol.",
        ],
      },
    ],
    faqs: [
      { question: "Is stomach cancer hereditary?", answer: "Spontaneous in most cases. Hereditary diffuse gastric cancer is rare (~1-3% of cases)." },
      { question: "Can stomach cancer be cured?", answer: "Yes, early-stage gastric tumors removed by endoscopic or surgical resection have high cure rates." },
    ],
    citations: [
      { name: "Narayana Health Gastric Cancer Guide", url: "https://www.narayanahealth.org" },
      { name: "National Cancer Institute (NCI)", url: "https://www.cancer.gov" },
    ],
  },
  {
    id: "thymic-carcinoma",
    numericId: 28,
    category: "CLINICAL CARE",
    tag: "CLINICAL CARE",
    title: "Thymic Carcinoma: Anterior Mediastinal Masses vs Thymoma, Masaoka Staging & Chemo",
    readTime: "12 min read",
    date: "Sep 25, 2026",
    desc: "Exhaustive guide to aggressive thymic epithelial tumors, distinction from thymoma, Masaoka-Koga staging system, surgical debulking, and platinum-based chemoradiotherapy.",
    author: "Jiya Haldar | Chief Editor",
    content: [
      "Thymic Carcinoma is a rare, aggressive malignant tumor of thymus gland epithelial cells in the anterior mediastinum.",
    ],
    sections: [
      {
        heading: "Thymic Carcinoma vs Thymoma",
        content: [
          "• Thymomas: Less aggressive, encapsulated, slow-growing, frequently associated with Myasthenia Gravis.",
          "• Thymic Carcinomas: Aggressive, unencapsulated, invasive, early metastasis (pleura, lungs, bone, liver), CD5+ / CD117+ IHC markers, rarely associated with autoimmune disorders.",
        ],
      },
      {
        heading: "Symptoms & Diagnostic Workup",
        content: [
          "Symptoms: Dull chest pain, cough, dyspnea, hoarseness, SVC syndrome (face/neck swelling), dysphagia, night sweats, fever, weight loss.",
          "Diagnostics: Chest X-ray, CT scan, MRI, PET-CT, CT-guided Core Needle Biopsy, IHC markers (CD5+, CD117+, EMA+), Masaoka-Koga Staging (Stage I to IVb).",
          "Treatment: Surgical R0 complete resection / debulking, Radiation therapy, Chemotherapy (Cisplatin, Doxorubicin, Cyclophosphamide, Etoposide, Ifosfamide, Paclitaxel, Carboplatin), Targeted c-KIT & Immunotherapy.",
        ],
      },
    ],
    faqs: [
      { question: "Is Thymic Carcinoma curable?", answer: "Complete early surgical resection offers the best chance of long-term survival, though recurrence rates are high." },
      { question: "Does it cause Myasthenia Gravis?", answer: "Rarely. Unlike thymomas, autoimmune myasthenia gravis is seldom seen with thymic carcinoma." },
    ],
    citations: [
      { name: "International Thymic Malignancies Interest Group (ITMIG)", url: "https://www.itmig.org" },
      { name: "National Cancer Institute (NCI)", url: "https://www.cancer.gov" },
    ],
  },
  {
    id: "thyroid-and-parathyroid-cancer",
    numericId: 29,
    category: "CLINICAL CARE",
    tag: "CLINICAL CARE",
    title: "Thyroid & Parathyroid Cancer: Endocrine Tumors, Hypercalcemia, Thyroidectomy & RAI",
    readTime: "13 min read",
    date: "Sep 25, 2026",
    desc: "Definitive clinical guide to papillary, follicular, medullary, and anaplastic thyroid cancers alongside rare parathyroid carcinoma, PTH hypercalcemia, and en bloc resection.",
    author: "Soushree Chakraborty | Chief Research Officer",
    content: [
      "Thyroid cancer and parathyroid cancer are distinct endocrine gland malignancies in the neck with contrasting physiological impacts, hormone secretions, and treatment approaches.",
    ],
    sections: [
      {
        heading: "Hormones Secreted & Regulation",
        content: [
          "Thyroid Hormones: T3 & T4 (follicle cells regulate metabolic rate), Calcitonin (C-cells lower blood calcium). TSH pituitary regulation.",
          "Parathyroid Hormone: PTH (chief cells raise blood calcium by bone release & kidney reabsorption).",
        ],
      },
      {
        heading: "Thyroid Cancer: Types & Treatments",
        content: [
          "• Papillary Thyroid Cancer (~80%): Slow-growing, excellent prognosis (>98% 5-yr survival).",
          "• Follicular Thyroid Cancer (~10%): Linked to low iodine, blood-borne metastasis.",
          "• Medullary Thyroid Cancer (MTC <5%): Calcitonin C-cell origin, MEN2 genetic link.",
          "• Anaplastic Thyroid Cancer (<1%): Extremely aggressive and rapidly invasive.",
          "Symptoms: Painless neck lump, hoarseness, dysphagia, neck pain, swollen nodes.",
          "Treatment: Total Thyroidectomy, Radioactive Iodine (RAI I-131), lifelong levothyroxine hormone replacement.",
        ],
      },
      {
        heading: "Parathyroid Cancer & Severe Hypercalcemia",
        content: [
          "Parathyroid Carcinoma is an extremely rare malignancy (<100 cases/yr US) causing severe PTH overproduction.",
          "Symptoms: Severe Hypercalcemia (>14 mg/dL), extreme fatigue, bone pain/fractures, kidney stones, polyuria/thirst, nausea, neck lump.",
          "Treatment: En bloc surgical resection removing parathyroid gland & adjacent tissue. Chemotherapy and radiation are ineffective.",
        ],
      },
    ],
    faqs: [
      { question: "Are thyroid and parathyroid cancers related?", answer: "No. They affect separate glands with distinct functions, despite being anatomically adjacent in the neck." },
      { question: "Will I need medication after thyroid removal?", answer: "Yes. Patients undergoing total thyroidectomy require daily levothyroxine hormone replacement for life." },
      { question: "Is a neck lump always thyroid cancer?", answer: "No. Over 95% of palpable neck nodules are non-cancerous benign thyroid nodules." },
    ],
    citations: [
      { name: "American Thyroid Association (ATA)", url: "https://www.thyroid.org" },
      { name: "Macmillan Cancer Support", url: "https://www.macmillan.org.uk" },
      { name: "MD Anderson Cancer Center / Mayo Clinic", url: "https://www.mayoclinic.org" },
    ],
  },
];
