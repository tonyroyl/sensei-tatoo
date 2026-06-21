import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
  type ReactNode,
} from "react";
import { getProduct, type Product } from "./products";
import { useToast } from "./toast";

export type CartLine = {
  productId: string;
  size: string;
  qty: number;
};

type CartState = { lines: CartLine[] };

type CartAction =
  | { type: "add"; productId: string; size: string; qty: number }
  | { type: "setQty"; productId: string; size: string; qty: number }
  | { type: "remove"; productId: string; size: string }
  | { type: "clear" };

// Session memory ONLY — explicitly NOT localStorage. sessionStorage is cleared
// when the tab closes, which matches "état du panier en mémoire de session".
const STORAGE_KEY = "icare:cart";

function lineKey(productId: string, size: string) {
  return `${productId}::${size}`;
}

function loadInitial(): CartState {
  if (typeof window === "undefined") return { lines: [] };
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return { lines: [] };
    const parsed = JSON.parse(raw) as CartState;
    if (!parsed || !Array.isArray(parsed.lines)) return { lines: [] };
    // Drop any lines whose product no longer exists.
    return { lines: parsed.lines.filter((l) => getProduct(l.productId)) };
  } catch {
    return { lines: [] };
  }
}

function reducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "add": {
      const key = lineKey(action.productId, action.size);
      const existing = state.lines.find(
        (l) => lineKey(l.productId, l.size) === key,
      );
      if (existing) {
        return {
          lines: state.lines.map((l) =>
            lineKey(l.productId, l.size) === key
              ? { ...l, qty: Math.min(l.qty + action.qty, 99) }
              : l,
          ),
        };
      }
      return {
        lines: [
          ...state.lines,
          { productId: action.productId, size: action.size, qty: action.qty },
        ],
      };
    }
    case "setQty": {
      const key = lineKey(action.productId, action.size);
      if (action.qty <= 0) {
        return {
          lines: state.lines.filter((l) => lineKey(l.productId, l.size) !== key),
        };
      }
      return {
        lines: state.lines.map((l) =>
          lineKey(l.productId, l.size) === key
            ? { ...l, qty: Math.min(action.qty, 99) }
            : l,
        ),
      };
    }
    case "remove":
      return {
        lines: state.lines.filter(
          (l) =>
            lineKey(l.productId, l.size) !==
            lineKey(action.productId, action.size),
        ),
      };
    case "clear":
      return { lines: [] };
    default:
      return state;
  }
}

export type ResolvedLine = CartLine & { product: Product; subtotal: number };

type CartContextValue = {
  lines: CartLine[];
  resolvedLines: ResolvedLine[];
  count: number;
  total: number;
  isOpen: boolean;
  open: () => void;
  close: () => void;
  add: (productId: string, size: string, qty?: number) => void;
  setQty: (productId: string, size: string, qty: number) => void;
  remove: (productId: string, size: string) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, loadInitial);
  const [isOpen, setIsOpen] = useState(false);
  const { notify } = useToast();

  // Persist to session storage on every change.
  useEffect(() => {
    try {
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* storage may be unavailable (private mode) — cart still works in memory */
    }
  }, [state]);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  const add = useCallback(
    (productId: string, size: string, qty = 1) => {
      dispatch({ type: "add", productId, size, qty });
      const product = getProduct(productId);
      if (product) notify("Ajouté à la besace", `${product.name} · ${size}`);
      setIsOpen(true);
    },
    [notify],
  );

  const setQty = useCallback(
    (productId: string, size: string, qty: number) =>
      dispatch({ type: "setQty", productId, size, qty }),
    [],
  );

  const remove = useCallback(
    (productId: string, size: string) => {
      dispatch({ type: "remove", productId, size });
      notify("Retiré de la besace");
    },
    [notify],
  );

  const clear = useCallback(() => dispatch({ type: "clear" }), []);

  const resolvedLines = useMemo<ResolvedLine[]>(() => {
    return state.lines
      .map((l) => {
        const product = getProduct(l.productId);
        if (!product) return null;
        return { ...l, product, subtotal: product.price * l.qty };
      })
      .filter((l): l is ResolvedLine => l !== null);
  }, [state.lines]);

  const count = useMemo(
    () => state.lines.reduce((n, l) => n + l.qty, 0),
    [state.lines],
  );
  const total = useMemo(
    () => resolvedLines.reduce((sum, l) => sum + l.subtotal, 0),
    [resolvedLines],
  );

  const value = useMemo<CartContextValue>(
    () => ({
      lines: state.lines,
      resolvedLines,
      count,
      total,
      isOpen,
      open,
      close,
      add,
      setQty,
      remove,
      clear,
    }),
    [state.lines, resolvedLines, count, total, isOpen, open, close, add, setQty, remove, clear],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
