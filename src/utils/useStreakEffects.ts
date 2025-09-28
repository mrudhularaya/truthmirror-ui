import { useEffect } from "react";
import type { MoodStreak } from "./useStreakTheme";
import confetti from "canvas-confetti";


export function useStreakEffects(streak: MoodStreak | null) {
    const colors = ['#ffc759', '#1a3a3a', '#9ee493', '#d17b0f']
    useEffect(() => {
        if(!streak) return;
        console.log(`User is on a ${streak.length}-day ${streak.type} streak.`)
        if(streak.type === 'positive' && streak.length >= 3){
            confetti({
                particleCount: 200,
                angle: 20,
                spread: 55,
                origin: { x: 0 },
                colors: colors
              });
              confetti({
                particleCount: 200,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: colors
              });
        }        
    }, [streak]);
}