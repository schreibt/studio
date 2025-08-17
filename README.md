# React Components Assignment

A modern React component library built with TypeScript, TailwindCSS, and Storybook. This project features two highly customizable components: `InputField` and `DataTable`.

## 🚀 Features

### InputField Component
- **Flexible input types**: text, password, email, number, tel, url
- **Multiple variants**: filled, outlined, ghost
- **Size options**: small, medium, large
- **Validation states**: error, disabled, required
- **Interactive features**: clear button, password toggle
- **Accessibility**: ARIA labels, keyboard navigation
- **Modern styling**: TailwindCSS with custom design system

### DataTable Component
- **Sortable columns**: Click headers to sort data
- **Row selection**: Single or multiple selection modes
- **Loading states**: Built-in loading indicators
- **Empty states**: Customizable empty state messages
- **Pagination**: Built-in pagination controls
- **Custom rendering**: Render custom cell content
- **Responsive design**: Works on all screen sizes
- **TypeScript support**: Fully typed with generics

## 🛠️ Tech Stack

- **React 18** - Latest React with hooks and modern patterns
- **TypeScript** - Full type safety and IntelliSense
- **TailwindCSS** - Utility-first CSS framework
- **Storybook** - Component documentation and testing
- **Vitest** - Fast unit testing
- **Vite** - Modern build tool
- **Lucide React** - Beautiful icons

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/your-username/react-components-assignment.git
cd react-components-assignment

# Install dependencies
npm install

# Start development server
npm run dev

# Start Storybook
npm run storybook

# Run tests
npm test

# Build for production
npm run build
```

## 🎯 Quick Start

### Using InputField

```tsx
import { InputField } from './components/InputField';

function MyForm() {
  const [value, setValue] = useState('');

  return (
    <InputField
      label="Full Name"
      placeholder="Enter your name"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      helperText="This is helper text"
      showClearButton={true}
    />
  );
}
```

### Using DataTable

```tsx
import { DataTable, Column } from './components/DataTable';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

const data: User[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Developer' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Designer' },
];

const columns: Column<User>[] = [
  { key: 'id', title: 'ID', dataIndex: 'id', sortable: true },
  { key: 'name', title: 'Name', dataIndex: 'name', sortable: true },
  { key: 'email', title: 'Email', dataIndex: 'email', sortable: true },
  { key: 'role', title: 'Role', dataIndex: 'role', sortable: true },
];

function MyTable() {
  return (
    <DataTable
      data={data}
      columns={columns}
      selectable={true}
      onRowSelect={(selectedRows) => console.log(selectedRows)}
    />
  );
}
```

## 📚 Component Documentation

### InputField Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | `''` | Input value |
| `onChange` | `(e: ChangeEvent) => void` | - | Change handler |
| `label` | `string` | - | Input label |
| `placeholder` | `string` | - | Placeholder text |
| `helperText` | `string` | - | Helper text below input |
| `errorMessage` | `string` | - | Error message |
| `disabled` | `boolean` | `false` | Disabled state |
| `invalid` | `boolean` | `false` | Invalid state |
| `variant` | `'filled' \| 'outlined' \| 'ghost'` | `'outlined'` | Visual variant |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Input size |
| `type` | `'text' \| 'password' \| 'email' \| 'number' \| 'tel' \| 'url'` | `'text'` | Input type |
| `showClearButton` | `boolean` | `false` | Show clear button |
| `required` | `boolean` | `false` | Required field |
| `autoComplete` | `string` | - | Autocomplete attribute |
| `autoFocus` | `boolean` | `false` | Auto focus on mount |
| `readOnly` | `boolean` | `false` | Read-only state |
| `maxLength` | `number` | - | Maximum length |
| `minLength` | `number` | - | Minimum length |
| `pattern` | `string` | - | Input pattern |

### DataTable Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `T[]` | `[]` | Table data |
| `columns` | `Column<T>[]` | `[]` | Column definitions |
| `loading` | `boolean` | `false` | Loading state |
| `selectable` | `boolean` | `false` | Enable row selection |
| `onRowSelect` | `(rows: T[]) => void` | - | Row selection handler |
| `className` | `string` | `''` | Custom CSS class |
| `emptyText` | `string` | `'No data available'` | Empty state text |
| `loadingText` | `string` | `'Loading...'` | Loading state text |
| `rowKey` | `keyof T \| (record: T, index: number) => string` | - | Row key function |
| `onRowClick` | `(record: T, index: number) => void` | - | Row click handler |
| `selectableType` | `'single' \| 'multiple'` | `'multiple'` | Selection type |
| `defaultSelectedRows` | `T[]` | `[]` | Default selected rows |
| `pagination` | `PaginationConfig` | - | Pagination configuration |

### Column Interface

```typescript
interface Column<T> {
  key: string;
  title: string;
  dataIndex: keyof T;
  sortable?: boolean;
  width?: string | number;
  render?: (value: any, record: T, index: number) => React.ReactNode;
}
```

## 🎨 Design System

The components use a consistent design system built with TailwindCSS:

### Colors
- **Primary**: Blue (`#3b82f6`)
- **Success**: Green (`#10b981`)
- **Error**: Red (`#ef4444`)
- **Warning**: Yellow (`#f59e0b`)
- **Gray Scale**: 50-900 range

### Spacing
- **Small**: `px-2 py-1`
- **Medium**: `px-3 py-2`
- **Large**: `px-4 py-3`

### Border Radius
- **Default**: `rounded-lg`
- **Ghost variant**: `rounded-none`

## 🧪 Testing

The project includes comprehensive unit tests using Vitest and React Testing Library:

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with UI
npm run test:ui

# Run tests with coverage
npm run test:coverage
```

## 📖 Storybook

Storybook provides interactive documentation and testing for all components:

```bash
# Start Storybook
npm run storybook

# Build Storybook
npm run build-storybook
```

Visit `http://localhost:6006` to explore the components interactively.

## 🚀 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

### Deploy Storybook to Chromatic

```bash
# Install Chromatic
npm install --save-dev chromatic

# Deploy to Chromatic
npx chromatic --project-token=<your-token>
```

## 📁 Project Structure

```
src/
├── components/
│   ├── InputField.tsx
│   ├── InputField.stories.tsx
│   ├── DataTable.tsx
│   ├── DataTable.stories.tsx
│   └── __tests__/
│       ├── InputField.test.tsx
│       └── DataTable.test.tsx
├── test/
│   └── setup.ts
├── App.tsx
├── main.tsx
├── index.css
└── index.ts
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [React](https://reactjs.org/) - A JavaScript library for building user interfaces
- [TypeScript](https://www.typescriptlang.org/) - Typed JavaScript
- [TailwindCSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Storybook](https://storybook.js.org/) - Component development environment
- [Lucide](https://lucide.dev/) - Beautiful & consistent icon toolkit
- [Vitest](https://vitest.dev/) - Fast unit test framework

## 📞 Support

If you have any questions or need help, please open an issue on GitHub or contact the maintainers.
