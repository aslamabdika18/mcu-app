import { supabaseServer } from "@/lib/supabase-server"
import McuResultView from "@/components/McuResultView"

export default async function Page({
    params,
}: {
    params: { token: string }
}) {

    const { data, error } = await supabaseServer
        .from("mcu")
        .select("*")
        .eq("access_token", params.token)

    const record = data?.[0]

    if (error || !record) {
        console.error("ERROR:", error)
        console.error("DATA:", data)
        return <div>Data tidak ditemukan</div>
    }

    return (
        <div className="bg-white">
            <div className="w-[210mm] min-h-[297mm] mx-auto p-[20mm]">
                <McuResultView record={record} />
            </div>
        </div>
    )
}