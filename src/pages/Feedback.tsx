import { useState, useRef, useEffect } from 'react';

import { useToast } from '@/components/ui/use-toast';

import { Github } from 'lucide-react';

import logo from '/logo.svg';

import { ToastAction } from '@/components/ui/toast';

import Confetti from 'react-confetti';

const Feedback = () => {
  const { toast } = useToast();

  useEffect(() => {
    let deferredPrompt: any;

    const showInstallToast = () => {
      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
      const isAndroid = /Android/.test(navigator.userAgent);

      const isInstalled =
        window.matchMedia('(display-mode: standalone)').matches ||
        ('standalone' in window.navigator && window.navigator.standalone);

      if ((isIOS && !isInstalled) || (isAndroid && !isInstalled)) {
        toast({
          variant: 'install',
          title: 'Install Serenity App',
          action: (
            <ToastAction
              altText="Install Serenity App"
              onClick={handleInstallClick}
            >
              Install
            </ToastAction>
          )
        });
      }
    };

    const handleInstallClick = () => {
      if (deferredPrompt) {
        deferredPrompt.prompt();

        deferredPrompt.userChoice.then((choiceResult) => {
          if (choiceResult.outcome === 'accepted') {
            console.log('User accepted the install prompt');
          } else {
            console.log('User dismissed the install prompt');
          }
        });
      }
    };

    window.addEventListener('beforeinstallprompt', (event) => {
      event.preventDefault();
      deferredPrompt = event;
      showInstallToast();
    });

    return () => {
      window.removeEventListener('beforeinstallprompt', showInstallToast);
    };
  }, []);

  const width = window.innerWidth;
  const height = window.innerHeight;

  const [showConfetti, setShowConfetti] = useState(false);

  const nameRef = useRef('');
  const messageRef = useRef('');

  function onFormSubmit(e) {
    e.preventDefault();

    if (nameRef.current.trim() == '' || messageRef.current.trim() == '') {
      toast({
        variant: 'destructive',
        title: `Please fill all the fields`
      });

      return;
    }

    const myForm = e.target;
    const formData = new FormData(myForm);

    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(formData).toString()
    })
      .then(() => {
        toast({ title: 'Form Submitted Successfully' });

        nameRef.current = '';
        messageRef.current = '';

        myForm.reset();

        setShowConfetti(true);

        setTimeout(() => {
          setShowConfetti(false);
        }, 5555);
      })
      .catch((error) =>
        toast({
          variant: 'destructive',
          title: `Error: ${error}`
        })
      );
  }

  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <section className="min-h-screen dark:bg-[#131313] px-2 md:px-8 lg:px-16 font-texts select-none dark:text-white flex items-center relative overflow-hidden">
      <h2 className="text-4xl lg:text-6xl font-headings absolute top-2 md:top-6 left-2 md:left-8 lg:left-16">
        Feedback
      </h2>
      <div className="pt-16 md:pt-24 flex flex-col lg:flex-row lg:justify-between items-center gap-2 w-full mt-[-60px]">
        <div className="lg:w-[50%]">
          <h3 className="lg:text-8xl font-black text-5xl">
            What can we improve?
          </h3>
          <p className="lg:text-xl my-2 md:my-6">
            Help us improve! Share your thoughts on what we can do better. Your
            feedback guides our enhancements to serve you even more effectively.
          </p>
        </div>
        <form
          className="lg:w-[50%] flex flex-col gap-8 md:gap-12 h-[400px] md:h-[500px] justify-center w-full px-4 bg-[#f4f4f4] dark:bg-[#232323] rounded-sm md:px-12 shadow-sm"
          name="Contact"
          method="POST"
          data-netlify="true"
          onSubmit={onFormSubmit}
        >
          <input type="hidden" name="form-name" value="Contact" />

          <div className="flex items-start flex-col gap-2">
            <label htmlFor="name" className="font-semibold">
              Full Name
            </label>
            <input
              type="text"
              className="bg-transparent border-b-2 border-darkBlue w-full outline-none px-1"
              id="name"
              placeholder={'Please enter your name here'}
              name="name"
              defaultValue={nameRef.current}
              onChange={(e) => (nameRef.current = e.target.value)}
            />
          </div>
          <div className="flex items-start flex-col gap-2">
            <label htmlFor="feedback" className="font-semibold">
              Feedback
            </label>
            <textarea
              id="feedback"
              rows={7}
              placeholder={'Write your feedback here'}
              className="bg-transparent border-2 py-1 border-darkBlue w-full resize-none outline-none px-2 dark:caret-white"
              name="feedback"
              defaultValue={messageRef.current}
              onChange={(e) => (messageRef.current = e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="text-xl font-semibold bg-darkBlue hover:bg-blue-500 duration-300 active:scale-[.98] px-5 py-3 rounded-[100vmax] text-white w-32 mx-auto mt-[-12px] md:mt-0"
          >
            Submit
          </button>
        </form>
        {showConfetti && (
          <Confetti
            width={width}
            height={height}
            numberOfPieces={400}
            gravity={0.2}
          />
        )}
      </div>
      <footer className="absolute bottom-0 w-full bg-darkBlue left-0 px-2 md:px-8 lg:px-16 py-2 md:py-3 text-white flex items-center justify-between">
        <button className="w-10 md:w-12 hover:animate-spin" onClick={goToTop}>
          <img src={logo} alt="Serenity Logo" />
        </button>
        <p className="md:text-2xl">Copyright &copy; Aman 2023 - Present </p>
        <a href="" target="_blank">
          <Github className="scale-[1.1] md:scale-[1.4] duration-300 hover:scale-[1.2] md:hover:scale-[1.5]" />
        </a>
      </footer>
    </section>
  );
};

export default Feedback;
