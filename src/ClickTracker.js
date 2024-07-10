// src/ClickTracker.js
import React, { useEffect } from 'react';
import axios from 'axios';

const ClickTracker = ({ children }) => {
  useEffect(() => {
    const handleClick = async (event) => {
      const element = event.target;
      const componentName = element.getAttribute('data-component-name') || 'unknown';

      try {
        await axios.post('/api/report-bug', {
          componentName,
          pageUrl: window.location.href,
        });
      } catch (error) {
        console.error('Error reporting bug:', error);
      }
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

  return <>{children}</>;
};

export default ClickTracker;
