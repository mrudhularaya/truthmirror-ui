import { useMood } from "@/utils/MoodContext";
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Music4 } from "lucide-react";
import { Button } from "../ui/button";
import axiosClient from "@/apis/axios";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel";
import { motion } from "framer-motion";

export interface SpotifyPlaylist {
    id: string;
    name: string;
    url: string;
    imageUrl: string | null;
    owner: string;

}

export interface PlaylistResponse {
    mood: "positive" | "negative" | "neutral";
    playlists: SpotifyPlaylist[];
    fromCache: boolean;
}

export interface ISpotifyRecommendationsProps {
    mood: string;
}

export default function SpotifyRecommendations (props: ISpotifyRecommendationsProps) {
    const [data, setData] = useState<PlaylistResponse | null>(null);
    const [loading, setLoading] = useState(false);

    const fetchPlaylists = async (mood: string) => {
        setLoading(true);
        await axiosClient.get(`/journals/playlists?mood=${mood}`)
        .then(response => {
            console.log("Fetched Spotify playlists");
            setData(response.data);
        })
        .catch(error => {
            console.error("Error fetching Spotify playlists:", error);
        })
        .finally(() => {
            setLoading(false);
        });
    };

    useEffect(() => {
        if (!props.mood) return;
        //classify mood into positive, negative, neutral
        const positive = ["joy", "love", "surprise", "excitement", "optimism"]
        const negative = ["anger", "sadness", "fear", "disgust", "pessimism"]
        let valence = "neutral";
        if (positive.includes(props.mood.toLowerCase())) {
            valence = "positive";
        } else if (negative.includes(props.mood.toLowerCase())) {
            valence = "negative";
        }
        fetchPlaylists(valence);
    }, [props.mood]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen space-x-2">
              <Music4 className="animate-spin"/>
              <span className="animate-pulse">Loading playlists...</span>
            </div>
        );
    }

    const {theme} = useMood();

  return (
    <>
     {data && (
        <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="mt-4 px-18 py-10 flex flex-col justify-start items-start gap-4">
        <h3 className={`text-3xl font-semibold ${theme.heading}`}>recommended playlists 🎵</h3>
        <Carousel className="max-w-3xl w-full mx-auto">
            <CarouselContent className="-ml-4">
            {data.playlists.map((playlist) => (
                <CarouselItem key={playlist.id} className="basis-sm">
                <Card key={playlist.id}  className={`w-full ${theme.borderLight} ${theme.borderHover}`}>
                    <CardHeader>
                    <CardTitle className={`${theme.heading}`}>{playlist.name}</CardTitle>
                    <CardDescription>by {playlist.owner}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center">
                    {playlist.imageUrl ? (
                        <img src={playlist.imageUrl} alt={playlist.name} className="max-w-1/2 max-h-1/2 object-cover rounded-md mb-4" />
                    ): (
                        <Music4 className="w-full h-48 text-gray-500 flex items-center justify-center rounded-md mb-4"/>
                    )}
                    <Button variant={"ghost"} asChild>
                        <a href={playlist.url} target="_blank" rel="noopener noreferrer" className={`text-sm`}>
                        Listen on Spotify 🎶
                        </a>
                    </Button>
                    </CardContent>
                </Card>
                </CarouselItem>
            ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
        </motion.div>
     )}
    </>
  );
}
