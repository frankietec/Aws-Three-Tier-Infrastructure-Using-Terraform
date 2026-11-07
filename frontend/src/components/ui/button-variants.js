import { cva } from "class-variance-authority"

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-[#2da44e] text-white shadow-sm hover:bg-[#2c974b] border border-[var(--color-button-border)]",
        destructive:
          "bg-[#cf222e] text-white shadow-sm hover:bg-[#a40e26] border border-[var(--color-button-border)]",
        outline:
          "border border-[#d0d7de] bg-[#f6f8fa] shadow-sm hover:bg-[#f3f4f6] text-[#24292f]",
        secondary:
          "bg-[#f6f8fa] text-[#24292f] border border-[#d0d7de] shadow-sm hover:bg-[#f3f4f6]",
        ghost: "hover:bg-[#f6f8fa] text-[#24292f]",
        link: "text-[#0969da] underline-offset-4 hover:underline",
      },
      size: {
        default: "h-8 px-3 py-1.5",
        sm: "h-7 rounded-md px-2 text-xs",
        lg: "h-10 rounded-md px-4",
        icon: "h-8 w-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)
