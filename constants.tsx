
import { Movie, Cinema } from './types';

export const MOVIES: Movie[] = [
  {
    id: 'm1',
    title: '星際奇幻旅程',
    englishTitle: 'Interstellar Odyssey',
    rating: 'PG-13',
    duration: '148 分鐘',
    genres: ['科幻', '冒險', '劇情'],
    poster: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=2094&auto=format&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=2072&auto=format&fit=crop',
    description: '在不久的未來，地球不再適合人類居住。一組探險家利用新發現的蟲洞，展開超越人類極限的宇宙航行，尋找新的宜居星球。',
    director: '克里斯多夫·諾蘭',
    cast: ['馬修·麥康納', '安·海瑟薇'],
    releaseDate: '2025-12-25',
    score: 9.2
  },
  {
    id: 'm2',
    title: '霓虹都市：覺醒',
    englishTitle: 'Neon City: Awakening',
    rating: 'R',
    duration: '125 分鐘',
    genres: ['動作', '犯罪', '科幻'],
    poster: 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=2070&auto=format&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1605806616949-1e87b487fc2f?q=80&w=2070&auto=format&fit=crop',
    description: '在一個被巨型企業統治的賽博龐克城市，一名記憶被消除的僱傭兵發現了一個足以推翻整個社會秩序的陰謀。',
    director: '丹尼·維勒納夫',
    cast: ['雷恩·葛斯林', '安娜·德哈瑪斯'],
    releaseDate: '2026-01-15',
    score: 8.5
  },
  {
    id: 'm3',
    title: '幻夢之境',
    englishTitle: 'Dreamscape',
    rating: 'G',
    duration: '95 分鐘',
    genres: ['動畫', '奇幻', '家庭'],
    poster: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1974&auto=format&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1492515114975-b062d1a270ae?q=80&w=2070&auto=format&fit=crop',
    description: '一個小女孩意外闖入了一座由人類夢境構成的花園，她必須在天亮之前學會勇氣與愛，才能找到回家的路。',
    director: '宮崎駿',
    cast: ['配音：上白石萌音', '配音：神木隆之介'],
    releaseDate: '2026-02-01',
    score: 8.9
  },
  {
    id: 'm4',
    title: '荒野獵影',
    englishTitle: 'The Revenant Shadow',
    rating: 'R',
    duration: '136 分鐘',
    genres: ['驚悚', '冒險'],
    poster: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1925&auto=format&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=80&w=2070&auto=format&fit=crop',
    description: '一名獵人在嚴酷的冬季荒野中被同伴背叛拋棄，他必須依靠驚人的意志力生存下來，並跨越數百英里進行復仇。',
    director: '阿利安卓·崗札雷·伊納利圖',
    cast: ['李奧納多·狄卡皮歐'],
    releaseDate: '2026-02-15',
    score: 8.7
  },
  {
    id: 'm5',
    title: '極速狂飆：午夜',
    englishTitle: 'Midnight Velocity',
    rating: 'PG-13',
    duration: '110 分鐘',
    genres: ['動作', '競速'],
    poster: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2070&auto=format&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?q=80&w=2070&auto=format&fit=crop',
    description: '在東京的午夜街頭，一場非法的地下賽車比賽正在上演。速度與激情的背後，隱藏著家族榮譽的沉重代價。',
    director: '林詣彬',
    cast: ['馮·迪索'],
    releaseDate: '2026-03-01',
    score: 8.2
  }
];

export const CINEMAS: Cinema[] = [
  {
    id: 'c1',
    name: 'MovieGo 台北旗艦店',
    location: '台北市信義區',
    showtimes: [
      { id: 's1', movieId: 'm1', date: '2026-01-20', time: '10:30', format: 'IMAX', hall: '第 1 廳 (IMAX)', price: 420 },
      { id: 's2', movieId: 'm1', date: '2026-01-20', time: '14:20', format: '2D', hall: '第 3 廳', price: 320 },
      { id: 's3', movieId: 'm2', date: '2026-01-20', time: '18:15', format: '4DX', hall: '第 5 廳 (4DX)', price: 580 },
      { id: 's4', movieId: 'm3', date: '2026-01-20', time: '21:50', format: '2D', hall: '第 2 廳', price: 320 },
      { id: 's1-2', movieId: 'm1', date: '2026-01-21', time: '11:00', format: 'IMAX', hall: '第 1 廳 (IMAX)', price: 420 },
      { id: 's4-2', movieId: 'm3', date: '2026-01-21', time: '15:45', format: '2D', hall: '第 2 廳', price: 320 },
      { id: 's5', movieId: 'm4', date: '2026-01-20', time: '13:00', format: '2D', hall: '第 4 廳', price: 300 }
    ]
  },
  {
    id: 'c2',
    name: 'MovieGo 台中大遠百',
    location: '台中市西屯區',
    showtimes: [
      { id: 's6', movieId: 'm2', date: '2026-01-20', time: '11:00', format: '2D', hall: '第 2 廳', price: 300 },
      { id: 's7', movieId: 'm1', date: '2026-01-20', time: '15:30', format: 'IMAX', hall: '第 1 廳 (IMAX)', price: 400 },
      { id: 's8', movieId: 'm5', date: '2026-01-20', time: '19:45', format: '2D', hall: '第 3 廳', price: 300 }
    ]
  }
];
