
import React from 'react';

interface SeatPickerProps {
  selectedSeats: string[];
  onToggleSeat: (seatId: string) => void;
}

const SeatPicker: React.FC<SeatPickerProps> = ({ selectedSeats, onToggleSeat }) => {
  const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  const cols = Array.from({ length: 12 }, (_, i) => i + 1);

  // Mock sold seats
  const soldSeats = ['B4', 'B5', 'C8', 'D1', 'E5', 'E6', 'E7'];

  return (
    <div className="bg-slate-900 p-6 md:p-12 rounded-3xl border border-slate-800 shadow-2xl overflow-x-auto">
      {/* Screen */}
      <div className="w-full max-w-xl mx-auto mb-16 relative">
        <div className="h-2 bg-blue-500/20 w-full rounded-full blur-sm"></div>
        <div className="h-1 bg-blue-500 w-full rounded-full shadow-[0_0_15px_rgba(59,130,246,0.5)]"></div>
        <p className="text-center text-xs text-slate-500 mt-4 tracking-[0.5em] font-medium">螢幕方向 SCREEN</p>
      </div>

      {/* Seats Grid */}
      <div className="grid gap-4 min-w-[500px]">
        {rows.map((row) => (
          <div key={row} className="flex justify-center items-center gap-3">
            <span className="text-xs text-slate-600 font-bold w-4 text-center">{row}</span>
            <div className="flex gap-2">
              {cols.map((col) => {
                const id = `${row}${col}`;
                const isSold = soldSeats.includes(id);
                const isSelected = selectedSeats.includes(id);

                return (
                  <button
                    key={id}
                    disabled={isSold}
                    onClick={() => onToggleSeat(id)}
                    className={`
                      w-6 h-6 sm:w-8 sm:h-8 rounded-md text-[10px] font-bold transition-all duration-200
                      ${isSold ? 'bg-slate-800 text-slate-700 cursor-not-allowed border border-slate-700' : ''}
                      ${isSelected ? 'bg-blue-500 text-white shadow-[0_0_10px_rgba(59,130,246,0.5)] scale-110' : ''}
                      ${!isSold && !isSelected ? 'bg-slate-700/50 text-slate-400 hover:bg-slate-600 border border-slate-600' : ''}
                      ${col === 3 || col === 10 ? 'mr-6' : ''}
                    `}
                    title={id}
                  >
                    {col}
                  </button>
                );
              })}
            </div>
            <span className="text-xs text-slate-600 font-bold w-4 text-center">{row}</span>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="mt-12 flex flex-wrap justify-center gap-6">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-slate-700/50 border border-slate-600"></div>
          <span className="text-xs text-slate-400">可選</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-blue-500 shadow-[0_0_5px_rgba(59,130,246,0.5)]"></div>
          <span className="text-xs text-slate-400">您的選擇</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-slate-800 border border-slate-700"></div>
          <span className="text-xs text-slate-400">已售出</span>
        </div>
      </div>
    </div>
  );
};

export default SeatPicker;
