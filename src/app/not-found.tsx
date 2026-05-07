import Link from 'next/link';
import PublicLayout from '@/components/layout/PublicLayout';

export default function NotFound() {
  return (
    <PublicLayout>
      <section className="min-h-screen bg-noir-950 flex items-center justify-center px-6">
        <div className="text-center max-w-lg">
          <p className="font-accent text-gold-400 text-xs tracking-ultra-wide uppercase mb-4">404 Error</p>
          <h1 className="font-display text-8xl md:text-9xl font-light text-cream-100 leading-none mb-4">
            404
          </h1>
          <div className="divider-gold" />
          <h2 className="font-display text-3xl text-cream-100 font-light mb-4">
            Page Not <span className="gold-text italic">Found</span>
          </h2>
          <p className="font-body text-noir-400 text-sm leading-relaxed mb-10">
            The page you're looking for seems to have wandered off the menu. 
            Let us guide you back to familiar territory.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/" className="btn-gold-filled text-[11px]">Back to Home</Link>
            <Link href="/menu" className="btn-gold relative z-10 text-[11px]">View Menu</Link>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
