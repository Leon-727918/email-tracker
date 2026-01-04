
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { DashboardStats } from '../types';

const data = [
  { name: 'Mon', sent: 12, replies: 4 },
  { name: 'Tue', sent: 18, replies: 7 },
  { name: 'Wed', sent: 15, replies: 10 },
  { name: 'Thu', sent: 22, replies: 8 },
  { name: 'Fri', sent: 30, replies: 15 },
  { name: 'Sat', sent: 5, replies: 2 },
  { name: 'Sun', sent: 8, replies: 4 },
];

const stats: DashboardStats = {
  totalSent: 124,
  responseRate: 42.5,
  pendingFollowUps: 18,
  averageResponseTime: '2.4 Days'
};

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-slate-900">Performance Overview</h1>
        <p className="text-slate-500">Track your email productivity and response metrics.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Sent', value: stats.totalSent, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Response Rate', value: `${stats.responseRate}%`, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'Pending Follow-ups', value: stats.pendingFollowUps, color: 'text-amber-600', bg: 'bg-amber-50' },
          { label: 'Avg. Response Time', value: stats.averageResponseTime, color: 'text-indigo-600', bg: 'bg-indigo-50' },
        ].map((card, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <p className="text-sm font-medium text-slate-500 mb-1">{card.label}</p>
            <p className={`text-2xl font-bold ${card.color}`}>{card.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <h3 className="text-lg font-semibold mb-6">Activity Volume</h3>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorSent" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorReplies" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
              <Area type="monotone" dataKey="sent" stroke="#6366f1" fillOpacity={1} fill="url(#colorSent)" strokeWidth={2} />
              <Area type="monotone" dataKey="replies" stroke="#10b981" fillOpacity={1} fill="url(#colorReplies)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Urgent Actions</h3>
          <div className="space-y-4">
            {[
              { name: 'Sarah Connor', task: 'Follow-up overdue by 2 days', time: '10:30 AM' },
              { name: 'James Smith', task: 'Response detected - awaiting your reply', time: '09:15 AM' },
              { name: 'Project Alpha', task: 'Review pending on thread', time: 'Yesterday' },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-slate-50">
                <div>
                  <p className="text-sm font-semibold">{item.name}</p>
                  <p className="text-xs text-slate-500">{item.task}</p>
                </div>
                <span className="text-xs font-medium text-slate-400">{item.time}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-lg font-semibold mb-4">AI Productivity Tips</h3>
            <div className="space-y-3">
                <div className="p-4 bg-indigo-50 rounded-xl border border-indigo-100">
                    <p className="text-sm text-indigo-800 font-medium">✨ Recommendation</p>
                    <p className="text-sm text-indigo-700 mt-1">
                        "Your response rate is highest on Tuesday mornings. Try batching your high-priority follow-ups for tomorrow at 9:00 AM."
                    </p>
                </div>
                <div className="p-4 bg-violet-50 rounded-xl border border-violet-100">
                    <p className="text-sm text-violet-800 font-medium">📈 Growth Insight</p>
                    <p className="text-sm text-violet-700 mt-1">
                        "Emails with 'Checking in' in the subject line have a 15% lower open rate than direct subject-matter follow-ups."
                    </p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
