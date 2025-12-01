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
} from "./ui/input-group";
import { Eye, EyeOff, Mail } from "lucide-react";

type PropsType = {
  title?: React.ReactNode;
  name: string;
  placeholder?: string;
  type?: string;
  description?: string;
  showErrorMsg?: boolean;
  isPassword?: boolean;
  readOnly?: boolean;
  Icon?: React.ReactNode;
  showAddon?: boolean;
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
  Icon,
  showAddon=false,
}: PropsType) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem>
          {title && <FormLabel>{title}</FormLabel>}


          <FormControl>
            <InputGroup>
              <InputGroupInput
                aria-invalid={fieldState.invalid}
                placeholder={placeholder}
                type={passwordVisible ? "text" : type}
                readOnly={readOnly}
                {...field}
              />
              {showAddon && Icon && (
                <InputGroupAddon>
                  {Icon}
                </InputGroupAddon>
              )}

              {isPassword && (
                <InputGroupAddon align="inline-end">
                  <InputGroupButton
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
          {description && <FormDescription>{description}</FormDescription>}
          {showErrorMsg && <FormMessage className="text-xs" />}
        </FormItem>
      )}
    />
  );
};

export default LabelAndInput;
