import Link from "next/link"
import { Button } from "@/components/ui/button"
import { QrCode, ShieldCheck } from "lucide-react"

export default function HomePage() {
  return (

    <div className="min-h-screen flex items-center justify-center bg-linear-to-b from-background to-muted/40 p-6">

      <div className="max-w-xl text-center space-y-6">

        <div className="flex justify-center">
          <QrCode className="h-12 w-12 text-primary" />
        </div>

        <h1 className="text-4xl font-bold tracking-tight">
          MCU Management System
        </h1>

        <p className="text-muted-foreground text-lg">
          Cek hasil Medical Check Up dengan mudah menggunakan
          QR Code verification yang aman dan cepat.
        </p>

        <div className="flex justify-center gap-4 flex-wrap">

          <Button size="lg" asChild>
            <Link href="/patients/verify">
              <ShieldCheck className="mr-2 h-4 w-4" />
              Cek Hasil MCU
            </Link>
          </Button>

          {/* <Button size="lg" variant="outline" asChild>
            <Link href="/login">
              Login Admin
            </Link>
          </Button> */}

        </div>

      </div>

    </div>
  )
}