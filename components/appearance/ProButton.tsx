import { cn } from "@/lib/utils";

const ProButton = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "group inline-flex items-center justify-between overflow-hidden rounded-[4rem] bg-black px-1.5 py-0.5 text-xs font-semibold text-white opacity-50 hover:opacity-100 absolute right-2 top-2 z-10 ", className
      )}
    >
      <span className="w-0 select-none overflow-hidden opacity-0 transition-all duration-500 ease-in-out group-hover:w-6 group-hover:opacity-100">
        Pro
      </span>
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-2.5 w-2.5 text-white "
        role="img"
        aria-hidden="true"
      >
        <path fill="currentColor" d="M8.5.5v6H13l-5.5 9v-6H3l5.5-9Z"></path>
        <path
          fill="currentColor"
          d="M8.5.5H9L8.07.24 8.5.5Zm0 6H8l.5.5v-.5Zm4.5 0 .43.26L13 6v.5Zm-5.5 9H7l.93.26-.43-.26Zm0-6H8L7.5 9v.5ZM3 9.5l-.43-.26L3 10v-.5Zm5-9v6h1v-6H8ZM8.5 7H13V6H8.5v1Zm4.07-.76-5.5 9 .86.52 5.5-9-.86-.52ZM8 15.5v-6H7v6h1ZM7.5 9H3v1h4.5V9Zm-4.07.76 5.5-9-.86-.52-5.5 9 .86.52Z"
        ></path>
      </svg>
    </div>
  );
};

export default ProButton;
