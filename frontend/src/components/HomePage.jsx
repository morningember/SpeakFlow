import { ChevronRight, Mic, Sparkles } from "lucide-react";

const HomePage = ({ onStart }) => {
  return (
    <div className="max-w-280 m-auto pt-13.75 pb-20 px-12.5 ">
      <section className="grid grid-cols-[1.15fr_0.85fr] gap-15 items-center pt-8.75 px-0 pb-16.25">
        <div className="">
          <div className="inline-flex gap-1.75 items-center bg-[#ece8de] rounded-[99px] px-2 py-2.75 text-[#68645b] text-[11px] mb-5">
            <Sparkles size={14} /> Your personal AI Language companion
          </div>
          <h1 className="text-[66px] -leading-[0.045em] mt-0 mb-5.5 mx-0">
            Speak more <br />
            <em className=" ">Think less</em>
          </h1>
          <p className="text-[17px] max-w-132.5 mb-7">
            Real conversations, gentle corrections, and a tutor who remembers
            what you're working on.
          </p>
          <button
            className="text-white bg-[#242321] rounded-[9px] px-3.75 py-4.25 inline-flex items-center justify-center gap-2 hover:bg-[#3a3834] "
            onClick={onStart}
          >
            <Mic size={18} />
            Start a conversation
          </button>
          <div className="flex gap-5 text-[#88847b] text-[11px] mt-3.75">
            <span>
              <span className="w-1.5 h-1.5 bg-[#6c9c73] rounded-[50%] inline-block mr-1.25" />
              AI tutor ready
            </span>
            <span>~10 min daily</span>
          </div>
        </div>
        <div className="bg-[#fffdf8] border border-solid rounded-[20px] overflow-hidden shadow-[0_12px_40px_rgba(45,40,30,0.07)]">
          <div className="h-77.5 bg-linear-135 from-[#ead8ca] to-[#d9c6b7] grid place-items-center relative">
            <div
              className={
                "w-36.25 h-36.25 rounded-[50%] grid place-items-center text-white text-[64px] border-8 border-solid border-[rgba(255,255,255,0.45)] shadow-[0_15px_30px_rgba(60,40,30,0.13)] bg-coral"
              }
            >
            </div>
            <div className="absolute bottom-5 flex items-center gap-0.75">
              <i className="w-0.75 h-4.5 bg-[rgba(255,255,255,0.8)] rounded-[9px]" />
              <i className="w-0.75 h-7 bg-[rgba(255,255,255,0.8)] rounded-[9px]" />
              <i className="w-0.75 h-9.75 bg-[rgba(255,255,255,0.8)] rounded-[9px]" />
              <i className="w-0.75 h-6.25 bg-[rgba(255,255,255,0.8)] rounded-[9px]" />
              <i className="w-0.75 h-4.5 bg-[rgba(255,255,255,0.8)] rounded-[9px]" />
            </div>
          </div>
          <div className="flex justify-between pt-4.5 px-4.75 pb-1.25">
            
            <span className="text-[#66816d]">● online</span>
          </div>
          <div className="italic pt-2.5 px-3.75 pb-5.25 text-[16px] ">
            “Let's make today's conversation a little more challenging.”
          </div>
        </div>
      </section>
      <section className="grid grid-cols-4 border-t border-solid border-b px-5.5 py-0 mb-16.25">
        <div className="">
          <strong>18</strong>
          <span>minutes spoken</span>
        </div>
        <div className="">
          <strong>18</strong>
          <span>day streak</span>
        </div>
        <div className="">
          <strong>18</strong>
          <span>words saved</span>
        </div>
        <div className="">
          <strong>18</strong>
          <span>current level</span>
        </div>
      </section>
      <section className="">
        <div className="">
          <p className=""></p>
          <h2></h2>
        </div>
        <button className="">
  
          View all
          <ChevronRight size={15} />
        </button>
      </section>
    </div>
  );
};

export default HomePage;
