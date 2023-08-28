import { CommonActions, NavigationProp } from '@react-navigation/core'
import { SongType } from '@/mobx/types'
import { fetchUrlById } from '@/api/search'
import { playTrack } from './playTool'

export function formatCount(originNum: number) {
  return originNum > 10000
    ? (originNum / 10000).toFixed(1).toString() + '万'
    : originNum
}

export function handlePressModalIcon(
  navigation: NavigationProp<ReactNavigation.RootParamList>,
  songInfo: SongType.SongProps
) {
  navigation.dispatch(
    CommonActions.navigate({ name: 'MediaItemModal', params: songInfo })
  )
}

export async function handlePressItem(
  navigation: NavigationProp<ReactNavigation.RootParamList>,
  songInfo: SongType.SongProps
) {
  await playTrack(songInfo)
  navigation.dispatch(CommonActions.navigate('playDetail'))
}

export function formatMinute(second: number): string {
  return `${Math.floor(second / 60)
    .toString()
    .padStart(2, '0')}:${Math.floor(second % 60)
    .toString()
    .padStart(2, '0')}`
}

export async function fetchSongInfo({ id, level }: APIParams.FetchUrlParam) {
  let url: string | undefined = await fetchUrlById({ id: id, level: level })
    .then(res => {
      console.log('fetchSongInfo res', res.data.code)
      return res.data.code !== 200 ? url : res.data.data[0].url
    })
    .catch(err => {
      console.log('fetchSongInfoErr', err)
      return url
    })

  return url ? Promise.resolve(url) : Promise.reject(url)
}

/**
 * origin:
 * [00:00.000] 作词 : 陈镇川\n[00:01.000] 作曲 : Eric Kwok\n[00:02.000] 编曲 : Swing\n[00:12.850]半夜三更还在讲电话\n[00:15.930]你没有勇气说出那句话\n[00:18.860]相信未来你已有计划\n[00:22.210]左等右等只差一个说法\n[00:25.300]挂掉了电话 拨乱了头发\n[00:28.180]我们的世界已没有时差\n[00:31.210]防备已放假 心不再挣扎\n[00:34.240]摒住呼吸告诉他 我是多么地中意他\n[00:38.860]没有害怕 每次约会\n[00:41.970]心中总会有火花\n[00:42.920]梦见一幅画 有我和他\n[00:46.530]微笑的我 穿着长长的白纱\n[00:49.680]Da-la-di-la 中意他 中意他 他的步伐\n[00:53.500]让我的世界 起了大变化\n[00:55.760]Da-la-di-la 中意他 中意他 他的胡渣\n[00:59.700]幻想一个家 为他生一个胖娃娃\n[01:03.350]\n[01:14.200]半夜三更还在讲电话\n[01:17.900]绕了半天说不出我爱他\n[01:20.180]喜欢他的安静不多话\n[01:23.289]现在却怪他怎么那么傻\n[01:26.450]挂掉了电话 拨乱了头发\n[01:29.500]我们的世界已没有时差\n[01:32.509]防备已放假 心不再挣扎\n[01:35.560]摒住呼吸告诉他 我是多么地中意他\n[01:40.180]没有害怕 每次约会\n[01:43.320]心中总会有火花\n[01:44.890]梦见一幅画 有我和他\n[01:48.900]微笑的我 穿着长长的白纱\n[01:51.300]Da-la-di-la 中意他 中意他 他的步伐\n[01:54.410]让我的世界 起了大变化\n[01:57.0]Da-la-di-la 中意他 中意他 他的胡渣\n[02:00.560]幻想一个家 为他生一个胖娃娃\n[02:05.970]\n[02:14.670]多么多么地中意他\n[02:17.210]没有害怕 每次约会\n[02:20.270]心中总会有火花\n[02:21.720]梦见一幅画 有我和他\n[02:24.510]微笑的我 穿着长长的白纱\n[02:27.650]Da-la-di-la 中意他 中意他 他的步伐\n[02:31.500]让我的世界 起了大变化\n[02:33.770]Da-la-di-la 中意他 中意他 他的胡渣\n[02:37.900]幻想一个家 为他生一个胖娃娃\n[02:42.640]\n
 *
 * format:
 * [
 *    {time:00:00.000, text: 作词 : 陈镇川}
 * ]
 */
export function formatLyric(lyric: string): SongType.LyricItem[] {
  const reg = /\[(\d{2}:\d{2}.\d{3})\]\s(.+)/g
  const formattedLyric = lyric.split('\n').map(item => {
    const formattedString = item.match(reg)
    return {
      time: formattedString[1],
      text: formattedString[2]
    }
  })

  return formattedLyric
}
