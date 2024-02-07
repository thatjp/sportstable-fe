import { useState } from "react";
import { FieldHookConfig, useField } from "formik";
import { ComponentPropsWithRef, FC } from "react";

interface TextInputProps extends ComponentPropsWithRef<"input"> {
  label?: string;
  type: string;
  isPassword: boolean;
}

const TextInput: FC<FieldHookConfig<string> & TextInputProps> = ({
  label,
  type,
  isPassword,
  ...props
}) => {
  const [charVisible, setCharVisible] = useState(true);
  const [field, meta] = useField(props);
  return (
    <div className="flex flex-col min-h-20 w-fit m-2">
      <label
        htmlFor={props.id || props.name}
        className="text-gray-900 font-bold"
      >
        {label}
      </label>
      <div className="inline">
        <input
          className="text-input box-border border-b-2"
          {...field}
          type={charVisible ? "text" : "password"}
        />
        {isPassword && (
          <input
            type="checkbox"
            value={`${charVisible}`}
            onChange={() => setCharVisible(!charVisible)}
            className="w-fit"
          />
        )}
      </div>
      {meta.touched && meta.error ? (
        <div className="error text-red-600">{meta.error}</div>
      ) : null}
    </div>
  );
};

export default TextInput;
