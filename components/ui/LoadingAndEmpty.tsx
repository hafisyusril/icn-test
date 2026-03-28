
export const LoadingSpinner: React.FC = () => (
  <div className="flex items-center justify-center py-12">
    <div className="inline-block">
      <div className="w-8 h-8 border-4 border-t-blue-600 border-gray-200 rounded-full animate-spin"></div>
    </div>
  </div>
);

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  icon,
}) => (
  <div className="flex flex-col items-center justify-center py-12 text-center">
    {icon && <div className="mb-4 text-4xl text-gray-400">{icon}</div>}
    <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
    {description && <p className="text-sm text-gray-600">{description}</p>}
  </div>
);

interface ErrorAlertProps {
  title?: string;
  message: string;
}

export const ErrorAlert: React.FC<ErrorAlertProps> = ({
  title = 'Error',
  message,
}) => (
  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
    <h3 className="font-semibold text-red-900 mb-1">{title}</h3>
    <p className="text-sm text-red-700">{message}</p>
  </div>
);
