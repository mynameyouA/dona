import Hero from '@/components/Hero';
import DonationSection from '@/components/DonationSection';

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* Header / Navigation placeholder */}
      <header className="bg-white py-4 px-6 lg:px-8 flex justify-between items-center shadow-sm relative z-50">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-xl">G</span>
          </div>
          <span className="text-xl font-bold text-gray-900 tracking-tight">GlobalHope</span>
        </div>
        <nav className="hidden md:flex space-x-8">
          <a href="#" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">About Us</a>
          <a href="#" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">Our Impact</a>
          <a href="#" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">Contact</a>
        </nav>
      </header>

      {/* Main Content */}
      <Hero />
      <DonationSection />
      
      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12 px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <p className="mb-4">Global Hope Foundation is a registered 501(c)(3) non-profit organization.</p>
          <p>&copy; {new Date().getFullYear()} GlobalHope. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
