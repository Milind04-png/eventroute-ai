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
          className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-[#5964FE] to-[#7B73FE] text-white font-bold text-xs shadow-2xl shadow-[#5964FE]/35 hover:scale-105 active:scale-95 transition-all cursor-pointer"
        >
          <Sparkles className="w-4 h-4 animate-pulse" />
          <span>Ask EventRoute AI</span>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
        </button>
      )}

      {/* Floating Chat Modal (Styled identically to Neural Universe AI Chatbot card) */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-[95%] sm:w-[460px] h-[600px] max-h-[85vh] bg-white/95 backdrop-blur-2xl border border-[#E2E7FA] rounded-3xl shadow-[0_25px_60px_rgba(89,100,254,0.18)] flex flex-col overflow-hidden text-[#10174D]">
          
          {/* Header */}
          <div className="flex items-center justify-between p-4 bg-white/90 border-b border-[#F0F3FD]">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-2xl bg-[#DFE3FF] text-[#434EEB] flex items-center justify-center shadow-xs">
                <Sparkles className="w-4 h-4 text-[#5964FE]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-display font-extrabold text-sm text-[#10174D]">
                    AI Chatbot
                  </h3>
                  <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-600">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    Online
                  </span>
                </div>
                <p className="text-[10px] text-[#525A8B]">Context: Milind (2nd Yr CSE, DTC) · Exam Synchronized</p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-xl text-[#8E9BBF] hover:text-[#10174D] hover:bg-[#EEF2FE] transition cursor-pointer"
              >
                <Minimize2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Suggested Prompt Chips (Matching the exact pills in screenshot) */}
          <div className="p-2.5 bg-[#F8FAFF] border-b border-[#F0F3FD] flex items-center gap-1.5 overflow-x-auto text-[11px] whitespace-nowrap">
            <button
              onClick={() => handleSendMessage("Find me an AI hackathon this weekend that won't clash with my exams")}
              className="px-2.5 py-1 rounded-xl bg-white hover:bg-[#DFE3FF] text-[#434EEB] border border-[#DCE3F9] transition shrink-0 font-medium shadow-xs cursor-pointer"
            >
              🎯 No-clash AI Hackathon
            </button>
            <button
              onClick={() => handleSendMessage("What skills do I need to prepare for HackAI Pune?")}
              className="px-2.5 py-1 rounded-xl bg-white hover:bg-[#DFE3FF] text-[#525A8B] border border-[#DCE3F9] transition shrink-0 font-medium shadow-xs cursor-pointer"
            >
              📚 Check Skill Gap
            </button>
            <button
              onClick={() => handleSendMessage("Generate my college OD leave letter")}
              className="px-2.5 py-1 rounded-xl bg-white hover:bg-[#DFE3FF] text-[#434EEB] border border-[#DCE3F9] transition shrink-0 font-medium shadow-xs cursor-pointer"
            >
              📄 Draft OD Letter
            </button>
          </div>

          {/* Messages Body */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 text-xs bg-[#FAFBFD]/50">
            {messages.map((m) => (
              <div key={m.id} className={`flex flex-col ${m.role === "user" ? "items-end" : "items-start"}`}>
                
                {/* Message Bubble */}
                <div className={`p-3.5 rounded-2xl max-w-[90%] leading-relaxed ${
                  m.role === "user" 
                    ? "bg-gradient-to-r from-[#5964FE] to-[#7B73FE] text-white rounded-br-none shadow-md shadow-[#5964FE]/20" 
                    : "bg-white text-[#10174D] border border-[#E2E7FA] shadow-xs rounded-bl-none"
                }`}>
                  <p className="whitespace-pre-line">{m.text}</p>
                </div>

                {/* Agentic Tool-Calling Execution Logs */}
                {m.toolCalls && m.toolCalls.length > 0 && (
                  <div className="mt-2 w-[90%] p-2.5 rounded-xl bg-[#EEF2FE] border border-[#DCE3F9] font-mono text-[10px]">
                    <div className="flex items-center gap-1.5 text-[#434EEB] font-semibold mb-1">
                      <Terminal className="w-3 h-3" />
                      <span>Autonomous Tool Executions ({m.toolCalls.length})</span>
                    </div>
                    {m.toolCalls.map((tc, idx) => (
                      <div key={idx} className="flex items-start gap-1.5 text-[#525A8B] py-0.5">
                        <CheckCircle2 className="w-3 h-3 text-[#5964FE] shrink-0 mt-0.5" />
                        <span className="text-[#10174D] font-bold">[{tc.tool}]</span>
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
                        className="px-2.5 py-1 rounded-xl bg-[#DFE3FF] hover:bg-[#D5DBFE] text-[#434EEB] font-semibold border border-[#C7D2FE] text-[11px] transition flex items-center gap-1 cursor-pointer"
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
              <div className="flex items-center gap-2 p-3 rounded-2xl bg-white border border-[#E2E7FA] text-[#525A8B] text-xs w-48 shadow-xs animate-pulse">
                <Wrench className="w-3.5 h-3.5 animate-spin text-[#5964FE]" />
                <span>Calling tools & scoring...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Footer */}
          <div className="p-3 bg-white border-t border-[#F0F3FD] flex items-center gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder="Ask about events, clashes, OD letters, teams..."
              className="flex-1 bg-[#F8FAFF] border border-[#DCE3F9] focus:border-[#5964FE] focus:ring-2 focus:ring-[#5964FE]/20 rounded-2xl px-3.5 py-2.5 text-xs text-[#10174D] placeholder-[#8E9BBF] outline-none transition"
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={loading || !inputText.trim()}
              className="w-10 h-10 rounded-2xl bg-gradient-to-r from-[#5964FE] to-[#7B73FE] hover:opacity-95 disabled:opacity-40 text-white flex items-center justify-center transition shadow-md shadow-[#5964FE]/25 cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>

        </div>
      )}
    </>
  );
}
