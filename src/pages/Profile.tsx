import { Flex } from '@chakra-ui/react'
import { Button } from 'antd'

import { useAppSelector, useAppDispatch } from '@/store'
import { increment, decrement } from '@/store/modules/count'

const profile = () => {
  const { value } = useAppSelector(state => state.count)
  const dispatch = useAppDispatch()

  return (
    <Flex justify="center" align="center" direction="column">
      <h1>redux count: {value}</h1>
      <Flex gap={20}>
        <Button onClick={() => dispatch(increment())}>
          count + 1
        </Button>
        <Button onClick={() => dispatch(decrement())}>
          count - 1
        </Button>
      </Flex>
    </Flex>
  )
}

export default profile
