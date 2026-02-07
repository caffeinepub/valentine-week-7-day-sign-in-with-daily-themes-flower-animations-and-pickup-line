import { useState } from 'react';
import { useAccessGate } from '../../hooks/useAccessGate';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Heart, Lock } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function AccessGateScreen() {
  const [code, setCode] = useState('');
  const { unlock, error } = useAccessGate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const success = unlock(code);
    if (!success) {
      setCode('');
    }
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-rose-50 via-pink-50 to-red-50 dark:from-rose-950 dark:via-pink-950 dark:to-red-950 px-4">
      <Card className="w-full max-w-md border-rose-200 dark:border-rose-800 bg-white/90 dark:bg-rose-900/30 backdrop-blur-sm shadow-2xl">
        <CardHeader className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="relative">
              <Heart className="w-20 h-20 text-rose-500 fill-current animate-pulse" />
              <Lock className="w-8 h-8 text-rose-700 dark:text-rose-300 absolute bottom-0 right-0" />
            </div>
          </div>
          <CardTitle className="text-3xl text-rose-900 dark:text-rose-100">
            Valentine Week
          </CardTitle>
          <CardDescription className="text-lg text-rose-700 dark:text-rose-300">
            Enter the secret code to unlock your Valentine experience
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="access-code" className="text-rose-900 dark:text-rose-100">
                Access Code
              </Label>
              <Input
                id="access-code"
                type="text"
                placeholder="Enter the secret code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                disabled={isSubmitting}
                autoFocus
                className="border-rose-300 dark:border-rose-700 focus:border-rose-500 focus:ring-rose-500"
              />
            </div>

            {error && (
              <Alert variant="destructive" className="border-red-300 dark:border-red-700">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Button
              type="submit"
              disabled={!code.trim() || isSubmitting}
              className="w-full bg-rose-600 hover:bg-rose-700 dark:bg-rose-700 dark:hover:bg-rose-800"
            >
              {isSubmitting ? 'Unlocking...' : 'Unlock'}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-rose-600 dark:text-rose-400">
            <p className="italic">Hint: It's a message of love 💕</p>
          </div>
        </CardContent>
      </Card>

      <footer className="mt-8 text-center text-sm text-rose-600 dark:text-rose-400">
        <p>
          © 2026. Built with <Heart className="inline w-4 h-4 fill-current" /> using{' '}
          <a
            href="https://caffeine.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-rose-700 dark:hover:text-rose-300"
          >
            caffeine.ai
          </a>
        </p>
      </footer>
    </div>
  );
}
