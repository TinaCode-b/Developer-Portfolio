import { useEffect } from 'react';

// A tiny reusable hook: give it a title, it keeps the browser tab's
// <title> in sync. Screen readers announce the document title when it
// changes, so this is also what tells assistive tech "the page changed"
// in a single-page app where there's no real page navigation.
export default function usePageTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} — Personal Developer Portfolio` : 'Personal Developer Portfolio';
  }, [title]);
}
