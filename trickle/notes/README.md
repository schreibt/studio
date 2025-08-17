# React Components Assignment

A modern React component library featuring InputField and DataTable components built with TypeScript patterns and TailwindCSS styling.

## Components

### InputField
A flexible input component with comprehensive validation states and customization options.

**Features:**
- Text input with label, placeholder, helper text, error message
- States: disabled, invalid, loading
- Variants: filled, outlined, ghost
- Sizes: small, medium, large
- Optional: clear button, password toggle
- Accessibility support with ARIA labels

**Props Interface:**
```typescript
interface InputFieldProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  placeholder?: string;
  helperText?: string;
  errorMessage?: string;
  disabled?: boolean;
  invalid?: boolean;
  variant?: 'filled' | 'outlined' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  showClearButton?: boolean;
  type?: string;
}
```

### DataTable
A data table component with sorting, selection, and state management capabilities.

**Features:**
- Display tabular data
- Column sorting (ascending/descending)
- Row selection (single/multiple)
- Loading state with spinner
- Empty state with illustration
- Responsive design

**Props Interface:**
```typescript
interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  selectable?: boolean;
  onRowSelect?: (selectedRows: T[]) => void;
}

interface Column<T> {
  key: string;
  title: string;
  dataIndex: keyof T;
  sortable?: boolean;
}
```

## Tech Stack
- **React 18** - Component library
- **TailwindCSS** - Styling and design system
- **Lucide Icons** - Icon library
- **TypeScript patterns** - Type safety (simulated in JSX)

## Design System
The project uses a consistent design system with:
- Primary color: Blue (#3b82f6)
- Secondary color: Gray (#e5e7eb)
- Success color: Green (#10b981)
- Error color: Red (#ef4444)
- Warning color: Amber (#f59e0b)

## File Structure
```
├── index.html              # Main demo page
├── storybook.html          # Storybook preview page
├── app.js                  # Main application component
├── storybook-app.js        # Storybook application
├── components/
│   ├── InputField.js       # InputField component
│   ├── DataTable.js        # DataTable component
│   └── Demo.js             # Demo and documentation
├── stories/
│   ├── InputField.stories.js # InputField stories
│   └── DataTable.stories.js  # DataTable stories
└── trickle/
    └── notes/
        └── README.md       # This documentation
```

## Features Implemented
- ✅ TypeScript-style prop interfaces (documented)
- ✅ Responsive design
- ✅ Accessibility (ARIA labels, keyboard navigation)
- ✅ Clean, modern styling
- ✅ Component demo and examples
- ✅ Storybook integration for component preview
- ✅ Interactive stories for all component variants
- ✅ Basic documentation
- ✅ Error boundary for error handling
- ✅ Loading and empty states
- ✅ Interactive features (sorting, selection, password toggle)

## Usage Examples
The demo page includes comprehensive examples of both components with different configurations, states, and use cases. Visit the main page to see interactive demonstrations of all features.