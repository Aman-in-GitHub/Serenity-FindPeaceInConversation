import './load.css';

const Loader = () => {
  return (
    <>
      <div className="items-center justify-center flex h-[89vh] lg:h-[88vh] dark:bg-[#131313]">
        <div className="wrap">
          <div className="circle"></div>
          <div className="circle"></div>
          <div className="circle"></div>
          <div className="shadow"></div>
          <div className="shadow"></div>
          <div className="shadow"></div>
        </div>
      </div>
    </>
  );
};

export default Loader;
