import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import * as cartService from "../services/cartService.js";
import { getGuestSessionId } from "../utils/sessionId.js";
import { normalizeError } from "../utils/normalizeError.js";
import { useAuth } from "./AuthContext.jsx";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const { isAuthenticated } = useAuth();
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const sessionId = useMemo(() => getGuestSessionId(), []);

  const refreshCart = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await cartService.getCart(isAuthenticated ? undefined : sessionId);
      setCart(data);
      return data;
    } catch (err) {
      const normalized = normalizeError(err);
      setError(normalized);
      throw normalized;
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated, sessionId]);

  useEffect(() => {
    refreshCart().catch(() => {});
  }, [refreshCart, isAuthenticated]);

  const addItem = useCallback(
    async (payload) => {
      setLoading(true);
      setError(null);
      try {
        const data = await cartService.addCartItem(
          payload,
          isAuthenticated ? undefined : sessionId
        );
        setCart(data);
        return data;
      } catch (err) {
        const normalized = normalizeError(err);
        setError(normalized);
        throw normalized;
      } finally {
        setLoading(false);
      }
    },
    [isAuthenticated, sessionId]
  );

  const updateItem = useCallback(
    async (variantId, payload) => {
      setLoading(true);
      setError(null);
      try {
        const data = await cartService.updateCartItem(
          variantId,
          payload,
          isAuthenticated ? undefined : sessionId
        );
        setCart(data);
        return data;
      } catch (err) {
        const normalized = normalizeError(err);
        setError(normalized);
        throw normalized;
      } finally {
        setLoading(false);
      }
    },
    [isAuthenticated, sessionId]
  );

  const removeItem = useCallback(
    async (variantId) => {
      setLoading(true);
      setError(null);
      try {
        const data = await cartService.removeCartItem(
          variantId,
          isAuthenticated ? undefined : sessionId
        );
        setCart(data);
        return data;
      } catch (err) {
        const normalized = normalizeError(err);
        setError(normalized);
        throw normalized;
      } finally {
        setLoading(false);
      }
    },
    [isAuthenticated, sessionId]
  );

  const clearCart = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await cartService.clearCart(isAuthenticated ? undefined : sessionId);
      setCart(data);
      return data;
    } catch (err) {
      const normalized = normalizeError(err);
      setError(normalized);
      throw normalized;
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated, sessionId]);

  const mergeAfterLogin = useCallback(async () => {
    const data = await cartService.mergeCart(sessionId);
    setCart(data);
    return data;
  }, [sessionId]);

  const value = useMemo(
    () => ({
      cart,
      loading,
      error,
      itemsCount: cart?.itemsCount ?? 0,
      subTotal: cart?.subTotal ?? 0,
      sessionId,
      drawerOpen,
      openDrawer: () => setDrawerOpen(true),
      closeDrawer: () => setDrawerOpen(false),
      toggleDrawer: () => setDrawerOpen((v) => !v),
      refreshCart,
      addItem,
      updateItem,
      removeItem,
      clearCart,
      mergeAfterLogin,
    }),
    [
      cart,
      loading,
      error,
      sessionId,
      drawerOpen,
      refreshCart,
      addItem,
      updateItem,
      removeItem,
      clearCart,
      mergeAfterLogin,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
}
