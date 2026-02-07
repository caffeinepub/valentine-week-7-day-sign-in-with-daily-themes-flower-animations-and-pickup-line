import { useState } from 'react';
import { useSaveCallerUserProfile } from '../../hooks/useCurrentUserProfile';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Heart } from 'lucide-react';

interface ProfileSetupDialogProps {
  open: boolean;
}

export default function ProfileSetupDialog({ open }: ProfileSetupDialogProps) {
  const [name, setName] = useState('');
  const { mutate: saveProfile, isPending } = useSaveCallerUserProfile();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      saveProfile({ name: name.trim() });
    }
  };

  return (
    <Dialog open={open}>
      <DialogContent className="sm:max-w-md" onPointerDownOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <div className="flex justify-center mb-4">
            <Heart className="w-12 h-12 text-rose-500 fill-current" />
          </div>
          <DialogTitle className="text-center text-2xl">Welcome to Valentine Week!</DialogTitle>
          <DialogDescription className="text-center">
            Let's get to know you better. What should we call you?
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="name">Your Name</Label>
            <Input
              id="name"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={isPending}
              autoFocus
              className="border-rose-200 focus:border-rose-400 focus:ring-rose-400"
            />
          </div>
          <Button
            type="submit"
            disabled={!name.trim() || isPending}
            className="w-full bg-rose-600 hover:bg-rose-700 dark:bg-rose-700 dark:hover:bg-rose-800"
          >
            {isPending ? 'Saving...' : 'Continue'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
