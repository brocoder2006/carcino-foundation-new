'use client';

import { VisualEditing } from 'next-sanity';
import { useEffect, useState } from 'react';

export default function SanityVisualEditing() {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    // Only render visual editing overlay if embedded inside Sanity Studio iframe
    // or if draft mode flag is present in cookie/location
    const isIframe = typeof window !== 'undefined' && window.self !== window.top;
    const isDraft = typeof document !== 'undefined' && document.cookie.includes('__sanity_preview');

    if (isIframe || isDraft) {
      setShouldRender(true);
    }
  }, []);

  if (!shouldRender) {
    return null;
  }

  return <VisualEditing />;
}

