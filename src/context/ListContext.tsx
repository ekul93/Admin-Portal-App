import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// ── Types ────────────────────────────────────────────────────────────────────
export type ListItem = {
  id:          string;
  title:       string;
  description: string;
  createdAt:   string;
};

type ListContextType = {
  items:        ListItem[];
  loading:      boolean;
  createItem:   (title: string, description: string) => Promise<void>;
  updateItem:   (id: string, title: string, description: string) => Promise<void>;
  deleteItem:   (id: string) => Promise<void>;
};

const LIST_KEY = '@list_items';

const ListContext = createContext<ListContextType>({
  items:        [],
  loading:      true,
  createItem:   async () => {},
  updateItem:   async () => {},
  deleteItem:   async () => {},
});

// ── Provider ─────────────────────────────────────────────────────────────────
export const ListProvider = ({ children }: { children: React.ReactNode }) => {
  const [items,   setItems]   = useState<ListItem[]>([]);
  const [loading, setLoading] = useState(true);

  // ── Load persisted items on mount ────────────────────────────────────────
  useEffect(() => {
    const loadItems = async () => {
      try {
        const stored = await AsyncStorage.getItem(LIST_KEY);
        if (stored) setItems(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to load list:', e);
      } finally {
        setLoading(false);
      }
    };
    loadItems();
  }, []);

  // ── Persist helper ───────────────────────────────────────────────────────
  const persist = async (updated: ListItem[]) => {
    try {
      await AsyncStorage.setItem(LIST_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to persist list:', e);
    }
  };

  // ── Create ───────────────────────────────────────────────────────────────
  const createItem = useCallback(async (title: string, description: string) => {
    const newItem: ListItem = {
      id:          Date.now().toString(),
      title:       title.trim(),
      description: description.trim(),
      createdAt:   new Date().toISOString(),
    };
    const updated = [newItem, ...items];
    setItems(updated);
    await persist(updated);
  }, [items]);

  // ── Update ───────────────────────────────────────────────────────────────
  const updateItem = useCallback(async (id: string, title: string, description: string) => {
    const updated = items.map(item =>
      item.id === id
        ? { ...item, title: title.trim(), description: description.trim() }
        : item
    );
    setItems(updated);
    await persist(updated);
  }, [items]);

  // ── Delete ───────────────────────────────────────────────────────────────
  const deleteItem = useCallback(async (id: string) => {
    const updated = items.filter(item => item.id !== id);
    setItems(updated);
    await persist(updated);
  }, [items]);

  return (
    <ListContext.Provider value={{ items, loading, createItem, updateItem, deleteItem }}>
      {children}
    </ListContext.Provider>
  );
};

export const useList = () => useContext(ListContext);