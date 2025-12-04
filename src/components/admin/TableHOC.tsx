import {
  AiOutlineSortAscending,
  AiOutlineSortDescending,
} from "react-icons/ai";
import {
  Column,
  usePagination,
  useSortBy,
  useTable,
  TableOptions,
} from "react-table";

function TableHOC<T extends Object>(
  columns: Column<T>[],
  data: T[],
  containerClassname: string,
  heading: string,
  showPagination: boolean = false
) {
  return function HOC() {
    const options: TableOptions<T> = {
      columns,
      data,
      initialState: {
        pageSize: 6,
      },
    };

    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      page,
      prepareRow,
      nextPage,
      pageCount,
      state: { pageIndex },
      previousPage,
      canNextPage,
      canPreviousPage,
    } = useTable(options, useSortBy, usePagination);

    return (
      <div className={containerClassname}>
        <h2 className="heading">{heading}</h2>

        {/* ---------- TABLE ---------- */}
        {(() => {
          const tableProps = getTableProps();
          const { key, ...safeTableProps } = tableProps;
          return <table className="table" key={key} {...safeTableProps} />;
        })()}

        <table className="table" {...(() => {
          const props = getTableProps();
          const { key, ...rest } = props;
          return rest;
        })()}>
          <thead>
            {headerGroups.map((headerGroup) => {
              const hgProps = headerGroup.getHeaderGroupProps();
              const { key, ...safeHgProps } = hgProps;

              return (
                <tr key={key} {...safeHgProps}>
                  {headerGroup.headers.map((column) => {
                    const colProps = column.getHeaderProps(
                      column.getSortByToggleProps()
                    );

                    const { key, ...safeColProps } = colProps;

                    return (
                      <th key={key} {...safeColProps}>
                        {column.render("Header")}
                        {column.isSorted && (
                          <span>
                            {column.isSortedDesc ? (
                              <AiOutlineSortDescending />
                            ) : (
                              <AiOutlineSortAscending />
                            )}
                          </span>
                        )}
                      </th>
                    );
                  })}
                </tr>
              );
            })}
          </thead>

          <tbody
            {...(() => {
              const bodyProps = getTableBodyProps();
              const { key, ...rest } = bodyProps;
              return rest;
            })()}
          >
            {page.map((row) => {
              prepareRow(row);

              const rowProps = row.getRowProps();
              const { key, ...safeRowProps } = rowProps;

              return (
                <tr key={key} {...safeRowProps}>
                  {row.cells.map((cell) => {
                    const cellProps = cell.getCellProps();
                    const { key, ...safeCellProps } = cellProps;

                    return (
                      <td key={key} {...safeCellProps}>
                        {cell.render("Cell")}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* ---------- PAGINATION ---------- */}
        {showPagination && (
          <div className="table-pagination">
            <button disabled={!canPreviousPage} onClick={previousPage}>
              Prev
            </button>
            <span>{`${pageIndex + 1} of ${pageCount}`}</span>
            <button disabled={!canNextPage} onClick={nextPage}>
              Next
            </button>
          </div>
        )}
      </div>
    );
  };
}

export default TableHOC;
