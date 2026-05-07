import type { Metadata } from 'next';
import PublicLayout from '@/components/layout/PublicLayout';
import HeroSection from '@/components/sections/HeroSection';
import SignatureDishes from '@/components/sections/SignatureDishes';
import AmbianceSection from '@/components/sections/AmbianceSection';
import ReservationCTA from '@/components/sections/ReservationCTA';

export const metadata: Metadata = {
  title: 'Maison Noir — Fine Dining Paris',
  description: 'Experience unparalleled fine dining at Maison Noir. Michelin-starred cuisine in the heart of Paris.',
};

export default function HomePage() {
  return (
    <PublicLayout>
      <HeroSection />
      <SignatureDishes />
      <AmbianceSection />
      <ReservationCTA />
    </PublicLayout>
  );
}
