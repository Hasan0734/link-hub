import { useState } from "react";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";

import { Textarea } from "./ui/textarea";

const LabelAndTextarea = ({
  title,
  name,
  placeholder,
  description,
  showErrorMsg,
  form,
  className,
  readOnly,
  rows = 4,
}: {
  title: string;
  name: string;
  placeholder?: string;
  type?: string;
  description?: string;
  showErrorMsg?: boolean;
  isPassword?: boolean;
  readOnly?: boolean;
  rows?: number;
  [key: string]: any;
}) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem>
          {title && <FormLabel>{title}</FormLabel>}
          <FormControl>
            <Textarea
              rows={rows}
              className={className}
              aria-invalid={fieldState.invalid}
              placeholder={placeholder}
              readOnly={readOnly}
              {...field}
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          {showErrorMsg && <FormMessage className="text-xs" />}
        </FormItem>
      )}
    />
  );
};

export default LabelAndTextarea;
