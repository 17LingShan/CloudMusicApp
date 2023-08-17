import { GestureResponderEvent } from 'react-native'

declare namespace RippleIconType {
  interface RippleIconProps {
    iconName: string
    shown?: boolean
    onPress?: (event: GestureResponderEvent) => void
  }
}

declare namespace IconInputType {
  interface IconInputProps {
    iconName: string
    value: string
    change: React.Dispatch<React.SetStateAction<string>>
    onIconPress?: (event: GestureResponderEvent) => void
  }
}

declare namespace MediaItemType {
  interface MediaItemProps {
    position: number
    key?: string
    MediaName: string
    description?: string
  }
}
