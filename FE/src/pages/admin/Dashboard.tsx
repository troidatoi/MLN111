import { useState, useEffect } from "react";
import {
  getAllAccountsApi,
  getAllBlogsApi,
} from "../../api";
import { Users, FileText, TrendingUp } from "lucide-react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';

// Đăng ký các thành phần cần thiết cho Chart.js
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

interface ThongKeNguoiDung {
  tongSoNguoiDung: number;
  tongSoTuVanVien: number;
  tongSoKhachHang: number;
  nguoiDungMoiThangNay: number;
  nguoiDungHoatDong: number;
  nguoiDungKhongHoatDong: number;
  nguoiDungTheoVaiTro: {
    customer: number;
    consultant: number;
  };
  dangTai: boolean;
}

// Interface cho blog
interface Blog {
  _id: string;
  title: string;
  content: string;
  authorId: {
    _id: string;
    fullName: string;
    username: string;
  };
  image?: string;
  thumbnail?: string;
  topics?: string[];
  published: 'draft' | 'published' | 'unpublished' | 'rejected';
  comments: any[];
  createdAt: string;
  updatedAt: string;
  anDanh: boolean;
}

const Dashboard = () => {
  const [thongKeNguoiDung, setThongKeNguoiDung] = useState<ThongKeNguoiDung>({
    tongSoNguoiDung: 0,
    tongSoTuVanVien: 0,
    tongSoKhachHang: 0,
    nguoiDungMoiThangNay: 0,
    nguoiDungHoatDong: 0,
    nguoiDungKhongHoatDong: 0,
    nguoiDungTheoVaiTro: {
      customer: 0,
      consultant: 0,
    },
    dangTai: true,
  });

  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loadingBlogs, setLoadingBlogs] = useState<boolean>(true);

  // Fetch user statistics
  useEffect(() => {
    const fetchUserStats = async () => {
      try {
        setThongKeNguoiDung(prev => ({ ...prev, dangTai: true }));
        const accounts = await getAllAccountsApi();
        
        const now = new Date();
        const currentMonth = now.getMonth();
        const currentYear = now.getFullYear();
        
        const nguoiDungMoiThangNay = accounts.filter((account: any) => {
          const accountDate = new Date(account.createdAt);
          return accountDate.getMonth() === currentMonth && accountDate.getFullYear() === currentYear;
        }).length;

        const nguoiDungHoatDong = accounts.filter((account: any) => account.isActive).length;
        const nguoiDungKhongHoatDong = accounts.length - nguoiDungHoatDong;
        
        const tongSoTuVanVien = accounts.filter((account: any) => account.role === 'consultant').length;
        const tongSoKhachHang = accounts.filter((account: any) => account.role === 'customer').length;

        setThongKeNguoiDung({
          tongSoNguoiDung: accounts.length,
          tongSoTuVanVien,
          tongSoKhachHang,
          nguoiDungMoiThangNay,
          nguoiDungHoatDong,
          nguoiDungKhongHoatDong,
          nguoiDungTheoVaiTro: {
            customer: tongSoKhachHang,
            consultant: tongSoTuVanVien,
          },
          dangTai: false,
        });
      } catch (error) {
        console.error('Error fetching user stats:', error);
        setThongKeNguoiDung(prev => ({ ...prev, dangTai: false }));
      }
    };

    fetchUserStats();
  }, []);

  // Fetch blog statistics
  useEffect(() => {
    const fetchBlogStats = async () => {
      try {
        setLoadingBlogs(true);
        const allBlogs = await getAllBlogsApi();
        setBlogs(allBlogs);
        setLoadingBlogs(false);
      } catch (error) {
        console.error('Error fetching blogs:', error);
        setLoadingBlogs(false);
      }
    };

    fetchBlogStats();
  }, []);

  // Tính toán số tài khoản đã viết blog
  const taiKhoanDaVietBlog = blogs.reduce((acc, blog) => {
    const authorId = blog.authorId._id;
    if (!acc.includes(authorId)) {
      acc.push(authorId);
    }
    return acc;
  }, [] as string[]).length;

  // Tính toán phần trăm
  const phanTramDaVietBlog = thongKeNguoiDung.tongSoNguoiDung > 0 
    ? (taiKhoanDaVietBlog / thongKeNguoiDung.tongSoNguoiDung) * 100 
    : 0;

  // Thống kê blog
  const blogStats = {
    total: blogs.length,
    published: blogs.filter(blog => blog.published === 'published').length,
    draft: blogs.filter(blog => blog.published === 'draft').length,
    unpublished: blogs.filter(blog => blog.published === 'unpublished').length,
    rejected: blogs.filter(blog => blog.published === 'rejected').length,
  };

  // Thống kê blog theo tháng
  const getBlogsByMonth = () => {
    const monthlyData = Array(12).fill(0);
    blogs.forEach(blog => {
      const month = new Date(blog.createdAt).getMonth();
      monthlyData[month]++;
    });
    return monthlyData;
  };

  // Thống kê tác giả
  const getAuthorStats = () => {
    const authorMap = new Map();
    blogs.forEach(blog => {
      const authorName = blog.authorId.fullName;
      if (authorMap.has(authorName)) {
        authorMap.set(authorName, authorMap.get(authorName) + 1);
      } else {
        authorMap.set(authorName, 1);
      }
    });
    
    return Array.from(authorMap.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
  };

  const authorStats = getAuthorStats();
  const maxCount = authorStats.length > 0 ? Math.max(...authorStats.map(a => a.count)) : 1;

  // Chart data cho trạng thái blog
  const blogStatusData = {
    labels: ['Đã xuất bản', 'Bản nháp', 'Chưa xuất bản', 'Từ chối'],
    datasets: [{
      data: [blogStats.published, blogStats.draft, blogStats.unpublished, blogStats.rejected],
      backgroundColor: [
        '#10B981', // green-500
        '#F59E0B', // amber-500
        '#6B7280', // gray-500
        '#EF4444', // red-500
      ],
      borderWidth: 0,
    }],
  };

  // Chart data cho blog theo tháng
  const monthlyBlogData = {
    labels: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12'],
    datasets: [{
      label: 'Số bài viết',
      data: getBlogsByMonth(),
      backgroundColor: '#F59E0B',
      borderColor: '#D97706',
      borderWidth: 2,
    }],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  return (
    <div className="space-y-6 mt-4">
      {/* User Statistics Section */}
      <div className="bg-white dark:bg-darkgray p-6 rounded-lg">
        <div className="mb-6">
          <h2 className="text-xl font-semibold">Thống kê người dùng</h2>
        </div>

        {thongKeNguoiDung.dangTai ? (
          <div className="flex justify-center items-center h-60">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Total Users */}
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-gray-500">Tổng số người dùng</p>
                  <h3 className="text-2xl font-bold text-amber-500">{thongKeNguoiDung.tongSoNguoiDung}</h3>
                </div>
                <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center">
                  <Users className="w-6 h-6 text-amber-500" />
                </div>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Hoạt động: <span className="font-medium text-green-600">{thongKeNguoiDung.nguoiDungHoatDong}</span></span>
                <span className="text-gray-500">Không hoạt động: <span className="font-medium text-red-500">{thongKeNguoiDung.nguoiDungKhongHoatDong}</span></span>
              </div>
            </div>

            {/* User Roles - Blog Authors */}
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-gray-500">Tài khoản đã viết blog</p>
                  <h3 className="text-2xl font-bold text-amber-500">{taiKhoanDaVietBlog}</h3>
                </div>
                <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center">
                  <FileText className="w-6 h-6 text-amber-500" />
                </div>
              </div>
              <div className="mt-2">
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-amber-500 h-2.5 rounded-full" style={{ width: `${phanTramDaVietBlog}%` }}></div>
                </div>
                <div className="flex justify-between mt-1 text-xs text-gray-500">
                  <span>{phanTramDaVietBlog.toFixed(1)}%</span>
                  <span>của tổng số người dùng</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Blog Statistics Section */}
      <div className="bg-white p-8 rounded-2xl shadow-lg border border-amber-100">
        <div className="mb-6">
          <h3 className="text-lg font-bold text-amber-700 flex items-center">
            <FileText className="w-6 h-6 mr-2 text-amber-500" />
            Thống kê bài viết
          </h3>
        </div>

        {loadingBlogs ? (
          <div className="text-amber-400 text-center">Đang tải dữ liệu...</div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Blog Status Chart */}
            <div>
              <h2 className="text-xl font-bold mb-4 text-center text-amber-700 tracking-wide">Trạng thái bài viết</h2>
              {blogStats.total > 0 ? (
                <div className="h-64">
                  <Pie data={blogStatusData} options={chartOptions} />
                </div>
              ) : (
                <div className="text-amber-400 text-center">Chưa có dữ liệu</div>
              )}
            </div>

            {/* Blog by Month Chart */}
            <div>
              <h2 className="text-xl font-bold mb-4 text-center text-amber-700 tracking-wide">Bài viết theo tháng</h2>
              {blogStats.total > 0 ? (
                <div className="h-64">
                  <Bar data={monthlyBlogData} options={barOptions} />
                </div>
              ) : (
                <div className="text-amber-400 text-center">Chưa có dữ liệu</div>
              )}
            </div>
          </div>
        )}

        {/* Blog Summary Stats */}
        {!loadingBlogs && blogStats.total > 0 && (
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-amber-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-amber-600">{blogStats.total}</div>
              <div className="text-sm text-amber-700">Tổng bài viết</div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-green-600">{blogStats.published}</div>
              <div className="text-sm text-green-700">Đã xuất bản</div>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-yellow-600">{blogStats.draft}</div>
              <div className="text-sm text-yellow-700">Bản nháp</div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-gray-600">{blogStats.unpublished}</div>
              <div className="text-sm text-gray-700">Chưa xuất bản</div>
            </div>
          </div>
        )}

        {/* Top Authors */}
        {!loadingBlogs && authorStats.length > 0 && (
          <div className="mt-8">
            <h3 className="text-lg font-bold text-amber-700 mb-4 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-amber-500" />
              Top tác giả
            </h3>
            <div className="space-y-3">
              {authorStats.map((author, idx) => (
                <div key={author.name} className="bg-white rounded-xl px-4 py-3 border border-amber-50 shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-amber-500 font-semibold">#{idx + 1}</span>
                    <span className="text-xs bg-amber-100 text-amber-700 rounded-full px-2 py-0.5 font-medium">{author.count} bài</span>
                  </div>
                  <div className="font-medium text-base text-amber-800 mb-1">{author.name}</div>
                  <div className="w-full h-2 bg-amber-100 rounded-full">
                    <div className="h-2 bg-amber-400 rounded-full" style={{ width: `${(author.count / maxCount) * 100}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;