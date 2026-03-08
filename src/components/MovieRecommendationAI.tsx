import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Film, Sparkles, Loader2, MessageCircle, Send, ChevronDown, ChevronUp } from 'lucide-react';

interface MovieRecommendation {
  title: string;
  genre: string;
  explanation: string;
}

interface FollowUp {
  question: string;
  answer: string;
}

// Mock recommendation database
const MOVIE_DATABASE: Record<string, MovieRecommendation[]> = {
  interstellar: [
    { title: 'Arrival', genre: 'Sci-Fi / Drama', explanation: 'This movie explores similar themes of space exploration, human emotion, and scientific discovery. If you enjoyed the philosophical storytelling of Interstellar, Arrival offers a similarly thoughtful narrative about communication and time.' },
    { title: 'The Martian', genre: 'Sci-Fi / Adventure', explanation: 'Both movies focus on survival in space and human resilience, combining scientific realism with compelling storytelling. The Martian shares Interstellar\'s optimistic view of human ingenuity.' },
    { title: 'Blade Runner 2049', genre: 'Sci-Fi / Thriller', explanation: 'While darker in tone, this film explores deep philosophical themes about humanity and existence, similar to the deeper emotional layers in Interstellar. Both films are visual masterpieces.' },
  ],
  inception: [
    { title: 'Shutter Island', genre: 'Thriller / Mystery', explanation: 'Like Inception, this film blurs the line between reality and illusion. Both feature Leonardo DiCaprio navigating layered psychological landscapes with twist-filled narratives.' },
    { title: 'The Matrix', genre: 'Sci-Fi / Action', explanation: 'Both films question the nature of reality itself. The Matrix pioneered the "simulated reality" genre that Inception builds upon with its dream-within-a-dream concept.' },
    { title: 'Memento', genre: 'Thriller / Mystery', explanation: 'Another Nolan masterpiece that plays with non-linear storytelling and memory. If you loved Inception\'s puzzle-like structure, Memento delivers a similarly mind-bending experience.' },
  ],
  'the dark knight': [
    { title: 'Se7en', genre: 'Thriller / Crime', explanation: 'Both films feature a compelling cat-and-mouse dynamic between protagonist and antagonist, with dark atmospheric storytelling and morally complex characters.' },
    { title: 'Heat', genre: 'Crime / Drama', explanation: 'Like The Dark Knight, Heat explores the thin line between hero and villain. The intense confrontation dynamics and urban crime setting share similar DNA.' },
    { title: 'Zodiac', genre: 'Thriller / Mystery', explanation: 'Both films explore obsession with justice and the psychological toll of pursuing dangerous individuals. The dark, methodical storytelling will resonate with Dark Knight fans.' },
  ],
  'pulp fiction': [
    { title: 'Snatch', genre: 'Crime / Comedy', explanation: 'Both films feature interweaving storylines, sharp dialogue, and darkly comedic violence. Snatch shares Pulp Fiction\'s energy and ensemble cast approach.' },
    { title: 'Fight Club', genre: 'Drama / Thriller', explanation: 'Like Pulp Fiction, Fight Club subverts narrative expectations with unconventional storytelling. Both films became cultural touchstones for challenging mainstream cinema.' },
    { title: 'Reservoir Dogs', genre: 'Crime / Thriller', explanation: 'Tarantino\'s debut shares the same DNA — non-linear storytelling, razor-sharp dialogue, and a fascination with the criminal underworld. A natural companion piece.' },
  ],
};

const DEFAULT_RECOMMENDATIONS: MovieRecommendation[] = [
  { title: 'The Shawshank Redemption', genre: 'Drama', explanation: 'Based on your input, this timeless film about hope and perseverance is widely acclaimed. Its deep character development and emotional storytelling make it a universally recommended classic.' },
  { title: 'Parasite', genre: 'Thriller / Drama', explanation: 'A genre-defying masterpiece that blends social commentary with suspense. Its innovative storytelling and unexpected twists make it a must-watch for any film enthusiast.' },
  { title: 'Whiplash', genre: 'Drama / Music', explanation: 'An intense character study about ambition and perfectionism. The film\'s relentless pacing and powerful performances create a uniquely gripping cinematic experience.' },
];

const FOLLOW_UP_ANSWERS: Record<string, string> = {
  'arrival': 'Arrival was recommended because its core themes mirror Interstellar\'s — both explore how human connection transcends the boundaries of time and space. The recommendation engine identified high similarity scores in: thematic elements (0.92), audience overlap (0.87), and narrative structure (0.84).',
  'the martian': 'The Martian shares a "hard sci-fi" DNA with your input. Our similarity model detected strong correlations in: scientific accuracy emphasis (0.91), survival narrative patterns (0.88), and optimistic tone vectors (0.85).',
  'blade runner 2049': 'Despite tonal differences, the embedding vectors for philosophical depth and visual storytelling showed 0.89 cosine similarity. Both films explore what it means to be human through a sci-fi lens.',
};

const MovieRecommendationAI = () => {
  const [movieInput, setMovieInput] = useState('');
  const [recommendations, setRecommendations] = useState<MovieRecommendation[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [followUps, setFollowUps] = useState<Record<number, FollowUp[]>>({});
  const [followUpInput, setFollowUpInput] = useState<Record<number, string>>({});
  const [loadingFollowUp, setLoadingFollowUp] = useState<number | null>(null);
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  const [pipelineStep, setPipelineStep] = useState(0);
  const resultsRef = useRef<HTMLDivElement>(null);

  const handleRecommend = async () => {
    if (!movieInput.trim()) return;
    setIsLoading(true);
    setHasSearched(true);
    setRecommendations([]);
    setFollowUps({});
    setExpandedCard(null);

    // Simulate pipeline steps
    setPipelineStep(1);
    await new Promise(r => setTimeout(r, 800));
    setPipelineStep(2);
    await new Promise(r => setTimeout(r, 700));
    setPipelineStep(3);
    await new Promise(r => setTimeout(r, 900));
    setPipelineStep(4);
    await new Promise(r => setTimeout(r, 600));

    const key = movieInput.toLowerCase().trim();
    const results = MOVIE_DATABASE[key] || DEFAULT_RECOMMENDATIONS;
    setRecommendations(results);
    setIsLoading(false);
    setPipelineStep(0);

    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 200);
  };

  const handleFollowUp = async (index: number) => {
    const question = followUpInput[index]?.trim();
    if (!question) return;
    setLoadingFollowUp(index);

    await new Promise(r => setTimeout(r, 1200));

    const movieTitle = recommendations[index].title.toLowerCase();
    const answer = FOLLOW_UP_ANSWERS[movieTitle] ||
      `Great question! "${recommendations[index].title}" was selected by the recommendation engine because it shares key feature vectors with your input. The hybrid model analyzed collaborative filtering signals (user behavior patterns) and content-based features (genre, themes, director style) to produce this match with a confidence score of ${(0.82 + Math.random() * 0.15).toFixed(2)}.`;

    setFollowUps(prev => ({
      ...prev,
      [index]: [...(prev[index] || []), { question, answer }],
    }));
    setFollowUpInput(prev => ({ ...prev, [index]: '' }));
    setLoadingFollowUp(null);
  };

  const pipelineSteps = [
    { label: 'Parsing input', icon: '🔍' },
    { label: 'Similarity search', icon: '🧮' },
    { label: 'Recommendation engine', icon: '⚙️' },
    { label: 'Generating explanations', icon: '🤖' },
  ];

  return (
    <div className="space-y-8">
      {/* Input */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Film className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-400" size={20} />
          <Input
            value={movieInput}
            onChange={e => setMovieInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleRecommend()}
            placeholder="Enter a movie title (e.g., Interstellar, Inception)"
            className="pl-12 py-6 text-lg backdrop-blur-xl bg-black/40 border border-white/20 text-gray-200 placeholder-gray-500 focus:border-emerald-400/50 transition-all duration-300"
          />
        </div>
        <Button
          onClick={handleRecommend}
          disabled={isLoading || !movieInput.trim()}
          className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white px-8 py-6 text-lg rounded-lg hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-emerald-500/25 disabled:opacity-50 disabled:hover:scale-100"
        >
          {isLoading ? (
            <Loader2 className="animate-spin mr-2" size={20} />
          ) : (
            <Sparkles className="mr-2" size={20} />
          )}
          Get AI Recommendations
        </Button>
      </div>

      {/* Pipeline visualization */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="backdrop-blur-xl bg-black/30 border border-white/10 rounded-xl p-6">
              <p className="text-sm text-gray-400 mb-4 font-medium">AI Pipeline Processing</p>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-0">
                {pipelineSteps.map((step, i) => (
                  <div key={i} className="flex items-center gap-2 sm:gap-0">
                    <motion.div
                      className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-500 ${
                        pipelineStep > i + 1
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/30'
                          : pipelineStep === i + 1
                          ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 shadow-lg shadow-cyan-500/10'
                          : 'bg-white/5 text-gray-500 border border-white/10'
                      }`}
                      animate={pipelineStep === i + 1 ? { scale: [1, 1.05, 1] } : {}}
                      transition={{ repeat: Infinity, duration: 1 }}
                    >
                      <span>{step.icon}</span>
                      <span>{step.label}</span>
                      {pipelineStep === i + 1 && <Loader2 className="animate-spin ml-1" size={14} />}
                    </motion.div>
                    {i < pipelineSteps.length - 1 && (
                      <span className="hidden sm:block text-gray-600 mx-2">→</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results */}
      <div ref={resultsRef}>
        <AnimatePresence mode="wait">
          {recommendations.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-4"
            >
              <p className="text-sm text-gray-400 font-medium">
                ✨ {recommendations.length} recommendations generated for "{movieInput}"
              </p>
              {recommendations.map((movie, i) => (
                <motion.div
                  key={movie.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.15, duration: 0.5 }}
                >
                  <Card className="backdrop-blur-xl bg-black/30 border border-white/15 hover:border-emerald-400/30 transition-all duration-500 overflow-hidden group">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="text-xl font-bold text-gray-100 group-hover:text-emerald-300 transition-colors duration-300">
                              {movie.title}
                            </h4>
                            <span className="px-3 py-1 text-xs font-medium rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-400/20">
                              {movie.genre}
                            </span>
                          </div>
                          <div className="mt-3 p-4 rounded-lg bg-white/5 border border-white/10">
                            <p className="text-sm text-gray-400 mb-1 font-medium flex items-center gap-2">
                              <Sparkles size={14} className="text-cyan-400" />
                              AI Explanation
                            </p>
                            <p className="text-gray-300 leading-relaxed">{movie.explanation}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => setExpandedCard(expandedCard === i ? null : i)}
                          className="text-gray-400 hover:text-emerald-400 transition-colors mt-1 flex-shrink-0"
                        >
                          {expandedCard === i ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                        </button>
                      </div>

                      {/* Follow-up section */}
                      <AnimatePresence>
                        {expandedCard === i && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="mt-4 pt-4 border-t border-white/10 space-y-3">
                              {(followUps[i] || []).map((fu, j) => (
                                <div key={j} className="space-y-2">
                                  <p className="text-sm text-cyan-300 font-medium">Q: {fu.question}</p>
                                  <p className="text-sm text-gray-300 bg-white/5 p-3 rounded-lg">{fu.answer}</p>
                                </div>
                              ))}
                              <div className="flex gap-2">
                                <Input
                                  value={followUpInput[i] || ''}
                                  onChange={e => setFollowUpInput(prev => ({ ...prev, [i]: e.target.value }))}
                                  onKeyDown={e => e.key === 'Enter' && handleFollowUp(i)}
                                  placeholder="Ask a follow-up (e.g., Why this movie?)"
                                  className="flex-1 text-sm backdrop-blur-xl bg-black/40 border border-white/15 text-gray-200 placeholder-gray-500"
                                  disabled={loadingFollowUp === i}
                                />
                                <Button
                                  size="sm"
                                  onClick={() => handleFollowUp(i)}
                                  disabled={loadingFollowUp === i || !followUpInput[i]?.trim()}
                                  className="bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 border border-emerald-400/20"
                                >
                                  {loadingFollowUp === i ? <Loader2 className="animate-spin" size={16} /> : <Send size={16} />}
                                </Button>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {hasSearched && !isLoading && recommendations.length === 0 && (
          <p className="text-center text-gray-400">No recommendations found. Try another movie!</p>
        )}
      </div>
    </div>
  );
};

export default MovieRecommendationAI;
