
import React from 'react';
import { Film, User, Search, Ticket, Heart, Sparkles } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  onNavigate: (tab: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, onNavigate }) => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-800">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div 
            className="flex items-center gap-2 cursor-pointer group"
            onClick={() => onNavigate('home')}
          >
            <div className="p-2 bg-blue-600 rounded-lg group-hover:bg-blue-500 transition-colors">
              <Film className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-bold tracking-tighter text-blue-400">MovieGo</h1>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <button 
              onClick={() => onNavigate('home')}
              className={`hover:text-blue-400 transition-colors ${activeTab === 'home' ? 'text-blue-400 font-bold' : 'text-slate-300'}`}
            >
              首頁
            </button>
            <button 
              className={`hover:text-blue-400 transition-colors ${activeTab === 'booking' ? 'text-blue-400 font-bold' : 'text-slate-300'}`}
              onClick={() => onNavigate('booking')}
            >
              場次查詢
            </button>
            <button 
              onClick={() => onNavigate('offers')}
              className={`hover:text-blue-400 transition-colors ${activeTab === 'offers' ? 'text-blue-400 font-bold' : 'text-slate-300'}`}
            >
              最新優惠
            </button>
          </nav>

          <div className="flex items-center gap-4">
            <button className="p-2 text-slate-400 hover:text-white transition-colors">
              <Search className="w-5 h-5" />
            </button>
            <button 
              onClick={() => onNavigate('member')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-700 hover:bg-slate-800 transition-colors ${activeTab === 'member' ? 'bg-slate-800 text-blue-400 border-blue-400' : ''}`}
            >
              <User className="w-5 h-5" />
              <span className="hidden sm:inline text-sm">會員中心</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Mobile Nav */}
      <footer className="md:hidden fixed bottom-0 w-full bg-slate-900 border-t border-slate-800 h-16 flex items-center justify-around z-50">
        <button onClick={() => onNavigate('home')} className="flex flex-col items-center gap-1">
          <Film className={`w-6 h-6 ${activeTab === 'home' ? 'text-blue-400' : 'text-slate-500'}`} />
          <span className="text-[10px]">首頁</span>
        </button>
        <button onClick={() => onNavigate('booking')} className="flex flex-col items-center gap-1">
          <Ticket className={`w-6 h-6 ${activeTab === 'booking' ? 'text-blue-400' : 'text-slate-500'}`} />
          <span className="text-[10px]">訂票</span>
        </button>
        <button onClick={() => onNavigate('offers')} className="flex flex-col items-center gap-1">
          <Sparkles className={`w-6 h-6 ${activeTab === 'offers' ? 'text-blue-400' : 'text-slate-500'}`} />
          <span className="text-[10px]">優惠</span>
        </button>
        <button onClick={() => onNavigate('member')} className="flex flex-col items-center gap-1">
          <User className={`w-6 h-6 ${activeTab === 'member' ? 'text-blue-400' : 'text-slate-500'}`} />
          <span className="text-[10px]">我的</span>
        </button>
      </footer>

      {/* Web Footer */}
      <footer className="hidden md:block py-12 bg-slate-950 border-t border-slate-900">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-blue-400 font-bold mb-4">MovieGo</h3>
            <p className="text-slate-500 text-sm">
              提供最流暢的電影購票體驗。專注於 UI/UX 的極致追求，讓看電影從訂票開始就是一種享受。
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-4">快速連結</h4>
            <ul className="text-slate-500 text-sm space-y-2">
              <li className="hover:text-blue-400 cursor-pointer">隱私權政策</li>
              <li className="hover:text-blue-400 cursor-pointer">服務條款</li>
              <li className="hover:text-blue-400 cursor-pointer">退票規則</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">影城據點</h4>
            <ul className="text-slate-500 text-sm space-y-2">
              <li className="hover:text-blue-400 cursor-pointer">台北信義店</li>
              <li className="hover:text-blue-400 cursor-pointer">台中大遠百店</li>
              <li className="hover:text-blue-400 cursor-pointer">高雄大遠百店</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">聯絡我們</h4>
            <p className="text-slate-500 text-sm">support@moviego.com.tw</p>
            <p className="text-slate-500 text-sm">02-1234-5678</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
