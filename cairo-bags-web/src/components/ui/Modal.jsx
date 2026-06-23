import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { cn } from "../../utils/cn.js";
import { Button } from "./Button.jsx";

export function Modal({
  open,
  onClose,
  title,
  description,
  children,
  footer,
  size = "md",
  closeOnOverlay = true,
  className,
}) {
  const panelRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose?.();
    };

    document.addEventListener("keydown", onKeyDown);
    panelRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  const sizes = {
    sm: "max-w-md",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
    full: "max-w-[calc(100vw-2rem)]",
  };

  return createPortal(
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4" role="presentation">
      <div
        className="absolute inset-0 bg-brand-primary/40 backdrop-blur-[2px] animate-fade-in"
        onClick={closeOnOverlay ? onClose : undefined}
        aria-hidden="true"
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? "modal-title" : undefined}
        aria-describedby={description ? "modal-description" : undefined}
        tabIndex={-1}
        className={cn(
          "relative z-[61] w-full rounded-xl border border-brand-border bg-brand-surface shadow-modal",
          "animate-slide-up outline-none",
          sizes[size],
          className
        )}
      >
        {(title || onClose) && (
          <div className="flex items-start justify-between gap-4 border-b border-brand-border px-6 py-5">
            <div>
              {title ? (
                <h2 id="modal-title" className="font-display text-xl font-medium text-brand-text">
                  {title}
                </h2>
              ) : null}
              {description ? (
                <p id="modal-description" className="mt-1 text-sm text-brand-muted">
                  {description}
                </p>
              ) : null}
            </div>
            {onClose ? (
              <button
                type="button"
                onClick={onClose}
                className="rounded-md p-1 text-brand-muted transition-colors hover:bg-brand-secondary hover:text-brand-text"
                aria-label="Close"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <path
                    d="M5 5l10 10M15 5L5 15"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            ) : null}
          </div>
        )}
        <div className="px-6 py-5">{children}</div>
        {footer ? (
          <div className="flex items-center justify-end gap-3 border-t border-brand-border px-6 py-4">
            {footer}
          </div>
        ) : null}
      </div>
    </div>,
    document.body
  );
}

export function ConfirmModal({
  open,
  onClose,
  onConfirm,
  title = "Confirm",
  message,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  loading = false,
  variant = "danger",
}) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title={title}
      description={message}
      size="sm"
      footer={
        <>
          <Button variant="ghost" onClick={onClose} disabled={loading}>
            {cancelLabel}
          </Button>
          <Button variant={variant} onClick={onConfirm} loading={loading}>
            {confirmLabel}
          </Button>
        </>
      }
    />
  );
}
