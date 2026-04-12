export type Status = "Normal" | "Abnormal"

export interface PemeriksaanItem {
  status: Status
  keterangan: string
}

export interface MCUData {
  identitas: {
    nama: string
    jenisKelamin: string
    ttl: string
    alamat: string
    noHp: string
    agama: string
    bbTb: string
    golDarah: string
  }

  tandaVital: {
    tekananDarah: string
    nadi: string
    respirasi: string
    suhu: string
  }

  pemeriksaanFisik: {
    kepala: PemeriksaanItem
    wajah: PemeriksaanItem
    mata: PemeriksaanItem
    thtKanan: PemeriksaanItem
    thtKiri: PemeriksaanItem
    tonsil: PemeriksaanItem
    thorax: PemeriksaanItem
    gigi: PemeriksaanItem
    thyroid: PemeriksaanItem
    jantung: PemeriksaanItem
    paru: PemeriksaanItem
    abdomen: PemeriksaanItem
    kulit: PemeriksaanItem
    perianal: PemeriksaanItem
    genitalia: PemeriksaanItem
    extremitasAtas: PemeriksaanItem
    extremitasBawah: PemeriksaanItem
  }

  kesimpulan: string[]
  saran: string[]

  doctorName?: string
}

export interface CreateMcuDTO {
  nik: string
  ttl: string
  email: string
  data: MCUData
}