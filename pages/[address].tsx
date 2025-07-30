import BubbleMap from '@/components/BubbleMap'
import { BubbleIcon } from '@/components/BubbleIcon'
import WalletInput from '@/components/WalletInput'
import { WalletData as IWalletData } from '@/types/wallet'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useRef, useState } from 'react'

export default function WalletPage() {
  const router = useRouter()
  const { address } = router.query
  const [walletData, setWalletData] = useState<IWalletData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fetchingRef = useRef<string | null>(null) // Track which address we're currently fetching

  const fetchWalletData = useCallback(async (walletAddress: string) => {
    // Prevent duplicate calls for the same address
    if (fetchingRef.current === walletAddress || loading) {
      return
    }

    fetchingRef.current = walletAddress
    setLoading(true)
    setError(null)
    setWalletData(null)

    try {
      const response = await fetch(`/api/wallet/${walletAddress}`)
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
      fetchingRef.current = null
    }
  }, [loading])

  const handleWalletSubmit = useCallback(async (newAddress: string) => {
    // Navigate to the new address URL
    await router.push(`/${newAddress}`)
  }, [router])

  // Fetch data when address changes
  useEffect(() => {
    if (router.isReady && address && typeof address === 'string') {
      fetchWalletData(address)
    }
  }, [router.isReady, address]) // Removed fetchWalletData from dependencies to prevent re-runs

  // Generate dynamic page title and meta description
  const pageTitle = walletData 
    ? `${walletData?.address?.slice(0, 8)}... | Solana Bubbles`
    : address 
    ? `${String(address)?.slice(0, 8)}... | Solana Bubbles`
    : 'Solana Bubbles | Interactive Address Network Visualization'
  
  const pageDescription = walletData
    ? `Explore network connections for Solana address ${walletData.address} with ${walletData.relatedAccounts?.length || 0} related accounts`
    : `Visualize network connections for Solana address ${address}`

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/favicon.svg" />
      </Head>

      <main className="min-h-screen relative overflow-hidden bg-gray-900">
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-4 mb-4">
              <BubbleIcon size={48} className="animate-pulse-slow" />
              <button 
                onClick={() => router.push('/')}
                className="text-3xl md:text-5xl font-bold hover:opacity-80 transition-opacity"
              >
                <span className="gradient-text">SOLANA</span>
                <span className="text-white"> BUBBLES</span>
              </button>
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
              defaultValue={typeof address === 'string' ? address : ''}
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

          {/* Back to Home */}
          {!loading && (
            <div className="text-center mt-8">
              <button
                onClick={() => router.push('/')}
                className="text-gray-400 hover:text-brand-blue transition-colors text-sm inline-flex items-center space-x-2"
              >
                <BubbleIcon size={16} />
                <span>← Back to Home</span>
              </button>
            </div>
          )}
        </div>
      </main>
    </>
  )
} 