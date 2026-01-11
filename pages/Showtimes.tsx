
import React, { useState, useMemo } from 'react';
import { CINEMAS, MOVIES } from '../constants';
import { Movie, Cinema, Showtime } from '../types';
import { MapPin, Calendar, Clock, Ticket, ChevronRight, Filter } from 'lucide-react';

interface ShowtimesProps {
  onSelectShowtime: (movie: Movie, cinema: Cinema, showtime: Showtime) => void;
}

const Showtimes: React.FC<ShowtimesProps> = ({ onSelectShowtime }) => {
  const [selectedDate, setSelectedDate] = useState('2026-01-20');
  const [selectedCinemaId, setSelectedCinemaId] = useState<string>('all');

  // 生成接下來 5 天的日期選項
  const dateOptions = useMemo(() => {
    return [
      { label: '01/20 (二)', value: '2026-01-20' },
      { label: '01/21 (三)', value: '2026-01-21' },
      { label: '01/22 (四)', value: '2026-01-22' },
      { label: '01/23 (五)', value: '2026-01-23' },
      { label: '01/24 (六)', value: '2026-01-24' },
    ];
  }, []);

  const filteredShowtimes = useMemo(() => {
    let results: { cinema: Cinema; showtime: Showtime; movie: Movie }[] = [];
    
    CINEMAS.forEach(cinema => {
      if (selectedCinemaId === 'all' || cinema.id === selectedCinemaId) {
        cinema.showtimes.forEach(st => {
          if (st.date === selectedDate) {
            const movie = MOVIES.find(m => m.id === st.movieId);
            if (movie) {
              results.push({ cinema, showtime: st, movie });
            }
          }
        });
      }
    });

    // 按時間排序
    return results.sort((a, b) => a.showtime.time.localeCompare(b.showtime.time));
  }, [selectedDate, selectedCinemaId]);

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <h2 className="text-3xl font-black text-white flex items-center gap-2">
            <Calendar className="text-blue-500 w-8 h-8" />
            場次查詢
          </h2>
          <p className="text-slate-500 mt-1">即時查看各大影城放映時刻表</p>
        </div>

        <div className="flex gap-4">
          <select 
            value={selectedCinemaId}
            onChange={(e) => setSelectedCinemaId(e.target.value)}
            className="bg-slate-900 border border-slate-700 text-white rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="all">所有影城</option>
            {CINEMAS.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </div>
      </div>

      {/* Date Tabs */}
      <div className="flex overflow-x-auto gap-4 mb-8 pb-2 scrollbar-hide">
        {dateOptions.map((date) => (
          <button
            key={date.value}
            onClick={() => setSelectedDate(date.value)}
            className={`
              flex-none px-6 py-3 rounded-2xl font-bold transition-all border-2
              ${selectedDate === date.value 
                ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-900/40' 
                : 'bg-slate-900 border-slate-800 text-slate-500 hover:border-slate-700'}
            `}
          >
            {date.label}
          </button>
        ))}
      </div>

      {/* Showtimes List */}
      <div className="space-y-4">
        {filteredShowtimes.length > 0 ? (
          filteredShowtimes.map(({ cinema, showtime, movie }) => (
            <div 
              key={showtime.id}
              className="group bg-slate-900 rounded-3xl border border-slate-800 p-6 flex flex-col md:flex-row items-center gap-6 hover:border-blue-500/50 transition-all hover:bg-slate-900/80"
            >
              <div className="flex-none w-full md:w-32 aspect-[2/3] rounded-2xl overflow-hidden shadow-xl">
                <img src={movie.poster} alt={movie.title} className="w-full h-full object-cover" />
              </div>

              <div className="flex-grow w-full">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        movie.rating === 'G' ? 'bg-green-500' : 
                        movie.rating === 'PG-13' ? 'bg-blue-500' : 'bg-red-500'
                      }`}>
                        {movie.rating}
                      </span>
                      <h3 className="text-xl font-black text-white group-hover:text-blue-400 transition-colors">
                        {movie.title}
                      </h3>
                    </div>
                    <p className="text-sm text-slate-500 italic">{movie.englishTitle}</p>
                  </div>
                  
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-blue-400 font-bold mb-1">
                      <MapPin className="w-4 h-4" />
                      {cinema.name}
                    </div>
                    <div className="text-xs text-slate-600 font-bold tracking-widest uppercase">
                      {showtime.hall}
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-6 p-4 bg-slate-950/50 rounded-2xl border border-slate-800/50">
                  <div className="flex items-center gap-6">
                    <div className="text-center">
                      <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest mb-1">播放時間</p>
                      <p className="text-3xl font-black text-white">{showtime.time}</p>
                    </div>
                    <div className="h-10 w-px bg-slate-800"></div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest mb-1">格式</p>
                      <span className="px-3 py-1 bg-blue-500/10 text-blue-500 rounded-lg text-xs font-black border border-blue-500/20">
                        {showtime.format}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right hidden sm:block">
                      <p className="text-sm font-black text-white">NT$ {showtime.price}</p>
                      <p className="text-[10px] text-green-500 font-bold">● 熱烈販售中</p>
                    </div>
                    <button 
                      onClick={() => onSelectShowtime(movie, cinema, showtime)}
                      className="px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-xl font-bold text-sm transition-all shadow-lg shadow-blue-900/40 flex items-center gap-2"
                    >
                      <Ticket className="w-4 h-4" />
                      立即訂票
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-20 bg-slate-900/50 rounded-3xl border border-slate-800 border-dashed">
            <Clock className="w-16 h-16 text-slate-700 mx-auto mb-4" />
            <h4 className="text-xl font-bold text-slate-500">此日期目前沒有放映場次</h4>
            <p className="text-slate-600 text-sm mt-2">請選擇其他日期或影城進行查詢</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Showtimes;
