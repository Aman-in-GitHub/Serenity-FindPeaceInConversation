import error from '/error.svg';
import { Link } from 'react-router-dom';

const Error = () => {
  return (
    <div className="h-[89dvh] lg:h-[88vh] dark:bg-[#131313] px-2 md:px-8 lg:px-16 flex items-center justify-center flex-col">
      <img
        src={error}
        alt="404 Error Image"
        className="w-[400px] md:w-[500px]"
      />

      <Link
        to="/"
        className="text-lg md:text-xl font-semibold bg-darkBlue hover:bg-blue-500 duration-300 active:scale-[.98] px-5 py-3 rounded-[100vmax] text-white"
      >
        Go To Home
      </Link>
    </div>
  );
};

export default Error;
