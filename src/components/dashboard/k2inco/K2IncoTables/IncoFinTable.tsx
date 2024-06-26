import { Table, TableProps } from 'antd';

// TODO: fix column calcs
const getColumns = (data) => {
  if (data) {
    const res = data.reduce(function (arr, o) {
      return Object.keys(o).reduce(function (a, k) {
        if (a.indexOf(k) == -1) a.push(k);
        return a;
      }, arr);
    }, []);
    const logtext = res.map((item) => ({
      title: item,
      dataIndex: item,
      key: item,
    }));
    return logtext.slice(19, 23);
  }
};

type Props = {
  data: [];
} & TableProps<any>;

export const IncoFinTable = ({ data, ...others }: Props) => {
  return (
    <Table
      dataSource={data}
      columns={getColumns(data)}
      className="overflow-scroll"
      {...others}
    />
  );
};
