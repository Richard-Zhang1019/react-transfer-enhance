export interface DataProps {
  key: string;
  title: string;
  children?: DataProps[]
  isLoad?: boolean;
  oldTitle?: string;
  isLeaf?: boolean;
  type: 'database' | 'table';
}

/**
 * 传入 data 和要过滤掉的 keys 返回过滤后的data
 */
export const filterDataByKeys = (data: DataProps[], keys: string[]): DataProps[] => {
  const filteredData: DataProps[] = [];

  for (const node of data) {
    const filteredNode = { ...node };

    if (keys.includes(node.key)) {
      continue; // 如果当前节点的 key 在要过滤的 keys 列表中,则跳过该节点
    }

    if (node.children) {
      filteredNode.children = filterDataByKeys(node.children, keys);
    }

    filteredData.push(filteredNode);
  }

  return filteredData;
}

/**
 * 传入 data 和要得到的节点 key 返回传入 key 的 data
 */
export const getDataByKeys = (data: DataProps[], keys: string[]): DataProps[] => {
  const result: DataProps[] = [];
  const parentKeys: string[] = [];

  for (const node of data) {
    if (keys.includes(node.key)) {
      result.push(node);
    } else if (node.children) {
      const childrenData = getDataByKeys(node.children, keys);
      if (childrenData.length > 0) {
        const clonedNode = { ...node, children: childrenData };
        result.push(clonedNode);
        parentKeys.push(node.key);
      }
    }
  }
  return result
};

/**
 * 传入两个数据源 返回合并后的数据
 */
export const mergeDataList = (dataSource: DataProps[], data: DataProps[]): DataProps[] => {
  const result: DataProps[] = [...dataSource];

  for (const item of data) {
    const existingItem = result.find(i => i.key === item.key);

    if (existingItem) {
      // 如果 dataSource 中已经存在相同的 key 则合并子节点
      existingItem.children = mergeDataList(existingItem.children || [], item.children || []);
    } else {
      // 不存在则将 data 中的数据项添加到 dataSource 中
      result.push(item);
    }
  }

  return sortDataList(result);
}

/**
 * 传入 data 返回排序后的数据
 */
export const sortDataList = (data: DataProps[]) => {
  return data.sort((a, b) => a.title.localeCompare(b.title))
}

/**
 * 传入 data 和要得到的节点 title 返回传入 title 的 data
 */
export const getDataByTitle = (data: DataProps[], title: string): DataProps[] => {
  const result: DataProps[] = [];
  const parentKeys: string[] = [];

  for (const node of data) {
    if (node.title.includes(title)) {
      result.push(node);
    } else if (node.children) {
      const childrenData = getDataByTitle(node.children, title);
      if (childrenData.length > 0) {
        const clonedNode = { ...node, children: childrenData };
        result.push(clonedNode);
        parentKeys.push(node.key);
      }
    }
  }
  return result
};

/**
 * 传入 data 如果 data 的子元素为空则过滤掉
 */
export const filterEmptyNode = (data: DataProps[]): DataProps[] => {
  const result: DataProps[] = [];

  for (const node of data) {
    const filteredNode = { ...node };

    if (node.children?.length === 0) {
      continue;
    } else {
      result.push(filteredNode);
    }
  }

  return result;
}