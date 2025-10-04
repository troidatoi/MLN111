import React from 'react';
import { motion } from 'framer-motion';
import { FaUsers, FaHandshake, FaLightbulb, FaChartLine, FaGraduationCap, FaCode, FaRobot, FaImage } from 'react-icons/fa';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

const AboutUsPage: React.FC = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const teamMembers = [
    {
      name: 'Phạm Lê Thắng Hùng',
      studentId: 'SE172380',
      role: 'Full-Stack Developer',
      description: 'Phát triển toàn diện cả frontend và backend cho blog triết học'
    },
    {
      name: 'Nguyễn Thị Hồng Hạnh',
      studentId: 'SE181585',
      role: 'Full-Stack Developer',
      description: 'Phát triển toàn diện cả frontend và backend cho blog triết học'
    },
    {
      name: 'Vũ Thị Yến Nhi',
      studentId: 'SA180193',
      role: 'Content Creator',
      description: 'Tạo nội dung triết học và quản lý nội dung blog'
    },
    {
      name: 'Võ Đức Thịnh',
      studentId: 'SA170257',
      role: 'Content Manager',
      description: 'Quản lý và biên tập nội dung triết học chất lượng cao'
    }
  ];

  const aiTools = [
    {
      icon: <FaRobot size={40} />,
      title: 'ChatGPT',
      description: 'Hỗ trợ nghiên cứu triết học và tạo nội dung blog chất lượng cao',
      color: 'text-green-600'
    },
    {
      icon: <FaCode size={40} />,
      title: 'Cursor',
      description: 'Công cụ coding AI giúp phát triển blog triết học hiện đại và tối ưu',
      color: 'text-blue-600'
    },
    {
      icon: <FaImage size={40} />,
      title: 'Lovart',
      description: 'Tạo hình ảnh AI minh họa cho các bài viết triết học',
      color: 'text-purple-600'
    }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Pattern giống trang chủ */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-50/80 via-orange-50/80 to-yellow-50/80">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-32 h-32 border border-amber-200 rounded-full"></div>
          <div className="absolute top-40 right-20 w-24 h-24 border border-orange-200 rounded-full"></div>
          <div className="absolute bottom-20 left-1/3 w-28 h-28 border border-yellow-200 rounded-full"></div>
          <div className="absolute top-60 left-1/4 w-16 h-16 border border-amber-300 rounded-full"></div>
          <div className="absolute bottom-40 right-1/4 w-20 h-20 border border-orange-300 rounded-full"></div>
        </div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-amber-400/20 to-orange-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-40 right-20 w-96 h-96 bg-gradient-to-r from-yellow-400/15 to-amber-400/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-gradient-to-r from-orange-400/20 to-red-400/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
        </div>
      </div>
      
      <Header />
      <div className="relative z-10 max-w-7xl mx-auto px-4 pt-10 pb-16">
        {/* Hero Section */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ duration: 0.8 }}
        >
          <div className="flex flex-col lg:flex-row items-center justify-between mb-20 gap-12">
            <div className="flex-1 text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative"
              >
                <div className="absolute -top-4 -left-4 w-24 h-24 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-full blur-xl"></div>
                <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-xl"></div>
                <h1 className="relative text-6xl md:text-8xl font-bold uppercase text-center bg-gradient-to-r from-amber-600 via-orange-600 to-yellow-600 bg-clip-text text-transparent animate-pulse">
                  About Us
                </h1>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="mt-6"
              >
                <p className="text-2xl md:text-3xl font-bold text-amber-900 mb-4">
                  Group1 - Dự án MLN111
                </p>
                <p className="text-lg md:text-xl text-orange-700 mb-6">
                  Trường Đại học FPT
                </p>
                <div className="inline-block bg-gradient-to-r from-amber-100 to-orange-100 backdrop-blur-sm rounded-2xl p-6 border border-amber-200 shadow-lg">
                  <p className="text-lg text-amber-800 font-medium">
                    🧠 Blog triết học - Nơi khám phá những tư tưởng sâu sắc và ý nghĩa cuộc sống
                  </p>
                </div>
              </motion.div>
            </div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex-1 flex justify-center lg:justify-end relative"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-400/30 to-orange-400/30 rounded-3xl blur-2xl transform rotate-3"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/30 to-red-400/30 rounded-3xl blur-2xl transform -rotate-3"></div>
                <img 
                  src="/PhilosoSpace_Blog_Header.jpg" 
                  alt="PhilosoSpace Blog Header" 
                  className="relative w-[340px] md:w-[420px] rounded-3xl shadow-2xl border-2 border-amber-200/50 transform hover:scale-105 transition-all duration-500" 
                />
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Story Section */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="mb-20 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-3xl blur-3xl"></div>
            <div className="relative bg-white/80 backdrop-blur-lg rounded-3xl p-8 border border-amber-200 shadow-2xl">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full mb-4 shadow-lg">
                  <span className="text-2xl">🚀</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent mb-4">
                  Về Dự Án Của Chúng Tôi
                </h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-sm">💡</span>
                    </div>
                    <p className="text-gray-800 leading-relaxed">
                      Dự án này được thực hiện bởi <span className="text-amber-600 font-semibold">Group1</span> trong khuôn khổ môn học <span className="text-orange-600 font-semibold">MLN111</span> tại Trường Đại học FPT.
                    </p>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-sm">🎯</span>
                    </div>
                    <p className="text-gray-800 leading-relaxed">
                      Chúng tôi đã phát triển một <span className="text-amber-600 font-semibold">blog triết học</span> với mục tiêu chia sẻ những tư tưởng sâu sắc.
                    </p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-sm">⚡</span>
                    </div>
                    <p className="text-gray-800 leading-relaxed">
                      Dự án sử dụng các <span className="text-orange-600 font-semibold">công nghệ hiện đại</span> và được hỗ trợ bởi các công cụ AI tiên tiến.
                    </p>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-sm">✨</span>
                    </div>
                    <p className="text-gray-800 leading-relaxed">
                      Tạo ra nội dung triết học <span className="text-amber-600 font-semibold">chất lượng cao</span> và trải nghiệm đọc tuyệt vời.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Team Members Section */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl"></div>
              <h2 className="relative text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-6">
                👥 Thành Viên Nhóm
              </h2>
              <p className="text-xl text-white/80 max-w-3xl mx-auto">
                Đội ngũ phát triển dự án blog triết học với sự đam mê và chuyên môn cao
              </p>
            </motion.div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => {
              const colors = [
                'from-pink-500 to-rose-500',
                'from-blue-500 to-cyan-500', 
                'from-purple-500 to-indigo-500',
                'from-orange-500 to-yellow-500'
              ];
              const bgColors = [
                'from-pink-500/20 to-rose-500/20',
                'from-blue-500/20 to-cyan-500/20',
                'from-purple-500/20 to-indigo-500/20', 
                'from-orange-500/20 to-yellow-500/20'
              ];
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className="group relative h-full"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${bgColors[index]} rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500`}></div>
                  <div className="relative bg-white/10 backdrop-blur-lg rounded-3xl p-6 shadow-2xl border border-white/20 transition-all duration-500 group-hover:shadow-3xl group-hover:-translate-y-3 h-full flex flex-col">
                    <div className="text-center flex-1 flex flex-col">
                      <div className="relative mb-6">
                        <div className={`w-24 h-24 bg-gradient-to-br ${colors[index]} rounded-full flex items-center justify-center mx-auto shadow-2xl group-hover:scale-110 transition-transform duration-500`}>
                          <FaUsers className="text-white" size={32} />
                        </div>
                        <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                          <span className="text-white text-sm font-bold">✓</span>
                        </div>
                        <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                          <span className="text-white text-xs">⭐</span>
                        </div>
                      </div>
                      <h3 className="font-bold text-xl mb-3 text-white">{member.name}</h3>
                      <p className={`font-semibold mb-3 text-sm bg-gradient-to-r ${colors[index]} bg-clip-text text-transparent px-3 py-1 rounded-full inline-block border border-white/20`}>
                        {member.studentId}
                      </p>
                      <p className="text-sm text-cyan-200 mb-4 font-medium">{member.role}</p>
                      <p className="text-sm text-white/80 leading-relaxed flex-1">{member.description}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* AI Tools Section */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent mb-4">
              🤖 Công Cụ AI Được Sử Dụng
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Các công cụ AI tiên tiến hỗ trợ phát triển dự án blog triết học
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {aiTools.map((tool, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-amber-400/10 to-orange-400/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-amber-200/50 transition-all duration-300 group-hover:shadow-2xl group-hover:-translate-y-2">
                  <div className="text-center">
                    <div className="relative mb-6">
                      <div className={`w-16 h-16 ${tool.color.replace('text-', 'bg-').replace('-600', '-100')} rounded-2xl flex items-center justify-center mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <div className={tool.color}>{tool.icon}</div>
                      </div>
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-bold">AI</span>
                      </div>
                    </div>
                    <h3 className="font-bold text-xl mb-3 text-gray-800">{tool.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{tool.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* AI Prompts Guide Section */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="mt-16 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-400/20 via-orange-400/20 to-red-400/20 rounded-3xl"></div>
            <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-amber-200/50 shadow-2xl">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent mb-4">
                  📚 Hướng Dẫn AI Prompts
                </h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                  Bộ hướng dẫn chi tiết về cách sử dụng AI để phát triển dự án blog triết học từ đầu đến cuối. 
                  Bao gồm tất cả các prompt cần thiết để tạo ra một dự án hoàn chỉnh.
                </p>
              </div>
              
              <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
                <div className="flex-1">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center gap-3 p-3 bg-amber-50 rounded-xl">
                      <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                        <span className="text-amber-600 font-bold text-sm">15</span>
                      </div>
                      <span className="text-sm font-medium text-gray-700">Sections</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-xl">
                      <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                        <span className="text-orange-600 font-bold text-sm">148</span>
                      </div>
                      <span className="text-sm font-medium text-gray-700">Dòng Code</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-red-50 rounded-xl">
                      <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                        <span className="text-red-600 font-bold text-sm">3</span>
                      </div>
                      <span className="text-sm font-medium text-gray-700">AI Tools</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-xl">
                      <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                        <span className="text-purple-600 font-bold text-sm">MD</span>
                      </div>
                      <span className="text-sm font-medium text-gray-700">Markdown</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="/AI_Prompts_Guide.md"
                    download="AI_Prompts_Guide.md"
                    className="group relative bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center gap-3"
                  >
                    <svg className="w-5 h-5 group-hover:animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Tải Hướng Dẫn
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">!</span>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Mission Section */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="mt-16 p-8 bg-gradient-to-r from-amber-800 to-orange-800 text-white rounded-2xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Mục Tiêu Dự Án</h2>
            <p className="text-base md:text-lg mb-4">
              Dự án MLN111 của Group1 nhằm phát triển một blog triết học hiện đại, sử dụng các công nghệ AI tiên tiến để tạo ra nội dung triết học chất lượng cao. Chúng tôi cam kết mang đến một không gian triết học sâu sắc, nơi mọi người có thể khám phá ý nghĩa cuộc sống và phát triển tư duy phản biện.
            </p>
            <div className="flex items-center justify-center mt-6">
              <FaGraduationCap size={24} className="mr-2" />
              <span className="text-lg font-semibold">Trường Đại học FPT - Môn MLN111</span>
            </div>
          </div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default AboutUsPage; 