"use client";

import * as React from "react";
import { CalendarIcon, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

function isValidDate(date: Date | undefined) {
  if (!date) {
    return false;
  }
  return !isNaN(date.getTime());
}

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
  const [value, setValue] = React.useState(formatDate(date));

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
                    defaultValue={formatDate(field.value)}
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
                          form.setValue(name, undefined);
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
                //   disabled={{ before: new Date() }}
                  onSelect={(date) => {
                    setDate(date);
                    form.setValue("expiresAt", date);
                    setValue(formatDate(date));
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

// <div className="flex flex-col gap-3">
//   <Label htmlFor={name} className="px-1">
//     {title}
//   </Label>
//   <div className="relative flex gap-2">
//     <Input
//       id="date"
//       value={value}
//       placeholder="June 01, 2025"
//       className="bg-background pr-10"
//       onChange={(e) => {
//         const date = new Date(e.target.value);
//         setValue(e.target.value);
//         if (isValidDate(date)) {
//           setDate(date);
//           setMonth(date);
//         }
//       }}
//       onKeyDown={(e) => {
//         if (e.key === "ArrowDown") {
//           e.preventDefault();
//           setOpen(true);
//         }
//       }}
//     />

//     <Popover open={open} onOpenChange={setOpen}>
//       <PopoverTrigger asChild>
//         <Button
//           id="date-picker"
//           variant="ghost"
//           className="absolute top-1/2 right-2 size-6 -translate-y-1/2"
//         >
//           <CalendarIcon className="size-3.5" />
//           <span className="sr-only">Select date</span>
//         </Button>
//       </PopoverTrigger>
//       <PopoverContent
//         className="w-auto overflow-hidden p-0"
//         align="end"
//         alignOffset={-8}
//         sideOffset={10}
//       >
//         <Calendar
//           mode="single"
//           selected={date}
//           month={month}
//           onMonthChange={setMonth}
//           disabled={{ before: new Date() }}
//           onSelect={(date) => {
//             console.log(date);
//             setDate(date);

//             setValue(formatDate(date));
//             setOpen(false);
//           }}
//         />
//       </PopoverContent>
//     </Popover>
//   </div>
// </div>
