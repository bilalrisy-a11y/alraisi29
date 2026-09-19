import React from 'react';
import { Search, Plus, LayoutGrid, FileText, Users, Package, Settings, BarChart3, Briefcase } from 'lucide-react';

interface DashboardCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
  trend?: string;
}

const DashboardCard = ({ title, value, icon, color, trend }: DashboardCardProps) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
    <div className="flex justify-between items-start mb-4">
      <div className={`p-3 rounded-xl ${color}`}>
        {icon}
      </div>
      {trend && (
        <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
          {trend}
        </span>
      )}
    </div>
    <div className="text-slate-500 text-sm mb-1">{title}</div>
    <div className="text-2xl font-bold text-slate-800">{value}</div>
  </div>
);

const Dashboard = () => {
  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <section>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">مرحباً بك في إدارة الورشة 👋</h2>
        <p className="text-slate-500">إليك ملخص سريع لنشاط ورشة الريسي اليوم.</p>
      </section>

      {/* Stats Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard 
          title="إجمالي التصاميم" 
          value="24" 
          icon={<FileText className="text-blue-600" />} 
          color="bg-blue-50"
          trend="+5 هذا الأسبوع"
        />
        <DashboardCard 
          title="العملاء النشطين" 
          value="12" 
          icon={<Users className="text-purple-600" />} 
          color="bg-purple-50"
          trend="+2 هذا الأسبوع"
        />
        <DashboardCard 
          title="المشاريع القائمة" 
          value="8" 
          icon={<Briefcase className="text-orange-600" />} 
          color="bg-orange-50"
        />
        <DashboardCard 
          title="إجمالي المبيعات" 
          value="4,500 د.إ" 
          icon={<BarChart3 className="text-green-600" />} 
          color="bg-green-50"
        />
      </section>

      {/* Recent Designs & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Designs Table */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-6 border-b border-slate-50 flex justify-between items-center">
            <h3 className="font-bold text-slate-800">أحدث التصاميم</h3>
            <button className="text-blue-600 text-sm font-medium">عرض الكل</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-right">
              <thead className="bg-slate-50 text-slate-500 text-sm">
                <tr>
                  <th className="px-6 py-4 font-medium">الاسم</th>
                  <th className="px-6 py-4 font-medium">التاريخ</th>
                  <th className="px-6 py-4 font-medium">العميل</th>
                  <th className="px-6 py-4 font-medium">الحالة</th>
                  <th className="px-6 py-4 font-medium">الإجراء</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {[
                  { name: 'نافذة صالة', date: '2024/05/20', customer: 'أحمد محمد', status: 'مكتمل' },
                  { name: 'باب رئيسي', date: '2024/05/21', customer: 'سلطان علي', status: 'قيد التنفيذ' },
                  { name: 'نافذة مطبخ', date: '2024/05/22', customer: 'خالد حسن', status: 'جديد' },
                ].map((design, i) => (
                  <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-700">{design.name}</td>
                    <td className="px-6 py-4 text-slate-500 text-sm">{design.date}</td>
                    <td className="px-6 py-4 text-slate-500 text-sm">{design.customer}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs ${
                        design.status === 'مكتمل' ? 'bg-green-100 text-green-700' : 
                        design.status === 'قيد التنفيذ' ? 'bg-blue-100 text-blue-700' : 'bg-orange-100 text-orange-700'
                      }`}>
                        {design.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button className="text-slate-400 hover:text-blue-600">
                        <Search size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-6 text-white shadow-lg">
            <h3 className="text-lg font-bold mb-2">ابدأ تصميم جديد</h3>
            <p className="text-blue-100 text-sm mb-6">قم بإنشاء مواصفات فتحة جديدة وابدأ الرسم فوراً.</p>
            <button className="w-full bg-white text-blue-600 py-3 rounded-xl font-bold flex items-center justify-center hover:bg-blue-50 transition-colors">
              <Plus size={20} className="ml-2" />
              تصميم جديد
            </button>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <h3 className="font-bold text-slate-800 mb-4">المهام اليومية</h3>
            <div className="space-y-4">
              {[
                { task: 'تجهيز طلبية أحمد محمد', time: '10:00 صباحاً', type: 'توصيل' },
                { task: 'مراجعة مقاسات نافذة الصالة', time: '12:30 مساءً', type: 'تصميم' },
                { task: 'شراء اكسسوارات أبواب', time: '03:00 مساءً', type: 'مشتريات' },
              ].map((task, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                  <div>
                    <div className="text-sm font-medium text-slate-700">{task.task}</div>
                    <div className="text-xs text-slate-400">{task.time}</div>
                  </div>
                  <span className="text-[10px] font-bold text-blue-500 bg-blue-50 px-2 py-0.5 rounded">
                    {task.type}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
