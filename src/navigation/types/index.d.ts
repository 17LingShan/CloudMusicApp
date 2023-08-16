declare namespace TabNavigator {
  interface RenderIconProps {
    focused: boolean
    color: string
    size: number
  }

  interface HandleIcon {
    (name: string): (props: RenderIconProps) => React.ReactNode
  }
}
