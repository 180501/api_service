import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
import React from 'react';


const Footer: React.FC = () => {
  const Message = 'ljj的创意工坊';
  return (

    <DefaultFooter
      copyright={`${Message}`}
      style={{
        background: 'none',
        marginTop: 30,
      }}
      links={[
        {
          key: 'github',
          title: <GithubOutlined />,
          href: 'https://github.com/180501?tab=repositories',
          blankTarget: true,
        },
        {
          key: '数据智能',
          title: '数据智能',
          href: 'https://github.com/180501?tab=repositories',
          blankTarget: true,
        },
      ]}
    />
  );
};

export default Footer;
