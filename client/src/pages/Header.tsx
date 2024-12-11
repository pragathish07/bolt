import React from 'react';
import { Code2 } from 'lucide-react';

interface HeaderProps {
  prompt: string;
}

export function Header({ prompt }: HeaderProps) {
  return (
    <header className="bg-gradient-to-r from-gray-800 to-gray-900 border-b border-gray-700 px-6 py-4 shadow-lg">
      <div className="flex items-center gap-3">
        <Code2 className="w-6 h-6 text-purple-400" />
        <h1 className="text-xl font-semibold text-gray-100">Website Builder</h1>
      </div>
      <div className="mt-2 p-3 bg-gray-800/50 rounded-md border border-gray-700">
        <h2 className="text-sm font-medium text-gray-400 mb-1">Current Prompt</h2>
        <p className="text-sm text-gray-200">{prompt}</p>
      </div>
    </header>
  );
}