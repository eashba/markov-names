import { Checkbox } from '@kobalte/core'
import { mergeProps, createSignal } from 'solid-js'
import { HiSolidCheck } from 'solid-icons/hi'

type PropsType = {
  setChecked: (value: any) => void
  checked: boolean
}

//TODO, just get this working with local state before trying to hook it up to parent.
export function StyledCheckbox(props: PropsType) {
  const merged = mergeProps(
    {
      setChecked: null,
      checked: false,
    },
    props
  )

  const [checkedLocal, setCheckedLocal] = createSignal(true)

  return (
    <Checkbox.Root checked={merged.checked} onChange={merged.setChecked}>
      <Checkbox.Input />
      <Checkbox.Control class='flex h-6 w-6 items-center justify-center rounded-md border border-gray-200 bg-white transition-all duration-200 hover:cursor-pointer hover:bg-gray-200'>
        <Checkbox.Indicator>
          <HiSolidCheck />
        </Checkbox.Indicator>
      </Checkbox.Control>
    </Checkbox.Root>
  )
}
