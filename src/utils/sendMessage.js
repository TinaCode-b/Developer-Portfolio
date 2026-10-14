// Set VITE_FORM_ENDPOINT (for example a Formspree URL) in Vercel's environment
// variables to deliver messages for real. Without it, the form runs in demo
// mode: it validates and shows the success state, but nothing is sent.
const ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT;

export default async function sendMessage(values) {
  if (!ENDPOINT) {
    await new Promise((resolve) => setTimeout(resolve, 600));
    return;
  }
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(values),
  });
  if (!res.ok) throw new Error('Request failed');
}
