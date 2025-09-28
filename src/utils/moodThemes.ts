export type MoodTheme = {
    background: string;
    text: string;
    accent: string;
    heading: string;
    borderLight: string;
    borderHover: string;
};

export const moodThemes: Record<string, MoodTheme> = {
    positive: {
        background: "bg-pink-200",
        text: "text-white",
        accent: "bg-lavender",
        heading: "text-dark-lavender",
        borderLight: "border-lavender",
        borderHover: "hover:border-dark-lavender",
    },
    neutral: {
        background: "bg-hunter-green",
        text: "text-honey-dew",
        accent: "bg-cambridge-blue-green",
        heading: "text-chocolate-cosmos",
        borderLight: "border-cambridge-blue-green",
        borderHover: "hover:border-chocolate-cosmos",
    },
    negative: {
        background: "bg-cerulean",
        text: "text-honey-dew",
        accent: "bg-payne-blue",
        heading: "text-prussian-blue",
        borderLight: "border-payne-blue",
        borderHover: "hover:border-prussian-blue",
    }
};