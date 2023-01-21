import { Table } from "antd";
import { ExpandableConfig } from "antd/es/table/interface";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { axiosPrivate } from "../api/axios";
import useHttpGet from "../hooks/use-http-get";

export default function CustomTable(props: {
  columns: any;
  refetch: boolean;
  url: string;
  expandable?: ExpandableConfig<any> | undefined;
}) {
  const { isLoading, sendRequest } = useHttpGet();
  const [data, setData] = useState([]);

  useEffect(() => {
    sendRequest({ url: props.url,onSuccess:(data:any)=> setData(data)});
  }, [props.refetch]);

  return (
    <Table
      rowKey={(row) => row.id}
      loading={isLoading}
      dataSource={data}
      columns={props.columns}
      rowSelection={{}}
      expandable={{ ...props.expandable }}
    />
  );
}
