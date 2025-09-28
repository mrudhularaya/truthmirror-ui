import { useAuth0 } from "@auth0/auth0-react";
import JournalEntry from "./JournalEntry";
import { useMood } from "@/utils/MoodContext";

const LandingPage = () => {
    const {isAuthenticated} = useAuth0();
    const {theme} = useMood();

  return (
    <>
        <div className="grid gap-6 justify-items-start px-18 py-12">
            <h1 className={`text-5xl font-leckerli text-center mt-10 mb-4 ${theme.heading} row-span-1`}> Truth Mirror </h1>
            <p className="text-lg"> Reflect. Realise. Realign.</p>
            {isAuthenticated && 
                <p className="text-lg w-2/3 text-start"> Truth Mirror isn't just a journal - it's your emotional companion. With every entry, you'll see mood insights, track positive and negative streaks, and uncover patterns in your emotional well-being. 
                 When words feel heavy, Truth Mirror can suggest playlists to help you realign. Everything here is designed to help you notice patterns, celebrate growth, and navigate challenges with greater self-awareness. 
                </p>
            }
            {/* <p className="text-lg"> Gently guide yourself towards balance - one daily entry at a time. </p> */}
            {!isAuthenticated && (
                <>
                    <p className="text-lg w-2/3 text-start"> Discover more than just journaling - discover yourself. Truth Mirror helps you reflect on your throughts, understand your feelings and emotions through mood analysis, and track your growth with a mood calendar.
                        Positive streaks are celebrated and low phases are supported with guidance and music recommendations, every step is a chance to realign with who you want to be. 
                    </p>
                    <p className="text-lg w-2/3 text-start">Just sign in using your <b className={`${theme.heading}`}>Google account</b>  and begin your first journal entry. Your path to greater self-awareness and emotional well-being starts here.
                    </p>
                    <p className={`row-span-5 ${theme.heading} mt-10 text-3xl font-medium`}> login to get started.</p>
                </>
            )}
        </div>
        {!isAuthenticated && (
        <div className="justify-items-end mt-8">
            <img src="/Woman_writing_a_letter_with_her_maid_Johannes_Vermeer.jpg" alt="Woman_writing_a_letter_with_her_maid_Johannes_Vermeer" className="rounded-s-sm md:w-2/3"/>
        </div>
        )}
        {isAuthenticated && <JournalEntry />}
    </>
  );
};

export default LandingPage;
