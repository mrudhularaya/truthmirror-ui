import { useEffect, useState } from "react";
import { moodThemes, type MoodTheme } from "./moodThemes";
import type { MoodStreak } from "./useStreakTheme";

export function useMoodTheme(mood?: MoodStreak | null) {
    const [theme, setTheme] = useState<MoodTheme>(moodThemes.positive);
    useEffect(() => {
        if(!mood || mood.length <6) return;
        setTheme(moodThemes[mood.type]?? moodThemes.positive);
    }, [mood]);

    return theme;
}