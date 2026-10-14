import { useEffect } from 'react';

const DEFAULT_TITLE = 'Ernestina | Web developer';

// Sets the document title and meta description for the current page so that
// screen readers, browser tabs, and search engines all see page-specific text.
export default function usePageTitle(title, description) {
  useEffect(() => {
    document.title = title ? `${title} | Ernestina` : DEFAULT_TITLE;
    if (description) {
      const meta = document.querySelector('meta[name="description"]');
      if (meta) meta.setAttribute('content', description);
    }
  }, [title, description]);
}
