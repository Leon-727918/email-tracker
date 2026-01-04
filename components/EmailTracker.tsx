
import React, { useState, useRef } from 'react';
import { TrackedEmail, EmailStatus, Category, Template } from '../types';
import { geminiService } from '../services/geminiService';
import { azureService } from '../services/azureService';

const MOCK_CATEGORIES: Category[] = [
  { id: 'c1', name: 'Sales', color: 'bg-blue-500' },
  { id: 'c2', name: 'Recruitment', color: 'bg-emerald-500' },
  { id: 'c3', name: 'Partnership', color: 'bg-purple-500' },
  { id: 'c4', name: 'Investors', color: 'bg-rose-500' },
];

const MOCK_TEMPLATES: Template[] = [
  { id: 't1', name: 'Friendly Check-in', subject: 'Checking in', body: 'Hi {{name}}, just seeing if you saw my last note.' },
  { id: 't2', name: 'The "Buried Email" nudge', subject: 'Re: {{subject}}', body: 'Hey {{name}}, assuming this got buried. Let me know when you have a sec!' }
];

const MOCK_EMAILS: TrackedEmail[] = [
  {
    id: '1',
    subject: 'Partnership Inquiry - TechFlow',
    recipient: 'clara@techflow.com',
    sentDate: '2023-10-20',
    lastInteraction: '2023-10-20',
    status: EmailStatus.PENDING_FOLLOWUP,
    followUpCount: 0,
    content: "Hi Clara, I wanted to reach out regarding the partnership proposal we discussed. I think there's a great synergy between our platforms.",
    categoryId: 'c3',
    attachments: [
      { id: 'att1', name: 'proposal_v1.pdf', url: '#', size: '1.2 MB', type: 'application/pdf' }
    ]
  },
  {
    id: '2',
    subject: 'Quote for Q4 Project',
    recipient: 'mark@builders.io',
    sentDate: '2023-10-25',
    lastInteraction: '2023-10-26',
    status: EmailStatus.REPLIED,
    followUpCount: 1,
    content: "Mark, please find attached the quote for the upcoming project. Let me know your thoughts.",
    categoryId: 'c1',
    attachments: []
  },
  {
    id: '3',
    subject: 'Feedback Request: UI Designs',
    recipient: 'jane.doe@design.com',
    sentDate: '2023-10-15',
    lastInteraction: '2023-10-15',
    status: EmailStatus.PENDING_FOLLOWUP,
    followUpCount: 0,
    content: "Hey Jane, how are the UI designs coming along? We're eager to see the progress.",
    categoryId: 'c2',
    attachments: []
  }
];

const EmailTracker: React.FC = () => {
  const [emails, setEmails] = useState<TrackedEmail[]>(MOCK_EMAILS);
  const [categories] = useState<Category[]>(MOCK_CATEGORIES);
  const [selectedEmail, setSelectedEmail] = useState<TrackedEmail | null>(null);
  const [generating, setGenerating] = useState(false);
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>('');
  const [isUploading, setIsUploading] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const filteredEmails = filterCategory === 'all' 
    ? emails 
    : emails.filter(e => e.categoryId === filterCategory);

  const getStatusBadge = (status: EmailStatus) => {
    switch (status) {
      case EmailStatus.SENT: return <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">Sent</span>;
      case EmailStatus.REPLIED: return <span className="px-2 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700">Replied</span>;
      case EmailStatus.PENDING_FOLLOWUP: return <span className="px-2 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-700">Needs Follow-up</span>;
      default: return null;
    }
  };

  const getCategoryBadge = (catId?: string) => {
    const cat = categories.find(c => c.id === catId);
    if (!cat) return null;
    return (
      <span className={`px-2 py-1 rounded-full text-[10px] font-bold text-white uppercase tracking-wider ${cat.color}`}>
        {cat.name}
      </span>
    );
  };

  const handleGenerateFollowUp = async (email: TrackedEmail) => {
    setGenerating(true);
    setAiResponse(null);
    const template = MOCK_TEMPLATES.find(t => t.id === selectedTemplateId);
    const result = await geminiService.generateFollowUp({
      subject: email.subject,
      content: email.content,
      recipient: email.recipient
    }, template);
    setAiResponse(result);
    setGenerating(false);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && selectedEmail) {
      setIsUploading(true);
      const newAttachment = await azureService.uploadAttachment(file);
      setEmails(emails.map(email => 
        email.id === selectedEmail.id 
          ? { ...email, attachments: [...email.attachments, newAttachment] } 
          : email
      ));
      // Sync local selection
      setSelectedEmail(prev => prev ? { ...prev, attachments: [...prev.attachments, newAttachment] } : null);
      setIsUploading(false);
    }
  };

  const updateEmailCategory = (id: string, catId: string) => {
    const updated = emails.map(e => e.id === id ? { ...e, categoryId: catId } : e);
    setEmails(updated);
    if (selectedEmail?.id === id) {
      setSelectedEmail({ ...selectedEmail, categoryId: catId });
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-120px)] overflow-hidden">
      {/* Email List */}
      <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 flex flex-col overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h2 className="font-bold text-lg">Sent Threads</h2>
            <select 
              className="px-3 py-1 text-xs font-medium rounded-lg border border-slate-200 outline-none focus:border-indigo-500"
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
            >
              <option value="all">All Categories</option>
              {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
          <button className="px-3 py-1.5 text-xs font-medium rounded-lg bg-indigo-600 text-white hover:bg-indigo-700">Refresh</button>
        </div>
        <div className="flex-1 overflow-y-auto">
          <table className="w-full text-left border-collapse">
            <thead className="sticky top-0 bg-slate-50 z-10">
              <tr className="border-b border-slate-200">
                <th className="p-4 text-xs font-semibold text-slate-500 uppercase">Recipient</th>
                <th className="p-4 text-xs font-semibold text-slate-500 uppercase">Subject</th>
                <th className="p-4 text-xs font-semibold text-slate-500 uppercase">Category</th>
                <th className="p-4 text-xs font-semibold text-slate-500 uppercase">Status</th>
                <th className="p-4 text-xs font-semibold text-slate-500 uppercase text-right">Last Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmails.map((email) => (
                <tr 
                  key={email.id} 
                  onClick={() => {
                      setSelectedEmail(email);
                      setAiResponse(null);
                  }}
                  className={`border-b border-slate-100 hover:bg-slate-50 cursor-pointer transition-colors ${selectedEmail?.id === email.id ? 'bg-indigo-50/50' : ''}`}
                >
                  <td className="p-4">
                    <p className="text-sm font-medium">{email.recipient}</p>
                  </td>
                  <td className="p-4 max-w-xs">
                    <p className="text-sm truncate">{email.subject}</p>
                  </td>
                  <td className="p-4">
                    {getCategoryBadge(email.categoryId)}
                  </td>
                  <td className="p-4">
                    {getStatusBadge(email.status)}
                  </td>
                  <td className="p-4 text-right">
                    <p className="text-xs text-slate-500">{email.lastInteraction}</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Pane */}
      <div className="bg-white rounded-2xl border border-slate-200 flex flex-col h-full">
        {selectedEmail ? (
          <div className="flex flex-col h-full">
            <div className="p-6 border-b border-slate-100">
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-bold text-xl">{selectedEmail.subject}</h3>
                <button onClick={() => setSelectedEmail(null)} className="text-slate-400 hover:text-slate-600">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
              
              <div className="flex items-center gap-2 mb-4">
                <p className="text-xs font-semibold text-slate-400 uppercase">Category:</p>
                <div className="flex gap-1">
                  {categories.map(cat => (
                    <button 
                      key={cat.id}
                      onClick={() => updateEmailCategory(selectedEmail.id, cat.id)}
                      className={`w-4 h-4 rounded-full transition-transform hover:scale-125 ${cat.color} ${selectedEmail.categoryId === cat.id ? 'ring-2 ring-offset-2 ring-slate-300 scale-125' : 'opacity-40'}`}
                      title={cat.name}
                    />
                  ))}
                </div>
              </div>

              <div className="space-y-1">
                <p className="text-sm text-slate-500">To: <span className="text-slate-900 font-medium">{selectedEmail.recipient}</span></p>
                <p className="text-sm text-slate-500">Sent: <span className="text-slate-900">{selectedEmail.sentDate}</span></p>
              </div>
            </div>

            <div className="p-6 flex-1 overflow-y-auto space-y-6">
              {/* Attachments Section */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                   <p className="text-xs font-semibold text-slate-400 uppercase">Azure Cloud Attachments</p>
                   <button 
                    onClick={() => fileInputRef.current?.click()}
                    className="text-[10px] text-indigo-600 font-bold hover:underline"
                    disabled={isUploading}
                   >
                     {isUploading ? 'Uploading...' : '+ Upload to Cloud'}
                   </button>
                   <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileUpload} />
                </div>
                {selectedEmail.attachments.length > 0 ? (
                  <div className="grid grid-cols-1 gap-2">
                    {selectedEmail.attachments.map(att => (
                      <div key={att.id} className="flex items-center justify-between p-2 rounded-lg border border-slate-100 bg-slate-50">
                        <div className="flex items-center gap-2 overflow-hidden">
                          <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" /></svg>
                          <span className="text-xs truncate font-medium">{att.name}</span>
                        </div>
                        <span className="text-[10px] text-slate-400">{att.size}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-slate-400 italic">No attachments for this thread.</p>
                )}
              </div>

              <div className="bg-slate-50 p-4 rounded-xl">
                <p className="text-xs font-semibold text-slate-400 uppercase mb-2">Original Email Content</p>
                <p className="text-sm text-slate-700 whitespace-pre-wrap">{selectedEmail.content}</p>
              </div>

              {selectedEmail.status === EmailStatus.PENDING_FOLLOWUP && (
                <div className="border-t border-slate-100 pt-6">
                  {!aiResponse && !generating ? (
                    <div className="space-y-4">
                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-slate-400 uppercase">Select AI Blueprint</label>
                        <select 
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:border-indigo-500"
                          value={selectedTemplateId}
                          onChange={(e) => setSelectedTemplateId(e.target.value)}
                        >
                          <option value="">Pure AI Generation (No Template)</option>
                          {MOCK_TEMPLATES.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                        </select>
                      </div>
                      <button 
                        onClick={() => handleGenerateFollowUp(selectedEmail)}
                        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-indigo-600 text-white rounded-xl font-semibold shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all active:scale-95"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                        Craft Follow-up
                      </button>
                    </div>
                  ) : generating ? (
                    <div className="flex flex-col items-center py-8">
                      <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
                      <p className="text-sm text-slate-500 mt-4 animate-pulse">Personalizing your template...</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <p className="text-xs font-semibold text-indigo-600 uppercase">Personalized Draft</p>
                        <button 
                          onClick={() => handleGenerateFollowUp(selectedEmail)}
                          className="text-xs text-slate-400 hover:text-indigo-600"
                        >Regenerate</button>
                      </div>
                      <div className="bg-indigo-50 border border-indigo-100 p-4 rounded-xl">
                        <textarea 
                          className="w-full bg-transparent text-sm text-slate-700 min-h-[180px] outline-none resize-none"
                          value={aiResponse || ''}
                          onChange={(e) => setAiResponse(e.target.value)}
                        />
                      </div>
                      <div className="flex gap-2">
                        <button className="flex-1 py-3 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-700">Send Now</button>
                        <button className="px-4 py-3 border border-slate-200 rounded-xl text-sm font-medium hover:bg-slate-50">Schedule</button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-8 text-slate-400">
            <svg className="w-16 h-16 mb-4 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
            <p>Select a thread to manage categories, cloud files, and AI follow-ups.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmailTracker;
