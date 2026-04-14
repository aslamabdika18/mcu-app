import { supabaseServer } from "@/lib/supabase-server"
import McuResultView from "@/components/McuResultView"

export default async function Page({
    params,
}: {
    params: Promise<{ token: string }>
}) {
    // 🔥 WAJIB
    const { token } = await params

    const { data, error } = await supabaseServer
        .from("mcu")
        .select("*")
        .eq("access_token", token)

    const record = data?.[0]

    if (error || !record) {
        console.error("ERROR:", error)
        console.error("DATA:", data)
        console.log("TOKEN:", token)

        return <div>Data tidak ditemukan</div>
    }

    return (
        <div className="bg-white">
            <div className="w-[210mm] mx-auto px-[12mm] py-[8mm] leading-tight">
                <McuResultView record={record} />
            </div>
        </div>
    )
}