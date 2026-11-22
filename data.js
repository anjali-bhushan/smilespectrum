// SmileSpectrum Dental: PROTOTYPE content
// Fictional clinic. All specialists, timings and feedback below are SAMPLE content, not real people or patients.

const CLINIC = {
  name: "SmileSpectrum Dental",
  tagline: "Every department of dentistry, under one colourful roof.",
  hours: "Mon–Sat · 10:00 am – 8:00 pm",
  slots: ["10:00 am", "11:00 am", "12:00 pm", "2:00 pm", "3:00 pm", "4:00 pm", "5:00 pm", "6:00 pm", "7:00 pm"]
};

const DEPARTMENTS = [
  {
    id: "conservative", name: "Conservative Dentistry & Endodontics", short: "Conservative & RCT", icon: "🦷",
    color: "#2563eb", light: "#dbeafe", grad: "linear-gradient(135deg,#1d4ed8,#38bdf8)",
    intro: "Saving your natural teeth: fillings for cavities, root canal treatment for infected teeth, and restorations that look like the real thing.",
    treatments: [
      { name: "Tooth-coloured fillings", desc: "Composite fillings that repair cavities and blend in with your teeth.", visits: "1 visit", time: "30–45 min" },
      { name: "Glass ionomer fillings", desc: "Fluoride-releasing fillings, often used near the gum line.", visits: "1 visit", time: "30 min" },
      { name: "Root canal treatment (RCT)", desc: "Removes infected pulp, cleans and seals the canals to save the tooth.", visits: "1–3 visits", time: "45–90 min each" },
      { name: "Re-root canal treatment", desc: "Re-treats a tooth whose earlier root canal has not healed.", visits: "2–3 visits", time: "60–90 min each" },
      { name: "Post & core build-up", desc: "Rebuilds a badly broken tooth after RCT so it can hold a crown.", visits: "1 visit", time: "45 min" },
      { name: "Inlays & onlays", desc: "Custom-made fillings for large cavities, stronger than regular fillings.", visits: "2 visits", time: "45 min each" },
      { name: "Teeth whitening", desc: "In-clinic whitening to brighten stained or yellow teeth.", visits: "1 visit", time: "60–90 min" }
    ]
  },
  {
    id: "ortho", name: "Orthodontics", short: "Orthodontics", icon: "😁",
    color: "#7c3aed", light: "#ede9fe", grad: "linear-gradient(135deg,#6d28d9,#c084fc)",
    intro: "Straighter teeth and a better bite at any age, with braces, clear aligners and retainers.",
    treatments: [
      { name: "Metal braces", desc: "Classic, reliable brackets and wires for all kinds of crowding and spacing.", visits: "Monthly", time: "12–24 months" },
      { name: "Ceramic braces", desc: "Tooth-coloured brackets that are much less visible.", visits: "Monthly", time: "12–24 months" },
      { name: "Clear aligners", desc: "Removable, nearly invisible trays that move teeth step by step.", visits: "Every 6–8 weeks", time: "6–18 months" },
      { name: "Retainers", desc: "Fixed or removable retainers that keep teeth in place after treatment.", visits: "1–2 visits", time: "Long-term wear" },
      { name: "Functional appliances", desc: "Guide jaw growth in children with bite problems.", visits: "Monthly", time: "9–12 months" },
      { name: "Early (interceptive) orthodontics", desc: "Early check and treatment for children aged 7–10.", visits: "As needed", time: "Varies" }
    ]
  },
  {
    id: "pedo", name: "Pediatric Dentistry (Pedodontics)", short: "Kids' dentistry", icon: "🧸",
    color: "#f97316", light: "#ffedd5", grad: "linear-gradient(135deg,#f97316,#facc15)",
    intro: "Gentle, fun dental care for babies, children and teens, so every visit feels like an adventure.",
    treatments: [
      { name: "First dental visit & check-up", desc: "A friendly first visit, ideally by the first birthday.", visits: "1 visit", time: "20–30 min" },
      { name: "Fluoride application", desc: "Strengthens enamel and helps prevent cavities.", visits: "Every 6 months", time: "10 min" },
      { name: "Pit & fissure sealants", desc: "A protective coat on back teeth to keep cavities away.", visits: "1 visit", time: "20–30 min" },
      { name: "Kids' fillings", desc: "Gentle fillings for milk and permanent teeth.", visits: "1 visit", time: "30 min" },
      { name: "Pulpotomy / pulpectomy", desc: "Root canal treatment for milk teeth.", visits: "1–2 visits", time: "30–45 min" },
      { name: "Stainless steel crowns", desc: "Strong caps that protect weak or treated milk teeth.", visits: "1 visit", time: "30 min" },
      { name: "Space maintainers", desc: "Hold space for adult teeth when a milk tooth is lost early.", visits: "2 visits", time: "20 min each" },
      { name: "Habit-breaking appliances", desc: "Help children stop thumb-sucking or tongue-thrusting.", visits: "2 visits", time: "20 min each" }
    ]
  },
  {
    id: "prostho", name: "Prosthodontics", short: "Crowns & dentures", icon: "👑",
    color: "#0d9488", light: "#ccfbf1", grad: "linear-gradient(135deg,#0f766e,#2dd4bf)",
    intro: "Replacing and rebuilding teeth with crowns, bridges, dentures and implant-supported restorations.",
    treatments: [
      { name: "Crowns (PFM, zirconia, e.max)", desc: "Caps that protect and restore damaged teeth.", visits: "2 visits", time: "45–60 min each" },
      { name: "Bridges", desc: "Replace one or more missing teeth using neighbouring teeth for support.", visits: "2–3 visits", time: "60 min each" },
      { name: "Complete dentures", desc: "Removable full sets of teeth for people with no natural teeth.", visits: "4–5 visits", time: "30–45 min each" },
      { name: "Partial dentures", desc: "Removable dentures that replace a few missing teeth.", visits: "3–4 visits", time: "30–45 min each" },
      { name: "Implant-supported crowns & dentures", desc: "Fixed teeth anchored on dental implants.", visits: "3–4 visits", time: "Over 3–6 months" },
      { name: "Veneers", desc: "Thin shells that improve the shape and colour of front teeth.", visits: "2 visits", time: "60 min each" }
    ]
  },
  {
    id: "perio", name: "Periodontics", short: "Gum care", icon: "🌿",
    color: "#16a34a", light: "#dcfce7", grad: "linear-gradient(135deg,#15803d,#4ade80)",
    intro: "Healthy gums are the foundation of a healthy smile. We treat bleeding gums, gum disease and receding gums.",
    treatments: [
      { name: "Scaling & polishing", desc: "Professional cleaning that removes tartar and stains.", visits: "1 visit", time: "30–45 min" },
      { name: "Deep cleaning (root planing)", desc: "Cleans below the gum line to treat gum disease.", visits: "2–4 visits", time: "45 min each" },
      { name: "Flap surgery", desc: "Treats advanced gum disease that deep cleaning can't reach.", visits: "1–2 visits", time: "60–90 min" },
      { name: "Gum grafting", desc: "Covers exposed roots caused by receding gums.", visits: "1 visit", time: "60–90 min" },
      { name: "Laser gum treatment", desc: "Minimally invasive gum treatment with faster healing.", visits: "1 visit", time: "30–60 min" },
      { name: "Gum depigmentation", desc: "Lightens dark patches on the gums for a more even smile.", visits: "1 visit", time: "45 min" }
    ]
  },
  {
    id: "surgery", name: "Oral & Maxillofacial Surgery", short: "Oral surgery", icon: "🩺",
    color: "#dc2626", light: "#fee2e2", grad: "linear-gradient(135deg,#b91c1c,#fb7185)",
    intro: "Safe, comfortable surgical care, from simple extractions to dental implants and jaw procedures.",
    treatments: [
      { name: "Tooth extraction", desc: "Gentle removal of a damaged or loose tooth.", visits: "1 visit", time: "20–30 min" },
      { name: "Wisdom tooth removal", desc: "Surgical removal of impacted or painful wisdom teeth.", visits: "1 visit + review", time: "45–60 min" },
      { name: "Dental implants", desc: "Titanium roots that replace missing teeth permanently.", visits: "2–3 visits", time: "Over 3–6 months" },
      { name: "Bone grafting & sinus lift", desc: "Builds up bone so an implant can be placed.", visits: "1 visit", time: "60–90 min" },
      { name: "Cyst & lesion removal", desc: "Surgical removal of cysts in the jaw or mouth.", visits: "1 visit + review", time: "60 min" },
      { name: "Biopsy", desc: "Takes a small tissue sample for lab testing.", visits: "1 visit", time: "20–30 min" }
    ]
  },
  {
    id: "radiology", name: "Oral Medicine & Radiology", short: "Diagnosis & X-rays", icon: "🔬",
    color: "#4f46e5", light: "#e0e7ff", grad: "linear-gradient(135deg,#4338ca,#818cf8)",
    intro: "The right diagnosis comes first: consultations, digital X-rays, 3D scans and oral cancer screening.",
    treatments: [
      { name: "Consultation & oral check-up", desc: "A full examination with a treatment plan.", visits: "1 visit", time: "15–20 min" },
      { name: "Digital IOPA X-ray", desc: "A low-radiation X-ray of one or two teeth.", visits: "Same visit", time: "5 min" },
      { name: "OPG (full-mouth X-ray)", desc: "One X-ray showing all teeth and both jaws.", visits: "Same visit", time: "10 min" },
      { name: "CBCT 3D scan", desc: "A 3D scan for implants, wisdom teeth and complex cases.", visits: "Same visit", time: "15 min" },
      { name: "Oral cancer screening", desc: "Checks for early signs of oral cancer, especially for tobacco users.", visits: "1 visit", time: "15 min" },
      { name: "Mouth ulcer & TMJ assessment", desc: "Diagnosis of ulcers, burning mouth and jaw-joint pain.", visits: "1 visit", time: "20 min" }
    ]
  },
  {
    id: "cosmetic", name: "Cosmetic Dentistry", short: "Smile makeover", icon: "✨",
    color: "#db2777", light: "#fce7f3", grad: "linear-gradient(135deg,#be185d,#f472b6)",
    intro: "Design the smile you've always wanted: whitening, veneers, bonding and full smile makeovers.",
    treatments: [
      { name: "Digital smile design", desc: "Preview your new smile digitally before treatment starts.", visits: "1 visit", time: "45 min" },
      { name: "Teeth whitening", desc: "Professional whitening for a brighter smile.", visits: "1 visit", time: "60–90 min" },
      { name: "Composite bonding", desc: "Repairs chips and gaps in a single visit.", visits: "1 visit", time: "45–60 min" },
      { name: "Porcelain veneers", desc: "Thin porcelain shells for a natural, lasting result.", visits: "2 visits", time: "60 min each" },
      { name: "Gum contouring", desc: "Reshapes the gum line for a balanced smile.", visits: "1 visit", time: "45 min" },
      { name: "Smile makeover", desc: "A combined plan to transform the whole smile.", visits: "Multiple", time: "Planned with you" }
    ]
  }
];

// FICTIONAL specialists (sample profiles, not real people)
const SPECIALISTS = [
  { name: "Dr. Aarav Kapoor", dept: "conservative", title: "MDS, Conservative Dentistry & Endodontics", exp: 12, days: "Mon, Wed, Fri", langs: "English, Hindi" },
  { name: "Dr. Nisha Verma", dept: "conservative", title: "MDS, Conservative Dentistry & Endodontics", exp: 7, days: "Tue, Thu, Sat", langs: "English, Hindi, Punjabi" },
  { name: "Dr. Meera Iyer", dept: "ortho", title: "MDS, Orthodontics & Dentofacial Orthopaedics", exp: 10, days: "Mon, Thu, Sat", langs: "English, Tamil, Hindi" },
  { name: "Dr. Rohan Das", dept: "pedo", title: "MDS, Pediatric & Preventive Dentistry", exp: 8, days: "Tue, Fri, Sat", langs: "English, Bengali, Hindi" },
  { name: "Dr. Kavya Nair", dept: "prostho", title: "MDS, Prosthodontics & Implantology", exp: 11, days: "Mon, Wed, Sat", langs: "English, Malayalam" },
  { name: "Dr. Arjun Menon", dept: "perio", title: "MDS, Periodontology", exp: 9, days: "Tue, Thu", langs: "English, Malayalam, Hindi" },
  { name: "Dr. Sameer Khan", dept: "surgery", title: "MDS, Oral & Maxillofacial Surgery", exp: 14, days: "Wed, Fri, Sat", langs: "English, Hindi, Urdu" },
  { name: "Dr. Priya Joshi", dept: "radiology", title: "MDS, Oral Medicine & Radiology", exp: 6, days: "Mon–Fri", langs: "English, Marathi, Hindi" },
  { name: "Dr. Tara Sen", dept: "cosmetic", title: "MDS, Prosthodontics (Aesthetic Dentistry)", exp: 9, days: "Thu, Fri, Sat", langs: "English, Hindi" }
];

// SAMPLE feedback: illustrative only, not from real patients
const SAMPLE_FEEDBACK = [
  { name: "Sample patient A", dept: "conservative", rating: 5, text: "Root canal was much easier than I expected. The steps were explained clearly." },
  { name: "Sample parent B", dept: "pedo", rating: 5, text: "My 6-year-old loved the kids' room and wasn't scared at all." },
  { name: "Sample patient C", dept: "ortho", rating: 4, text: "Aligner check-ups are quick, and I can see progress every visit." },
  { name: "Sample patient D", dept: "perio", rating: 5, text: "Bleeding gums stopped after the deep cleaning and home-care tips." },
  { name: "Sample patient E", dept: "surgery", rating: 4, text: "Wisdom tooth removal was smooth and the follow-up call was helpful." },
  { name: "Sample patient F", dept: "cosmetic", rating: 5, text: "The digital smile preview helped me decide on veneers." }
];
