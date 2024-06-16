import { Flex } from '@chakra-ui/react'
import Transfer from '@/components/Transfer'
import { DataProps } from '@/components/Transfer/utils'

const About = () => {
  const dataSource: DataProps[] = [
    {
      title: '水果',
      key: '水果',
      isLeaf: false,
      children: [
        {
          title: '苹果',
          key: '苹果',
          isLeaf: true,
        },
        {
          title: '香蕉',
          key: '香蕉',
          isLeaf: true,
        },
        {
          title: '梨',
          key: '梨',
          isLeaf: true,
        },
      ],
    },
    {
      title: '蔬菜',
      key: '蔬菜',
      isLeaf: false,
      children: [
        { title: '萝卜', key: '萝卜', isLeaf: true },
        { title: '茄子', key: '茄子', isLeaf: true },
        { title: '土豆', key: '土豆', isLeaf: true },
      ],
    },
    {
      title: '炒菜',
      key: '炒菜',
      children: [
        { title: '土豆炖牛肉', key: '土豆炖牛肉', isLeaf: true },
        { title: '肉末茄子', key: '肉末茄子', isLeaf: true },
        { title: '萝卜羊肉', key: '萝卜羊肉', isLeaf: true },
      ],
      isLeaf: false,
    },
    {
      title: '肉',
      key: '肉',
      children: [
        { title: '牛肉', key: '牛肉', isLeaf: true },
        { title: '猪肉', key: '猪肉', isLeaf: true },
        { title: '羊肉', key: '羊肉', isLeaf: true },
      ],
      isLeaf: false,
    },
  ]

  return (
    <Flex justify="center" align="center" direction="column" gap={10}>
      <Transfer dataSource={dataSource} />
    </Flex>
  )
}

export default About
