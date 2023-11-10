import heroImage from '/hero.svg';

const Hero = ({ scroll }) => {
  return (
    <main className="flex items-center justify-center h-[89vh] lg:h-[88vh] dark:bg-[#131313] dark:text-white flex-col px-2 md:px-8 lg:px-16 gap-5 py-1 font-texts select-none">
      <section className="flex items-center flex-col lg:flex-row lg:gap-44 gap-2 mt-[-40px] md:mt-0">
        <div className="w-64 md:w-80 lg:w-[500px] lg:order-2">
          <img src={heroImage} alt="A man chatting with AI" />
        </div>

        <div className="lg:w-[50%]">
          <h1 className="font-headings text-5xl text-center md:text-8xl lg:text-9xl lg:text-start">
            Serenity
          </h1>
          <p className="text-justify mt-2 text-sm md:text-2xl">
            <span className="font-semibold">Serenity</span> is your gateway to a
            unique, customizable experience. Our platform lets you engage in
            conversations with your personal AI, which can take on various
            roles, such as a <span className="text-sky-500">friend</span>, a{' '}
            <span className="text-emerald-500">teacher</span>, a{' '}
            <span className="text-rose-500">lover</span>, a{' '}
            <span className="text-yellow-500">parent</span> and even an{' '}
            <span className="text-indigo-500">anonymous</span> profile. Start
            your journey to serenity today through personalized interactions
            with your personal AI companion.
          </p>
        </div>
      </section>

      <button
        className="text-lg md:text-xl font-semibold bg-darkBlue hover:bg-blue-500 duration-300 active:scale-[.98] px-5 py-3 rounded-[100vmax] text-white"
        onClick={scroll}
      >
        Start Chat
      </button>
    </main>
  );
};

export default Hero;
