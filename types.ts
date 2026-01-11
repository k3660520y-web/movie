
export interface Movie {
  id: string;
  title: string;
  englishTitle: string;
  rating: string;
  duration: string;
  genres: string[];
  poster: string;
  backdrop: string;
  description: string;
  director: string;
  cast: string[];
  releaseDate: string;
  score: number;
}

export interface Showtime {
  id: string;
  movieId: string; // 關聯的電影 ID
  date: string;    // 例如: "2026-01-20"
  time: string;    // 例如: "10:30"
  format: '2D' | '3D' | 'IMAX' | '4DX';
  hall: string;    // 例如: "第 1 廳"
  price: number;
}

export interface Cinema {
  id: string;
  name: string;
  location: string;
  showtimes: Showtime[];
}

export type BookingStep = 'movie' | 'time' | 'seat' | 'payment' | 'success';

export interface BookingState {
  movieId: string | null;
  cinemaId: string | null;
  showtimeId: string | null;
  selectedSeats: string[];
  step: BookingStep;
}
