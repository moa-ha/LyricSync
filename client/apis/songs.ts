import request from 'superagent'
import { Lyrics } from '../../models/songs'

const rootUrl = '/api/v1'

export async function getLyrics(
  songId: number,
  collectionId: number,
): Promise<Lyrics | undefined> {
  try {
    const res = await request.get(
      rootUrl + `/collections/${collectionId}/${songId}`,
    )

    if (!res.ok) {
      throw new Error(`Failed to fetch lyrics (${res.status}): ${res.error}`)
    }

    return res.body as Lyrics
  } catch (error) {
    console.error('Error fetching lyrics:', error)
    throw new Error('Failed to fetch lyrics. Please try again.')
  }
}