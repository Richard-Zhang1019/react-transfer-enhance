import { Box, Flex } from '@chakra-ui/react'
import { Outlet, useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()

  return (
    <Flex
      marginTop={100}
      justifyContent="space-between"
      h="30vh"
      align="center"
      direction="column"
      gap={20}
    >
      <Outlet />
    </Flex>
  )
}

export default Home
