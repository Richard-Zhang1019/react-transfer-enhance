import { FC, useState } from 'react'
import TreeList from './TreeList'
import { AiFillCaretRight } from 'react-icons/ai'
import { Button, Spin, Typography, Flex } from 'antd'
import styles from './styles.module.less'
import {
  DataProps,
  filterDataByKeys,
  getDataByKeys,
  getDataByTitle,
  mergeDataList,
} from './utils'

interface TransferProps {
  dataSource: DataProps[]
}

const Transfer: FC<TransferProps> = ({ dataSource }) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [leftTree, setLeftTree] = useState<{
    data: DataProps[]
    checkedKeys: string[]
  }>({
    data: dataSource.map(i => ({ ...i, isLoad: false, children: [] })),
    checkedKeys: [],
  })
  const [rightTree, setRightTree] = useState<DataProps[]>([])

  const titleRender = {
    left: <div>source</div>,
    right: (
      <Flex justifyContent={'space-between'} alignItems={'center'}>
        <div>target</div>
        <Typography.Link>删除全部</Typography.Link>
      </Flex>
    ),
  }

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

  const onRemove = (key: string) => {
    console.log('key at line 47:', key)
    setRightTree(filterDataByKeys(rightTree, [key]))
    setLeftTree({
      ...leftTree,
      data: mergeDataList(leftTree.data, getDataByKeys(rightTree, [key])),
    })
    console.log(
      'getDataByKeys(rightTree at line 57:',
      getDataByKeys(rightTree, [key]),
    )
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

  return (
    <Spin spinning={loading}>
      <div className={styles.transferWrap}>
        <TreeList
          type="left"
          showSearch
          data={leftTree.data}
          checkedKeys={leftTree.checkedKeys}
          loadData={loadData}
          setLeftTree={setLeftTree}
          titleRender={titleRender.left}
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
        />
      </div>
    </Spin>
  )
}

export default Transfer
