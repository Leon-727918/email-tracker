
import React, { useState } from 'react';
import { Template } from '../types';

const INITIAL_TEMPLATES: Template[] = [
  {
    id: 't1',
    name: 'Gentle Re-engagement',
    subject: 'Checking in: {{subject}}',
    body: 'Hi {{name}},\n\nI hope you had a great week. I wanted to quickly follow up on my last email regarding {{subject}} to see if you had any thoughts or if there is anything I can clarify for you.\n\nBest,\n[My Name]'
  },
  {
    id: 't2',
    name: 'Quick Value Drop',
    subject: 'Thought this might help with {{subject}}',
    body: 'Hi {{name}},\n\nI was just thinking about our project and thought this resource might be helpful. Also, checking in to see if you had a chance to look at my previous note.\n\nTalk soon,\n[My Name]'
  }
];

const TemplateManager: React.FC = () => {
  const [templates, setTemplates] = useState<Template[]>(INITIAL_TEMPLATES);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newTemplate, setNewTemplate] = useState<Partial<Template>>({ name: '', subject: '', body: '' });

  const handleSave = () => {
    if (editingId) {
      setTemplates(templates.map(t => t.id === editingId ? { ...t, ...newTemplate } as Template : t));
      setEditingId(null);
    } else {
      const id = Math.random().toString(36).substr(2, 9);
      setTemplates([...templates, { id, ...newTemplate } as Template]);
    }
    setNewTemplate({ name: '', subject: '', body: '' });
  };

  return (
    <div className="space-y-6">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Email Templates</h1>
          <p className="text-slate-500">Create reusable blueprints for your automated follow-ups.</p>
        </div>
        {!editingId && (
          <button 
            onClick={() => { setEditingId('new'); setNewTemplate({ name: '', subject: '', body: '' }); }}
            className="bg-indigo-600 text-white px-4 py-2 rounded-xl font-semibold hover:bg-indigo-700 transition-colors"
          >
            Create New
          </button>
        )}
      </header>

      {editingId && (
        <div className="bg-white border-2 border-indigo-100 rounded-2xl p-6 shadow-sm">
          <h3 className="font-bold mb-4">{editingId === 'new' ? 'New Template' : 'Edit Template'}</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Template Name</label>
              <input 
                type="text" 
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-indigo-500"
                value={newTemplate.name}
                onChange={e => setNewTemplate({ ...newTemplate, name: e.target.value })}
                placeholder="e.g. Sales Follow-up"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Subject Line</label>
              <input 
                type="text" 
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-indigo-500"
                value={newTemplate.subject}
                onChange={e => setNewTemplate({ ...newTemplate, subject: e.target.value })}
                placeholder="Use {{subject}} for original subject"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Body Content</label>
              <textarea 
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-indigo-500 min-h-[150px]"
                value={newTemplate.body}
                onChange={e => setNewTemplate({ ...newTemplate, body: e.target.value })}
                placeholder="Use {{name}} for recipient name"
              />
            </div>
            <div className="flex gap-2">
              <button 
                onClick={handleSave}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700"
              >
                Save Template
              </button>
              <button 
                onClick={() => setEditingId(null)}
                className="px-4 py-2 border border-slate-200 rounded-lg font-medium hover:bg-slate-50"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {templates.map(template => (
          <div key={template.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between group">
            <div>
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{template.name}</h3>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={() => { setEditingId(template.id); setNewTemplate(template); }}
                    className="p-1 hover:text-indigo-600"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                  </button>
                </div>
              </div>
              <p className="text-xs text-slate-400 mb-4 line-clamp-3">{template.body}</p>
            </div>
            <div className="pt-4 border-t border-slate-50 flex gap-2">
              <span className="text-[10px] px-2 py-0.5 bg-slate-100 rounded-full text-slate-500">Used 12 times</span>
              <span className="text-[10px] px-2 py-0.5 bg-emerald-50 rounded-full text-emerald-600">65% success</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TemplateManager;
