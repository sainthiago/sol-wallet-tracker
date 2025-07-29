import { Search, Wallet } from 'lucide-react'
import { FormEvent, useState } from 'react'

interface WalletInputProps {
    onSubmit: (address: string) => void
    loading: boolean
}

export default function WalletInput({ onSubmit, loading }: WalletInputProps) {
    const [address, setAddress] = useState('')
    const [isValid, setIsValid] = useState(true)

    const validateSolanaAddress = (addr: string): boolean => {
        // Basic Solana address validation (base58, 32-44 chars)
        const base58Regex = /^[A-HJ-NP-Z1-9]{32,44}$/
        return base58Regex.test(addr)
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()

        if (!address.trim()) {
            setIsValid(false)
            return
        }

        // Basic client-side validation
        if (!validateSolanaAddress(address.trim())) {
            setIsValid(false)
            return
        }

        setIsValid(true)
        onSubmit(address.trim())
    }

    const handleAddressChange = (value: string) => {
        setAddress(value)
        if (!isValid) setIsValid(true) // Reset validation state when user types
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
                        className={`w-full pl-12 pr-4 py-4 font-mono text-sm md:text-base
              glass-card placeholder-gray-400 text-white
              focus:outline-none focus:ring-2 transition-all duration-300
              ${isValid
                                ? 'focus:ring-brand-blue border-gray-700'
                                : 'border-brand-red/50 focus:ring-brand-red'
                            }`}
                        disabled={loading}
                    />

                    {!isValid && (
                        <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                            <span className="text-brand-red text-sm">❌</span>
                        </div>
                    )}
                </div>
                
                {!isValid && (
                    <p className="text-brand-red text-sm ml-1">
                        Please enter a valid Solana address (32-44 characters, base58 format)
                    </p>
                )}


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
                            <span>Mapping...</span>
                        </>
                    ) : (
                        <>
                            <Search className="h-5 w-5" />
                            <span>MAP NETWORK</span>
                        </>
                    )}
                </button>
            </form>

        </div>
    )
} 