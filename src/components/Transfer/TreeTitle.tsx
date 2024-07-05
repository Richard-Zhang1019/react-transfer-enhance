import { FC, ReactNode, useState } from 'react'
import { DataProps } from './utils'
import { AiFillDelete } from 'react-icons/ai'
import { Flex } from '@chakra-ui/react'
import { Input, Tooltip } from 'antd'
import { FaDatabase, FaTable, FaCheck } from 'react-icons/fa'
import { CgRename } from 'react-icons/cg'
import { IoCloseOutline } from 'react-icons/io5'

interface TreeTitleProps {
  node: DataProps
  type: 'left' | 'right'
  onEdit?: (item: DataProps, val: string) => void
  onRemove: (type: 'select', node: DataProps) => void
}

const TreeTitle: FC<TreeTitleProps> = ({ node, onRemove, type, onEdit }) => {
  const [isEdit, setIsEdit] = useState(false)
  const [newVal, setNewVal] = useState<string>(node.title)

  const getIconType = (node: DataProps) => {
    const IconType: Record<string, ReactNode> = {
      database: <FaDatabase />,
      table: <FaTable />,
    }
    const errorIconType: Record<string, ReactNode> = {
      database: <FaDatabase />,
      table: <FaTable />,
    }
    return node.isNotUnique ? errorIconType[node.type] : IconType[node.type]
  }

  return (
    <span className="ob-edit-title">
      {isEdit ? (
        <Flex gap={16} alignItems={'center'}>
          <Input
            value={newVal}
            style={{ flex: 1, height: 24 }}
            onChange={e => setNewVal(e.target.value)}
          />
          <FaCheck
            style={{ color: 'rgba(115,209,61,1)' }}
            onClick={() => {
              onEdit?.(node, newVal)
              setIsEdit(false)
            }}
          />

          <IoCloseOutline
            style={{ color: 'rgba(255,77,79,1)' }}
            onClick={() => {
              setIsEdit(false)
              setNewVal(node.title)
            }}
          />
        </Flex>
      ) : (
        <Flex justifyContent={'space-between'} gap={16}>
          <span
            style={{
              width: node.type === 'table' ? 178 : 196,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {getIconType(node)}
            {node.oldTitle && type === 'right' ? (
              <span style={{ display: 'flex', flexWrap: 'nowrap' }}>
                <Tooltip title={node.oldTitle}>
                  <span
                    className="ellipsis"
                    style={{
                      textDecoration: 'line-through',
                      maxWidth: 92,
                      marginLeft: 4,
                      marginRight: 4,
                    }}
                  >
                    {node.oldTitle}
                  </span>
                </Tooltip>
                <Tooltip title={node.title}>
                  <span
                    className="ellipsis"
                    style={{
                      maxWidth: 92,
                      color: node.isNotUnique ? 'red' : undefined,
                    }}
                  >
                    {node.title}
                  </span>
                </Tooltip>
              </span>
            ) : (
              <span
                style={{
                  width: type === 'right' ? 184 : 222,
                  textOverflow: 'ellipsis',
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                  color: node.isNotUnique ? 'red' : '#000',
                  marginLeft: 4,
                }}
              >
                {node.title}
              </span>
            )}
          </span>

          {type === 'right' && (
            <span style={{ width: 48, display: 'flex', alignItems: 'center' }}>
              <CgRename onClick={() => setIsEdit(true)} />
              <AiFillDelete
                onClick={() => onRemove('select', node)}
                style={{ marginLeft: 12 }}
              />
            </span>
          )}
        </Flex>
      )}
    </span>
  )
}

export default TreeTitle
