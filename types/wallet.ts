// Solana Address Analysis Response
export interface WalletData {
  address: string;
  isValid: boolean;
  totalTransactions: number;
  sampledTransactions: number;
  relatedAccounts: RelatedAccount[];
}

export interface RelatedAccount {
  address: string;
  transactionCount: number;
  lastInteraction: string; // ISO date string
  transactionTypes: string[];
  totalSolFlow: string; // e.g., "0.002 SOL"
  totalTokenInteractions: number;
}

// Legacy interfaces for backward compatibility
export interface Transaction {
  signature: string;
  timestamp: number;
  type: string;
  amount?: number;
  fee: number;
  status: 'success' | 'failed';
  from?: string;
  to?: string;
  token?: string;
}

export interface Token {
  mint: string;
  symbol: string;
  name: string;
  amount: number;
  decimals: number;
  uiAmount: number;
  price?: number;
  value?: number;
  logoUri?: string;
}

export interface NFT {
  mint: string;
  name: string;
  symbol: string;
  image?: string;
  description?: string;
  collection?: string;
  attributes?: NFTAttribute[];
}

export interface NFTAttribute {
  trait_type: string;
  value: string | number;
}

export interface DeFiPosition {
  protocol: string;
  type: 'lending' | 'borrowing' | 'staking' | 'liquidity';
  amount: number;
  token: string;
  apy?: number;
  value?: number;
}

export interface WalletSummary {
  totalValue: number;
  totalTokens: number;
  totalNFTs: number;
  totalTransactions: number;
  firstActivity?: number;
  lastActivity?: number;
}

export interface ApiResponse {
  success: boolean;
  data?: WalletData;
  error?: string;
  message?: string;
} 