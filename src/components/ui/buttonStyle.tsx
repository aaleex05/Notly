import { cva, type VariantProps } from 'class-variance-authority'
import { Slot } from '@radix-ui/react-slot'
import { cn } from '@/lib/utils'

export const buttonVariants = cva(
    "rounded-md text-sm font-medium transition-all cursor-pointer disabled:opacity-50 outline-none",
    {
        variants: {
            variant: {
                default:
                    'bg-primary border-1 border-border text-white/80 hover:text-white hover:bg-[#1c1c1c]',
                white:
                    'bg-white border-1 text-black hover:bg-white/80',
                outline:
                    'border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50',
                secondary:
                    'bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80',
                ghost:
                    'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50',
                link: 'text-primary underline-offset-4 hover:underline',
                delete: 'bg-red-300 text-red-900 hover:bg-red-300/80'
            },
            size: {
                default: 'px-4 py-2',
                md: 'px-3 py-2',
                sm: 'p-1.5',
                lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
                icon: 'size-9',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
        },
    },
)

export function Button({
    className,
    variant,
    size,
    asChild = false,
    ...props
}: React.ComponentProps<'button'> &
    VariantProps<typeof buttonVariants> & {
        asChild?: boolean
    }) {
    const Comp = asChild ? Slot : 'button'

    return (
        <Comp
            data-slot="button"
            className={cn(buttonVariants({ variant, size, className }))}
            {...props}
        />
    )
}

export default Button