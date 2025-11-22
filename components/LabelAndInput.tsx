import { Label } from "./ui/label";
import { Input } from "./ui/input";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";

const LabelAndInput = ({
  title,
  name,
  placeholder,
  type = "text",
  form,
}: {
  title: string;
  name: string;
  placeholder?: string;
  type?: string;
  [key: string]: any;
}) => {
  return (
    // <div className="space-y-2">
    //   {title && <Label htmlFor={id}>{title}</Label>}
    //   <Input
    //     id={id}
    //     name={name}
    //     type={type}
    //     placeholder={placeholder}
    //     {...props}
    //   />
    // </div>

    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {title && <FormLabel>{title}</FormLabel>}
          <FormControl>
            <Input placeholder={placeholder} type={type} {...field} />
          </FormControl>
          <FormDescription>This is your public display name.</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default LabelAndInput;
