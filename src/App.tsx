import { useEffect } from 'react'
import './App.css'
import Header from './components/header/Header'
import ScreenRouter from './components/screens'
import chromeStorage from './utils/chromeStorage'
import useUserStore from './store/user'
import useChatStore from './store/chat'

function App() {
  const { user, getUser } = useUserStore()
  const { getHistory } = useChatStore()

  const init = async () => {
    const { access } = await chromeStorage.get(['access'])

    if (access) {
      getUser()
    }

    getHistory()
  }

  useEffect(() => {
    init()
  }, [])

  return (
    <>
      <Header />
      <ScreenRouter />
    </>
  )
}

export default App
