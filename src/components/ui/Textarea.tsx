import { forwardRef, type TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  editor?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, editor, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className={cn("space-y-2", editor && "editor-focus rounded-xl")}>
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-zinc-300"
          >
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={inputId}
          className={cn(
            "glass-input w-full rounded-xl px-4 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-500 min-h-[120px] resize-y",
            editor && "canvas-grid font-mono min-h-[320px] leading-relaxed",
            error &&
              "border-red-500/50 focus:border-red-500 focus:shadow-[0_0_20px_rgba(239,68,68,0.15)]",
            className
          )}
          {...props}
        />
        {error && <p className="text-sm text-red-400">{error}</p>}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
