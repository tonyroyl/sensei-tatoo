import { useToast } from "../lib/toast";
import { CheckIcon, CloseIcon } from "./icons";

/**
 * Toast stack. aria-live="polite" announces additions without stealing focus
 * (a11y: toast-accessibility). Auto-dismisses; also manually dismissible.
 */
export function Toaster() {
  const { toasts, dismiss } = useToast();

  return (
    <div
      className="pointer-events-none fixed bottom-5 left-1/2 z-[120] flex w-full max-w-sm -translate-x-1/2 flex-col gap-2 px-4 sm:left-auto sm:right-5 sm:translate-x-0"
      role="status"
      aria-live="polite"
    >
      {toasts.map((t) => (
        <div
          key={t.id}
          className="pointer-events-auto flex items-center gap-3 rounded-xl border border-gold/20 bg-[#161210]/95 px-4 py-3 shadow-ember backdrop-blur animate-toast-in"
        >
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gold/15 text-gold-bright">
            <CheckIcon className="h-4 w-4" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-solar">{t.message}</p>
            {t.detail && <p className="truncate text-xs text-solar/55">{t.detail}</p>}
          </div>
          <button
            type="button"
            onClick={() => dismiss(t.id)}
            aria-label="Fermer la notification"
            className="shrink-0 text-solar/40 transition-colors hover:text-solar"
          >
            <CloseIcon className="h-4 w-4" />
          </button>
        </div>
      ))}
    </div>
  );
}
