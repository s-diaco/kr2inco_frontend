import { Table, TableProps } from 'antd';

// TODO: don't look in every record to find keys. just use first one.
const getColumns = (data) => {
  if (data) {
    const res = data.reduce(function (arr, o) {
      return Object.keys(o).reduce(function (a, k) {
        if (a.indexOf(k) == -1) a.push(k);
        return a;
      }, arr);
    }, []);
    const columns = res.map((item) => ({
      title: item,
      dataIndex: item,
      key: item,
    }));
    return columns.slice(19, 23);
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
