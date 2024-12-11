import React from 'react';
import { Layout } from 'lucide-react';

interface MainLayoutProps {
  sidebar: React.ReactNode;
  fileExplorer: React.ReactNode;
  mainContent: React.ReactNode;
}

export function MainLayout({ sidebar, fileExplorer, mainContent }: MainLayoutProps) {
  return (
    <div className="flex-1 overflow-hidden">
      <div className="h-full grid grid-cols-4 gap-4 p-4">
        <div className="col-span-1 space-y-4 flex flex-col">
          <div className="flex-1 overflow-auto bg-gray-800 rounded-lg border border-gray-700">
            {sidebar}
          </div>
        </div>
        <div className="col-span-1 bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
          <div className="p-3 border-b border-gray-700 flex items-center gap-2">
            <Layout className="w-4 h-4 text-gray-400" />
            <h2 className="text-sm font-medium text-gray-300">File Explorer</h2>
          </div>
          <div className="p-2">
            {fileExplorer}
          </div>
        </div>
        <div className="col-span-2">
          {mainContent}
        </div>
      </div>
    </div>
  );
}