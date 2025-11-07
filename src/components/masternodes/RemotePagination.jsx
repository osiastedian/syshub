import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
  PaginationListStandalone,
} from "react-bootstrap-table2-paginator";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";


const getColumns = (t, isMobile) => {
  const allColumns = [
    {
      text: t("check.table.address"),
      dataField: "address",
    },
    {
      text: t("check.table.protocol"),
      dataField: "protocol",
    },
    {
      text: t("check.table.status"),
      dataField: "status",
    },
    {
      text: t("check.table.payee"),
      dataField: "payee",
    },
    {
      text: t("check.table.lastpaidtime"),
      dataField: "lastpaidtime",
    },
    // {
    //   text: t("check.table.activeseconds"),
    //   dataField: "activeseconds",
    // },
    // {
    //   text: t("check.table.lastseen"),
    //   dataField: "lastseen",
    // },
  ];

  // Show only address and lastpaidtime on mobile, with status pill inside address cell
  if (isMobile) {
    const getStatusStyles = (status) => {
      const lowerStatus = status?.toLowerCase() || "";
      if (lowerStatus === "pending") {
        return {
          backgroundColor: "#1F5EFF33",
          color: "#1F5EFF"
        };
      } else if (lowerStatus === "enabled") {
        return {
          backgroundColor: "#FBB03B33",
          color: "#FBB03B"
        };
      }
      return {
        backgroundColor: "#f0f0f0",
        color: "#333"
      };
    };

    return [
      {
        text: t("check.table.address"),
        dataField: "address",
        formatter: (cell, row) => {
          const statusStyles = getStatusStyles(row.status);
          return (
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <span>{cell}</span>
              <span style={{
                fontSize: "12px",
                backgroundColor: statusStyles.backgroundColor,
                color: statusStyles.color,
                padding: "2px 6px",
                borderRadius: "12px",
                whiteSpace: "nowrap",
                display: "inline-block",
                width: "fit-content"
              }}>
                {row.status}
              </span>
            </div>
          );
        },
      },
      {
        text: t("check.table.lastpaidtime"),
        dataField: "lastpaidtime",
        formatter: (cell) => (
          <div style={{ textAlign: "center", fontSize: "12px" }}>
            {cell}
          </div>
        ),
      },
    ];
  }

  return allColumns;
};

/**
 * Component that renders the pagination of masternodes table
 * @component
 * @subcategory masternodes
 * @param {*} props the props sent by masternodeTable
 * @example
 * return (
 *  <RemotePagination  />
 * )
 */

const RemotePagination = ({
  data,
  page,
  sizePerPage,
  onTableChange,
  totalSize,
  onSizeChange,
  changeFieldOrder,
  t,
  simple,
  isMobile
}) => (
  <div>
    <PaginationProvider
      pagination={paginationFactory({
        custom: true,
        page,
        sizePerPage,
        totalSize,
      })}
    >
      {({ paginationProps, paginationTableProps }) => (
        <div>
          <BootstrapTable
            remote
            keyField="address"
            data={data}
            columns={getColumns(t, isMobile)}
            onTableChange={onTableChange}
            {...paginationTableProps}
          />
          
          { !simple && <PaginationListStandalone {...paginationProps} /> }
        </div>
      )}
    </PaginationProvider>
  </div>
);

export default RemotePagination;