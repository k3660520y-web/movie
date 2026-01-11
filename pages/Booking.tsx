
import React, { useState } from 'react';
// Correctly import Movie, BookingState, and BookingStep from types.ts
import { Movie, BookingState, BookingStep } from '../types';
// Correctly import CINEMAS from constants.tsx
import { CINEMAS } from '../constants';
import { ChevronLeft, MapPin, Calendar, Users, CreditCard, CheckCircle2, QrCode } from 'lucide-react';
import SeatPicker from '../components/SeatPicker';

interface BookingProps {
  movie: Movie;
  onBack: () => void;
}

const Booking: React.FC<BookingProps> = ({ movie, onBack }) => {
  const [booking, setBooking] = useState<BookingState>({
    movieId: movie.id,
    cinemaId: null,
    showtimeId: null,
    selectedSeats: [],
    step: 'movie' // We treat the start of booking page as 'time' selection essentially
  });

  const [currentStep, setCurrentStep] = useState<BookingStep>('time');

  const selectedCinema = CINEMAS.find(c => c.id === booking.cinemaId);
  const selectedShowtime = selectedCinema?.showtimes.find(s => s.id === booking.showtimeId);

  const handleToggleSeat = (seatId: string) => {
    setBooking(prev => ({
      ...prev,
      selectedSeats: prev.selectedSeats.includes(seatId)
        ? prev.selectedSeats.filter(id => id !== seatId)
        : [...prev.selectedSeats, seatId]
    }));
  };

  const totalPrice = (selectedShowtime?.price || 0) * booking.selectedSeats.length;

  return (
    <div className="min-h-screen bg-slate-950 pb-32">
      {/* Progress Header */}
      <div className="bg-slate-900 border-b border-slate-800 sticky top-16 z-40">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <button onClick={onBack} className="p-2 hover:bg-slate-800 rounded-full transition-colors">
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <div className="hidden md:flex items-center gap-12">
            {[
              { id: 'time', icon: Calendar, label: '選擇場次' },
              { id: 'seat', icon: Users, label: '選擇座位' },
              { id: 'payment', icon: CreditCard, label: '線上付款' },
              { id: 'success', icon: CheckCircle2, label: '完成取票' }
            ].map((s, i) => (
              <div key={s.id} className="flex items-center gap-3">
                <div className={`
                  w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all
                  ${currentStep === s.id ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-900/40' : ''}
                  ${i < ['time', 'seat', 'payment', 'success'].indexOf(currentStep) ? 'bg-green-600 border-green-600 text-white' : 'border-slate-700 text-slate-500'}
                `}>
                  {i < ['time', 'seat', 'payment', 'success'].indexOf(currentStep) ? <CheckCircle2 className="w-5 h-5" /> : i + 1}
                </div>
                <span className={`text-sm font-medium ${currentStep === s.id ? 'text-blue-400' : 'text-slate-500'}`}>{s.label}</span>
              </div>
            ))}
          </div>

          <div className="text-right">
            <h4 className="font-bold text-sm md:text-base">{movie.title}</h4>
            <p className="text-xs text-slate-500">{movie.rating} | {movie.duration}</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Step: Time Selection */}
        {currentStep === 'time' && (
          <div className="max-w-4xl mx-auto space-y-8 animate-fade-in-up">
            <div className="flex items-center gap-3 mb-4">
              <MapPin className="w-6 h-6 text-blue-400" />
              <h3 className="text-xl font-bold">選擇影城</h3>
            </div>

            <div className="grid gap-6">
              {CINEMAS.map(cinema => (
                <div key={cinema.id} className={`bg-slate-900 p-6 rounded-3xl border transition-all ${booking.cinemaId === cinema.id ? 'border-blue-500 ring-1 ring-blue-500' : 'border-slate-800'}`}>
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                    <div>
                      <h4 className="text-lg font-bold">{cinema.name}</h4>
                      <p className="text-sm text-slate-500">{cinema.location}</p>
                    </div>
                    <button 
                      onClick={() => setBooking(prev => ({ ...prev, cinemaId: cinema.id }))}
                      className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${booking.cinemaId === cinema.id ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
                    >
                      {booking.cinemaId === cinema.id ? '已選取' : '選擇此影城'}
                    </button>
                  </div>

                  {booking.cinemaId === cinema.id && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 animate-fade-in">
                      {cinema.showtimes.map(st => (
                        <button
                          key={st.id}
                          onClick={() => setBooking(prev => ({ ...prev, showtimeId: st.id }))}
                          className={`
                            p-4 rounded-2xl border transition-all text-center
                            ${booking.showtimeId === st.id ? 'bg-blue-600/20 border-blue-500' : 'bg-slate-800/50 border-transparent hover:border-slate-600'}
                          `}
                        >
                          <div className={`text-xl font-black ${booking.showtimeId === st.id ? 'text-blue-400' : 'text-white'}`}>{st.time}</div>
                          <div className="text-[10px] uppercase tracking-wider text-slate-500 mt-1">{st.format}</div>
                          <div className="text-xs font-bold text-slate-300 mt-2">NT$ {st.price}</div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-12 flex justify-end">
              <button
                disabled={!booking.cinemaId || !booking.showtimeId}
                onClick={() => setCurrentStep('seat')}
                className="px-12 py-4 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 disabled:text-slate-600 rounded-2xl font-bold shadow-xl shadow-blue-900/40 transition-all flex items-center gap-2"
              >
                下一步：選擇座位
              </button>
            </div>
          </div>
        )}

        {/* Step: Seat Selection */}
        {currentStep === 'seat' && (
          <div className="max-w-5xl mx-auto animate-fade-in">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-black mb-2">選擇您的座位</h3>
              <p className="text-slate-400">已選 {booking.selectedSeats.length} 個座位</p>
            </div>

            <SeatPicker 
              selectedSeats={booking.selectedSeats}
              onToggleSeat={handleToggleSeat}
            />

            <div className="mt-12 flex flex-col md:flex-row items-center justify-between p-8 bg-slate-900 rounded-3xl border border-slate-800 gap-6">
              <div className="flex items-center gap-8">
                <div>
                  <p className="text-xs text-slate-500 mb-1">已選座位</p>
                  <p className="font-bold text-blue-400">
                    {booking.selectedSeats.length > 0 ? booking.selectedSeats.join(', ') : '尚未選位'}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-1">總計金額</p>
                  <p className="text-2xl font-black text-white">NT$ {totalPrice}</p>
                </div>
              </div>
              <div className="flex gap-4 w-full md:w-auto">
                <button 
                  onClick={() => setCurrentStep('time')}
                  className="flex-grow px-8 py-4 bg-slate-800 hover:bg-slate-700 rounded-2xl font-bold transition-all"
                >
                  上一步
                </button>
                <button 
                  disabled={booking.selectedSeats.length === 0}
                  onClick={() => setCurrentStep('payment')}
                  className="flex-grow md:flex-none px-12 py-4 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 disabled:text-slate-600 rounded-2xl font-bold shadow-xl shadow-blue-900/40 transition-all"
                >
                  前往付款
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step: Payment */}
        {currentStep === 'payment' && (
          <div className="max-w-3xl mx-auto animate-fade-in-up">
            <div className="bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden shadow-2xl">
              <div className="p-8 border-b border-slate-800 flex justify-between items-center">
                <h3 className="text-xl font-bold">訂單明細</h3>
                <span className="text-slate-500 text-sm">訂單編號: MG-882931</span>
              </div>
              
              <div className="p-8 space-y-6">
                <div className="flex gap-6">
                  <img src={movie.poster} className="w-24 h-32 object-cover rounded-xl" alt="" />
                  <div className="flex-grow">
                    <h4 className="text-xl font-black text-blue-400">{movie.title}</h4>
                    <p className="text-slate-400 text-sm mb-4">{movie.englishTitle}</p>
                    <div className="grid grid-cols-2 gap-y-2 text-sm">
                      <span className="text-slate-500">地點：</span><span className="text-slate-200">{selectedCinema?.name}</span>
                      <span className="text-slate-500">場次：</span><span className="text-slate-200">{selectedShowtime?.time} ({selectedShowtime?.format})</span>
                      <span className="text-slate-500">座位：</span><span className="text-slate-200">{booking.selectedSeats.join(', ')}</span>
                    </div>
                  </div>
                </div>

                <div className="h-px bg-slate-800 my-8"></div>

                <div className="space-y-4">
                  <h5 className="font-bold">選擇付款方式</h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button className="flex items-center gap-4 p-4 rounded-2xl border border-blue-500 bg-blue-500/10 text-left">
                      <div className="w-6 h-6 rounded-full border-2 border-blue-500 flex items-center justify-center">
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      </div>
                      <span className="font-bold">信用卡 / 簽帳金融卡</span>
                    </button>
                    <button className="flex items-center gap-4 p-4 rounded-2xl border border-slate-700 bg-slate-800/30 text-left hover:border-slate-500 transition-colors">
                      <div className="w-6 h-6 rounded-full border-2 border-slate-700"></div>
                      <span className="font-bold text-slate-400">行動支付 (Line Pay / Apple Pay)</span>
                    </button>
                  </div>
                </div>

                <div className="bg-slate-950/50 p-6 rounded-2xl border border-slate-800 mt-8">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-slate-400">票價 (NT$ {selectedShowtime?.price} x {booking.selectedSeats.length})</span>
                    <span className="font-bold">NT$ {totalPrice}</span>
                  </div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-slate-400">手續費</span>
                    <span className="font-bold text-green-500">免手續費 (會員優惠)</span>
                  </div>
                  <div className="h-px bg-slate-800 mb-4"></div>
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold">應付金額</span>
                    <span className="text-3xl font-black text-blue-400">NT$ {totalPrice}</span>
                  </div>
                </div>
              </div>

              <div className="p-8 bg-slate-900 border-t border-slate-800 flex flex-col md:flex-row gap-4">
                <button 
                  onClick={() => setCurrentStep('seat')}
                  className="flex-grow py-4 bg-slate-800 hover:bg-slate-700 rounded-2xl font-bold transition-all"
                >
                  回上一步
                </button>
                <button 
                  onClick={() => setCurrentStep('success')}
                  className="flex-[2] py-4 bg-blue-600 hover:bg-blue-500 rounded-2xl font-bold shadow-xl shadow-blue-900/40 transition-all"
                >
                  確認付款並取票
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step: Success */}
        {currentStep === 'success' && (
          <div className="max-w-2xl mx-auto text-center animate-fade-in">
            <div className="inline-flex p-4 bg-green-500/10 rounded-full mb-8">
              <CheckCircle2 className="w-16 h-16 text-green-500" />
            </div>
            <h2 className="text-4xl font-black mb-4">訂票成功！</h2>
            <p className="text-slate-400 mb-12">祝您觀影愉快，我們在影廳見！</p>

            <div className="bg-white p-8 rounded-[40px] text-slate-900 shadow-2xl relative overflow-hidden">
              {/* Ticket Decoration */}
              <div className="absolute top-1/2 -left-6 w-12 h-12 bg-slate-950 rounded-full -translate-y-1/2"></div>
              <div className="absolute top-1/2 -right-6 w-12 h-12 bg-slate-950 rounded-full -translate-y-1/2"></div>
              
              <div className="border-b-2 border-dashed border-slate-200 pb-6 mb-6">
                <div className="flex justify-between items-start mb-6">
                  <div className="text-left">
                    <h4 className="text-2xl font-black mb-1">{movie.title}</h4>
                    <p className="text-sm font-bold text-blue-600 tracking-wider">ELECTRONIC TICKET</p>
                  </div>
                  <div className="p-2 bg-slate-100 rounded-lg">
                    <QrCode className="w-12 h-12 text-slate-900" />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-y-4 text-left">
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Cinema</p>
                    <p className="font-black text-lg">{selectedCinema?.name}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Seats</p>
                    <p className="font-black text-lg">{booking.selectedSeats.join(', ')}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Date & Time</p>
                    <p className="font-black text-lg">2026/01/20 {selectedShowtime?.time}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Format</p>
                    <p className="font-black text-lg">{selectedShowtime?.format}</p>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <p className="text-[10px] font-bold text-slate-400 mb-2 uppercase tracking-[0.3em]">Redemption Code</p>
                <p className="text-3xl font-black tracking-[0.2em]">668 - 1102 - 99</p>
              </div>
            </div>

            <div className="mt-12 space-y-4">
              <button 
                onClick={onBack}
                className="w-full py-4 bg-blue-600 hover:bg-blue-500 rounded-2xl font-bold shadow-xl shadow-blue-900/40 transition-all"
              >
                回到首頁
              </button>
              <button className="w-full py-4 bg-slate-900 hover:bg-slate-800 rounded-2xl font-bold border border-slate-800 transition-all">
                加入 Apple Wallet / Google Pay
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Booking;
