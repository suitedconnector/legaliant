import { useEffect } from 'react';

export default function CopyrightProtection() {
  useEffect(() => {
    // Disable right-click context menu
    const handleContextMenu = (e) => {
      e.preventDefault();
      return false;
    };

    // Disable text selection
    const handleSelectStart = (e) => {
      if (e.target.closest('.copyright-protected')) {
        e.preventDefault();
        return false;
      }
    };

    // Disable drag operations
    const handleDragStart = (e) => {
      if (e.target.closest('.copyright-protected')) {
        e.preventDefault();
        return false;
      }
    };

    // Disable copy shortcuts
    const handleKeyDown = (e) => {
      // Ctrl+C, Ctrl+A, Ctrl+X, Ctrl+S, Ctrl+P
      if ((e.ctrlKey || e.metaKey) && 
          (e.key === 'c' || e.key === 'a' || e.key === 'x' || e.key === 's' || e.key === 'p')) {
        if (e.target.closest('.copyright-protected')) {
          e.preventDefault();
          return false;
        }
      }
      
      // F12, Ctrl+Shift+I, Ctrl+Shift+J (dev tools)
      if (e.key === 'F12' || 
          (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J'))) {
        e.preventDefault();
        return false;
      }
    };

    // Add event listeners
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('selectstart', handleSelectStart);
    document.addEventListener('dragstart', handleDragStart);
    document.addEventListener('keydown', handleKeyDown);

    // Console warning
    console.log('%c© 2026 Legaliant Ventures LLC - All Rights Reserved', 'color: #c9a84c; font-size: 16px; font-weight: bold;');
    console.log('%cThe design, layout, and content of this calculator are protected by U.S. copyright law.', 'color: #1a2744; font-size: 12px;');
    console.log('%cUnauthorized reproduction, scraping, or derivative works are strictly prohibited.', 'color: #dc2626; font-size: 12px;');

    // Cleanup
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('selectstart', handleSelectStart);
      document.removeEventListener('dragstart', handleDragStart);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Hidden copyright metadata for web crawlers
  useEffect(() => {
    const meta = document.createElement('meta');
    meta.name = 'copyright';
    meta.content = '© 2026 Legaliant Ventures LLC - All rights reserved. Protected by U.S. copyright law.';
    document.head.appendChild(meta);

    return () => {
      document.head.removeChild(meta);
    };
  }, []);

  return null; // This component doesn't render anything
}
