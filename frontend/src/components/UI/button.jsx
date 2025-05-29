// src/components/ui/button.jsx
export const Button = ({ children, className = "", ...props }) => {
  return (
    <button
      className={`transition duration-150 font-medium px-4 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
