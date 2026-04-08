// app/api/mcu/route.ts
import { createMcu } from "@/lib/mcu"
import { CreateMcuDTO } from "@/types/mcu"

export async function POST(req: Request) {
  try {
    const body: CreateMcuDTO = await req.json()

    // sanity check minimal (optional tapi gue sarankan)
    if (!body.nik || !body.ttl || !body.email) {
      return Response.json(
        { error: "Invalid payload" },
        { status: 400 }
      )
    }

    const result = await createMcu(body)

    return Response.json(result)
  } catch (error) {
    console.error(error)

    return Response.json(
      { error: "Failed to create MCU" },
      { status: 500 }
    )
  }
}