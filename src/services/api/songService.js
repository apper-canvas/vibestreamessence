import songsData from "@/services/mockData/songs.json"

class SongService {
  constructor() {
    this.songs = [...songsData]
  }

  async getAll() {
    await this.delay(300)
    return [...this.songs]
  }

  async getById(id) {
    await this.delay(200)
    return this.songs.find(song => song.id === id) || null
  }

  async getByGenre(genre) {
    await this.delay(250)
    return this.songs.filter(song => song.genre === genre)
  }

  async search(query) {
    await this.delay(200)
    if (!query.trim()) return []
    
    const searchTerm = query.toLowerCase()
    return this.songs.filter(song =>
      song.title.toLowerCase().includes(searchTerm) ||
      song.artist.toLowerCase().includes(searchTerm) ||
      song.album.toLowerCase().includes(searchTerm)
    )
  }

  async getTopCharts(limit = 10) {
    await this.delay(300)
    const sorted = [...this.songs].sort((a, b) => b.playCount - a.playCount)
    return sorted.slice(0, limit).map((song, index) => ({
      rank: index + 1,
      song,
      previousRank: index + 1 + Math.floor(Math.random() * 3) - 1
    }))
}

  async getPreviewUrl(id) {
    await this.delay(100)
    // Return preview-specific URL (10-second samples)
    // In production, these would be separate preview files
    const song = this.songs.find(s => s.id === id)
    if (!song) return null
    
    // Generate preview URL based on song ID for consistent previews
    return `https://cdn.vibestream.io/previews/song-${id}-preview.mp3`
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }
}

export default new SongService()