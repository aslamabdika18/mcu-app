"use client"

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

            <form className="space-y-4">

              <div className="space-y-2">
                <Label>Email</Label>
                <Input
                  type="email"
                  placeholder="admin@email.com"
                />
              </div>

              <div className="space-y-2">
                <Label>Password</Label>
                <Input
                  type="password"
                  placeholder="********"
                />
              </div>

              <Button className="w-full">
                Login
              </Button>

            </form>

          </CardContent>

        </Card>

      </div>

    </div>

  )
}