import { WalletData as IWalletData, RelatedAccount } from '@/types/wallet'
import { Activity, ArrowDownLeft, ArrowUpRight, Clock, Coins, Copy, ExternalLink, Eye, Users } from 'lucide-react'
import { useState } from 'react'

interface WalletDataProps {
    data: IWalletData
}

export default function WalletData({ data }: WalletDataProps) {
    const [copiedField, setCopiedField] = useState<string | null>(null)

    const copyToClipboard = async (text: string, field: string) => {
        try {
            await navigator.clipboard.writeText(text)
            setCopiedField(field)
            setTimeout(() => setCopiedField(null), 2000)
        } catch (err) {
            console.error('Failed to copy:', err)
        }
    }

    const formatAddress = (address: string): string => {
        return `${address.slice(0, 6)}...${address.slice(-6)}`
    }

    const formatDate = (isoString: string): string => {
        const date = new Date(isoString)
        const now = new Date()
        const diffMs = now.getTime() - date.getTime()
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
        const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
        const diffMinutes = Math.floor(diffMs / (1000 * 60))

        if (diffMinutes < 60) return `${diffMinutes}m ago`
        if (diffHours < 24) return `${diffHours}h ago`
        if (diffDays < 7) return `${diffDays}d ago`

        return date.toLocaleDateString()
    }

    const formatSolFlow = (solFlow: string): { amount: string; isInflow: boolean; isZero: boolean } => {
        const isZero = solFlow.includes('0 SOL') || solFlow.includes('0.000 SOL')
        const isInflow = !solFlow.includes('-') && !isZero
        const amount = solFlow.replace('-', '')

        return { amount, isInflow, isZero }
    }

    const getTransactionTypeColor = (type: string): string => {
        switch (type) {
            case 'SOL Inflow':
                return 'bg-neon-green/20 text-neon-green border-neon-green/50'
            case 'SOL Outflow':
                return 'bg-red-500/20 text-red-400 border-red-500/50'
            case 'Token Transfer':
                return 'bg-solana-blue/20 text-solana-blue border-solana-blue/50'
            default:
                return 'bg-gray-500/20 text-gray-400 border-gray-500/50'
        }
    }

    return (
        <div className="space-y-8">
            {/* Wallet Header */}
            <div className="glass-card p-6 neon-border animate-glow">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                    <div>
                        <div className="flex items-center space-x-3 mb-2">
                            <h2 className="text-2xl font-bold text-white">Address Analysis</h2>
                            {data?.isValid ? (
                                <span className="px-3 py-1 bg-neon-green/20 text-neon-green border border-neon-green/50 rounded-full text-sm font-mono">
                                    ✓ VALID
                                </span>
                            ) : (
                                <span className="px-3 py-1 bg-red-500/20 text-red-400 border border-red-500/50 rounded-full text-sm font-mono">
                                    ✗ INVALID
                                </span>
                            )}
                        </div>
                        <div className="flex items-center space-x-3">
                            <span className="font-mono text-gray-300">{formatAddress(data?.address)}</span>
                            <button
                                onClick={() => copyToClipboard(data?.address, 'address')}
                                className="text-solana-purple hover:text-solana-green transition-colors"
                            >
                                {copiedField === 'address' ? '✓' : <Copy className="h-4 w-4" />}
                            </button>
                            <a
                                href={`https://explorer.solana.com/address/${data?.address}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-solana-purple hover:text-solana-green transition-colors"
                            >
                                <ExternalLink className="h-4 w-4" />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Transaction Stats */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
                    <div className="glass-card p-4 text-center hover:border-solana-purple/50 transition-all">
                        <Activity className="h-6 w-6 text-solana-purple mx-auto mb-2" />
                        <p className="text-2xl font-bold neon-text">{data?.totalTransactions?.toLocaleString()}</p>
                        <p className="text-gray-400 text-sm">Total Transactions</p>
                    </div>
                    <div className="glass-card p-4 text-center hover:border-solana-green/50 transition-all">
                        <Eye className="h-6 w-6 text-solana-green mx-auto mb-2" />
                        <p className="text-2xl font-bold text-solana-green">{data?.sampledTransactions}</p>
                        <p className="text-gray-400 text-sm">Sampled</p>
                    </div>
                    <div className="glass-card p-4 text-center hover:border-neon-cyan/50 transition-all md:col-span-1 col-span-2">
                        <Users className="h-6 w-6 text-neon-cyan mx-auto mb-2" />
                        <p className="text-2xl font-bold text-neon-cyan">{data?.relatedAccounts?.length}</p>
                        <p className="text-gray-400 text-sm">Related Accounts</p>
                    </div>
                </div>
            </div>

            {/* Related Accounts */}
            <div className="glass-card p-6">
                <div className="flex items-center space-x-3 mb-6">
                    <Users className="h-6 w-6 text-neon-cyan" />
                    <h3 className="text-xl font-bold text-white">Connected Wallets</h3>
                    <span className="text-gray-400 text-sm">({data?.relatedAccounts?.length} accounts)</span>
                </div>

                <div className="grid gap-4">
                    {data?.relatedAccounts?.map((account: RelatedAccount, index) => {
                        const { amount: solAmount, isInflow, isZero } = formatSolFlow(account.totalSolFlow)

                        return (
                            <div key={index} className="glass-card p-5 hover:border-solana-purple/50 transition-all group">
                                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                                    {/* Account Info */}
                                    <div className="flex items-center space-x-4">
                                        <div className="flex-shrink-0">
                                            <div className="w-12 h-12 bg-gradient-to-br from-solana-purple to-solana-green rounded-full flex items-center justify-center">
                                                <span className="text-white font-mono text-sm">
                                                    {account.address.slice(0, 2).toUpperCase()}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="min-w-0 flex-1">
                                            <div className="flex items-center space-x-3">
                                                <span className="font-mono text-white text-sm">{formatAddress(account.address)}</span>
                                                <button
                                                    onClick={() => copyToClipboard(account.address, `account-${index}`)}
                                                    className="text-gray-400 hover:text-solana-green transition-colors opacity-0 group-hover:opacity-100"
                                                >
                                                    {copiedField === `account-${index}` ? '✓' : <Copy className="h-3 w-3" />}
                                                </button>
                                                <a
                                                    href={`https://explorer.solana.com/address/${account.address}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-gray-400 hover:text-solana-green transition-colors opacity-0 group-hover:opacity-100"
                                                >
                                                    <ExternalLink className="h-3 w-3" />
                                                </a>
                                            </div>

                                            {/* Transaction Types */}
                                            <div className="flex flex-wrap gap-2 mt-2">
                                                {account.transactionTypes?.map((type, typeIndex) => (
                                                    <span
                                                        key={typeIndex}
                                                        className={`px-2 py-1 rounded-full text-xs font-mono border ${getTransactionTypeColor(type)}`}
                                                    >
                                                        {type}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Interaction Stats */}
                                    <div className="flex items-center space-x-6 text-sm">
                                        <div className="text-center">
                                            <p className="text-white font-mono">{account.transactionCount}</p>
                                            <p className="text-gray-400 text-xs">Transactions</p>
                                        </div>

                                        <div className="text-center">
                                            <div className="flex items-center space-x-1">
                                                {!isZero && (
                                                    <>
                                                        {isInflow ? (
                                                            <ArrowDownLeft className="h-3 w-3 text-neon-green" />
                                                        ) : (
                                                            <ArrowUpRight className="h-3 w-3 text-red-400" />
                                                        )}
                                                    </>
                                                )}
                                                <p className={`font-mono ${isZero ? 'text-gray-400' : isInflow ? 'text-neon-green' : 'text-red-400'}`}>
                                                    {solAmount}
                                                </p>
                                            </div>
                                            <p className="text-gray-400 text-xs">SOL Flow</p>
                                        </div>

                                        <div className="text-center">
                                            <div className="flex items-center space-x-1">
                                                <Coins className="h-3 w-3 text-solana-blue" />
                                                <p className="text-solana-blue font-mono">{account.totalTokenInteractions}</p>
                                            </div>
                                            <p className="text-gray-400 text-xs">Tokens</p>
                                        </div>

                                        <div className="text-center">
                                            <div className="flex items-center space-x-1">
                                                <Clock className="h-3 w-3 text-gray-400" />
                                                <p className="text-gray-300 font-mono text-xs">{formatDate(account.lastInteraction)}</p>
                                            </div>
                                            <p className="text-gray-400 text-xs">Last Seen</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>

                {/* Summary Footer */}
                <div className="mt-6 pt-4 border-t border-white/10">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                        <div>
                            <p className="text-lg font-bold text-solana-green">
                                {data?.relatedAccounts?.reduce((sum, acc) => sum + acc.transactionCount, 0)}
                            </p>
                            <p className="text-gray-400 text-xs">Total Interactions</p>
                        </div>
                        <div>
                            <p className="text-lg font-bold text-solana-blue">
                                {data?.relatedAccounts?.reduce((sum, acc) => sum + acc.totalTokenInteractions, 0)}
                            </p>
                            <p className="text-gray-400 text-xs">Token Transfers</p>
                        </div>
                        <div>
                            <p className="text-lg font-bold text-neon-pink">
                                {data?.relatedAccounts?.filter(acc => acc.transactionTypes.includes('SOL Inflow')).length}
                            </p>
                            <p className="text-gray-400 text-xs">SOL Receivers</p>
                        </div>
                        <div>
                            <p className="text-lg font-bold text-neon-cyan">
                                {data?.relatedAccounts?.filter(acc => acc.transactionTypes.includes('SOL Outflow')).length}
                            </p>
                            <p className="text-gray-400 text-xs">SOL Senders</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
} 