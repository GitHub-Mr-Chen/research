
import { useRoutes } from 'react-router-dom'
import { UserOutlined, SmileOutlined, CrownOutlined, BankOutlined, AntDesignOutlined } from '@ant-design/icons';

import pages from "./pages";
const { Home, Test, TestChild, NotFound } = pages

const p1 = Symbol('p1')
const p2 = Symbol('p2')
const p3 = Symbol('p3')
const p4 = Symbol('p4')
const p4_1 = Symbol('p4_1')
const p4_1_1 = Symbol('p4_1_1')
const p4_2 = Symbol('p4_2')
const p5 = Symbol('p5')
const p5_1 = Symbol('p5_1')
const p5_2 = Symbol('p5_2')
const p5_3 = Symbol('p5_3')

const routesMap = new Map([
  [
    p1,
    {
      name: '欢迎',
      path: '/welcome',
      element: <Test></Test>,
      icon: <SmileOutlined />,
    }
  ],
  [
    p2,
    {
      name: '首页',
      path: '/',
      element: <Home></Home>,
      icon: <BankOutlined />,
    }
  ],
  [
    p3,
    {
      path: '*',
      element: <NotFound></NotFound>
    }
  ],
  [
    p4,
    {
      name: '测试',
      path: '/test',
      icon: <UserOutlined></UserOutlined>,
    }
  ],
  [
    p4_1,
    {
      path: 'child',
      name: 'zi',
    },
  ],
  [
    p4_1_1,
    {
      path: 'child',
      name: 'zi',
      element: <TestChild></TestChild>,
    },
  ],
  [
    p4_2,
    {
      path: 'child1',
      name: '子页面',
      element: <TestChild></TestChild>,
    },
  ],
  [
    p5,
    {
      path: '/admin',
      name: '管理页',
      icon: <CrownOutlined />,
    }
  ],
  [
    p5_1,
    {
      path: '/admin/sub-page1',
      name: '一级页面',
      icon: <CrownOutlined />,
      element: './Welcomepage1',
    },
  ],
  [
    p5_2,
    {
      path: '/admin/sub-page2',
      name: '二级页面',
      icon: <CrownOutlined />,
      element: './Welcomepage2',
    },
  ],
  [
    p5_3,
    {
      path: '/admin/sub-page3',
      name: '三级页面',
      icon: <CrownOutlined />,
      element: './page3',
    },
  ],
])
interface Relation {
  id: symbol,
  parentId?: symbol,
  name?: string,
  path?: string,
  element?: any,
  icon?: any,
  children?: string,
}

// 映射表
const relationalList = [
  {
    id: p1,
  },
  {
    id: p2,
  },
  {
    id: p3,
  },
  {
    id: p4,
  },
  {
    id: p4_1,
    parentId: p4,
  },
  {
    id: p4_1_1,
    parentId: p4_1,
  },
  {
    id: p4_2,
    parentId: p4,
  },
  {
    id: p5,
  },
  {
    id: p5_1,
    parentId: p5,
  },
  {
    id: p5_2,
    parentId: p5,
  },
  {
    id: p5_3,
    parentId: p5,
  },
]
const handleMap = () => {
  // 首先遍历一下“组织关系”数据，作用：
  // 1 深拷贝一下“组织关系”数据，不污染和篡改原数据。
  // 2 记录一下索引，优化效率。
  const relationCopy: Relation[] = []
  const ids = new Map()

  for (let i = 0; i < relationalList.length; i++) {
    const item = relationalList[i];
    ids.set(item.id, i)
    relationCopy.push({ ...item })
  }

  // 工具函数，简化逻辑，让代码清晰。
  // 初始化数据
  const initData = (obj: any, key: string, def: never[]) => {
    if (!(key in obj)) {
      obj[key] = def
      Object.assign(obj, def)
    }
    return obj[key]
  }

  // 目标结果数据
  const results: any[] = []
  // 然后遍历一下数据，融合
  relationCopy.forEach(item => {
    const { id, parentId } = item
    Object.assign(item, routesMap.get(id))
    if (!parentId) {
      if (!routesMap.has(id)) {
        throw `routesMap未配置该id的数据个体`
      }
      results.push(item)
    } else {
      const pIndex = ids.get(parentId)
      const routesData = relationCopy[pIndex]
      const routeChildren = initData(routesData, 'children', [])
      routeChildren.push(item)
    }
  })
  return results
}

const routes = handleMap()

// 导出菜单配置
export const menuConfigs = routes.filter(({ name }) => name)
export const defaultLayoutProps = {
  route: {
    path: '/welcome',
    routes: [
      ...menuConfigs,
      {
        path: 'https://ant.design',
        name: 'Ant Design 官网外链',
        icon: <AntDesignOutlined />,
      },
    ],
  },
  location: {
    pathname: '/',
  },
};
export default () => {
  return useRoutes(routes)
}


