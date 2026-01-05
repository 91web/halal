"use client"

import type React from "react"

import { useState } from "react"
import { Search, Loader2, CheckCircle2, AlertCircle, Info } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface AnalysisResult {
  status: "Halal" | "Haram" | "Mushbooh"
  reason: string
  evidence: string
  health_notes: string
  confidence_score: number
}

export function AnalysisInput() {
  const [ingredient, setIngredient] = useState("")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<AnalysisResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!ingredient.trim()) return

    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ingredient }),
      })

      if (!response.ok) throw new Error("Analysis failed")

      const data = await response.json()
      setResult(data)
    } catch (err) {
      setError("Failed to analyze ingredient. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Halal":
        return <CheckCircle2 className="w-6 h-6 text-green-600" />
      case "Haram":
        return <AlertCircle className="w-6 h-6 text-red-600" />
      default:
        return <Info className="w-6 h-6 text-yellow-600" />
    }
  }

  const getStatusStyles = (status: string) => {
    switch (status) {
      case "Halal":
        return "border-green-200 bg-green-50"
      case "Haram":
        return "border-red-200 bg-red-50"
      default:
        return "border-yellow-200 bg-yellow-50"
    }
  }

  return (
    <div className="space-y-6">
      <Card className="shadow-lg border-slate-200">
        <CardContent className="pt-6">
          <form onSubmit={handleAnalyze} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <Input
                placeholder="Enter ingredient name (e.g. Lecithin, Carmine...)"
                className="pl-10 h-12 text-lg border-slate-300 focus:border-green-500 focus:ring-green-500"
                value={ingredient}
                onChange={(e) => setIngredient(e.target.value)}
              />
            </div>
            <Button
              type="submit"
              size="lg"
              disabled={loading || !ingredient.trim()}
              className="bg-green-600 hover:bg-green-700 text-white px-8 transition-all duration-200"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Analyze"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {result && (
        <Card
          className={`overflow-hidden border-2 animate-in fade-in slide-in-from-top-4 ${getStatusStyles(result.status)}`}
        >
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="mt-1">{getStatusIcon(result.status)}</div>
              <div className="space-y-4 flex-1">
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                    {result.status} Status
                    <span className="text-sm font-normal text-slate-500">
                      (Confidence: {(result.confidence_score * 100).toFixed(0)}%)
                    </span>
                  </h3>
                  <p className="text-slate-700 mt-2 leading-relaxed">{result.reason}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-200">
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold text-slate-900 uppercase tracking-wider flex items-center gap-1">
                      <Shield className="w-4 h-4 text-slate-500" />
                      Evidence & Sources
                    </h4>
                    <p className="text-sm text-slate-600 italic">{result.evidence}</p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold text-slate-900 uppercase tracking-wider flex items-center gap-1">
                      <Activity className="w-4 h-4 text-slate-500" />
                      Health & Nutrition
                    </h4>
                    <p className="text-sm text-slate-600">{result.health_notes}</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

import { Shield, Activity } from "lucide-react"
