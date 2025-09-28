import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { ResponsiveCalendar } from '@nivo/calendar';
import axiosClient from "@/apis/axios";
import { useMood } from "@/utils/MoodContext";
import { useStreakEffects } from "@/utils/useStreakEffects";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { AlertTriangle, Sparkles } from "lucide-react";

type EmotionEntry = {
    emotion: string;
    confidence: number;
}

type DailyMoodResponse = {
    date: string; 
    emotions: EmotionEntry[];
    scores: Record<string, number>;
    journalEntryId: string;
    primaryEmotion: string;
    valence: "POSITIVE" | "NEGATIVE" | "NEUTRAL";
}
export default function MoodGraph () {
    const [moodData, setMoodData] = useState<DailyMoodResponse[]>([]);
    const [stats, setStats] = useState<{currentStreak: number; longestStreak: number;}>({
        currentStreak: 0,
        longestStreak: 0,
    });

    const calculateStreaks = (data: DailyMoodResponse[]) => {
        let currentStreak = 0;
        let longestStreak = 0;
        let prevDate: Date | null = null;
        data.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
            .forEach((entry) => {
                if (entry.valence==="POSITIVE"){
                    if (prevDate && new Date(entry.date).getTime() === prevDate.getTime() + 24 * 60 * 60 * 1000){
                        currentStreak += 1;
                    }else{
                        currentStreak = 1;
                    } 
                    longestStreak = Math.max(longestStreak, currentStreak);
                    prevDate = new Date(entry.date);
                }else{
                    currentStreak = 0;
                    prevDate = null;
                }
            });
        return {currentStreak: currentStreak, longestStreak: longestStreak};
    }

    const fetchMoodData = async () => {
         await axiosClient.get(`journals/moods/daily`, {
                params: {
                    range: '1m',
                },
            }).then((response) => {
                const data: DailyMoodResponse[] = response.data;
                setMoodData(data);
                console.log("Fetched daily mood data");
                setStats(calculateStreaks(data));
            }).catch((error) => {
                console.error("Error fetching mood data:", error);
            });
    }

    useEffect(() => {
        fetchMoodData();
    }, []);

    //convert moodData to format suitable for charting library
    const heatMapData = moodData.map((m) => ({
        day: m.date,
        value: m.valence === "POSITIVE" ? 1 : m.valence === "NEGATIVE" ? -1 : 0,
    }));

    const {streak, theme} = useMood();


    const showWarning = streak?.type === 'negative' && (streak?.length ?? 0) >= 3;
    const showEncouragement = streak?.type === 'positive' && (streak?.length ?? 0) >= 3;
    
    //trigger animation for positive streaks
    useStreakEffects(streak)
    
    
  return (
    <>
        <div className="px-18 py-12">
        { showWarning && (
                <>
                    <motion.div
                    initial={{opacity:0, scale:0.95}}
                    animate={{opacity:1, scale:1}}
                    transition={{ duration: 0.4 }}
                    whileHover={{ x: [0, -2, 2, -2, -2, 0]}} 
                    >
                        <Alert variant={"destructive"} className="rounded-2xl shadow-md border-2 border-red-300 bg-red-50 flex items-start">
                            <AlertTriangle className="text-red-600 h-5 w-5 mt-0.5"/>
                            <div className="ml-3">
                                <AlertTitle className="text-red-700 font-bold text-lg mb-1 text-left"> We've noticed a tough streak. </AlertTitle>
                                <AlertDescription className="text-red-600 text-sm mt-1 inline-block whitespace-normal">
                                    You've had <b>{streak?.length}</b> days in a row with negative emotions. Remember, it's okay to have ups and downs. Consider reaching out to a trusted friend, family member, or mental health professional for support. 
                                    Visit our <a href="/help" className="underline font-medium">Get Help</a> page for resources and guidance.
                                </AlertDescription>
                            </div>
                        </Alert>
                    </motion.div>
                </>
            )}
            { showEncouragement && (
                <>
                    <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}>
                        <Alert variant={"default"} className="rounded-2xl shadow-md border-2 border-green-300 bg-green-50 flex items-start">
                            <Sparkles className="text-green-600 h-5 w-5 mt-0.5"/>
                            <div className="ml-3">
                                <AlertTitle className="text-green-700 font-bold text-lg mb-1 text-left"> Keep up the great work! </AlertTitle>
                                <AlertDescription className="text-green-600 text-sm mt-1 inline-block whitespace-normal">
                                    You've had <b>{streak?.length}</b> days in a row with positive emotions. Celebrate your progress and continue nurturing your well-being. Remember, every step forward counts!
                                </AlertDescription>
                            </div>
                        </Alert>
                    </motion.div>
                </>
            )}
         </div>
         <div className="grid gap-6 justify-items-start px-18">
            <h1 className={`text-4xl font-bold text-center mb-4 row-span-1 ${theme.heading}`}>Mood Calendar</h1>
            <p className="text-lg text-left mb-4 row-span-2"> Uncover patterns in your journey & visualize your daily emotional patterns over time using a heatmap. </p>
        </div>    
        <motion.div
        className="space-y-6 px-18 py-12"
        initial={{ opacity: 0}}
        animate={{ opacity: 1}}
        transition={{ duration: 0.6 }}>
            <Card className="bg-dotgrid shadow-md rounded-2xl">
                <CardHeader>
                    <CardTitle className={`text-lg font-bold ${theme.heading}`}>mood overview</CardTitle>
                </CardHeader>
                <CardContent style={{height: '400px'}}>
                    <ResponsiveCalendar
                        data = {heatMapData}
                        from={moodData[0]?.date ?? "2025-01-01"}
                        to={moodData[moodData.length - 1]?.date ?? "2025-01-31"}
                        emptyColor="#eeeeee"
                        colors={['#c20114', '#818479', '#41624e']}
                        minValue={-1}
                        maxValue={1}
                        margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
                        yearSpacing={40}
                        monthBorderColor="#ffffff"
                        dayBorderWidth={2}
                        dayBorderColor="#ffffff"
                        tooltip={({ day, value }) => (
                            <div
                                style={{
                                    padding: 8,
                                    color: '#000',
                                    background: 'white',
                                    border: '1px solid #ccc',
                                    minWidth: '100px',
                                }}>
                                <strong>{day}</strong>
                                <br />
                                mood: {value === '1' ? 'positive' : value === '-1' ? 'negative' : 'neutral'}
                            </div>
                        )}
                    />
                </CardContent>
            </Card>
            <motion.div
            className="grid grid-cols-2 gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            >
                <Card className="bg-dotgrid shadow-md rounded-2xl m-4 p-6">
                    <CardHeader>
                        <CardTitle className={`${theme.heading}`}>current positive streak</CardTitle>
                        <p className="text-2xl font-bold text-green-800">{stats.currentStreak} days</p>
                    </CardHeader>
                </Card>
                <Card className="bg-dotgrid shadow-md rounded-2xl m-4 p-6">
                    <CardHeader>
                        <CardTitle className={`${theme.heading}`}>longest positive streak</CardTitle>
                        <p className="text-2xl font-bold text-sky-600">{stats.longestStreak} days</p>
                    </CardHeader>
                </Card>
            </motion.div>
        </motion.div>
    </>
  );
}
