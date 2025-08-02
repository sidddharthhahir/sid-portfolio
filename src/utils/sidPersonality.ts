
export interface SidMessage {
  text: string;
  mood: 'confident' | 'surprised' | 'playful' | 'encouraging' | 'celebrating' | 'thinking';
  emoji?: string;
}

export class SidPersonality {
  private static gameStartMessages: SidMessage[] = [
    { text: "Let's see what you've got!", mood: 'confident', emoji: '😏' },
    { text: "Ready to challenge the master?", mood: 'playful', emoji: '🎯' },
    { text: "Hope you're ready for this!", mood: 'confident', emoji: '💪' }
  ];

  private static strongMoveMessages: SidMessage[] = [
    { text: "Whoa, you're good! But I'm just getting started", mood: 'surprised', emoji: '😏' },
    { text: "Nice move! You're making me think harder", mood: 'encouraging', emoji: '🤔' },
    { text: "Impressive! But can you keep it up?", mood: 'playful', emoji: '👀' },
    { text: "Okay, you've got skills. Game on!", mood: 'confident', emoji: '🔥' }
  ];

  private static weakMoveMessages: SidMessage[] = [
    { text: "Hmm, are you sure about that move?", mood: 'playful', emoji: '🤨' },
    { text: "I see an opening... thanks!", mood: 'confident', emoji: '😈' },
    { text: "That's... an interesting choice", mood: 'playful', emoji: '🤭' }
  ];

  private static sidWinMessages: SidMessage[] = [
    { text: "Sid wins! Better luck next time, champ!", mood: 'celebrating', emoji: '🏆' },
    { text: "Victory is mine! Want a rematch?", mood: 'celebrating', emoji: '👑' },
    { text: "Too easy! But you played well", mood: 'confident', emoji: '😎' },
    { text: "The AI reign continues! GG!", mood: 'celebrating', emoji: '🤖' }
  ];

  private static userWinMessages: SidMessage[] = [
    { text: "You got me this time! Well played", mood: 'encouraging', emoji: '👏' },
    { text: "Impressive victory! I'll get you next time", mood: 'playful', emoji: '😤' },
    { text: "You've bested the AI! Enjoy the moment", mood: 'encouraging', emoji: '🎉' }
  ];

  private static drawMessages: SidMessage[] = [
    { text: "A tie? I guess we're evenly matched!", mood: 'playful', emoji: '🤝' },
    { text: "Draw! You're getting better at this", mood: 'encouraging', emoji: '⚖️' },
    { text: "Stalemate! Neither of us backing down", mood: 'confident', emoji: '🤜🤛' }
  ];

  private static thinkingMessages: SidMessage[] = [
    { text: "Let me calculate the perfect move...", mood: 'thinking', emoji: '🤔' },
    { text: "Analyzing your strategy... interesting", mood: 'thinking', emoji: '🧠' },
    { text: "Processing... this requires careful thought", mood: 'thinking', emoji: '⚡' }
  ];

  static getRandomMessage(category: 'gameStart' | 'strongMove' | 'weakMove' | 'sidWin' | 'userWin' | 'draw' | 'thinking'): SidMessage {
    let messages: SidMessage[];
    
    switch (category) {
      case 'gameStart':
        messages = this.gameStartMessages;
        break;
      case 'strongMove':
        messages = this.strongMoveMessages;
        break;
      case 'weakMove':
        messages = this.weakMoveMessages;
        break;
      case 'sidWin':
        messages = this.sidWinMessages;
        break;
      case 'userWin':
        messages = this.userWinMessages;
        break;
      case 'draw':
        messages = this.drawMessages;
        break;
      case 'thinking':
        messages = this.thinkingMessages;
        break;
      default:
        messages = this.gameStartMessages;
    }

    return messages[Math.floor(Math.random() * messages.length)];
  }

  static evaluateMove(board: (string | null)[], moveIndex: number, player: 'X' | 'O'): 'strong' | 'weak' | 'normal' {
    // Simple heuristic to evaluate if a move is strong or weak
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6] // diagonals
    ];

    // Check if move creates a win threat or blocks opponent win
    for (const line of lines) {
      if (line.includes(moveIndex)) {
        const lineValues = line.map(i => board[i]);
        const playerCount = lineValues.filter(v => v === player).length;
        const opponentCount = lineValues.filter(v => v === (player === 'X' ? 'O' : 'X')).length;
        const emptyCount = lineValues.filter(v => v === null).length;

        // Strong move: creates win threat or blocks opponent win
        if ((playerCount === 2 && emptyCount === 1) || (opponentCount === 2 && emptyCount === 1)) {
          return 'strong';
        }
      }
    }

    // Weak move: doesn't contribute to strategy (corners and center are usually good)
    if (moveIndex === 4) return 'strong'; // Center
    if ([0, 2, 6, 8].includes(moveIndex)) return 'normal'; // Corners
    if ([1, 3, 5, 7].includes(moveIndex)) return 'weak'; // Edges

    return 'normal';
  }
}
