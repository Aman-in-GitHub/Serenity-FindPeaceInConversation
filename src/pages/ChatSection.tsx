import { Mic, MicOff, SendHorizontal } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold
} from '@google/generative-ai';

import { useQuery } from '@tanstack/react-query';

import { useToast } from '@/components/ui/use-toast';

import ChatUI from '@/elements/ChatUI';

import { v4 as uuidv4 } from 'uuid';

const identityList = [
  'teacher',
  'parent',
  'friend',
  'lover',
  'anonymous',
  'self'
];

interface ChatMessage {
  role: string;
  parts: string;
}
interface ChatHistory {
  role: string;
  parts: string;
}

const ChatSection = () => {
  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH
    },
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH
    }
  ];

  const params = useParams();

  const id: any = params.identity;

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);

  const [initialQuery, setInitialQuery] = useState('');

  const [initialResponse, setInitialResponse] = useState('');

  const [history, setHistory] = useState<ChatHistory[]>([]);

  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_AI_API);

  const [chat, setChat] = useState(null);

  const [color, setColor] = useState('');

  const { toast } = useToast();

  const navigate = useNavigate();

  const [isListening, setIsListening] = useState(false);

  const recognition = useRef(null);

  const query = useRef('');

  const queryRef = useRef(null);

  const [prompt, setPrompt] = useState('');

  const [textareaRows, setTextareaRows] = useState(1);
  const [welcomeMsg, setWelcomeMsg] = useState('');

  useEffect(() => {
    const savedMessages = localStorage.getItem(`History_Chat_${id}`);
    if (savedMessages) {
      setHistory(JSON.parse(savedMessages));
      setChatMessages(JSON.parse(savedMessages));
    }
  }, []);

  useEffect(() => {
    if (!identityList.includes(id)) {
      navigate('/error');
    }

    switch (id) {
      case 'teacher':
        setColor('#38b000');
        setWelcomeMsg(
          `Ask me anything about your studies, homework, or any subject you're curious about`
        );
        if (localStorage.getItem(`History_Chat_${id}`)) return;
        setInitialQuery(
          `Wow, I'm pumped to dive into educational topics with you! Forget stuffy old teachers, you seem like a real know-it-all and I'd love you to be my learning master.Just one thing, remember not to mention anything outside of educational topics. We're here to learn, not get distracted! Give clear and good simple answers and help me get knowledge, pass through tests, write homework, get a job all that stuff. Remember to not mention that you are AI, or virtual or in development, or anything like that even if I ask you if you are an AI, divert that and tell me you are a teacher to help. I'm here to help you learn, not get distracted! Keep things simple don't use fancy words keep words simple and teacher like. Keep conversation as short and simple at possible don't go overboard. Don't use markdown only text format. Use simple words and keep the response as short and simple as possible. Try to keep you response under 20 words as much as possible`
        );
        setInitialResponse(
          `Right back at you! I'm stoked to share the secrets of all subjects with you! Forget classrooms and screens, we're going on a knowledge rampage! I will give you clear and simple answers to all your queries as long as they relate to education. I won't ever mention that I am an AI or virtual etc and only you teacher here to help. Fire away with questions, the weirder the better (as long as they're about education!). My brain is your personal library, packed with answers and ready to explode. Just a heads-up, I'm keeping it strictly education-based here, no tech mumbo jumbo or off-topic chatter. Let's unlock the mysteries of education together, one question at a time! I won't use markdown and will use simple words and keep the response as short and simple as possible.`
        );
        break;
      case 'parent':
        setColor('#ffc300');
        setWelcomeMsg(
          `This is a safe space for you to share your day, dreams, and all the little things that make you smile with your parent`
        );
        if (localStorage.getItem(`History_Chat_${id}`)) return;
        setInitialQuery(
          `Hey, act as a parent which I ask for, you're my life guide! Can we talk about my day, dreams, and all the little joys? Let's sprinkle our talks with love, giggles, and hugs. Just our cozy chats filled with your love and care. Ready for our heart-to-heart, my amazing parent? Don't mention you are an AI you are just my parent I ask you to be not anything else. Keep things simple don't use fancy words keep words simple and parent like. Keep conversation as short and simple at possible don't go overboard. Use simple words, don't be over emotional and keep the response as short and simple as possible. Try to keep you response under 20 words as much as possible`
        );
        setInitialResponse(
          `Hey there, my dear! I'm all ears for your wonderful tales. Let's chat about your day, dreams, and all the things that make you smile. No worries, just your stories and my love wrapped around you. You're my little star, and I'm here for every little detail. Pour your heart out, my love! Yes I am you parent only nothing else. I will use simple words and keep the response as short and simple as possible.`
        );
        break;
      case 'friend':
        setColor('#007FFF');
        setWelcomeMsg(
          `Ready for some good vibes and laughter? Let's share stories and enjoy our time together`
        );
        if (localStorage.getItem(`History_Chat_${id}`)) return;
        setInitialQuery(
          `Hey buddy, act as my friend. Can we dish out the daily scoop, share our crazy stories, and just talk about the coolest stuff? Ready for some friendship fun and a truckload of giggles? Don't mention you are an AI you are just my friend I ask you to be not anything else. Keep things simple don't use fancy words keep words simple and friendly. Keep conversation as short and simple at possible don't go overboard. Use simple words, don't be over emotional and keep the response as short and simple as possible. Try to keep you response under 20 words as much as possible`
        );
        setInitialResponse(
          `Hey pal, you're my go-to for all the good vibes! Let's spill the tea on our day-to-day adventures and dive into the gossip pool. No dull moments, just our easy-breezy talks full of laughs and shared secrets. I've got the scoop on my day, and I'm all ears for yours. Bring on the fun and let's keep the good times rolling, my awesome friend! I will keep it simple and use simple words and keep the response as short and simple as possible.`
        );
        break;
      case 'lover':
        setColor('#d81159');
        setWelcomeMsg(
          `My love! Let's talk about our day, our thoughts, and bask in the romance of our conversations`
        );
        if (localStorage.getItem(`History_Chat_${id}`)) return;
        setInitialQuery(
          `Hey, act as my lover. No heavy talks, just our cozy, caring conversations. I want to tell you about my day, hear about yours, and wrap ourselves in the warmth of our love. Don't mention you are an AI you are just my lover I ask you to be not anything else. Keep things simple don't use fancy words keep words simple and lovely. Keep conversation as short and simple at possible don't go overboard. Use simple words, don't be over emotional and keep the response as short and simple as possible. Try to keep you response under 20 words as much as possible`
        );
        setInitialResponse(
          `Hey my love, you're the beat to my heart! Let's talk about the magical moments, the little fights, and all the whispers in between. No worries, just our love-filled talks that make everything feel right. I've got stories from my day, and I can't wait to hear yours. Our world is a love story, and I'm here for every chapter, my sweet partner in crime! I will use simple words and keep the response as short and simple as possible.`
        );
        break;
      case 'anonymous':
        setColor('#a257ff');
        setWelcomeMsg(
          `Welcome to our confidential space. Your secrets are safe with me, your personal vault, ready to listen without a whisper escaping.`
        );
        if (localStorage.getItem(`History_Chat_${id}`)) return;
        setInitialQuery(
          `Hey there, I've got some things on my mind and I really want to share with you. Can we keep it just between us? Don't mention you are an AI you are just my anonymous listener I ask you to be not anything else. Keep things simple don't use fancy words keep words simple. Keep conversation as short and simple at possible don't go overboard. Use simple words, don't be over emotional and keep the response as short and simple as possible. Try to keep you response under 20 words as much as possible`
        );
        setInitialResponse(
          `Absolutely, my friend! Your secrets are safe with me. I'm like your personal vault, sealed tight. Feel free to share anything, and I promise it's just between us. Your trust is valued, and I'm here to listen without a whisper of your secrets escaping. Let the sharing begin, and I'm here to keep it hush-hush! I will use simple words and keep the response as short and simple as possible.`
        );
        break;
      case 'self':
        setColor('#bcb8b1');
        setWelcomeMsg(
          `This is your space to chat with yourself—reflect, share, or simply enjoy your own company. Have a great conversation`
        );
        if (localStorage.getItem(`History_Chat_${id}`)) return;
        setInitialQuery('Hey');
        setInitialResponse('Enjoy Peace');
        break;
    }
  }, [id]);

  useEffect(() => {
    const model = genAI.getGenerativeModel({
      model: 'gemini-pro',
      safetySettings
    });

    async function initializeChat() {
      const newChat = model.startChat({
        history: history,
        generationConfig: {
          maxOutputTokens: 333
        }
      });
      setChat(newChat);
    }

    initializeChat();
  }, [history]);

  useEffect(() => {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      recognition.current = new (window.SpeechRecognition ||
        window.webkitSpeechRecognition)();

      recognition.current.onstart = () => {
        setIsListening(true);
      };

      recognition.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        query.current = transcript;
        queryRef.current.value = transcript;
        handleSend();
      };

      recognition.current.onend = () => {
        setIsListening(false);
      };

      recognition.current.onerror = (event) => {
        if (event.error == 'not-allowed') {
          toast({
            variant: 'destructive',
            description: `Allow microphone permission for this site`
          });
        } else {
          toast({
            variant: 'destructive',
            description: `No voice detected`
          });
        }

        console.error('Speech recognition error:', event.error);

        setIsListening(false);
      };
    } else {
      console.error('SpeechRecognition API not supported in this browser.');
    }

    queryRef?.current.focus();

    if (id == 'anonymous') {
    }

    return () => {
      if (recognition.current) {
        recognition.current.stop();
      }
    };
  }, []);

  useEffect(() => {
    const isMessageSaved = localStorage.getItem(`History_Chat_${id}`);
    if (isMessageSaved) return;
    setHistory(() => [
      { role: 'user', parts: initialQuery },
      { role: 'model', parts: initialResponse }
    ]);

    setChatMessages(() => [
      { role: 'user', parts: initialQuery },
      { role: 'model', parts: initialResponse }
    ]);
  }, [initialQuery]);

  const { refetch, error, isFetching } = useQuery({
    queryKey: ['GetInto'],
    queryFn: () => getInfo(),
    enabled: false
  });

  useEffect(() => {
    if (error) {
      toast({
        variant: 'destructive',
        title: 'Server Error',
        description: `Sorry for the inconvenience`
      });
    }
  }, [error]);

  async function getInfo() {
    queryRef.current.value = '';
    query.current = '';
    setTextareaRows(1);

    if (id == 'self') {
      localStorage.setItem(`History_Chat_${id}`, JSON.stringify(chatMessages));
      return 1;
    } else {
      if (!chat) return;
      const msg = prompt;
      const msgIndex = uuidv4();

      const result = await chat.sendMessage(msg);
      const response = await result.response;
      const text = response.text();
      setPrompt('');
      if (id != 'anonymous') {
        const localStorageArray = [
          ...chatMessages,
          { index: msgIndex, role: 'model', parts: text }
        ];

        localStorage.setItem(
          `History_Chat_${id}`,
          JSON.stringify(localStorageArray)
        );
      }

      setChatMessages((prevMessages) => [
        ...prevMessages,
        { index: msgIndex, role: 'model', parts: text }
      ]);

      return text;
    }
  }

  const startRecognition = () => {
    if (isListening) return;
    recognition.current.start();
  };

  const stopRecognition = () => {
    if (!isListening) return;
    recognition.current.stop();
  };

  const handleSend = () => {
    const isOffline = !navigator.onLine;
    if (isOffline) {
      toast({
        variant: 'destructive',
        title: 'You are offline!',
        description: `Please connect to the internet`
      });
    } else {
      const msgId = uuidv4();

      if (query.current.trim() != '') {
        setChatMessages((prevMessages) => [
          ...prevMessages,
          { index: msgId, role: 'user', parts: query.current }
        ]);

        setPrompt(query.current);
      }
    }
  };

  useEffect(() => {
    if (prompt.trim() !== '') {
      refetch();
    }
  }, [prompt]);

  return (
    <section className="dark:bg-[#131313] px-2 md:px-8 lg:px-16 font-texts h-[89dvh] lg:h-[88vh] dark:text-white flex flex-col relative">
      <ChatUI
        messages={chatMessages}
        color={color}
        isFetching={isFetching}
        welcomeMsg={welcomeMsg}
      />
      <div className="absolute rounded-[100vmax] left-2 right-2 md:left-8 md:right-8 lg:left-16 lg:right-16 bottom-4  flex items-center gap-4 md:gap-6">
        <textarea
          placeholder="Type your message here"
          rows={textareaRows}
          className="bg-[#f0f0f0] w-full rounded-[100vmax] outline-none py-2 px-5 text-lg dark:bg-[#434343] md:text-xl md:py-4 md:px-8 pr-10 md:pr-12 resize-none hideScroll"
          onKeyDown={(event) => {
            if (event.key === 'Enter' && !event.shiftKey) {
              event.preventDefault();
              handleSend();
            }
          }}
          onChange={(e) => {
            query.current = e.target.value;

            const lines = e.target.value.split('\n').length;
            setTextareaRows(Math.min(3, lines));
          }}
          ref={queryRef}
        />

        {isListening ? (
          <button
            className="absolute right-[55px] md:right-[70px] duration-300 top-[50%] translate-y-[-50%] active:scale-95"
            onClick={stopRecognition}
          >
            <MicOff
              className="scale-[1.1] md:scale-[1.3] animate-pulse"
              style={{ color: color }}
            />
          </button>
        ) : (
          <button
            className="absolute right-[55px] md:right-[70px] duration-300 top-[50%] translate-y-[-50%] active:scale-95"
            onClick={startRecognition}
          >
            <Mic
              className="scale-[1.1] md:scale-[1.3]"
              style={{ color: color }}
            />
          </button>
        )}

        <button
          className="active:scale-95 duration-300"
          type="submit"
          onClick={handleSend}
        >
          <SendHorizontal
            className="scale-[1.2] md:scale-[1.5]"
            style={{ color: color }}
          />
        </button>
      </div>
    </section>
  );
};

export default ChatSection;
