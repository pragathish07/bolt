import React from 'react';
import { Code, Play } from 'lucide-react';
import { CodeEditor } from './CodeEditor';
import { PreviewFrame } from './PreviewFrame';
import type { FileItem } from '../types';
import type { WebContainer } from '@webcontainer/api';

interface EditorPanelProps {
  activeTab: 'code' | 'preview';
  onTabChange: (tab: 'code' | 'preview') => void;
  selectedFile: FileItem | null;
  webContainer: WebContainer | null;
  files: FileItem[];
}

export function EditorPanel({
  activeTab,
  onTabChange,
  selectedFile,
  webContainer,
  files,
}: EditorPanelProps) {
  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700 h-[calc(100vh-8rem)] overflow-hidden">
      <div className="border-b border-gray-700 p-2 flex gap-2">
        <button
          onClick={() => onTabChange('code')}
          className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${
            activeTab === 'code'
              ? 'bg-purple-500 text-white'
              : 'text-gray-400 hover:text-gray-200 hover:bg-gray-700'
          }`}
        >
          <Code className="w-4 h-4" />
          <span>Code</span>
        </button>
        <button
          onClick={() => onTabChange('preview')}
          className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${
            activeTab === 'preview'
              ? 'bg-purple-500 text-white'
              : 'text-gray-400 hover:text-gray-200 hover:bg-gray-700'
          }`}
        >
          <Play className="w-4 h-4" />
          <span>Preview</span>
        </button>
      </div>
      <div className="h-[calc(100%-4rem)]">
        {activeTab === 'code' ? (
          <CodeEditor file={selectedFile} />
        ) : (
          <PreviewFrame webContainer={webContainer} files={files} />
        )}
      </div>
    </div>
  );
}