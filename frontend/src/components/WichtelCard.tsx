import React from 'react';

interface WichtelCardProps {
  receiverName: string;
  isRevealed: boolean;
  onReveal: () => void;
}

export const WichtelCard: React.FC<WichtelCardProps> = ({
  receiverName,
  isRevealed,
  onReveal,
}) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-red-400 via-red-300 to-green-400 p-4">
      <div className="backdrop-blur-md bg-white/20 rounded-2xl shadow-2xl p-12 max-w-md w-full border border-white/30">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">🎄🎁❄️</div>
          <h1 className="text-4xl font-bold text-white mb-2">Ho ho ho! 🎅</h1>
          <p className="text-xl text-white/90">You are the Wichtel for:</p>
        </div>

        {isRevealed ? (
          <div className="mb-8 animate-bounce">
            <div className="bg-gradient-to-r from-yellow-300 to-red-500 rounded-xl p-8 shadow-lg">
              <p className="text-3xl font-bold text-white text-center break-words">
                🎁 {receiverName} 🎁
              </p>
            </div>
          </div>
        ) : (
          <div className="mb-8">
            <div className="bg-white/30 rounded-xl p-8 shadow-lg">
              <p className="text-xl text-white text-center font-semibold">
                Click below to reveal your Wichtel!
              </p>
            </div>
          </div>
        )}

        {!isRevealed && (
          <button
            onClick={onReveal}
            className="w-full bg-gradient-to-r from-red-500 to-green-600 hover:from-red-600 hover:to-green-700 text-white font-bold py-4 px-6 rounded-lg transition-all transform hover:scale-105 active:scale-95 text-lg shadow-lg"
          >
            🎄 Reveal 🎄
          </button>
        )}

        {isRevealed && (
          <p className="text-center text-white/80 text-sm">
            ✨ Happy Wichteling! ✨
          </p>
        )}
      </div>
    </div>
  );
};
