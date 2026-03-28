/**
 * Card Component
 */

import React, { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className = '' }) => (
  <div
    className={`bg-white rounded-lg shadow border border-gray-200 ${className}`.trim()}
  >
    {children}
  </div>
);

interface CardHeaderProps {
  children: ReactNode;
  className?: string;
}

export const CardHeader: React.FC<CardHeaderProps> = ({
  children,
  className = '',
}) => (
  <div className={`px-6 py-4 border-b border-gray-200 ${className}`.trim()}>
    {children}
  </div>
);

interface CardBodyProps {
  children: ReactNode;
  className?: string;
}

export const CardBody: React.FC<CardBodyProps> = ({
  children,
  className = '',
}) => <div className={`px-6 py-4 ${className}`.trim()}>{children}</div>;

interface CardFooterProps {
  children: ReactNode;
  className?: string;
}

export const CardFooter: React.FC<CardFooterProps> = ({
  children,
  className = '',
}) => (
  <div
    className={`px-6 py-4 border-t border-gray-200 flex gap-2 justify-end ${className}`.trim()}
  >
    {children}
  </div>
);
