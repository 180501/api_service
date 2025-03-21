import React, {useEffect, useState} from 'react';
import {
  Button,
  Card,
  Cascader,
  Checkbox,
  Col,
  Form,
  Grid, Input,
  message,
  Row, Select,
  Skeleton,
  Upload,
} from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { LoadingOutlined, UploadOutlined } from '@ant-design/icons';
import ReactECharts from 'echarts-for-react';
import { genChartByAiUsingPost } from '@/services/swagger/chartController';
import stringify from "safe-stable-stringify";
import {string} from "prop-types";

const { useBreakpoint } = Grid;

const AddChart: React.FC = () => {
  const screens = useBreakpoint();
  const [componentDisabled, setComponentDisabled] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [chart, setChart] = useState<API.BiResponse>();
  const [option, setOption] = useState<any>();
  const options = {
    // title: {
    //   text: '生成图表示例',
    // },
    grid: { top: 8, right: 8, bottom: 24, left: 36 },
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line',
        smooth: true,
      },
    ],
    tooltip: {
      trigger: 'axis',
    },
  };
  // 新增：骨架屏配置
  const chartSkeletonOptions = {
    grid: { show: true, left: '10%', right: '5%' },
    xAxis: { show: true, data: new Array(7).fill('') },
    yAxis: { show: true },
    series: [{ type: 'line', data: new Array(7).fill(0) }]
  };
// 新增状态依赖
//   useEffect(() => {
//     console.log('这是你的返回结果',chart);
//    alert("状态依赖"+chart?.genChart)
//     if (chart?.genChart) {
//       try {
//         const chartOption = JSON.parse(chart?.genChart ?? '');
//         alert("状态依赖"+typeof chartOption);
//         setOption(chartOption);
//       } catch (e) {
//         message.error('图表配置解析错误');
//       }
//     }
//   }, [chart]); // 当chart更新时触发
  const onFinish = async (values: any) => {
    if (submitting) {
      return;
    }
    // 当开始提交，把submitting设置为true
    setSubmitting(true);
    // 对接后端，上传数据
    const params = {
      ...values,
      file: undefined,
    };
    try {
      console.log("响应结果:",values);
      const res = await genChartByAiUsingPost(params, {}, values.file.file.originFileObj);
      // ...原有处理逻辑...
      // 正常情况下，如果没有返回值就分析失败，有，就分析成功
      if (!res?.data) {
        message.error('分析失败');
      } else {
        message.success('分析成功');
        // 解析成对象，为空则设为空字符串
        console.log("原始option:",res?.data.genChart);
        const chartOption = JSON.parse(res.data.genChart ? res.data.genChart : '');
        // 修改后（先序列化再解析）
        // const rawChartStr = res.data.genChart ?? ''; //res.data.genChart ?? ''意思是;
        //
        // const chartOption = JSON.parse(JSON.parse(rawChartStr)); // 关键修复
        // 如果为空，则抛出异常，并提示'图表代码解析错误'
        if (!chartOption) {
          throw new Error('图表代码解析错误')
          // 如果成功
        } else {
          // 从后端得到响应结果之后，把响应结果设置到图表状态里
          setChart(res.data);
          setOption(chartOption);
          // setOption(JSON.parse(chart?.genChart));
          console.log("这是你的图表信息:",option);
        }
      }
    } catch (e:any){
      message.error('分析失败,' + e.message);

    }finally {
      setSubmitting(false);
      // setTimeout(() => setSubmitting(false), 1000); // 延迟释放按钮状态
    }
  };

  return (
    <div style={{ padding: screens.xs ? 16 : 24 }}>
      <Row gutter={[24, 24]} wrap={false}>
        {/* 左侧表单区域 */}
        <Col flex="400px" style={{ minWidth: 360 }}>
          <Card
            title="智能分析配置"
            bordered={false}
            extra={
            <>
              <Checkbox
                // onChange={e => setComponentDisabled(e.target.checked)}
              >
                离线模式
              </Checkbox>
              <Checkbox
              // checked={componentDisabled? false : true}
            onChange={e => setComponentDisabled(!e.target.checked)}
          >

            异步模式
          </Checkbox>
            </>
            }
          >
            <Form
              layout="vertical"
              onFinish={onFinish}
              initialValues={{ chartType: 'line' }}
            >
              {/* 优化后的表单项目 */}
              <Form.Item
                label="分析需求"
                name="goal"
                rules={[{ required: true }, { max: 1111 }]}
              >
                <TextArea
                  rows={4}
                  placeholder="示例：分析用户增长趋势，需包含环比数据..."
                  allowClear
                />
              </Form.Item>

              <Form.Item label="图表类型" name="chartType">
                <Select defaultValue={"line"}>
                  <Select.Option value="line">折线图</Select.Option>
                  <Select.Option value="bar">柱状图</Select.Option>
                  <Select.Option value="pie">饼图</Select.Option>
                  <Select.Option value="scatter">散点图</Select.Option>
                  <Select.Option value="radar">雷达图</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item label="图表名称" name="name">
                <Input placeholder="请输入图表名称"
                  allowClear
                  maxLength={20}
                />
              </Form.Item>

              <Form.Item label="模型选择" name="modeltype">
                <Cascader
                  options={[
                    {
                      value: 'DeepSeek',
                      label: 'DeepSeek',
                      children: [
                        {
                          value: '-V3',
                          label: 'V3',
                        },
                        {
                          value: '-R1',
                          label: 'R1',
                        },
                      ],
                    },
                    {
                      value: 'DouBao',
                      label: '豆包',
                      children: [
                        {
                          value: '-lite-32k',
                          label: 'lite-32k',
                        },
                        {
                          value: '-lite-64k',
                          label: 'lite-64k',
                        },
                      ],
                    }
                  ]}
                  displayRender={labels => labels.join(' ')}
                  placeholder="请选择分析模型"
                />
              </Form.Item>

              <Form.Item label="数据文件" name="file">
                <Upload.Dragger
                  accept=".csv,.xlsx,.doc,.md"
                  maxCount={1}
                  // showUploadList={false}
                >
                  <p className="ant-upload-drag-icon">
                    <UploadOutlined />
                  </p>
                  <p>点击或拖拽CSV文件上传</p>
                </Upload.Dragger>
              </Form.Item>

              <Form.Item style={{ marginTop: 32 }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  loading={submitting}
                  icon={submitting ? <LoadingOutlined /> : null}
                >
                  {submitting ? '分析中...' : '开始智能分析'}
                </Button>
                <Button
                  block
                  style={{ marginTop: 32 }}
                  type="default"
                  htmlType="reset">重置</Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>

        {/* 右侧结果区域 */}
        <Col flex="auto">
          <Card
            title="分析结果"
            bordered={false}
            bodyStyle={{ height: 'calc(130vh)', overflowY: 'auto' }}
          >
            {submitting ? (
              <>
                <Skeleton active paragraph={{ rows: 4 }} />
                <Skeleton.Node active style={{ height: 400, width: '100%' }}>
                  <ReactECharts option={chartSkeletonOptions} />
                </Skeleton.Node>
              </>
            ) : (
              <>
                {componentDisabled && (
                  <>
                  <Card.Grid
                    hoverable={false}
                    style={{ width: '100%', boxShadow: 'none' }}
                  >
                    <h3>分析结论</h3>
                    <div style={{ color: 'rgba(0,0,0,0.85)' }}>
                      {chart?.genResult || '等待分析结果...'}
                    </div>

                  </Card.Grid>
                 <Card.Grid style={{ width: '100%', paddingTop: 24 }}>
                  <h3>可视化图表</h3>
                  <ReactECharts
                    option={option?option:options}
                    style={{ height: 400 }}
                    opts={{ renderer: 'svg' }}
                  />
                </Card.Grid>
                  </>
                ) }
              </>
            )}
          </Card>
        </Col>

      </Row>
    </div>
  );
};
export default AddChart;
