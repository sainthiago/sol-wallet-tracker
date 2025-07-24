import { useState, useCallback } from 'react'
import Head from 'next/head'
import WalletInput from '@/components/WalletInput'
import WalletData from '@/components/WalletData'
import { WalletData as IWalletData } from '@/types/wallet'

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
        throw new Error(data?.error || 'Failed to fetch wallet data')
      }

      setWalletData(data?.data || data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while fetching wallet data')
    } finally {
      setLoading(false)
    }
  }, [])

  return (
    <>
      <Head>
        <title>Solana Wallet Tracker | Track Any Sol Address 🚀</title>
        <meta name="description" content="Track Solana Wallets" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen relative overflow-hidden">
        {/* Background animations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-32 h-32 bg-solana-purple/20 rounded-full blur-xl animate-pulse-slow"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-solana-green/20 rounded-full blur-xl animate-pulse-slow delay-1000"></div>
          <div className="absolute bottom-20 left-1/3 w-28 h-28 bg-solana-blue/20 rounded-full blur-xl animate-pulse-slow delay-2000"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 py-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-7xl font-bold mb-4">
              <span className="neon-text">SOL</span>
              <span className="text-white"> TRACKER</span>
            </h1>
            <p className="text-gray-300 text-lg md:text-xl font-mono">
              Track any Solana wallet like a true degen 🚀
            </p>
            <div className="flex justify-center space-x-2 mt-4">
              <span className="inline-block w-2 h-2 bg-neon-green rounded-full animate-pulse"></span>
              <span className="inline-block w-2 h-2 bg-neon-pink rounded-full animate-pulse delay-200"></span>
              <span className="inline-block w-2 h-2 bg-neon-cyan rounded-full animate-pulse delay-400"></span>
            </div>
          </div>

          {/* Wallet Input */}
          <div className="max-w-2xl mx-auto mb-8">
            <WalletInput 
              onSubmit={handleWalletSubmit} 
              loading={loading} 
            />
          </div>

          {/* Error Display */}
          {error && (
            <div className="max-w-2xl mx-auto mb-8">
              <div className="glass-card p-6 border-red-500/50">
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">!</span>
                  </div>
                  <p className="text-red-300 font-mono">{error}</p>
                </div>
              </div>
            </div>
          )}

          {/* Wallet Data Display */}
          {walletData && (
            <div className="max-w-6xl mx-auto">
              <WalletData data={walletData} />
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <div className="max-w-2xl mx-auto">
              <div className="glass-card p-8 text-center">
                <div className="animate-spin w-8 h-8 border-2 border-solana-purple border-t-transparent rounded-full mx-auto mb-4"></div>
                <p className="text-gray-300 font-mono">Scanning the blockchain...</p>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  )
} 