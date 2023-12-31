import { useEffect, useRef, useState } from 'react'
import { Button, Image, StyleSheet, View } from 'react-native'
import { CommonActions, useNavigation } from '@react-navigation/core'
import { observer } from 'mobx-react'
import UserStore from '@/mobx/user'
import { showToastCommon, showToastErr } from '@/util/common'
import { checkQRState, fetchQRImage, fetchQRKey } from '@/api/user'
import CoverImg from '@/assets/cover.jpg'

function LoginScreen(): JSX.Element {
  const navigation = useNavigation()

  const [QRkey, setQRkey] = useState('')
  const [QRImage, setQRImage] = useState('')
  const [noCookie, setNoCookie] = useState(false)

  const intervalRef = useRef(null)
  const handleFetchQRKey = async () => {
    console.log(1)
    await fetchQRKey()
      .then(async res => {
        setQRkey(res.data.data.unikey)
        console.log('unikey', res.data.data.unikey.slice(0, 10))
        await handleFetchQRImage(res.data.data.unikey)
      })
      .catch(() => {
        console.log('获取二维码key失败！')
      })
  }

  const handleFetchQRImage = async (key: string) => {
    await fetchQRImage({ key: key })
      .then(res => {
        setQRImage(res.data.data.qrimg)
        console.log('qrImageURL', res.data.data)
      })
      .catch(() => {
        console.log('获取二维码url失败！')
      })
  }

  const handleCheckQRState = async () => {
    console.log('qrkey in checkState', QRkey)
    if (!QRkey) return
    await checkQRState({ key: QRkey, noCookie: noCookie })
      .then(res => {
        showToastCommon({
          message: `登录状态：${res.data.code}，登录信息: ${res.data.message}`,
          gravity: 'top'
        })
        switch (res.data.code) {
          case 801:
            break
          case 802:
            break
          case 803:
            UserStore.setCookie(res.data.cookie)
            navigation.dispatch(CommonActions.navigate('stack_home'))
            break
          default:
            showToastErr({ message: '未知登录状态！' })
            break
        }
      })
      .catch(err => {
        setNoCookie(true)
        console.log('checkErr', err.data)
      })
  }

  const handleQRLogin = async () => {
    await handleFetchQRKey()
  }

  useEffect(() => {
    clearInterval(intervalRef.current)
    if (QRkey) intervalRef.current = setInterval(handleCheckQRState, 4000)
    return () => {
      clearInterval(intervalRef.current)
    }
  }, [QRkey])

  return (
    <>
      <View style={style.loginWrap}>
        <Button
          title="获取二维码"
          onPress={async () => await handleQRLogin()}
        />
        {
          <Image
            style={style.imgContainer}
            source={
              QRImage
                ? {
                    uri: QRImage
                  }
                : CoverImg
            }
          />
        }
      </View>
    </>
  )
}

const style = StyleSheet.create({
  loginWrap: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  imgContainer: { height: 200, width: 200 }
})

export default observer(LoginScreen)
