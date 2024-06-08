import { FC, ReactNode, useState, Key } from 'react'
import { Input, Tree, TreeDataNode, TreeProps } from 'antd'
import { AiOutlineSearch } from 'react-icons/ai'

import styles from './styles.module.less'

interface TreeListProps {
  /** left or right */
  type: 'left' | 'right'
  /** whether to show search box */
  showSearch?: boolean
  /** whether to show check all */
  showCheckAll?: boolean
  /** custom action */
  action?: ReactNode
  /** tree data */
  data: TreeDataNode[]
  /** checked keys */
  checkedKeys?: string[]
}

const TreeList: FC<TreeListProps> = ({
  type,
  showSearch = false,
  showCheckAll = true,
  data
}) => {
  const [expandedKeys, setExpandedKeys] = useState<string[]>([])
  const [checkedKeys, setCheckedKeys] = useState<string[]>([])
  const [selectedKeys, setSelectedKeys] = useState<string[]>([])
  const [autoExpandParent, setAutoExpandParent] = useState<boolean>(true)

  // tree 受控展开
  const onExpand: TreeProps['onExpand'] = expandedKeysValue => {
    console.log('onExpand', expandedKeysValue)
    // if not set autoExpandParent to false, if children expanded, parent can not collapse.
    // or, you can remove all expanded children keys.
    setExpandedKeys(expandedKeysValue)
    setAutoExpandParent(false)
  }

  // tree 受控选中
  const onCheck: TreeProps['onCheck'] = checkedKeysValue => {
    console.log('onCheck', checkedKeysValue)
    setCheckedKeys(checkedKeysValue as React.Key[])
  }

  // tree 受控点击选择
  const onSelect: TreeProps['onSelect'] = (selectedKeysValue, info) => {
    console.log('onSelect', info)
    setSelectedKeys(selectedKeysValue)
  }

  return (
    <div className={styles.transferTreeListWrap}>
      <div className={styles.treeListHeader}>
        {showCheckAll && <input type="checkbox" />}
        <span>{type === 'left' ? 'Source' : 'Target'}</span>
      </div>
      <div className={styles.treeListBody}>
        {showSearch && (
          <div className={styles.treeListSearch}>
            <Input allowClear prefix={<AiOutlineSearch />} />
          </div>
        )}
        <Tree
          checkable
          onExpand={onExpand}
          expandedKeys={expandedKeys}
          autoExpandParent={autoExpandParent}
          onCheck={onCheck}
          checkedKeys={checkedKeys}
          onSelect={onSelect}
          selectedKeys={selectedKeys}
          treeData={data}
        />
      </div>
    </div>
  )
}

export default TreeList