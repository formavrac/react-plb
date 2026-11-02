type ButtonProps = {
} & React.PropsWithChildren & React.ButtonHTMLAttributes<HTMLButtonElement>

function Button({ children, ...props }: ButtonProps) {
  return (
    <button className="bg-blue-500 hover:bg-blue-800 text-white py-1.5 px-4 rounded-md duration-300" {...props}>
      {children}
    </button>
  )
}

export default Button
