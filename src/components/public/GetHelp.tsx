import { useMood } from "@/utils/MoodContext";
import { AccordionTrigger } from "@radix-ui/react-accordion";
import { Accordion, AccordionContent, AccordionItem } from "../ui/accordion";
import { ChevronDown } from "lucide-react";

export default function GetHelp () {
    const {theme} = useMood();
  return (
    <>
            <div className="grid grid-cols-2 justify-items-start gap-6 px-18 py-40">
                <div className="row-span-2 flex items-start justify-start gap-4 flex-col">
                    <h1 className={`text-5xl mb-12 font-bold text-center ${theme.heading} row-span-1`}> Get Help. </h1>
                    <p className="text-lg"> You're not alone.</p>
                    <p className="text-lg text-start"> Sometimes journaling isn’t enough, and that’s okay. 
                        Reaching out for support is a sign of strength, not weakness. Whether you’re going through stress, anxiety, or just feeling stuck, talking to a trusted friend, family member, or professional can help lighten the weight you’re carrying.
                    </p>
                    <h2 className={`text-2xl font-semibold mt-10 mb-4 ${theme.heading}`}> Finding a Therapist </h2>
                    <ul className="px-8 list-disc list-inside text-lg text-left space-y-4">
                        <li> Look for licensed therapists or counselors in your area (search terms: “therapist near me”, “counseling services”, “mental health clinic”). </li>
                        <li> Many workplaces and universities offer Employee Assistance Programs (EAP) or student counseling centers. </li>
                        <li> You may want to look for a psychologist – someone with a PhD in psychology or a PsyD degree – if you need specialized help with certain diagnoses. </li>
                        <li> Consider teletherapy options if in-person visits are not feasible. Many platforms offer video or phone sessions. </li>
                        <li> Remember - Try at least three to five sessions and don't be afraid to try more than one therapist.</li>
                    </ul>
                </div>
                <div className="justify-items-end flex items-end justify-end flex-col gap-6">
                    <img className="row-span-2 max-w-2xl md:w-2/3" src="/davidmaratassassinated.jpg" alt="davidmaratassassinated"/>
                </div>
                <p className={`col-span-2 font-semibold ${theme.heading} mt-10 mb-4 text-3xl`}> Feeling stuck?</p>
                <p className="col-span-2 text-lg"> If you’re feeling hopeless or overwhelmed, please reach out for immediate help. Here are some crisis hotlines in different countries:</p>  
                <Accordion type="single" collapsible className="col-span-2 w-full">
                    <AccordionItem value="us" className="w-full">
                        <AccordionTrigger className="text-lg font-medium flex items-center py-4"> 
                            United States 
                            <ChevronDown className="h-5 w-5 shrink-0 transition-transform duration-200 ml-2"/>
                        </AccordionTrigger>
                        <AccordionContent className="pt-2 text-gray-700 text-base text-left">
                            Call or text <strong>988</strong> to reach the Suicide & Crisis Lifeline.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="india" className="w-full">
                        <AccordionTrigger className="text-lg font-medium flex items-center py-4"> 
                            India 
                            <ChevronDown className="h-5 w-5 shrink-0 transition-transform duration-200 ml-2"/>
                        </AccordionTrigger>
                        <AccordionContent className="pt-2 text-gray-700 text-base text-left">
                        Call <strong>9152987821</strong> (Vandrevala Foundation Helpline) or <strong>022 2754 6669</strong> (AASRA).
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="uk" className="w-full">
                        <AccordionTrigger className="text-lg font-medium flex items-center py-4"> 
                            United Kingdom 
                            <ChevronDown className="h-5 w-5 shrink-0 transition-transform duration-200 ml-2"/>
                        </AccordionTrigger>
                        <AccordionContent className="pt-2 text-gray-700 text-base text-left">
                         Call <strong>116 123</strong>(Samaritans).
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="ca" className="w-full">
                        <AccordionTrigger className="text-lg font-medium flex items-center py-4"> 
                            Canada 
                            <ChevronDown className="h-5 w-5 shrink-0 transition-transform duration-200 ml-2"/>
                        </AccordionTrigger>
                        <AccordionContent className="pt-2 text-gray-700 text-base text-left">
                            Call or text <strong>988</strong>. 
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="aus" className="w-full">
                        <AccordionTrigger className="text-lg font-medium flex items-center py-4"> 
                            Australia 
                            <ChevronDown className="h-5 w-5 shrink-0 transition-transform duration-200 ml-2"/>
                        </AccordionTrigger>
                        <AccordionContent className="pt-2 text-gray-700 text-base text-left">
                        Call <strong>13 11 14</strong> (Lifeline Australia). 
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="other" className="w-full">
                        <AccordionTrigger className="text-lg font-medium flex items-center py-4"> 
                            Other Countries 
                            <ChevronDown className="h-5 w-5 shrink-0 transition-transform duration-200 ml-2"/>                            
                        </AccordionTrigger>
                        <AccordionContent className="pt-2 text-gray-700 text-base text-left">
                        If your country is not listed, search <em>“suicide hotline [your country]”</em> or call your local emergency number.
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
                <footer className="text-center text-gray-600 text-sm col-span-2 mt-10">
                🌸 Remember:
                Seeking help is brave. Small steps — a conversation, a call, a message — can make a huge difference. Truth Mirror is here to support your reflections, but real healing often begins by sharing your journey with others.
                </footer>
        </div>
    </>
  );
}
