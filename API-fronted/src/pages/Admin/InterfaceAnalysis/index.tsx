import { PageContainer } from '@ant-design/pro-components';
import '@umijs/max';
import React, { useEffect, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import {listTopInvokeInterfaceInfoUsingGet} from "@/services/API-backend/analysisController";

/**
 * 接口分析
 * @constructor
 */
const InterfaceAnalysis: React.FC = () => {
  // 存储数据的状态
  const [data, setData] = useState<API.InterfaceInfoVO[]>([]);
  // 控制加载状态的状态，默认加载中(true)
  const [loading, setLoading] = useState(true);

  useEffect(() => {//可以使用then来代替await
    listTopInvokeInterfaceInfoUsingGet().then(res => {
      if(res.data){
        setData(res.data);
      }
    }).catch(err => {
      console.log(err);
    })
    // todo 从远程获取数据
  },[])
const chartData = data.map(item=> {return{
    value:item.totalNum,
    name:item.name,
}})
  // ECharts图表的配置选项
  const option = {
    title: {
      text: '接口调用次数分析',
      subtext: 'Fake Data',
      left: 'center'

    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      left: 'left'
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: '80%',
        data: chartData,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  }
  return (
    <PageContainer>
      {/* 使用 ReactECharts 组件，传入图表配置 */}
      <ReactECharts loadingOption={{
        // 控制加载状态
        showLoading: loading
      }}
                    option={option} />
    </PageContainer>
  );
};
export default InterfaceAnalysis;
