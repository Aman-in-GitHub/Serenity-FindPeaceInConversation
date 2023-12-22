import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { zodResolver } from '@hookform/resolvers/zod';

import { useToast } from '@/components/ui/use-toast';

import { Github } from 'lucide-react';
import logo from '/logo.svg';

const schema = z.object({
  name: z.string().nonempty(),
  feedback: z.string().nonempty()
});

const Feedback = () => {
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(schema)
  });

  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const onSubmitForm = (data: unknown) => {
    toast({
      description: `Thank you for your feedback ${data.name.split(' ')[0]}`
    });
  };

  return (
    <section className="min-h-screen dark:bg-[#131313] px-2 md:px-8 lg:px-16 font-texts select-none dark:text-white flex items-center relative">
      <h2 className="text-4xl font-headings absolute top-2 md:top-6 left-2 md:left-8 lg:left-16">
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
          noValidate
          onSubmit={handleSubmit(onSubmitForm)}
        >
          <div className="flex items-start flex-col gap-2">
            <label htmlFor="name" className="font-semibold">
              Full Name
            </label>
            <input
              type="text"
              className="bg-transparent border-b-2 border-darkBlue w-full outline-none px-1"
              id="name"
              placeholder={
                errors.name ? 'Please enter your name here' : 'John Doe'
              }
              {...register('name')}
              style={{
                borderColor: errors.name && 'red'
              }}
            />
          </div>
          <div className="flex items-start flex-col gap-2">
            <label htmlFor="feedback" className="font-semibold">
              Feedback
            </label>
            <textarea
              id="feedback"
              rows="7"
              placeholder={
                errors.feedback
                  ? "Feedback can't be empty"
                  : 'Write your feedback here'
              }
              className="bg-transparent border-2 py-1 border-darkBlue w-full resize-none outline-none px-2 dark:caret-white"
              {...register('feedback')}
              style={{
                borderColor: errors.feedback && 'red'
              }}
            />
          </div>
          <button
            type="submit"
            className="text-xl font-semibold bg-darkBlue hover:bg-blue-500 duration-300 active:scale-[.98] px-5 py-3 rounded-[100vmax] text-white w-32 mx-auto mt-[-12px] md:mt-0"
          >
            Submit
          </button>
        </form>
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
