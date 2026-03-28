
import React, { InputHTMLAttributes } from 'react';

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, className = '', ...props }, ref) => {
    return (
      <div className="flex items-center gap-2">
        <input
          ref={ref}
          type="checkbox"
          className={`
            w-4 h-4 border border-gray-300 rounded
            focus:ring-2 focus:ring-green-500 focus:ring-offset-0
            cursor-pointer accent-green-600
            ${className}
          `.trim()}
          {...props}
        />
        {label && (
          <label className="text-sm font-medium text-gray-700 cursor-pointer select-none">
            {label}
          </label>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';

export default Checkbox;
