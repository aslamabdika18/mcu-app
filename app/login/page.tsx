"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card"

import { Activity } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email || !password) {
      toast.error("Email dan password wajib diisi")
      return
    }

    setLoading(true)

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    setLoading(false)

    if (error) {
      toast.error("Email atau password salah")
      return
    }

    toast.success("Login berhasil")

    // delay dikit biar toast keliatan
    setTimeout(() => {
      router.push("/admin")
    }, 800)
  }

  return (
    <div className="min-h-screen grid md:grid-cols-2">

      {/* Left Section */}
      <div className="hidden md:flex flex-col justify-center items-center bg-muted p-10">

        <div className="space-y-6 max-w-sm text-center">

          <Activity className="w-12 h-12 mx-auto" />

          <h1 className="text-3xl font-bold">
            MCU Management System
          </h1>

          <p className="text-muted-foreground">
            Sistem manajemen hasil Medical Check Up dengan
            verifikasi QR Code untuk memudahkan akses laporan kesehatan.
          </p>

        </div>

      </div>

      {/* Right Section */}
      <div className="flex items-center justify-center p-6">

        <Card className="w-full max-w-sm">

          <CardHeader>

            <CardTitle>
              Login Admin
            </CardTitle>

            <CardDescription>
              Masuk untuk mengelola data MCU
            </CardDescription>

          </CardHeader>

          <CardContent>

            <form className="space-y-4" onSubmit={handleLogin}>

              <div className="space-y-2">
                <Label>Email</Label>
                <Input
                  type="email"
                  placeholder="admin@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>Password</Label>
                <Input
                  type="password"
                  placeholder="********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <Button className="w-full" disabled={loading}>
                {loading ? "Loading..." : "Login"}
              </Button>

            </form>

          </CardContent>

        </Card>

      </div>

    </div>
  )
}