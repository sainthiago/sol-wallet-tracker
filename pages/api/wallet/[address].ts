import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'
import { ApiResponse } from '@/types/wallet'

const AGENT_BASE_URL = 'https://solana-wallet-tracker-agent.vercel.app'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({
      success: false,
      error: 'Method not allowed'
    })
  }

  const { address } = req.query

  // Validate address parameter exists
  if (!address || typeof address !== 'string') {
    return res.status(400).json({
      success: false,
      error: 'Solana address is required'
    })
  }

  try {
    // Call the agent API
    const response = await axios.get(`${AGENT_BASE_URL}/api/tools/solana-address-analysis?address=${address}`, {
      timeout: 30000, // 30 second timeout
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })

    // Return the agent's response
    return res.status(200).json({
      success: true,
      data: response.data?.data || response.data
    })

  } catch (error) {
    console.error('Agent API Error:', error)

    if (axios.isAxiosError(error)) {
      // Handle different HTTP errors
      if (error.response) {
        const status = error.response.status
        const message = error.response.data?.error || error.response.data?.message || 'API request failed'
        
        return res.status(status).json({
          success: false,
          error: message
        })
      } else if (error.request) {
        return res.status(503).json({
          success: false,
          error: 'Agent service unavailable'
        })
      }
    }

    // Generic error fallback
    return res.status(500).json({
      success: false,
      error: 'Internal server error'
    })
  }
} 