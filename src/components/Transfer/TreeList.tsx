import { FC, ReactNode, useState } from 'react'
import { Input, Tree, TreeDataNode, TreeProps } from 'antd'
import { AiOutlineSearch } from 'react-icons/ai'
import styles from './styles.module.less'
import TreeTitle from './TreeTitle'
import { EventDataNode } from 'antd/es/tree'
import { DataProps } from './utils'

interface TreeListProps {
  /** left or right */
  type: 'left' | 'right'
  /** whether to show search box */
  showSearch?: boolean
  /** custom action */
  action?: ReactNode
  /** tree data */
  data: TreeDataNode[]
  /** checked keys */
  checkedKeys?: string[]
  /** check event */
  onCheck?: (keys: any, info: any) => void
  checkable?: boolean
  onRemove?: (key: string) => void
  loadData?:
    | ((treeNode: EventDataNode<TreeDataNode>) => Promise<any>)
    | undefined
  setLeftTree?: any
  titleRender: ReactNode
  searchValue: string
  setSearchValue: (value: string) => void
  restoreType: 'database' | 'table'
  onEdit?: (item: DataProps, val: string) => void
}

const TreeList: FC<TreeListProps> = ({
  type,
  showSearch = false,
  data,
  checkedKeys = [],
  onCheck,
  checkable = true,
  onRemove,
  loadData,
  setLeftTree,
  titleRender,
  searchValue,
  setSearchValue,
  restoreType,
  onEdit
}) => {
  const [expandedKeys, setExpandedKeys] = useState<string[]>([])
  const [selectedKeys, setSelectedKeys] = useState<string[]>([])
  const [autoExpandParent, setAutoExpandParent] = useState<boolean>(true)

  // tree 受控展开
  const onExpand: TreeProps['onExpand'] = expandedKeysValue => {
    console.log('onExpand', expandedKeysValue)
    // if not set autoExpandParent to false, if children expanded, parent can not collapse.
    // or, you can remove all expanded children keys.
    // @ts-ignore
    setExpandedKeys(expandedKeysValue)
    setAutoExpandParent(false)
  }

  return (
    <div className={styles.transferTreeListWrap}>
      <div className={styles.treeListHeader}>{titleRender}</div>
      <div className={styles.treeListBody}>
        {showSearch && (
          <div className={styles.treeListSearch}>
            <Input
              allowClear
              value={searchValue}
              onChange={e => setSearchValue(e.target.value)}
              prefix={<AiOutlineSearch />}
            />
          </div>
        )}
        <div className={styles.treeListContent}>
          <Tree
            checkable={checkable}
            expandedKeys={expandedKeys}
            autoExpandParent={autoExpandParent}
            checkedKeys={checkedKeys}
            onExpand={onExpand}
            onCheck={(keys, info) => {
              console.log('keys at line 101:', keys)
              if (!info.node?.isLoad && info.node.isLeaf === false) {
                loadData?.(info.node).then(() => {
                  const keyList = [keys]
                  info.node.children?.forEach(i => {
                    // @ts-ignore
                    keyList.push(i.key)
                  })
                  // @ts-ignore
                  setLeftTree(val => ({
                    data: val.data,
                    checkedKeys: keyList.flat(),
                  }))
                })
              } else {
                // @ts-ignore
                setLeftTree(val => ({
                  ...val,
                  checkedKeys: keys,
                }))
              }
            }}
            selectedKeys={selectedKeys}
            treeData={data}
            // @ts-ignore
            loadData={node => {
              // @ts-ignore
              if (node?.isLoad) {
                return Promise.resolve()
              }
              return loadData ? loadData(node) : undefined
            }}
            height={286}
            titleRender={node => (
              <TreeTitle type={type} node={node} onRemove={onRemove} onEdit={onEdit} />
            )}
          />
        </div>
      </div>
    </div>
  )
}

export default TreeList
