
import React, { useState } from 'react';
import Layout from './components/Layout';
import Home from './pages/Home';
import Booking from './pages/Booking';
import Member from './pages/Member';
import Showtimes from './pages/Showtimes';
import Offers from './pages/Offers';
import { Movie, Cinema, Showtime } from './types';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  
  // 記錄從場次查詢頁面選取的具體資訊
  const [preSelectedCinemaId, setPreSelectedCinemaId] = useState<string | null>(null);
  const [preSelectedShowtimeId, setPreSelectedShowtimeId] = useState<string | null>(null);

  const handleSelectMovie = (movie: Movie) => {
    setSelectedMovie(movie);
    setPreSelectedCinemaId(null);
    setPreSelectedShowtimeId(null);
    setActiveTab('booking_flow');
  };

  const handleSelectFromShowtimes = (movie: Movie, cinema: Cinema, showtime: Showtime) => {
    setSelectedMovie(movie);
    setPreSelectedCinemaId(cinema.id);
    setPreSelectedShowtimeId(showtime.id);
    setActiveTab('booking_flow');
  };

  const handleNavigate = (tab: string) => {
    setActiveTab(tab);
    if (tab !== 'booking_flow') {
      setSelectedMovie(null);
      setPreSelectedCinemaId(null);
      setPreSelectedShowtimeId(null);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <Home onSelectMovie={handleSelectMovie} />;
      case 'booking':
        return <Showtimes onSelectShowtime={handleSelectFromShowtimes} />;
      case 'offers':
        return <Offers />;
      case 'booking_flow':
        return selectedMovie ? (
          <Booking 
            movie={selectedMovie} 
            onBack={() => handleNavigate('home')} 
          />
        ) : (
          <Home onSelectMovie={handleSelectMovie} />
        );
      case 'member':
        return <Member />;
      default:
        return <Home onSelectMovie={handleSelectMovie} />;
    }
  };

  return (
    <Layout activeTab={activeTab} onNavigate={handleNavigate}>
      {renderContent()}
      
      {/* Dynamic Global Styles for animations */}
      <style>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </Layout>
  );
};

export default App;
