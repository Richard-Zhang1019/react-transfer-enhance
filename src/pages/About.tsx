import { Flex } from '@chakra-ui/react'
import Transfer from '@/components/Transfer'
import { DataProps } from '@/components/Transfer/utils'

const About = () => {
  const dataSource: DataProps[] = [
    {
      title: '数据库A',
      key: '数据库A',
      type: 'database',
      isLeaf: false,
      children: [
        {
          title: '表1',
          key: '数据库A-表1',
          isLeaf: true,
          type: 'table',
        },
        {
          title: '表2',
          key: '数据库A-表2',
          isLeaf: true,
          type: 'table',
        },
        {
          title: '表3',
          key: '数据库A-表3',
          isLeaf: true,
          type: 'table',
        },
      ],
    },
    {
      title: '数据库B',
      key: '数据库B',
      type: 'database',
      isLeaf: false,
      children: [
        {
          title: '表4',
          key: '数据库B-表4',
          isLeaf: true,
          type: 'table',
        },
        {
          title: '表5',
          key: '数据库B-表5',
          isLeaf: true,
          type: 'table',
        },
        {
          title: '表6',
          key: '数据库B-表6',
          isLeaf: true,
          type: 'table',
        },
      ],
    },
    {
      title: '数据库C',
      key: '数据库C',
      type: 'database',
      isLeaf: false,
      children: [
        {
          title: '表1',
          key: '数据库C-表1',
          isLeaf: true,
          type: 'table',
        },
        {
          title: '表2',
          key: '数据库C-表2',
          isLeaf: true,
          type: 'table',
        },
        {
          title: '表3',
          key: '数据库C-表3',
          isLeaf: true,
          type: 'table',
        },
        {
          title: '表7',
          key: '数据库C-表7',
          isLeaf: true,
          type: 'table',
        },
        {
          title: '表8',
          key: '数据库C-表8',
          isLeaf: true,
          type: 'table',
        },
        {
          title: '表9',
          key: '数据库C-表9',
          isLeaf: true,
          type: 'table',
        },
        {
          title: '表10',
          key: '数据库C-表10',
          isLeaf: true,
          type: 'table',
        },
      ],
    },
    {
      title: '数据库D',
      key: '数据库D',
      type: 'database',
      isLeaf: false,
      children: [],
    },
  ]

  return (
    <Flex justify="center" align="center" direction="column" gap={10}>
      <h3>库</h3>
      <Transfer dataSource={dataSource} restoreType="database" />
      <h3 style={{ marginTop: 48 }}>表</h3>
      <Transfer dataSource={dataSource} restoreType="table" />
    </Flex>
  )
}

export default About
