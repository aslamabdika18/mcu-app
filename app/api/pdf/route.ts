import puppeteer from "puppeteer"

export async function POST(req: Request) {
    const { token } = await req.json()

    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/patients/result/${token}`

    const browser = await puppeteer.launch({
        headless: true, // ✅ FIX
    })

    const page = await browser.newPage()

    await page.goto(url, { waitUntil: "networkidle0" })

    const pdf = await page.pdf({
        format: "A4",
        printBackground: true,
    })

    await browser.close()

    // ✅ FIX TYPE
    const buffer = pdf.buffer.slice(
        pdf.byteOffset,
        pdf.byteOffset + pdf.byteLength
    ) as ArrayBuffer

    return new Response(buffer, {
        headers: {
            "Content-Type": "application/pdf",
            "Content-Disposition": "attachment; filename=hasil-mcu.pdf",
        },
    })
}