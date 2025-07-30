# Solana Bubbles 🫧

A modern bubble map visualization tool for exploring Solana address networks. Visualize connections between addresses with interactive, scalable bubble charts and shareable URLs.

## ✨ Key Features

- 🫧 **Interactive Homescreen**: Beautiful bubble animation that transitions to the main app
- 🔗 **Shareable URLs**: Direct links to wallet visualizations (e.g., `/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v`)
- 🎨 **Interactive Bubble Maps**: D3.js powered force simulations with physics
- 📏 **Volume-based Sizing**: Bubble sizes represent SOL transaction volumes
- 🎯 **Color-coded Ranges**: Visual distinction for volume ranges (high, medium, low, zero)
- 🔍 **Click for Details**: Interactive bubble selection with address and volume info
- 📋 **Copy & Share**: One-click address copying and Solana Explorer links
- ⚡ **Zoom & Pan**: Smooth navigation for exploring large networks
- ✅ **Smart Validation**: Client and server-side Solana address validation
- 📱 **Fully Responsive**: Optimized for desktop, tablet, and mobile
- 🚀 **Real-time Data**: Powered by Solana Wallet Tracker Agent
- 🎨 **Professional UI**: Modern dark theme with gradient accents and glass morphism

## 🛠 Tech Stack

- **Next.js 15** - React framework with App Router
- **TypeScript** - Full type safety
- **D3.js** - Data visualization and force simulation physics
- **Tailwind CSS** - Utility-first styling with custom theme
- **Lucide React** - Beautiful iconography
- **pnpm** - Fast, efficient package management

## 🚀 Getting Started

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

## 📖 Usage Guide

### Starting the App
1. **Homescreen**: Click the animated bubble to enter the application
2. **Enter Address**: Input any valid Solana wallet address
3. **Validation**: Real-time validation with helpful error messages
4. **Map Network**: Click to generate the bubble visualization

### Exploring the Bubble Map
- 🟣 **Purple bubble (center)**: Your main wallet address
- 🟢 **Green bubbles**: High volume connections (≥1 SOL)
- 🟠 **Orange bubbles**: Medium volume connections (≥0.1 SOL)
- 🔵 **Blue bubbles**: Low volume connections (>0 SOL)
- ⚫ **Gray bubbles**: Zero volume connections

### Interactive Features
- **Click bubbles**: View detailed address information
- **Copy addresses**: One-click clipboard copying
- **Explorer links**: Direct links to Solana Explorer
- **Pan**: Click and drag to move around
- **Zoom**: Scroll wheel to zoom in/out
- **Share**: Copy URL to share specific wallet visualizations

## 🔗 URL Sharing

The app supports direct URL routing for easy sharing:

- **Home**: `https://yourapp.com/`
- **Wallet View**: `https://yourapp.com/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v`
- **Dynamic Titles**: Pages automatically update title and meta description

## 🧪 Example Addresses

Try these verified Solana addresses:

**Popular Tokens:**
- `EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v` (USDC Token Program)
- `11111111111111111111111111111112` (System Program)

**Active Wallets:**
- `5dmVDVM2orDq1ZetuVjedCdRjJGiVasjmqq2woAmyXGd` (Sample wallet with connections)

## 🔌 API Integration

This app connects to the Solana Wallet Tracker Agent:
- **Endpoint**: `https://solana-wallet-tracker-agent.vercel.app/`
- **Local Proxy**: `/api/wallet/[address]` (prevents CORS, adds error handling)
- **Timeout**: 30-second request timeout
- **Error Handling**: Comprehensive error messages and fallbacks

## 🎯 Visualization Features

### Force Simulation Physics
- **Charge Force**: Bubbles repel each other naturally
- **Center Force**: Keeps visualization centered
- **Collision Detection**: Prevents bubble overlap
- **Smooth Animation**: 60fps rendering with D3.js

### Data Processing
- **Volume Parsing**: Extracts SOL amounts from "X.XX SOL" format
- **Minimum Sizing**: Ensures even zero-volume bubbles are visible
- **Color Mapping**: Automatic color assignment based on volume ranges
- **Label Generation**: Smart address truncation (first 4 + last 4 chars)

### User Experience
- **Loading States**: Visual feedback during data fetching
- **Error States**: Clear error messages with validation tips
- **Empty States**: Helpful messages for wallets with no connections
- **Responsive Layout**: Adapts to any screen size automatically

## 📱 Mobile Experience

- **Touch-friendly**: Large tap targets and smooth gestures
- **Responsive Sizing**: Bubble map scales to screen size
- **Optimized Performance**: Efficient rendering on mobile devices
- **Portrait/Landscape**: Works in both orientations

## 🛠 Scripts

- `pnpm dev` - Start development server with hot reload
- `pnpm build` - Build optimized production bundle
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint for code quality

## 🤝 Contributing

We welcome contributions! Areas for improvement:
- Additional visualization types
- Performance optimizations
- New interactive features
- UI/UX enhancements
- Documentation improvements

## 📄 License

Built with ❤️ for the Solana ecosystem

---

### Recent Updates

- ✅ URL routing for shareable wallet links
- ✅ Interactive homescreen with smooth transitions
- ✅ Enhanced validation and error handling
- ✅ Copy-to-clipboard functionality
- ✅ Solana Explorer integration
- ✅ Dynamic page titles and SEO optimization
- ✅ Improved mobile responsiveness
- ✅ Professional UI design overhaul
