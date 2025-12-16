"use client";

import * as React from "react";
import {  X } from "lucide-react";

import { Calendar } from "@/components/ui/calendar";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "./input-group";
import { formatDate } from "@/lib/utils";



interface DateProps {
  title: string;
  name: string;
  className?: string;
  placeholder?: string;
  description?: string;
  showErrorMsg?: boolean;
  readonly?: boolean;
  formItemClass?: string;
  Icon?: React.ReactNode;
  showAddon?: boolean;
  clear?: boolean;
  [key: string]: any;
}

export function DatePicker({
  title,
  name,
  placeholder,
  type = "text",
  description,
  showErrorMsg,
  form,
  isPassword,
  readOnly,
  className,
  formItemClass,
  clear,
  Icon,
  showAddon = false,
}: DateProps) {
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState<Date | undefined>();
  const [month, setMonth] = React.useState<Date | undefined>(date);


  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem>
          {title && <FormLabel htmlFor={name}>{title}</FormLabel>}

          <FormControl>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <InputGroup>
                  <InputGroupInput
                    id={name}
                    className={className}
                    aria-invalid={fieldState.invalid}
                    placeholder={placeholder}
                    readOnly={readOnly}
                    value={formatDate(field.value)}
                    ref={field.ref}
                    disabled={field.disabled}
                    // {...field}
                  />
                  {showAddon && Icon && (
                    <InputGroupAddon>
                      <InputGroupButton variant="ghost" tabIndex={-1}>
                        {Icon}
                      </InputGroupButton>
                    </InputGroupAddon>
                  )}
                  {showAddon && clear && (
                    <InputGroupAddon align={"inline-end"}>
                      <InputGroupButton
                        onClick={(e) => {
                          e.stopPropagation();
                          form.setValue(name, "");
                        }}
                      >
                        <X />
                      </InputGroupButton>
                    </InputGroupAddon>
                  )}
                </InputGroup>
              </PopoverTrigger>

              <PopoverContent
                className="w-auto overflow-hidden p-0"
                align="start"
                side="top"
                alignOffset={-29}
                sideOffset={4}
              >
                <Calendar
                  mode="single"
                  selected={date}
                  month={month}
                  onMonthChange={setMonth}
                  disabled={{ before: new Date() }}
                  onSelect={(date) => {
                    setDate(date);
                    form.setValue("expiresAt", date);
                    setOpen(false);
                  }}
                />
              </PopoverContent>
            </Popover>
          </FormControl>

          {description && <FormDescription>{description}</FormDescription>}
          {showErrorMsg && <FormMessage className="text-xs" />}
        </FormItem>
      )}
    ></FormField>
  );
}
