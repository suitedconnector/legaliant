'use client';

import { useState } from 'react';
import { Check, Edit3, FileText, FileDown } from 'lucide-react';
import { Document, Paragraph, TextRun, Packer } from 'docx';
import { saveAs } from 'file-saver';

export default function LetterPreview({ letter, onApprove, onRequestEdit }) {
  const [editMode, setEditMode] = useState(false);
  const [editRequest, setEditRequest] = useState('');

  const handleEdit = () => {
    if (!editRequest.trim()) return;
    onRequestEdit(editRequest);
    setEditRequest('');
    setEditMode(false);
  };

  const handleDownloadPdf = () => {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Demand Letter — Legaliant</title>
          <style>
            @media print {
              @page { size: letter; margin: 1in; }
              body { font-family: 'Times New Roman', Times, serif; font-size: 12pt; line-height: 1.6; color: #000; }
              .no-print { display: none; }
            }
            body { font-family: 'Times New Roman', Times, serif; font-size: 12pt; line-height: 1.6; max-width: 680px; margin: 40px auto; padding: 20px; color: #000; }
            .instructions { background: #f0f0f0; padding: 12px; margin-bottom: 24px; border-radius: 4px; font-family: Arial, sans-serif; font-size: 11pt; }
            pre { white-space: pre-wrap; word-wrap: break-word; font-family: 'Times New Roman', Times, serif; font-size: 12pt; }
          </style>
        </head>
        <body>
          <div class="instructions no-print">
            <strong>To save as PDF:</strong> Click Print below →
            Change destination to "Save as PDF" → Click Save
          </div>
          <pre>${letter.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</pre>
          <script>window.onload = function() { window.print(); }</script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  const handleDownloadDocx = async () => {
    const paragraphs = letter.split('\n').map(line =>
      new Paragraph({
        children: [new TextRun({ text: line, font: 'Times New Roman', size: 24 })],
        spacing: { after: 120 },
      })
    );

    const doc = new Document({
      sections: [{ properties: {}, children: paragraphs }],
    });

    const blob = await Packer.toBlob(doc);
    saveAs(blob, 'demand-letter.docx');
  };

  const handleDownloadTxt = () => {
    const blob = new Blob([letter], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'demand-letter.txt';
    a.click();
    URL.revokeObjectURL(url);
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

      {/* Download buttons */}
      <div className="px-6 py-4 border-t border-gray-100">
        <p className="text-xs text-gray-400 mb-3 flex items-center gap-1.5">
          <FileDown size={12} />
          Download your letter
        </p>
        <div className="flex gap-2">
          <button
            onClick={handleDownloadPdf}
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-150"
            style={{ background: 'linear-gradient(135deg, #c9a84c, #d4b96a)', color: '#1a2744' }}
          >
            Download PDF
          </button>
          <button
            onClick={handleDownloadDocx}
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-150"
            style={{ border: '1.5px solid #c9a84c', color: '#1a2744', background: 'transparent' }}
          >
            Download Word
          </button>
          <button
            onClick={handleDownloadTxt}
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-150"
            style={{ border: '1.5px solid #d1d5db', color: '#6b7280', background: 'transparent' }}
          >
            Download TXT
          </button>
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
