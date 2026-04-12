import { Resend } from "resend"
import { supabase } from "@/lib/supabase"

export async function POST(req: Request) {
  try {
    const { email, name, token } = await req.json() as {
      email: string
      name: string
      token: string
    }

    const apiKey = process.env.RESEND_API_KEY
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

    if (!apiKey) throw new Error("RESEND_API_KEY belum diset")
    if (!baseUrl) throw new Error("BASE_URL belum diset")

    const resend = new Resend(apiKey)

    // CEK DATA
    const { data, error } = await supabase
      .from("mcu")
      .select("id")
      .eq("access_token", token)
      .single()

    if (error || !data) {
      return Response.json(
        { error: "Data tidak ditemukan" },
        { status: 404 }
      )
    }

    // URL RESULT
    const resultUrl = `${baseUrl}/patients/result/${token}`

    // QR URL (VALID)
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(resultUrl)}`

    // SEND EMAIL
    await resend.emails.send({
      from: "MCU <no-reply@anakitproject.com>",
      to: email,
      subject: "Hasil Medical Check Up Anda",

      headers: {
        "X-Entity-Ref-ID": token,
      },

      html: `
        <div style="font-family: Arial; max-width:500px; margin:auto; line-height:1.6;">
          
          <h2>Halo ${name},</h2>

          <p>
            Hasil Medical Check Up Anda sudah tersedia.
          </p>

          <p>
            <a href="${resultUrl}" 
              style="display:inline-block;padding:10px 16px;background:#2563eb;color:#fff;text-decoration:none;border-radius:6px;">
              Lihat Hasil MCU
            </a>
          </p>

          <p style="margin-top:20px;">
            Atau scan QR berikut:
          </p>

          <div style="margin:20px 0;">
            <img src="${qrUrl}" width="180" height="180" />
          </div>

          <p style="font-size:12px;color:#666;">
            Jika tombol tidak berfungsi, buka link berikut:
          </p>

          <p style="word-break:break-all;color:#555;">
            ${resultUrl}
          </p>

        </div>
      `,
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