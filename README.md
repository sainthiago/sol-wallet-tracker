# Solana Address Network 🔗

A modern bubble map visualization tool for exploring Solana address networks. Visualize connections between addresses with interactive, scalable bubble charts.

## Features

- 🎨 **Interactive Bubble Maps**: D3.js powered visualizations
- 📏 **Size-based Mapping**: Bubble sizes represent SOL amounts
- 🎯 **Color-coded Types**: Visual distinction for transaction types
- 🔍 **Interactive Details**: Click bubbles for detailed information
- ⚡ **Zoom & Pan**: Explore large networks with smooth navigation
- 📱 **Responsive Design**: Works on desktop and mobile
- 🔗 **Real-time Data**: Powered by Solana Wallet Tracker Agent

## Tech Stack

- **Next.js 15** - React framework
- **TypeScript** - Type safety
- **D3.js** - Data visualization and force simulation
- **Tailwind CSS** - Styling with professional theme
- **Lucide React** - Beautiful icons

## Getting Started

1. **Install dependencies**:
   ```bash
   pnpm install
   ```

2. **Run development server**:
   ```bash
   pnpm dev
   ```

3. **Open in browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## Usage

1. Enter a Solana wallet address in the input field
2. Click "MAP NETWORK" to fetch and visualize data
3. Explore the interactive bubble map:
   - Main address appears as purple bubble in center
   - Related addresses shown as colored bubbles
   - Bubble size represents SOL volume for each address
   - Colors indicate volume ranges (green=high, orange=medium, blue=low, gray=zero)
   - Click bubbles to see detailed information
   - Drag to pan, scroll to zoom

## Example Addresses

Try these example Solana addresses:
- `EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v` (USDC Token)
- `11111111111111111111111111111112` (System Program)

## API Integration

This app connects to the Solana Wallet Tracker Agent at:
`https://solana-wallet-tracker-agent.vercel.app/`

## Visualization Features

The bubble map provides:
- 🎯 **Force Simulation**: Natural bubble positioning with physics
- 📊 **Proportional Sizing**: Bubble radius based on SOL amounts
- 🎨 **Type-based Coloring**: Instant visual categorization
- 🔍 **Interactive Selection**: Click for detailed information
- 🚀 **Smooth Animations**: 60fps rendering with D3.js
- 📱 **Responsive Layout**: Scales to any screen size

## Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint

## Contributing

Feel free to contribute to make this wallet tracker even more epic for the Solana community!

---

Built with ❤️ for the Solana ecosystem # sol-wallet-tracker
