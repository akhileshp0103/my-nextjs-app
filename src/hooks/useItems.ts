"use client";

import { useState, useEffect, useCallback } from "react";

interface Item {
  id: string;
  title: string;
  status: string;
  createdAt: string;
}

interface UseItemsOptions {
  page?: number;
  limit?: number;
  search?: string;
}

export function useItems(options: UseItemsOptions = {}) {
  const { page = 1, limit = 20, search } = options;
  const [items, setItems] = useState<Item[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({
        page: String(page),
        limit: String(limit),
        ...(search ? { search } : {}),
      });
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/items?${params}`
      );
      if (!res.ok) throw new Error("Failed to fetch items");
      const data = await res.json();
      setItems(data.data);
      setTotal(data.pagination.total);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }, [page, limit, search]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  return { items, total, loading, error, refetch: fetchItems };
}
