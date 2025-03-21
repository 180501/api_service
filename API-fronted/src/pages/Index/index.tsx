import { PageContainer } from '@ant-design/pro-components';
// import { useModel } from '@umijs/max';
// import { Card, theme } from 'antd';
import React, {useEffect, useState} from 'react';

/**
 * 每个单独的卡片，为了复用样式抽成了组件
 * @param param0
 * @returns
 */
// const InfoCard: React.FC<{
//   title: string;
//   index: number;
//   desc: string;
//   href: string;
// }> = ({ title, href, index, desc }) => {
//   const { useToken } = theme;
//
//   const { token } = useToken();
//
//   return (
//     <div
//       style={{
//         backgroundColor: token.colorBgContainer,
//         boxShadow: token.boxShadow,
//         borderRadius: '8px',
//         fontSize: '14px',
//         color: token.colorTextSecondary,
//         lineHeight: '22px',
//         padding: '16px 19px',
//         minWidth: '220px',
//         flex: 1,
//       }}
//     >
//       <div
//         style={{
//           display: 'flex',
//           gap: '4px',
//           alignItems: 'center',
//         }}
//       >
//         <div
//           style={{
//             width: 48,
//             height: 48,
//             lineHeight: '22px',
//             backgroundSize: '100%',
//             textAlign: 'center',
//             padding: '8px 16px 16px 12px',
//             color: '#FFF',
//             fontWeight: 'bold',
//             backgroundImage:
//               "url('https://gw.alipayobjects.com/zos/bmw-prod/daaf8d50-8e6d-4251-905d-676a24ddfa12.svg')",
//           }}
//         >
//           {index}
//         </div>
//         <div
//           style={{
//             fontSize: '16px',
//             color: token.colorText,
//             paddingBottom: 8,
//           }}
//         >
//           {title}
//         </div>
//       </div>
//       <div
//         style={{
//           fontSize: '14px',
//           color: token.colorTextSecondary,
//           textAlign: 'justify',
//           lineHeight: '22px',
//           marginBottom: 8,
//         }}
//       >
//         {desc}
//       </div>
//       <a href={href} target="_blank" rel="noreferrer">
//         了解更多 {'>'}
//       </a>
//     </div>
//   );
// };

// const Index: React.FC = () => {
//   const { token } = theme.useToken();
//   const { initialState } = useModel('@@initialState');
//   return (
//     <PageContainer>
//       <Card
//         style={{
//           borderRadius: 8,
//         }}
//         bodyStyle={{
//           backgroundImage:
//             initialState?.settings?.navTheme === 'realDark'
//               ? 'background-image: linear-gradient(75deg, #1A1B1F 0%, #191C1F 100%)'
//               : 'background-image: linear-gradient(75deg, #FBFDFF 0%, #F5F7FF 100%)',
//         }}
//       >
//         <div
//           style={{
//             backgroundPosition: '100% -30%',
//             backgroundRepeat: 'no-repeat',
//             backgroundSize: '274px auto',
//             backgroundImage:
//               "url('https://gw.alipayobjects.com/mdn/rms_a9745b/afts/img/A*BuFmQqsB2iAAAAAAAAAAAAAAARQnAQ')",
//           }}
//         >
//           <div
//             style={{
//               fontSize: '20px',
//               color: token.colorTextHeading,
//             }}
//           >
//             欢迎使用 Ant Design Pro
//           </div>
//           <p
//             style={{
//               fontSize: '14px',
//               color: token.colorTextSecondary,
//               lineHeight: '22px',
//               marginTop: 16,
//               marginBottom: 32,
//               width: '65%',
//             }}
//           >
//             Ant Design Pro 是一个整合了 umi，Ant Design 和 ProComponents
//             的脚手架方案。致力于在设计规范和基础组件的基础上，继续向上构建，提炼出典型模板/业务组件/配套设计资源，进一步提升企业级中后台产品设计研发过程中的『用户』和『设计者』的体验。
//           </p>
//           <div
//             style={{
//               display: 'flex',
//               flexWrap: 'wrap',
//               gap: 16,
//             }}
//           >
//             <InfoCard
//               index={1}
//               href="https://umijs.org/docs/introduce/introduce"
//               title="了解 umi"
//               desc="umi 是一个可扩展的企业级前端应用框架,umi 以路由为基础的，同时支持配置式路由和约定式路由，保证路由的功能完备，并以此进行功能扩展。"
//             />
//             <InfoCard
//               index={2}
//               title="了解 ant design"
//               href="https://ant.design"
//               desc="antd 是基于 Ant Design 设计体系的 React UI 组件库，主要用于研发企业级中后台产品。"
//             />
//             <InfoCard
//               index={3}
//               title="了解 Pro Components"
//               href="https://procomponents.ant.design"
//               desc="ProComponents 是一个基于 Ant Design 做了更高抽象的模板组件，以 一个组件就是一个页面为开发理念，为中后台开发带来更好的体验。"
//             />
//           </div>
//         </div>
//       </Card>
//     </PageContainer>
//   );
// };


import { List, message } from 'antd';
import {listInterfaceInfoByPageUsingPost} from "@/services/API-backend/interfaceInfoController";

/**
 * 主页
 * @constructor
 */
const Index: React.FC = () => {
  // 使用 useState 和泛型来定义组件内的状态
  // 加载状态
  const [loading, setLoading] = useState(false);
  // 列表数据
  const [list, setList] = useState<API.InterfaceInfo[]>([]);
  // 总数
  const [total, setTotal] = useState<number>(0);

  // 定义异步加载数据的函数
  const loadData = async (current = 1, pageSize = 5) => {
    // 开始加载数据，设置 loading 状态为 true
    setLoading(true);
    try {
      // 调用接口获取数据
      const res = await listInterfaceInfoByPageUsingPost({
        current,//现在所处页面
        pageSize,
      });
      // 将请求返回的数据设置到列表数据状态中
      setList(res?.data?.records ?? []);
      // 将请求返回的总数设置到总数状态中
      setTotal(res?.data?.total ?? 0);
      // 捕获请求失败的错误信息
    } catch (error: any) {
      // 请求失败时提示错误信息
      message.error('请求失败，' + error.message);
    }
    // 数据加载成功或失败后，设置 loading 状态为 false
    setLoading(false);
  };

  useEffect(() => {
    // 页面加载完成后调用加载数据的函数
    loadData();
  }, []);

  return (
    // 使用 antd 的 PageContainer 组件作为页面容器
    <PageContainer title="在线接口开放平台">
      <List
        className="my-list"
        // 设置 loading 属性，表示数据是否正在加载中
        loading={loading}
        itemLayout="horizontal"
        // 将列表数据作为数据源传递给 List 组件,通过setList函数更新数据源
        dataSource={list}
        // 渲染每个列表项
        renderItem={(item) => {
          const apiLink = `/interface_info/${item.id}`
          return (
            <List.Item actions={[<a key='${item.id}' href={apiLink}>查看</a>]}>
              <List.Item.Meta
                // href等会要改成接口文档的链接
                title={<a href={apiLink}>{item.name}</a>}
                description={item.description}
              />
            </List.Item>
          )
        }}
        // 分页配置
        pagination={{
          // 自定义显示总数
          // eslint-disable-next-line @typescript-eslint/no-shadow
          showTotal(total: number) {
            return '总数：' + total;
          },
          // 每页显示条数
          pageSize: 5,
          // 总数，从状态中获取
          total,
          // 切换页面触发的回调函数
          onChange(page, pageSize) {
            // 加载对应页面的数据
            loadData(page, pageSize);
          },
        }}
      />
    </PageContainer>
  );
};

export default Index;
