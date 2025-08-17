import type { Meta, StoryObj } from '@storybook/react';
import { InputField } from './InputField';

const meta: Meta<typeof InputField> = {
  title: 'Components/InputField',
  component: InputField,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['filled', 'outlined', 'ghost'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    type: {
      control: { type: 'select' },
      options: ['text', 'password', 'email', 'number', 'tel', 'url'],
    },
    disabled: {
      control: { type: 'boolean' },
    },
    invalid: {
      control: { type: 'boolean' },
    },
    required: {
      control: { type: 'boolean' },
    },
    showClearButton: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Full Name',
    placeholder: 'Enter your full name',
    helperText: 'This is helper text',
  },
};

export const WithValue: Story = {
  args: {
    label: 'Email',
    placeholder: 'Enter your email',
    value: 'john.doe@example.com',
    type: 'email',
  },
};

export const Password: Story = {
  args: {
    label: 'Password',
    placeholder: 'Enter your password',
    type: 'password',
    helperText: 'Password must be at least 8 characters',
  },
};

export const WithClearButton: Story = {
  args: {
    label: 'Search',
    placeholder: 'Search...',
    value: 'Search term',
    showClearButton: true,
  },
};

export const Error: Story = {
  args: {
    label: 'Email',
    placeholder: 'Enter your email',
    value: 'invalid-email',
    invalid: true,
    errorMessage: 'Please enter a valid email address',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Input',
    placeholder: 'This is disabled',
    value: 'Cannot edit this',
    disabled: true,
  },
};

export const Required: Story = {
  args: {
    label: 'Required Field',
    placeholder: 'This field is required',
    required: true,
    helperText: 'This field must be filled',
  },
};

export const FilledVariant: Story = {
  args: {
    label: 'Filled Input',
    placeholder: 'This is a filled input',
    variant: 'filled',
  },
};

export const GhostVariant: Story = {
  args: {
    label: 'Ghost Input',
    placeholder: 'This is a ghost input',
    variant: 'ghost',
  },
};

export const SmallSize: Story = {
  args: {
    label: 'Small Input',
    placeholder: 'Small size',
    size: 'sm',
  },
};

export const LargeSize: Story = {
  args: {
    label: 'Large Input',
    placeholder: 'Large size',
    size: 'lg',
  },
};

export const EmailType: Story = {
  args: {
    label: 'Email Address',
    placeholder: 'Enter your email',
    type: 'email',
    autoComplete: 'email',
  },
};

export const NumberType: Story = {
  args: {
    label: 'Age',
    placeholder: 'Enter your age',
    type: 'number',
    minLength: 1,
    maxLength: 3,
  },
};

export const TelType: Story = {
  args: {
    label: 'Phone Number',
    placeholder: 'Enter your phone number',
    type: 'tel',
    pattern: '[0-9]{3}-[0-9]{3}-[0-9]{4}',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-4">
      <InputField
        label="Outlined (Default)"
        placeholder="Outlined variant"
        variant="outlined"
      />
      <InputField
        label="Filled"
        placeholder="Filled variant"
        variant="filled"
      />
      <InputField
        label="Ghost"
        placeholder="Ghost variant"
        variant="ghost"
      />
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div className="space-y-4">
      <InputField
        label="Small"
        placeholder="Small size"
        size="sm"
      />
      <InputField
        label="Medium (Default)"
        placeholder="Medium size"
        size="md"
      />
      <InputField
        label="Large"
        placeholder="Large size"
        size="lg"
      />
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className="space-y-4">
      <InputField
        label="Default"
        placeholder="Default state"
      />
      <InputField
        label="With Helper Text"
        placeholder="With helper text"
        helperText="This is helper text"
      />
      <InputField
        label="Error State"
        placeholder="Error state"
        invalid={true}
        errorMessage="This field has an error"
      />
      <InputField
        label="Disabled"
        placeholder="Disabled state"
        disabled={true}
        value="Disabled value"
      />
      <InputField
        label="Required"
        placeholder="Required field"
        required={true}
        helperText="This field is required"
      />
    </div>
  ),
};


