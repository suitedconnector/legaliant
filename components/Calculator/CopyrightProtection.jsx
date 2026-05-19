'use client';

import { useEffect } from 'react';

export default function CopyrightProtection() {
  useEffect(() => {
    const handleContextMenu = (e) => { e.preventDefault(); return false; };
    const handleSelectStart = (e) => {
      if (e.target.closest('.copyright-protected')) { e.preventDefault(); return false; }
    };
    const handleDragStart = (e) => {
      if (e.target.closest('.copyright-protected')) { e.preventDefault(); return false; }
    };
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) &&
          (e.key === 'c' || e.key === 'a' || e.key === 'x' || e.key === 's' || e.key === 'p')) {
        if (e.target.closest('.copyright-protected')) { e.preventDefault(); return false; }
      }
      if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J'))) {
        e.preventDefault(); return false;
      }
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('selectstart', handleSelectStart);
    document.addEventListener('dragstart', handleDragStart);
    document.addEventListener('keydown', handleKeyDown);

    console.log('%c© 2026 Vertex Ventures LLC - All Rights Reserved', 'color: #c9a84c; font-size: 16px; font-weight: bold;');

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('selectstart', handleSelectStart);
      document.removeEventListener('dragstart', handleDragStart);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return null;
}
