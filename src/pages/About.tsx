import { Box, Flex, keyframes } from '@chakra-ui/react'
import { FaReact } from 'react-icons/fa'
import Transfer from '@/components/Transfer'

import { useAppSelector } from '@/store'
import { TreeDataNode } from 'antd'

const About = () => {
  const treeData: TreeDataNode[] = [
    {
      title: '0-0',
      key: '0-0',
      children: [
        {
          title: '0-0-0',
          key: '0-0-0',
          children: [
            { title: '0-0-0-0', key: '0-0-0-0' },
            { title: '0-0-0-1', key: '0-0-0-1' },
            { title: '0-0-0-2', key: '0-0-0-2' }
          ]
        },
        {
          title: '0-0-1',
          key: '0-0-1',
          children: [
            { title: '0-0-1-0', key: '0-0-1-0' },
            { title: '0-0-1-1', key: '0-0-1-1' },
            { title: '0-0-1-2', key: '0-0-1-2' }
          ]
        },
        {
          title: '0-0-2',
          key: '0-0-2'
        }
      ]
    },
    {
      title: '0-1',
      key: '0-1',
      children: [
        { title: '0-1-0-0', key: '0-1-0-0' },
        { title: '0-1-0-1', key: '0-1-0-1' },
        { title: '0-1-0-2', key: '0-1-0-2' }
      ]
    },
    {
      title: '0-2',
      key: '0-2'
    }
  ]

  return (
    <Flex justify="center" align="center" direction="column" gap={10}>
      <Transfer dataSource={treeData} />
    </Flex>
  )
}

export default About
