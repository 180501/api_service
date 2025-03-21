import { PageContainer } from '@ant-design/pro-components';
// import { useModel } from '@umijs/max';
// import { Card, theme } from 'antd';
import React, {useEffect, useState} from 'react';
import {Button, Card, Descriptions, Divider, Form, message} from 'antd';
import {
  getInterfaceInfoVoByIdUsingGet, invokeInterfaceInfoUsingPost,
} from "@/services/API-backend/interfaceInfoController";
import {useParams} from "react-router";
import { Input } from 'antd';

const { TextArea } = Input;


/**
 * 用户查询对应接口的页面
 * @constructor
 */
const Index: React.FC = () => {
  // 使用 useState 和泛型来定义组件内的状态
  const [invokeRes,setInvokeRes] = useState<any>();//响应类型是不确定的，所以用any类型
  const [invokeLoading, setInvokeLoading] = useState(false); //调用接口loading状态
  // 加载状态
  const [loading, setLoading] = useState(false);
  // 列表数据
  const [data, setData] = useState<API.InterfaceInfo>({});
  // 总数
  // const [total, setTotal] = useState<number>(0);
//userparams获取动态路由参数
  const params = useParams();
  // 定义异步加载数据的函数
  const loadData = async () => {
    // 开始加载数据，设置 loading 状态为 true
    setLoading(true);
    try {

      // 调用接口获取数据
      const res = await getInterfaceInfoVoByIdUsingGet({
        id: Number(params.id)
      });
      // 将请求返回的数据设置到列表数据状态中
      setData(res?.data ?? {});
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

  const onFinish = async (values: any) => {
    // 检查是否存在接口id
    if (!params.id) {
      message.error('接口不存在');
      return;
    }
    try {
      // 发起接口调用请求，传入一个对象作为参数，这个对象包含了id和values的属性，
      // 其中，id 是从 params 中获取的，而 values 是函数的参数
      const res = await invokeInterfaceInfoUsingPost({
        id: params.id,
        ...values,
      });
      setInvokeRes(res?.data);
      message.success('请求成功');
    } catch (error: any) {
      message.error('操作失败，' + error.message);
    }finally {
      // 调用接口完成后，将调用loading状态设置为false，无论调用成功或失败
      setInvokeLoading(false);
    }
  };

  return (
    // 使用 antd 的 PageContainer 组件作为页面容器
    <PageContainer title="在线接口开放平台">
      {/*{JSON.stringify(data)}*/}
      <Card>
        {data? (<Descriptions title={data.name} column={1}>
            <Descriptions.Item label="接口状态">{data.status? '未发布' : '已发布' }</Descriptions.Item>
            <Descriptions.Item label="描述">{data.description}</Descriptions.Item>
            <Descriptions.Item label="请求地址">{data.url}</Descriptions.Item>
            <Descriptions.Item label="请求方法">{data.method}</Descriptions.Item>
            <Descriptions.Item label="请求头">{data.requestHeader}</Descriptions.Item>
            <Descriptions.Item label="响应头">{data.responseHeader}</Descriptions.Item>
            <Descriptions.Item label="创建时间">{data.createTime}</Descriptions.Item>
            <Descriptions.Item label="更新时间">{data.updateTime}</Descriptions.Item>
          </Descriptions>
        ) : (<title>接口不存在</title>)}
      </Card>
      <Divider />

      <Card>
        {/* 创建一个表单,表单名称为"invoke",布局方式为垂直布局,当表单提交时调用onFinish方法 */}
        <Form name="invoke" layout="vertical" onFinish={onFinish}>
          {/* 创建一个表单项,用于输入请求参数,表单项名称为"userRequestParams" */}
          <Form.Item label="请求参数" name="userRequestParams">
            {/*<Input.TextArea />*/}
          {/*  创建一个输入框,用于输入请求参数,输入框名称为"requestParams" */}
            <TextArea rows={4}/>
          </Form.Item>
          {/* 创建一个包裹项,设置其宽度占据 16 个栅格列 */}
          <Form.Item wrapperCol={{ span: 16 }}>
            {/* 创建调用按钮*/}
            <Button type="primary" htmlType="submit">
              调用
            </Button>
          </Form.Item>
        </Form>
      </Card>
      <Divider />
      <Card title='响应结果' loading={invokeLoading}>
        {invokeRes}
      </Card>

    </PageContainer>

  );
};

export default Index;
