import { Text, View } from 'react-native'
import { atom, useAtom } from 'jotai'
const friendAtom = atom({ name: 'string', age: 18 })

function StackPlay(): JSX.Element {
  const [friend, setFriend] = useAtom(friendAtom)

  return (
    <>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center'
        }}>
        <Text
          style={{ fontSize: 48 }}
          onPress={() => {
            setFriend(prev => ({ ...prev, age: prev.age + 1 }))
          }}>
          {friend.age}
        </Text>
      </View>
    </>
  )
}

export default StackPlay
