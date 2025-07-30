import { BubbleIcon } from '@/components/BubbleIcon'
import WalletInput from '@/components/WalletInput'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useCallback, useState } from 'react'

export default function Home() {
  const router = useRouter()
  const [showHomescreen, setShowHomescreen] = useState(true)
  const [loading, setLoading] = useState(false)

  const handleWalletSubmit = useCallback(async (address: string) => {
    setLoading(true)
    // Navigate to the wallet page
    await router.push(`/${address}`)
    setLoading(false)
  }, [router])

  const handleHomescreenClick = () => {
    setShowHomescreen(false)
  }

  return (
    <>
      <Head>
        <title>Solana Bubbles | Interactive Address Network Visualization</title>
        <meta name="description" content="Visualize Solana address networks with interactive bubble maps" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/favicon.svg" />
      </Head>

      <main className="min-h-screen relative overflow-hidden bg-gray-900 ">
        {/* Homescreen */}
        {showHomescreen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center transition-all duration-1000">
            <div className="text-center">
              <div 
                onClick={handleHomescreenClick}
                className="cursor-pointer transform hover:scale-105 transition-transform duration-300"
              >
                <BubbleIcon 
                  size={120} 
                  className="mx-auto animate-pulse-slow drop-shadow-2xl hover:drop-shadow-[0_0_30px_rgba(59,130,246,0.5)]" 
                />
              </div>
              
              <div className="mt-8 space-y-4">
                <h1 className="text-4xl md:text-6xl font-bold">
                  <span className="gradient-text">SOLANA</span>
                  <span className="text-white"> BUBBLES</span>
                </h1>
                
                <p className="text-gray-400 text-lg max-w-md mx-auto">
                  Explore Solana address connections through interactive bubble maps
                </p>
                
                <div className="flex items-center justify-center space-x-2 text-gray-500 text-sm animate-bounce">
                  <BubbleIcon size={16} />
                  <span>Click the bubble to start</span>
                  <BubbleIcon size={16} />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Main App */}
        <div className={`transition-all duration-1000 ${showHomescreen ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
          <div className="container mx-auto px-4 py-8 max-w-6xl">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center space-x-4 mb-4">
                <BubbleIcon size={48} className="animate-pulse-slow" />
                <h1 className="text-3xl md:text-5xl font-bold">
                  <span className="gradient-text">SOLANA</span>
                  <span className="text-white"> BUBBLES</span>
                </h1>
                <BubbleIcon size={48} className="animate-pulse-slow" />
              </div>
              <p className="text-gray-400 text-base md:text-lg">
                Explore Solana address connections through interactive bubble maps
              </p>
            </div>

            {/* Wallet Input */}
            <div className="max-w-xl mx-auto mb-8">
              <WalletInput
                onSubmit={handleWalletSubmit}
                loading={loading}
              />
            </div>

            {/* Instructions */}
            <div className="text-center">
              <div className="glass-card p-6 max-w-md mx-auto">
                <div className="flex items-center justify-center space-x-2 mb-3">
                  <BubbleIcon size={24} />
                  <h3 className="text-white font-medium">How it works</h3>
                  <BubbleIcon size={24} />
                </div>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Enter a Solana address to visualize its network connections.
                  Bubble sizes represent SOL volumes, colors indicate volume ranges.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
} 