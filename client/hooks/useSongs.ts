import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { addSong, deleteSong, getSongsByCollection } from '../apis/songs.ts'
import { SongData } from '../../models/songs.ts'
import { useAuth0 } from '@auth0/auth0-react'

export function useSongsByCollection(collectionId: number) {
  return useQuery({
    queryKey: ['songs', collectionId],
    queryFn: () => getSongsByCollection(collectionId),
  })
}

export function useAddSong() {
  const qc = useQueryClient()
  const { getAccessTokenSilently } = useAuth0()

  return useMutation({
    mutationFn: async (input: SongData) => {
      const token = await getAccessTokenSilently()
      return addSong({ input, token })
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['songs'] }),
  })
}

interface Params {
  collectionId: number
  songId: number
}
export function useDeleteSong() {
  const { getAccessTokenSilently } = useAuth0()
  const client = useQueryClient()
  return useMutation({
    mutationFn: async ({ collectionId, songId }: Params) => {
      const token = await getAccessTokenSilently()
      return deleteSong({ collectionId, songId, token })
    },
    onSuccess: () => client.invalidateQueries({ queryKey: ['songs'] }),
  })
}
