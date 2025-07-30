import BubbleMap from '@/components/BubbleMap'
import { BubbleIcon } from '@/components/BubbleIcon'
import WalletInput from '@/components/WalletInput'
import { WalletData as IWalletData } from '@/types/wallet'
import Head from 'next/head'
import { useCallback, useState } from 'react'

export default function Home() {
  const [showHomescreen, setShowHomescreen] = useState(true)
  const [walletData, setWalletData] = useState<IWalletData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleWalletSubmit = useCallback(async (address: string) => {
    setLoading(true)
    setError(null)
    setWalletData(null)

    try {
      const response = await fetch(`/api/wallet/${address}`)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch wallet data')
      }

      const walletData = data.data || data
      if (!walletData.isValid) {
        throw new Error('Invalid Solana address - wallet does not exist or is malformed')
      }

      setWalletData(walletData)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while fetching wallet data')
    } finally {
      setLoading(false)
    }
  }, [])

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

      <main className="min-h-screen relative overflow-hidden">
        {/* Homescreen */}
        {showHomescreen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 transition-all duration-1000">
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

            {/* Error Display */}
            {error && (
              <div className="mb-8">
                <div className="glass-card p-4 border-brand-red/50 bg-brand-red/5">
                  <div className="flex items-center space-x-3">
                    <div className="w-5 h-5 bg-brand-red rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xs font-bold">!</span>
                    </div>
                    <div>
                      <p className="text-brand-red font-medium text-sm">Validation Error</p>
                      <p className="text-red-300 text-sm">{error}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Loading State */}
            {loading && (
              <div className="mb-8">
                <div className="glass-card p-6 text-center">
                  <div className="flex justify-center mb-3">
                    <BubbleIcon size={32} className="animate-pulse" />
                  </div>
                  <p className="text-gray-300 text-sm">Mapping address network...</p>
                </div>
              </div>
            )}

            {/* Bubble Map Visualization */}
            {walletData && (
              <BubbleMap data={walletData} />
            )}

            {/* Instructions */}
            {!walletData && !loading && !error && (
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
            )}
          </div>
        </div>
      </main>
    </>
  )
} 