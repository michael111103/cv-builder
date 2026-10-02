import { WhatsAppIcon } from "@/components/Icons";
import { WHATSAPP_NUMBER } from "@/lib/constants";

export default function WhatsAppFloat() {
  return (
    <a
      href={`https://wa.me/${WHATSAPP_NUMBER}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp shadow-lg transition hover:bg-whatsapp-dark"
      aria-label="Chat on WhatsApp"
    >
      <WhatsAppIcon className="h-7 w-7 text-white" />
    </a>
  );
}
