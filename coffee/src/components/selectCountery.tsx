"use client";

import React, { useState, useMemo } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import countryList from "react-select-country-list";
import { SingleValue } from "react-select";
type Props = {
  onChange?: (e: string) => void;
};

export const CountrySelector: React.FC<Props> = ({ onChange }) => {
  const [value, setValue] = useState<SingleValue<any>>(null);
  const options = useMemo(() => countryList().getData(), []);
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between">
          {value ? value.label : "Select country..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search country..." className="h-9" />
          <CommandList>
            <CommandEmpty>No country found.</CommandEmpty>
            <CommandGroup>
              {options.map((country) => (
                <CommandItem
                  key={country.value}
                  onSelect={() => {
                    setValue(country);
                    setOpen(false);
                    if (onChange) onChange(country.label);
                  }}
                >
                  {country.label}
                  <Check className={cn("ml-auto", value?.value === country.value ? "opacity-100" : "opacity-0")} />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
