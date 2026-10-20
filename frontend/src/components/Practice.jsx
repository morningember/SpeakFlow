import { X, Mic, MicOff } from "lucide-react";

const Practice = ({
  // session,
  // startListening,
  setSession,
  messages,
  input,
  setInput,
  sendMessage,
  speak,
  transcript,
  toggleListening,
  listening
}) => {
  return (
    <div className="practice-page">
      <div className="practice-header">
        <div>
          <p className="kicker">LIVE CONVERSATION</p>
          <h1></h1>
        </div>
        <button className="end-btn" onClick={() => setSession(false)}>
          <X size={16} /> End
        </button>
        <div className="flex-1 overflow-y-auto space-y-4 pr-2 mb-4">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"}`}
            >
              <div
                className={`p-4 rounded-2xl max-w-lg text-sm shadow-sm space-y-2 ${msg.role === "user" ? "bg-amber-600 text-white rounded-tr-sm" : "bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-sm"}`}
              >
                <p
                  className="cursor-pointer"
                  onClick={() => {
                    if (msg.role === "assistant") speak(msg.content);
                    // else saveToFlashcards(msg.content);
                  }}
                  title="Click to speak or save"
                >
                  {msg.content}
                </p>
                <p>{msg.question}</p>
                {msg.role === "assistant" && (
                  <button
                    onClick={() => {
                      speak(msg.content);
                    }}
                    className="text-xs text-amber-400 flex items-center space-x-1 pt-1"
                  >
                    <span>🔊 Vorlesen (Listen)</span>
                  </button>
                )}
              </div>

              {msg.corrections && (
                <div className="mt-1 text-xs bg-red-950/40 text-red-300 px-3 py-1.5 rounded border border-red-900/50 max-w-lg">
                  {msg.corrections.map((correction, index) => (
                    <>
                      <strong key={index}>Grammar Tip:</strong>
                      {correction.corrected}
                    </>
                  ))}
                </div>
              )}
            </div>
          ))}
          {/* {loading && <div className="text-xs text-slate-500 animate-pulse">Greta tippt... (Greta is typing)</div>}
              <div ref={messagesEndRef} /> */}
        </div>
        {listening && (
          <div className="bg-amber-500/10 border border-amber-500/30 p-3 rounded-2xl flex items-center justify-between text-xs text-amber-300 animate-pulse">
            <div className="flex items-center space-x-2">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping"></div>
              <span>Sprich jetzt auf Deutsch!</span>
            </div>
            <span className="font-mono italic text-slate-400">
              {transcript || "..."}
            </span>
          </div>
        )}
        <form
          onSubmit={sendMessage}
          className="mt-3 bg-slate-900 border border-slate-800 rounded-2xl p-2 shadow-xl flex items-center space-x-2 shrink-0"
        >
          {/* Mic Speech-to-Text Button */}
          <button
            type="button"
            onClick={toggleListening}
            className={`w-12 h-12 rounded-xl flex items-center justify-center transition shrink-0 ${
              listening
                ? "bg-red-500 text-white animate-pulse shadow-lg shadow-red-500/30"
                : "bg-slate-800 hover:bg-slate-700 text-amber-400 border border-slate-700"
            }`}
            title={
              listening
                ? "Listening... Click to stop"
                : "Click to speak German"
            }
          >
            {listening ? (
              <MicOff className="w-5 h-5" />
            ) : (
              <Mic className="w-5 h-5" />
            )}
          </button>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Antworte auf Deutsch..."
            className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-sm text-slate-100 focus:outline-none focus:border-amber-500"
          />
          <button
            type="submit"
            className="bg-amber-600 hover:bg-amber-500 text-white px-5 py-3 rounded-lg text-sm font-semibold transition"
          >
            Senden
          </button>
          <button className=""></button>
        </form>
      </div>
    </div>
  );
};

export default Practice;
