import { useState } from 'react';
import { InputField } from './components/InputField';
import { DataTable, Column } from './components/DataTable';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'Active' | 'Inactive';
  lastLogin: string;
}

function App() {
  const [inputValue, setInputValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [selectedRows, setSelectedRows] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 3;

  // Sample data for DataTable
  const sampleData: User[] = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Developer', status: 'Active', lastLogin: '2024-01-15' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Designer', status: 'Active', lastLogin: '2024-01-14' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Manager', status: 'Inactive', lastLogin: '2024-01-10' },
    { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'Developer', status: 'Active', lastLogin: '2024-01-13' },
    { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', role: 'Analyst', status: 'Active', lastLogin: '2024-01-12' },
    { id: 6, name: 'Diana Prince', email: 'diana@example.com', role: 'Designer', status: 'Active', lastLogin: '2024-01-11' },
  ];

  const columns: Column<User>[] = [
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

  const handleLoadingDemo = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 3000);
  };

  const handlePaginationChange = (page: number) => {
    setCurrentPage(page);
  };

  const paginatedData = sampleData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            React Components Assignment
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            InputField & DataTable Components with TypeScript and TailwindCSS
          </p>
          <div className="flex justify-center space-x-4">
            <a 
              href="/storybook" 
              className="btn btn-primary"
            >
              View in Storybook
            </a>
            <a 
              href="https://github.com/your-repo/react-components-assignment" 
              className="btn btn-outline"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub Repository
            </a>
          </div>
        </header>
        
        <div className="space-y-12">
          {/* InputField Demo */}
          <section className="bg-white rounded-lg p-8 shadow-sm border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">InputField Component</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Basic Input */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Basic Input</h3>
                <InputField
                  label="Full Name"
                  placeholder="Enter your full name"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  helperText="This is helper text"
                  showClearButton={true}
                />
              </div>

              {/* Password Input */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Password Input</h3>
                <InputField
                  type="password"
                  label="Password"
                  placeholder="Enter your password"
                  value={passwordValue}
                  onChange={(e) => setPasswordValue(e.target.value)}
                  helperText="Password must be at least 8 characters"
                />
              </div>

              {/* Error State */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Error State</h3>
                <InputField
                  label="Email"
                  placeholder="Enter your email"
                  value="invalid-email"
                  invalid={true}
                  errorMessage="Please enter a valid email address"
                />
              </div>

              {/* Variants */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Filled Variant</h3>
                <InputField
                  variant="filled"
                  label="Search"
                  placeholder="Search..."
                  showClearButton={true}
                />
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Ghost Variant</h3>
                <InputField
                  variant="ghost"
                  label="Username"
                  placeholder="Enter username"
                />
              </div>

              {/* Sizes */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Sizes</h3>
                <div className="space-y-3">
                  <InputField size="sm" placeholder="Small input" />
                  <InputField size="md" placeholder="Medium input" />
                  <InputField size="lg" placeholder="Large input" />
                </div>
              </div>

              {/* Disabled State */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Disabled State</h3>
                <InputField
                  label="Disabled Input"
                  placeholder="This is disabled"
                  value="Cannot edit this"
                  disabled={true}
                />
              </div>

              {/* Required Field */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Required Field</h3>
                <InputField
                  label="Required Field"
                  placeholder="This field is required"
                  required={true}
                  helperText="This field must be filled"
                />
              </div>

              {/* Email Input */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Email Input</h3>
                <InputField
                  type="email"
                  label="Email Address"
                  placeholder="Enter your email"
                  autoComplete="email"
                />
              </div>
            </div>
          </section>

          {/* DataTable Demo */}
          <section className="bg-white rounded-lg p-8 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">DataTable Component</h2>
              <button
                onClick={handleLoadingDemo}
                className="btn btn-primary"
              >
                Demo Loading State
              </button>
            </div>

            {selectedRows.length > 0 && (
              <div className="mb-4 p-3 bg-primary-50 border border-primary-200 rounded-lg">
                <p className="text-sm text-primary-800">
                  Selected {selectedRows.length} row(s): {selectedRows.map(row => row.name).join(', ')}
                </p>
              </div>
            )}

            <DataTable
              data={paginatedData}
              columns={columns}
              loading={isLoading}
              selectable={true}
              onRowSelect={setSelectedRows}
              rowKey="id"
              onRowClick={(row) => console.log('Row clicked:', row)}
              pagination={{
                current: currentPage,
                pageSize: pageSize,
                total: sampleData.length,
                onChange: handlePaginationChange,
              }}
            />
          </section>

          {/* Documentation */}
          <section className="bg-white rounded-lg p-8 shadow-sm border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Component Documentation</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">InputField Props</h3>
                <div className="bg-gray-50 p-4 rounded-lg text-sm font-mono">
                  <div className="space-y-2">
                    <div><span className="text-primary-600">value?:</span> string</div>
                    <div><span className="text-primary-600">onChange?:</span> (e: ChangeEvent) =&gt; void</div>
                    <div><span className="text-primary-600">label?:</span> string</div>
                    <div><span className="text-primary-600">placeholder?:</span> string</div>
                    <div><span className="text-primary-600">helperText?:</span> string</div>
                    <div><span className="text-primary-600">errorMessage?:</span> string</div>
                    <div><span className="text-primary-600">disabled?:</span> boolean</div>
                    <div><span className="text-primary-600">invalid?:</span> boolean</div>
                    <div><span className="text-primary-600">variant?:</span> 'filled' | 'outlined' | 'ghost'</div>
                    <div><span className="text-primary-600">size?:</span> 'sm' | 'md' | 'lg'</div>
                    <div><span className="text-primary-600">type?:</span> 'text' | 'password' | 'email' | 'number' | 'tel' | 'url'</div>
                    <div><span className="text-primary-600">showClearButton?:</span> boolean</div>
                    <div><span className="text-primary-600">required?:</span> boolean</div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">DataTable Props</h3>
                <div className="bg-gray-50 p-4 rounded-lg text-sm font-mono">
                  <div className="space-y-2">
                    <div><span className="text-primary-600">data:</span> T[]</div>
                    <div><span className="text-primary-600">columns:</span> Column&lt;T&gt;[]</div>
                    <div><span className="text-primary-600">loading?:</span> boolean</div>
                    <div><span className="text-primary-600">selectable?:</span> boolean</div>
                    <div><span className="text-primary-600">onRowSelect?:</span> (rows: T[]) =&gt; void</div>
                    <div><span className="text-primary-600">rowKey?:</span> keyof T | (record: T, index: number) =&gt; string</div>
                    <div><span className="text-primary-600">onRowClick?:</span> (record: T, index: number) =&gt; void</div>
                    <div><span className="text-primary-600">selectableType?:</span> 'single' | 'multiple'</div>
                    <div><span className="text-primary-600">pagination?:</span> PaginationConfig</div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default App;

