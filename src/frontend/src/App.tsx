import { useActor } from './hooks/useActor';
import { useAccessGate } from './hooks/useAccessGate';
import AccessGateScreen from './components/auth/AccessGateScreen';
import ProfileSetupDialog from './components/auth/ProfileSetupDialog';
import { useGetCallerUserProfile } from './hooks/useCurrentUserProfile';
import DailyExperience from './components/valentine/DailyExperience';
import SevenDayProgress from './components/valentine/SevenDayProgress';
import { Heart, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function App() {
  const { isUnlocked, lock } = useAccessGate();
  const { actor, isFetching: actorFetching } = useActor();
  const { data: userProfile, isLoading: profileLoading, isFetched } = useGetCallerUserProfile();

  const showProfileSetup = isUnlocked && !profileLoading && isFetched && userProfile === null;

  // Show access gate if not unlocked
  if (!isUnlocked) {
    return <AccessGateScreen />;
  }

  // Show loading state while actor is initializing
  if (actorFetching) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-50 via-pink-50 to-red-50 dark:from-rose-950 dark:via-pink-950 dark:to-red-950">
        <div className="text-center space-y-4">
          <Heart className="w-12 h-12 mx-auto animate-pulse text-rose-500" />
          <p className="text-muted-foreground">Loading Valentine Week...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <ProfileSetupDialog open={showProfileSetup} />

      <div className="min-h-screen flex flex-col bg-gradient-to-br from-rose-50 via-pink-50 to-red-50 dark:from-rose-950 dark:via-pink-950 dark:to-red-950">
        <header className="w-full py-4 px-4 sm:px-6 lg:px-8 bg-white/50 dark:bg-rose-900/20 backdrop-blur-sm border-b border-rose-200 dark:border-rose-800">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Heart className="w-6 h-6 text-rose-600 dark:text-rose-400 fill-current" />
              <h1 className="text-xl font-bold text-rose-900 dark:text-rose-100">Valentine Week</h1>
            </div>
            <div className="flex items-center gap-4">
              {userProfile && (
                <span className="text-sm text-rose-700 dark:text-rose-300 hidden sm:inline">
                  Welcome, {userProfile.name}!
                </span>
              )}
              <Button
                onClick={lock}
                variant="outline"
                size="sm"
                className="border-rose-300 dark:border-rose-700 hover:bg-rose-100 dark:hover:bg-rose-900"
              >
                <Lock className="mr-2 h-4 w-4" />
                Lock
              </Button>
            </div>
          </div>
        </header>

        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-7xl mx-auto space-y-8">
            <SevenDayProgress />
            <DailyExperience />
          </div>
        </main>

        <footer className="w-full py-4 px-4 sm:px-6 lg:px-8 text-center text-sm text-rose-600 dark:text-rose-400 bg-white/30 dark:bg-rose-900/10 backdrop-blur-sm">
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
    </>
  );
}
