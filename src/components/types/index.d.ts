import { SongType } from '@/jotai/types'
import {
  GestureResponderEvent,
  NativeSyntheticEvent,
  TextInputSubmitEditingEventData
} from 'react-native'

declare namespace RippleIconType {
  interface RippleIconProps {
    iconName: string
    color?: string
    shown?: boolean
    onPress?: (event: GestureResponderEvent) => void
  }
}

declare namespace IconInputType {
  interface IconInputProps {
    iconName: string
    placeholder?: string
    onSubmit?:
      | ((e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => void)
      | undefined
    onIconPress?: (event: GestureResponderEvent) => void
  }
}

declare namespace MediaItemType {
  interface MediaItemProps {
    position: number
    songInfo: SongType.SongProps
    onPress?: Function
  }
}
