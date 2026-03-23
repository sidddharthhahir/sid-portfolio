import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { RotateCcw, Search, Timer, Trophy, X, Sparkles } from 'lucide-react';
import { VibrationManager } from '@/utils/vibrationUtils';

interface WordSearchGameProps {
  isActive: boolean;
  onComplete: () => void;
}

interface Position {
  row: number;
  col: number;
}

interface WordConfig {
  word: string;
  story: string;
  start: Position;
  direction: Position;
}

interface PuzzleData {
  board: string[][];
  words: Array<WordConfig & { positions: Position[] }>;
}

const GRID_SIZE = 10;

const WORD_CONFIGS: WordConfig[] = [
  {
    word: 'LIGHTFM',
    story: 'This points to MovieWise XAI, where I used a hybrid LightFM recommendation model to learn user taste patterns.',
    start: { row: 0, col: 0 },
    direction: { row: 0, col: 1 },
  },
  {
    word: 'PRISMA',
    story: 'This connects to RoomSplit, where I designed a clean relational data model and multi-user flows with Prisma.',
    start: { row: 1, col: 2 },
    direction: { row: 1, col: 0 },
  },
  {
    word: 'RAG',
    story: 'This reflects retrieval-augmented generation work so AI answers stay grounded in real project knowledge.',
    start: { row: 4, col: 4 },
    direction: { row: 1, col: 1 },
  },
  {
    word: 'KPI',
    story: 'This comes from the Game KPI Dashboard, where I tracked product and marketing performance with fast queries.',
    start: { row: 7, col: 3 },
    direction: { row: 0, col: 1 },
  },
  {
    word: 'ROOMSPLIT',
    story: 'This project helps groups split expenses intelligently using optimized settlement logic and a scalable architecture.',
    start: { row: 9, col: 0 },
    direction: { row: 0, col: 1 },
  },
  {
    word: 'POCKETFIT',
    story: 'This refers to PocketFit AI Coach, where I explored personalized planning, habits, and AI-assisted guidance.',
    start: { row: 1, col: 9 },
    direction: { row: 1, col: 0 },
  },
];

const randomLetter = () => String.fromCharCode(65 + Math.floor(Math.random() * 26));
const getCellKey = ({ row, col }: Position) => `${row}-${col}`;

const getWordPositions = ({ start, direction, word }: WordConfig) =>
  word.split('').map((_, index) => ({
    row: start.row + direction.row * index,
    col: start.col + direction.col * index,
  }));

const buildPuzzle = (): PuzzleData => {
  const board = Array.from({ length: GRID_SIZE }, () => Array.from({ length: GRID_SIZE }, () => ''));
  const words = WORD_CONFIGS.map((config) => ({ ...config, positions: getWordPositions(config) }));

  words.forEach(({ word, positions }) => {
    positions.forEach((position, index) => {
      board[position.row][position.col] = word[index];
    });
  });

  for (let row = 0; row < GRID_SIZE; row += 1) {
    for (let col = 0; col < GRID_SIZE; col += 1) {
      if (!board[row][col]) board[row][col] = randomLetter();
    }
  }

  return { board, words };
};

const getPathBetween = (start: Position, end: Position): Position[] => {
  const rowDelta = end.row - start.row;
  const colDelta = end.col - start.col;
  const steps = Math.max(Math.abs(rowDelta), Math.abs(colDelta));

  if (steps === 0) return [start];

  const rowStep = rowDelta === 0 ? 0 : rowDelta / Math.abs(rowDelta);
  const colStep = colDelta === 0 ? 0 : colDelta / Math.abs(colDelta);
  const isStraight = rowDelta === 0 || colDelta === 0 || Math.abs(rowDelta) === Math.abs(colDelta);

  if (!isStraight) return [start];

  return Array.from({ length: steps + 1 }, (_, index) => ({
    row: start.row + rowStep * index,
    col: start.col + colStep * index,
  }));
};

const ACCENT_COLORS = [
  'hsl(var(--villa-gameroom))',
  'hsl(var(--villa-theater))',
  'hsl(var(--villa-gym))',
  'hsl(var(--primary))',
  'hsl(var(--villa-library))',
  'hsl(var(--villa-pool))',
];

const WordSearchGame = ({ isActive, onComplete }: WordSearchGameProps) => {
  const [puzzle, setPuzzle] = useState<PuzzleData>(() => buildPuzzle());
  const [selectionStart, setSelectionStart] = useState<Position | null>(null);
  const [selectedPath, setSelectedPath] = useState<Position[]>([]);
  const [foundWords, setFoundWords] = useState<string[]>([]);
  const [storyFeed, setStoryFeed] = useState<Array<{ word: string; story: string }>>([]);
  const [isSelecting, setIsSelecting] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [timerStarted, setTimerStarted] = useState(false);
  const [lastFound, setLastFound] = useState<string | null>(null);

  useEffect(() => {
    if (!isActive || !timerStarted || foundWords.length === puzzle.words.length) return;
    const interval = window.setInterval(() => setTimeElapsed((c) => c + 1), 1000);
    return () => window.clearInterval(interval);
  }, [isActive, timerStarted, foundWords.length, puzzle.words.length]);

  useEffect(() => {
    if (isActive) {
      setPuzzle(buildPuzzle());
      setSelectionStart(null);
      setSelectedPath([]);
      setFoundWords([]);
      setStoryFeed([]);
      setIsSelecting(false);
      setTimeElapsed(0);
      setTimerStarted(false);
      setLastFound(null);
    }
  }, [isActive]);

  useEffect(() => {
    if (lastFound) {
      const timeout = setTimeout(() => setLastFound(null), 1500);
      return () => clearTimeout(timeout);
    }
  }, [lastFound]);

  const foundCellKeys = useMemo(() => {
    const keys = new Set<string>();
    puzzle.words.forEach((wordData) => {
      if (foundWords.includes(wordData.word)) {
        wordData.positions.forEach((position) => keys.add(getCellKey(position)));
      }
    });
    return keys;
  }, [foundWords, puzzle.words]);

  const selectedCellKeys = useMemo(() => new Set(selectedPath.map(getCellKey)), [selectedPath]);

  const isComplete = foundWords.length === puzzle.words.length;
  const progress = (foundWords.length / puzzle.words.length) * 100;

  const resetGame = () => {
    setPuzzle(buildPuzzle());
    setSelectionStart(null);
    setSelectedPath([]);
    setFoundWords([]);
    setStoryFeed([]);
    setIsSelecting(false);
    setTimeElapsed(0);
    setTimerStarted(false);
    setLastFound(null);
  };

  const resolveSelection = (path: Position[]) => {
    if (!path.length) return;
    const selectedWord = path.map((p) => puzzle.board[p.row][p.col]).join('');
    const reverseWord = selectedWord.split('').reverse().join('');
    const matchedWord = puzzle.words.find(
      (w) => !foundWords.includes(w.word) && (w.word === selectedWord || w.word === reverseWord),
    );
    if (matchedWord) {
      VibrationManager.correctMatch();
      setFoundWords((c) => [...c, matchedWord.word]);
      setStoryFeed((c) => [...c, { word: matchedWord.word, story: matchedWord.story }]);
      setLastFound(matchedWord.word);
    } else {
      VibrationManager.incorrectMatch();
    }
  };

  const handlePointerStart = (position: Position) => {
    if (!timerStarted) setTimerStarted(true);
    setSelectionStart(position);
    setSelectedPath([position]);
    setIsSelecting(true);
  };

  const handlePointerEnter = (position: Position) => {
    if (!isSelecting || !selectionStart) return;
    setSelectedPath(getPathBetween(selectionStart, position));
  };

  const handlePointerEnd = () => {
    if (!isSelecting) return;
    resolveSelection(selectedPath);
    setIsSelecting(false);
    setSelectionStart(null);
    setSelectedPath([]);
  };

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, '0')}`;
  };

  if (!isActive) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6"
      style={{ background: 'radial-gradient(ellipse at center, hsl(var(--villa-gameroom) / 0.08) 0%, hsl(var(--background) / 0.95) 70%)' }}
    >
      {/* Backdrop blur */}
      <div className="absolute inset-0 backdrop-blur-2xl" onClick={onComplete} />

      <motion.div
        initial={{ scale: 0.92, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: 'spring', damping: 28, stiffness: 300 }}
        className="relative z-10 w-full max-w-5xl overflow-hidden rounded-3xl border border-border/60"
        style={{
          background: 'linear-gradient(145deg, hsl(var(--card) / 0.97), hsl(var(--background) / 0.95))',
          boxShadow: '0 40px 100px -30px hsl(var(--villa-gameroom) / 0.4), 0 0 0 1px hsl(var(--villa-gameroom) / 0.08)',
        }}
      >
        {/* Top accent bar */}
        <div className="h-1 w-full" style={{ background: `linear-gradient(90deg, ${ACCENT_COLORS.join(', ')})` }} />

        {/* Scrollable content */}
        <div className="max-h-[90vh] overflow-y-auto p-5 md:p-8">
          {/* Header */}
          <div className="mb-6 flex items-start justify-between gap-4">
            <div>
              <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-border/50 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground"
                style={{ background: 'hsl(var(--villa-gameroom) / 0.06)' }}>
                <Search size={10} />
                Hidden Stories
              </div>
              <h3 className="text-2xl font-black tracking-tight text-foreground md:text-3xl">
                Word Search
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" onClick={resetGame} className="h-9 w-9 rounded-xl hover:bg-muted/60">
                <RotateCcw size={16} />
              </Button>
              <Button variant="ghost" size="icon" onClick={onComplete} className="h-9 w-9 rounded-xl hover:bg-muted/60">
                <X size={16} />
              </Button>
            </div>
          </div>

          {/* Stats bar */}
          <div className="mb-5 flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 rounded-xl px-3 py-1.5 text-sm font-semibold"
              style={{ background: 'hsl(var(--muted) / 0.5)', color: 'hsl(var(--foreground))' }}>
              <Timer size={14} className="text-muted-foreground" />
              {formatTime(timeElapsed)}
            </div>
            <div className="flex items-center gap-2 rounded-xl px-3 py-1.5 text-sm font-semibold"
              style={{ background: 'hsl(var(--villa-gameroom) / 0.1)', color: 'hsl(var(--foreground))' }}>
              <Trophy size={14} style={{ color: 'hsl(var(--villa-gameroom))' }} />
              {foundWords.length} / {puzzle.words.length}
            </div>

            {/* Progress bar */}
            <div className="ml-auto hidden h-2 w-32 overflow-hidden rounded-full md:block"
              style={{ background: 'hsl(var(--muted) / 0.5)' }}>
              <motion.div
                className="h-full rounded-full"
                style={{ background: `linear-gradient(90deg, hsl(var(--villa-gameroom)), hsl(var(--villa-gameroom-2)))` }}
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ type: 'spring', damping: 20 }}
              />
            </div>
          </div>

          {/* Word chips */}
          <div className="mb-5 flex flex-wrap gap-2">
            {puzzle.words.map((wordData, i) => {
              const found = foundWords.includes(wordData.word);
              return (
                <motion.span
                  key={wordData.word}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className="rounded-lg px-3 py-1 text-xs font-bold uppercase tracking-widest transition-all duration-300"
                  style={{
                    background: found ? 'hsl(var(--villa-gameroom) / 0.18)' : 'hsl(var(--muted) / 0.3)',
                    color: found ? 'hsl(var(--villa-gameroom))' : 'hsl(var(--muted-foreground) / 0.6)',
                    border: `1px solid ${found ? 'hsl(var(--villa-gameroom) / 0.4)' : 'hsl(var(--border) / 0.4)'}`,
                    textDecoration: found ? 'line-through' : 'none',
                    boxShadow: found ? '0 0 16px -4px hsl(var(--villa-gameroom) / 0.3)' : 'none',
                  }}
                >
                  {found && <Sparkles size={10} className="mr-1 inline" />}
                  {wordData.word}
                </motion.span>
              );
            })}
          </div>

          {/* Flash notification */}
          <AnimatePresence>
            {lastFound && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                className="mb-4 flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold"
                style={{
                  background: 'hsl(var(--villa-gameroom) / 0.12)',
                  border: '1px solid hsl(var(--villa-gameroom) / 0.3)',
                  color: 'hsl(var(--foreground))',
                }}
              >
                <Sparkles size={14} style={{ color: 'hsl(var(--villa-gameroom))' }} />
                Found <span className="font-black">{lastFound}</span> — story unlocked!
              </motion.div>
            )}
          </AnimatePresence>

          <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
            {/* Grid */}
            <div className="rounded-2xl p-3 md:p-4" style={{
              background: 'hsl(var(--background) / 0.6)',
              border: '1px solid hsl(var(--border) / 0.4)',
            }}>
              <div
                className="grid grid-cols-10 gap-1 select-none touch-none md:gap-1.5"
                onPointerLeave={handlePointerEnd}
              >
                {puzzle.board.map((row, rowIndex) =>
                  row.map((letter, colIndex) => {
                    const position = { row: rowIndex, col: colIndex };
                    const cellKey = getCellKey(position);
                    const isFound = foundCellKeys.has(cellKey);
                    const isSelected = selectedCellKeys.has(cellKey);

                    return (
                      <motion.button
                        key={cellKey}
                        type="button"
                        onPointerDown={() => handlePointerStart(position)}
                        onPointerEnter={() => handlePointerEnter(position)}
                        onPointerUp={handlePointerEnd}
                        whileTap={{ scale: 0.9 }}
                        className="aspect-square rounded-lg text-xs font-bold transition-colors duration-150 md:rounded-xl md:text-sm"
                        style={{
                          border: `1.5px solid ${
                            isFound ? 'hsl(var(--villa-gameroom) / 0.6)' :
                            isSelected ? 'hsl(var(--primary) / 0.5)' :
                            'hsl(var(--border) / 0.3)'
                          }`,
                          background: isFound
                            ? 'linear-gradient(135deg, hsl(var(--villa-gameroom) / 0.25), hsl(var(--villa-gameroom-2) / 0.15))'
                            : isSelected
                              ? 'linear-gradient(135deg, hsl(var(--primary) / 0.2), hsl(var(--secondary) / 0.12))'
                              : 'hsl(var(--muted) / 0.25)',
                          color: isFound
                            ? 'hsl(var(--villa-gameroom))'
                            : isSelected
                              ? 'hsl(var(--primary))'
                              : 'hsl(var(--foreground) / 0.7)',
                          boxShadow: isFound
                            ? '0 0 12px -2px hsl(var(--villa-gameroom) / 0.35), inset 0 1px 2px hsl(var(--villa-gameroom) / 0.1)'
                            : isSelected
                              ? '0 0 8px -2px hsl(var(--primary) / 0.3)'
                              : 'none',
                        }}
                      >
                        {letter}
                      </motion.button>
                    );
                  }),
                )}
              </div>
            </div>

            {/* Stories panel */}
            <div className="space-y-3">
              <h4 className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-muted-foreground">
                <Sparkles size={12} />
                Unlocked Stories
              </h4>

              {storyFeed.length === 0 && (
                <p className="rounded-xl p-4 text-sm leading-relaxed text-muted-foreground/60"
                  style={{ background: 'hsl(var(--muted) / 0.15)', border: '1px dashed hsl(var(--border) / 0.3)' }}>
                  Find words in the grid to reveal stories behind my projects…
                </p>
              )}

              <AnimatePresence>
                {storyFeed.map((entry, i) => (
                  <motion.div
                    key={entry.word}
                    initial={{ opacity: 0, x: 20, scale: 0.95 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    transition={{ type: 'spring', damping: 24, delay: 0.05 }}
                    className="rounded-xl p-4"
                    style={{
                      background: `linear-gradient(135deg, ${ACCENT_COLORS[i % ACCENT_COLORS.length]}10, hsl(var(--muted) / 0.15))`,
                      border: `1px solid ${ACCENT_COLORS[i % ACCENT_COLORS.length]}25`,
                    }}
                  >
                    <p className="mb-1.5 text-[10px] font-black uppercase tracking-[0.25em]"
                      style={{ color: ACCENT_COLORS[i % ACCENT_COLORS.length] }}>
                      {entry.word}
                    </p>
                    <p className="text-sm leading-relaxed text-foreground/80">{entry.story}</p>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Completion */}
              <AnimatePresence>
                {isComplete && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="rounded-xl p-5 text-center"
                    style={{
                      background: 'linear-gradient(135deg, hsl(var(--villa-gameroom) / 0.15), hsl(var(--villa-gameroom-2) / 0.1))',
                      border: '1px solid hsl(var(--villa-gameroom) / 0.3)',
                    }}
                  >
                    <Trophy size={28} className="mx-auto mb-2" style={{ color: 'hsl(var(--villa-gameroom))' }} />
                    <p className="text-lg font-black text-foreground">All Found!</p>
                    <p className="mt-1 text-sm text-muted-foreground">Completed in {formatTime(timeElapsed)}</p>
                    <Button onClick={resetGame} variant="outline" className="mt-3 gap-2">
                      <RotateCcw size={14} /> Play Again
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default WordSearchGame;
