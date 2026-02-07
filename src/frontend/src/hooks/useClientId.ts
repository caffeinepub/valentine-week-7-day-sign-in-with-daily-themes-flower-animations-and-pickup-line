import { useState, useEffect } from 'react';

const CLIENT_ID_KEY = 'valentine_client_id';

function generateClientId(): string {
  const array = new Uint8Array(16);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}

export function useClientId(): string {
  const [clientId] = useState<string>(() => {
    let stored = localStorage.getItem(CLIENT_ID_KEY);
    if (!stored) {
      stored = generateClientId();
      localStorage.setItem(CLIENT_ID_KEY, stored);
    }
    return stored;
  });

  return clientId;
}
