import { useState, useEffect, useCallback } from 'react';
import { 
  LayoutDashboard, 
  PlusCircle, 
  FolderOpen, 
  Users, 
  Package, 
  Settings, 
  ChevronLeft, 
  Menu,
  Search,
  Bell
} from 'lucide-react';

// Simplified Navigation for now
export type View = 'dashboard' | 'new-design' | 'designs' | 'customers' | 'inventory' | 'profiles' | 'settings';

interface SidebarItem {
  id: View;
  labelAr: string;
  icon: React.ReactNode;
}

const SIDEBAR_ITEMS: SidebarItem[] = [
  { id: 'dashboard', labelAr: 'الرئيسية', icon: <LayoutDashboard size={20} /> },
  { id: 'new-design', labelAr: 'تصميم جديد', icon: <PlusCircle size={20} /> },
  { id: 'designs', labelAr: 'التصاميم', icon: <FolderOpen size={20} /> },
  { id: 'customers', labelAr: 'العملاء', icon: <Users size={20} /> },
  { id: 'inventory', labelAr: 'المخزون', icon: <Package size={20} /> },
  { id: 'profiles', labelAr: 'القطاعات', icon: <Settings size={20} /> },
  { id: 'settings', labelAr: 'الإعدادات', icon: <Settings size={20} /> },
];

interface SidebarProps {
  activeView: View;
  onViewChange: (view: View) => void;
}

export const Sidebar = ({ activeView, onViewChange }: SidebarProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside className={`bg-slate-900 text-white transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-64'} flex flex-col h-screen fixed right-0 top-0 z-50`}>
      <div className="p-6 flex items-center justify-between border-b border-slate-800">
        {!isCollapsed && <span className="font-bold text-xl truncate text-blue-400">الريسي للألومنيوم</span>}
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 hover:bg-slate-800 rounded-lg"
        >
          <Menu size={20} />
        </button>
      </div>

      <nav className="flex-1 py-6 overflow-y-auto">
        {SIDEBAR_ITEMS.map((item) => (
          <button
            key={item.id}
            onClick={() => onViewChange(item.id)}
            className={`w-full flex items-center px-6 py-4 transition-colors ${
              activeView === item.id 
                ? 'bg-blue-600 text-white border-l-4 border-blue-300' 
                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <span className="ml-4">{item.icon}</span>
            {!isCollapsed && <span className="text-lg">{item.labelAr}</span>}
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-800 text-xs text-slate-500 text-center">
        {!isCollapsed && <p>© 2024 Al-Raisi Aluminum</p>}
      </div>
    </aside>
  );
};

export const TopBar = ({ onMenuClick }: { onMenuClick: () => void }) => {
  return (
    <header className="bg-white shadow-sm h-16 flex items-center justify-between px-6 sticky top-0 z-40">
      <div className="flex items-center">
        <button onClick={onMenuClick} className="p-2 ml-4 hover:bg-slate-100 rounded-md">
          <Menu size={24} />
        </button>
        <h1 className="text-xl font-semibold text-slate-800">ورشة الريسي للألومنيوم</h1>
      </div>
      <div className="flex items-center space-x-reverse space-x-4">
        <div className="relative">
          <Search className="absolute right-3 top-2.5 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="بحث..." 
            className="pr-10 pl-4 py-2 bg-slate-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
          />
        </div>
        <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-full relative">
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
          A
        </div>
      </div>
    </header>
  );
};
