import React from 'react'
import { Card,CardContent } from '../ui/card'
import Image from 'next/image'
import {  Award, Shield, Zap, } from "lucide-react"
import { Feature1,Feature2,Feature3 } from '../../public/index'

function Features() {
  return (
    <section className="bg-slate-50 py-16 md:py-24">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-12">Why Choose Biddify</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="border-none shadow-md overflow-hidden group transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <div className="h-48 overflow-hidden">
                  <Image
                    src={Feature1}
                    width={500}
                    height={300}
                    alt="Curated vintage car collection"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center gap-4">
                    <div className="p-3 rounded-full bg-green-100 group-hover:bg-green-200 transition-colors duration-300">
                      <Award className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-bold group-hover:text-green-600 transition-colors duration-300">
                      Curated Selection
                    </h3>
                    <p className="text-muted-foreground">
                      Every vehicle is carefully vetted for authenticity, quality, and historical significance.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-md overflow-hidden group transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <div className="h-48 overflow-hidden">
                  <Image
                    src={Feature2}
                    width={500}
                    height={300}
                    alt="Secure bidding process"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center gap-4">
                    <div className="p-3 rounded-full bg-green-100 group-hover:bg-green-200 transition-colors duration-300">
                      <Shield className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-bold group-hover:text-green-600 transition-colors duration-300">
                      Secure Bidding
                    </h3>
                    <p className="text-muted-foreground">
                      Our platform ensures transparent and secure transactions with buyer and seller protection.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-md overflow-hidden group transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <div className="h-48 overflow-hidden">
                  <Image
                     src={Feature3}
                    width={500}
                    height={300}
                    alt="Real-time auction updates"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center gap-4">
                    <div className="p-3 rounded-full bg-green-100 group-hover:bg-green-200 transition-colors duration-300">
                      <Zap className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-bold group-hover:text-green-600 transition-colors duration-300">
                      Real-Time Updates
                    </h3>
                    <p className="text-muted-foreground">
                      Get instant notifications on bids, outbids, and auction endings to never miss an opportunity.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
  )
}

export default Features
