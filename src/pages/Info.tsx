import {
  GraduationCap,
  Heart,
  HeartHandshake,
  Activity,
  Ghost,
  User2
} from 'lucide-react';

import { useNavigate } from 'react-router-dom';

const Info = () => {
  const navigate = useNavigate();

  return (
    <section className="min-h-screen dark:bg-[#131313] px-2 md:px-8 lg:px-16 font-texts relative select-none">
      <h2 className="text-4xl font-headings absolute top-2 md:top-6 left-2 md:left-8 lg:text-6xl lg:left-16 dark:text-white">
        Profiles
      </h2>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-20 lg:grid-cols-3 justify-center items-center pt-16 md:pt-24 pb-4 md:pb-0">
        <div className="w-[100%] h-64 flex items-center justify-center flex-col px-5 rounded-sm shadow-sm bg-yellow-200 pt-4">
          <Activity className="scale-[3]" />
          <p className="text-center mt-8 mb-3">
            Receive warmth, support, and understanding in "Parent" profile. Get
            advice and a caring, comforting presence.
          </p>
          <button
            className="bg-yellow-300 px-4 py-1 rounded-[100vmax] text-lg"
            onClick={() => {
              navigate('/chat/parent');
            }}
          >
            Chat
          </button>
        </div>
        <div className="w-[100%] h-64 flex items-center justify-center flex-col px-5 rounded-sm shadow-sm bg-emerald-200 pt-4">
          <GraduationCap className="scale-[3] " />
          <p className="text-center mt-8 mb-3">
            Learn, grow, and explore in "Teacher" profile. Get personalized
            lessons and expert guidance tailored to your interests and goals.
          </p>
          <button
            className="bg-emerald-300 px-4 py-1 rounded-[100vmax] text-lg"
            onClick={() => {
              navigate('/chat/teacher');
            }}
          >
            Chat
          </button>
        </div>
        <div className="w-[100%] h-64 flex items-center justify-center flex-col px-5 rounded-sm shadow-sm bg-sky-200 pt-4">
          <HeartHandshake className="scale-[3]" />
          <p className="text-center mt-8 mb-3">
            Connect on a personal level in "Friend" profile. Share stories,
            thoughts, and laughter with a trusted and reliable confidant.
          </p>
          <button
            className="bg-sky-300 px-4 py-1 rounded-[100vmax] text-lg"
            onClick={() => {
              navigate('/chat/friend');
            }}
          >
            Chat
          </button>
        </div>
        <div className="w-[100%] h-64 flex items-center justify-center flex-col px-5 rounded-sm shadow-sm bg-rose-200 pt-4">
          <Heart className="scale-[3]" />
          <p className="text-center mt-8 mb-3">
            Experience love and connection in "Lover" profile. Share your
            feelings, enjoy heartfelt conversations, and find companionship.
          </p>
          <button
            className="bg-rose-300 px-4 py-1 rounded-[100vmax] text-lg"
            onClick={() => {
              navigate('/chat/lover');
            }}
          >
            Chat
          </button>
        </div>

        <div className="w-[100%] h-64 flex items-center justify-center flex-col px-5 rounded-sm shadow-sm bg-indigo-200 pt-4">
          <Ghost className="scale-[3]" />
          <p className="text-center mt-8 mb-3">
            Unburden yourself and share your deepest thoughts in complete
            privacy in "Anonymous" mode. Your secrets are safe here.
          </p>
          <button
            className="bg-indigo-300 px-4 py-1 rounded-[100vmax] text-lg"
            onClick={() => {
              navigate('/chat/anonymous');
            }}
          >
            Chat
          </button>
        </div>
        <div className="w-[100%] h-64 flex items-center justify-center flex-col px-5 rounded-sm shadow-sm bg-[#f0f0f0] dark:bg-[#333333] dark:text-white pt-4">
          <User2 className="scale-[3]" />
          <p className="text-center mt-8 mb-3">
            Engage in personal dialogues with yourself in "Personal" profile.
            It's your personal sanctuary for introspection and self-improvement.
          </p>
          <button
            className="bg-[#dadada] dark:bg-[#494949] px-4 py-1 rounded-[100vmax] text-lg"
            onClick={() => {
              navigate('/chat/self');
            }}
          >
            Chat
          </button>
        </div>
      </div>
    </section>
  );
};

export default Info;
