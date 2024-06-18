import { FC, useState } from 'react'
import TreeList from './TreeList'
import { AiFillCaretRight } from 'react-icons/ai'
import { Button, Spin, Typography, Flex } from 'antd'
import styles from './styles.module.less'
import {
  DataProps,
  filterDataByKeys,
  filterEmptyNode,
  getDataByKeys,
  getDataByTitle,
  mergeDataList,
} from './utils'
import { useDebounceEffect } from 'ahooks'

interface TransferProps {
  dataSource: DataProps[]
  restoreType: 'database' | 'table'
}

const Transfer: FC<TransferProps> = ({ dataSource, restoreType }) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [leftTree, setLeftTree] = useState<{
    data: DataProps[]
    checkedKeys: string[]
  }>({
    data: dataSource.map(i => ({
      ...i,
      isLoad: false,
      ...(restoreType === 'database'
        ? { isLeaf: true }
        : { isLeaf: false, children: [] }),
    })),
    checkedKeys: [],
  })
  const [leftSearchValue, setLeftSearchValue] = useState('')
  const [leftSearchTree, setLeftSearchTree] = useState<{
    data: DataProps[]
    checkedKeys: string[]
  }>({
    data: [],
    checkedKeys: [],
  })
  const [rightTree, setRightTree] = useState<DataProps[]>([])

  // 移出右树全部
  const onRemoveAll = () => {
    setLeftTree({
      ...leftTree,
      data: mergeDataList(leftTree.data, rightTree),
    })
    setRightTree([])
  }

  const titleRender = {
    left: <div>source</div>,
    right: (
      <Flex justify="space-between" onClick={onRemoveAll}>
        <div>target</div>
        <Typography.Link>删除全部</Typography.Link>
      </Flex>
    ),
  }

  // 左树选中后 点击 button 右移
  const onLeftToRight = () => {
    setRightTree(
      mergeDataList(
        rightTree,
        getDataByKeys(leftTree.data, leftTree.checkedKeys),
      ),
    )
    setLeftTree({
      checkedKeys: [],
      data: filterDataByKeys(leftTree.data, leftTree.checkedKeys),
    })
  }

  // 删除右树节点
  const onRemove = (key: string) => {
    setRightTree(filterEmptyNode(filterDataByKeys(rightTree, [key])))
    setLeftTree({
      ...leftTree,
      data: mergeDataList(leftTree.data, getDataByKeys(rightTree, [key])),
    })
  }

  const loadData = (node: DataProps) =>
    new Promise<void>(resolve => {
      if (node.isLoad) {
        resolve()
        return
      } else {
        setLoading(true)
        setTimeout(() => {
          node.isLoad = true
          dataSource.forEach(item => {
            if (item.key === node.key) {
              node.children = item.children
            }
          })
          setLeftTree({
            ...leftTree,
            data: leftTree.data.map(i => (i.key === node.key ? node : i)),
          })
          resolve()
          setLoading(false)
        }, 1000)
      }
    })

  useDebounceEffect(
    () => {
      console.log('leftSearchValue', leftSearchValue)
      // 输入框清空
      if (leftSearchValue.trim() === '') {
      }
    },
    [leftSearchValue],
    {
      wait: 500,
    },
  )

  return (
    <Spin spinning={loading}>
      <div className={styles.transferWrap}>
        <TreeList
          type="left"
          showSearch
          data={leftTree.data}
          checkedKeys={leftTree.checkedKeys}
          loadData={loadData}
          onSearch={setLeftSearchValue}
          setLeftTree={setLeftTree}
          titleRender={titleRender.left}
          searchValue={leftSearchValue}
          setSearchValue={setLeftSearchValue}
          restoreType={restoreType}
        />
        <Button
          type="primary"
          icon={<AiFillCaretRight />}
          disabled={leftTree.checkedKeys.length === 0}
          onClick={onLeftToRight}
        />
        <TreeList
          type="right"
          showSearch
          checkable={false}
          data={rightTree}
          onRemove={onRemove}
          titleRender={titleRender.right}
          restoreType={restoreType}
        />
      </div>
    </Spin>
  )
}

export default Transfer
