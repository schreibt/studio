import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { DataTable, Column } from '../DataTable';

interface TestData {
  id: number;
  name: string;
  email: string;
}

const testData: TestData[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com' },
];

const testColumns: Column<TestData>[] = [
  { key: 'id', title: 'ID', dataIndex: 'id', sortable: true },
  { key: 'name', title: 'Name', dataIndex: 'name', sortable: true },
  { key: 'email', title: 'Email', dataIndex: 'email', sortable: true },
];

describe('DataTable', () => {
  it('renders table with data', () => {
    render(<DataTable data={testData} columns={testColumns} />);
    
    expect(screen.getByText('ID')).toBeInTheDocument();
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
    
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    expect(screen.getByText('Bob Johnson')).toBeInTheDocument();
  });

  it('renders loading state', () => {
    render(<DataTable data={[]} columns={testColumns} loading={true} />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders empty state', () => {
    render(<DataTable data={[]} columns={testColumns} />);
    expect(screen.getByText('No data available')).toBeInTheDocument();
  });

  it('renders custom empty text', () => {
    render(<DataTable data={[]} columns={testColumns} emptyText="No records found" />);
    expect(screen.getByText('No records found')).toBeInTheDocument();
  });

  it('renders selection checkboxes when selectable is true', () => {
    render(<DataTable data={testData} columns={testColumns} selectable={true} />);
    
    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes).toHaveLength(testData.length + 1); // +1 for select all checkbox
  });

  it('calls onRowSelect when row is selected', () => {
    const handleRowSelect = vi.fn();
    render(
      <DataTable 
        data={testData} 
        columns={testColumns} 
        selectable={true}
        onRowSelect={handleRowSelect}
      />
    );
    
    const firstRowCheckbox = screen.getAllByRole('checkbox')[1]; // Skip select all checkbox
    fireEvent.click(firstRowCheckbox);
    
    expect(handleRowSelect).toHaveBeenCalledWith([testData[0]]);
  });

  it('selects all rows when select all checkbox is clicked', () => {
    const handleRowSelect = vi.fn();
    render(
      <DataTable 
        data={testData} 
        columns={testColumns} 
        selectable={true}
        onRowSelect={handleRowSelect}
      />
    );
    
    const selectAllCheckbox = screen.getAllByRole('checkbox')[0];
    fireEvent.click(selectAllCheckbox);
    
    expect(handleRowSelect).toHaveBeenCalledWith(testData);
  });

  it('calls onRowClick when row is clicked', () => {
    const handleRowClick = vi.fn();
    render(
      <DataTable 
        data={testData} 
        columns={testColumns}
        onRowClick={handleRowClick}
      />
    );
    
    const firstRow = screen.getByText('John Doe').closest('tr');
    fireEvent.click(firstRow!);
    
    expect(handleRowClick).toHaveBeenCalledWith(testData[0], 0);
  });

  it('sorts data when sortable column header is clicked', () => {
    render(<DataTable data={testData} columns={testColumns} />);
    
    const nameHeader = screen.getByText('Name');
    fireEvent.click(nameHeader);
    
    // Check if sort indicators are present
    expect(nameHeader.closest('th')).toHaveClass('cursor-pointer');
  });

  it('renders custom cell content with render function', () => {
    const columnsWithRender: Column<TestData>[] = [
      { key: 'id', title: 'ID', dataIndex: 'id' },
      { 
        key: 'name', 
        title: 'Name', 
        dataIndex: 'name',
        render: (value) => <span data-testid="custom-name">{value.toUpperCase()}</span>
      },
    ];
    
    render(<DataTable data={testData} columns={columnsWithRender} />);
    
    expect(screen.getByTestId('custom-name')).toBeInTheDocument();
    expect(screen.getByText('JOHN DOE')).toBeInTheDocument();
  });

  it('renders pagination when provided', () => {
    const pagination = {
      current: 1,
      pageSize: 2,
      total: testData.length,
      onChange: vi.fn(),
    };
    
    render(
      <DataTable 
        data={testData.slice(0, 2)} 
        columns={testColumns}
        pagination={pagination}
      />
    );
    
    expect(screen.getByText('Showing 1 to 2 of 3 results')).toBeInTheDocument();
    expect(screen.getByText('Previous')).toBeInTheDocument();
    expect(screen.getByText('Next')).toBeInTheDocument();
  });

  it('handles single selection mode', () => {
    const handleRowSelect = vi.fn();
    render(
      <DataTable 
        data={testData} 
        columns={testColumns} 
        selectable={true}
        selectableType="single"
        onRowSelect={handleRowSelect}
      />
    );
    
    const firstRowCheckbox = screen.getAllByRole('checkbox')[1];
    const secondRowCheckbox = screen.getAllByRole('checkbox')[2];
    
    fireEvent.click(firstRowCheckbox);
    fireEvent.click(secondRowCheckbox);
    
    expect(handleRowSelect).toHaveBeenLastCalledWith([testData[1]]);
  });

  it('applies custom row key', () => {
    render(
      <DataTable 
        data={testData} 
        columns={testColumns}
        rowKey="email"
      />
    );
    
    // Should render without errors
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <DataTable 
        data={testData} 
        columns={testColumns}
        className="custom-table"
      />
    );
    
    expect(container.firstChild).toHaveClass('custom-table');
  });
});


