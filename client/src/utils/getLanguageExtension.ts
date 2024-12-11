import { javascript } from '@codemirror/lang-javascript';
import { css } from '@codemirror/lang-css';
import { html } from '@codemirror/lang-html';
import { Extension } from '@codemirror/state';

export function getLanguageExtension(filePath: string): Extension {
  const ext = filePath.split('.').pop()?.toLowerCase();
  
  switch (ext) {
    case 'js':
    case 'jsx':
    case 'ts':
    case 'tsx':
      return javascript({ jsx: true, typescript: ext.includes('ts') });
    case 'css':
      return css();
    case 'html':
      return html();
    default:
      return javascript();
  }
}