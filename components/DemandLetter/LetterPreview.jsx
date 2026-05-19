'use client';

import { useState } from 'react';
import { Check, Edit3, FileText } from 'lucide-react';

export default function LetterPreview({ letter, onApprove, onRequestEdit }) {
  const [editMode, setEditMode] = useState(false);
  const [editRequest, setEditRequest] = useState('');

  const handleEdit = () => {
    if (!editRequest.trim()) return;
    onRequestEdit(editRequest);
    setEditRequest('');
    setEditMode(false);
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-card overflow-hidden">
      {/* Letter header bar */}
      <div className="bg-navy px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FileText size={16} className="text-gold" />
          <span className="text-white font-semibold text-sm">Your Demand Letter</span>
        </div>
        <span className="text-white/40 text-xs">Review before downloading</span>
      </div>

      {/* Letter body */}
      <div className="p-8 max-h-96 overflow-y-auto">
        <div className="font-serif text-gray-800 text-sm leading-relaxed whitespace-pre-wrap">
          {letter}
        </div>
      </div>

      {/* Edit request */}
      {editMode && (
        <div className="px-6 pb-4 border-t border-gray-100 pt-4 step-enter-up">
          <label className="block text-sm font-semibold text-navy mb-2">
            What would you like to change?
          </label>
          <textarea
            className="input-gold resize-none mb-3"
            rows={3}
            placeholder='e.g. "Make the tone firmer" or "Add a 14-day payment deadline" or "Change the amount to $5,000"'
            value={editRequest}
            onChange={e => setEditRequest(e.target.value)}
            autoFocus
          />
          <div className="flex gap-3">
            <button onClick={handleEdit} className="btn-gold flex-1 py-3 text-sm justify-center">
              Apply Changes
            </button>
            <button
              onClick={() => setEditMode(false)}
              className="btn-outline flex-1 py-3 text-sm justify-center"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Action buttons */}
      {!editMode && (
        <div className="px-6 py-5 border-t border-gray-100 flex gap-3">
          <button onClick={onApprove} className="btn-gold flex-1 py-3 text-sm justify-center">
            <Check size={16} />
            Approve &amp; Continue
          </button>
          <button
            onClick={() => setEditMode(true)}
            className="btn-outline flex-1 py-3 text-sm justify-center"
          >
            <Edit3 size={16} />
            Request Changes
          </button>
        </div>
      )}
    </div>
  );
}
