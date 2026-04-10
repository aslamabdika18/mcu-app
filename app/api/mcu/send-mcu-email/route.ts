import { Resend } from "resend"
import { PDFDocument, StandardFonts, rgb } from "pdf-lib"
import { supabase } from "@/lib/supabase"
import { MCUData } from "@/types/mcu"

const resend = new Resend(process.env.RESEND_API_KEY!)

export async function POST(req: Request) {
  try {
    const { email, name, token } = await req.json() as {
      email: string
      name: string
      token: string
    }

    // ======================
    // 🔥 ambil data
    const { data, error } = await supabase
      .from("mcu")
      .select("*")
      .eq("access_token", token)
      .single()

    if (error || !data) {
      return Response.json({ error: "Data tidak ditemukan" }, { status: 404 })
    }

    const mcu = data.data as MCUData

    // ======================
    // 🔥 BUAT PDF
    const pdfDoc = await PDFDocument.create()
    const page = pdfDoc.addPage([595, 842]) // A4

    const font = await pdfDoc.embedFont(StandardFonts.Helvetica)

    let y = 800

    const drawText = (text: string, bold = false) => {
      page.drawText(text, {
        x: 50,
        y,
        size: 10,
        font,
        color: rgb(0, 0, 0),
      })
      y -= 15
    }

    drawText("HASIL MEDICAL CHECK UP")
    y -= 10

    drawText(`Nama: ${mcu.identitas.nama}`)
    drawText(`TTL: ${mcu.identitas.ttl}`)
    drawText(`Alamat: ${mcu.identitas.alamat}`)
    drawText(`No HP: ${mcu.identitas.noHp}`)

    y -= 10
    drawText("KESIMPULAN:")

    mcu.kesimpulan.forEach((k) => {
      drawText(`- ${k}`)
    })

    y -= 10
    drawText("SARAN:")

    mcu.saran.forEach((s) => {
      drawText(`- ${s}`)
    })

    const pdfBytes = await pdfDoc.save()

    // ======================
    // 🔥 KIRIM EMAIL
    await resend.emails.send({
      from: "MCU <no-reply@anakitproject.com>", // 🔥 FIXED
      to: email,
      subject: "Hasil MCU Anda",
      html: `
        <h2>Halo ${name}</h2>
        <p>Hasil MCU Anda terlampir dalam PDF.</p>
        <p>
          Lihat juga online:
          <a href="${process.env.NEXT_PUBLIC_BASE_URL}/patients/result/${token}">
            Klik di sini
          </a>
        </p>
      `,
      attachments: [
        {
          filename: "hasil-mcu.pdf",
          content: Buffer.from(pdfBytes),
        },
      ],
    })

    return Response.json({ success: true })

  } catch (err) {
    console.error("EMAIL ERROR:", err)

    return Response.json(
      { error: "Gagal mengirim email" },
      { status: 500 }
    )
  }
}