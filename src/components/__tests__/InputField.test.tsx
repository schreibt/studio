import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { InputField } from '../InputField';

describe('InputField', () => {
  it('renders with label', () => {
    render(<InputField label="Test Label" />);
    expect(screen.getByText('Test Label')).toBeInTheDocument();
  });

  it('renders with placeholder', () => {
    render(<InputField placeholder="Test placeholder" />);
    expect(screen.getByPlaceholderText('Test placeholder')).toBeInTheDocument();
  });

  it('renders with value', () => {
    render(<InputField value="test value" />);
    expect(screen.getByDisplayValue('test value')).toBeInTheDocument();
  });

  it('calls onChange when input changes', () => {
    const handleChange = vi.fn();
    render(<InputField onChange={handleChange} />);
    
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'new value' } });
    
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('renders helper text', () => {
    render(<InputField helperText="This is helper text" />);
    expect(screen.getByText('This is helper text')).toBeInTheDocument();
  });

  it('renders error message', () => {
    render(<InputField errorMessage="This is an error" />);
    expect(screen.getByText('This is an error')).toBeInTheDocument();
  });

  it('applies disabled state', () => {
    render(<InputField disabled />);
    const input = screen.getByRole('textbox');
    expect(input).toBeDisabled();
  });

  it('applies invalid state', () => {
    render(<InputField invalid />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('aria-invalid', 'true');
  });

  it('renders required indicator', () => {
    render(<InputField label="Required Field" required />);
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('renders password type with toggle', () => {
    render(<InputField type="password" />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('type', 'password');
    
    const toggleButton = screen.getByLabelText('Show password');
    expect(toggleButton).toBeInTheDocument();
  });

  it('toggles password visibility', () => {
    render(<InputField type="password" />);
    const input = screen.getByRole('textbox');
    const toggleButton = screen.getByLabelText('Show password');
    
    expect(input).toHaveAttribute('type', 'password');
    
    fireEvent.click(toggleButton);
    expect(input).toHaveAttribute('type', 'text');
    expect(screen.getByLabelText('Hide password')).toBeInTheDocument();
  });

  it('renders clear button when showClearButton is true and has value', () => {
    render(<InputField value="test" showClearButton />);
    expect(screen.getByLabelText('Clear input')).toBeInTheDocument();
  });

  it('clears input when clear button is clicked', () => {
    const handleChange = vi.fn();
    render(<InputField value="test" showClearButton onChange={handleChange} />);
    
    const clearButton = screen.getByLabelText('Clear input');
    fireEvent.click(clearButton);
    
    expect(handleChange).toHaveBeenCalled();
  });

  it('applies different variants', () => {
    const { rerender } = render(<InputField variant="filled" />);
    let input = screen.getByRole('textbox');
    expect(input.className).toContain('bg-gray-100');
    
    rerender(<InputField variant="ghost" />);
    input = screen.getByRole('textbox');
    expect(input.className).toContain('bg-transparent');
  });

  it('applies different sizes', () => {
    const { rerender } = render(<InputField size="sm" />);
    let input = screen.getByRole('textbox');
    expect(input.className).toContain('px-2 py-1 text-sm');
    
    rerender(<InputField size="lg" />);
    input = screen.getByRole('textbox');
    expect(input.className).toContain('px-4 py-3 text-lg');
  });

  it('forwards ref', () => {
    const ref = vi.fn();
    render(<InputField ref={ref} />);
    expect(ref).toHaveBeenCalled();
  });
});


