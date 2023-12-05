import { A } from '@solidjs/router'
import { HiSolidHome, HiSolidQuestionMarkCircle } from 'solid-icons/hi'
import { Button } from '@kobalte/core'
import { Show, mergeProps } from 'solid-js'

type PropsType = {
  showHome?: boolean
  showAbout?: boolean
}

export function Banner(props: PropsType) {
  const merged = mergeProps(
    {
      showHome: true,
      showAbout: true,
    },
    props
  )

  const bannerButtonClass =
    'rounded-md p-2 outline-none transition-all duration-100 hover:bg-gray-200 focus-visible:ring-4'

  return (
    <div class='absolute flex w-full justify-between px-8 py-6'>
      <Show when={merged.showHome} fallback={<div class='w-8' />}>
        <A href='/'>
          <Button.Root onClick={() => {}} class={bannerButtonClass}>
            <HiSolidHome size={32} />
          </Button.Root>
        </A>
      </Show>

      <Show when={merged.showAbout} fallback={<div class='w-8' />}>
        <A href='/about'>
          <Button.Root onClick={() => {}} class={bannerButtonClass}>
            <HiSolidQuestionMarkCircle size={32} />
          </Button.Root>
        </A>
      </Show>
    </div>
  )
}
