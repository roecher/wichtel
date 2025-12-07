import React from 'react';

export const Home: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-red-400 via-red-300 to-green-400 p-4">
      <div className="backdrop-blur-md bg-white/20 rounded-2xl shadow-2xl p-12 max-w-md w-full border border-white/30 text-center">
        <div className="text-6xl mb-6">🎄🎁❄️</div>
        <h1 className="text-4xl font-bold text-white mb-4">Wichteln 2025</h1>
        <p className="text-xl text-white/90 leading-relaxed">
          You should have received a personal link. Open it to discover who you're gifting! 🎅
        </p>
        <div className="mt-8 pt-6 border-t border-white/30">
          <p className="text-sm text-white/70">
            ✨ Happy Wichteling! ✨
          </p>
        </div>
      </div>
    </div>
  );
};
