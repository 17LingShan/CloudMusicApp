import React, { useMemo } from 'react'
import { StyleSheet, Animated, Pressable } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/core'
import { useCardAnimation } from '@react-navigation/stack'
import { screenHeight } from '@/util/common'
import { SongType } from '@/mobx/types'
import ModalItem from '@/components/ModalItem'

function TrackModal(): JSX.Element {
  const navigation = useNavigation()
  const { params } = useRoute() as { params: SongType.SongProps }
  const current = useCardAnimation().current

  const viewInterpolation = useMemo(
    () =>
      current.progress.interpolate({
        inputRange: [0, 1],
        outputRange: [screenHeight, screenHeight * 0.7],
        extrapolate: 'clamp'
      }),
    []
  )

  return (
    <>
      <Pressable
        style={[StyleSheet.absoluteFill, style.modalWrap]}
        onPress={() => navigation.goBack()}
      />
      <Animated.View
        style={[{ transform: [{ translateY: viewInterpolation }] }]}>
        <ModalItem trackInfo={params} />
      </Animated.View>
    </>
  )
}

const style = StyleSheet.create({
  modalWrap: { opacity: 0.5, backgroundColor: '#000' }
})

export default TrackModal
