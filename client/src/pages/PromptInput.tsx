import React from 'react';
import { Send, Loader2 } from 'lucide-react';

interface PromptInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  loading: boolean;
}

export function PromptInput({ value, onChange, onSubmit, loading }: PromptInputProps) {
  return (
    <div className="p-4 bg-gray-800 rounded-lg border border-gray-700">
      <h3 className="text-sm font-medium text-gray-300 mb-2">Continue Building</h3>
      <div className="flex gap-2">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Enter your next instruction..."
          className="flex-1 bg-gray-900 text-gray-200 rounded-md p-3 min-h-[80px] resize-none border border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition-colors"
        />
        <button
          onClick={onSubmit}
          disabled={loading || !value.trim()}
          className="px-4 py-2 bg-purple-500 hover:bg-purple-600 disabled:bg-gray-700 text-white rounded-md transition-colors flex items-center gap-2 self-end"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Processing...</span>
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              <span>Send</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}