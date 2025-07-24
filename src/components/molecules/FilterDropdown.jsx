import React from "react";
import Select from "@/components/atoms/Select";
import { cn } from "@/utils/cn";

const FilterDropdown = ({ 
  label,
  value, 
  onChange, 
  options = [],
  placeholder = "All",
  className 
}) => {
  return (
    <div className={cn("min-w-[120px]", className)}>
      {label && (
        <label className="block text-xs font-medium text-gray-600 mb-1">
          {label}
        </label>
      )}
      <Select value={value} onChange={onChange} className="text-sm">
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Select>
    </div>
  );
};

export default FilterDropdown;