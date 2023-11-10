import { useRef } from 'react';

import Feedback from './Feedback';
import Hero from './Hero';
import Info from './Info';

const Home = () => {
  const profilesRef = useRef(null);

  const scrollToComponent = () => {
    profilesRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <Hero scroll={scrollToComponent} />
      <section ref={profilesRef}>
        <Info />
      </section>
      <Feedback />
    </>
  );
};

export default Home;
