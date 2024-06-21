export interface DataProps {
  /* 唯一key */
  key: string;
  /* 展示的名称 */
  title: string;
  /* 重名后 旧名 */
  oldTitle?: string;
  /* 类型 */
  type: 'table' | 'database';
  /* 如果 type 为 database 会有子集 */
  children?: DataProps[];
  /* 是否为子节点 */
  isLeaf?: boolean;
  /* 是否已按需加载子集 */
  isLoad?: boolean;
  /* 是否重名 */
  isNotUnique?: boolean;
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

export const findDataByKey: (
  data: DataProps[],
  key: string,
) => { parent: DataProps | null; item: DataProps | null } = (data, key) => {
  let parent: DataProps | null = null;

  for (const entry of data) {
    // 检查当前元素是否是需要找的元素
    if (entry.key === key) {
      return { parent, item: entry };
    }
    // 如果当前元素有子元素，则在子元素中递归查找
    if (entry.children) {
      const result = findDataByKey(entry.children, key);
      if (result.item) {
        return { parent: entry, item: result.item };
      }
    }
  }

  return { parent: null, item: null };
}

export const insertIntoArray = (
  targetArray: DataProps[],
  { parent, item }: { parent: DataProps | null; item: DataProps | null },
) => {
  if (!item) {
    return;
  }
  // 如果有父元素
  if (parent) {
    // 检查父元素是否已存在
    const existingParent = targetArray.find(
      (entry) => entry.key === parent.key,
    );
    if (existingParent) {
      // 父元素存在，只需插入子元素
      existingParent.children = existingParent.children || [];
      if (
        !existingParent.children.find((child) => child.key === item.key)
      ) {
        existingParent.children.push(item);
        existingParent.children.sort((a, b) => a.key.localeCompare(b.key))
      }
    } else {
      // 父元素不存在，先插入父元素，并将子元素插入其children数组
      const newParent = { ...parent, children: [item] };
      targetArray.push(newParent);
    }
  } else {
    // 如果没有父元素
    if (!targetArray.find((entry) => entry.key === item.key)) {
      targetArray.push(item);
    }
  }
  return targetArray
}