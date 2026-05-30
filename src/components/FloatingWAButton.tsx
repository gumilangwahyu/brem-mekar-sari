"use client";
import { MessageCircle } from "lucide-react";

interface FloatingWAButtonProps {
  waNumber: string;
  message?: string;
}

export default function FloatingWAButton({
  waNumber,
  message = "Halo Mekar Sari 1, saya ingin memesan brem premium!",
}: FloatingWAButtonProps) {
  const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={waUrl}
      target="_blank"
      rel="noopener noreferrer"
      id="floating-wa-btn"
      aria-label="Chat WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-0 hover:gap-2.5 bg-green-500 hover:bg-green-400 text-white rounded-full shadow-2xl shadow-green-900/40 hover:shadow-green-500/40 transition-all duration-300 overflow-hidden"
      style={{ height: "3.5rem", minWidth: "3.5rem", paddingLeft: "1rem", paddingRight: "1rem" }}
    >
      <MessageCircle size={22} className="shrink-0" />
      <span className="whitespace-nowrap text-sm font-bold max-w-0 overflow-hidden hover:max-w-none transition-all duration-300 opacity-0 hover:opacity-100 group-hover:opacity-100">
        Chat WhatsApp
      </span>
    </a>
  );
}
