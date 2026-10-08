import { getAtolls, getCandidates } from '@/lib/mdp-api';
import ScrollEffects from '@/components/ScrollEffects';
import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import SeatSpine from '@/components/SeatSpine';
import Candidates from '@/components/Candidates';
import Timeline from '@/components/Timeline';
import Footer from '@/components/Footer';

// ISR: the MDP API is hit at most once per 5 minutes, not per visitor
export const revalidate = 300;

export default async function Page() {
  const [{ data: atolls }, candidates] = await Promise.all([getAtolls(), getCandidates()]);

  return (
    <>
      <ScrollEffects />
      <Nav />
      <Hero />
      <SeatSpine atolls={atolls} />
      <Candidates candidates={candidates} atolls={atolls.map(({ code, nameDv }) => ({ code, nameDv }))} />
      <Timeline />
      <Footer />
    </>
  );
}
