import { FC } from 'react'
import { DataProps } from './utils'
import { AiFillDelete } from 'react-icons/ai'
import { Flex } from '@chakra-ui/react'

interface TreeTitleProps {
  node: DataProps
  onRemove: (key: string) => void
  type: 'left' | 'right'
}

const TreeTitle: FC<TreeTitleProps> = ({ node, onRemove, type }) => {
  return (
    <Flex justify={'space-between'} width={'100%'} gap={20}>
      <div>{node.title}</div>
      {type === 'right' && (
        <AiFillDelete size={20} onClick={() => onRemove(node.key)} />
      )}
    </Flex>
  )
}

export default TreeTitle
