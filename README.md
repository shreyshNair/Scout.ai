# Scout.ai — Premium VC Intelligence Platform

Scout.ai is a high-performance, thesis-driven startup discovery and enrichment platform designed for modern Venture Capital teams. It streamlines the deal flow process by combining real-time signals, AI-powered insights, and a sleek, high-utility interface.

<img width="1870" height="1146" alt="image" src="https://github.com/user-attachments/assets/67b16c73-5d96-4fa6-b5cd-2b85121b44a7" />


## ✨ Key Features

- **Thesis-Driven Discovery**: Automated startup sourcing based on specific investment criteria.
- **AI Signal Scoring**: Proprietary scoring models that evaluate startups based on momentum, team depth, and market fit.
- **Unified Deal Pipeline**: A central command center for tracking leads from first contact to close.
- **Rich enrichment**: Deep-dive data on founders, funding history, and competitive landscape.
- **Premium UX**: Fully responsive glassmorphism UI with buttery-smooth Framer Motion animations and a robust dark/light mode system.

## 🚀 Tech Stack

- **Framework**: [Next.js 14+](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Components**: Radix UI / Shadcn UI primitives
- **State Management**: React Context API
- **Theming**: `next-themes` (Light mode optimized)

## 🛠️ Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn

### Installation

1. **Clone the repository:**
   ```bash
   [git clone https://github.com/shreyshNair/Scout.ai.git)
   cd Scout.ai
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open in browser:**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 📁 Project Structure

```text
src/
├── app/               # Next.js App Router (Pages, Layouts)
├── components/        # Reusable UI components
│   ├── companies/     # Data tables and filters
│   ├── layout/        # Navbar, Sidebar, AppShell
│   └── ui/            # Basic UI primitives
├── context/           # React Context (User, Theme, Sidebar)
├── lib/               # Utilities and helper functions
└── styles/            # Global styles
```

## 📸 Deployment

The project is optimized for deployment on [Vercel](https://vercel.com). Simply link your GitHub repository and the deployment will happen automatically on every push.

---

Built with ❤️ by [Shreyash Nair](https://github.com/shreyshNair)
