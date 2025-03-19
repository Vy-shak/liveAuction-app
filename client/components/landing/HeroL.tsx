import React from 'react'
import Image from 'next/image'
import { Button } from '../ui/button'
import { HeroImg1 } from '../../public/index'
import Link from 'next/link'

function HeroL() {
  return (
    <section>
      <section>
        <div className="container flex flex-col lg:flex-row-reverse items-center gap-8 py-12 md:py-24">
          <div className="lg:w-1/2">
            <Image
              src={HeroImg1}
              width={900}
              height={800}
              alt="Classic cars collection"
              className="rounded-lg shadow-lg object-cover"
              priority
            />
          </div>
          <div className="flex flex-col gap-4 lg:w-1/2">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Discover and Bid on Timeless Classics
            </h1>
            <p className="text-lg text-muted-foreground">
              The premier destination for collectors and enthusiasts to find rare and exceptional vintage vehicles.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <Link href={"/verify"}>
                <Button size="lg" className="bg-green-600 hover:bg-green-700">
                  Explore Auctions
                </Button>
              </Link>
              <Link href={"/verify"}>
              <Button size="lg" variant="outline">
                How It Works
              </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </section>
  )
}

export default HeroL
