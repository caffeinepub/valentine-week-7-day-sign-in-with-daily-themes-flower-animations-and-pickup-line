import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';
import './valentinesDayExperience.css';

export default function ValentinesDayExperience() {
  const [answered, setAnswered] = useState(false);

  const handleAnswer = () => {
    setAnswered(true);
  };

  if (answered) {
    return (
      <div className="valentine-celebration">
        <div className="celebration-content">
          <h1 className="celebration-text">I love uhh deha</h1>
          <div className="hearts-container">
            {Array.from({ length: 30 }, (_, i) => (
              <Heart
                key={i}
                className="floating-heart"
                style={{
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${3 + Math.random() * 2}s`,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <Card className="border-rose-200 dark:border-rose-800 bg-white/90 dark:bg-rose-900/30 backdrop-blur-sm shadow-2xl">
      <CardHeader className="text-center space-y-6 pt-12">
        <div className="flex justify-center">
          <Heart className="w-24 h-24 text-rose-500 fill-current animate-pulse" />
        </div>
        <CardTitle className="text-4xl sm:text-5xl text-rose-900 dark:text-rose-100 font-bold">
          Will you be my valentine?
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center space-y-6 pb-12">
        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
          <Button
            onClick={handleAnswer}
            className="flex-1 h-16 text-xl bg-rose-600 hover:bg-rose-700 dark:bg-rose-700 dark:hover:bg-rose-800"
          >
            1. Yes
          </Button>
          <Button
            onClick={handleAnswer}
            className="flex-1 h-16 text-xl bg-rose-600 hover:bg-rose-700 dark:bg-rose-700 dark:hover:bg-rose-800"
          >
            2. Ofcourse
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
