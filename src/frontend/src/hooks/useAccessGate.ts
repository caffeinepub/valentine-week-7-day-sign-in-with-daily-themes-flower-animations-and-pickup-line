import { useState, useEffect } from 'react';

const ACCESS_CODE = 'I love uhh deha';
const STORAGE_KEY = 'valentine_access_unlocked';
const CODE_STORAGE_KEY = 'valentine_access_code';

interface AccessGateState {
  isUnlocked: boolean;
  error: string | null;
  unlock: (code: string) => boolean;
  lock: () => void;
  getStoredCode: () => string | null;
}

export function useAccessGate(): AccessGateState {
  const [isUnlocked, setIsUnlocked] = useState<boolean>(() => {
    return localStorage.getItem(STORAGE_KEY) === 'true';
  });
  const [error, setError] = useState<string | null>(null);

  const unlock = (code: string): boolean => {
    const trimmedCode = code.trim();
    if (trimmedCode === ACCESS_CODE) {
      localStorage.setItem(STORAGE_KEY, 'true');
      localStorage.setItem(CODE_STORAGE_KEY, trimmedCode);
      setIsUnlocked(true);
      setError(null);
      return true;
    } else {
      setError('Incorrect code. Please try again.');
      return false;
    }
  };

  const lock = () => {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(CODE_STORAGE_KEY);
    setIsUnlocked(false);
    setError(null);
  };

  const getStoredCode = (): string | null => {
    return localStorage.getItem(CODE_STORAGE_KEY);
  };

  return {
    isUnlocked,
    error,
    unlock,
    lock,
    getStoredCode,
  };
}
