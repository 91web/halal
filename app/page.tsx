"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle,
  Shield,
  Search,
  Clock,
  BookOpen,
  Users,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { Suspense } from "react";

export default function LandingPage() {
  const [ingredient, setIngredient] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleSearch = async () => {
    if (!ingredient.trim()) {
      toast.error("Please enter an ingredient");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ingredient }),
      });

      const data = await response.json();

      if (response.ok) {
        setResult(data);
        toast.success("Analysis complete!");
      } else {
        toast.error(data.error || "Analysis failed");
      }
    } catch (error) {
      toast.error("Failed to analyze ingredient");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-muted/20 to-background">
      <Suspense fallback={null}>
        {/* Header */}
        <header className="border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 sticky top-0 z-50">
          <div className="container mx-auto px-4 h-16 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Shield className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold text-foreground">
                HalalCheck AI
              </span>
            </div>
            <nav className="flex items-center gap-4">
              <Link href="/login">
                <Button variant="ghost" className="text-foreground">
                  Login
                </Button>
              </Link>
              <Link href="/register">
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                  Get Started
                </Button>
              </Link>
            </nav>
          </div>
        </header>

        {/* Hero Section */}
        <section className="container mx-auto px-4 py-20 text-center">
          <Badge
            className="mb-4 bg-primary/10 text-primary border-primary/20"
            variant="outline"
          >
            Powered by Advanced AI
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 text-balance">
            Instant Halal Compliance Intelligence
          </h1>
          <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto text-pretty leading-relaxed">
            Verify ingredients with precision using AI-powered analysis backed
            by Islamic jurisprudence and international food safety standards.
          </p>

          {/* Guest Search Box */}
          <Card className="max-w-2xl mx-auto shadow-lg border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <Search className="h-5 w-5 text-primary" />
                Try It Now - No Account Required
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Enter any ingredient to get instant Halal compliance analysis
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="e.g., Wine, Gelatin, Sugar cane..."
                  value={ingredient}
                  onChange={(e) => setIngredient(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  className="flex-1 bg-white/90 border-2 border-primary/50 focus:border-primary focus:ring-2 focus:ring-primary/30 text-foreground h-36 px-4 text-lg shadow-sm transition-colors"
                />
                <Button
                  onClick={handleSearch}
                  disabled={loading}
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  {loading ? "Analyzing..." : "Check"}
                </Button>
              </div>

              {result && (
                <Card className="border-border/50 bg-muted/30">
                  <CardContent className="pt-6 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-foreground">
                        Status:
                      </span>
                      <Badge
                        className={
                          result.status === "Halal"
                            ? "bg-green-500/10 text-green-700 border-green-500/20"
                            : result.status === "Haram"
                            ? "bg-red-500/10 text-red-700 border-red-500/20"
                            : "bg-yellow-500/10 text-yellow-700 border-yellow-500/20"
                        }
                      >
                        {result.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {result.reason}
                    </p>
                    {result.limited && (
                      <div className="mt-4 p-3 bg-primary/5 border border-primary/20 rounded-md">
                        <p className="text-sm text-primary font-medium">
                          🔒 {result.message}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>
        </section>

        {/* Benefits Section */}
        <section className="container mx-auto px-4 py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
              Why Register with HalalCheck AI?
            </h2>
            <p className="text-muted-foreground text-lg text-pretty">
              Unlock premium features for comprehensive Halal compliance
              management
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <Card className="border-border/50 bg-card hover:shadow-lg transition-shadow">
              <CardHeader>
                <Clock className="h-10 w-10 text-primary mb-3" />
                <CardTitle className="text-foreground">
                  Complete Analysis History
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Track all your ingredient searches with timestamps, status
                  tracking, and instant access to past results.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/50 bg-card hover:shadow-lg transition-shadow">
              <CardHeader>
                <BookOpen className="h-10 w-10 text-primary mb-3" />
                <CardTitle className="text-foreground">
                  Detailed Evidence & Sources
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Access full citations from Islamic scholars, JAKIM standards,
                  and international food science research.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/50 bg-card hover:shadow-lg transition-shadow">
              <CardHeader>
                <Users className="h-10 w-10 text-primary mb-3" />
                <CardTitle className="text-foreground">
                  Secure Personal Dashboard
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Your data is completely confidential with enterprise-grade
                  security and personalized compliance tracking.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Link href="/register">
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2"
              >
                Create Free Account
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </section>

        {/* Trust Section */}
        <section className="bg-muted/30 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <CheckCircle className="h-16 w-16 text-primary mx-auto" />
              <h3 className="text-2xl font-bold text-foreground">
                Trusted by Food Industry Professionals Worldwide
              </h3>
              <p className="text-muted-foreground text-lg leading-relaxed text-pretty">
                Our AI engine is trained on comprehensive Islamic dietary law,
                international food standards (GSO, JAKIM, IFANCA), and
                continuously updated with the latest halal certification
                guidelines.
              </p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t bg-background py-8">
          <div className="container mx-auto px-4 text-center text-muted-foreground text-sm">
            <p>
              &copy; 2026 HalalCheck AI. Built for the Global Halal Industry.
            </p>
            <p className="mt-2">
              Ensuring transparency, trust, and compliance in every ingredient.
            </p>
          </div>
        </footer>
      </Suspense>
    </div>
  );
}
