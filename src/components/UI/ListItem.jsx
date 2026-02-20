import React, { useState } from "react";
import { ClipboardDocumentCheckIcon, ClipboardDocumentIcon } from "@heroicons/react/24/outline";
import Tooltip from "./Tooltip";
import CodeBlock from "./CodeBlock";
import { Link } from "react-router-dom";

const ListItem = ({
  label,
  value,
  info = "",
  showCopy = false,
  type = "",
  link = "",
}) => {
  const [hasCopied, setHasCopied] = useState(false);
  const onCopyClick = (event) => {
    setHasCopied(true);
    event.preventDefault();
    navigator.clipboard.writeText(value);
    setTimeout(() => setHasCopied(false), 1000);
  };

  return (
    <div className="grid grid-cols-5 gap-4 py-2.5 px-2">
      {info ? (
        <Tooltip text={info}>
          <span className="cursor-pointer font-medium text-muted-foreground text-sm">
            {label}
          </span>
        </Tooltip>
      ) : (
        <div className="col-span-5 sm:col-span-1 text-muted-foreground">
          <div className="text-sm font-medium">{label}:</div>
        </div>
      )}
      <div className="col-span-5 sm:col-span-4">
        <div className="flex items-center gap-2">
          {type === "codeblock" ? (
            <div className="break-all flex-1">
              <CodeBlock label="" content={value} />
            </div>
          ) : link ? (
            <Link to={link} className="text-link hover:opacity-80 text-sm">
              {value}
            </Link>
          ) : (
            <div className="truncate text-sm text-foreground">{value}</div>
          )}
          {showCopy && !hasCopied && (
            <div
              className="cursor-pointer text-muted-foreground hover:text-foreground transition-colors shrink-0"
              onClick={onCopyClick}
            >
              <ClipboardDocumentIcon className="h-4 w-4" />
            </div>
          )}
          {showCopy && hasCopied && (
            <div className="shrink-0">
              <ClipboardDocumentCheckIcon className="h-4 w-4 text-success" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListItem;
