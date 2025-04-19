import React from 'react';
import { Player } from '@lottiefiles/react-lottie-player';

interface AchievementPopupProps {
  title: string;
  message: string;
  onClose: () => void;
}

export function AchievementPopup({ title, message, onClose }: AchievementPopupProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 transform animate-bounce">
        <Player
          autoplay
          loop
          src="https://lottie.host/94412260-ff92-4113-a480-27ae6a5cd6c7/QozV8EB52m.lottie.json"
          style={{ height: '200px', width: '200px' }}
        />
        <h3 className="text-2xl font-bold text-center mb-2">{title}</h3>
        <p className="text-gray-600 text-center mb-6">{message}</p>
        <button
          onClick={onClose}
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors"
        >
          Awesome!
        </button>
      </div>
    </div>
  );
}