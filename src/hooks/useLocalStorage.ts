import { useState } from "react";

/**
 * Hook personalizado para gerenciar localStorage com tipagem TypeScript
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T,
): [T, (value: T | ((prevValue: T) => T)) => void] {
  // Estado para armazenar o valor
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === "undefined") {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Erro ao ler localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Função para atualizar o valor
  const setValue = (value: T | ((prevValue: T) => T)) => {
    try {
      // Permitir que o valor seja uma função para ter acesso ao valor anterior
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;

      // Salvar no estado
      setStoredValue(valueToStore);

      // Salvar no localStorage
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error(`Erro ao salvar localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue];
}

/**
 * Hook para carregar valor do localStorage sem estado reativo
 */
export function loadFromLocalStorage<T>(key: string, defaultValue: T): T {
  if (typeof window === "undefined") {
    return defaultValue;
  }

  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Erro ao ler localStorage key "${key}":`, error);
    return defaultValue;
  }
}

/**
 * Função para salvar valor no localStorage
 */
export function saveToLocalStorage<T>(key: string, value: T): void {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Erro ao salvar localStorage key "${key}":`, error);
  }
}
