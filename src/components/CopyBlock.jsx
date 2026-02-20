import {
  ClipboardDocumentCheckIcon,
  ClipboardDocumentIcon,
} from "@heroicons/react/24/outline";
import React, { useState } from "react";

const CopyBlock = ({ value }) => {
  const [hasCopied, setHasCopied] = useState(false);

  const onCopyClick = (event) => {
    event.preventDefault();
    setHasCopied(true);
    navigator.clipboard.writeText(value);
    setTimeout(() => setHasCopied(false), 1000);
  };

  return (
    <div className="flex items-center gap-2">
      <span className="truncate text-sm text-foreground font-mono">
        {value}
      </span>
      {!hasCopied ? (
        <div
          className="cursor-pointer text-muted-foreground hover:text-foreground transition-colors shrink-0"
          onClick={onCopyClick}
        >
          <ClipboardDocumentIcon className="h-4 w-4" />
        </div>
      ) : (
        <div className="shrink-0">
          <ClipboardDocumentCheckIcon className="h-4 w-4 text-success" />
        </div>
      )}
    </div>
  );
};

export default CopyBlock;
