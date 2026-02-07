import { useGetUserValentineData } from '../../hooks/useValentineClaims';
import { VALENTINE_DAYS } from '../../lib/valentineWeek';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Circle, Heart } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

export default function SevenDayProgress() {
  const { data: valentineData, isLoading } = useGetUserValentineData();

  if (isLoading) {
    return (
      <Card className="border-rose-200 dark:border-rose-800 bg-white/80 dark:bg-rose-900/20 backdrop-blur-sm shadow-lg">
        <CardHeader>
          <CardTitle className="text-rose-900 dark:text-rose-100 flex items-center gap-2">
            <Heart className="w-5 h-5 fill-current" />
            Your Valentine Week Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-rose-600 dark:text-rose-400">Loading your progress...</p>
        </CardContent>
      </Card>
    );
  }

  const claimedDays = new Set(valentineData?.entries?.map((entry) => entry.day) || []);
  const completedCount = claimedDays.size;
  const progressPercentage = (completedCount / 7) * 100;

  return (
    <Card className="border-rose-200 dark:border-rose-800 bg-white/80 dark:bg-rose-900/20 backdrop-blur-sm shadow-lg">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-rose-900 dark:text-rose-100 flex items-center gap-2">
            <Heart className="w-5 h-5 fill-current" />
            Your Valentine Week Progress
          </CardTitle>
          <Badge variant="secondary" className="bg-rose-100 dark:bg-rose-900 text-rose-900 dark:text-rose-100">
            {completedCount} / 7 Days
          </Badge>
        </div>
        <div className="mt-4">
          <Progress value={progressPercentage} className="h-2" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {VALENTINE_DAYS.map((day) => {
            const isClaimed = claimedDays.has(day.name);
            return (
              <div
                key={day.index}
                className={`p-4 rounded-lg border-2 transition-all ${
                  isClaimed
                    ? 'border-rose-400 dark:border-rose-600 bg-rose-50 dark:bg-rose-900/40'
                    : 'border-rose-200 dark:border-rose-800 bg-white/50 dark:bg-rose-900/10'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <span className="text-2xl">{day.emoji}</span>
                  {isClaimed ? (
                    <CheckCircle2 className="w-5 h-5 text-rose-600 dark:text-rose-400" />
                  ) : (
                    <Circle className="w-5 h-5 text-rose-300 dark:text-rose-700" />
                  )}
                </div>
                <h3 className="font-semibold text-rose-900 dark:text-rose-100 text-sm mb-1">
                  Day {day.index}: {day.name}
                </h3>
                <p className="text-xs text-rose-600 dark:text-rose-400">{day.description}</p>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
