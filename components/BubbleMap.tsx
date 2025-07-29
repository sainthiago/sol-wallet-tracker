import { useEffect, useRef, useState } from 'react'
import * as d3 from 'd3'
import { WalletData, RelatedAccount } from '@/types/wallet'
import { Copy, ExternalLink } from 'lucide-react'

interface BubbleMapProps {
  data: WalletData
}

interface BubbleNode extends d3.SimulationNodeDatum {
  id: string
  address: string
  solAmount: number
  label: string
  isMain?: boolean
}

export default function BubbleMap({ data }: BubbleMapProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  const [selectedNode, setSelectedNode] = useState<BubbleNode | null>(null)
  const [copiedAddress, setCopiedAddress] = useState<string | null>(null)

  const parseSolAmount = (solVolume: string | undefined): number => {
    if (!solVolume) return 0.001 // Minimum size for missing data
    const match = solVolume.match(/(\d+\.?\d*)\s*SOL/)
    return match ? Math.max(parseFloat(match[1]), 0.001) : 0.001 // Minimum size for zero amounts
  }

  const formatAddress = (address: string): string => {
    return `${address.slice(0, 4)}...${address.slice(-4)}`
  }

  const copyToClipboard = async (address: string) => {
    try {
      await navigator.clipboard.writeText(address)
      setCopiedAddress(address)
      setTimeout(() => setCopiedAddress(null), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const getVolumeColor = (solAmount: number): string => {
    if (solAmount >= 1) return '#10B981' // green for high volume
    if (solAmount >= 0.1) return '#F59E0B' // orange for medium volume  
    if (solAmount > 0) return '#06B6D4' // blue for low volume
    return '#6B7280' // gray for zero volume
  }

  useEffect(() => {
    if (!data?.relatedAccounts || !svgRef.current) return

    const svg = d3.select(svgRef.current)
    svg.selectAll('*').remove()

    const width = 800
    const height = 400
    const margin = 40

    // Prepare data
    const nodes: BubbleNode[] = [
      {
        id: 'main',
        address: data.address,
        solAmount: 1, // Fixed size for main node
        label: 'Main',
        isMain: true
      },
      ...data.relatedAccounts.map((account: RelatedAccount, index) => ({
        id: `related-${index}`,
        address: account.address,
        solAmount: parseSolAmount(account.totalSolVolume),
        label: formatAddress(account.address),
        isMain: false
      }))
    ]

    // Scale for bubble sizes
    const maxSolAmount = Math.max(...nodes.filter(n => !n.isMain).map(n => n.solAmount))
    const sizeScale = d3.scaleSqrt()
      .domain([0, Math.max(maxSolAmount, 1)])
      .range([8, 40])

    // Create simulation
    const simulation = d3.forceSimulation(nodes)
      .force('charge', d3.forceManyBody().strength(-100))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide().radius(d => (d as BubbleNode).isMain ? 50 : sizeScale((d as BubbleNode) .solAmount) + 2))

    // Create SVG
    svg
      .attr('width', width)
      .attr('height', height)
      .attr('viewBox', `0 0 ${width} ${height}`)
      .style('max-width', '100%')
      .style('height', 'auto')

    // Create container group
    const container = svg.append('g')

    // Add zoom behavior
    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.5, 3])
      .on('zoom', (event) => {
        container.attr('transform', event.transform)
      })

    svg.call(zoom)

    // Create nodes
    const nodeGroups = container.selectAll('.node')
      .data(nodes)
      .enter()
      .append('g')
      .attr('class', 'node')
      .style('cursor', 'pointer')

    // Add circles
    nodeGroups
      .append('circle')
      .attr('r', d => d.isMain ? 40 : sizeScale(d.solAmount))
      .attr('fill', d => d.isMain ? '#8B5CF6' : getVolumeColor(d.solAmount))
      .attr('stroke', '#1F2937')
      .attr('stroke-width', 2)
      .style('opacity', 0.8)
      .on('mouseover', function(event, d) {
        d3.select(this)
          .style('opacity', 1)
          .attr('stroke-width', 3)
        setSelectedNode(d)
      })
      .on('mouseout', function(event, d) {
        d3.select(this)
          .style('opacity', 0.8)
          .attr('stroke-width', 2)
      })
      .on('click', function(event, d) {
        setSelectedNode(d)
      })

    // Add labels for main node and larger bubbles
    nodeGroups
      .filter(d => d.isMain || d.solAmount > 0.1)
      .append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', '0.35em')
      .attr('font-size', d => d.isMain ? '12px' : '10px')
      .attr('fill', 'white')
      .attr('font-weight', 'bold')
      .style('pointer-events', 'none')
      .style('user-select', 'none')
      .text(d => d.isMain ? 'MAIN' : d.label)

    // Update positions on simulation tick
    simulation.on('tick', () => {
      nodeGroups
        .attr('transform', d => `translate(${d.x},${d.y})`)
    })

    // Clean up
    return () => {
      simulation.stop()
    }
  }, [data])

  if (!data?.isValid) {
    return (
      <div className="w-full h-96 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 font-medium mb-2">Invalid Wallet Address</p>
          <p className="text-gray-400 text-sm">The provided address is not a valid Solana wallet</p>
        </div>
      </div>
    )
  }

  if (!data?.relatedAccounts || data.relatedAccounts.length === 0) {
    return (
      <div className="w-full h-96 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-400 font-medium mb-2">No Network Data</p>
          <p className="text-gray-400 text-sm">This wallet has no related accounts to visualize</p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full space-y-4">
      {/* Visualization */}
      <div className="glass-card p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">Address Network</h3>
          <div className="flex items-center space-x-4 text-xs text-gray-400">
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-brand-green rounded-full"></div>
              <span>High (≥1 SOL)</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-brand-orange rounded-full"></div>
              <span>Medium (≥0.1 SOL)</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-brand-blue rounded-full"></div>
              <span>Low (&gt;0 SOL)</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
              <span>Zero</span>
            </div>
          </div>
        </div>
        
        <div className="w-full overflow-hidden rounded-lg bg-gray-900/30">
          <svg ref={svgRef} className="w-full"></svg>
        </div>
        
        <p className="text-xs text-gray-500 mt-2 text-center">
          Bubble size represents SOL volume • Click and drag to pan • Scroll to zoom
        </p>
      </div>

      {/* Selected Node Details */}
      {selectedNode && (
        <div className="glass-card p-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-base font-semibold text-white">
              {selectedNode.isMain ? 'Main Address' : 'Connected Address'}
            </h4>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => copyToClipboard(selectedNode.address)}
                className="text-gray-400 hover:text-brand-blue transition-colors"
              >
                {copiedAddress === selectedNode.address ? '✓' : <Copy className="h-4 w-4" />}
              </button>
              <a
                href={`https://explorer.solana.com/address/${selectedNode.address}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-brand-blue transition-colors"
              >
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-400">Address</p>
              <p className="text-white font-mono">{formatAddress(selectedNode.address)}</p>
            </div>
            <div>
              <p className="text-gray-400">SOL Volume</p>
              <p className="text-white font-medium">{selectedNode.solAmount.toFixed(6)} SOL</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 