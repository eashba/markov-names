import { mergeProps } from 'solid-js'

type PropsType = {
  names: string[]
}

export default function NameTable(props: PropsType) {
  const merged = mergeProps(
    {
      names: [],
    },
    props
  )

  return (
    <div class='overflow-x-auto overflow-y-auto rounded-lg'>
      {merged.names.map((name: string, idx: number) => {
        return (
          <div class='w-full px-2 py-1 even:bg-gray-200 md:px-6 md:py-2'>
            <div class='flex justify-start gap-6'>
              <p class='min-w-[.4rem] font-bold md:min-w-[1rem]'>{idx + 1}</p>
              <p>{name}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
