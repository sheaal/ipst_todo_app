import {ComponentPropsWithoutRef, FC} from "react";

type IButtonProps = ComponentPropsWithoutRef<'button'>

const Button: FC<IButtonProps> = ({children, className, ...props}) => (
  <button
    className={`bg-[#210e16] text-white px-2 py-1 rounded hover:bg-[#3a1f24] transition mr-2 ${className}`} {...props}>
    {children}
  </button>
);

export {
  Button
};