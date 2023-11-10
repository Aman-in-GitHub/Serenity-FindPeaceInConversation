import { Mic, MicOff, SendHorizontal } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useToast } from '@/components/ui/use-toast';

const identityList = [
  'teacher',
  'parent',
  'friend',
  'lover',
  'anonymous',
  'self'
];

const ChatSection = () => {
  const params = useParams();
  const id: any = params.identity;

  const [color, setColor] = useState('');

  const { toast } = useToast();

  const navigate = useNavigate();

  const [isListening, setIsListening] = useState(false);

  const recognition = useRef(null);
  const query = useRef('');
  const queryRef = useRef(null);

  useEffect(() => {
    if (!identityList.includes(id)) {
      navigate('/error');
    }

    switch (id) {
      case 'teacher':
        setColor('#38b000');
        break;
      case 'parent':
        setColor('#ffc300');
        break;
      case 'friend':
        setColor('#007FFF');
        break;
      case 'lover':
        setColor('#d81159');
        break;
      case 'anonymous':
        setColor('#a257ff');
        break;
      default:
        setColor('#bcb8b1');
    }
  }, [id]);

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
        // handleSend();
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

    return () => {
      if (recognition.current) {
        recognition.current.stop();
      }
    };
  }, []);

  const startRecognition = () => {
    if (isListening) return;
    recognition.current.start();
  };

  const stopRecognition = () => {
    if (!isListening) return;
    recognition.current.stop();
  };

  const handleSend = () => {
    if (query.current.trim() !== '') {
      console.log(query.current);
    }
  };

  return (
    <section className="dark:bg-[#131313] px-2 md:px-8 lg:px-16 font-texts h-[89dvh] lg:h-[88vh] dark:text-white relative">
      <div className="absolute rounded-[100vmax] left-2 right-2 md:left-8 md:right-8 lg:left-16 lg:right-16 bottom-4  flex items-center gap-4 md:gap-6">
        <textarea
          placeholder="Type your message here"
          rows={1}
          className="bg-[#f0f0f0] w-full rounded-[100vmax] outline-none py-2 px-5 text-lg dark:bg-[#434343] md:text-xl md:py-4 md:px-8 pr-10 md:pr-12 resize-none hideScroll"
          onChange={(e) => (query.current = e.target.value)}
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
