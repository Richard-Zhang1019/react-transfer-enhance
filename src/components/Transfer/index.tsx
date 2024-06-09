import { FC, useState } from 'react'
import TreeList from './TreeList'
import { AiFillCaretRight } from 'react-icons/ai'
import { Button } from 'antd'
import styles from './styles.module.less'
import {
  DataProps,
  filterDataByKeys,
  getDataByKeys,
  mergeDataList,
  transferData
} from './utils'

interface TransferProps {
  dataSource: DataProps[]
}

const Transfer: FC<TransferProps> = ({ dataSource }) => {
  const [leftTree, setLeftTree] = useState({
    data: dataSource,
    checkedKeys: []
  })
  const [rightTree, setRightTree] = useState({ data: [], checkedKeys: [] })
  console.log('leftTree', leftTree)
  console.log('rightTree', rightTree)
  const onLeftToRight = () => {
    console.log(mergeDataList(
      rightTree.data,
      getDataByKeys(leftTree.data, leftTree.checkedKeys)
    ))
    console.log(mergeDataList(
      rightTree.data,
      getDataByKeys(leftTree.data, leftTree.checkedKeys)
    ))
    setRightTree({
      checkedKeys: [],
      data: mergeDataList(
        rightTree.data,
        getDataByKeys(leftTree.data, leftTree.checkedKeys)
      )
    })
    setLeftTree({
      checkedKeys: [],
      data: filterDataByKeys(leftTree.data, leftTree.checkedKeys)
    })
  }

  return (
    <div className={styles.transferWrap}>
      <TreeList
        type="left"
        showSearch
        showCheckAll
        data={leftTree.data}
        checkedKeys={leftTree.checkedKeys}
        onCheck={(keys, node) => {
          console.log('onCheck')
          setLeftTree({ ...leftTree, checkedKeys: keys })
        }}
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
        data={rightTree.data}
        checkedKeys={rightTree.checkedKeys}
      />
    </div>
  )
}

export default Transfer
