'use client';
import { useEffect } from 'react';

export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => { console.error(error); }, [error]);

  return (
    <html>
      <body className="bg-noir-950 text-cream-100 min-h-screen flex items-center justify-center font-sans">
        <div className="text-center px-6">
          <p className="text-gold-400 text-xs tracking-widest uppercase mb-4 font-mono">Unexpected Error</p>
          <h2 className="text-5xl font-light text-cream-100 mb-4">Something went wrong</h2>
          <p className="text-noir-400 text-sm mb-8 max-w-md mx-auto">
            An unexpected error occurred. Our team has been notified.
          </p>
          <button
            onClick={reset}
            className="border border-gold-400 text-gold-400 px-8 py-4 text-xs tracking-widest uppercase hover:bg-gold-400 hover:text-noir-950 transition-all duration-300"
          >
            Try Again
          </button>
        </div>
      </body>
    </html>
  );
}
