export default function CreatePatientPage() {
  return (
    <div className="max-w-xl">

      <h1 className="text-2xl font-bold mb-6">
        Tambah Pasien
      </h1>

      <form className="space-y-4 bg-white p-6 rounded-lg shadow">

        <input
          placeholder="Nama"
          className="w-full border p-3 rounded"
        />

        <input
          placeholder="NIK"
          className="w-full border p-3 rounded"
        />

        <input
          placeholder="Tanggal Lahir"
          type="date"
          className="w-full border p-3 rounded"
        />

        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Simpan
        </button>

      </form>

    </div>
  )
}