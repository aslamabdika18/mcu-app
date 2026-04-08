// app/api/test/route.ts
import { db } from "@/lib/db"

export async function GET() {
  try {
    const result = await db.$queryRaw`SELECT 1`
    
    return Response.json({
      success: true,
      result
    })
  } catch (error) {
    console.error(error)

    return Response.json({
      success: false,
      error: "DB connection failed"
    }, { status: 500 })
  }
}