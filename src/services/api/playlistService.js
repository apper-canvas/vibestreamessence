import playlistsData from "@/services/mockData/playlists.json"
import songsData from "@/services/mockData/songs.json"

class PlaylistService {
  constructor() {
    this.playlists = [...playlistsData]
    this.songs = [...songsData]
  }

  async getAll() {
    await this.delay(300)
    return [...this.playlists]
  }

  async getById(id) {
    await this.delay(200)
    const playlist = this.playlists.find(p => p.id === id)
    if (!playlist) return null

    // Populate songs
    const fullSongs = playlist.songs
      .map(songId => this.songs.find(s => s.id === songId))
      .filter(Boolean)

    return {
      ...playlist,
      songs: fullSongs
    }
  }

  async getTrending(limit = 8) {
    await this.delay(300)
    // Simulate trending by shuffling and taking first items
    const shuffled = [...this.playlists].sort(() => Math.random() - 0.5)
    return shuffled.slice(0, limit)
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }
}

export default new PlaylistService()