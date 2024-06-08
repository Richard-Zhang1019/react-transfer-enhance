import { FC, useState } from 'react'
import TreeList from './TreeList'
import { AiFillCaretRight } from 'react-icons/ai'
import { Button } from 'antd'

import styles from './styles.module.less'

interface TransferProps {
  dataSource: any[]
}

const Transfer: FC<TransferProps> = ({ dataSource }) => {
  const [leftTree, setLeftTree] = useState({
    data: dataSource,
    checkedKeys: []
  })
  const [rightTree, setRightTree] = useState({ data: [], checkedKeys: [] })

  const onLeftToRight = () => {
    console.log('onLeftToRight')
  }

  return (
    <div className={styles.transferWrap}>
      <TreeList
        type="left"
        showSearch
        showCheckAll
        data={leftTree.data}
        checkedKeys={leftTree.checkedKeys}
      />
      <Button
        type="primary"
        icon={<AiFillCaretRight />}
        onClick={onLeftToRight}
      />
      <TreeList
        type="right"
        showSearch
        showCheckAll={false}
        data={rightTree.data}
        checkedKeys={rightTree.checkedKeys}
      />
    </div>
  )
}

export default Transfer
