
import React from 'react';

const Settings: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <header>
        <h1 className="text-2xl font-bold text-slate-900">Settings</h1>
        <p className="text-slate-500">Manage your account and integrations.</p>
      </header>

      <section className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100">
          <h3 className="font-bold">Email Integrations</h3>
          <p className="text-sm text-slate-500">Connect your work accounts to start tracking.</p>
        </div>
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-white rounded-lg border border-slate-200 flex items-center justify-center font-bold text-blue-600">O</div>
              <div>
                <p className="font-semibold">Microsoft Outlook</p>
                <p className="text-xs text-emerald-600 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span> Connected as leon.gladston@frankmax.digital
                </p>
              </div>
            </div>
            <button className="px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors">Disconnect</button>
          </div>

          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200 opacity-60">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-white rounded-lg border border-slate-200 flex items-center justify-center font-bold text-red-500">G</div>
              <div>
                <p className="font-semibold">Google Gmail</p>
                <p className="text-xs text-slate-500">Not connected</p>
              </div>
            </div>
            <button className="px-4 py-2 text-sm font-medium text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">Connect</button>
          </div>
        </div>
      </section>

      <section className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100">
          <h3 className="font-bold">Automation Preferences</h3>
          <p className="text-sm text-slate-500">Define how the system should handle follow-ups.</p>
        </div>
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Auto-detect replies</p>
              <p className="text-xs text-slate-500">Automatically stop tracking when a reply is received.</p>
            </div>
            <div className="w-12 h-6 bg-indigo-600 rounded-full relative cursor-pointer">
              <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Follow-up Window</p>
              <p className="text-xs text-slate-500">Days of inactivity before triggering a reminder.</p>
            </div>
            <select className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:border-indigo-500" defaultValue="7 Days">
                <option>3 Days</option>
                <option>5 Days</option>
                <option>7 Days</option>
                <option>10 Days</option>
            </select>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">AI Tone Preference</p>
              <p className="text-xs text-slate-500">Default style for generated drafts.</p>
            </div>
            <select className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:border-indigo-500" defaultValue="Professional & Helpful">
                <option>Professional & Helpful</option>
                <option>Casual & Friendly</option>
                <option>Urgent & Direct</option>
            </select>
          </div>
        </div>
      </section>
      
      <div className="bg-blue-900 text-white p-6 rounded-2xl flex items-center justify-between shadow-xl shadow-blue-200">
          <div>
              <h3 className="font-bold text-lg">Pro Plan</h3>
              <p className="text-blue-200 text-sm">Unlimited emails, AI insights, and custom branding.</p>
          </div>
          <button className="px-6 py-2 bg-white text-blue-900 font-bold rounded-xl hover:bg-blue-50 transition-colors">Upgrade</button>
      </div>
    </div>
  );
};

export default Settings;
