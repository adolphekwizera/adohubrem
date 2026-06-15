import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { getWhatsAppLink } from "@/lib/constants";

interface WhatsAppButtonProps {
  message?: string;
  label?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function WhatsAppButton({
  message,
  label = "Chat on WhatsApp",
  size = "md",
  className,
}: WhatsAppButtonProps) {
  return (
    <Button
      href={getWhatsAppLink(message)}
      external
      variant="whatsapp"
      size={size}
      className={className}
    >
      <MessageCircle size={18} />
      {label}
    </Button>
  );
}
