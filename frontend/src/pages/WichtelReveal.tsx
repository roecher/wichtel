import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { WichtelCard } from '../components/WichtelCard';
import { Assignment } from '../types';

export const WichtelReveal: React.FC = () => {
  const { token } = useParams<{ token: string }>();
  const [assignment, setAssignment] = useState<Assignment | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadAssignment = async () => {
      try {
        const response = await fetch('/data/assignments.json');
        if (!response.ok) {
          throw new Error('Failed to load assignments');
        }
        const data = await response.json();
        
        const found = data.assignments.find(
          (a: Assignment) => a.token === token
        );
        
        if (found) {
          setAssignment(found);
        } else {
          setError('This link is not valid. Please check with the organizer.');
        }
      } catch (err) {
        setError('An error occurred. Please try again later.');
        console.error('Error loading assignments:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadAssignment();
  }, [token]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-red-400 via-red-300 to-green-400">
        <div className="backdrop-blur-md bg-white/20 rounded-2xl shadow-2xl p-12 text-center">
          <div className="text-4xl mb-4">🎄</div>
          <p className="text-white text-xl">Loading your gift...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-red-400 via-red-300 to-green-400 p-4">
        <div className="backdrop-blur-md bg-white/20 rounded-2xl shadow-2xl p-12 max-w-md w-full border border-white/30 text-center">
          <div className="text-6xl mb-6">❌</div>
          <h1 className="text-2xl font-bold text-white mb-4">Oops!</h1>
          <p className="text-lg text-white/90">{error}</p>
        </div>
      </div>
    );
  }

  if (!assignment) {
    return null;
  }

  return (
    <WichtelCard
      receiverName={assignment.receiverName}
      isRevealed={isRevealed}
      onReveal={() => setIsRevealed(true)}
    />
  );
};
