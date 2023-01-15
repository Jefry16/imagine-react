import { Table } from "antd";
import { ExpandableConfig } from "antd/es/table/interface";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { axiosPrivate } from "../api/axios";

export default function CustomTable(props: {
  columns: any;
  refetch: boolean;
  url: string;
  expandable?: ExpandableConfig<any> | undefined;
}) {
  const { data, isLoading, refetch } = useQuery(
    "",
    () => axiosPrivate.get(props.url),
    {
      enabled: false,
    }
  );

  useEffect(() => {
    refetch();
  }, [props.refetch]);

  return (
    <Table
      rowKey={(row) => row.id}
      loading={isLoading}
      dataSource={data?.data}
      columns={props.columns}
      rowSelection={{}}
      expandable={{ ...props.expandable }}
    />
  );
}
