import React, { useState } from 'react';
import type { FileItem } from '../types';
import { Folder, FolderOpen, FileText, ChevronRight, ChevronDown } from 'lucide-react';

interface FileExplorerProps {
  files: FileItem[];
  onFileSelect: (file: FileItem) => void;
}

export function FileExplorer({ files, onFileSelect }: FileExplorerProps) {
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set());

  const toggleFolder = (path: string) => {
    setExpandedFolders(prev => {
      const next = new Set(prev);
      if (next.has(path)) {
        next.delete(path);
      } else {
        next.add(path);
      }
      return next;
    });
  };

  const renderTreeItem = (item: FileItem, depth: number = 0) => {
    const isExpanded = expandedFolders.has(item.path);
    const paddingLeft = `${depth * 1.5}rem`;

    return (
      <div key={item.path}>
        <div
          className="flex items-center gap-2 p-2 hover:bg-gray-700/50 rounded-md cursor-pointer group"
          style={{ paddingLeft }}
          onClick={() => {
            if (item.type === 'folder') {
              toggleFolder(item.path);
            } else {
              onFileSelect(item);
            }
          }}
        >
          {item.type === 'folder' && (
            <span className="text-gray-400">
              {isExpanded ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </span>
          )}
          {item.type === 'folder' ? (
            isExpanded ? (
              <FolderOpen className="w-4 h-4 text-yellow-400" />
            ) : (
              <Folder className="w-4 h-4 text-yellow-400" />
            )
          ) : (
            <FileText className="w-4 h-4 text-blue-400" />
          )}
          <span className="text-sm text-gray-200 group-hover:text-white transition-colors">
            {item.name.replace(/^\//, '')}
          </span>
        </div>
        {item.type === 'folder' && isExpanded && item.children && (
          <div className="border-l border-gray-700 ml-3">
            {item.children.map(child => renderTreeItem(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  const sortFiles = (files: FileItem[]): FileItem[] => {
    return [...files].sort((a, b) => {
      // Folders come first
      if (a.type === 'folder' && b.type === 'file') return -1;
      if (a.type === 'file' && b.type === 'folder') return 1;
      // Then sort alphabetically
      return a.name.localeCompare(b.name);
    });
  };

  return (
    <div className="space-y-1 py-2">
      {sortFiles(files).map(item => renderTreeItem(item))}
    </div>
  );
}