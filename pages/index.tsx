import BubbleMap from '@/components/BubbleMap'
import WalletInput from '@/components/WalletInput'
import { WalletData as IWalletData } from '@/types/wallet'
import Head from 'next/head'
import { useCallback, useState } from 'react'

export default function Home() {
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
      
      // Check if wallet is valid
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

  console.log({ walletData })

  return (
    <>
      <Head>
        <title>Solana Address Network | Bubble Map Visualization</title>
        <meta name="description" content="Visualize Solana address networks with interactive bubble maps" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen">
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-5xl font-bold mb-3">
              <span className="gradient-text">ADDRESS</span>
              <span className="text-white"> NETWORK</span>
            </h1>
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
                <div className="animate-spin w-6 h-6 border-2 border-brand-blue border-t-transparent rounded-full mx-auto mb-3"></div>
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
                <h3 className="text-white font-medium mb-2">How it works</h3>
                                <p className="text-gray-400 text-sm leading-relaxed">
                  Enter a Solana address to visualize its network connections. 
                  Bubble sizes represent SOL volumes, colors indicate volume ranges.
                </p>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  )
} 