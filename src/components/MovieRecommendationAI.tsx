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

// Extensive movie recommendation database with Indian cinema focus
const MOVIE_DATABASE: Record<string, MovieRecommendation[]> = {
  interstellar: [
    { title: 'Arrival', genre: 'Sci-Fi / Drama', explanation: 'Explores similar themes of space, human emotion, and scientific discovery. Arrival offers a similarly thoughtful narrative about communication and time.' },
    { title: 'The Martian', genre: 'Sci-Fi / Adventure', explanation: 'Both focus on survival in space and human resilience, combining scientific realism with compelling storytelling.' },
    { title: 'Mission Mangal', genre: 'Sci-Fi / Drama (Indian)', explanation: 'India\'s Mars mission brought to life — shares Interstellar\'s themes of space exploration and human determination against impossible odds. A must-watch for Indian space enthusiasts.' },
    { title: 'Tik Tik Tik', genre: 'Sci-Fi / Thriller (Indian)', explanation: 'India\'s first space film follows an asteroid defense mission. Like Interstellar, it blends family emotion with high-stakes space adventure.' },
    { title: 'Gravity', genre: 'Sci-Fi / Thriller', explanation: 'Both are visually stunning space survival films exploring isolation and human willpower in the vastness of space.' },
    { title: 'Contact', genre: 'Sci-Fi / Drama', explanation: 'Like Interstellar, this film bridges science and spirituality, exploring humanity\'s place in the universe through a deeply personal lens.' },
  ],
  inception: [
    { title: 'Shutter Island', genre: 'Thriller / Mystery', explanation: 'Blurs the line between reality and illusion. Both feature DiCaprio navigating layered psychological landscapes.' },
    { title: 'Talaash', genre: 'Thriller / Mystery (Indian)', explanation: 'Like Inception, Talaash plays with perception and hidden truths. Aamir Khan\'s psychological thriller keeps you questioning what\'s real until the very end.' },
    { title: 'Bhool Bhulaiyaa 2', genre: 'Thriller / Comedy (Indian)', explanation: 'While lighter in tone, it shares Inception\'s love of layered deception and mind games. A Bollywood take on psychological twists.' },
    { title: 'The Matrix', genre: 'Sci-Fi / Action', explanation: 'Both question the nature of reality itself. The Matrix pioneered the simulated reality genre that Inception builds upon.' },
    { title: 'Memento', genre: 'Thriller / Mystery', explanation: 'Another Nolan masterpiece with non-linear storytelling. If you loved Inception\'s puzzle structure, Memento delivers similarly.' },
    { title: 'Karthik Calling Karthik', genre: 'Thriller / Drama (Indian)', explanation: 'A psychological thriller exploring identity and mental perception. Like Inception, it keeps viewers guessing about what\'s truly happening.' },
  ],
  '3 idiots': [
    { title: 'Taare Zameen Par', genre: 'Drama (Indian)', explanation: 'Another Aamir Khan masterpiece challenging the Indian education system. Both celebrate unconventional thinking and the power of nurturing talent over rote learning.' },
    { title: 'Chhichhore', genre: 'Comedy / Drama (Indian)', explanation: 'Directly inspired by 3 Idiots\' spirit — tackles academic pressure and friendship with humor and heart. A spiritual successor.' },
    { title: 'Munna Bhai M.B.B.S.', genre: 'Comedy / Drama (Indian)', explanation: 'Both films challenge rigid institutional systems with humor and heart. Munna Bhai\'s "Gandhigiri" mirrors Rancho\'s unconventional approach.' },
    { title: 'Good Will Hunting', genre: 'Drama', explanation: 'Both feature brilliant unconventional minds challenging academic establishment. The emotional depth and mentor-student dynamics are remarkably similar.' },
    { title: 'Rang De Basanti', genre: 'Drama (Indian)', explanation: 'Like 3 Idiots, it captures the energy of Indian youth challenging the system, with powerful performances and a message that resonates deeply.' },
  ],
  dangal: [
    { title: 'Chak De! India', genre: 'Sports / Drama (Indian)', explanation: 'Both are iconic Indian sports films about underdogs defying expectations. Shah Rukh Khan\'s hockey coach story shares Dangal\'s themes of gender equality and national pride.' },
    { title: 'Bhaag Milkha Bhaag', genre: 'Sports / Biography (Indian)', explanation: 'Another powerful Indian biographical sports drama. Both celebrate the grit and sacrifice behind athletic greatness.' },
    { title: 'Sultan', genre: 'Sports / Drama (Indian)', explanation: 'Shares Dangal\'s wrestling theme with a story about redemption through sport. Both showcase the emotional toll and triumph of competitive wrestling.' },
    { title: 'Mary Kom', genre: 'Sports / Biography (Indian)', explanation: 'Like Dangal, it tells the story of a woman breaking barriers in combat sports. Both celebrate female athleticism in the Indian context.' },
    { title: 'Million Dollar Baby', genre: 'Sports / Drama', explanation: 'Both explore the intense father-figure/athlete relationship and the sacrifices required for sporting greatness.' },
  ],
  'the dark knight': [
    { title: 'Raees', genre: 'Crime / Thriller (Indian)', explanation: 'Shah Rukh Khan\'s crime thriller shares The Dark Knight\'s exploration of the thin line between hero and villain in a lawless world.' },
    { title: 'Gangs of Wasseypur', genre: 'Crime / Drama (Indian)', explanation: 'India\'s answer to epic crime sagas — features morally complex characters and a dark, uncompromising narrative style similar to Nolan\'s vision.' },
    { title: 'Se7en', genre: 'Thriller / Crime', explanation: 'Both feature compelling cat-and-mouse dynamics with dark atmospheric storytelling and morally complex characters.' },
    { title: 'Sarkar', genre: 'Crime / Drama (Indian)', explanation: 'Ram Gopal Varma\'s political crime drama shares The Dark Knight\'s themes of power, corruption, and moral ambiguity.' },
    { title: 'Zodiac', genre: 'Thriller / Mystery', explanation: 'Both explore obsession with justice and the psychological toll of pursuing dangerous individuals.' },
  ],
  'pulp fiction': [
    { title: 'Gangs of Wasseypur', genre: 'Crime / Drama (Indian)', explanation: 'Anurag Kashyap\'s magnum opus shares Pulp Fiction\'s non-linear storytelling, dark humor, and unforgettable dialogue. Often called India\'s Pulp Fiction.' },
    { title: 'Delhi Belly', genre: 'Comedy / Crime (Indian)', explanation: 'Shares Pulp Fiction\'s irreverent tone, interweaving storylines, and darkly comedic violence. A Bollywood cult classic.' },
    { title: 'Snatch', genre: 'Crime / Comedy', explanation: 'Both feature interweaving storylines, sharp dialogue, and darkly comedic violence with an ensemble cast approach.' },
    { title: 'Ludo', genre: 'Comedy / Crime (Indian)', explanation: 'Multiple interconnected stories with dark humor and unexpected twists — Anurag Basu\'s film channels Tarantino\'s narrative style.' },
    { title: 'Reservoir Dogs', genre: 'Crime / Thriller', explanation: 'Tarantino\'s debut shares the same DNA — non-linear storytelling and razor-sharp dialogue.' },
  ],
  bahubali: [
    { title: 'RRR', genre: 'Action / Epic (Indian)', explanation: 'SS Rajamouli\'s other masterpiece. If you loved Bahubali\'s grand scale and visual spectacle, RRR delivers the same epic energy with a historical fiction twist.' },
    { title: 'Magadheera', genre: 'Action / Fantasy (Indian)', explanation: 'Rajamouli\'s earlier work that laid the groundwork for Bahubali. Features similar themes of reincarnation, epic battles, and larger-than-life heroes.' },
    { title: 'Gladiator', genre: 'Action / Epic', explanation: 'Both are grand historical epics about betrayal, honor, and reclaiming rightful power. The arena sequences in both films are unforgettable.' },
    { title: 'Ponniyin Selvan', genre: 'Historical / Epic (Indian)', explanation: 'Mani Ratnam\'s Chola empire saga shares Bahubali\'s grand scale, political intrigue, and stunning visual storytelling.' },
    { title: '300', genre: 'Action / Fantasy', explanation: 'Both feature stylized, larger-than-life battle sequences and heroic last stands against overwhelming odds.' },
  ],
  rrr: [
    { title: 'Bahubali: The Beginning', genre: 'Action / Epic (Indian)', explanation: 'Rajamouli\'s earlier epic shares RRR\'s grand visual spectacle, powerful friendship themes, and breathtaking action choreography.' },
    { title: 'KGF: Chapter 2', genre: 'Action / Drama (Indian)', explanation: 'Both are Indian blockbusters that redefined scale in Indian cinema. KGF shares RRR\'s intensity and larger-than-life protagonist.' },
    { title: 'Mad Max: Fury Road', genre: 'Action / Adventure', explanation: 'Both are relentless, visually stunning action spectacles that push the boundaries of what action cinema can achieve.' },
    { title: 'Lagaan', genre: 'Sports / Drama (Indian)', explanation: 'Both tell stories of Indians rising against British colonial power. While different in tone, the patriotic spirit and underdog triumph connect them deeply.' },
    { title: 'The Revenant', genre: 'Adventure / Drama', explanation: 'Both feature protagonists enduring extreme physical ordeals driven by an unbreakable will. The raw intensity is remarkably similar.' },
  ],
  drishyam: [
    { title: 'Andhadhun', genre: 'Thriller / Mystery (Indian)', explanation: 'Both are masterclass Indian thrillers with jaw-dropping twists. If Drishyam impressed you with its clever plotting, Andhadhun will blow your mind.' },
    { title: 'Kahaani', genre: 'Thriller / Mystery (Indian)', explanation: 'Like Drishyam, it features an ordinary person navigating extraordinary circumstances with intelligence and determination. Vidya Balan delivers a riveting performance.' },
    { title: 'A Wednesday', genre: 'Thriller (Indian)', explanation: 'Both celebrate the common person outsmarting the system. Naseeruddin Shah\'s thriller shares Drishyam\'s theme of an ordinary person executing an extraordinary plan.' },
    { title: 'Gone Girl', genre: 'Thriller / Mystery', explanation: 'Both films explore deception, carefully constructed alibis, and the dark side of family dynamics with masterful twists.' },
    { title: 'Badla', genre: 'Thriller / Mystery (Indian)', explanation: 'Amitabh Bachchan\'s mystery thriller shares Drishyam\'s love of layered deception and a protagonist whose true intentions are revealed gradually.' },
  ],
  pk: [
    { title: 'OMG: Oh My God!', genre: 'Comedy / Drama (Indian)', explanation: 'Both challenge blind religious faith with humor and intelligence. If PK made you think, OMG delivers a similarly sharp social commentary.' },
    { title: '3 Idiots', genre: 'Comedy / Drama (Indian)', explanation: 'Another Rajkumar Hirani-Aamir Khan collaboration that challenges societal norms with humor. Both films have the same DNA of heart plus message.' },
    { title: 'The Man from Earth', genre: 'Sci-Fi / Drama', explanation: 'Both feature an outsider perspective challenging fundamental beliefs through conversation and logic. Thought-provoking in the same way.' },
    { title: 'Lage Raho Munna Bhai', genre: 'Comedy / Drama (Indian)', explanation: 'Hirani\'s signature blend of comedy with a powerful message about faith, truth, and human connection.' },
  ],
  'gangs of wasseypur': [
    { title: 'Ugly', genre: 'Thriller / Crime (Indian)', explanation: 'Anurag Kashyap\'s dark crime thriller shares GoW\'s unflinching look at human greed and moral corruption. Both refuse to glamorize violence.' },
    { title: 'City of God', genre: 'Crime / Drama', explanation: 'Both depict generational crime sagas in marginalized communities with raw, documentary-like intensity and non-linear storytelling.' },
    { title: 'Raman Raghav 2.0', genre: 'Crime / Thriller (Indian)', explanation: 'Another Kashyap masterwork exploring the darkest corners of criminality. Both films share an uncompromising, gritty aesthetic.' },
    { title: 'Goodfellas', genre: 'Crime / Drama', explanation: 'Both are epic crime narratives spanning decades, with charismatic antiheroes and an unforgettable soundtrack driving the story.' },
    { title: 'Sacred Games (Series)', genre: 'Crime / Thriller (Indian)', explanation: 'If you loved GoW\'s sprawling crime narrative, Sacred Games extends that intensity into a series format with similar Kashyap-esque storytelling.' },
  ],
  andhadhun: [
    { title: 'Drishyam', genre: 'Thriller / Mystery (Indian)', explanation: 'Both are brilliant Indian thrillers built on deception and clever plotting. Drishyam shares Andhadhun\'s love of keeping audiences guessing until the final frame.' },
    { title: 'Talaash', genre: 'Thriller / Mystery (Indian)', explanation: 'Like Andhadhun, it subverts expectations with a supernatural twist hidden inside a crime investigation. Both reward attentive viewers.' },
    { title: 'Parasite', genre: 'Thriller / Drama', explanation: 'Both masterfully blend dark comedy with escalating tension. The class dynamics and moral ambiguity create a similar viewing experience.' },
    { title: 'Badla', genre: 'Thriller / Mystery (Indian)', explanation: 'Another Indian thriller that relies on unreliable narratives and shocking revelations. Fans of Andhadhun will love the puzzle-box structure.' },
    { title: 'Knives Out', genre: 'Mystery / Comedy', explanation: 'Both films delight in subverting whodunit conventions with clever twists and dark humor. Each viewing reveals new layers.' },
  ],
  sholay: [
    { title: 'Butch Cassidy and the Sundance Kid', genre: 'Western / Adventure', explanation: 'The original inspiration for Jai-Veeru! Both celebrate iconic buddy dynamics against a frontier backdrop with humor and action.' },
    { title: 'Lagaan', genre: 'Sports / Drama (Indian)', explanation: 'Both are defining Indian cinema epics that unite communities against impossible odds. Sholay and Lagaan represent the pinnacle of populist Indian filmmaking.' },
    { title: 'Dhoom', genre: 'Action / Thriller (Indian)', explanation: 'Like Sholay, it created an iconic duo and became a franchise-defining Bollywood blockbuster with memorable action sequences.' },
    { title: 'The Good, the Bad and the Ugly', genre: 'Western', explanation: 'Sholay drew heavily from Spaghetti Westerns. This Leone classic shares the same DNA of desert landscapes, morally grey characters, and iconic showdowns.' },
  ],
  'tumbbad': [
    { title: 'Jallikattu', genre: 'Thriller / Drama (Indian)', explanation: 'Both are unique Indian films exploring human greed through allegory. Jallikattu\'s primal chaos mirrors Tumbbad\'s cautionary tale about insatiable desire.' },
    { title: 'Pan\'s Labyrinth', genre: 'Fantasy / Horror', explanation: 'Both weave dark fantasy with historical settings to explore human nature. The mythological elements and visual storytelling are remarkably aligned.' },
    { title: 'Kantara', genre: 'Action / Folk Horror (Indian)', explanation: 'Both films draw from Indian folklore and mythology with stunning visual imagery. Kantara\'s Daiva Kola sequences echo Tumbbad\'s mythological horror.' },
    { title: 'The Shape of Water', genre: 'Fantasy / Drama', explanation: 'Both blend creature mythology with deeply human stories. The atmospheric, fairy-tale quality connects these visually stunning films.' },
  ],
};

// Multiple fallback pools for variety
const FALLBACK_POOLS: MovieRecommendation[][] = [
  [
    { title: 'Zindagi Na Milegi Dobara', genre: 'Drama / Adventure (Indian)', explanation: 'A beautifully crafted journey about friendship, self-discovery, and living life to the fullest. One of Bollywood\'s most beloved modern films.' },
    { title: 'Dil Chahta Hai', genre: 'Drama / Comedy (Indian)', explanation: 'A landmark Indian film that redefined how friendship and modern relationships are portrayed in Bollywood. Iconic and timeless.' },
    { title: 'The Shawshank Redemption', genre: 'Drama', explanation: 'A timeless film about hope and perseverance. Its deep character development and emotional storytelling make it universally acclaimed.' },
  ],
  [
    { title: 'Andhadhun', genre: 'Thriller / Mystery (Indian)', explanation: 'One of the finest Indian thrillers ever made — a blind pianist caught in a web of murder and deception. Unpredictable and masterfully crafted.' },
    { title: 'Parasite', genre: 'Thriller / Drama', explanation: 'A genre-defying masterpiece blending social commentary with suspense. Its innovative storytelling broke international barriers.' },
    { title: 'Tumbbad', genre: 'Horror / Fantasy (Indian)', explanation: 'India\'s most visually stunning horror film — a mythological tale about greed spanning generations. Absolutely unique in world cinema.' },
  ],
  [
    { title: 'Lagaan', genre: 'Sports / Drama (Indian)', explanation: 'An Oscar-nominated Indian epic about villagers challenging British colonizers through cricket. A perfect blend of sports, drama, and patriotism.' },
    { title: 'Rang De Basanti', genre: 'Drama (Indian)', explanation: 'A powerful film about youth awakening to social responsibility. Its raw energy and iconic music make it a landmark of Indian cinema.' },
    { title: 'Whiplash', genre: 'Drama / Music', explanation: 'An intense study of ambition and perfectionism. The relentless pacing and powerful performances create a uniquely gripping experience.' },
  ],
  [
    { title: 'Kantara', genre: 'Action / Folk Horror (Indian)', explanation: 'A Kannada masterpiece blending folk mythology with raw action. The climactic Daiva Kola sequence is one of the most powerful moments in Indian cinema.' },
    { title: 'Super Deluxe', genre: 'Drama / Dark Comedy (Indian)', explanation: 'A Tamil anthology film with interconnected stories exploring fate, identity, and morality. Wildly creative and unlike anything else.' },
    { title: 'Everything Everywhere All at Once', genre: 'Sci-Fi / Comedy', explanation: 'Like the best Indian cinema, it blends family drama with genre-bending creativity. A celebration of immigrant experience and multiverse madness.' },
  ],
];

let lastFallbackIndex = -1;

function getRandomFallback(): MovieRecommendation[] {
  let idx: number;
  do {
    idx = Math.floor(Math.random() * FALLBACK_POOLS.length);
  } while (idx === lastFallbackIndex && FALLBACK_POOLS.length > 1);
  lastFallbackIndex = idx;
  return FALLBACK_POOLS[idx];
}

function shuffleAndPick(arr: MovieRecommendation[], count: number): MovieRecommendation[] {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

const FOLLOW_UP_ANSWERS: Record<string, string> = {
  'arrival': 'Arrival was recommended because its core themes mirror Interstellar\'s — both explore how human connection transcends time and space. Similarity scores: thematic (0.92), audience overlap (0.87), narrative structure (0.84).',
  'the martian': 'The Martian shares a "hard sci-fi" DNA with your input. Strong correlations in: scientific accuracy (0.91), survival narrative (0.88), optimistic tone (0.85).',
  'mission mangal': 'Mission Mangal was recommended for its Indian space exploration narrative. Similarity: space themes (0.90), human determination (0.93), accessible storytelling (0.87). It resonates strongly with Indian audiences who loved Interstellar.',
  'gangs of wasseypur': 'GoW matches because of its epic multi-generational crime narrative. Feature vectors: narrative scope (0.94), moral complexity (0.91), raw intensity (0.89).',
  'andhadhun': 'Andhadhun\'s recommendation stems from its masterful plot twists and unreliable narrator technique. Similarity: twist density (0.95), dark humor (0.88), rewatchability (0.92).',
  'rrr': 'RRR was recommended for its epic scale and friendship themes. Visual spectacle (0.96), emotional intensity (0.91), cultural resonance (0.94).',
  'tumbbad': 'Tumbbad matches on mythological storytelling and visual artistry. Feature vectors: folklore depth (0.93), atmospheric horror (0.90), thematic ambition (0.95).',
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
