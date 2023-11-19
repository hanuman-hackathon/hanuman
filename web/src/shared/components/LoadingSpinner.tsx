import { FC, HTMLAttributes } from "react";

function classNames(...classes: unknown[]) {
  return classes.filter(Boolean).join(" ");
}

type LoadingSpinnerProps = {
  color?: "WHITE" | "BLACK" | "BLUE" | "RED";
  size?: "EXTRA SMALL" | "SMALL" | "REGULAR" | "LARGE";
  overlay?: boolean;
  iconClasses?: Array<string>;
  overlayClasses?: Array<HTMLAttributes<undefined>["className"]>;
};

const LoadingSpinnerIcon: FC<LoadingSpinnerProps> = ({
  color = "BLUE",
  size = "REGULAR",
  iconClasses = [],
}) => (
  <svg
    className={classNames(
      "animate-spin",
      size === "EXTRA SMALL" && "h-4 w-4",
      size === "SMALL" && "h-5 w-5",
      size === "REGULAR" && "h-7 w-7",
      size === "LARGE" && "h-14 w-14",
      color === "WHITE" && "text-white",
      color === "BLACK" && "text-black",
      color === "BLUE" && "text-logo-blue",
      ...iconClasses
    )}
    viewBox="0 0 24 24"
    fill="none"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    />
  </svg>
);

export default function LoadingSpinner({
  overlay = false,
  overlayClasses = [],
  ...props
}: LoadingSpinnerProps) {
  if (overlay)
    return (
      <div
        className={classNames(
          "flex",
          "h-screen",
          "w-screen",
          "items-center",
          "justify-center",
          ...overlayClasses
        )}
      >
        <LoadingSpinnerIcon {...props} />
      </div>
    );
  return <LoadingSpinnerIcon {...props} />;
}
