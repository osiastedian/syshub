import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
  PaginationListStandalone,
} from "react-bootstrap-table2-paginator";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import './RemotePagination.scss';


const getColumns = (t, isMobile) => {
  const allColumns = [
    {
      text: t("check.table.address"),
      dataField: "address",
      headerStyle: {
        width: '244px',
        minWidth: '244px'
      }
    },
    {
      text: t("check.table.protocol"),
      dataField: "protocol",
      headerStyle: {
        width: '180px',
        minWidth: '180px'
      }
    },
    {
      text: t("check.table.status"),
      dataField: "status",
      headerStyle: {
        width: '140px',
        minWidth: '140px'
      },
      formatter: (cell) => {
        const lowerStatus = cell?.toLowerCase() || "";
        let badgeClass = "status-badge";

        if (lowerStatus === "pending") {
          badgeClass += " status-badge--pending";
        } else if (lowerStatus === "enabled") {
          badgeClass += " status-badge--enabled";
        }

        return (
          <span className={badgeClass}>
            {cell}
          </span>
        );
      },
    },
    {
      text: t("check.table.payee"),
      dataField: "payee",
      formatter: (cell) => (
        <div className="payee-cell">
          {cell}
        </div>
      ),
    },
    {
      text: t("check.table.lastpaidtime"),
      dataField: "lastpaidtime",
      headerStyle: {
        width: '140px',
        minWidth: '140px'
      }
    },
  ];

  // Mobile: show only address and lastpaidtime
  if (isMobile) {
    return [
      {
        text: t("check.table.address"),
        dataField: "address",
        formatter: (cell, row) => {
          const lowerStatus = row.status?.toLowerCase() || "";
          let badgeClass = "status-badge status-badge--mobile";

          if (lowerStatus === "pending") {
            badgeClass += " status-badge--pending";
          } else if (lowerStatus === "enabled") {
            badgeClass += " status-badge--enabled";
          }

          return (
            <div className="address-cell-mobile">
              <span className="address-text">{cell}</span>
              <span className={badgeClass}>
                {row.status}
              </span>
            </div>
          );
        },
      },
      {
        text: t("check.table.lastpaidtime"),
        dataField: "lastpaidtime",
        headerStyle: {
          width: '96px',
          minWidth: '96px'
        },
        formatter: (cell) => (
          <div className="lastpaid-cell-mobile">
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
}) => {
  // Calculate pagination info
  const from = (page - 1) * sizePerPage + 1;
  const to = Math.min(page * sizePerPage, totalSize);

  return (
    <div className="sentry-table-wrapper">
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
            <div className="sentry-table-container">
              <BootstrapTable
                remote
                keyField="address"
                data={data}
                columns={getColumns(t, isMobile)}
                onTableChange={onTableChange}
                wrapperClasses="sentry-table"
                bordered={false}
                {...paginationTableProps}
              />
            </div>

            {!simple && (
              <div className="sentry-pagination-container">
                <div className="pagination-info">
                  Showing {from} to {to} of {totalSize}
                </div>
                <PaginationListStandalone {...paginationProps} />
              </div>
            )}
          </div>
        )}
      </PaginationProvider>
    </div>
  );
};

export default RemotePagination;