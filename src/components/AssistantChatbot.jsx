import React, { useState, useRef, useEffect } from "react";
import { 
  MessageSquare, 
  Sparkles, 
  X, 
  Send, 
  Terminal, 
  CheckCircle2, 
  ArrowRight, 
  Minimize2, 
  Bot, 
  User, 
  Wrench 
} from "lucide-react";
import { askAssistant } from "../services/api";

export default function AssistantChatbot({ 
  events, 
  isOpen, 
  setIsOpen, 
  onTriggerSkillGap, 
  onTriggerOD, 
  onTriggerTeammates, 
  externalPrompt 
}) {
  const [messages, setMessages] = useState([
    {
      id: "m_welcome",
      role: "assistant",
      text: "👋 Hi Milind! I am your **EventRoute AI Co-Pilot**. I'm connected to your academic schedule, verified GitHub skills, and active opportunity streams. How can I help you excel this semester?",
      toolCalls: []
    }
  ]);
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeToolExecution, setActiveToolExecution] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  // Handle external prompts (from demo tour steps)
  useEffect(() => {
    if (externalPrompt) {
      setIsOpen(true);
      handleSendMessage(externalPrompt);
    }
  }, [externalPrompt]);

  const handleSendMessage = async (textToSend) => {
    const text = textToSend || inputText;
    if (!text.trim() || loading) return;

    const userMsg = {
      id: `usr_${Date.now()}`,
      role: "user",
      text: text
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText("");
    setLoading(true);

    try {
      const response = await askAssistant(text, events);
      
      const botMsg = {
        id: `bot_${Date.now()}`,
        role: "assistant",
        text: response.reply,
        toolCalls: response.tool_calls || [],
        actionPayload: response.action_payload
      };

      setMessages(prev => [...prev, botMsg]);
    } catch (e) {
      console.error(e);
      setMessages(prev => [...prev, {
        id: `err_${Date.now()}`,
        role: "assistant",
        text: "Sorry, I encountered an issue processing that query.",
        toolCalls: []
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleActionClick = (actionName, payload) => {
    if (actionName === "Inspect Skill Gap" || payload?.action_type === "open_skill_gap") {
      onTriggerSkillGap(payload?.event_id || "evt_hackai_pune_26");
    } else if (actionName === "Generate OD Letter" || payload?.action_type === "open_od_letter") {
      onTriggerOD(payload?.event_id || "evt_hackai_pune_26", payload?.letter_data);
    } else if (actionName === "Find Teammates" || payload?.action_type === "open_teammates") {
      onTriggerTeammates(payload?.recommended_teammate);
    }
  };

  return (
    <>
      {/* Floating Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-indigo-600 via-indigo-500 to-emerald-500 text-white font-bold text-xs shadow-2xl shadow-indigo-500/30 hover:scale-105 active:scale-95 transition-all glow-indigo"
        >
          <Sparkles className="w-4 h-4 animate-pulse" />
          <span>Ask EventRoute AI</span>
          <span className="w-2 h-2 rounded-full bg-emerald-300 animate-ping"></span>
        </button>
      )}

      {/* Floating Chat Modal */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-[95%] sm:w-[460px] h-[600px] max-h-[85vh] bg-slate-900 border border-indigo-500/50 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-white glow-indigo">
          
          {/* Header */}
          <div className="flex items-center justify-between p-3.5 bg-slate-950 border-b border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-500 to-emerald-400 flex items-center justify-center">
                <Bot className="w-4 h-4 text-slate-950 font-bold" />
              </div>
              <div>
                <h3 className="font-display font-bold text-sm text-slate-100 flex items-center gap-1.5">
                  EventRoute Assistant
                  <span className="text-[9px] uppercase px-1.5 py-0.2 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                    RAG + Tools
                  </span>
                </h3>
                <p className="text-[10px] text-slate-400">Context: Milind (2nd Yr CSE) · Exam Synchronized</p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
              >
                <Minimize2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Pitch Prompts Chips */}
          <div className="p-2 bg-slate-950/60 border-b border-slate-800 flex items-center gap-1.5 overflow-x-auto text-[11px] whitespace-nowrap">
            <button
              onClick={() => handleSendMessage("Find me an AI hackathon this weekend that won't clash with my exams")}
              className="px-2.5 py-1 rounded-lg bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 transition shrink-0"
            >
              🎯 No-clash AI Hackathon
            </button>
            <button
              onClick={() => handleSendMessage("What skills do I need to prepare for HackAI Pune?")}
              className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition shrink-0"
            >
              📚 Check Skill Gap
            </button>
            <button
              onClick={() => handleSendMessage("Generate my college OD leave letter")}
              className="px-2.5 py-1 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 transition shrink-0"
            >
              📄 Draft OD Letter
            </button>
          </div>

          {/* Messages Body */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 text-xs">
            {messages.map((m) => (
              <div key={m.id} className={`flex flex-col ${m.role === "user" ? "items-end" : "items-start"}`}>
                
                {/* Message Bubble */}
                <div className={`p-3.5 rounded-2xl max-w-[90%] leading-relaxed ${
                  m.role === "user" 
                    ? "bg-indigo-600 text-white rounded-br-none shadow-md" 
                    : "bg-slate-800/80 text-slate-200 border border-slate-700/60 rounded-bl-none"
                }`}>
                  <p className="whitespace-pre-line">{m.text}</p>
                </div>

                {/* Agentic Tool-Calling Execution Logs */}
                {m.toolCalls && m.toolCalls.length > 0 && (
                  <div className="mt-2 w-[90%] p-2.5 rounded-xl bg-slate-950 border border-slate-800 font-mono text-[10px]">
                    <div className="flex items-center gap-1.5 text-indigo-400 font-semibold mb-1">
                      <Terminal className="w-3 h-3" />
                      <span>Autonomous Tool Executions ({m.toolCalls.length})</span>
                    </div>
                    {m.toolCalls.map((tc, idx) => (
                      <div key={idx} className="flex items-start gap-1.5 text-slate-400 py-0.5">
                        <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0 mt-0.5" />
                        <span className="text-slate-300 font-bold">[{tc.tool}]</span>
                        <span className="truncate">{tc.detail}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Suggested Action Chips */}
                {m.actionPayload?.suggested_actions && (
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {m.actionPayload.suggested_actions.map((act, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleActionClick(act, m.actionPayload)}
                        className="px-2.5 py-1 rounded-lg bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300 font-semibold border border-indigo-500/40 text-[11px] transition flex items-center gap-1"
                      >
                        <span>{act}</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    ))}
                  </div>
                )}

              </div>
            ))}

            {loading && (
              <div className="flex items-center gap-2 p-3 rounded-xl bg-slate-800/40 text-slate-400 text-xs w-48 animate-pulse">
                <Wrench className="w-3.5 h-3.5 animate-spin text-indigo-400" />
                <span>Calling tools & scoring...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Footer */}
          <div className="p-3 bg-slate-950 border-t border-slate-800 flex items-center gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder="Ask about events, clashes, OD letters, teams..."
              className="flex-1 bg-slate-900 border border-slate-800 focus:border-indigo-500 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 outline-none transition"
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={loading || !inputText.trim()}
              className="p-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white transition shadow-md"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>

        </div>
      )}
    </>
  );
}
