declare namespace TabNavigatorType {
  interface RenderIconProps {
    focused: boolean
    color: string
    size: number
  }

  interface HandleIcon {
    (iconName: string): (props: RenderIconProps) => React.ReactNode
  }
}
