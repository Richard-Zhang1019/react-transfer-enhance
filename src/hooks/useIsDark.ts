import { useContext } from 'react'
import ThemeColorContext from '@/contexts/ThemeColor'

export default () => {
  const { themeColor } = useContext(ThemeColorContext)

  return themeColor === 'theme-dark'
}
