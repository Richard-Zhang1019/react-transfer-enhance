import { FC, useState } from 'react'
import TreeList from './TreeList'
import { AiFillCaretRight } from 'react-icons/ai'
import { Button } from 'antd'
import styles from './styles.module.less'
import {
  DataProps,
  filterDataByKeys,
  getDataByKeys,
  getDataByTitle,
  mergeDataList
} from './utils'

interface TransferProps {
  dataSource: DataProps[]
}

const Transfer: FC<TransferProps> = ({ dataSource }) => {
  const [leftTree, setLeftTree] = useState<{
    data: DataProps[]
    checkedKeys: string[]
  }>({
    data: dataSource.map(i => ({ ...i, isLoad: false, children: [] })),
    checkedKeys: []
  })
  const [rightTree, setRightTree] = useState<DataProps[]>([])
  console.log('leftTree', leftTree)
  console.log('rightTree', rightTree)
  const onLeftToRight = () => {
    setRightTree(
      mergeDataList(
        rightTree,
        getDataByKeys(leftTree.data, leftTree.checkedKeys)
      )
    )
    setLeftTree({
      checkedKeys: [],
      data: filterDataByKeys(leftTree.data, leftTree.checkedKeys)
    })
  }

  const onRemove = (key: string) => {
    console.log('key at line 47:', key)
    setRightTree(filterDataByKeys(rightTree, [key]))
    // setLeftTree({
    //   checkedKeys: [],
    //   data: filterDataByKeys(leftTree.data, leftTree.checkedKeys)
    // })
  }

  const loadData = (node: DataProps) =>
    new Promise<void>(resolve => {
      if (node.isLoad) {
        resolve()
        return
      } else {
        setTimeout(() => {
          node.isLoad = true
          dataSource.forEach(item => {
            if (item.key === node.key) {
              node.children = item.children
            }
          })
          setLeftTree({
            ...leftTree,
            data: leftTree.data.map(i => (i.key === node.key ? node : i))
          })
          resolve()
        }, 1000)
      }
    })

  return (
    <div className={styles.transferWrap}>
      <TreeList
        type="left"
        showSearch
        showCheckAll
        data={leftTree.data}
        checkedKeys={leftTree.checkedKeys}
        // @ts-ignore
        loadData={loadData}
        // onCheck={(keys: string[]) => {
        //   a(keys)
        // }}
        setLeftTree={setLeftTree}
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
        showCheckAll={false}
        checkable={false}
        data={rightTree}
        onRemove={onRemove}
      />
    </div>
  )
}

export default Transfer
