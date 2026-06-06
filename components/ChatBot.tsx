"use client";

import React, { useState, useRef, useEffect } from 'react';
import { useLang } from '../lib/providers';
import { Chat, Close, Send } from './icons';

interface Msg { role: 'user' | 'assistant'; content: string }

export function ChatBot() {
  const { t, lang, dir } = useLang();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Msg[]>([]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Seed greeting when opened (and reset if language changes)
  useEffect(() => {
    setMessages([{ role: 'assistant', content: t.chat.greeting }]);
  }, [t.chat.greeting]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, loading]);

  async function send() {
    const text = input.trim();
    if (!text || loading) return;
    const next = [...messages, { role: 'user' as const, content: text }];
    setMessages(next);
    setInput('');
    setLoading(true);
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: next, lang }),
      });
      const data = await res.json();
      setMessages((m) => [...m, { role: 'assistant', content: data.reply ?? '…' }]);
    } catch {
      setMessages((m) => [...m, { role: 'assistant', content: '⚠️' }]);
    } finally {
      setLoading(false);
    }
  }

  const side = dir === 'rtl' ? { right: '1.5rem' } : { left: '1.5rem' };

  return (
    <>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={t.chat.title}
        className="fixed bottom-6 z-40 w-14 h-14 rounded-full bg-brand-gold hover:bg-brand-goldDark text-white shadow-lg shadow-black/20 flex items-center justify-center transition-colors"
        style={side}
      >
        {open ? <Close width={26} height={26} /> : <Chat width={26} height={26} />}
      </button>

      {open && (
        <div
          className="fixed bottom-24 z-40 w-[min(360px,calc(100vw-2rem))] h-[460px] max-h-[70vh] rounded-2xl overflow-hidden shadow-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-brand-inkSoft flex flex-col"
          style={side}
        >
          {/* header */}
          <div className="bg-brand-gold text-white px-4 py-3 flex items-center gap-2 shrink-0">
            <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center"><Chat width={18} height={18} /></span>
            <div className="font-bold text-sm">{t.chat.title}</div>
          </div>

          {/* messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3 no-scrollbar">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                    m.role === 'user'
                      ? 'bg-brand-gold text-white rounded-ee-sm'
                      : 'bg-neutral-100 dark:bg-brand-ink text-brand-ink dark:text-neutral-200 rounded-es-sm'
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="text-xs text-neutral-400 ps-1">{t.chat.typing}</div>
            )}
          </div>

          {/* input */}
          <div className="p-3 border-t border-black/10 dark:border-white/10 flex items-center gap-2 shrink-0">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && send()}
              placeholder={t.chat.placeholder}
              className="flex-1 bg-neutral-100 dark:bg-brand-ink text-sm rounded-full px-4 py-2.5 outline-none text-brand-ink dark:text-white placeholder:text-neutral-400"
            />
            <button
              onClick={send}
              disabled={loading}
              aria-label={t.chat.send}
              className="w-10 h-10 rounded-full bg-brand-gold hover:bg-brand-goldDark text-white flex items-center justify-center disabled:opacity-50 transition-colors"
            >
              <Send width={18} height={18} className="rtl:rotate-180" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
