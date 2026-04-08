// lib/utils/mcu-status.ts

export function getMcuStatusLabel(status: string) {
  switch (status) {
    case "none":
      return "Belum MCU"
    case "draft":
      return "Draft"
    case "submitted":
      return "Menunggu Review"
    case "approved":
      return "Selesai"
    default:
      return "-"
  }
}

export function getMcuStatusStyle(status: string) {
  switch (status) {
    case "none":
      return "bg-gray-100 text-gray-600 border border-gray-200"
    case "draft":
      return "bg-yellow-100 text-yellow-800 border border-yellow-200"
    case "submitted":
      return "bg-blue-100 text-blue-800 border border-blue-200"
    case "approved":
      return "bg-green-100 text-green-800 border border-green-200"
    default:
      return ""
  }
}