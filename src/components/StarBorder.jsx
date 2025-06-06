/* eslint-disable react/prop-types */
const StarBorder = ({
  as: Component = "button",
  className = "",
  color = "white",
  speed = "6s",
  children,
  ...rest
}) => {
  return (
    <Component className={`relative inline-block py-[1px] overflow-hidden rounded-[20px] ${className}`} {...rest}>
      <div
        className="absolute w-[300%] h-[50%] opacity-70 bottom-[-11px] right-[-250%] rounded-full animate-star-movement-bottom z-0"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 10%)`,
          animationDuration: speed,
        }}
      ></div>
      <div
        className="absolute w-[300%] h-[50%] opacity-70 top-[-10px] left-[-250%] rounded-full animate-star-movement-top z-0"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 10%)`,
          animationDuration: speed,
        }}
      ></div>
      <div className="relative md:p-10 p-5 md:text-[20px] text-[12px] uppercase w-[250px] z-1 bg-gradient-to-b from-gray-100 to-gray-500 dark:bg-gradient-to-b dark:from-black dark:to-gray-900 border whitespace-nowrap border-gray-800 dark:text-white text-black text-center rounded-[20px]">
        {children}
      </div>
    </Component>
  );
};

export default StarBorder;

