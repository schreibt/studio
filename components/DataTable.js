function DataTable({
  data = [],
  columns = [],
  loading = false,
  selectable = false,
  onRowSelect
}) {
  try {
    const [selectedRows, setSelectedRows] = React.useState([]);
    const [sortConfig, setSortConfig] = React.useState({ key: null, direction: 'asc' });

    const handleSort = (columnKey) => {
      const column = columns.find(col => col.key === columnKey);
      if (!column?.sortable) return;

      let direction = 'asc';
      if (sortConfig.key === columnKey && sortConfig.direction === 'asc') {
        direction = 'desc';
      }
      setSortConfig({ key: columnKey, direction });
    };

    const sortedData = React.useMemo(() => {
      if (!sortConfig.key) return data;

      return [...data].sort((a, b) => {
        const column = columns.find(col => col.key === sortConfig.key);
        const aValue = a[column.dataIndex];
        const bValue = b[column.dataIndex];

        if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }, [data, sortConfig, columns]);

    const handleRowSelect = (row, isSelected) => {
      let newSelectedRows;
      if (isSelected) {
        newSelectedRows = [...selectedRows, row];
      } else {
        newSelectedRows = selectedRows.filter(selectedRow => selectedRow !== row);
      }
      setSelectedRows(newSelectedRows);
      if (onRowSelect) {
        onRowSelect(newSelectedRows);
      }
    };

    const handleSelectAll = (isSelected) => {
      const newSelectedRows = isSelected ? [...sortedData] : [];
      setSelectedRows(newSelectedRows);
      if (onRowSelect) {
        onRowSelect(newSelectedRows);
      }
    };

    const isRowSelected = (row) => selectedRows.includes(row);
    const isAllSelected = sortedData.length > 0 && selectedRows.length === sortedData.length;

    if (loading) {
      return (
        <div className="data-table" data-name="data-table-loading" data-file="components/DataTable.js">
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-3 text-gray-600">Loading...</span>
          </div>
        </div>
      );
    }

    if (data.length === 0) {
      return (
        <div className="data-table" data-name="data-table-empty" data-file="components/DataTable.js">
          <div className="flex flex-col items-center justify-center py-12 text-gray-500">
            <div className="icon-inbox text-4xl mb-4"></div>
            <p className="text-lg font-medium mb-2">No data available</p>
            <p className="text-sm">There are no records to display</p>
          </div>
        </div>
      );
    }

    return (
      <div className="data-table bg-white rounded-lg shadow-sm border border-gray-200" data-name="data-table" data-file="components/DataTable.js">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="data-table-header">
              <tr>
                {selectable && (
                  <th className="data-table-cell w-12">
                    <input
                      type="checkbox"
                      checked={isAllSelected}
                      onChange={(e) => handleSelectAll(e.target.checked)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </th>
                )}
                {columns.map((column) => (
                  <th
                    key={column.key}
                    className={`data-table-cell font-semibold text-gray-900 ${column.sortable ? 'cursor-pointer hover:bg-gray-100' : ''}`}
                    onClick={() => handleSort(column.key)}
                  >
                    <div className="flex items-center space-x-2">
                      <span>{column.title}</span>
                      {column.sortable && (
                        <div className="flex flex-col">
                          <div 
                            className={`icon-chevron-up text-xs ${
                              sortConfig.key === column.key && sortConfig.direction === 'asc' 
                                ? 'text-blue-600' : 'text-gray-400'
                            }`}
                          ></div>
                          <div 
                            className={`icon-chevron-down text-xs ${
                              sortConfig.key === column.key && sortConfig.direction === 'desc' 
                                ? 'text-blue-600' : 'text-gray-400'
                            }`}
                          ></div>
                        </div>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sortedData.map((row, index) => (
                <tr
                  key={index}
                  className={`border-b border-gray-200 hover:bg-gray-50 transition-colors ${
                    isRowSelected(row) ? 'bg-blue-50' : ''
                  }`}
                >
                  {selectable && (
                    <td className="data-table-cell">
                      <input
                        type="checkbox"
                        checked={isRowSelected(row)}
                        onChange={(e) => handleRowSelect(row, e.target.checked)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                    </td>
                  )}
                  {columns.map((column) => (
                    <td key={column.key} className="data-table-cell text-gray-700">
                      {row[column.dataIndex]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  } catch (error) {
    console.error('DataTable component error:', error);
    return null;
  }
}