import { Box } from '@chakra-ui/react'
import { useState } from 'react'
import { useRoutes } from 'react-router-dom'
import { ConfigProvider, theme } from 'antd'

import Header from '@/components/Header'
import routes from '@/router'
import ThemeColor from '@/contexts/ThemeColor'
import useIsDark from './hooks/useIsDark'

function App() {
  const isDark = useIsDark()
  const [themeColor, setThemeColor] = useState('theme-light')
  const contextValue = {
    themeColor,
    setThemeColor
  }

  return (
    <ThemeColor.Provider value={contextValue}>
      <ConfigProvider
        theme={{
          algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm
        }}
      >
        <Box className="App" minH="100vh" overflowX="hidden">
          <Header />
          {useRoutes(routes)}
        </Box>
      </ConfigProvider>
    </ThemeColor.Provider>
  )
}

export default App
