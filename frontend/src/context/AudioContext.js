import React, { createContext, useState, useEffect } from 'react';

// Create a context
export const AudioContext = createContext();

// Create a provider component
export const AudioProvider = ({ children }) => {
  const [audioData, setAudioData] = useState(() => {
    const savedAudioData = localStorage.getItem('audioData');
    return savedAudioData ? JSON.parse(savedAudioData) : [
      { id: 1, title: 'Lecture 1', url: '/audios/audio1.mp3', courseId: 33, level: 100, faculty: 'Faculty of Engineering' },
      { id: 2, title: 'Lecture 2', url: '/audios/audio2.mp3', courseId: 34, level: 200, faculty: 'Faculty of Engineering' },
      { id: 3, title: 'Lecture 3', url: '/audios/audio3.mp3', courseId: 2, level: 100, faculty: 'Faculty of Arts' },
      { id: 4, title: 'Lecture 4', url: '/audios/audio4.mp3', courseId: 2, level: 200, faculty: 'Faculty of Arts' },
      // Add more audio data as needed
    ];
  });

  const [purchasedAudios, setPurchasedAudios] = useState(() => {
    const savedPurchasedAudios = localStorage.getItem('purchasedAudios');
    return savedPurchasedAudios ? JSON.parse(savedPurchasedAudios) : [];
  });

  useEffect(() => {
    localStorage.setItem('audioData', JSON.stringify(audioData));
  }, [audioData]);

  useEffect(() => {
    localStorage.setItem('purchasedAudios', JSON.stringify(purchasedAudios));
  }, [purchasedAudios]);

  const addAudio = (newAudio) => {
    console.log('Adding audio:', newAudio);
    setAudioData([...audioData, newAudio]);
  };

  const deleteAudio = (id) => {
    setAudioData(audioData.filter(audio => audio.id !== id));
  };

  const purchaseAudio = (audioId) => {
    setPurchasedAudios([...purchasedAudios, audioId]);
  };

  return (
    <AudioContext.Provider value={{ audioData, purchasedAudios, addAudio, deleteAudio, purchaseAudio }}>
      {children}
    </AudioContext.Provider>
  );
};

export default AudioProvider;