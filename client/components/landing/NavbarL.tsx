"use client"
import React from 'react'
import Link from 'next/link'
import { Button } from '../ui/button'
import { useState } from 'react'
import { Clock, Award, Shield, Zap, ChevronRight, Instagram, Twitter, Facebook, Menu, X } from "lucide-react"

function NavBarL() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  return (
    <section className='px-4 md:px-8 lg:px-12 xl:px-16 2xl:px-20'>
            <header className="sticky top-0 z-40 w-full border-b bg-white">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-neutral-900">Biddify</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="#" className="text-sm font-medium hover:text-green-600 transition-colors">
              Auctions
            </Link>
            <Link href="#" className="text-sm font-medium hover:text-green-600 transition-colors">
              How It Works
            </Link>
            <Link href="#" className="text-sm font-medium hover:text-green-600 transition-colors">
              About
            </Link>
            <Link href="#" className="text-sm font-medium hover:text-green-600 transition-colors">
              Contact
            </Link>
          </nav>
          <div className="hidden md:flex items-center gap-4">
            <Link href="#" className="text-sm font-medium hover:text-green-600 transition-colors">
              Sign In
            </Link>
            <Button className="bg-green-600 hover:bg-green-700">Register</Button>
          </div>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute w-full bg-white border-b">
            <div className="container py-4 flex flex-col gap-4">
              <Link
                href="#"
                className="text-sm font-medium py-2 hover:text-green-600 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Auctions
              </Link>
              <Link
                href="#"
                className="text-sm font-medium py-2 hover:text-green-600 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                How It Works
              </Link>
              <Link
                href="#"
                className="text-sm font-medium py-2 hover:text-green-600 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="#"
                className="text-sm font-medium py-2 hover:text-green-600 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
              <div className="flex flex-col gap-3 pt-2 border-t">
                <Link
                  href="#"
                  className="text-sm font-medium py-2 hover:text-green-600 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign In
                </Link>
                <Button className="bg-green-600 hover:bg-green-700 w-full" onClick={() => setMobileMenuOpen(false)}>
                  Register
                </Button>
              </div>
            </div>
          </div>
        )}
      </header>
    </section>
  )
}

export { NavBarL }
