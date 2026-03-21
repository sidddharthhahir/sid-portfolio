import { useEffect, useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { RotateCcw, Search, Timer, X } from 'lucide-react';
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

const WordSearchGame = ({ isActive, onComplete }: WordSearchGameProps) => {
  const [puzzle, setPuzzle] = useState<PuzzleData>(() => buildPuzzle());
  const [selectionStart, setSelectionStart] = useState<Position | null>(null);
  const [selectedPath, setSelectedPath] = useState<Position[]>([]);
  const [foundWords, setFoundWords] = useState<string[]>([]);
  const [storyFeed, setStoryFeed] = useState<Array<{ word: string; story: string }>>([]);
  const [isSelecting, setIsSelecting] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [timerStarted, setTimerStarted] = useState(false);

  useEffect(() => {
    if (!isActive || !timerStarted || foundWords.length === puzzle.words.length) return;

    const interval = window.setInterval(() => {
      setTimeElapsed((current) => current + 1);
    }, 1000);

    return () => window.clearInterval(interval);
  }, [isActive, timerStarted, foundWords.length, puzzle.words.length]);

  useEffect(() => {
    if (isActive) {
      const freshPuzzle = buildPuzzle();
      setPuzzle(freshPuzzle);
      setSelectionStart(null);
      setSelectedPath([]);
      setFoundWords([]);
      setStoryFeed([]);
      setIsSelecting(false);
      setTimeElapsed(0);
      setTimerStarted(false);
    }
  }, [isActive]);

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

  const resetGame = () => {
    const freshPuzzle = buildPuzzle();
    setPuzzle(freshPuzzle);
    setSelectionStart(null);
    setSelectedPath([]);
    setFoundWords([]);
    setStoryFeed([]);
    setIsSelecting(false);
    setTimeElapsed(0);
    setTimerStarted(false);
  };

  const resolveSelection = (path: Position[]) => {
    if (!path.length) return;

    const selectedWord = path.map((position) => puzzle.board[position.row][position.col]).join('');
    const reverseWord = selectedWord.split('').reverse().join('');

    const matchedWord = puzzle.words.find(
      (wordData) => !foundWords.includes(wordData.word) && (wordData.word === selectedWord || wordData.word === reverseWord),
    );

    if (matchedWord) {
      VibrationManager.correctMatch();
      setFoundWords((current) => [...current, matchedWord.word]);
      setStoryFeed((current) => [...current, { word: matchedWord.word, story: matchedWord.story }]);
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

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/85 p-4 backdrop-blur-xl animate-fade-in">
      <div
        className="w-full max-w-6xl overflow-y-auto rounded-[2rem] border border-border bg-card/95 p-6 shadow-2xl md:p-8"
        style={{ boxShadow: '0 30px 80px -35px hsl(var(--villa-gameroom) / 0.55)' }}
      >
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-border bg-muted/40 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
              <Search size={12} />
              Hidden Stories
            </div>
            <h3 className="text-3xl font-black tracking-tight text-foreground md:text-4xl">Word Search Challenge</h3>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
              Drag across the grid to find project keywords. Every solved word unlocks a quick story about my work.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start">
            <Button variant="outline" className="gap-2" onClick={resetGame}>
              <RotateCcw size={16} />
              Reset
            </Button>
            <Button variant="outline" size="icon" onClick={onComplete} aria-label="Close word search">
              <X size={18} />
            </Button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)]">
          <Card className="border-border bg-background/50">
            <CardContent className="p-4 md:p-6">
              <div className="mb-5 flex flex-wrap items-center gap-3">
                <div className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-3 py-1 text-sm text-foreground">
                  <Timer size={14} />
                  {timeElapsed}s
                </div>
                <div className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-3 py-1 text-sm text-foreground">
                  {foundWords.length}/{puzzle.words.length} found
                </div>
              </div>

              <div className="grid grid-cols-10 gap-1.5 select-none touch-none" onPointerLeave={handlePointerEnd}>
                {puzzle.board.map((row, rowIndex) =>
                  row.map((letter, colIndex) => {
                    const position = { row: rowIndex, col: colIndex };
                    const cellKey = getCellKey(position);
                    const isFound = foundCellKeys.has(cellKey);
                    const isSelected = selectedCellKeys.has(cellKey);

                    return (
                      <button
                        key={cellKey}
                        type="button"
                        onPointerDown={() => handlePointerStart(position)}
                        onPointerEnter={() => handlePointerEnter(position)}
                        onPointerUp={handlePointerEnd}
                        className="aspect-square rounded-xl border text-sm font-bold transition-all duration-200 md:text-base"
                        style={{
                          borderColor: isFound || isSelected ? 'hsl(var(--villa-gameroom) / 0.7)' : 'hsl(var(--border))',
                          background: isFound
                            ? 'linear-gradient(135deg, hsl(var(--villa-gameroom) / 0.28), hsl(var(--villa-gameroom-2) / 0.18))'
                            : isSelected
                              ? 'linear-gradient(135deg, hsl(var(--primary) / 0.22), hsl(var(--secondary) / 0.16))'
                              : 'hsl(var(--muted) / 0.4)',
                          color: 'hsl(var(--foreground))',
                          boxShadow: isFound ? '0 0 0 1px hsl(var(--villa-gameroom) / 0.18), 0 12px 24px -16px hsl(var(--villa-gameroom) / 0.7)' : 'none',
                        }}
                      >
                        {letter}
                      </button>
                    );
                  }),
                )}
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <Card className="border-border bg-background/50">
              <CardContent className="p-5">
                <h4 className="mb-3 text-lg font-bold text-foreground">Find these words</h4>
                <div className="flex flex-wrap gap-2">
                  {puzzle.words.map((wordData) => {
                    const found = foundWords.includes(wordData.word);
                    return (
                      <span
                        key={wordData.word}
                        className="rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em]"
                        style={{
                          borderColor: found ? 'hsl(var(--villa-gameroom) / 0.6)' : 'hsl(var(--border))',
                          background: found ? 'hsl(var(--villa-gameroom) / 0.14)' : 'hsl(var(--muted) / 0.35)',
                          color: found ? 'hsl(var(--foreground))' : 'hsl(var(--muted-foreground))',
                        }}
                      >
                        {wordData.word}
                      </span>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            <Card className="border-border bg-background/50">
              <CardContent className="p-5">
                <h4 className="mb-3 text-lg font-bold text-foreground">Unlocked stories</h4>
                {storyFeed.length ? (
                  <div className="space-y-3">
                    {storyFeed.map((entry) => (
                      <div key={entry.word} className="rounded-2xl border border-border bg-muted/30 p-4">
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">{entry.word}</p>
                        <p className="mt-2 text-sm leading-relaxed text-foreground">{entry.story}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    Start finding words to reveal mini stories behind the projects and systems in this portfolio.
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WordSearchGame;