import { Alert, Button, Col, Row, Space } from 'antd';
import { Card, IncoFinTable, Loader, PageHeader } from '../../components';
import { useState } from 'react';
import {
  CloudUploadOutlined,
  HomeOutlined,
  PieChartOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { DASHBOARD_ITEMS } from '../../constants';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import useSWR from 'swr';
import { fetcher } from '../../utils/axios';
import { FinRepResponse } from '../../types';

const PROJECT_TABS = [
  {
    key: 'all',
    label: 'All',
  },
  {
    key: 'inProgress',
    label: 'Active',
  },
  {
    key: 'onHold',
    label: 'On Hold',
  },
];

export const FinancialDashboardPage = () => {
  const reportId = '1';
  const {
    data: finData,
    error: finDataError,
    isLoading: finDataLoading,
  } = useSWR<FinRepResponse>(`/hsreport/${reportId}/`, fetcher);
  const [projectTabsKey, setProjectsTabKey] = useState<string>('all');

  const PROJECT_TABS_CONTENT: Record<string, React.ReactNode> = {
    all: <IncoFinTable key="all-projects-table" data={finData} />,
    inProgress: (
      <IncoFinTable key="in-progress-projects-table" data={finData} />
    ),
    onHold: <IncoFinTable key="on-hold-projects-table" data={finData} />,
  };

  const onProjectsTabChange = (key: string) => {
    setProjectsTabKey(key);
  };

  return (
    <div>
      <Helmet>
        <title>Financial | Antd Dashboard</title>
      </Helmet>
      <PageHeader
        title="financial dashboard"
        breadcrumbs={[
          {
            title: (
              <>
                <HomeOutlined />
                <span>home</span>
              </>
            ),
            path: '/',
          },
          {
            title: (
              <>
                <PieChartOutlined />
                <span>dashboards</span>
              </>
            ),
            menu: {
              items: DASHBOARD_ITEMS.map((d) => ({
                key: d.title,
                title: <Link to={d.path}>{d.title}</Link>,
              })),
            },
          },
          {
            title: 'financial',
          },
        ]}
      />
      <Row
        gutter={[
          { xs: 8, sm: 16, md: 24, lg: 32 },
          { xs: 8, sm: 16, md: 24, lg: 32 },
        ]}
      >
        <Col span={24}>
          <Card
            title="Financial"
            extra={
              <Space>
                <Button icon={<CloudUploadOutlined />}>Import</Button>
                <Button icon={<PlusOutlined />}>New</Button>
              </Space>
            }
            tabList={PROJECT_TABS}
            activeTabKey={projectTabsKey}
            onTabChange={onProjectsTabChange}
          >
            {PROJECT_TABS_CONTENT[projectTabsKey]}
          </Card>
        </Col>
      </Row>
    </div>
  );
};
