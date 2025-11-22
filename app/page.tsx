import { Button } from "@/components/ui/button";
import getUsers from "@/lib/helper/getUser";
import { ArrowRight, Check, LinkIcon } from "lucide-react";

import Link from "next/link";
   const features = [
    "Unlimited links",
    "Custom themes & colors",
    "Analytics dashboard",
    "Mobile responsive",
    "Social media integration",
    "Easy to use interface"
  ];
export default  async function Home() {


  return (
   <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      {/* Navbar */}
      <nav className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <LinkIcon className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-bold text-xl">LinkHub</span>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/login">
                <Button variant="ghost">Sign In</Button>
              </Link>
              <Link href="/register">
                <Button>Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center space-y-8 max-w-3xl mx-auto">
          <h1 className="text-5xl sm:text-6xl font-bold tracking-tight">
            One link for
            <span className="block text-primary mt-2">everything you share</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Share all your social media profiles, websites, and content in one beautiful place. 
            Perfect for creators, businesses, and anyone who wants to connect with their audience.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/register">
              <Button size="lg" className="text-lg px-8 shadow-lg">
                Start for Free
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link href="/johndoe">
              <Button size="lg" variant="outline" className="text-lg px-8">
                View Demo
              </Button>
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mt-24 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <div 
              key={feature}
              className="flex items-center gap-3 p-4 rounded-xl bg-card border shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                <Check className="w-5 h-5 text-primary" />
              </div>
              <span className="font-medium">{feature}</span>
            </div>
          ))}
        </div>

        {/* Preview Section */}
        <div className="mt-24">
          <h2 className="text-3xl font-bold text-center mb-12">Beautiful on every device</h2>
          <div className="relative max-w-4xl mx-auto">
            <div className="aspect-video bg-gradient-to-br from-cyan-100 via-blue-100 to-purple-100 dark:from-slate-800 dark:via-slate-700 dark:to-slate-800 rounded-3xl shadow-2xl p-8 flex items-center justify-center">
              <div className="text-center">
                <div className="w-24 h-24 bg-white dark:bg-slate-900 rounded-full mx-auto mb-4 shadow-lg" />
                <div className="space-y-3">
                  <div className="h-12 bg-white dark:bg-slate-900 rounded-full max-w-xs mx-auto shadow-md" />
                  <div className="h-12 bg-white dark:bg-slate-900 rounded-full max-w-xs mx-auto shadow-md" />
                  <div className="h-12 bg-white dark:bg-slate-900 rounded-full max-w-xs mx-auto shadow-md" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-24 text-center space-y-6">
          <h2 className="text-4xl font-bold">Ready to get started?</h2>
          <p className="text-xl text-muted-foreground">
            Join thousands of creators sharing their content with LinkHub
          </p>
          <Link href="/register">
            <Button size="lg" className="text-lg px-8 shadow-lg">
              Create Your LinkHub
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t mt-24 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-muted-foreground">
            <p>&copy; 2025 LinkHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
