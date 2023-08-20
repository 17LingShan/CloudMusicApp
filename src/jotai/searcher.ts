import { atom } from 'jotai'
import { AlbumType, BannerType, SongType } from './types'

export const SearchKeywordsAtom = atom<string>('')
export const SearchListAtom = atom<SongType.SongList>([])
export const BannerAtom = atom<BannerType.BannerList>([])
export const HotAlbumListAtom = atom<AlbumType.AlbumList>([])
