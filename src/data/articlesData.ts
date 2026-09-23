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
  cover: string;
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
    numericId: 7,
    category: "CLINICAL CARE",
    tag: "CLINICAL CARE",
    title: "Anal Cancer: Comprehensive Guide to Causes, Staging, Prevention & Treatment",
    readTime: "10 min read",
    date: "Sep 23, 2026",
    desc: "An exhaustive clinical analysis of anal cancer types, staging, HPV risk factors, diagnostic anoscopy, chemoradiation therapy, and long-term surveillance by researcher Suditi Saha.",
    author: "Suditi Saha | Researcher",
    cover: "/Cover(3).png",
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
          "Anal cancer is a malignancy originating in the anus—the distal opening of the gastrointestinal tract. Most commonly, it is a squamous cell carcinoma arising in the anal canal. Less frequent types include adenocarcinoma, small-cell carcinoma, and melanoma.",
        ],
      },
      {
        heading: "Types of Anal Cancer",
        content: [
          "Anal cancer is categorized based on the type of cells from which it originates. Understanding the types is crucial because treatment and prognosis vary differently:",
          "• Squamous Cell Carcinoma (SCC): Most common type (about 85–90% of all cases). It arises from squamous epithelial cells lining the anal canal. Often linked to Human Papillomavirus (HPV) infection, especially HPV-16. Subtypes include Keratinizing (resembles skin-like cells; more common in the external anal margin) and Non-keratinizing (located deeper in the anal canal).",
          "• Adenocarcinoma: Develops from glandular cells, usually near the anal glands or rectum. Rare (less than 10% of cases). Resembles colorectal cancer in behavior and treatment.",
          "• Basaloid or Cloacogenic Carcinoma: Arises near the transformation zone, where glandular and squamous cells meet. Considered a variant of squamous carcinoma. More aggressive but often treated like SCC.",
          "• Melanoma of the Anus: Rare and highly aggressive. Originates from melanocytes, the pigment-producing cells. May present as a dark lump or ulcer in or around the anus.",
          "• Small Cell Carcinoma / Neuroendocrine Tumors: Extremely rare and highly malignant. Requires systemic treatment similar to small cell lung cancer.",
        ],
      },
      {
        heading: "Location & Staging",
        content: [
          "Location: Occurs in the anal canal (approx. 4 cm in length), the internal passage from the rectum to the anus.",
          "Stages: Staging follows the TNM system, from Stage I (localized to the anal canal) to Stage IV (metastasis to distant organs). German data indicate 5-year survival rates: Stage I (77–90%), Stage II (67–75%), Stage IIIA/B (51–64%), and Stage IV (5–15%).",
        ],
      },
      {
        heading: "Symptoms",
        content: [
          "Common presenting symptoms include:",
          "1. Anal or rectal bleeding or blood in stool",
          "2. Pain, pressure, or a palpable mass/lump",
          "3. Persistent itching, irritation, or abnormal discharge",
          "4. Altered bowel habits, such as changes in stool caliber or frequency",
          "5. Advanced stage symptoms: systemic fatigue, unexplained weight loss, or fecal incontinence",
        ],
      },
      {
        heading: "Statistics and Extent",
        content: [
          "Anal cancer accounts for approximately 0.5% of all new cancer diagnoses. However, incidence has steadily risen since the 1990s, particularly among women over 65, reaching 11.4 per 100,000 in white women.",
          "Overall 5-year survival in the U.S. is approximately 68%, ranging from 77–90% for localized early-stage disease down to 36% for distant metastatic disease.",
        ],
      },
      {
        heading: "Prevention of Anal Cancer",
        content: [
          "Preventive strategies are especially effective due to the clear link between anal cancer and modifiable risk factors, particularly persistent HPV infection:",
          "• HPV Vaccination: The most effective preventive tool. Protects against HPV types 16 and 18, which cause ~90% of anal cancers. Recommended for all adolescents before sexual activity, with catch-up vaccination up to age 26 (and up to age 45 after shared decision-making).",
          "• Safe Sexual Practices: Using condoms during anal intercourse lowers risk. Limiting sexual partner counts reduces HPV transmission risk.",
          "• Smoking Cessation: Smoking damages epithelial cells and weakens mucosal immune defenses, promoting persistent HPV infection. Smokers are 2–3X more likely to develop anal cancer.",
          "• Regular Screening for High-Risk Groups: Recommended for men who have sex with men (MSM), people living with HIV, and organ transplant recipients via anal Pap cytology and High-Resolution Anoscopy (HRA).",
        ],
      },
      {
        heading: "Diagnosis of Anal Cancer",
        content: [
          "Early and accurate diagnosis is essential for treatment planning:",
          "• Clinical History & Digital Rectal Examination (DRE): Palpation of anal canal and sphincters for irregularities.",
          "• Anoscopy & Proctoscopy: Direct lighted visualization of the mucosal lining.",
          "• Biopsy: Gold standard. Tissue sampling confirms cell type (SCC vs. Adenocarcinoma) and histologic grade.",
          "• Staging Imaging: Pelvic MRI (evaluates local tumor extent and sphincter invasion), CT Abdomen/Pelvis (evaluates nodal and distant spread), PET scan (detects active metabolic disease), and Endoanal Ultrasound.",
        ],
      },
      {
        heading: "Treatment Options",
        content: [
          "1. Chemoradiation Therapy (CRT): First-line standard for squamous cell carcinoma. Utilizes continuous 5-FU with Mitomycin C (or Cisplatin) combined with daily pelvic radiation over 5–6 weeks. Preserves sphincter function with 70–90% cure rates in early stages.",
          "2. Surgery: Reserved for small superficial margin lesions or CRT treatment failure (salvage surgery). Includes Local Excision or Abdominoperineal Resection (APR) requiring permanent colostomy.",
          "3. Immunotherapy & Targeted Therapy: Checkpoint inhibitors (nivolumab, pembrolizumab) for recurrent or metastatic disease.",
        ],
      },
      {
        heading: "Side Effects & Management",
        content: [
          "• Radiation Dermatitis: Sitz baths, gentle skin cleansers, and topical corticosteroid creams.",
          "• GI & Urinary Effects: Loperamide for diarrhea, dietary modifications, and hydration for dysuria.",
          "• Hematologic Toxicity: Routine blood counts during chemotherapy cycles.",
          "• Anal Strictures: Managed with gentle dilation protocols.",
        ],
      },
    ],
    faqs: [
      {
        question: "Is anal cancer contagious?",
        answer: "No. Cancer itself is not contagious. However, the primary causative virus—HPV—is sexually transmitted.",
      },
      {
        question: "Can anal cancer be completely cured?",
        answer: "Yes, particularly when detected early. Over 80% of stage I and II cases achieve complete long-term remission with chemoradiation.",
      },
      {
        question: "Can I work or go to school during treatment?",
        answer: "It depends on individual tolerance. Many patients experience fatigue and require temporary time off during the later weeks of radiation.",
      },
      {
        question: "Do I need a colostomy bag?",
        answer: "Not usually. Standard chemoradiation preserves anal sphincter function in most cases. Permanent colostomy is only required if APR surgery is needed.",
      },
      {
        question: "How often should I get follow-up care?",
        answer: "Surveillance visits are scheduled every 3–6 months for the first 2 years, then every 6–12 months up to year 5.",
      },
      {
        question: "Will HPV vaccination help me if I already have anal cancer?",
        answer: "No. Vaccination does not treat active cancer, but it prevents new infections and protects against future HPV-related malignancies.",
      },
      {
        question: "Can I have children after treatment?",
        answer: "Pelvic radiation can impact fertility. Patients are advised to consult on fertility preservation (egg/sperm banking) prior to starting CRT.",
      },
      {
        question: "Are there support groups or counseling options?",
        answer: "Yes. Oncology social workers, patient advocacy networks, and Carcino Foundation offer comprehensive peer support circles.",
      },
    ],
    citations: [
      { name: "National Cancer Institute (NCI) - Anal Cancer Treatment", url: "https://www.cancer.gov/types/anal" },
      { name: "Mayo Clinic - Anal Cancer Symptoms & Treatment", url: "https://www.mayoclinic.org/diseases-conditions/anal-cancer" },
      { name: "Cleveland Clinic - Anal Cancer Staging & Overview", url: "https://my.clevelandclinic.org/health/diseases/16815-anal-cancer" },
      { name: "MedlinePlus (U.S. National Library of Medicine)", url: "https://medlineplus.gov/analcancer.html" },
      { name: "American Cancer Society (ACS)", url: "https://www.cancer.org/cancer/anal-cancer.html" },
      { name: "World Health Organization (WHO) - HPV & Cancer Prevention", url: "https://www.who.int" },
    ],
  },
  {
    id: "1",
    numericId: 1,
    category: "CAREGIVING",
    tag: "CAREGIVING",
    title: "Understanding and Countering Caregiver Burnout",
    readTime: "6 min read",
    date: "Sep 20, 2026",
    desc: "Practical strategies for maintaining mental stamina and physical well-being while supporting a loved one through intensive treatment paths.",
    author: "Dr. Sarah Jenkins",
    cover: "/Cover.png",
    content: [
      "Carcinoma is the most common type of cancer, originating in the epithelial cells that line the inner and outer surfaces of the body. Understanding its early warning signs is vital for effective intervention.",
      "Primary classifications include Adenocarcinoma (developing in glandular tissue), Squamous Cell Carcinoma (forming in flat epithelial cells), and Basal Cell Carcinoma (typically affecting the skin layer).",
      "Early detection protocols prioritize routine screenings, biomarker blood tests, high-resolution imaging, and genetic counseling for individuals with family histories.",
      "Carcino Foundation works alongside clinical care teams to ensure diagnostic data is demystified and accessible for patients at every step.",
    ],
  },
  {
    id: "2",
    numericId: 2,
    category: "SURVIVORSHIP",
    tag: "SURVIVORSHIP",
    title: "Survivorship 101: Crafting Your New Normal",
    readTime: "8 min read",
    date: "Sep 18, 2026",
    desc: "Rebuilding your physical routine and clinical tracking schedules after completing primary oncological treatment phases.",
    author: "Elena Rostova",
    cover: "/Cover(1).png",
    content: [
      "Receiving a diagnosis often brings an overwhelming flood of emotions. Building a supportive mental health framework is just as critical as medical treatment.",
      "Practicing structured mindfulness, joining peer survivor groups, and maintaining open dialogue with loved ones fosters resilience during treatment phases.",
      "Remember that seeking mental health support is a sign of strength. Carcino Foundation offers dedicated emotional wellness toolkits and local support connections.",
    ],
  },
  {
    id: "3",
    numericId: 3,
    category: "TREATMENT TECH",
    tag: "TREATMENT TECH",
    title: "Demystifying Modern Clinical Pathway Navigators",
    readTime: "5 min read",
    date: "Sep 15, 2026",
    desc: "How digital clinical path maps are streamlining patient timelines and lowering anxiety across regional healthcare centers.",
    author: "Marcus Vance",
    cover: "/Cover(2).png",
    content: [
      "Navigating medical appointments, prescription schedules, and emotional care requires a coordinated network.",
      "Carcino Foundation acts as a bridge between specialized hospital care teams and local community support groups, streamlining resource delivery.",
      "Caregivers can leverage our integrated checklists, appointment planners, and emergency helpline network.",
    ],
  },
  {
    id: "4",
    numericId: 4,
    category: "CLINICAL CARE",
    tag: "CLINICAL CARE",
    title: "Verification Standards in Oncology Networks",
    readTime: "12 min read",
    date: "Sep 12, 2026",
    desc: "An inside look at how clinicians are vetted and clinical data is reviewed prior to publication in patient databases.",
    author: "Dr. Aris Thorne",
    cover: "/Cover(3).png",
    content: [
      "Modern immunotherapy harnesses the body's natural defense mechanisms to pinpoint and neutralize cancer cells with minimal damage to healthy tissue.",
      "Recent breakthroughs in CAR-T cell engineering and mRNA cancer vaccines offer promising avenues for targeted treatment plans.",
    ],
  },
  {
    id: "5",
    numericId: 5,
    category: "COMMUNITY",
    tag: "COMMUNITY",
    title: "The Architecture of Supportive Patient Spaces",
    readTime: "7 min read",
    date: "Sep 10, 2026",
    desc: "Exploring the psychological benefits of verified peer-to-peer connection circles during chronic care management.",
    author: "Sophia Lin, RD",
    cover: "/Cover(4).png",
    content: [
      "Optimal nutrition maintains strength and reduces treatment side effects during chemotherapy and radiation.",
      "Focusing on anti-inflammatory whole foods, proper electrolyte balance, and gentle physical activity supports recovery.",
    ],
  },
  {
    id: "6",
    numericId: 6,
    category: "CLINICAL CARE",
    tag: "CLINICAL CARE",
    title: "Biomarker Advancements in Carcinoid Diagnosis",
    readTime: "10 min read",
    date: "Sep 08, 2026",
    desc: "Understanding recent laboratory breakthroughs in tracking hormone secreting tumors with high sensitivity and specificity.",
    author: "David K. Miller",
    cover: "/Cover(5).png",
    content: [
      "Entering remission marks the start of a new chapter filled with hope and ongoing self-care.",
      "Mentoring newly diagnosed patients and participating in community advocacy empowers survivors to transform lived experience into positive impact.",
    ],
  },
];
