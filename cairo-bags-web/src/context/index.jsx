export { AuthProvider, useAuth } from "./AuthContext.jsx";
export { CartProvider, useCart } from "./CartContext.jsx";
export { NotificationProvider, useNotifications } from "./NotificationContext.jsx";
export { LocaleProvider, useLocale } from "./LocaleContext.jsx";

import { AuthProvider } from "./AuthContext.jsx";
import { CartProvider } from "./CartContext.jsx";
import { NotificationProvider } from "./NotificationContext.jsx";
import { LocaleProvider } from "./LocaleContext.jsx";
import { ToastProvider } from "../components/ui/Toast.jsx";

export function AppProviders({ children }) {
  return (
    <LocaleProvider>
      <AuthProvider>
        <ToastProvider>
          <CartProvider>
            <NotificationProvider>{children}</NotificationProvider>
          </CartProvider>
        </ToastProvider>
      </AuthProvider>
    </LocaleProvider>
  );
}
