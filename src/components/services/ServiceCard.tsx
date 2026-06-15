import { Card } from "@/components/ui/Card";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";

interface ServiceCardProps {
  title: string;
  description: string;
  message: string;
}

export function ServiceCard({ title, description, message }: ServiceCardProps) {
  return (
    <Card hover className="flex h-full flex-col">
      <h3 className="mb-3 text-lg font-semibold text-zinc-900 dark:text-white">
        {title}
      </h3>
      <p className="mb-6 flex-1 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
        {description}
      </p>
      <WhatsAppButton
        message={message}
        label="Get a Quote"
        size="sm"
        className="w-full"
      />
    </Card>
  );
}
