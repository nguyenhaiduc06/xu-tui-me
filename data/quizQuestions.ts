export interface QuizQuestion {
  id: number;
  question: string;
  emoji: string;
  options: string[];
  gradient: string[];
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "Cuối tuần bạn thích làm gì nhất?",
    emoji: "🌟",
    options: ["Ở nhà chill với Netflix", "Đi chơi với bạn bè", "Khám phá địa điểm mới"],
    gradient: ['#667eea', '#764ba2']
  },
  {
    id: 2,
    question: "Món ăn nào khiến bạn hạnh phúc nhất?",
    emoji: "🍜",
    options: ["Phở truyền thống", "Bánh mì thịt nướng", "Trà sữa + bánh flan"],
    gradient: ['#f093fb', '#f5576c']
  },
  {
    id: 3,
    question: "Bạn là người như thế nào trong nhóm bạn?",
    emoji: "👥",
    options: ["Người lắng nghe", "Kẻ tạo mood", "Người lên kế hoạch"],
    gradient: ['#4facfe', '#00f2fe']
  },
  {
    id: 4,
    question: "Thể loại nhạc nào làm bạn vibe nhất?",
    emoji: "🎵",
    options: ["Ballad Việt", "Pop/EDM", "Rap/Hip-hop"],
    gradient: ['#43e97b', '#38f9d7']
  },
  {
    id: 5,
    question: "Khi stress, bạn thường làm gì?",
    emoji: "😤",
    options: ["Nghe nhạc thư giãn", "Tâm sự với bạn bè", "Tập thể dục/chạy bộ"],
    gradient: ['#fa709a', '#fee140']
  },
  {
    id: 6,
    question: "Điều gì khiến bạn cảm thấy hạnh phúc?",
    emoji: "😊",
    options: ["Được người khác quan tâm", "Hoàn thành mục tiêu", "Những khoảnh khắc bình yên"],
    gradient: ['#a8edea', '#fed6e3']
  },
  {
    id: 7,
    question: "Bạn thích hẹn hò ở đâu?",
    emoji: "💕",
    options: ["Quán cà phê ấm cúng", "Rạp chiếu phim", "Công viên/ngoài trời"],
    gradient: ['#ff9a9e', '#fecfef']
  },
  {
    id: 8,
    question: "Điều gì quan trọng nhất trong tình yêu?",
    emoji: "❤️",
    options: ["Sự thấu hiểu", "Niềm vui cùng nhau", "Tin tương và trung thực"],
    gradient: ['#ffecd2', '#fcb69f']
  },
  {
    id: 9,
    question: "Bạn là người như thế nào khi yêu?",
    emoji: "🥰",
    options: ["Lãng mạn và ngọt ngào", "Vui vẻ và hài hước", "Chân thành và sâu sắc"],
    gradient: ['#a18cd1', '#fbc2eb']
  },
  {
    id: 10,
    question: "Hoạt động nào bạn muốn làm cùng crush?",
    emoji: "🌈",
    options: ["Nấu ăn cùng nhau", "Du lịch khám phá", "Xem phim và trò chuyện"],
    gradient: ['#fad0c4', '#ffd1ff']
  },
  {
    id: 11,
    question: "Điều gì mô tả bạn tốt nhất?",
    emoji: "✨",
    options: ["Người mơ mộng", "Người thực tế", "Người phiêu lưu"],
    gradient: ['#ff9a56', '#ffad56']
  }
];