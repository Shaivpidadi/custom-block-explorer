import {
  ClipboardDocumentCheckIcon,
  ClipboardDocumentIcon,
} from "@heroicons/react/24/outline";
import React, { useState } from "react";

const CodeBlock = ({ label, content, showCopy = false }) => {
  const [hasCopied, setHasCopied] = useState(false);
  const onCopyClick = (event) => {
    setHasCopied(true);
    event.preventDefault();
    navigator.clipboard.writeText(content);
    setTimeout(() => setHasCopied(false), 1000);
  };

  return (
    <div>
      {label && (
        <div className="flex items-center justify-between my-2 mb-3">
          <span className="font-semibold text-sm text-foreground">
            {"</> "} {label}
          </span>
          <div>
            {showCopy && !hasCopied && (
              <div
                className="cursor-pointer text-muted-foreground hover:text-foreground transition-colors"
                onClick={onCopyClick}
              >
                <ClipboardDocumentIcon className="h-4 w-4" />
              </div>
            )}
            {showCopy && hasCopied && (
              <div>
                <ClipboardDocumentCheckIcon className="h-4 w-4 text-success" />
              </div>
            )}
          </div>
        </div>
      )}
      <div className="bg-[var(--color-code-bg)] border border-[var(--color-code-border)] rounded-lg text-foreground px-4 py-3 font-mono text-xs whitespace-break-spaces max-h-[200px] overflow-y-auto">
        <div className="text-wrap break-words">{content}</div>
      </div>
    </div>
  );
};

export default CodeBlock;
