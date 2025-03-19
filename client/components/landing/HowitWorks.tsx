import React from 'react'

function HowitWorks() {
  return (
    <section className="bg-slate-50 py-16 md:py-24">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-green-600 text-white flex items-center justify-center text-xl font-bold mb-6">
                  1
                </div>
                <h3 className="text-xl font-bold mb-3">Register</h3>
                <p className="text-muted-foreground">
                  Create an account and complete verification to start bidding on vintage vehicles.
                </p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-green-600 text-white flex items-center justify-center text-xl font-bold mb-6">
                  2
                </div>
                <h3 className="text-xl font-bold mb-3">Bid</h3>
                <p className="text-muted-foreground">
                  Place bids on your favorite vehicles and receive real-time updates on auction status.
                </p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-green-600 text-white flex items-center justify-center text-xl font-bold mb-6">
                  3
                </div>
                <h3 className="text-xl font-bold mb-3">Win & Collect</h3>
                <p className="text-muted-foreground">
                  Complete payment securely through our platform and arrange for vehicle collection or delivery.
                </p>
              </div>
            </div>
          </div>
        </section>
  )
}

export default HowitWorks
