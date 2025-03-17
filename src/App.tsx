import { useEffect } from 'react'
import './App.css'
import Header from './components/header/Header'
import ScreenRouter from './components/screens'
import chromeStorage from './utils/chromeStorage'
import useUserStore from './store/user'

function App() {
  const { getUser } = useUserStore()

  const init = async () => {
    const { access } = await chromeStorage.get(['access'])

    if (access) {
      getUser()
    }
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
