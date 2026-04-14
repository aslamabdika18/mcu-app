import puppeteer from "puppeteer-core"
import chromium from "@sparticuz/chromium"

export async function POST(req: Request) {
    const { token } = await req.json()

    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/patients/result-pdf/${token}`

    const browser = await puppeteer.launch({
        args: chromium.args,
        defaultViewport: null,
        executablePath: await chromium.executablePath(),
        headless: true,
    })

    const page = await browser.newPage()

    await page.goto(url, { waitUntil: "domcontentloaded" })

    const pdf = await page.pdf({
        format: "A4",
        printBackground: true,
    })

    await browser.close()

    const buffer = pdf.buffer.slice(
        pdf.byteOffset,
        pdf.byteOffset + pdf.byteLength
    ) as ArrayBuffer
    console.log("TOKEN API:", token)
    return new Response(buffer, {
        headers: {
            "Content-Type": "application/pdf",
            "Content-Disposition": "attachment; filename=hasil-mcu.pdf",
        },
    })
}