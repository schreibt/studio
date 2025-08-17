import type { Meta, StoryObj } from '@storybook/react';
import { DataTable, Column } from './DataTable';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'Active' | 'Inactive';
  lastLogin: string;
}

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  inStock: boolean;
  rating: number;
}

const meta: Meta<typeof DataTable> = {
  title: 'Components/DataTable',
  component: DataTable,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    loading: {
      control: { type: 'boolean' },
    },
    selectable: {
      control: { type: 'boolean' },
    },
    selectableType: {
      control: { type: 'select' },
      options: ['single', 'multiple'],
    },
  },
} satisfies Meta<typeof DataTable>;

export default meta;
type Story = StoryObj<typeof meta>;

// Sample data
const userData: User[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Developer', status: 'Active', lastLogin: '2024-01-15' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Designer', status: 'Active', lastLogin: '2024-01-14' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Manager', status: 'Inactive', lastLogin: '2024-01-10' },
  { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'Developer', status: 'Active', lastLogin: '2024-01-13' },
  { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', role: 'Analyst', status: 'Active', lastLogin: '2024-01-12' },
];

const productData: Product[] = [
  { id: 'P001', name: 'Laptop', price: 999.99, category: 'Electronics', inStock: true, rating: 4.5 },
  { id: 'P002', name: 'Mouse', price: 29.99, category: 'Electronics', inStock: true, rating: 4.2 },
  { id: 'P003', name: 'Keyboard', price: 89.99, category: 'Electronics', inStock: false, rating: 4.0 },
  { id: 'P004', name: 'Monitor', price: 299.99, category: 'Electronics', inStock: true, rating: 4.7 },
  { id: 'P005', name: 'Headphones', price: 149.99, category: 'Audio', inStock: true, rating: 4.3 },
];

const userColumns: Column<User>[] = [
  { key: 'id', title: 'ID', dataIndex: 'id', sortable: true, width: '80px' },
  { key: 'name', title: 'Name', dataIndex: 'name', sortable: true },
  { key: 'email', title: 'Email', dataIndex: 'email', sortable: true },
  { key: 'role', title: 'Role', dataIndex: 'role', sortable: true },
  { 
    key: 'status', 
    title: 'Status', 
    dataIndex: 'status', 
    sortable: true,
    render: (value) => (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
        value === 'Active' 
          ? 'bg-green-100 text-green-800' 
          : 'bg-red-100 text-red-800'
      }`}>
        {value}
      </span>
    )
  },
  { key: 'lastLogin', title: 'Last Login', dataIndex: 'lastLogin', sortable: true },
];

const productColumns: Column<Product>[] = [
  { key: 'id', title: 'Product ID', dataIndex: 'id', sortable: true },
  { key: 'name', title: 'Product Name', dataIndex: 'name', sortable: true },
  { 
    key: 'price', 
    title: 'Price', 
    dataIndex: 'price', 
    sortable: true,
    render: (value) => `$${value.toFixed(2)}`
  },
  { key: 'category', title: 'Category', dataIndex: 'category', sortable: true },
  { 
    key: 'inStock', 
    title: 'In Stock', 
    dataIndex: 'inStock', 
    sortable: true,
    render: (value) => (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
        value 
          ? 'bg-green-100 text-green-800' 
          : 'bg-red-100 text-red-800'
      }`}>
        {value ? 'Yes' : 'No'}
      </span>
    )
  },
  { 
    key: 'rating', 
    title: 'Rating', 
    dataIndex: 'rating', 
    sortable: true,
    render: (value) => (
      <div className="flex items-center">
        <span className="text-yellow-500">★</span>
        <span className="ml-1">{value}</span>
      </div>
    )
  },
];

export const Default: Story = {
  args: {
    data: userData,
    columns: userColumns,
  },
};

export const WithSelection: Story = {
  args: {
    data: userData,
    columns: userColumns,
    selectable: true,
  },
};

export const SingleSelection: Story = {
  args: {
    data: userData,
    columns: userColumns,
    selectable: true,
    selectableType: 'single',
  },
};

export const Loading: Story = {
  args: {
    data: [],
    columns: userColumns,
    loading: true,
  },
};

export const Empty: Story = {
  args: {
    data: [],
    columns: userColumns,
    emptyText: 'No users found',
  },
};

export const Products: Story = {
  args: {
    data: productData,
    columns: productColumns,
    selectable: true,
  },
};

export const WithRowClick: Story = {
  args: {
    data: userData,
    columns: userColumns,
    onRowClick: (row, index) => {
      console.log('Row clicked:', row, 'Index:', index);
    },
  },
};

export const WithPagination: Story = {
  args: {
    data: userData.slice(0, 2),
    columns: userColumns,
    pagination: {
      current: 1,
      pageSize: 2,
      total: userData.length,
      onChange: (page, size) => {
        console.log('Page changed:', page, 'Size:', size);
      },
    },
  },
};

export const CustomEmptyText: Story = {
  args: {
    data: [],
    columns: userColumns,
    emptyText: 'No users available at the moment',
    loadingText: 'Fetching users...',
  },
};

export const WithCustomRowKey: Story = {
  args: {
    data: userData,
    columns: userColumns,
    rowKey: 'email',
  },
};

export const ComplexData: Story = {
  render: () => {
    const complexData = [
      {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        role: 'Developer',
        status: 'Active',
        lastLogin: '2024-01-15',
        actions: 'Edit, Delete',
      },
      {
        id: 2,
        name: 'Jane Smith',
        email: 'jane@example.com',
        role: 'Designer',
        status: 'Active',
        lastLogin: '2024-01-14',
        actions: 'Edit, Delete',
      },
    ];

    const complexColumns: Column<any>[] = [
      { key: 'id', title: 'ID', dataIndex: 'id', sortable: true, width: '60px' },
      { key: 'name', title: 'Name', dataIndex: 'name', sortable: true },
      { key: 'email', title: 'Email', dataIndex: 'email', sortable: true },
      { key: 'role', title: 'Role', dataIndex: 'role', sortable: true },
      { 
        key: 'status', 
        title: 'Status', 
        dataIndex: 'status', 
        sortable: true,
        render: (value) => (
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
            value === 'Active' 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
          }`}>
            {value}
          </span>
        )
      },
      { key: 'lastLogin', title: 'Last Login', dataIndex: 'lastLogin', sortable: true },
      { 
        key: 'actions', 
        title: 'Actions', 
        dataIndex: 'actions',
        render: () => (
          <div className="flex space-x-2">
            <button className="text-primary-600 hover:text-primary-800 text-sm">Edit</button>
            <button className="text-red-600 hover:text-red-800 text-sm">Delete</button>
          </div>
        )
      },
    ];

    return (
      <DataTable
        data={complexData}
        columns={complexColumns}
        selectable={true}
        onRowSelect={(rows) => console.log('Selected rows:', rows)}
      />
    );
  },
};

export const ResponsiveTable: Story = {
  render: () => (
    <div className="w-full max-w-4xl">
      <DataTable
        data={userData}
        columns={userColumns}
        selectable={true}
        className="w-full"
      />
    </div>
  ),
};


