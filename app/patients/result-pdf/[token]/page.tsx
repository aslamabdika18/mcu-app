import { supabaseServer } from "@/lib/supabase-server"
import McuResultView from "@/components/McuResultView"

export default async function Page({
    params,
}: {
    params: { token: string }
}) {

    const { data: record, error } = await supabaseServer
        .from("mcu")
        .select("*")
        .eq("access_token", params.token)
        .single()

    if (error || !record) {
        console.error("ERROR PDF:", error)
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