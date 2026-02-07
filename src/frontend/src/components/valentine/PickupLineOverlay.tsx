import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Heart } from 'lucide-react';

interface PickupLineOverlayProps {
  line: string | null;
  open: boolean;
  onClose: () => void;
}

export default function PickupLineOverlay({ line, open, onClose }: PickupLineOverlayProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md border-rose-200 dark:border-rose-800 bg-gradient-to-br from-rose-50 to-pink-50 dark:from-rose-950 dark:to-pink-950">
        <DialogHeader>
          <div className="flex justify-center mb-4">
            <Heart className="w-12 h-12 text-rose-500 fill-current animate-pulse" />
          </div>
          <DialogTitle className="text-center text-rose-900 dark:text-rose-100 sr-only">
            Pickup Line
          </DialogTitle>
        </DialogHeader>
        <div className="text-center py-6">
          <p className="text-xl font-medium text-rose-800 dark:text-rose-200 leading-relaxed">
            {line}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
