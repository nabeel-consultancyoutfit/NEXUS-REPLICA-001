
import React from 'react';

interface PermissionsGuardProps {
  requiredPermission: string;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export default function PermissionsGuard({
  requiredPermission,
  children,
  fallback,
}: PermissionsGuardProps) {
  // TODO: Implement real permission logic here.
  // For now, always render children as placeholder.
  // This should check user role/permissions against requiredPermission.
  const hasPermission = true;

  if (!hasPermission && fallback) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}
