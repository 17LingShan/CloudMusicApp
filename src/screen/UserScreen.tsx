import UserTitle from '@/components/User/UserTitle'
import { handleAccountInfo } from '@/util/common'
import { useCallback, useEffect, useState } from 'react'
import { RefreshControl, ScrollView, View } from 'react-native'

function UserScreen(): JSX.Element {
  const [refreshing, setRefreshing] = useState(false)

  const handleRefresh = useCallback(async () => {
    setRefreshing(true)
    await handleAccountInfo()
    setRefreshing(false)
  }, [])

  useEffect(() => {
    handleRefresh()
  }, [])

  return (
    <>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }>
        <View>
          <UserTitle />
        </View>
      </ScrollView>
    </>
  )
}

export default UserScreen
