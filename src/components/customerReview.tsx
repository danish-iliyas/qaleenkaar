import { useState } from 'react';
import { Star, Play } from 'lucide-react';

interface ReviewCardProps {
  name: string;
  rating: number;
  review: string;
  date: string;
  videoUrl: string;
  thumbnail: string;
}

/**
 * Helper function to convert a regular YouTube URL into an embeddable URL
 * with autoplay and mute (mute is often required for autoplay).
 */
const getYouTubeEmbedUrl = (url: string): string => {
  let videoId = '';
  try {
    const urlObj = new URL(url);
    if (urlObj.hostname === 'www.youtube.com' || urlObj.hostname === 'youtube.com') {
      videoId = urlObj.searchParams.get('v');
    } else if (urlObj.hostname === 'youtu.be') {
      videoId = urlObj.pathname.substring(1);
    }
  } catch (error) {
    console.error("Invalid URL for video:", url, error);
    return ""; // Return empty string if URL is invalid
  }
  
  if (!videoId) return ""; // Not a valid YouTube link we can parse

  return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1`;
};


const ReviewCard = ({ name, rating, review, date, videoUrl, thumbnail }: ReviewCardProps) => {
  const [isPlaying, setIsPlaying] = useState(false);

  // Check if it's a YouTube link
  const isYouTubeVideo = videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be');
  
  // Get the correct URL to play *only* when playing
  const playableUrl = isPlaying 
    ? (isYouTubeVideo ? getYouTubeEmbedUrl(videoUrl) : videoUrl) 
    : "";

  return (
    <div className="bg-card rounded-lg overflow-hidden shadow-soft border border-black/5 flex flex-col">
      {/* Video Section */}
      <div className="relative aspect-video bg-gray-100">
        {!isPlaying ? (
          <>
            <img 
              src={thumbnail} 
              alt={`${name}'s review`}
              className="w-full h-full object-cover"
            />
            <button
              onClick={() => setIsPlaying(true)}
              className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition-colors group"
            >
              <div className="w-16 h-16 rounded-full bg-[#794299] flex items-center justify-center group-hover:bg-[#62009b] transition-colors">
                <Play className="w-8 h-8 text-white fill-white ml-1" />
              </div>
            </button>
          </>
        ) : (
          <>
            {isYouTubeVideo ? (
              <iframe
                className="w-full h-full"
                src={playableUrl}
                title={`${name}'s review`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <video
                src={playableUrl} // This will be the direct .mp4 link
                controls
                autoPlay
                className="w-full h-full"
              />
            )}
          </>
        )}
      </div>

      {/* Review Content */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h4 className="font-display font-semibold text-foreground">{name}</h4>
            <p className="text-sm text-muted-foreground">{date}</p>
          </div>
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
        <p className="font-body text-foreground leading-relaxed flex-grow">{review}</p>
      </div>
    </div>
  );
};

const CustomerReviews = () => {
  const [activeReviewType, setActiveReviewType] = useState('carpet');

  const carpetReviews = [
    {
      name: "Priya Sharma",
      rating: 5,
      review: "Absolutely amazing service! My antique Persian carpet looks brand new. The team was professional and the restoration work is impeccable.",
      date: "October 2024",
      videoUrl: "https://www.youtube.com/watch?v=rslXOypyNx0", // YouTube link
      thumbnail: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=450&fit=crop"
    },
    {
      name: "Rahul Mehta",
      rating: 5,
      review: "Best carpet cleaning service in Delhi! They handled my expensive silk carpet with utmost care. Highly recommended for anyone who values quality.",
      date: "September 2024",
      videoUrl: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4", // Direct .mp4 link
      thumbnail: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&h=450&fit=crop"
    },
    {
      name: "Anjali Gupta",
      rating: 4,
      review: "Great restoration work on my grandmother's old carpet. Took a bit longer than expected but the results were worth the wait.",
      date: "August 2024",
      videoUrl: "https://www.youtube.com/watch?v=rslXOypyNx0", // YouTube link
      thumbnail: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&h=450&fit=crop"
    }
  ];

  const shawlReviews = [
    {
      name: "Kavita Reddy",
      rating: 5,
      review: "My delicate Pashmina shawl was beautifully cleaned. They understand the intricacies of handling fine fabrics. Will definitely return!",
      date: "October 2024",
      videoUrl: "https://test-videos.co.uk/vids/BigBuckBunny/mp4/h264/360/BigBuckBunny_360_10s_1MB.mp4", // Direct .mp4 link
      thumbnail: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=800&h=450&fit=crop"
    },
    {
      name: "Meera Kapoor",
      rating: 5,
      review: "Exceptional shawl restoration service! They revived my vintage Kashmiri shawl perfectly. The colors are vibrant again and all tears are expertly repaired.",
      date: "September 2024",
      videoUrl: "https://sample-videos.com/video123/mp4/480/big_buck_bunny_480p_1mb.mp4", // Direct .mp4 link
  
      thumbnail: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=800&h=450&fit=crop"
    },
    {
      name: "Deepak Singh",
      rating: 4,
      review: "Good service for shawl washing. Bought a shawl through their exchange program at a fair price. Professional team overall.",
      date: "August 2024",
      videoUrl: "https://www.youtube.com/watch?v=rslXOypyNx0", // YouTube link
      thumbnail: "https://images.unsplash.com/photo-1434342249600-af710aa29b7b?w=800&h=450&fit=crop"
    }
  ];

  const currentReviews = activeReviewType === 'carpet' ? carpetReviews : shawlReviews;

  return (
    <section className="py-12 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-6 text-[#794299]">
            Customer Reviews
          </h2>
          <p className="font-body text-lg text-muted-foreground leading-relaxed mb-8">
            Hear what our satisfied customers have to say about our services.
          </p>
          
          {/* Toggle Buttons */}
          <div className="inline-flex rounded-lg border border-[#794299]/20 bg-card p-1 shadow-soft">
            <button
              onClick={() => setActiveReviewType('carpet')}
              className={`px-6 md:px-8 py-2.5 md:py-3 rounded-md font-display font-medium text-sm md:text-base transition-all ${
                activeReviewType === 'carpet'
                  ? 'bg-[#794299] text-white shadow-soft'
                  : 'text-foreground hover:text-[#794299]'
              }`}
            >
              Carpet Reviews
            </button>
            <button
              onClick={() => setActiveReviewType('shawl')}
              className={`px-6 md:px-8 py-2.5 md:py-3 rounded-md font-display font-medium text-sm md:text-base transition-all ${
                activeReviewType === 'shawl'
                  ? 'bg-[#794299] text-white shadow-soft'
                  : 'text-foreground hover:text-[#794299]'
              }`}
            >
              Shawl Reviews
            </button>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all">
          {currentReviews.map((review, index) => (
            <ReviewCard key={index} {...review} />
          ))}
        </div>

        {/* View All Reviews Link */}
        {/* {/* <div className="text-center mt-12">
          <button className="inline-flex items-center px-8 py-3.5 bg-[#794299] hover:bg-[#62009b] text-white font-display font-medium rounded-lg transition-colors">
            View All Reviews
            <span className="ml-2">→</span>
          </button> 
        </div> */}
      </div>
    </section>
  );
};

export default CustomerReviews;