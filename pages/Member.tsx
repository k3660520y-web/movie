
import React from 'react';
import { Settings, Ticket, LogOut, ChevronRight, Award, Shield, Bell } from 'lucide-react';

const Member: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl animate-fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Info */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-slate-900 rounded-3xl p-8 border border-slate-800 text-center">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl font-black border-4 border-slate-900 shadow-xl">
              MG
            </div>
            <h3 className="text-2xl font-black">MovieGo 測試員</h3>
            <p className="text-slate-500 text-sm mb-6">movie_lover_2026@gmail.com</p>
            <div className="flex justify-center gap-2">
              <span className="px-3 py-1 bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 rounded-full text-xs font-bold flex items-center gap-1">
                <Award className="w-3 h-3" /> 金級會員
              </span>
            </div>
          </div>

          <div className="bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden">
            {[
              { icon: Ticket, label: '我的票券', count: '1' },
              { icon: Bell, label: '通知中心', count: '3' },
              { icon: Shield, label: '帳號安全', count: '' },
              { icon: Settings, label: '設定', count: '' },
              { icon: LogOut, label: '登出', count: '', color: 'text-red-400' }
            ].map((item, i) => (
              <button key={i} className={`w-full flex items-center justify-between p-4 hover:bg-slate-800 transition-colors border-b border-slate-800 last:border-0`}>
                <div className="flex items-center gap-3">
                  <item.icon className={`w-5 h-5 ${item.color || 'text-slate-400'}`} />
                  <span className={`font-bold ${item.color || 'text-slate-200'}`}>{item.label}</span>
                </div>
                <div className="flex items-center gap-2">
                  {item.count && <span className="bg-blue-600 text-[10px] font-black px-1.5 py-0.5 rounded-full">{item.count}</span>}
                  <ChevronRight className="w-4 h-4 text-slate-600" />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Orders & Stats */}
        <div className="lg:col-span-2 space-y-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 text-center">
              <p className="text-2xl font-black text-blue-400">12</p>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">累積觀影</p>
            </div>
            <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 text-center">
              <p className="text-2xl font-black text-indigo-400">2,480</p>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">紅利積分</p>
            </div>
            <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 text-center">
              <p className="text-2xl font-black text-green-400">3</p>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">優惠券</p>
            </div>
            <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 text-center">
              <p className="text-2xl font-black text-orange-400">85%</p>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">成就進度</p>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-xl font-black flex items-center gap-2">
              <Ticket className="w-6 h-6 text-blue-400" />
              最近訂購的票券
            </h4>
            
            <div className="bg-slate-900 rounded-3xl border border-slate-800 p-6 flex flex-col md:flex-row gap-6 hover:border-blue-500/50 transition-colors group cursor-pointer">
              <div className="w-full md:w-32 aspect-[2/3] rounded-2xl overflow-hidden shadow-lg">
                <img src="https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=2094&auto=format&fit=crop" className="w-full h-full object-cover" alt="" />
              </div>
              <div className="flex-grow">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest bg-blue-400/10 px-2 py-0.5 rounded-full mb-2 inline-block">COMING SOON</span>
                    <h5 className="text-xl font-bold">星際奇幻旅程</h5>
                    <p className="text-sm text-slate-500">2026/01/20 18:15 @ MovieGo 台北旗艦店</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-black">NT$ 1,160</p>
                    <p className="text-xs text-slate-500">2 張票券</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex-grow h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div className="w-full h-full bg-blue-500"></div>
                  </div>
                  <span className="text-xs font-bold text-blue-400 whitespace-nowrap">付款完成</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-blue-600/10 rounded-3xl border border-blue-500/20 p-8">
            <h4 className="font-bold text-lg mb-2">專屬任務</h4>
            <p className="text-slate-400 text-sm mb-6">完成任務即可獲得 2026 年限量版頭像框與 100 積分！</p>
            <button className="px-6 py-2 bg-blue-600 hover:bg-blue-500 rounded-xl font-bold text-sm transition-all">查看任務詳情</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Member;
