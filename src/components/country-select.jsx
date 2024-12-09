/* eslint-disable react/prop-types */
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { filterCountries } from "@/lib/helpers";
import countryRegionData from "country-region-data/dist/data-umd";

function CountrySelect({
  priorityOptions = [],
  whitelist = [],
  blacklist = [],
  onChange = () => {},
  className,
  placeholder = "Country",
  ...props
}) {
  const countries = filterCountries(
    countryRegionData,
    priorityOptions,
    whitelist,
    blacklist,
  );

  return (
    <Select
      onValueChange={(value) => {
        onChange(value);
      }}
      id="country"
      name="country"
      {...props}
    >
      <SelectTrigger className={className}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {countries.map(({ countryName, countryShortCode }) => (
          <SelectItem key={countryShortCode} value={countryName}>
            {countryName}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default CountrySelect;
