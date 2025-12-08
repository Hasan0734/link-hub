import React, { useState } from "react";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
} from "./ui/input-group";
import { Eye, EyeOff } from "lucide-react";
import { Spinner } from "./ui/spinner";

type PropsType = {
  title?: React.ReactNode;
  name: string;
  placeholder?: string;
  type?: string;
  description?: React.ReactNode;
  showErrorMsg?: boolean;
  isPassword?: boolean;
  readOnly?: boolean;
  Icon?: React.ReactNode;
  showAddon?: boolean;
  className?: string;
  formItemClass?: string;
  desClass?: string;
  addonText?: string;
  [key: string]: any;
};

const LabelAndInput = ({
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
  Icon,
  showAddon = false,
  desClass,
  addonText,
}: PropsType) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem className={formItemClass}>
          {title && <FormLabel htmlFor={name}>{title}</FormLabel>}

          <FormControl>
            <InputGroup>
              <InputGroupInput
                id={name}
                className={className}
                aria-invalid={fieldState.invalid}
                placeholder={placeholder}
                type={passwordVisible ? "text" : type}
                readOnly={readOnly}
                {...field}
              />
              {showAddon && Icon &&  <InputGroupAddon>{Icon}</InputGroupAddon>}
              {showAddon && addonText && (
                <InputGroupAddon>
                  <InputGroupText>{addonText}</InputGroupText>
                </InputGroupAddon>
              )}

              {isPassword && (
                <InputGroupAddon align="inline-end">
                  <InputGroupButton
                    tabIndex={-1}
                    onClick={() => setPasswordVisible(!passwordVisible)}
                    variant="ghost"
                  >
                    {passwordVisible ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </InputGroupButton>
                </InputGroupAddon>
              )}
            </InputGroup>
          </FormControl>
          {description && (
            <FormDescription className={desClass}>
              {description}
            </FormDescription>
          )}
          {showErrorMsg && <FormMessage className="text-xs" />}
        </FormItem>
      )}
    />
  );
};

export default LabelAndInput;
