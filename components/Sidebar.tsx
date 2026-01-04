
import React from 'react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { id: 'tracker', label: 'Email Tracker', icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
    { id: 'templates', label: 'AI Templates', icon: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.673.337a4 4 0 01-2.506.327l-1.98-.396a14.035 14.035 0 00-1.015-.149L4.853 15.2a1 1 0 01-.306-1.976l.306-.051a16.035 16.035 0 011.156.17l1.98.396a6 6 0 003.76-.49l.673-.337a8 8 0 015.147-.689l2.387.477a4 4 0 012.044 1.093m-9.996 3.346c.627.195 1.293.298 1.954.306m0 0l1.033-.033m-1.033.033l-1.033-.033' },
    { id: 'settings', label: 'Settings', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' },
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-200 h-full flex flex-col fixed left-0 top-0">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-8">
          <div className="bg-indigo-600 w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold">F</div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">FollowUp AI</span>
        </div>

        <nav className="space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all ${
                activeTab === item.id
                  ? 'bg-indigo-50 text-indigo-700'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon} />
              </svg>
              {item.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="mt-auto p-4 border-t border-slate-100">
        <div className="flex items-center gap-3 p-2 bg-slate-50 rounded-xl">
          <img src="https://ui-avatars.com/api/?name=Leon+Gladston&background=6366f1&color=fff" className="w-10 h-10 rounded-full border border-slate-200" alt="Avatar" />
          <div className="overflow-hidden">
            <p className="text-sm font-semibold truncate">Leon Gladston</p>
            <p className="text-xs text-slate-500 truncate">leon.gladston@frankmax.digital</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
