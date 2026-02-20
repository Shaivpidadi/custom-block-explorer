import React, { Fragment, useEffect, useState } from "react";

const TabButton = ({
  items,
  onTabButtonClick,
  className = "",
  defaultActiveKey = "",
}) => {
  const [selectedKey, setSelectedKey] = useState(defaultActiveKey);

  useEffect(() => {
    setSelectedKey(defaultActiveKey);
  }, [defaultActiveKey]);

  const onButtonClick = (id) => {
    setSelectedKey(id);
    onTabButtonClick(id);
  };

  return (
    <div className="flex flex-wrap gap-2 my-2 p-1 bg-muted rounded-lg">
      {items.map(({ label, value, icon, ...rest }) => (
        <Fragment key={value}>
          <button
            {...rest}
            onClick={() => onButtonClick(value)}
            className={`relative px-4 py-2 text-sm font-medium rounded-md transition-all duration-150 ${
              value === selectedKey
                ? "bg-card text-foreground shadow-soft"
                : "text-muted-foreground hover:text-foreground"
            } ${rest.disabled ? "opacity-40 cursor-not-allowed" : "cursor-pointer"} ${className}`}
          >
            {icon && (
              <span className="mr-1.5 inline-flex">{icon}</span>
            )}
            {label}
          </button>
        </Fragment>
      ))}
    </div>
  );
};

export default TabButton;
