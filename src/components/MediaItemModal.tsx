import React from 'react'
import { StyleSheet, View, Animated, Button, Pressable } from 'react-native'
import { useTheme } from 'react-native-paper/src/core/theming'
import { useNavigation, useRoute } from '@react-navigation/core'
import { useCardAnimation } from '@react-navigation/stack'
import { screenHeight } from '@/util/common'
import { SongType } from '@/mobx/types'
import playerStore from '@/mobx/player'

function MediaItemModal(): JSX.Element {
  const theme = useTheme()
  const navigation = useNavigation()
  const { params } = useRoute() as { params: SongType.SongProps }
  const height = screenHeight
  const current = useCardAnimation().current

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
      }}>
      <Pressable
        style={[StyleSheet.absoluteFill, { opacity: 0.5 }]}
        onPress={() => navigation.goBack()}
      />
      <Animated.View
        style={[
          {
            width: '100%',
            height: height,
            transform: [
              {
                translateY: current.progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: [height, height * 0.5],
                  extrapolate: 'clamp'
                })
              }
            ]
          }
        ]}>
        <View
          style={{
            flex: 1,
            padding: 10,
            backgroundColor: theme.colors.background,
            borderRadius: 20
          }}>
          <Button
            title="add to next play"
            onPress={async () => {
              playerStore.setNextTrack(params)
              navigation.goBack()
            }}
          />
        </View>
      </Animated.View>
    </View>
  )
}

export default MediaItemModal
