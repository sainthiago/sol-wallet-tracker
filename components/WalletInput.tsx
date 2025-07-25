import { Search, Wallet } from 'lucide-react'
import { FormEvent, useState } from 'react'

interface WalletInputProps {
    onSubmit: (address: string) => void
    loading: boolean
}

export default function WalletInput({ onSubmit, loading }: WalletInputProps) {
    const [address, setAddress] = useState('')


    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        onSubmit(address.trim())
    }

    const handleAddressChange = (value: string) => {
        setAddress(value)
    }

    return (
        <div className="w-full">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Wallet className='h-5 w-5 text-brand-blue' />
                    </div>

                    <input
                        type="text"
                        value={address}
                        onChange={(e) => handleAddressChange(e.target.value)}
                        placeholder="Enter Solana wallet address (e.g., 11111111111111111111111111111112)"
                        className="w-full pl-12 pr-4 py-4 font-mono text-sm md:text-base
              glass-card placeholder-gray-400 text-white
              focus:outline-none focus:ring-2 transition-all duration-300
                focus:ring-brand-blue border-gray-700"
                        disabled={loading}
                    />


                </div>


                <button
                    type="submit"
                    disabled={loading || !address.trim()}
                    className={`
            w-full py-4 px-6 rounded-xl font-mono font-semibold
            transition-all duration-300 flex items-center justify-center space-x-3
            ${loading || !address.trim()
                            ? 'bg-gray-700 text-gray-400 cursor-not-allowed border-gray-700'
                            : 'bg-gradient-to-r from-brand-purple to-brand-blue text-white subtle-button border-brand-purple'
                        }
          `}
                >
                    {loading ? (
                        <>
                            <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></div>
                            <span>Tracking...</span>
                        </>
                    ) : (
                        <>
                            <Search className="h-5 w-5" />
                            <span>TRACK WALLET</span>
                        </>
                    )}
                </button>
            </form>

            {/* Example addresses */}
            <div className="mt-6 p-4 glass-card">
                <p className="text-gray-400 text-xs font-mono mb-2">Try these example addresses:</p>
                <div className="space-y-1">
                    {[
                        { label: 'Solana Foundation', address: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v' },
                        { label: 'Random Wallet', address: '11111111111111111111111111111112' }
                    ].map((example, i) => (
                        <button
                            key={i}
                            onClick={() => handleAddressChange(example.address)}
                            className="block w-full text-left text-xs font-mono text-gray-500 hover:text-brand-blue transition-colors"
                            disabled={loading}
                        >
                            <span className="text-gray-400">{example.label}:</span> {example.address}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
} 