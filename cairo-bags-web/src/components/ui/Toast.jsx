import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { cn } from "../../utils/cn.js";

const ToastContext = createContext(null);

let toastId = 0;

const variantStyles = {
  default: "border-brand-border bg-brand-surface text-brand-text",
  success: "border-emerald-200 bg-emerald-50 text-emerald-900 dark:border-emerald-800 dark:bg-emerald-950 dark:text-emerald-100",
  warning: "border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-800 dark:bg-amber-950 dark:text-amber-100",
  error: "border-red-200 bg-red-50 text-red-900 dark:border-red-800 dark:bg-red-950 dark:text-red-100",
  info: "border-blue-200 bg-blue-50 text-blue-900 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-100",
};

const icons = {
  success: "✓",
  warning: "!",
  error: "×",
  info: "i",
  default: "•",
};

function ToastItem({ toast, onDismiss }) {
  return (
    <div
      role="status"
      className={cn(
        "pointer-events-auto flex w-full max-w-sm items-start gap-3 rounded-lg border p-4 shadow-toast",
        "animate-slide-up",
        variantStyles[toast.variant || "default"]
      )}
    >
      <span
        className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-primary/10 text-xs font-bold"
        aria-hidden="true"
      >
        {icons[toast.variant || "default"]}
      </span>
      <div className="min-w-0 flex-1">
        {toast.title ? <p className="text-sm font-medium">{toast.title}</p> : null}
        {toast.message ? (
          <p className={cn("text-sm", toast.title ? "mt-0.5 opacity-90" : "")}>{toast.message}</p>
        ) : null}
      </div>
      <button
        type="button"
        onClick={() => onDismiss(toast.id)}
        className="shrink-0 rounded p-1 opacity-60 transition-opacity hover:opacity-100"
        aria-label="Dismiss"
      >
        ×
      </button>
    </div>
  );
}

function ToastViewport({ toasts, onDismiss }) {
  if (typeof document === "undefined") return null;

  return createPortal(
    <div
      className="pointer-events-none fixed inset-x-0 bottom-0 z-[70] flex flex-col items-center gap-3 p-4 sm:items-end sm:p-6"
      aria-live="polite"
      aria-relevant="additions"
    >
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onDismiss={onDismiss} />
      ))}
    </div>,
    document.body
  );
}

export function ToastProvider({ children, defaultDuration = 4000 }) {
  const [toasts, setToasts] = useState([]);

  const dismiss = useCallback((id) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const toast = useCallback(
    ({ title, message, variant = "default", duration = defaultDuration }) => {
      const id = ++toastId;
      setToasts((current) => [...current, { id, title, message, variant }]);

      if (duration > 0) {
        window.setTimeout(() => dismiss(id), duration);
      }

      return id;
    },
    [defaultDuration, dismiss]
  );

  const value = useMemo(
    () => ({
      toast,
      dismiss,
      success: (message, title) => toast({ title, message, variant: "success" }),
      error: (message, title) => toast({ title, message, variant: "error" }),
      warning: (message, title) => toast({ title, message, variant: "warning" }),
      info: (message, title) => toast({ title, message, variant: "info" }),
    }),
    [toast, dismiss]
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastViewport toasts={toasts} onDismiss={dismiss} />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within ToastProvider");
  }
  return context;
}
