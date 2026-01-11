
import React from 'react';
import { Gift, Zap, CreditCard, Award, ChevronRight, ShoppingBag, Percent } from 'lucide-react';

const OFFERS = [
  {
    id: 1,
    category: '限時強打',
    title: '《動物方程式》聯名贈品',
    description: '購買任一電影大份爆米花組合，即贈送「動物方程式」限量絨毛娃娃乙隻（款式隨機）。',
    image: 'https://images.unsplash.com/photo-1590184457912-8709146141d5?q=80&w=2070&auto=format&fit=crop',
    color: 'bg-orange-500',
    icon: ShoppingBag
  },
  {
    id: 2,
    category: '購票優惠',
    title: '平日早鳥 8 折優惠',
    description: '每週一至週四 12:00 前放映之場次，會員線上訂票享 8 折優惠（不含特殊影廳）。',
    image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=2059&auto=format&fit=crop',
    color: 'bg-blue-600',
    icon: Percent
  },
  {
    id: 3,
    category: '銀行合作',
    title: 'MovieGo 聯名卡：週五買一送一',
    description: '持指定銀行聯名卡於週五購買電影票，即享買一送一優惠，每卡每日限購一組。',
    image: 'https://images.unsplash.com/photo-1556742044-3c52d6e88c62?q=80&w=2070&auto=format&fit=crop',
    color: 'bg-indigo-600',
    icon: CreditCard
  },
  {
    id: 4,
    category: '會員專屬',
    title: '當月壽星免費爆米花',
    description: '金級會員當月壽星至全台影城櫃檯出示 App 會員條碼，即可兌換中份爆米花乙份。',
    image: 'https://images.unsplash.com/photo-1572116469696-31de0f17cc34?q=80&w=1974&auto=format&fit=crop',
    color: 'bg-yellow-500',
    icon: Gift
  }
];

const Offers: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12 animate-fade-in">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="px-4 py-1.5 bg-blue-600/10 text-blue-500 rounded-full text-xs font-black tracking-widest mb-4 inline-block">PROMOTIONS</span>
        <h2 className="text-4xl md:text-5xl font-black text-white mb-4">最新優惠活動</h2>
        <p className="text-slate-500">
          MovieGo 帶給您不僅是電影，更是驚喜！探索我們豐富的聯名贈品與專屬優惠方案。
        </p>
      </div>

      {/* Hero Offer */}
      <div className="relative rounded-[40px] overflow-hidden mb-16 group cursor-pointer shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/60 to-transparent z-10"></div>
        <img 
          src="https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1925&auto=format&fit=crop" 
          alt="Featured Promo" 
          className="w-full h-[400px] object-cover group-hover:scale-105 transition-transform duration-1000"
        />
        <div className="absolute inset-0 z-20 flex flex-col justify-center p-8 md:p-16">
          <div className="flex items-center gap-2 text-blue-400 font-black text-sm mb-4">
            <Zap className="w-5 h-5 fill-current" />
            <span>HOT DEAL OF THE MONTH</span>
          </div>
          <h3 className="text-3xl md:text-5xl font-black text-white mb-4 max-w-xl leading-tight">
            新春觀影祭：<br/>累積點數 2 倍送！
          </h3>
          <p className="text-slate-300 max-w-md mb-8">
            2026/01/20 - 02/28 期間內，所有線上購票之會員紅利點數全面加倍計算，換票更有利。
          </p>
          <div>
            <button className="px-10 py-4 bg-white text-slate-950 font-black rounded-2xl hover:bg-blue-400 hover:text-white transition-all shadow-xl flex items-center gap-2">
              查看活動細則 <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Grid Offers */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {OFFERS.map((offer, i) => (
          <div 
            key={offer.id} 
            className="group bg-slate-900 rounded-[32px] border border-slate-800 overflow-hidden flex flex-col sm:flex-row hover:border-blue-500/50 transition-all hover:bg-slate-900/80 animate-fade-in-up"
            style={{ animationDelay: `${i * 100}ms` }}
          >
            <div className="w-full sm:w-48 h-48 sm:h-auto overflow-hidden">
              <img 
                src={offer.image} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                alt="" 
              />
            </div>
            <div className="flex-grow p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className={`p-1.5 rounded-lg ${offer.color}`}>
                    <offer.icon className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-xs font-black text-slate-500 uppercase tracking-widest">{offer.category}</span>
                </div>
                <h4 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">{offer.title}</h4>
                <p className="text-sm text-slate-400 leading-relaxed mb-6">
                  {offer.description}
                </p>
              </div>
              <div>
                <button className="text-sm font-black text-white flex items-center gap-1 hover:text-blue-400 transition-colors">
                  立即查看詳情 <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Newsletter / Loyalty */}
      <div className="mt-20 bg-gradient-to-br from-indigo-900/20 to-blue-900/20 rounded-[40px] border border-blue-500/10 p-12 text-center">
        <Award className="w-12 h-12 text-blue-400 mx-auto mb-6" />
        <h3 className="text-3xl font-black text-white mb-4">加入 MovieGo VIP</h3>
        <p className="text-slate-400 max-w-lg mx-auto mb-10">
          訂閱我們的優惠電子報，第一時間獲取聯名活動資訊，還能享有隱藏版購票折扣！
        </p>
        <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <input 
            type="email" 
            placeholder="輸入您的電子郵件"
            className="flex-grow bg-slate-950/50 border border-slate-800 rounded-2xl px-6 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="bg-blue-600 hover:bg-blue-500 px-8 py-3 rounded-2xl font-bold transition-all shadow-lg shadow-blue-900/40">
            立即訂閱
          </button>
        </div>
      </div>
    </div>
  );
};

export default Offers;
