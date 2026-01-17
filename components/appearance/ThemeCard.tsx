import { ThemeTypes } from "@/lib/types";
import { cn } from "@/lib/utils";

interface ThemeCardProps {
  theme: ThemeTypes;
  handleTheme: (id: string) => void;
  selectedTheme: string;
}

const ThemeCard = ({ theme, handleTheme, selectedTheme }: ThemeCardProps) => {
  return (
    <div className="mb-4 last:mb-0">
      <div
        onClick={() => handleTheme(theme.id)}
        className={cn(
          "mb-2 group cursor-pointer block text-sm font-medium relative  aspect-3/4 rounded-2xl overflow-hidden border border-border hover:border-primary transition-all",
          {
            "border-2 border-primary": selectedTheme === theme.id,
          }
        )}
      >
      {theme.isBaseThemePro &&  <button
          data-testid="ProBadge"
          className=" group inline-flex items-center justify-between overflow-hidden rounded-[4rem] bg-black px-1.5 py-0.5 text-xs font-semibold text-white opacity-50 hover:opacity-100 absolute right-2 top-2 z-10"
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
        </button>}
        <div className={`absolute inset-0`}>
          {theme.thumbnailUrl.endsWith(".mp4") ? (
            <video
              className="aspect-4/5 h-full w-full object-cover"
              autoPlay
              loop
              muted
              playsInline
            >
              <source src={theme.thumbnailUrl} type="video/mp4" />
            </video>
          ) : (
            // <Image
            //   className="aspect-4/5 h-full w-full object-cover"
            //   width={250}
            //   height={250}
            //   alt={theme.title}
            //   src={theme.thumbnailUrl}
            // />

            <img
              className="aspect-4/5 h-full w-full object-cover"
              src={theme.thumbnailUrl}
              alt={theme.title}
            />
          )}
        </div>
      </div>

      <div>
        <p className="text-sm font-medium text-center">{theme.title}</p>
      </div>
    </div>
  );
};

export default ThemeCard;
