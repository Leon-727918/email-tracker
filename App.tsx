
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import EmailTracker from './components/EmailTracker';
import Settings from './components/Settings';
import TemplateManager from './components/TemplateManager';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard />;
      case 'tracker': return <EmailTracker />;
      case 'templates': return <TemplateManager />;
      case 'settings': return <Settings />;
      default: return (
        <div className="flex flex-col items-center justify-center h-full text-slate-400">
          <p className="text-lg">Coming soon...</p>
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="ml-64 p-8">
        <div className="max-w-[1400px] mx-auto">
          {renderContent()}
        </div>
      </main>

      {/* Cloud Notification */}
      <div className="fixed bottom-4 right-4 flex flex-col gap-2">
        <div className="bg-white border border-blue-100 shadow-xl rounded-2xl p-3 flex items-center gap-3">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
          <p className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">Azure Cloud Sync Active</p>
        </div>
        <div className="bg-white border border-emerald-100 shadow-xl rounded-2xl p-3 flex items-center gap-3">
          <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
          <p className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">Neon DB Connected</p>
        </div>
      </div>
    </div>
  );
};

export default App;
