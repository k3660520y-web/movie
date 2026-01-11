
import React, { useState, useEffect, useCallback } from 'react';
import { MOVIES } from '../constants';
import { Movie } from '../types';
import { Star, Clock, Play, Sparkles, ChevronRight, Loader2, Ticket, ChevronLeft } from 'lucide-react';
import { getMovieRecommendation } from '../services/geminiService';

interface HomeProps {
  onSelectMovie: (movie: Movie) => void;
}

const Home: React.FC<HomeProps> = ({ onSelectMovie }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [mood, setMood] = useState('');
  const [aiRecs, setAiRecs] = useState<any[]>([]);
  const [isLoadingRecs, setIsLoadingRecs] = useState(false);

  const featuredMovies = MOVIES.slice(0, 5);
  const currentMovie = featuredMovies[currentIdx];

  // 自動輪播邏輯
  const nextSlide = useCallback(() => {
    setCurrentIdx((prev) => (prev + 1) % featuredMovies.length);
  }, [featuredMovies.length]);

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  const handleGetRecs = async () => {
    if (!mood.trim()) return;
    setIsLoadingRecs(true);
    const recs = await getMovieRecommendation(mood);
    if (recs) setAiRecs(recs);
    setIsLoadingRecs(false);
  };

  return (
    <div className="pb-20">
      {/* Hero Banner Carousel */}
      <section className="relative h-[70vh] md:h-[85vh] overflow-hidden group">
        {/* Backdrop Backgrounds with cross-fade */}
        {featuredMovies.map((movie, idx) => (
          <div 
            key={movie.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${idx === currentIdx ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
          >
            <img 
              src={movie.backdrop} 
              alt={movie.title}
              className="w-full h-full object-cover scale-105"
            />
            {/* Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/20 to-transparent"></div>
          </div>
        ))}

        {/* Content Section */}
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 lg:p-24 z-20">
          <div key={currentMovie.id} className="max-w-3xl animate-fade-in-up">
            <div className="flex items-center gap-3 mb-4">
               <span className="px-3 py-1 bg-blue-600 text-xs font-bold rounded-full text-white shadow-lg shadow-blue-600/30">電影熱映中</span>
               <span className="text-slate-400 text-xs font-bold tracking-widest uppercase">Slide {currentIdx + 1} / {featuredMovies.length}</span>
            </div>
            
            <h2 className="text-4xl md:text-7xl font-black mb-2 text-white drop-shadow-2xl">{currentMovie.title}</h2>
            <p className="text-xl md:text-2xl text-slate-300/80 mb-6 font-medium italic drop-shadow-lg">{currentMovie.englishTitle}</p>
            
            <div className="flex items-center gap-6 mb-8 text-sm md:text-base text-slate-300">
              <div className="flex items-center gap-1.5 px-2 py-1 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                <span className="font-black text-yellow-500 text-lg">{currentMovie.score}</span>
              </div>
              <div className="flex items-center gap-1 opacity-80">
                <Clock className="w-5 h-5" />
                <span>{currentMovie.duration}</span>
              </div>
              <div className="hidden sm:flex flex-wrap gap-2">
                {currentMovie.genres.map(g => (
                  <span key={g} className="px-2 py-0.5 bg-white/10 backdrop-blur-md border border-white/10 rounded text-xs">{g}</span>
                ))}
              </div>
            </div>

            <p className="text-slate-400 max-w-xl mb-10 line-clamp-2 md:line-clamp-3 text-sm md:text-base leading-relaxed hidden sm:block">
              {currentMovie.description}
            </p>

            <div className="flex gap-4">
              <button 
                onClick={() => onSelectMovie(currentMovie)}
                className="px-8 py-4 bg-blue-600 hover:bg-blue-500 rounded-2xl font-bold flex items-center gap-3 transition-all active:scale-95 shadow-xl shadow-blue-600/30"
              >
                <Ticket className="w-6 h-6" />
                立即訂票
              </button>
              <button className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-2xl font-bold flex items-center gap-3 transition-all">
                <Play className="w-6 h-6" />
                觀看預告
              </button>
            </div>
          </div>
        </div>

        {/* Carousel Indicators */}
        <div className="absolute bottom-10 right-6 md:right-12 z-30 flex gap-3">
          {featuredMovies.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIdx(idx)}
              className={`h-1.5 transition-all duration-500 rounded-full ${idx === currentIdx ? 'w-12 bg-blue-500' : 'w-4 bg-white/20 hover:bg-white/40'}`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* Side Controls (Arrows) */}
        <button 
          onClick={() => setCurrentIdx((prev) => (prev === 0 ? featuredMovies.length - 1 : prev - 1))}
          className="absolute left-6 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-black/20 backdrop-blur-sm border border-white/5 opacity-0 group-hover:opacity-100 transition-all hover:bg-black/40"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
        <button 
          onClick={nextSlide}
          className="absolute right-6 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-black/20 backdrop-blur-sm border border-white/5 opacity-0 group-hover:opacity-100 transition-all hover:bg-black/40"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>
      </section>

      {/* AI Smart Rec Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="bg-gradient-to-br from-indigo-900/40 to-blue-900/40 border border-indigo-500/30 rounded-3xl p-8 shadow-2xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-indigo-500 rounded-lg">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white">AI 智能電影推薦</h3>
              <p className="text-slate-400 text-sm">告訴我們你的心情，讓 MovieGo AI 為你選片</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <input 
              type="text"
              value={mood}
              onChange={(e) => setMood(e.target.value)}
              placeholder="例如：我想看部能讓我哭的、或者是熱血沸騰的..."
              className="flex-grow bg-slate-900/60 border border-slate-700 rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
            />
            <button 
              onClick={handleGetRecs}
              disabled={isLoadingRecs}
              className="px-10 py-4 bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-800 disabled:cursor-not-allowed rounded-2xl font-bold transition-all shadow-lg flex items-center justify-center gap-2"
            >
              {isLoadingRecs ? <Loader2 className="w-5 h-5 animate-spin" /> : '開始推薦'}
            </button>
          </div>

          {aiRecs.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 animate-fade-in">
              {aiRecs.map((rec, i) => (
                <div key={i} className="bg-slate-900/80 p-6 rounded-2xl border border-indigo-500/20 hover:border-indigo-500/50 transition-all hover:-translate-y-1">
                  <h4 className="text-lg font-bold text-indigo-300 mb-2">《{rec.title}》</h4>
                  <p className="text-sm text-slate-300 mb-4 line-clamp-3 leading-relaxed">「{rec.reason}」</p>
                  <div className="pt-4 border-t border-slate-800 flex items-center gap-2">
                    <span className="text-xs text-slate-500">搭配零食：</span>
                    <span className="text-xs font-bold text-orange-400">{rec.snack}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Now Playing Grid */}
      <section className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-2xl font-bold flex items-center gap-2">
            熱映中 Now Playing
            <span className="text-xs font-normal text-slate-500 ml-2">({MOVIES.length} 部電影)</span>
          </h3>
          <button className="text-blue-400 text-sm flex items-center hover:underline">
            查看全部 <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
          {MOVIES.map(movie => (
            <div 
              key={movie.id}
              className="group cursor-pointer"
              onClick={() => onSelectMovie(movie)}
            >
              <div className="relative aspect-[2/3] rounded-2xl overflow-hidden mb-4 shadow-xl shadow-black/50">
                <img 
                  src={movie.poster} 
                  alt={movie.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-4 right-4 bg-slate-900/90 backdrop-blur-md px-2 py-1 rounded-lg border border-slate-700 flex items-center gap-1">
                  <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                  <span className="text-xs font-bold">{movie.score}</span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
                  <button className="w-full py-3 bg-blue-600 rounded-xl font-bold text-sm shadow-xl">立即訂票</button>
                </div>
              </div>
              <h4 className="font-bold text-lg text-slate-200 group-hover:text-blue-400 transition-colors line-clamp-1">{movie.title}</h4>
              <p className="text-sm text-slate-500 line-clamp-1">{movie.englishTitle}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
