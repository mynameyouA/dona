import Hero from '@/components/Hero';
import ContentSections from '@/components/ContentSections';
import DonationSection from '@/components/DonationSection';

export default function Home() {
  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 py-6 px-6 lg:px-8 flex justify-between items-center z-50">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/30 shadow-lg">
            <span className="text-white font-extrabold text-2xl">O</span>
          </div>
          <span className="text-2xl font-extrabold text-white tracking-tight drop-shadow-md">OxyTerra</span>
        </div>
        <nav className="hidden md:flex space-x-8 bg-white/10 backdrop-blur-md px-8 py-3 rounded-full border border-white/20">
          <a href="#" className="text-white hover:text-emerald-300 font-bold transition-colors">Mission</a>
          <a href="#" className="text-white hover:text-emerald-300 font-bold transition-colors">Impact</a>
          <a href="#" className="text-white hover:text-emerald-300 font-bold transition-colors">Transparency</a>
        </nav>
      </header>

      {/* Main Content */}
      <Hero />
      
      <ContentSections />

      {/* Wave transition */}
      <div className="w-full h-24 bg-gradient-to-b from-transparent to-slate-50 relative z-20 -mt-24"></div>

      <DonationSection />
      
      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-16 px-6 lg:px-8 border-t border-slate-800">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="mb-8 md:mb-0 text-center md:text-left">
            <span className="text-2xl font-extrabold text-white tracking-tight block mb-2">OxyTerra Foundation</span>
            <p className="text-sm">Registered 501(c)(3) Non-Profit Organization.</p>
          </div>
          <div className="text-center md:text-right">
            <p className="mb-2">Accepting global payments via Alchemy Pay.</p>
            <p className="text-sm text-slate-500">&copy; {new Date().getFullYear()} OxyTerra. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
