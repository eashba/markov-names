import { mergeProps } from 'solid-js'
import { Button } from '@kobalte/core'

export enum STYLED_BUTTON_SIZES {
  xs = 'xs',
  sm = 'sm',
  md = 'md',
  lg = 'lg',
}

type PropsType = {
  onClick: any
  label: string
  disabled?: boolean
  size?: STYLED_BUTTON_SIZES
}

export default function StyledButton(props: PropsType) {
  const merged = mergeProps(
    {
      onClick: () => {},
      label: '',
      disabled: false,
      size: STYLED_BUTTON_SIZES.lg,
    },
    props
  )

  const classes = () => {
    return merged.disabled
      ? 'bg-gray-400 cursor-default '
      : 'bg-blue-600 hover:bg-blue-700 focus-visible:ring-4 active:scale-95 '
  }

  const sizeClasses: { [key: string]: string } = {
    [STYLED_BUTTON_SIZES.xs]: 'px-2 py-1 text-sm',
    [STYLED_BUTTON_SIZES.sm]: 'px-2 py-1 text-md',
    [STYLED_BUTTON_SIZES.md]: 'px-3 py-2 text-lg',
    [STYLED_BUTTON_SIZES.lg]: 'px-4 py-3 text-xl',
  }

  const sizeClass = sizeClasses[merged.size]

  return (
    <Button.Root
      onClick={merged.onClick}
      class={`${classes()} transform rounded-md bg-blue-600 ${sizeClass} font-semibold text-white shadow-lg outline-none transition-all duration-100 `}
      disabled={merged.disabled}
    >
      {merged.label}
    </Button.Root>
  )
}
