import React from 'react'
import { Card,CardContent } from '../ui/card'
import { Clock, ChevronRight } from "lucide-react"
import Link from 'next/link'
import Image from 'next/image'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { Car1,Car2,Car3 } from '../../public/index'

function Featured() {
  return (
    <section className="py-16 md:py-24">
    <div className="container">
      <div className="flex justify-between items-center mb-12">
        <h2 className="text-3xl font-bold">Featured Auctions</h2>
        <Link href="#" className="text-green-600 hover:text-green-700 flex items-center gap-1">
          View all <ChevronRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Auction Item 1 */}
        <Card className="overflow-hidden">
          <div className="relative">
            <Image
              src={Car1}
              width={500}
              height={300}
              alt="1967 Porsche 911"
              className="w-full h-[200px] object-cover"
            />
            <Badge className="absolute top-3 right-3 bg-green-600">Active</Badge>
          </div>
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-xl font-bold">1967 Porsche 911</h3>
              <div className="flex items-center gap-1 text-green-600">
                <Clock className="h-4 w-4" />
                <span className="text-sm font-medium">2d 14h</span>
              </div>
            </div>
            <p className="text-muted-foreground mb-4">Fully restored, numbers matching, concours condition.</p>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">Current Bid</p>
                <p className="text-xl font-bold">$135,000</p>
              </div>
              <Button className="bg-green-600 hover:bg-green-700">Bid Now</Button>
            </div>
          </CardContent>
        </Card>

        {/* Auction Item 2 */}
        <Card className="overflow-hidden">
          <div className="relative">
            <Image
              src={Car2}
              width={500}
              height={300}
              alt="1955 Mercedes-Benz 300SL"
              className="w-full h-[200px] object-cover"
            />
            <Badge className="absolute top-3 right-3 bg-green-600">Active</Badge>
          </div>
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-xl font-bold">1955 Mercedes-Benz 300SL</h3>
              <div className="flex items-center gap-1 text-green-600">
                <Clock className="h-4 w-4" />
                <span className="text-sm font-medium">4d 6h</span>
              </div>
            </div>
            <p className="text-muted-foreground mb-4">
              Gullwing model, silver with red interior, documented history.
            </p>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">Current Bid</p>
                <p className="text-xl font-bold">$1,250,000</p>
              </div>
              <Button className="bg-green-600 hover:bg-green-700">Bid Now</Button>
            </div>
          </CardContent>
        </Card>

        {/* Auction Item 3 */}
        <Card className="overflow-hidden">
          <div className="relative">
            <Image
              src={Car3}
              width={500}
              height={300}
              alt="1963 Jaguar E-Type"
              className="w-full h-[200px] object-cover"
            />
            <Badge className="absolute top-3 right-3 bg-green-600">Active</Badge>
          </div>
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-xl font-bold">1963 Jaguar E-Type</h3>
              <div className="flex items-center gap-1 text-green-600">
                <Clock className="h-4 w-4" />
                <span className="text-sm font-medium">1d 8h</span>
              </div>
            </div>
            <p className="text-muted-foreground mb-4">
              Series 1 roadster, British racing green, original engine.
            </p>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">Current Bid</p>
                <p className="text-xl font-bold">$225,000</p>
              </div>
              <Button className="bg-green-600 hover:bg-green-700">Bid Now</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  </section>
  )
}

export default Featured
