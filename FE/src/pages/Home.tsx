import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import MemoryGame from "../components/MemoryGame";
import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { getAllBlogsApi } from "../api";
import { motion } from "framer-motion";
import bgHome from "../assets/background.png";

// Triết lý và trích dẫn nổi tiếng
const philosophyQuotes = [
  {
    quote: "Cuộc sống không được kiểm tra là không đáng sống",
    author: "Socrates",
    context: "Triết học cổ đại Hy Lạp"
  },
  {
    quote: "Tôi tư duy, vậy tôi tồn tại",
    author: "René Descartes", 
    context: "Triết học hiện đại"
  },
  {
    quote: "Con người bị kết án phải tự do",
    author: "Jean-Paul Sartre",
    context: "Chủ nghĩa hiện sinh"
  },
  {
    quote: "Hạnh phúc phụ thuộc vào chính chúng ta",
    author: "Aristotle",
    context: "Đạo đức học"
  }
];

// Nội dung về quy luật mâu thuẫn Mác-Lênin
const marxistDialectics = {
  title: "Quy luật Mâu thuẫn trong Triết học Mác-Lênin",
  subtitle: "Phép biện chứng duy vật - Chìa khóa hiểu thế giới",
  principles: [
    {
      title: "Mâu thuẫn là nguồn gốc của sự vận động",
      description: "Mọi sự vật, hiện tượng đều chứa đựng những mặt đối lập, tạo nên mâu thuẫn nội tại thúc đẩy sự phát triển.",
      icon: "⚡",
      color: "from-red-500 to-orange-500",
      image: "/mauThuanBienChung.jpg",
      imageNote: "Biểu tượng âm-dương thể hiện sự đối lập và hài hòa, chuyển động xoáy ốc từ trung tâm ra ngoài minh họa cách mâu thuẫn thúc đẩy sự phát triển"
    },
    {
      title: "Thống nhất và đấu tranh của các mặt đối lập",
      description: "Các mặt đối lập vừa thống nhất với nhau, vừa đấu tranh với nhau, tạo nên động lực phát triển.",
      icon: "⚖️",
      color: "from-blue-500 to-purple-500",
      image: "/card2.png",
      imageNote: "Một khung cảnh được chia đôi giữa ngày và đêm cùng tồn tại trong cùng một không gian, tượng trưng cho hai mặt đối lập. Phía ngày có ánh sáng mặt trời, hoa nở rực rỡ và sự sống sinh sôi. Phía đêm có ánh trăng, những vì sao và các sinh vật hoạt động về đêm"
    },
    {
      title: "Chuyển hóa từ lượng thành chất",
      description: "Sự tích lũy về lượng dẫn đến sự thay đổi về chất, tạo nên bước nhảy vọt trong phát triển.",
      icon: "📈",
      color: "from-green-500 to-teal-500",
      image: "/card3.png",
      imageNote: "Quá trình từ trứng → sâu bướm → nhộng → bướm minh họa sự chuyển hóa từ lượng thành chất. Sự chuyển đổi từ nhộng thành bướm được nhấn mạnh như một bước nhảy vọt về chất"
    },
    {
      title: "Phủ định của phủ định",
      description: "Sự phát triển diễn ra theo hình xoáy ốc, phủ định cái cũ để tạo ra cái mới cao hơn.",
      icon: "🌀",
      color: "from-yellow-500 to-amber-500",
      image: "/card4.png",
      imageNote: "Một đường xoáy ốc đơn giản đi lên với 5 giai đoạn rõ ràng trong chu kỳ phát triển của cây: Hạt giống → Mầm cây → Cây non → Cây trưởng thành → Hạt giống mới. Mỗi giai đoạn phủ định giai đoạn trước nhưng phát triển lên trình độ cao hơn"
    }
  ],
  examples: [
    {
      title: "Trong xã hội",
      description: "Mâu thuẫn giữa giai cấp thống trị và bị trị thúc đẩy sự phát triển xã hội",
      icon: "🏛️"
    },
    {
      title: "Trong tự nhiên",
      description: "Mâu thuẫn giữa các lực lượng tự nhiên tạo nên sự vận động của vũ trụ",
      icon: "🌍"
    },
    {
      title: "Trong tư duy",
      description: "Mâu thuẫn giữa cái cũ và cái mới trong nhận thức thúc đẩy sự phát triển khoa học",
      icon: "🧠"
    }
  ]
};

// Câu hỏi trắc nghiệm cho từng nguyên lý
const principleQuizzes = [
  {
    principle: 0,
    title: "Mâu thuẫn là nguồn gốc của sự vận động",
    detail: "Mâu thuẫn là hiện tượng khách quan, phổ biến trong mọi sự vật, hiện tượng. Mâu thuẫn tồn tại ngay trong bản thân sự vật, hiện tượng, tạo nên động lực bên trong thúc đẩy sự vận động và phát triển. Không có mâu thuẫn thì không có sự vận động, không có sự phát triển. Mâu thuẫn có tính khách quan (tồn tại độc lập với ý thức), phổ biến (trong mọi sự vật), và vĩnh viễn (luôn tồn tại).",
    detailedContent: {
      introduction: "Mâu thuẫn là một trong những quy luật cơ bản nhất của phép biện chứng duy vật. Nó giải thích tại sao mọi sự vật, hiện tượng đều vận động và phát triển không ngừng.",
      characteristics: [
        "Tính khách quan: Mâu thuẫn tồn tại độc lập với ý thức con người",
        "Tính phổ biến: Mâu thuẫn có mặt trong mọi sự vật, hiện tượng",
        "Tính vĩnh viễn: Mâu thuẫn luôn tồn tại, không bao giờ mất đi"
      ],
      mechanism: "Mâu thuẫn tạo ra sự căng thẳng nội tại trong sự vật, buộc sự vật phải vận động để giải quyết mâu thuẫn này. Quá trình giải quyết mâu thuẫn cũ chính là quá trình tạo ra mâu thuẫn mới, thúc đẩy sự phát triển liên tục."
    },
    examples: [
      {
        title: "Trong tự nhiên - Sự vận động của Trái Đất",
        content: "Trái Đất vừa quay quanh trục (tạo ngày đêm) vừa quay quanh Mặt Trời (tạo mùa). Mâu thuẫn giữa lực hướng tâm và lực ly tâm tạo nên quỹ đạo ổn định, cho phép sự sống tồn tại.",
        visual: "🌍"
      },
      {
        title: "Trong xã hội - Phát triển công nghệ",
        content: "Mâu thuẫn giữa nhu cầu năng suất cao và khả năng sản xuất hạn chế thúc đẩy con người phát minh ra máy móc, từ đó tạo ra cuộc cách mạng công nghiệp.",
        visual: "🏭"
      },
      {
        title: "Trong tư duy - Phát triển khoa học",
        content: "Mâu thuẫn giữa lý thuyết cũ (Trái Đất là trung tâm vũ trụ) và quan sát mới (các hành tinh quay quanh Mặt Trời) dẫn đến cuộc cách mạng khoa học của Copernicus và Galileo.",
        visual: "🔬"
      },
      {
        title: "Trong sinh vật - Quá trình trao đổi chất",
        content: "Mâu thuẫn giữa đồng hóa (tích lũy năng lượng) và dị hóa (tiêu hao năng lượng) tạo nên sự cân bằng động, duy trì sự sống và cho phép cơ thể phát triển.",
        visual: "🧬"
      },
      {
        title: "Trong kinh tế - Cung và cầu",
        content: "Mâu thuẫn giữa cung (sản xuất) và cầu (tiêu dùng) tạo ra sự vận động của thị trường, điều chỉnh giá cả và thúc đẩy sự phát triển kinh tế.",
        visual: "📈"
      }
    ],
    questions: [
      {
        question: "Mâu thuẫn trong triết học Mác-Lênin là gì?",
        options: [
          "Sự xung đột giữa các cá nhân",
          "Hiện tượng khách quan, phổ biến trong mọi sự vật, hiện tượng",
          "Sự bất đồng ý kiến trong xã hội",
          "Sự cạnh tranh giữa các giai cấp"
        ],
        correct: 1,
        explanation: "Mâu thuẫn là hiện tượng khách quan, tồn tại trong mọi sự vật, hiện tượng, không phụ thuộc vào ý thức con người."
      },
      {
        question: "Mâu thuẫn có vai trò gì trong sự phát triển?",
        options: [
          "Cản trở sự phát triển",
          "Là nguồn gốc, động lực của sự vận động và phát triển",
          "Không ảnh hưởng đến sự phát triển",
          "Chỉ tồn tại trong xã hội"
        ],
        correct: 1,
        explanation: "Mâu thuẫn là động lực bên trong thúc đẩy sự vận động và phát triển. Không có mâu thuẫn thì không có sự phát triển."
      },
      {
        question: "Mâu thuẫn có đặc điểm gì?",
        options: [
          "Chỉ tồn tại trong xã hội",
          "Khách quan, phổ biến, vĩnh viễn",
          "Chỉ tồn tại trong tự nhiên",
          "Có thể tạo ra hoặc xóa bỏ tùy ý"
        ],
        correct: 1,
        explanation: "Mâu thuẫn có tính khách quan (tồn tại độc lập với ý thức), phổ biến (trong mọi sự vật), và vĩnh viễn (luôn tồn tại)."
      },
      {
        question: "Ví dụ nào sau đây thể hiện mâu thuẫn trong tự nhiên?",
        options: [
          "Cuộc tranh luận giữa hai nhà khoa học",
          "Mâu thuẫn giữa lực hút và lực đẩy tạo nên sự vận động của các hành tinh",
          "Sự bất đồng ý kiến trong hội nghị",
          "Cuộc cạnh tranh giữa các công ty"
        ],
        correct: 1,
        explanation: "Mâu thuẫn giữa lực hút và lực đẩy là mâu thuẫn khách quan trong tự nhiên, tạo nên sự vận động của các hành tinh."
      },
      {
        question: "Tại sao nói 'không có mâu thuẫn thì không có sự phát triển'?",
        options: [
          "Vì mâu thuẫn gây ra sự hỗn loạn",
          "Vì mâu thuẫn là động lực bên trong thúc đẩy sự vận động và phát triển",
          "Vì mâu thuẫn làm cho mọi thứ trở nên phức tạp",
          "Vì mâu thuẫn là điều kiện cần thiết cho sự tồn tại"
        ],
        correct: 1,
        explanation: "Mâu thuẫn tạo ra động lực bên trong thúc đẩy sự vận động và phát triển. Không có mâu thuẫn thì sự vật sẽ ở trạng thái tĩnh, không phát triển."
      }
    ]
  },
  {
    principle: 1,
    title: "Thống nhất và đấu tranh của các mặt đối lập",
    detail: "Các mặt đối lập trong mâu thuẫn vừa thống nhất với nhau (cùng tồn tại trong một thể thống nhất), vừa đấu tranh với nhau (loại trừ lẫn nhau). Sự thống nhất là tạm thời, có điều kiện; sự đấu tranh là tuyệt đối, vĩnh viễn. Đây là nội dung cốt lõi của quy luật mâu thuẫn.",
    detailedContent: {
      introduction: "Quy luật này giải thích cách thức hoạt động của mâu thuẫn - các mặt đối lập vừa cần nhau vừa loại trừ nhau, tạo nên động lực phát triển.",
      characteristics: [
        "Thống nhất: Các mặt đối lập cùng tồn tại trong một thể thống nhất, không thể tách rời",
        "Đấu tranh: Các mặt đối lập loại trừ, chống đối lẫn nhau",
        "Tạm thời vs Tuyệt đối: Thống nhất có điều kiện, đấu tranh là vĩnh viễn"
      ],
      mechanism: "Sự thống nhất tạo ra sự ổn định tạm thời, cho phép sự vật tồn tại. Sự đấu tranh tạo ra sự căng thẳng, buộc sự vật phải thay đổi. Khi đấu tranh thắng thế, sự vật chuyển sang trạng thái mới."
    },
    examples: [
      {
        title: "Trong nguyên tử - Cấu trúc ổn định",
        content: "Hạt nhân (dương) và electron (âm) thống nhất tạo nên nguyên tử, nhưng lực hút và lực đẩy đấu tranh liên tục. Khi cân bằng, nguyên tử ổn định; khi mất cân bằng, xảy ra phản ứng hóa học.",
        visual: "⚛️"
      },
      {
        title: "Trong xã hội - Quan hệ giai cấp",
        content: "Giai cấp thống trị và bị trị thống nhất trong cùng một xã hội (cần nhau để tồn tại), nhưng đấu tranh về lợi ích. Khi mâu thuẫn gay gắt, xảy ra cách mạng xã hội.",
        visual: "🏛️"
      },
      {
        title: "Trong sinh vật - Cân bằng nội môi",
        content: "Cơ thể thống nhất giữa các hệ thống (tuần hoàn, hô hấp, tiêu hóa), nhưng các hệ thống đấu tranh về nguồn lực. Khi cân bằng, cơ thể khỏe mạnh; khi mất cân bằng, phát sinh bệnh tật.",
        visual: "❤️"
      },
      {
        title: "Trong tư duy - Phát triển nhận thức",
        content: "Cái cũ và cái mới thống nhất trong cùng một bộ não (cùng tồn tại), nhưng đấu tranh để chiếm ưu thế. Khi cái mới thắng, nhận thức được nâng cao.",
        visual: "🧠"
      },
      {
        title: "Trong kinh tế - Thị trường tự do",
        content: "Người mua và người bán thống nhất trong thị trường (cần nhau), nhưng đấu tranh về giá cả. Sự cạnh tranh này tạo ra hiệu quả kinh tế và đổi mới.",
        visual: "💰"
      }
    ],
    questions: [
      {
        question: "Các mặt đối lập trong mâu thuẫn có mối quan hệ như thế nào?",
        options: [
          "Chỉ thống nhất với nhau",
          "Chỉ đấu tranh với nhau",
          "Vừa thống nhất vừa đấu tranh với nhau",
          "Không có mối quan hệ gì"
        ],
        correct: 2,
        explanation: "Các mặt đối lập vừa thống nhất (cùng tồn tại trong một thể thống nhất) vừa đấu tranh (loại trừ lẫn nhau)."
      },
      {
        question: "Sự thống nhất và đấu tranh của các mặt đối lập có đặc điểm gì?",
        options: [
          "Thống nhất là tuyệt đối, đấu tranh là tạm thời",
          "Thống nhất là tạm thời, đấu tranh là tuyệt đối",
          "Cả hai đều tuyệt đối",
          "Cả hai đều tạm thời"
        ],
        correct: 1,
        explanation: "Sự thống nhất là tạm thời, có điều kiện; sự đấu tranh là tuyệt đối, vĩnh viễn."
      },
      {
        question: "Thống nhất của các mặt đối lập có nghĩa là gì?",
        options: [
          "Các mặt đối lập giống hệt nhau",
          "Các mặt đối lập cùng tồn tại trong một thể thống nhất",
          "Các mặt đối lập không có sự khác biệt",
          "Các mặt đối lập hòa hợp hoàn toàn"
        ],
        correct: 1,
        explanation: "Thống nhất có nghĩa là các mặt đối lập cùng tồn tại trong một thể thống nhất, không thể tách rời nhau."
      },
      {
        question: "Ví dụ nào sau đây thể hiện sự thống nhất và đấu tranh của các mặt đối lập?",
        options: [
          "Hai người bạn thân thiết",
          "Trong nguyên tử: thống nhất giữa hạt nhân và electron, đấu tranh giữa lực hút và lực đẩy",
          "Một đội bóng thắng trận",
          "Một cuốn sách hay"
        ],
        correct: 1,
        explanation: "Trong nguyên tử, hạt nhân và electron thống nhất tạo nên nguyên tử, nhưng lực hút và lực đẩy đấu tranh với nhau."
      },
      {
        question: "Tại sao sự đấu tranh là tuyệt đối, vĩnh viễn?",
        options: [
          "Vì đấu tranh luôn dẫn đến chiến thắng",
          "Vì đấu tranh là bản chất của mâu thuẫn, luôn tồn tại",
          "Vì đấu tranh là điều tốt đẹp",
          "Vì đấu tranh tạo ra sự ổn định"
        ],
        correct: 1,
        explanation: "Sự đấu tranh là tuyệt đối, vĩnh viễn vì nó là bản chất của mâu thuẫn, luôn tồn tại và thúc đẩy sự phát triển."
      }
    ]
  },
  {
    principle: 2,
    title: "Chuyển hóa từ lượng thành chất",
    detail: "Sự thay đổi về lượng (số lượng, quy mô, tốc độ, mức độ) dẫn đến sự thay đổi về chất (bản chất, tính chất) của sự vật, hiện tượng. Khi lượng tích lũy đến một mức độ nhất định (điểm nút), sẽ xảy ra bước nhảy vọt về chất. Đây là quy luật về cách thức phát triển của sự vật.",
    detailedContent: {
      introduction: "Quy luật này giải thích cách sự vật phát triển: từ những thay đổi nhỏ, dần dần tích lũy thành những thay đổi lớn, tạo ra bước nhảy vọt về chất.",
      characteristics: [
        "Lượng: Số lượng, quy mô, tốc độ, mức độ - những gì có thể đo đếm được",
        "Chất: Bản chất, tính chất - những đặc điểm cơ bản của sự vật",
        "Điểm nút: Mức độ giới hạn mà tại đó lượng chuyển hóa thành chất"
      ],
      mechanism: "Lượng tích lũy dần dần, từ từ, trong một khoảng thời gian nhất định. Khi đạt đến điểm nút, xảy ra bước nhảy vọt về chất - sự vật chuyển sang trạng thái mới hoàn toàn khác."
    },
    examples: [
      {
        title: "Nước đun sôi - Thay đổi trạng thái",
        content: "Khi đun nước, nhiệt độ tăng dần từ 20°C → 50°C → 80°C → 99°C (lượng tích lũy). Đến 100°C (điểm nút), nước bốc hơi đột ngột (bước nhảy vọt về chất) - từ lỏng thành hơi.",
        visual: "💧"
      },
      {
        title: "Học tập - Phát triển trí tuệ",
        content: "Học sinh tích lũy kiến thức từng ngày (lượng). Khi đạt đủ kiến thức cần thiết (điểm nút), có thể giải được bài toán khó hoặc hiểu được khái niệm mới (bước nhảy vọt về chất).",
        visual: "📚"
      },
      {
        title: "Cách mạng xã hội - Thay đổi chế độ",
        content: "Mâu thuẫn xã hội tích lũy dần (lượng). Khi đạt đến đỉnh điểm (điểm nút), bùng nổ cách mạng (bước nhảy vọt về chất) - chế độ cũ sụp đổ, chế độ mới ra đời.",
        visual: "⚡"
      },
      {
        title: "Tiến hóa sinh vật - Hình thành loài mới",
        content: "Các biến đổi nhỏ tích lũy qua nhiều thế hệ (lượng). Khi đạt đến mức độ nhất định (điểm nút), xuất hiện loài mới với đặc điểm hoàn toàn khác (bước nhảy vọt về chất).",
        visual: "🦋"
      },
      {
        title: "Phát triển công nghệ - Đột phá khoa học",
        content: "Các nghiên cứu nhỏ tích lũy qua nhiều năm (lượng). Khi đạt đến đột phá (điểm nút), tạo ra công nghệ mới hoàn toàn (bước nhảy vọt về chất) như internet, điện thoại thông minh.",
        visual: "🚀"
      }
    ],
    questions: [
      {
        question: "Quy luật chuyển hóa từ lượng thành chất nói về điều gì?",
        options: [
          "Sự thay đổi về số lượng",
          "Sự thay đổi về chất lượng",
          "Sự thay đổi về lượng dẫn đến thay đổi về chất",
          "Sự thay đổi về hình thức"
        ],
        correct: 2,
        explanation: "Quy luật này nói về mối quan hệ giữa lượng và chất: sự thay đổi về lượng dẫn đến thay đổi về chất."
      },
      {
        question: "Bước nhảy vọt về chất xảy ra khi nào?",
        options: [
          "Khi lượng thay đổi bất kỳ",
          "Khi lượng tích lũy đến điểm nút",
          "Khi chất thay đổi trước",
          "Khi có sự can thiệp từ bên ngoài"
        ],
        correct: 1,
        explanation: "Bước nhảy vọt về chất xảy ra khi lượng tích lũy đến điểm nút - mức độ nhất định."
      },
      {
        question: "Điểm nút là gì?",
        options: [
          "Điểm bắt đầu của quá trình",
          "Mức độ nhất định mà tại đó lượng chuyển hóa thành chất",
          "Điểm kết thúc của quá trình",
          "Điểm giữa của quá trình"
        ],
        correct: 1,
        explanation: "Điểm nút là mức độ nhất định mà tại đó sự tích lũy về lượng dẫn đến bước nhảy vọt về chất."
      },
      {
        question: "Ví dụ nào sau đây thể hiện quy luật chuyển hóa từ lượng thành chất?",
        options: [
          "Một người đọc sách",
          "Nước đun sôi: tăng nhiệt độ (lượng) đến 100°C (điểm nút) → chuyển từ lỏng sang hơi (chất)",
          "Một cây lớn lên",
          "Một con chim bay"
        ],
        correct: 1,
        explanation: "Nước đun sôi là ví dụ điển hình: tích lũy nhiệt độ (lượng) đến 100°C (điểm nút) → chuyển từ lỏng sang hơi (chất)."
      },
      {
        question: "Tại sao nói 'lượng tích lũy dần dần, chất thay đổi đột ngột'?",
        options: [
          "Vì lượng luôn thay đổi nhanh",
          "Vì lượng tích lũy từ từ, nhưng khi đến điểm nút thì chất thay đổi đột ngột",
          "Vì chất luôn thay đổi chậm",
          "Vì lượng và chất thay đổi cùng lúc"
        ],
        correct: 1,
        explanation: "Lượng tích lũy dần dần, từ từ, nhưng khi đến điểm nút thì chất thay đổi đột ngột, tạo ra bước nhảy vọt."
      }
    ]
  },
  {
    principle: 3,
    title: "Phủ định của phủ định",
    detail: "Sự phát triển diễn ra theo hình xoáy ốc, trong đó mỗi giai đoạn sau phủ định giai đoạn trước, nhưng không phủ định hoàn toàn mà giữ lại những yếu tố tích cực và phát triển lên trình độ cao hơn. Quá trình này lặp lại tạo thành chu kỳ phát triển. Đây là quy luật về xu hướng phát triển của sự vật.",
    detailedContent: {
      introduction: "Quy luật này giải thích xu hướng phát triển của sự vật: không phải theo đường thẳng mà theo hình xoáy ốc - có tính lặp lại nhưng ở trình độ cao hơn.",
      characteristics: [
        "Phủ định: Loại bỏ những yếu tố lỗi thời, không còn phù hợp",
        "Kế thừa: Giữ lại những yếu tố tích cực, có giá trị",
        "Phát triển: Nâng lên trình độ cao hơn, hoàn thiện hơn"
      ],
      mechanism: "Mỗi giai đoạn phát triển đều phủ định giai đoạn trước, nhưng không phủ định hoàn toàn. Nó giữ lại những yếu tố tích cực và phát triển lên trình độ cao hơn, tạo ra sự tiến bộ liên tục."
    },
    examples: [
      {
        title: "Chu trình sống của cây lúa",
        content: "Hạt lúa → Cây lúa → Hạt lúa mới. Hạt mới không giống hệt hạt cũ, mà có chất lượng tốt hơn, năng suất cao hơn. Đây là sự phát triển theo hình xoáy ốc.",
        visual: "🌾"
      },
      {
        title: "Phát triển xã hội - Thay đổi chế độ",
        content: "Chế độ phong kiến → Cách mạng tư sản → Chế độ tư bản. Chế độ mới không hoàn toàn khác, mà kế thừa những thành tựu tích cực và phát triển lên cao hơn.",
        visual: "🏛️"
      },
      {
        title: "Phát triển khoa học - Cải tiến lý thuyết",
        content: "Lý thuyết Newton → Thuyết tương đối Einstein → Vật lý lượng tử. Mỗi lý thuyết mới không phủ định hoàn toàn lý thuyết cũ, mà mở rộng và hoàn thiện hơn.",
        visual: "🔬"
      },
      {
        title: "Phát triển con người - Tích lũy kinh nghiệm",
        content: "Trẻ em → Thanh niên → Người già. Mỗi giai đoạn không mất đi hoàn toàn giai đoạn trước, mà tích lũy kinh nghiệm và trí tuệ, trở nên khôn ngoan hơn.",
        visual: "👴"
      },
      {
        title: "Phát triển công nghệ - Cải tiến sản phẩm",
        content: "Điện thoại cố định → Điện thoại di động → Smartphone. Mỗi thế hệ mới kế thừa chức năng cơ bản nhưng thêm nhiều tính năng mới, trở nên tiện lợi hơn.",
        visual: "📱"
      }
    ],
    questions: [
      {
        question: "Sự phát triển theo quy luật phủ định của phủ định có đặc điểm gì?",
        options: [
          "Diễn ra theo đường thẳng",
          "Diễn ra theo hình xoáy ốc",
          "Diễn ra theo vòng tròn khép kín",
          "Diễn ra theo đường cong"
        ],
        correct: 1,
        explanation: "Sự phát triển diễn ra theo hình xoáy ốc - có tính lặp lại nhưng ở trình độ cao hơn."
      },
      {
        question: "Phủ định trong triết học Mác-Lênin có nghĩa là gì?",
        options: [
          "Loại bỏ hoàn toàn cái cũ",
          "Giữ nguyên cái cũ",
          "Phủ định có tính kế thừa và phát triển",
          "Chỉ thay đổi hình thức"
        ],
        correct: 2,
        explanation: "Phủ định có tính kế thừa và phát triển - không loại bỏ hoàn toàn mà giữ lại yếu tố tích cực và phát triển lên cao hơn."
      },
      {
        question: "Tại sao nói phát triển theo hình xoáy ốc?",
        options: [
          "Vì phát triển theo đường cong",
          "Vì có tính lặp lại nhưng ở trình độ cao hơn",
          "Vì phát triển theo vòng tròn",
          "Vì phát triển theo đường thẳng"
        ],
        correct: 1,
        explanation: "Hình xoáy ốc thể hiện tính lặp lại nhưng ở trình độ cao hơn - mỗi chu kỳ mới đều tiến bộ hơn chu kỳ trước."
      },
      {
        question: "Ví dụ nào sau đây thể hiện quy luật phủ định của phủ định?",
        options: [
          "Một người đi bộ",
          "Lúa: Hạt → Cây → Hạt (nhưng hạt mới có chất lượng tốt hơn)",
          "Một cuốn sách được đọc",
          "Một bức tranh được vẽ"
        ],
        correct: 1,
        explanation: "Lúa là ví dụ điển hình: Hạt → Cây → Hạt, nhưng hạt mới có chất lượng tốt hơn, thể hiện sự phát triển theo hình xoáy ốc."
      },
      {
        question: "Phủ định có tính kế thừa có nghĩa là gì?",
        options: [
          "Giữ nguyên hoàn toàn cái cũ",
          "Giữ lại những yếu tố tích cực của cái cũ và phát triển lên cao hơn",
          "Loại bỏ hoàn toàn cái cũ",
          "Chỉ thay đổi tên gọi"
        ],
        correct: 1,
        explanation: "Phủ định có tính kế thừa có nghĩa là giữ lại những yếu tố tích cực của cái cũ và phát triển lên trình độ cao hơn."
      }
    ]
  }
];


// Interface cho blog
interface Blog {
  _id: string;
  title: string;
  content: string;
  author: string;
  image?: string;
  thumbnail?: string;
  topics?: string[];
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

// Tính thời gian đăng bài
const getTimeAgo = (updatedAt: string): string => {
  const now = new Date();
  const updated = new Date(updatedAt);
  const diffInMinutes = Math.floor((now.getTime() - updated.getTime()) / (1000 * 60));
  
  if (diffInMinutes < 1) return "Vừa xong";
  if (diffInMinutes === 1) return "1 phút";
  if (diffInMinutes < 60) return `${diffInMinutes} phút`;
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours === 1) return "1 giờ";
  if (diffInHours < 24) return `${diffInHours} giờ`;
  
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays === 1) return "1 ngày";
  return `${diffInDays} ngày`;
};

export default function Home() {
  const navigate = useNavigate();

  // State cho blog từ API
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loadingBlog, setLoadingBlog] = useState(true);
  const [errorBlog, setErrorBlog] = useState<string | null>(null);
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

  // State cho quiz Mác-Lênin
  const [selectedPrinciple, setSelectedPrinciple] = useState<number | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);

  // State cho Memory Game
  const [showMemoryGame, setShowMemoryGame] = useState(false);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoadingBlog(true);
        const allBlogs = await getAllBlogsApi();
        // Chỉ hiển thị blog đã được xuất bản và lấy 6 bài mới nhất theo updatedAt
        const publishedBlogs = allBlogs
          .filter((blog: Blog) => blog.published)
          .sort((a: Blog, b: Blog) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
          .slice(0, 6);
        setBlogs(publishedBlogs);
        setErrorBlog(null);
      } catch (err) {
        setErrorBlog('Không thể tải danh sách bài viết.');
        console.error('Error fetching blogs:', err);
      } finally {
        setLoadingBlog(false);
      }
    };

    fetchBlogs();
  }, []);

  // Auto-rotate quotes
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuoteIndex((prev) => (prev + 1) % philosophyQuotes.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Truncate content for preview
  const truncateContent = useCallback((content: string): string => {
    // Chuyển đổi line breaks thành spaces để hiển thị preview
    const normalizedContent = content.replace(/\n/g, ' ').replace(/\r/g, ' ');
    const strippedContent = normalizedContent.replace(/<[^>]*>?/gm, '');
    return strippedContent.length > 150 
      ? strippedContent.substring(0, 150) + '...' 
      : strippedContent;
  }, []);

  // Hàm xử lý quiz
  const handlePrincipleClick = (index: number) => {
    setSelectedPrinciple(index);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowResult(false);
    setUserAnswers([]);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === null) return;
    
    const currentQuiz = principleQuizzes[selectedPrinciple!];
    const question = currentQuiz.questions[currentQuestion];
    
    // Lưu câu trả lời của người dùng
    const newUserAnswers = [...userAnswers, selectedAnswer];
    setUserAnswers(newUserAnswers);
    
    if (selectedAnswer === question.correct) {
      setScore(score + 1);
    }
    
    if (currentQuestion < currentQuiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      setShowResult(true);
    }
  };

  const handleRestartQuiz = () => {
    setSelectedPrinciple(null);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowResult(false);
    setUserAnswers([]);
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section with Philosophy Quote */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="relative min-h-screen flex items-center justify-center px-2 sm:px-4 py-8 sm:py-12 md:py-20"
        style={{
          backgroundImage: `url(${bgHome})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Overlay để làm mờ background */}
        <div className="absolute inset-0 bg-amber-50/80"></div>
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-32 h-32 border border-amber-300 rounded-full"></div>
          <div className="absolute top-40 right-20 w-24 h-24 border border-amber-400 rounded-full"></div>
          <div className="absolute bottom-32 left-1/4 w-16 h-16 border border-amber-200 rounded-full"></div>
          <div className="absolute bottom-20 right-1/3 w-20 h-20 border border-amber-300 rounded-full"></div>
        </div>

        <div className="max-w-6xl mx-auto text-center relative z-10 px-2 sm:px-4">
          {/* Main Title */}
          <motion.h1 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl xl:text-8xl font-bold text-amber-900 mb-6 sm:mb-8 leading-tight"
            style={{ fontFamily: "'Playfair Display', serif" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            Triết Học
            <span className="block text-amber-700 text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl mt-2 sm:mt-4 font-light italic">
              Hành trình tìm kiếm chân lý
            </span>
          </motion.h1>

          {/* Philosophy Quote Carousel */}
          <motion.div 
            className="philosophy-card max-w-4xl mx-auto my-8 sm:my-12 md:my-16 p-4 sm:p-6 md:p-8 lg:p-12"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <div className="philosophy-quote">
              <motion.p 
                key={currentQuoteIndex}
                className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-amber-900 mb-4 sm:mb-6 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                {philosophyQuotes[currentQuoteIndex].quote}
              </motion.p>
              <motion.div 
                className="text-right"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <p className="text-xl text-amber-800 font-medium">
                  — {philosophyQuotes[currentQuoteIndex].author}
                </p>
                <p className="text-sm text-amber-600 mt-1 italic">
                  {philosophyQuotes[currentQuoteIndex].context}
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Call to Action */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9 }}
          >
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={() => navigate("/blogs")}
                className="w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-4 bg-amber-800 text-white rounded-full text-base sm:text-lg font-medium hover:bg-amber-900 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Khám phá bài viết triết học
              </button>
              <button
                onClick={() => setShowMemoryGame(true)}
                className="w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-4 bg-amber-800 text-white rounded-full text-base sm:text-lg font-medium hover:bg-amber-900 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                🧠 Memory Game
              </button>
            </div>
            <div className="flex gap-2">
              {philosophyQuotes.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentQuoteIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentQuoteIndex ? 'bg-amber-600' : 'bg-amber-300'
                  }`}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Marxist Dialectics Section */}
      <motion.div 
        className="py-8 sm:py-12 md:py-20 px-2 sm:px-4"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <motion.h2 
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-amber-900 mb-4 sm:mb-6"
              style={{ fontFamily: "'Playfair Display', serif" }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              {marxistDialectics.title}
            </motion.h2>
            <motion.p 
              className="text-xl text-amber-700 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {marxistDialectics.subtitle}
            </motion.p>
          </div>

          {/* Principles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-12 md:mb-16">
            {marxistDialectics.principles.map((principle, index) => (
              <motion.div
                key={index}
                className="philosophy-card group cursor-pointer overflow-hidden"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                onClick={() => handlePrincipleClick(index)}
              >
                <div className={`h-24 sm:h-28 md:h-32 bg-gradient-to-br ${principle.color} flex items-center justify-center relative overflow-hidden`}>
                  {principle.image ? (
                    <>
                      <img 
                        src={principle.image} 
                        alt={principle.title}
                        className="w-full h-full object-cover opacity-90"
                      />
                      <div className="absolute inset-0 bg-black/20"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-4xl sm:text-5xl md:text-6xl opacity-80 drop-shadow-lg">{principle.icon}</span>
                      </div>
                    </>
                  ) : (
                    <span className="text-4xl sm:text-5xl md:text-6xl opacity-80">{principle.icon}</span>
                  )}
                </div>
                <div className="p-3 sm:p-4 md:p-6">
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-amber-900 mb-2 sm:mb-3 group-hover:text-amber-800 transition-colors">
                    {principle.title}
                  </h3>
                  <p className="text-xs sm:text-sm md:text-base text-amber-700 leading-relaxed">
                    {principle.description}
                  </p>
                  {principle.imageNote && (
                    <div className="mt-2 sm:mt-3 p-2 sm:p-3 bg-amber-50/50 rounded-lg border-l-2 border-amber-300">
                      <p className="text-xs text-amber-600 italic leading-relaxed">
                        💭 {principle.imageNote}
                      </p>
                    </div>
                  )}
                  <div className="mt-3 sm:mt-4 text-center">
                    <span className="inline-block px-3 py-1 sm:px-4 sm:py-2 bg-amber-100 text-amber-800 rounded-full text-xs sm:text-sm font-medium">
                      Bấm để học và kiểm tra
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Examples Section */}
          <motion.div 
            className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-3xl p-4 sm:p-6 md:p-8 lg:p-12"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-amber-900 text-center mb-4 sm:mb-6 md:mb-8" style={{ fontFamily: "'Playfair Display', serif" }}>
              Ứng dụng trong thực tiễn
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
              {marxistDialectics.examples.map((example, index) => (
                <motion.div
                  key={index}
                  className="text-center group"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                >
                  <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {example.icon}
                  </div>
                  <h4 className="text-xl font-bold text-amber-800 mb-3 group-hover:text-amber-900 transition-colors">
                    {example.title}
                  </h4>
                  <p className="text-amber-700 leading-relaxed">
                    {example.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Call to Action */}
          <motion.div 
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <button
              onClick={() => navigate("/blogs")}
              className="px-8 py-4 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-full text-lg font-medium hover:from-amber-700 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Khám phá thêm về triết học Mác-Lênin
            </button>
          </motion.div>
        </div>
      </motion.div>

      {/* Quiz Modal */}
      {selectedPrinciple !== null && (
        <motion.div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleRestartQuiz}
        >
          <motion.div 
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            {!showResult ? (
              // Quiz Content
              <div className="p-8">
                {/* Header */}
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-amber-900 mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {principleQuizzes[selectedPrinciple].title}
                  </h2>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                    <div 
                      className="bg-gradient-to-r from-amber-500 to-orange-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${((currentQuestion + 1) / principleQuizzes[selectedPrinciple].questions.length) * 100}%` }}
                    ></div>
                  </div>
                  <p className="text-amber-700">
                    Câu hỏi {currentQuestion + 1} / {principleQuizzes[selectedPrinciple].questions.length}
                  </p>
                </div>

                {/* Detail Content */}
                <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-6 mb-8">
                  <h3 className="text-xl font-bold text-amber-900 mb-4">Nội dung chi tiết:</h3>
                  
                  {/* Image and meaning for principles with images */}
                  {marxistDialectics.principles[selectedPrinciple].image && (
                    <div className="mb-6">
                      <div className="relative h-64 sm:h-80 md:h-96 lg:h-[28rem] rounded-xl overflow-hidden mb-4">
                        <img 
                          src={marxistDialectics.principles[selectedPrinciple].image} 
                          alt={marxistDialectics.principles[selectedPrinciple].title}
                          className="w-full h-full object-contain bg-amber-50"
                        />
                        <div className="absolute inset-0 bg-black/20"></div>
                        <div className="absolute bottom-4 left-4 right-4">
                          <div className="bg-white/95 backdrop-blur-sm rounded-lg p-4 shadow-lg">
                            <p className="text-sm text-amber-800 italic leading-relaxed">
                              💭 {marxistDialectics.principles[selectedPrinciple].imageNote}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <p className="text-amber-800 leading-relaxed mb-4">
                    {principleQuizzes[selectedPrinciple].detail}
                  </p>
                  
                  {/* Introduction */}
                  {principleQuizzes[selectedPrinciple].detailedContent && (
                    <div className="mb-6">
                      <h4 className="text-lg font-bold text-amber-900 mb-3">Giới thiệu:</h4>
                      <p className="text-amber-800 leading-relaxed mb-4">
                        {principleQuizzes[selectedPrinciple].detailedContent.introduction}
                      </p>
                      
                      {/* Characteristics */}
                      <h4 className="text-lg font-bold text-amber-900 mb-3">Đặc điểm chính:</h4>
                      <ul className="space-y-2 mb-4">
                        {principleQuizzes[selectedPrinciple].detailedContent.characteristics.map((char, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <span className="text-amber-600 mt-1">•</span>
                            <span className="text-amber-800 text-sm leading-relaxed">{char}</span>
                          </li>
                        ))}
                      </ul>
                      
                      {/* Mechanism */}
                      <h4 className="text-lg font-bold text-amber-900 mb-3">Cơ chế hoạt động:</h4>
                      <p className="text-amber-800 leading-relaxed">
                        {principleQuizzes[selectedPrinciple].detailedContent.mechanism}
                      </p>
                    </div>
                  )}
                  
                  {/* Examples */}
                  <div className="mt-6">
                    <h4 className="text-lg font-bold text-amber-900 mb-3">Ví dụ minh họa:</h4>
                    <div className="space-y-4">
                      {principleQuizzes[selectedPrinciple].examples.map((example, index) => (
                        <div key={index} className="bg-white bg-opacity-50 rounded-lg p-4 border-l-4 border-amber-400">
                          <div className="flex items-start space-x-3">
                            <span className="text-2xl">{example.visual}</span>
                            <div className="flex-1">
                              <h5 className="font-bold text-amber-900 mb-2">{example.title}</h5>
                              <p className="text-amber-800 text-sm leading-relaxed">
                                {example.content}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Question */}
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-amber-900 mb-6">
                    {principleQuizzes[selectedPrinciple].questions[currentQuestion].question}
                  </h3>
                  
                  {/* Options */}
                  <div className="space-y-4">
                    {principleQuizzes[selectedPrinciple].questions[currentQuestion].options.map((option, index) => (
                      <motion.button
                        key={index}
                        className={`w-full p-4 text-left rounded-xl border-2 transition-all duration-200 ${
                          selectedAnswer === index
                            ? 'border-amber-500 bg-amber-50 text-amber-900'
                            : 'border-gray-200 hover:border-amber-300 hover:bg-amber-25'
                        }`}
                        onClick={() => handleAnswerSelect(index)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <span className="font-medium">{String.fromCharCode(65 + index)}. </span>
                        {option}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Navigation */}
                <div className="flex justify-end">
                  <button
                    onClick={handleNextQuestion}
                    disabled={selectedAnswer === null}
                    className={`px-8 py-3 rounded-lg font-medium transition-all ${
                      selectedAnswer !== null
                        ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-600 hover:to-orange-600'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    {currentQuestion < principleQuizzes[selectedPrinciple].questions.length - 1 ? 'Câu tiếp theo' : 'Xem kết quả'}
                  </button>
                </div>
              </div>
            ) : (
              // Result Content
              <div className="p-8">
                {/* Header Result */}
                <div className="text-center mb-8">
                  <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center">
                    <span className="text-4xl text-white">
                      {score === principleQuizzes[selectedPrinciple].questions.length ? '🏆' : 
                       score >= principleQuizzes[selectedPrinciple].questions.length / 2 ? '🎉' : '📚'}
                    </span>
                  </div>
                  <h2 className="text-3xl font-bold text-amber-900 mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                    Kết quả kiểm tra
                  </h2>
                  <div className="text-6xl font-bold text-amber-600 mb-4">
                    {score}/{principleQuizzes[selectedPrinciple].questions.length}
                  </div>
                  <p className="text-xl text-amber-700 mb-2">
                    {score === principleQuizzes[selectedPrinciple].questions.length ? 'Xuất sắc! Bạn đã hiểu rõ nguyên lý này!' :
                     score >= principleQuizzes[selectedPrinciple].questions.length / 2 ? 'Tốt! Hãy ôn tập thêm để hiểu sâu hơn.' :
                     'Hãy đọc lại nội dung và thử lại nhé!'}
                  </p>
                  <p className="text-amber-600">
                    Tỷ lệ đúng: {Math.round((score / principleQuizzes[selectedPrinciple].questions.length) * 100)}%
                  </p>
                </div>

                {/* Review Questions */}
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-amber-900 mb-6 text-center">Đáp án chi tiết</h3>
                  <div className="space-y-6">
                    {principleQuizzes[selectedPrinciple].questions.map((question, index) => (
                      <div key={index} className="bg-gray-50 rounded-xl p-6">
                        <div className="flex items-start space-x-3 mb-4">
                          <span className="flex-shrink-0 w-8 h-8 bg-amber-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                            {index + 1}
                          </span>
                          <div className="flex-1">
                            <h4 className="text-lg font-semibold text-amber-900 mb-3">
                              {question.question}
                            </h4>
                            <div className="space-y-2">
                              {question.options.map((option, optionIndex) => (
                                <div
                                  key={optionIndex}
                                  className={`p-3 rounded-lg border-2 ${
                                    optionIndex === question.correct
                                      ? 'border-green-500 bg-green-50 text-green-800'
                                      : optionIndex === userAnswers[index]
                                      ? 'border-red-500 bg-red-50 text-red-800'
                                      : 'border-gray-200 bg-white text-gray-700'
                                  }`}
                                >
                                  <span className="font-medium">{String.fromCharCode(65 + optionIndex)}. </span>
                                  {option}
                                  {optionIndex === question.correct && (
                                    <span className="ml-2 text-green-600 font-bold">✓ Đúng</span>
                                  )}
                                  {optionIndex === userAnswers[index] && optionIndex !== question.correct && (
                                    <span className="ml-2 text-red-600 font-bold">✗ Sai</span>
                                  )}
                                </div>
                              ))}
                            </div>
                            <div className="mt-4 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                              <p className="text-blue-800">
                                <span className="font-semibold">Giải thích:</span> {question.explanation}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-center">
                  <button
                    onClick={handleRestartQuiz}
                    className="px-8 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg hover:from-amber-600 hover:to-orange-600 transition-all font-medium"
                  >
                    Thử lại
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* Philosophy Blog Section */}
      <motion.div 
        className="py-20 px-4"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <motion.h2 
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-amber-900 mb-4 sm:mb-6"
              style={{ fontFamily: "'Playfair Display', serif" }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              Thư viện Triết học
            </motion.h2>
            <motion.p 
              className="text-xl text-amber-700 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Khám phá những tư tưởng sâu sắc, triết lý sống và những câu hỏi vĩnh cửu về con người và vũ trụ
            </motion.p>
          </div>

          {/* Blog Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loadingBlog ? (
              <div className="col-span-full text-center py-20">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-amber-800"></div>
                <p className="mt-4 text-xl text-amber-700">Đang tải bài viết triết học...</p>
              </div>
            ) : errorBlog ? (
              <div className="col-span-full text-center py-20 text-red-600 text-xl">{errorBlog}</div>
            ) : blogs.length === 0 ? (
              <div className="col-span-full text-center py-20">
                <div className="ancient-scroll rounded-2xl p-12 max-w-md mx-auto">
                  <p className="text-xl text-amber-800">Chưa có bài viết triết học nào.</p>
                  <p className="text-amber-600 mt-2">Hãy quay lại sau để khám phá những tư tưởng mới.</p>
                </div>
              </div>
            ) : (
              blogs.map((blog, index) => (
                <motion.div
                  key={blog._id}
                  className="philosophy-card cursor-pointer group overflow-hidden"
                  onClick={() => {
                    window.scrollTo(0, 0);
                    navigate(`/blogs/${blog._id}`);
                  }}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -8, transition: { duration: 0.3 } }}
                >
                  {/* Blog Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={blog.image || blog.thumbnail || 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'}
                      alt={blog.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                    <div className="absolute bottom-4 left-4">
                      <span className="bg-amber-800/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
                        {getTimeAgo(blog.updatedAt)} trước
                      </span>
                    </div>
                  </div>

                  {/* Blog Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-amber-900 mb-3 line-clamp-2 group-hover:text-amber-800 transition-colors">
                      {blog.title}
                    </h3>
                    <p className="text-amber-700 line-clamp-3 leading-relaxed mb-4">
                      {truncateContent(blog.content)}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-amber-600 italic">
                        {blog.author}
                      </span>
                      <div className="flex items-center text-amber-600 group-hover:text-amber-800 transition-colors">
                        <span className="text-sm mr-1">Đọc thêm</span>
                        <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>

          {/* View All Button */}
          {blogs.length > 0 && (
            <motion.div 
              className="text-center mt-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <button
                onClick={() => navigate("/blogs")}
                className="px-8 py-4 bg-transparent border-2 border-amber-800 text-amber-800 rounded-full text-lg font-medium hover:bg-amber-800 hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Xem tất cả bài viết triết học
              </button>
            </motion.div>
          )}
        </div>
      </motion.div>

      <Footer />

      {/* Memory Game Modal */}
      {showMemoryGame && (
        <MemoryGame onClose={() => setShowMemoryGame(false)} />
      )}
    </div>
  );
}
