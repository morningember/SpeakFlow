import { useState, useEffect } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import {
  BookOpen,
  Brain,
  ChevronRight,
  Flame,
  Headphones,
  Home,
  Languages,
  Mic,
  Settings2,
} from "lucide-react";
import HomePage from "./components/HomePage";
import Practice from "./components/Practice";
import Cards from "./components/Cards";
import Lessons from "./components/Lessons";
import Shadowing from "./components/Shadowing";

function App() {
  const nav = [
    ["home", "Home", Home],
    ["practice", "Practice", Mic],
    ["flashcards", "Cards", BookOpen],
    ["lessons", "Lessons", Brain],
    ["shadowing", "Shadowing", Headphones],
  ];
  const SCENARIOS = [
    {
      id: "free",
      title: "Freies Gespräch",
      desc: "Free conversation on any topic",
      icon: "💬",
      level: "All Levels",
    },
    {
      id: "cafe",
      title: "Im Café bestellen",
      desc: "Order drinks & food in Berlin",
      icon: "☕",
      level: "A1-A2",
    },
    {
      id: "doctor",
      title: "Beim Arzt",
      desc: "Explain symptoms to a doctor",
      icon: "🩺",
      level: "A2-B1",
    },
    {
      id: "interview",
      title: "Vorstellungsgespräch",
      desc: "Job interview practice",
      icon: "💼",
      level: "B1-B2",
    },
    {
      id: "train",
      title: "Smalltalk im Zug",
      desc: "Casual chat during a train ride",
      icon: "🚆",
      level: "A2-B1",
    },
  ];
  const [page, setPage] = useState("home");
  const [streak, setStreak] = useState(7);
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState("German");
  // const [isListening, setIsListening] = useState(false);
  const [scenario, setScenario] = useState(SCENARIOS[0]);
  const [session, setSession] = useState("false");
  const [text, setText] = useState("false");

  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hallo? Wie lauft es Heute?" },
  ]);
  const [input, setInput] = useState("");

  const {
    transcript,
    finalTranscript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const startListening = async () => {
    // resetTranscript();
    // setText("");
    try {
      await SpeechRecognition.startListening({
        language: "de-DE",
        continuous: true,
      });
    } catch (error) {
      console.error(error);
    }
  };
  
  const stopListening = async () => {
    await SpeechRecognition.stopListening();
    try {
      const spokenText = finalTranscript.trim()
      setText(spokenText)
      sendMessage(spokenText)
      console.log(spokenText)
    } catch (error) {
      console.error(error)
    }

    // const spokenText = finalTranscript.trim();
    // if (spokenText) {
    //   setText(spokenText);
    //   // sendMessage(spokenText);
    //   console.log(finalTranscript);
    //   resetTranscript();
    // }
  };

  if (!browserSupportsSpeechRecognition) {
    return <p>Your browser does not support speech recognition.</p>;
  }

  const toggleListening = async () => {
    if (listening) {
      await stopListening();
    } else {
      await startListening();
    }
  };

  const startSession = () => {
    setSession(true);
    setPage("practice");
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;
    setInput("");
    const newMessages = [...messages, { role: "user", content: text }];
    setMessages(newMessages);

    try {
      const res = await fetch("http://localhost:3000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          history: newMessages.map((m) => ({
            role: m.role === "assistant" ? "assistant" : "user",
            content: m.content,
          })),
        }),
      });
      const data = await res.json();
      speak(data.response);
      setMessages([
        ...newMessages,
        {
          role: "assistant",
          content: data.response || data.coach_response || data.reply,
          corrections: data.corrections || null,
          question: data.follow_up_question,
        },
      ]);

      data.corrections.map((correction) => {
        console.log(correction.corrected);
      });
    } catch (error) {
      console.error(error);
      setMessages([
        ...newMessages,
        { role: "assistant", content: "Entschuldigung, es gab einen Fehler." },
      ]);
    }
  };

  const speak = (text) => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "de-DE";
      window.speechSynthesis.speak(utterance);
    }
  };

  useEffect(() => {
    console.log("transcript: ", transcript);
    console.log(messages);
  }, [messages, transcript]);

  return (
    <div className="flex min-h-screen">
      <aside className="w-60 bg-[#eeece5] border-r border-solid border-[#e7e2d8] py-6.25 px-4.25 flex flex-col fixed inset-[0_auto_0_0]">
        <div className="flex items-center gap-2.5 font-bold text-[19px] py-0 px-10 mb-10">
          <div className="w-7.75 h-7.75 text-white bg-blue-950 rounded-[10px] grid place-items-center italic">
            S
          </div>
          <span>Speak</span>
        </div>
        <div className="text-[10px] font-bold text-[#989388] pt-0 pb-2.25 px-3">
          LEARN
        </div>
        <nav>
          {nav.map(([id, label, Icon]) => (
            <button
              key={id}
              className={`w-full flex items-center gap-3 bg-transparent py-2.75 px-3 rounded-[10px] text-[#6d6a62] my-0.5 mx-0 text-left ${page === id ? "bg-[#e3e0d7] text-[#242321] font-bold hover:bg-[#e3e0d7] hover:text-[#242321]" : ""}`}
              onClick={() => setPage(id)}
            >
              <Icon size={18} /> <span>{label}</span>
            </button>
          ))}
        </nav>
        <div className="flex-1" />
        <div className="bg-[#e4e0d6] p-3.5 my-3 mx-0 rounded-[13px]">
          <div className="flex gap-2 items-center text-[13px]">
            <Flame size={17} className="text-[#e8654f]" />{" "}
            <strong>{streak} day streak</strong>
          </div>
          <p className="text-[11px] text-[#79766e] mt-1.75 mb-3 mx-0 leading-normal">
            keep your speaking habit alive
          </p>
          <div className="h-1.25 bg-[#e6e1d8] rounded-[99px] overflow-hidden">
            <span
              className="block h-full rounded-[99px] bg-[#e8654f]"
              style={{ width: "72%" }}
            ></span>
          </div>
        </div>
        <button className="w-full flex items-center gap-3 bg-transparent px-2.75 py-3 rounded-[10px] text-[#6d6a62] my-0.5 mx-0 text-left">
          <Settings2 size={18} />
          <span>Settings</span>
        </button>
        <div className="flex gap-2.5 items-center pt-3.75 pb-0 px-2 border-t border-solid mt-2">
          <div className="bg-[#c8a78e] text-white grid place-items-center text-[10px] font-bold w-7.75 h-7.75 rounded-[50%]">
            WM
          </div>
          <div className="">
            <b className="block text-[12px]">Weave</b>
            <small className="block text-[10px] mt-0.5">German . B1</small>
          </div>
        </div>
      </aside>
      <main className="ml-60 w-[calc(100%-240px)] min-h-full">
        <header className="h-18.75 border-b border-solid flex justify-end items-center px-0 py-10.5">
          <div className="">
            <div className="w-7.75 h-7.75 text-white bg-blue-950 rounded-[10px] grid place-items-center italic">
              S
            </div>
            Speak
          </div>
          <div className="flex gap-3.75 items-center">
            <button className="bg-transparent border border-solid rounded-[99px] px-2 py-2.75 flex items-center gap-1.75 text-[#5f5c55] text-xs">
              <Languages size={16} />
              {language} <ChevronRight size={14} />
            </button>
            <div className="bg-[#c8a78e] text-white grid place-items-center text-[10px] font-bold w-7.75 h-7.75 rounded-[50%]">
              WM
            </div>
          </div>
        </header>
        {page === "home" && (
          <HomePage onStart={startSession} setPage={setPage} />
        )}
        {page === "practice" && (
          <Practice
            transcript={transcript}
            onStart={startSession}
            // text={text}
            startListening={startListening}
            stopListening={stopListening}
            toggleListening={toggleListening}
            setPage={setPage}
            session={session}
            setInput={setInput}
            input={input}
            messages={messages}
            sendMessage={sendMessage}
            listening={listening}
          />
        )}
        {page === "lessons" && <Lessons onStart={startSession} />}
        {page === "flashcards" && <Cards />}
        {page === "shadowing" && (
          <Shadowing onStart={startSession} setPage={setPage} speak={speak} />
        )}
        return
      </main>
    </div>
  );
}

export default App;
