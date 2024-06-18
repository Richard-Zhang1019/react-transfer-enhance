import { FC } from 'react'
import { DataProps } from './utils'
import { AiFillDelete } from 'react-icons/ai'
import { Flex } from '@chakra-ui/react'
import { TreeDataNode } from 'antd'
import { FaDatabase, FaTable } from 'react-icons/fa'

interface TreeTitleProps {
  node: DataProps
  onRemove?: (key: string) => void
  type: 'left' | 'right'
}

const TreeTitle: FC<TreeTitleProps> = ({ node, onRemove, type }) => {
  const getIconType = (node: TreeDataNode) => {
    console.log('node at line 63:', node)
    const iconType = {
      database: <FaDatabase />,
      table: <FaTable />,
    }
    return iconType[node.type]
  }
  return (
    <Flex gap={16}>
      <Flex
        gap={4}
        alignItems={'center'}
        style={{
          width: 'calc(100% - 88px)',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}
      >
        <div>{getIconType(node)}</div>
        {node.title + '1213221312312312312313123'}
      </Flex>
      {type === 'right' && (
        <div>
          <AiFillDelete size={20} onClick={() => onRemove?.(node.key)} />
        </div>
      )}
    </Flex>
  )
}

export default TreeTitle
