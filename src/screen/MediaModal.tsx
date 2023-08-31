import React from 'react'
import { StyleSheet, View, Animated, Button, Pressable } from 'react-native'
import { useTheme } from 'react-native-paper/src/core/theming'
import { useNavigation, useRoute } from '@react-navigation/core'
import { useCardAnimation } from '@react-navigation/stack'
import { screenHeight } from '@/util/common'
import { SongType } from '@/mobx/types'
import ModalItem from '@/components/ModalItem'

function MediaModal(): JSX.Element {
  const navigation = useNavigation()
  const { params } = useRoute() as { params: SongType.SongProps }

  const current = useCardAnimation().current
  const viewInterpolation = current.progress.interpolate({
    inputRange: [0, 1],
    outputRange: [screenHeight, screenHeight * 0.7],
    extrapolate: 'clamp'
  })

  return (
    <>
      <Pressable
        style={[
          StyleSheet.absoluteFill,
          { opacity: 0.5, backgroundColor: '#000' }
        ]}
        onPress={() => navigation.goBack()}
      />
      <Animated.View
        style={[
          {
            width: '100%',
            height: screenHeight,
            transform: [
              {
                translateY: viewInterpolation
              }
            ]
          }
        ]}>
        <ModalItem trackInfo={params} />
      </Animated.View>
    </>
  )
}

export default MediaModal
