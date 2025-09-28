import axiosClient from "@/apis/axios";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useMood } from "@/utils/MoodContext";

export interface JournalEntry {
    journalEntryId: number;
    content: string;
    timeStamp: string;
    sentimentLabel: string | null;
}


export default function JournalHistory () {

    // Fetch user's journal entries
    const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([]);

    //Show full journal entry on click
    const [selectedEntry, setSelectedEntry] = useState<JournalEntry | null>(null);

    const getJournalEntries = async () => {
        await axiosClient.get('/journals/history')
        .then(response => {
            const limitedEntries = response.data.slice(0, 20); // Limit to 20 entries
            setJournalEntries(limitedEntries);
            console.log("Journal entries fetched successfully, limited to 20, total entries:", response.data.length);
        })
        .catch(error => {
            console.error("Error fetching today's journal entry:", error);
            toast.error("Failed to fetch today's journal entry. Please try again.");
        });
    };

    useEffect(() => {
        getJournalEntries();
    }, []);

    const {theme} = useMood();

  return (
    <>
        <div className="grid gap-6 justify-items-start px-18 py-12">
            <h1 className={`text-4xl font-bold text-center mt-10 mb-4 row-span-1 ${theme.heading}`}>Journal History</h1>
            <p className="text-lg mb-4 row-span-2">Look back at your thoughts, feelings, and mood shifts.</p>
        </div>
        <div className="justify-items-start mt-8">
            <img src="/Hans_Holbein_the_Younger_Portrait_of_Erasmus_of_Rotterdam_Writing_1523.jpg" alt="Hans_Holbein_the_Younger_Portrait_of_Erasmus_of_Rotterdam_Writing_1523" className="rounded-e-md w-full md:w-2/3"/>
            <h1 className={`text-3xl px-18 py-10 font-semibold text-center mt-10 mb-4 row-span-1 ${theme.heading}`}>your past reflections</h1>
        </div>
        <div className="space-y-4 px-18">
            {journalEntries.map((journalEntry: JournalEntry, index: number) => (
                <div key={index} className="p-4 border rounded-lg shadow-sm cursor-pointer bg-white flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:gap-3 ">
                        <p className="text-gray-500 text-sm">{new Date(journalEntry.timeStamp).toLocaleDateString()}</p>                    
                        <span className="inline-block px-3 py-1 rounded-full text-sm font-medium mb-2 sm:mb-0">{journalEntry.sentimentLabel?.toLowerCase()}</span>
                    </div>
                    <div className="mt-2 sm:mt-0 sm:flex-1"> 
                        <p className="text-gray-800 mt-2">{journalEntry.content.split(' ').slice(0, 15).join(' ')}...</p>
                    </div>
                    <Button variant="outline" className={`mt-3 sm:mt-0 px-4 py-2 ${theme.accent} ${theme.text} rounded-lg transition`} onClick={() => setSelectedEntry(journalEntry)}>
                        View Full Entry
                    </Button>
                </div>
            ))}
        {/* Sliding panel with animation*/}
        <AnimatePresence>
            {selectedEntry && (
                <>
                <motion.div className="fixed inset-0 bg-fuchsia-50/50 z-40 h-lvh" 
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} 
                    onClick={() => setSelectedEntry(null)} 
                    />
                <motion.div className={`fixed bg-white shadow-lg z-50 p-4 
                        ${window.innerWidth<768? 'bottom-0 left-0 right-0 rounded-t-2xl' /*Mobile full with bottom sheet*/ : 'top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-xl max-w-2xl w-full' /*Desktop right side panel*/}`}
                        initial={{y: window.innerWidth<768? '100%' : '-50%', opacity: 0}} 
                        animate={{ y: 0, opacity: 1 }} 
                        exit={{ y: window.innerWidth<768? '100%' : '-50%', opacity: 0 }} 
                        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                        drag={window.innerWidth<768? 'y' : false}
                        dragConstraints={{top:0, bottom:0}}
                        dragElastic={0.1}
                        onDragEnd={(event, info) => {
                            if (window.innerWidth<768 && info.offset.x > 100) {
                                setSelectedEntry(null); // Swipe right to close
                            }
                        }}
                        >
                        <div className="flex justify-between items-center mb-3 bg-dotgrid">
                            <motion.div className="text-sm font-semibold px-2 py-1 rounded"
                                initial={{x: -50, opacity: 0}}
                                animate={{x: 0, opacity: 1}}
                                >
                                    {selectedEntry.sentimentLabel}
                            </motion.div>
                            <h3 className={`text-xl font-semibold ${theme.heading}`}>your entry</h3>   
                            <Button variant="secondary" size={"icon"} onClick={() => setSelectedEntry(null)} className="p-1 rounded-full hover:bg-gray-200">
                                <X/>
                            </Button>    
                        </div> 
                        <p className="text-gray-800 leading-snug whitespace-pre-wrap bg-dotgrid"> {selectedEntry.content}</p>
                        <span className="text-gray-500 text-xs block mt-3 bg-dotgrid">{new Date(selectedEntry.timeStamp).toLocaleDateString()}</span>
                    </motion.div>        
                </>
            )}
        </AnimatePresence>   
        </div>   
    </>
  );
}
