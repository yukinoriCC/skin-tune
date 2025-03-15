"use client";

import React, { useState } from "react";
import { MessageSquare, Send, ExternalLink } from "lucide-react";
import Image from "next/image";

interface Message {
  id: string;
  type: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "assistant",
      content:
        "こんにちは！SkinTuneへようこそ。あなたのお肌の悩みや目標についてお聞かせください。最適なスキンケア製品をご提案させていただきます。",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content:
          "ご相談ありがとうございます。より詳しくアドバイスさせていただくために、以下についてお聞かせいただけますか？\n\n1. 現在のスキンケアルーティン\n2. 特に気になる肌の悩み\n3. お肌の性質（乾燥肌、脂性肌など）",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
    }, 1000);

    setInput("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Image
                className="dark:invert"
                src="/logo.jpeg"
                alt="logo"
                width={180}
                height={38}
                priority
              />
            </div>
            <a
              href="/products"
              className="flex items-center text-sm text-gray-600 hover:text-gray-900"
            >
              <span>製品一覧</span>
              <ExternalLink className="h-4 w-4 ml-1" />
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Chat Messages */}
          <div className="h-[600px] overflow-y-auto p-6">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.type === "user" ? "justify-end" : "justify-start"
                } mb-4`}
              >
                <div
                  className={`flex items-start space-x-2 max-w-[80%] ${
                    message.type === "user"
                      ? "flex-row-reverse space-x-reverse"
                      : ""
                  }`}
                >
                  <div className="flex-shrink-0">
                    {message.type === "assistant" ? (
                      <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center">
                        <MessageSquare className="h-4 w-4 text-pink-500" />
                      </div>
                    ) : (
                      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                        <div className="w-4 h-4 bg-gray-400 rounded-full" />
                      </div>
                    )}
                  </div>
                  <div
                    className={`p-3 rounded-lg ${
                      message.type === "user"
                        ? "bg-pink-500 text-white"
                        : "bg-gray-100 text-gray-900"
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{message.content}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Input Area */}
          <div className="border-t border-gray-200 p-4 bg-white">
            <div className="flex items-end space-x-3">
              <div className="flex-grow">
                <textarea
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent resize-none"
                  placeholder="お肌の悩みや目標を教えてください..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
              </div>
              <button
                onClick={handleSend}
                className="flex-shrink-0 p-3 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors"
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
