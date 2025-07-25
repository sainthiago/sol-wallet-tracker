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
        return 'bg-brand-green/10 text-brand-green border-brand-green/20'
      case 'SOL Outflow':
        return 'bg-brand-red/10 text-brand-red border-brand-red/20'
      case 'Token Transfer':
        return 'bg-brand-blue/10 text-brand-blue border-brand-blue/20'
      default:
        return 'bg-gray-500/10 text-gray-400 border-gray-500/20'
    }
  }

    return (
            <div className="space-y-6">
      {/* Wallet Header */}
      <div className="glass-card p-6 professional-border">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                    <div>
                        <div className="flex items-center space-x-3 mb-2">
                            <h2 className="text-xl font-semibold text-white">Wallet Analysis</h2>
                            {data?.isValid ? (
                                <span className="px-2 py-1 bg-brand-green/10 text-brand-green border border-brand-green/20 rounded text-xs font-medium">
                                    VALID
                                </span>
                            ) : (
                                <span className="px-2 py-1 bg-brand-red/10 text-brand-red border border-brand-red/20 rounded text-xs font-medium">
                                    INVALID
                                </span>
                            )}
                        </div>
                        <div className="flex items-center space-x-3">
                            <span className="font-mono text-gray-300">{formatAddress(data?.address)}</span>
                            <button
                                onClick={() => copyToClipboard(data?.address, 'address')}
                                className="text-gray-400 hover:text-brand-blue transition-colors"
                            >
                                {copiedField === 'address' ? '✓' : <Copy className="h-4 w-4" />}
                            </button>
                            <a
                                href={`https://explorer.solana.com/address/${data?.address}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-brand-blue transition-colors"
                            >
                                <ExternalLink className="h-4 w-4" />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Transaction Stats */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
                    <div className="glass-card p-4 text-center subtle-button">
                        <Activity className="h-5 w-5 text-brand-purple mx-auto mb-2" />
                        <p className="text-xl font-semibold text-white">{data?.totalTransactions?.toLocaleString()}</p>
                        <p className="text-gray-400 text-sm">Transactions</p>
                    </div>
                    <div className="glass-card p-4 text-center subtle-button">
                        <Eye className="h-5 w-5 text-brand-blue mx-auto mb-2" />
                        <p className="text-xl font-semibold text-white">{data?.sampledTransactions}</p>
                        <p className="text-gray-400 text-sm">Analyzed</p>
                    </div>
                    <div className="glass-card p-4 text-center subtle-button md:col-span-1 col-span-2">
                        <Users className="h-5 w-5 text-brand-green mx-auto mb-2" />
                        <p className="text-xl font-semibold text-white">{data?.relatedAccounts?.length}</p>
                        <p className="text-gray-400 text-sm">Connected</p>
                    </div>
                </div>
            </div>

                   {/* Related Accounts */}
       <div className="glass-card p-6">
         <div className="flex items-center justify-between mb-6">
           <div className="flex items-center space-x-3">
             <Users className="h-5 w-5 text-brand-blue" />
             <h3 className="text-lg font-semibold text-white">Related Accounts</h3>
           </div>
           <span className="text-gray-400 text-sm">{data?.relatedAccounts?.length} accounts</span>
         </div>

         {/* Summary Stats */}
         <div className="mb-6 p-4 bg-surface-primary rounded-lg border border-gray-800">
           <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
             <div>
               <p className="text-base font-semibold text-white">
                 {data?.relatedAccounts?.reduce((sum, acc) => sum + acc.transactionCount, 0)}
               </p>
               <p className="text-gray-400 text-xs">Interactions</p>
             </div>
             <div>
               <p className="text-base font-semibold text-white">
                 {data?.relatedAccounts?.reduce((sum, acc) => sum + acc.totalTokenInteractions, 0)}
               </p>
               <p className="text-gray-400 text-xs">Token Transfers</p>
             </div>
             <div>
               <p className="text-base font-semibold text-white">
                 {data?.relatedAccounts?.filter(acc => acc.transactionTypes.includes('SOL Inflow')).length}
               </p>
               <p className="text-gray-400 text-xs">Receivers</p>
             </div>
             <div>
               <p className="text-base font-semibold text-white">
                 {data?.relatedAccounts?.filter(acc => acc.transactionTypes.includes('SOL Outflow')).length}
               </p>
               <p className="text-gray-400 text-xs">Senders</p>
             </div>
           </div>
         </div>
         
         <div className="grid gap-4">
                    {data?.relatedAccounts?.map((account: RelatedAccount, index) => {
                        const { amount: solAmount, isInflow, isZero } = formatSolFlow(account.totalSolFlow)

                        return (
                            <div key={index} className="glass-card p-4 subtle-button group">
                                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-3 lg:space-y-0">
                                    {/* Account Info */}
                                    <div className="flex items-center space-x-3">
                                        <div className="flex-shrink-0">
                                            <div className="w-10 h-10 bg-gradient-to-br from-brand-purple to-brand-blue rounded-lg flex items-center justify-center">
                                                <span className="text-white font-medium text-xs">
                                                    {account.address.slice(0, 2).toUpperCase()}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="min-w-0 flex-1">
                                            <div className="flex items-center space-x-2">
                                                <span className="font-mono text-white text-sm">{formatAddress(account.address)}</span>
                                                <button
                                                    onClick={() => copyToClipboard(account.address, `account-${index}`)}
                                                    className="text-gray-400 hover:text-brand-blue transition-colors opacity-0 group-hover:opacity-100"
                                                >
                                                    {copiedField === `account-${index}` ? '✓' : <Copy className="h-3 w-3" />}
                                                </button>
                                                <a
                                                    href={`https://explorer.solana.com/address/${account.address}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-gray-400 hover:text-brand-blue transition-colors opacity-0 group-hover:opacity-100"
                                                >
                                                    <ExternalLink className="h-3 w-3" />
                                                </a>
                                            </div>

                                            {/* Transaction Types */}
                                            <div className="flex flex-wrap gap-1 mt-1">
                                                {account.transactionTypes?.map((type, typeIndex) => (
                                                    <span
                                                        key={typeIndex}
                                                        className={`px-2 py-0.5 rounded text-xs border ${getTransactionTypeColor(type)}`}
                                                    >
                                                        {type}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Interaction Stats */}
                                    <div className="flex items-center space-x-4 text-sm">
                                        <div className="text-center">
                                            <p className="text-white font-medium">{account.transactionCount}</p>
                                            <p className="text-gray-400 text-xs">Txns</p>
                                        </div>

                                        <div className="text-center">
                                            <div className="flex items-center space-x-1">
                                                {!isZero && (
                                                    <>
                                                        {isInflow ? (
                                                            <ArrowDownLeft className="h-3 w-3 text-brand-green" />
                                                        ) : (
                                                            <ArrowUpRight className="h-3 w-3 text-brand-red" />
                                                        )}
                                                    </>
                                                )}
                                                <p className={`font-mono text-xs ${isZero ? 'text-gray-400' : isInflow ? 'text-brand-green' : 'text-brand-red'}`}>
                                                    {solAmount}
                                                </p>
                                            </div>
                                            <p className="text-gray-400 text-xs">SOL</p>
                                        </div>

                                        <div className="text-center">
                                            <div className="flex items-center space-x-1">
                                                <Coins className="h-3 w-3 text-brand-blue" />
                                                <p className="text-brand-blue font-medium text-xs">{account.totalTokenInteractions}</p>
                                            </div>
                                            <p className="text-gray-400 text-xs">Tokens</p>
                                        </div>

                                        <div className="text-center">
                                            <div className="flex items-center space-x-1">
                                                <Clock className="h-3 w-3 text-gray-400" />
                                                <p className="text-gray-300 text-xs">{formatDate(account.lastInteraction)}</p>
                                            </div>
                                            <p className="text-gray-400 text-xs">Last</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>

                
            </div>
        </div>
    )
} 