import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import axiosClient from "@/apis/axios";
import { toast } from "react-toastify";
import { Textarea } from "../ui/textarea";
import { useMood } from "@/utils/MoodContext";
import { motion } from "framer-motion";
import SpotifyRecommendations from "./SpotifyRecommendations";
import { useVoiceRecorder } from "@/utils/useVoiceRecorder";
import { AlertTriangle, Mic, MicOff } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

export default interface JournalEntryResponse {
    id: string;
    content: string;
    sentimentLabel: string | null;
}

type MoodLog = {
    date: string;
    mood: string;
    confidence: number;
    scores: Record<string, number>;
}

export default function JournalEntry () {

    const {user} = useAuth0();

    const [inputMode, setInputMode] = useState<'text' | 'voice'>('text');

    //Backup Mood state
    const [mood, setMood] = useState<string | null>(null);

    //Main mood log state
    const [moodLog, setMoodLog] = useState<MoodLog | null>(null);

    const [textEntry, setTextEntry] = useState('');

    //Voice Recorder state
    const {isRecording, transcript, error, isUploading, startRecording, stopRecording} = useVoiceRecorder();

    //Set voice transcript to voice entry when available
    useEffect(() => {
        if (transcript) {
            setTextEntry(transcript);
        }
    }, [transcript]);


    const getTodayMoodLog = async () => {
        await axiosClient.get('/journals/mood/today')
        .then(response => {
            setMoodLog(
                response.data ? {
                    date: response.data.timestamp,
                    mood: response.data.emotion[0].emotion,
                    confidence: response.data.emotion[0].confidence,
                    scores: response.data.scores
                } : null
            )
        })
        .catch(error => {
            console.error("Error fetching today's mood log:", error);
        });
    }

    const getTodayJournalEntry = async () => {
        await axiosClient.get('/journals/today')
        .then(response => {
            setTextEntry(response.data.content || '');
            setMood(response.data.sentimentLabel || null);
        })
        .catch(error => {
            console.error("Error fetching today's journal entry:", error);
            toast.error("Failed to fetch today's journal entry. Please try again.");
        });
    };

    useEffect(() => {
        getTodayJournalEntry();
        getTodayMoodLog();
    }, []);

    const postAnalyzeMood = async (journalEntryId: number| null) => {
        if (!journalEntryId) {
            toast.error("Brevity is the soul of wit, but we need something to analyze!");
            return;
        }
        await axiosClient.post('/journals/analyze', {
            journalEntryId: journalEntryId,
        })
        .then(response => {
            setMood(response.data.emotions);
            setMoodLog({
                date: response.data.timestamp,
                mood: response.data.emotions[0].emotion,
                confidence: response.data.emotions[0].confidence,
                scores: response.data.scores
            });
            toast.success("Mood analyzed successfully!");
        })
        .catch(error => {
            console.error("Error analyzing mood:", error);
            toast.error("Failed to analyze mood. Please try again.");
        });
    }

    const postJournalEntry = async(entry: string) => {
        await axiosClient.post('/journals', {
            content: entry,
        })
        .then(response => {
            toast.success("Journal entry saved successfully!");
            console.log("Analyzing mood for journal entry ID:", response.data.journalEntryId);
            postAnalyzeMood(response.data.journalEntryId) 
        })
        .catch(error => {
            console.error("Error saving journal entry:", error);
            toast.error("Failed to save journal entry. Please try again.");
        });
    };


    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setTextEntry(e.target.value);
    };

    //Flag dangerous words in transcript
    const dangerousWords = ["suicide", "kill myself", "end my life", "die", "self-harm", "hurt myself", "worthless", "depressed", "depression", "addiction", "alcoholism", "drug abuse", "bullying", "harassment", "violence", "can't go on", "empty inside", "no way out"];


    const handleSaveEntry = () => {
        
        if (textEntry.trim() === '') {
            toast.error("Brevity is the soul of wit, but we need something to save!");
            return;
        }
        else if (textEntry.length <=20 && textEntry.length >= 2000) {
            toast.error("Journal entry cannot be less than 20 characters or exceed 2000 characters.");
            return;
        }
        else{
            if (dangerousWords.some(dangerousWord => textEntry.toLowerCase().includes(dangerousWord))) {
                toast.error("We have noticed some difficult words in your entry. If you're going through a tough time, please reach out for help.");
            }
            postJournalEntry(textEntry)
            console.log("Journal Entry Saved");
        }
    };


    const handleInputModeChange = () => {
        setInputMode((prevMode) =>
            prevMode === 'text' ? 'voice' : 'text'
        );
    };
    const {streak, theme} = useMood();

    const streakMessage = () => {
        if(streak?.type == "positive" && streak.length >=3){
            return `This continues your ${streak.length}-day positive streak. 🎉 Keep it going!`;
        }
        else if(streak?.type == "negative" && streak.length >=3){
            return `This continues your ${streak.length}-day negative streak. 🩵 It's okay to have tough days.`;
        }
        else {
            return `A balanced day is a good day - reflect on what kept you steady.`;
        }
    }

    const renderEncouragement = () => {
        if(streak?.type == "positive" && streak.length >=3){
            return `✨ Celebrate your wins by reflecting on what you're grateful for.`
        }
        else if (streak?.type == "negative" && streak.length >=3){
            return `🍃 Consider a small act of self-care today, like taking a short walk or listening to your favorite music.`
        }
        else {
            return `📖 Take a moment to reflect on what matters most to you today.`
        }
    }
    
  return (
    <>
        <div className="grid px-18 py-10">
            {/* Greet user & Voice note button*/}
            <div className="grid-rows-1 flex items-center justify-start gap-40">
                <h2 className={`text-4xl font-semibold ${theme.heading}`}> hello, {user?.name?.toLowerCase()} 👋 </h2>
                <Button variant="outline" className={`${theme.accent} ${theme.text}`} onClick={handleInputModeChange}>
                Switch to {inputMode === 'text' ? 'voice note' : 'keyboard'}
                </Button>
            </div>
            <div className="mt-10 p-6 rounded-xl space-y-6">
            {/* Input text area*/}
            {inputMode === 'text' ? (
                <Textarea
                className="grid-rows-2 w-full h-64 p-4 resize-none rounded-xl text-sm leading-relaxed focus:outline-none overflow-y-auto bg-dotgrid"
                placeholder="Write your journal entry here..."
                onChange={handleTextChange}
                value={textEntry}
                />
            ) : (
                // <div className="grid-rows-2 text-center text-muted-foreground border rounded-xl p-10">
                //     <p>Voice input mode is not implemented yet.</p>
                // </div>
                // <VoiceNote/>
                <>                    
                    {error && (
                        <Alert variant={"destructive"} className="rounded-2xl shadow-md border-2 border-red-300 bg-red-50 flex items-start">
                            <AlertTriangle className="text-red-600 h-5 w-5"/>
                            <AlertTitle className="text-red-700 font-bold text-sm text-left"> Error </AlertTitle>
                            <AlertDescription className="text-red-600 text-sm">{error}</AlertDescription>
                        </Alert>
                    )}
                    <Button onClick={isRecording ? stopRecording : startRecording} className={`${theme.accent} ${theme.text} mt-4`} >
                    {isRecording? <MicOff /> :  <Mic /> }
                    {isRecording ? "Stop Recording" : 'Start Recording'}
                    </Button>
                    {isUploading && (
                        <div className="flex items-center justify-center space-x-2 mt-2 animate-pulse">
                            <AlertTriangle className="text-yellow-600 h-5 w-5"/>
                            <span className="text-yellow-700 text-sm">Uploading and processing your voice note...</span>
                        </div>
                    )}
                    {/* Show transcript in editable textarea */}
                    {transcript && (
                    <div className="mt-4">
                        <h3 className={`font-semibold mb-4 ${theme.heading}`}>Transcription</h3>
                        <Textarea
                        value={textEntry}
                        onChange={handleTextChange}
                        className="grid-rows-2 w-full h-64 p-4 text-muted-foreground resize-none rounded-xl text-sm leading-relaxed focus:outline-none overflow-y-auto bg-dotgrid"
                        />
                        <div className="text-sm text-gray-500 mt-2">Transcription can be edited before saving. Voice data will not be saved - if you wish to restart recording, existing entry will be overridden.</div>
                    </div>
                    )}
                </>)}
                <div className="flex justify-end">
                    <Button className={`${theme.accent} ${theme.text}`} variant="outline" onClick={handleSaveEntry}> Save Entry </Button>
                </div>
            </div>
        </div>
        {/*show today's mood*/}
        {mood && !moodLog && (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeIn" }}>
                <div className="mt-4 px-18 py-10 flex flex-col justify-start items-start gap-4">
                    <h3 className={`text-3xl font-semibold ${theme.heading}`}>today's mood 📅</h3>
                    <p className={`text-4xl font-leckerli ${theme.heading} mt-4 px-16`}>{mood}</p>
                </div>
                <SpotifyRecommendations mood={mood}/>
            </motion.div>)}
        {moodLog && (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeIn" }}>
                <div className="mt-4 px-18 py-10 flex flex-col justify-start items-start gap-4">
                    <h3 className={`text-3xl font-semibold ${theme.heading}`}>today's mood 📅</h3>
                    <p className={`text-lg mt-8 px-4`}>Your primary mood today is <span className={`font-semibold ${theme.heading}`}>{moodLog.mood}</span>. </p>
                    <p className={`text-lg mt-2 px-4`}>
                    Our confidence in this analysis is {Math.round(moodLog.confidence * 100)}%. 
                    Other emotions detected include: <b> {Object.entries(moodLog.scores).filter((emotion) => emotion[0] !== moodLog.mood ).map((emotion) => emotion[0]).slice(0,2).join(", and ")}</b>.
                    </p>
                    {streak && (
                        <>
                            <p className={`text-lg mt-2 px-4`}> {streakMessage()} {renderEncouragement()}</p>
                        </>
                    )}
                </div>
                <SpotifyRecommendations mood={moodLog.mood}/>
            </motion.div>   
        )}    
    </>
  );
}
