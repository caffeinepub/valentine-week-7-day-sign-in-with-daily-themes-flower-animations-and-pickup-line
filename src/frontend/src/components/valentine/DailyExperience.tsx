import { getValentineWeekStatus, isValentinesDay } from '../../lib/valentineDates';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Heart, Calendar } from 'lucide-react';
import FlowerField from './FlowerField';
import ClaimTodayButton from './ClaimTodayButton';
import ValentinesDayExperience from './ValentinesDayExperience';

export default function DailyExperience() {
  // Check if it's Valentine's Day (Feb 14)
  if (isValentinesDay()) {
    return <ValentinesDayExperience />;
  }

  const weekStatus = getValentineWeekStatus();

  if (!weekStatus.isActive) {
    if (weekStatus.daysUntilStart !== null && weekStatus.daysUntilStart > 0) {
      return (
        <Card className="border-rose-200 dark:border-rose-800 bg-white/80 dark:bg-rose-900/20 backdrop-blur-sm shadow-lg">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <Calendar className="w-16 h-16 text-rose-400" />
            </div>
            <CardTitle className="text-2xl text-rose-900 dark:text-rose-100">Valentine Week Coming Soon!</CardTitle>
            <CardDescription className="text-rose-700 dark:text-rose-300">
              {weekStatus.daysUntilStart === 1
                ? 'Valentine Week starts tomorrow!'
                : `Valentine Week starts in ${weekStatus.daysUntilStart} days`}
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-rose-600 dark:text-rose-400">
              Get ready for 7 days of love, romance, and sweet surprises!
            </p>
            <div className="flex justify-center gap-2 flex-wrap">
              {['🌹', '💍', '🍫', '🧸', '🤝', '🤗', '💋'].map((emoji, i) => (
                <span key={i} className="text-3xl">
                  {emoji}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>
      );
    }

    return (
      <Card className="border-rose-200 dark:border-rose-800 bg-white/80 dark:bg-rose-900/20 backdrop-blur-sm shadow-lg">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Heart className="w-16 h-16 text-rose-400 fill-current" />
          </div>
          <CardTitle className="text-2xl text-rose-900 dark:text-rose-100">Valentine Week Has Ended</CardTitle>
          <CardDescription className="text-rose-700 dark:text-rose-300">
            Thank you for celebrating with us!
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-rose-600 dark:text-rose-400">
            We hope you enjoyed all 7 days of love and romance. See you next year! 💕
          </p>
        </CardContent>
      </Card>
    );
  }

  const currentDay = weekStatus.currentDay!;

  return (
    <div className="relative">
      <Card className="border-rose-200 dark:border-rose-800 bg-white/80 dark:bg-rose-900/20 backdrop-blur-sm shadow-lg overflow-hidden">
        <CardHeader className="text-center relative z-10">
          <div className="flex justify-center mb-4">
            <div className="text-6xl">{currentDay.emoji}</div>
          </div>
          <CardTitle className="text-3xl text-rose-900 dark:text-rose-100">
            Day {currentDay.index}: {currentDay.name}
          </CardTitle>
          <CardDescription className="text-lg text-rose-700 dark:text-rose-300">
            {currentDay.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="relative min-h-[400px] flex flex-col items-center justify-center space-y-6 z-10">
          <div className="text-center space-y-4 max-w-2xl">
            <p className="text-rose-800 dark:text-rose-200">
              Click on the floating items to discover sweet pickup lines! 🌸
            </p>
            <ClaimTodayButton dayName={currentDay.name} />
          </div>
        </CardContent>

        <FlowerField dayName={currentDay.name} />
      </Card>
    </div>
  );
}
