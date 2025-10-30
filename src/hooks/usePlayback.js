import { useState, useEffect, useRef, useCallback } from 'react'

const usePlayback = () => {
  const audioRef = useRef(null)
  const [currentSong, setCurrentSong] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [volume, setVolume] = useState(0.7)
  const [hasPlayedFreeSong, setHasPlayedFreeSong] = useState(false)

  // Load initial state from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('vibestream_playback')
    if (saved) {
      const parsed = JSON.parse(saved)
      setHasPlayedFreeSong(parsed.hasPlayedFreeSong || false)
      setVolume(parsed.volume || 0.7)
    }
  }, [])

  // Save state to localStorage
  useEffect(() => {
    const state = {
      hasPlayedFreeSong,
      volume
    }
    localStorage.setItem('vibestream_playback', JSON.stringify(state))
  }, [hasPlayedFreeSong, volume])

  // Initialize audio element
  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio()
      audioRef.current.preload = 'metadata'
      
      const updateTime = () => setCurrentTime(audioRef.current.currentTime)
      const handleEnded = () => setIsPlaying(false)
      
      audioRef.current.addEventListener('timeupdate', updateTime)
      audioRef.current.addEventListener('ended', handleEnded)
      
      return () => {
        audioRef.current?.removeEventListener('timeupdate', updateTime)
        audioRef.current?.removeEventListener('ended', handleEnded)
      }
    }
  }, [])

  // Update volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume
    }
  }, [volume])

  const playSong = useCallback((song) => {
    if (!audioRef.current) return false
    
    // Check if user already played their free song
    if (hasPlayedFreeSong && (!currentSong || currentSong.id !== song.id)) {
      return false // Blocked - trigger modal
    }

    // If switching songs, mark as played
    if (!currentSong || currentSong.id !== song.id) {
      setCurrentSong(song)
      setHasPlayedFreeSong(true)
      audioRef.current.src = song.audioUrl
      audioRef.current.load()
    }

    audioRef.current.play()
      .then(() => setIsPlaying(true))
      .catch(console.error)
    
    return true
  }, [currentSong, hasPlayedFreeSong])

  const pauseSong = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause()
      setIsPlaying(false)
    }
  }, [])

  const togglePlayback = useCallback(() => {
    if (isPlaying) {
      pauseSong()
    } else if (currentSong) {
      playSong(currentSong)
    }
  }, [isPlaying, currentSong, playSong, pauseSong])

  const seekTo = useCallback((time) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time
      setCurrentTime(time)
    }
  }, [])

  const getDuration = useCallback(() => {
    return audioRef.current?.duration || 0
  }, [])

  return {
    currentSong,
    isPlaying,
    currentTime,
    volume,
    hasPlayedFreeSong,
    playSong,
    pauseSong,
    togglePlayback,
    seekTo,
    getDuration,
    setVolume
  }
}

export default usePlayback