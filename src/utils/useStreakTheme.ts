import axiosClient from "@/apis/axios";
import { useEffect, useState } from "react";

export type MoodStreak = {
    type: "positive" | "neutral" | "negative";
    length: number;
}

export default function useStreakTheme () {
  const [streak, setStreak] = useState<MoodStreak | null>(null);

  const fetchStreak = async () => {
    await axiosClient.get('/journals/moods/streak')
      .then(response => {
        const data = response.data;
        setStreak({type: data.moodType.toLowerCase(), length: data.length});
      })
      .catch(error => {
        console.error("Error fetching streak data:", error);
      });
  }

  useEffect(()=> {
    fetchStreak();
  }, []);

  return streak;
  
}

