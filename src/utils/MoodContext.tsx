import * as React from 'react';
import useStreakTheme, { type MoodStreak } from './useStreakTheme';
import { type MoodTheme } from './moodThemes';
import { createContext, useContext } from 'react';
import { useMoodTheme } from './useMoodTheme';

type MoodContextType = {
    streak: MoodStreak | null;
    theme: MoodTheme;
}

const MoodContext = createContext<MoodContextType | undefined>(undefined);

export const MoodProvider = ({children}: {children: React.ReactNode}) => {
    const streak = useStreakTheme();
    const theme = useMoodTheme(streak);
    return (
        <MoodContext.Provider value={{ streak, theme }}>
            {children}
        </MoodContext.Provider>
    );
}

export const useMood = () => {
    const context = useContext(MoodContext);
    if (!context) {
        throw new Error('useMood must be used within a MoodProvider');
    }
    return context;
 }
