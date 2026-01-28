# True Hourly Wage Calculator for Gig Drivers

A mobile-first, privacy-focused calculator that reveals what gig economy drivers (Uber, Lyft, DoorDash, etc.) actually earn after accounting for vehicle costs and taxes.

## 🎯 Purpose

Most gig workers only see their "Gross Payout" and significantly overestimate their real earnings. This tool mathematically reveals the true hourly profit by factoring in:

- **Vehicle Costs** (via IRS Standard Mileage Deduction: $0.67/mile)
- **Self-Employment Taxes** (default 15.3%)

## ✨ Features

- **Instant Calculations**: Results update in real-time as you type
- **Privacy-First**: Zero data storage — everything runs client-side
- **Mobile-Optimized**: Thumb-friendly UI designed for use in your car
- **Visual Impact**: Bar chart comparison creates "shock value" effect
- **Accessible**: Screen reader support, keyboard navigation, high contrast

## 🏗️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Validation**: Zod
- **Deployment**: Vercel

## 📂 Project Structure

```
gig-wage-calculator/
├── app/
│   ├── globals.css        # Global styles + Tailwind
│   ├── layout.tsx         # Root layout + SEO meta
│   └── page.tsx           # Main calculator page
├── components/
│   ├── calculator-form.tsx   # Input form component
│   ├── comparison-chart.tsx  # Bar chart visualization
│   ├── results-card.tsx      # Hourly rate comparison
│   └── support-card.tsx      # Monetization CTA
├── lib/
│   └── calculate-net-profit.ts  # Core calculation logic
├── public/
│   ├── manifest.json      # PWA manifest
│   └── robots.txt         # SEO robots file
└── [config files]
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ (LTS recommended)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/gig-wage-calculator.git
cd gig-wage-calculator

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

### Build for Production

```bash
npm run build
npm start
```

## 🌐 Deployment to Vercel

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and import your repository
3. Vercel will auto-detect Next.js and configure the build
4. Click "Deploy"

### Post-Deployment Checklist

- [ ] Update `YOUR_DOMAIN.com` in `app/layout.tsx` (OpenGraph URL)
- [ ] Update `YOUR_DOMAIN.com` in `public/robots.txt`
- [ ] Update `YOUR_HANDLE` in `components/support-card.tsx` (Buy Me a Coffee link)
- [ ] Add `og-image.png` (1200x630px) to `/public`
- [ ] Add `favicon.ico`, `apple-touch-icon.png` to `/public`
- [ ] Add `icon-192.png`, `icon-512.png` to `/public` (for PWA)

## 📊 Calculation Logic

The calculator uses the **IRS Standard Mileage Deduction** method:

```typescript
// Step 1: Calculate vehicle costs
vehicleCosts = milesDriven × irsMileageRate  // Default: $0.67/mile

// Step 2: Calculate profit before taxes
profitBeforeTax = grossEarnings - vehicleCosts

// Step 3: Calculate self-employment tax on NET profit
estimatedTaxes = profitBeforeTax × (taxRate / 100)  // Default: 15.3%

// Step 4: Final take-home
netProfit = profitBeforeTax - estimatedTaxes

// Step 5: Calculate hourly rates
appHourlyRate = grossEarnings / hoursOnline      // What apps show
realHourlyProfit = netProfit / hoursOnline       // The truth
```

### Why IRS Mileage Rate?

The IRS rate ($0.67/mile for 2024) is designed to cover ALL vehicle costs:
- Gas/fuel
- Depreciation
- Maintenance & repairs
- Insurance (business portion)
- Registration & taxes

Using just gas cost would understate the true cost of "driving your car into the ground."

## 🎨 Architecture Decisions

### Why Client Components?

The entire calculator uses `"use client"` because:
1. **Real-time reactivity**: Results must update instantly as users type
2. **Privacy**: No data ever touches a server
3. **Performance**: No network latency for calculations

### Why No Global State?

- Calculator state is simple (single form + derived results)
- React's `useState` + `useMemo` handles everything efficiently
- Adding Redux/Zustand would be over-engineering

### Why Custom Chart Instead of Recharts?

- The bar chart is simple enough that CSS handles it
- Avoids 100KB+ bundle size for a single visualization
- Faster First Contentful Paint

## 🔧 Customization

### Updating the IRS Mileage Rate

When the IRS updates their rate (typically January 1st each year):

1. Open `app/page.tsx`
2. Update `defaultInputs.irsMileageRate`
3. The user-facing default will update automatically

### Adding More Expense Categories

To add categories (e.g., phone plan, parking):

1. Extend `CalculatorInputs` in `lib/calculate-net-profit.ts`
2. Add corresponding fields to `CalculatorForm`
3. Update the calculation logic in `calculateNetProfit()`

## 📱 Lighthouse Score Targets

| Metric | Target | Notes |
|--------|--------|-------|
| Performance | 95+ | Critical: FCP < 1.0s |
| Accessibility | 100 | Full keyboard + screen reader support |
| Best Practices | 100 | HTTPS, no deprecated APIs |
| SEO | 100 | Meta tags, semantic HTML, robots.txt |

## 📄 License

MIT License — feel free to fork and customize for your needs.

## 🙏 Support

If this tool helped you understand your true earnings, consider [buying me a coffee](https://buymeacoffee.com/YOUR_HANDLE)!
