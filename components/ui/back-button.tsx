"use client"

import { useRouter } from "next/navigation"
import { ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export function BackButton() {
  const router = useRouter()

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => router.back()}
      className="rounded-full hover:bg-muted"
      title="Go back"
    >
      <ChevronLeft className="w-5 h-5" />
    </Button>
  )
}
