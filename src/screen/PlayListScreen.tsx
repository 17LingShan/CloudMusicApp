import { useCallback, useState } from 'react'

function PlayListScreen(): JSX.Element {
  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = useCallback(() => {
    setRefreshing(true)
    setTimeout(() => {
      setRefreshing(false)
    }, 2000)
  }, [])

  return <></>
}

export default PlayListScreen
