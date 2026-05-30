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
      className="wa-float group flex items-center gap-0 hover:gap-3 overflow-hidden bg-green-500 hover:bg-green-600 text-white rounded-full shadow-2xl transition-all duration-300 h-14 w-14 hover:w-auto hover:px-5"
      aria-label="Chat WhatsApp"
      id="floating-wa-btn"
    >
      <MessageCircle size={24} className="flex-shrink-0 mx-auto group-hover:mx-0" />
      <span className="whitespace-nowrap text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 max-w-0 group-hover:max-w-xs overflow-hidden">
        Chat WhatsApp
      </span>
    </a>
  );
}
