import artistsData from "@/services/mockData/artists.json"
import songsData from "@/services/mockData/songs.json"

class ArtistService {
  constructor() {
    this.artists = [...artistsData]
    this.songs = [...songsData]
  }

  async getAll() {
    await this.delay(300)
    return [...this.artists]
  }

  async getById(id) {
    await this.delay(200)
    const artist = this.artists.find(a => a.id === id)
    if (!artist) return null

    // Populate top songs
    const topSongs = artist.topSongs
      .map(songId => this.songs.find(s => s.id === songId))
      .filter(Boolean)

    return {
      ...artist,
      topSongs
    }
  }

  async getFeatured(limit = 6) {
    await this.delay(300)
    // Sort by follower count and return top artists
    const sorted = [...this.artists].sort((a, b) => b.followerCount - a.followerCount)
    return sorted.slice(0, limit)
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }
}

export default new ArtistService()