// lib/dummy/mcu.ts

export const mcuDetail = {
  patient: {
    name: "MUHAMMAD FIRMAN LUBIS",
    gender: "Laki-Laki",
    birthDate: "2007-05-11",
    age: 18
  },
  date: "2026-03-26",
  doctor: "dr. Abdelsyah Rifki",
  status: "draft",

  vitals: {
    bloodPressure: "120/63",
    pulse: 74,
    respiration: 24,
    temperature: 36
  },

  examinations: [
    { name: "Kepala", status: "normal", notes: "" },
    { name: "Wajah", status: "abnormal", notes: "Acne sedang" },
    { name: "Mata", status: "normal", notes: "VD 6/6 VS 6/6" },
    { name: "THT Kanan", status: "abnormal", notes: "Serumen" },
    { name: "THT Kiri", status: "abnormal", notes: "Chonca hipertropi + serumen" },
    { name: "Tonsil", status: "normal", notes: "Post Op Amandel" },
    { name: "Gigi", status: "abnormal", notes: "Kalkulus" },
    { name: "Kulit", status: "abnormal", notes: "Stretch mark, scar, hipopigmentasi" },
    { name: "Extremitas Atas", status: "abnormal", notes: "Tremor ringan" },
    { name: "Extremitas Bawah", status: "abnormal", notes: "Varises + X been" }
  ],

  labs: [
    {
      name: "LDL",
      value: 133,
      unit: "mg/dl",
      status: "high"
    }
  ],

  diagnoses: [
    "Serumen",
    "Chonca Hipertropi",
    "Kalkulus",
    "Acne sedang",
    "Varises"
  ],

  recommendations: [
    "Konsul THT",
    "Konsul Gigi",
    "Konsul Kulit",
    "Konsul Penyakit Dalam"
  ]
}