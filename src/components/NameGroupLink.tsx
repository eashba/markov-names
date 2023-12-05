import { A } from '@solidjs/router'
import { NameGroupType } from '../names/name-groups'
import { mergeProps } from 'solid-js'

type PropsType = {
  nameGroup: NameGroupType
}

export default function NameGroupLink(props: PropsType) {
  const merged = mergeProps(
    {
      nameGroup: undefined,
    },
    props
  )

  return (
    <div class='mt-2'>
      <A
        class='font-semibold text-gray-500 hover:underline'
        href={`/generator?datasets=${merged.nameGroup.key}`}
      >
        {merged.nameGroup.name}
      </A>
    </div>
  )
}
