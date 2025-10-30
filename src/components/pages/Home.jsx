import { useState } from "react"
import { toast } from "react-toastify"
import Hero from "@/components/organisms/Hero"
import GenreGrid from "@/components/organisms/GenreGrid"
import TrendingPlaylists from "@/components/organisms/TrendingPlaylists"
import TopCharts from "@/components/organisms/TopCharts"
import FeaturedArtists from "@/components/organisms/FeaturedArtists"
import SearchSection from "@/components/organisms/SearchSection"
import MiniPlayer from "@/components/organisms/MiniPlayer"
import PlaybackLimitModal from "@/components/organisms/PlaybackLimitModal"
import StatusBanner from "@/components/molecules/StatusBanner"
import usePlayback from "@/hooks/usePlayback"

const Home = () => {
  const [showLimitModal, setShowLimitModal] = useState(false)
  const playback = usePlayback()

  const handlePlay = (song) => {
    const success = playback.playSong(song)
    if (!success) {
      setShowLimitModal(true)
    }
  }

  const handleSelectGenre = (genre) => {
    toast.info(`Browsing ${genre.name} music coming soon!`)
  }

  const handleViewPlaylist = (playlist) => {
    toast.info(`Viewing playlist "${playlist.name}" coming soon!`)
  }

  const handleViewArtist = (artist) => {
    toast.info(`Viewing artist "${artist.name}" coming soon!`)
  }

  const handleSignUp = () => {
    toast.success("Sign up feature coming soon! Thanks for your interest.")
    setShowLimitModal(false)
  }

  const handleLogin = () => {
    toast.success("Login feature coming soon! Thanks for your interest.")
    setShowLimitModal(false)
  }

  const handleGetStarted = () => {
    setShowLimitModal(true)
  }

  return (
    <div className="min-h-screen bg-background text-white">
      {/* Status Banner */}
      <StatusBanner 
        hasPlayedFreeSong={playback.hasPlayedFreeSong}
        onGetStarted={handleGetStarted}
      />

      {/* Main Content */}
      <div className={playback.hasPlayedFreeSong ? "pt-16" : "pt-12"}>
        <Hero />
        <GenreGrid onSelectGenre={handleSelectGenre} />
        <TrendingPlaylists onViewPlaylist={handleViewPlaylist} />
        <TopCharts 
          onPlay={handlePlay}
          currentSong={playback.currentSong}
          isPlaying={playback.isPlaying}
        />
        <FeaturedArtists onViewArtist={handleViewArtist} />
        <SearchSection 
          onPlay={handlePlay}
          currentSong={playback.currentSong}
          isPlaying={playback.isPlaying}
        />
      </div>

      {/* Mini Player */}
      <MiniPlayer
        currentSong={playback.currentSong}
        isPlaying={playback.isPlaying}
        currentTime={playback.currentTime}
        volume={playback.volume}
        onTogglePlayback={playback.togglePlayback}
        onSeek={playback.seekTo}
        onVolumeChange={playback.setVolume}
        getDuration={playback.getDuration}
      />

      {/* Playback Limit Modal */}
      <PlaybackLimitModal
        isOpen={showLimitModal}
        onClose={() => setShowLimitModal(false)}
        onSignUp={handleSignUp}
        onLogin={handleLogin}
      />

      {/* Bottom spacing for mini player */}
      <div className={playback.currentSong ? "h-20" : "h-0"} />
    </div>
  )
}

export default Home