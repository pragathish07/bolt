import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingOverlayProps {
  message?: string;
}

export function LoadingOverlay({ message = 'Loading...' }: LoadingOverlayProps) {
  return (
    <div className="fixed inset-0 bg-gray-900/80 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gray-800 p-6 rounded-lg shadow-xl flex flex-col items-center">
        <Loader2 className="w-8 h-8 text-purple-400 animate-spin" />
        <p className="mt-4 text-gray-200">{message}</p>
      </div>
    </div>
  );
}