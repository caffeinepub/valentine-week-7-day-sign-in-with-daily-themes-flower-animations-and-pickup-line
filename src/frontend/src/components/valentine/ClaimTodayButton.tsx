import { useClaimToday } from '../../hooks/useClaimToday';
import { useGetUserValentineData } from '../../hooks/useValentineClaims';
import { Button } from '@/components/ui/button';
import { Check, Loader2, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

interface ClaimTodayButtonProps {
  dayName: string;
}

export default function ClaimTodayButton({ dayName }: ClaimTodayButtonProps) {
  const { mutate: claimDay, isPending } = useClaimToday();
  const { data: valentineData } = useGetUserValentineData();

  const claimedDays = valentineData?.entries || [];
  const isAlreadyClaimed = claimedDays.some((entry) => entry.day === dayName);

  const handleClaim = () => {
    claimDay(dayName, {
      onSuccess: () => {
        toast.success(`${dayName} claimed!`, {
          description: 'Your progress has been saved. Come back tomorrow for the next day!',
        });
      },
      onError: (error: any) => {
        if (error.message?.includes('already claimed')) {
          toast.info('Already claimed!', {
            description: 'You have already checked in for today. Come back tomorrow!',
          });
        } else {
          toast.error('Failed to claim day', {
            description: error.message || 'Please try again.',
          });
        }
      },
    });
  };

  if (isAlreadyClaimed) {
    return (
      <Button disabled className="bg-rose-500 dark:bg-rose-700 text-white">
        <Check className="mr-2 h-5 w-5" />
        Day Claimed!
      </Button>
    );
  }

  return (
    <Button
      onClick={handleClaim}
      disabled={isPending}
      size="lg"
      className="bg-rose-600 hover:bg-rose-700 dark:bg-rose-700 dark:hover:bg-rose-800 text-white shadow-lg"
    >
      {isPending ? (
        <>
          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          Claiming...
        </>
      ) : (
        <>
          <Sparkles className="mr-2 h-5 w-5" />
          Claim Today's Day
        </>
      )}
    </Button>
  );
}
