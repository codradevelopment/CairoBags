export { AuthProvider, useAuth } from "./AuthContext.jsx";
export { CartProvider, useCart } from "./CartContext.jsx";
export { NotificationProvider, useNotifications } from "./NotificationContext.jsx";

import { AuthProvider } from "./AuthContext.jsx";
import { CartProvider } from "./CartContext.jsx";
import { NotificationProvider } from "./NotificationContext.jsx";
import { ToastProvider } from "../components/ui/Toast.jsx";

export function AppProviders({ children }) {
  return (
    <AuthProvider>
      <ToastProvider>
        <CartProvider>
          <NotificationProvider>{children}</NotificationProvider>
        </CartProvider>
      </ToastProvider>
    </AuthProvider>
  );
}
