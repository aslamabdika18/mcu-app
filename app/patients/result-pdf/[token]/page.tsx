import { getMcuByToken } from "@/lib/mcu"
import McuResultView from "@/components/McuResultView"

export default async function Page({
    params,
}: {
    params: { token: string }
}) {
    const record = await getMcuByToken(params.token)

    if (!record) {
        return <div>Data tidak ditemukan</div>
    }

    return (
        <div className="bg-white">

            {/* A4 WRAPPER */}
            <div className="w-[210mm] min-h-[297mm] mx-auto p-[20mm]">
                <McuResultView record={record} />
            </div>

        </div>
    )
}