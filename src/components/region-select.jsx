/* eslint-disable react/prop-types */
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { filterRegions } from "@/lib/helpers";
import { useEffect, useState } from "react";
import countryRegionData from "country-region-data/dist/data-umd";

function RegionSelect({
  country,
  priorityOptions = [],
  whitelist = [],
  blacklist = [],
  onChange = () => {},
  className,
  placeholder = "Region",
}) {
  const [regions, setRegions] = useState([]);

  useEffect(() => {
    const regions = countryRegionData.find(
      (country) => country.countryName === country.countryName
    );

    if (regions) {
      setRegions(
        filterRegions(regions.regions, priorityOptions, whitelist, blacklist)
      );
    }
  }, [country]);

  return (
    <Select
      id="countryRegion"
      name="countryRegion"
      onValueChange={(value) => {
        onChange(value);
      }}
    >
      <SelectTrigger className={className}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {regions.map(({ name, shortCode }) => (
          <SelectItem key={shortCode} value={shortCode}>
            {name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default RegionSelect;
