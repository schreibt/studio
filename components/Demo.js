function Demo() {
  try {
    const [inputValue, setInputValue] = React.useState('');
    const [passwordValue, setPasswordValue] = React.useState('');
    const [selectedRows, setSelectedRows] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(false);

    // Sample data for DataTable
    const sampleData = [
      { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Developer', status: 'Active' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Designer', status: 'Active' },
      { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Manager', status: 'Inactive' },
      { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'Developer', status: 'Active' },
      { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', role: 'Analyst', status: 'Active' }
    ];

    const columns = [
      { key: 'id', title: 'ID', dataIndex: 'id', sortable: true },
      { key: 'name', title: 'Name', dataIndex: 'name', sortable: true },
      { key: 'email', title: 'Email', dataIndex: 'email', sortable: true },
      { key: 'role', title: 'Role', dataIndex: 'role', sortable: true },
      { key: 'status', title: 'Status', dataIndex: 'status', sortable: true }
    ];

    const handleLoadingDemo = () => {
      setIsLoading(true);
      setTimeout(() => setIsLoading(false), 3000);
    };

    return (
      <div className="space-y-12" data-name="demo" data-file="components/Demo.js">
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
          </div>
        </section>

        {/* DataTable Demo */}
        <section className="bg-white rounded-lg p-8 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">DataTable Component</h2>
            <button
              onClick={handleLoadingDemo}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Demo Loading State
            </button>
          </div>

          {selectedRows.length > 0 && (
            <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-800">
                Selected {selectedRows.length} row(s): {selectedRows.map(row => row.name).join(', ')}
              </p>
            </div>
          )}

          <DataTable
            data={sampleData}
            columns={columns}
            loading={isLoading}
            selectable={true}
            onRowSelect={setSelectedRows}
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
                  <div><span className="text-blue-600">value?:</span> string</div>
                  <div><span className="text-blue-600">onChange?:</span> (e: ChangeEvent) =&gt; void</div>
                  <div><span className="text-blue-600">label?:</span> string</div>
                  <div><span className="text-blue-600">placeholder?:</span> string</div>
                  <div><span className="text-blue-600">helperText?:</span> string</div>
                  <div><span className="text-blue-600">errorMessage?:</span> string</div>
                  <div><span className="text-blue-600">disabled?:</span> boolean</div>
                  <div><span className="text-blue-600">invalid?:</span> boolean</div>
                  <div><span className="text-blue-600">variant?:</span> 'filled' | 'outlined' | 'ghost'</div>
                  <div><span className="text-blue-600">size?:</span> 'sm' | 'md' | 'lg'</div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">DataTable Props</h3>
              <div className="bg-gray-50 p-4 rounded-lg text-sm font-mono">
                <div className="space-y-2">
                  <div><span className="text-blue-600">data:</span> T[]</div>
                  <div><span className="text-blue-600">columns:</span> Column&lt;T&gt;[]</div>
                  <div><span className="text-blue-600">loading?:</span> boolean</div>
                  <div><span className="text-blue-600">selectable?:</span> boolean</div>
                  <div><span className="text-blue-600">onRowSelect?:</span> (rows: T[]) =&gt; void</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  } catch (error) {
    console.error('Demo component error:', error);
    return null;
  }
}