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
      <Flex gap={20}>
        <Box cursor="pointer" onClick={() => navigate('/home/about')}>
          Go About Page
        </Box>
        <Box cursor="pointer" onClick={() => navigate('/home/profile')}>
          Go Profile Page
        </Box>
      </Flex>
      <Outlet />
    </Flex>
  )
}

export default Home
