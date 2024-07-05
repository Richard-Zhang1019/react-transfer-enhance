import { FC, Key, useState } from 'react'
import TreeList from './TreeList'
import { AiFillCaretRight } from 'react-icons/ai'
import { Button, Spin, Typography, Flex } from 'antd'
import styles from './styles.module.less'
import {
  DataProps,
  filterDataByKeys,
  filterEmptyNode,
  findDataByKey,
  getDataByKeys,
  getDataByTitle,
  insertIntoArray,
  mergeDataList,
} from './utils'
import { useDebounceEffect, useUpdateEffect } from 'ahooks'

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
        ? { isLeaf: true, children: undefined }
        : { isLeaf: false, children: [] }),
    })),
    checkedKeys: [],
  })
  console.log('leftTree at line 25:', leftTree.data)
  const [leftSearchValue, setLeftSearchValue] = useState('')
  const [leftSearchTree, setLeftSearchTree] = useState<{
    data: DataProps[]
    checkedKeys: string[]
  }>({
    data: [],
    checkedKeys: [],
  })
  const [rightSearchValue, setRightSearchValue] = useState('')
  const [rightSearchTree, setRightSearchTree] = useState<DataProps[]>([])
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

  // 被重命名后的数据移动到左树时 清除重命名
  const clearEditTitle = (data: DataProps[]) => {
    return data.map(item => {
      if (item.oldTitle) {
        item.title = item.oldTitle
        delete item.oldTitle
      }
      if (item.children) {
        clearEditTitle(item.children)
      }
      return item
    })
  }

  // 移除全部和单独移除
  const onRemove = (type: 'all' | 'select', node?: DataProps) => {
    if (rightTree.length === 0) return
    if (type === 'all') {
      setRightTree([])
      setLeftTree({
        checkedKeys: leftTree.checkedKeys,
        data: clearEditTitle(dataSource),
      })
    } else if (type === 'select' && node) {
      // 如果右树处于搜索状态 还需要将搜索列表同步去掉
      if (rightSearchValue) {
        setRightSearchTree(filterDataByKeys(rightSearchTree, [node.key]))
      }
      setRightTree(filterDataByKeys(rightTree, [node.key]))

      // 调用函数插入数据
      function insertByKey(keyToInsert: string) {
        const { parent, item } = findDataByKey(dataSource, keyToInsert)
        return insertIntoArray(leftTree.data, { parent, item })
      }
      setLeftTree({
        ...leftTree,
        data: clearEditTitle(
          insertByKey(node.key)!.sort((a, b) => a.key.localeCompare(b.key)),
        ),
      })
    }
  }

  // 重命名
  const onEdit = (node: DataProps, title: string) => {
    const findTreeTitle = (data: DataProps[], key: Key, title: string) => {
      for (let i = 0; i < data.length; i++) {
        const item = data[i]
        if (item.key === key && item.title !== title) {
          if (item.oldTitle) {
            item.title = title
          } else {
            item.oldTitle = item.title
            item.title = title
          }
          item.isNotUnique = false
        } else {
          if (item.children && item.children.length > 0) {
            findTreeTitle(item.children, key, title)
          }
        }
      }
    }
    findTreeTitle(rightTree, node.key, title)
    setRightTree(rightTree)
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

  useUpdateEffect(() => {
    setLeftTree({
      data: dataSource.map(node => ({
        ...node,
        ...(restoreType === 'database'
          ? { isLeaf: true, children: undefined }
          : { isLeaf: false, children: [] }),
      })),
      checkedKeys: [],
    })
    setRightTree([])
  }, [restoreType])

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
          onEdit={onEdit}
        />
      </div>
    </Spin>
  )
}

export default Transfer
