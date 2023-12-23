import logo from '/logo.svg';
import { Github } from 'lucide-react';
import { ModeToggle } from '@/components/mode-toggle';

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between dark:text-white dark:bg-[#131313] px-2 md:px-8 lg:px-16 border-b dark:border-b-[#434343] h-[11dvh] lg:h-[12vh] select-none">
      <a href="/" className="w-16 lg:w-20 hover:animate-spin pt-1">
        <img src={logo} alt="Serenity Logo" />
      </a>
      <div className="flex items-center gap-6 md:gap-12">
        <a
          href="https://github.com/Aman-in-GitHub/Serenity-FindPeaceInConversation"
          target="_blank"
        >
          <Github className="scale-[1.3] hover:scale-[1.4] duration-500" />
        </a>
        <ModeToggle />
      </div>
    </nav>
  );
};

export default Navbar;
