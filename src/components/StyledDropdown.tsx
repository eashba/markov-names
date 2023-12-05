import { Select } from '@kobalte/core'
import { createEffect, mergeProps } from 'solid-js'
import { createSignal } from 'solid-js'

type PropsType = {
  onChange: (value: any) => void
  options: any[]
  defaultOption: any
  selected: any
}

export function StyledDropdown(props: PropsType) {
  const merged = mergeProps(
    {
      onChange: () => {},
      options: [],
      selected: null,
      defaultOption: null,
    },
    props
  )

  return (
    <>
      <Select.Root
        value={merged.selected}
        onChange={merged.onChange}
        options={merged.options}
        defaultValue={merged.defaultOption}
        itemComponent={(props) => (
          <Select.Item
            item={props.item}
            class='ring-none cursor-pointer rounded-md px-3 py-2 font-bold  transition-colors  duration-100 hover:bg-gray-200 focus-visible:bg-gray-200 focus-visible:outline-none'
          >
            <Select.ItemLabel>{props.item.rawValue}</Select.ItemLabel>
          </Select.Item>
        )}
      >
        <Select.Trigger
          aria-label='Number to generate'
          class='transition-color w-10 rounded-md px-3 py-2 text-center outline-none duration-100
          hover:bg-gray-200 focus-visible:bg-gray-200 focus-visible:outline-none
          '
        >
          <Select.Value<string>>{merged.selected}</Select.Value>
        </Select.Trigger>
        <Select.Portal>
          <Select.Content>
            <Select.Listbox class='rounded-md border border-gray-200 bg-white p-2 shadow-md' />
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </>
  )
}
