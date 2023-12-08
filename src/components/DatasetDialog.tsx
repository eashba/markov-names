import { Dialog } from '@kobalte/core'
import { Button } from '@kobalte/core'
import { Index, Show, mergeProps } from 'solid-js'
import NameTable from './NameTable'
import { HiSolidXMark } from 'solid-icons/hi'

type PropsType = {
  dataset: string[]
  surnamesDataset?: string[]
}

export default function DatasetDialog(props: PropsType) {
  const merged = mergeProps(
    {
      dataset: [],
      surnamesDataset: [],
    },
    props
  )

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button.Root class='w-full text-sm font-semibold text-blue-500 hover:underline'>
          View current dataset
        </Button.Root>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay class='fixed inset-0 z-50 bg-gray-600 bg-opacity-20' />
        <div class='fixed inset-0 z-50 flex flex-row justify-center p-8 md:p-24'>
          <Dialog.Content class='z-50 min-w-fit overflow-x-hidden overflow-y-scroll rounded-md border-gray-200 bg-white px-12 py-4 shadow-lg md:min-w-[600px]'>
            <Dialog.Title>
              <div class='flex w-full items-center justify-between pt-4 text-lg font-semibold md:text-3xl'>
                Current Dataset
                <Dialog.CloseButton>
                  <div class='rounded-md p-2 outline-none transition-all duration-100 hover:bg-gray-200 focus-visible:ring-4'>
                    <HiSolidXMark size={32} />
                  </div>
                </Dialog.CloseButton>
              </div>

              <div class='md:text-md flex max-w-sm flex-col gap-4 pt-2 text-sm'>
                <p>
                  The following set of names will be used to generate new names.
                  This set reflects the masculine/feminine settings if present.
                </p>
                <p>
                  The quantity of masculine/feminine names may be imbalanced,
                  which can result in an imbalanced output of names when
                  incuding both names in the dataset.
                </p>
                <p>
                  If "Allow generation of names in dataset" is enabled, name
                  generation will have a chance to reproduce an existing name in
                  the set. Otherwise, the generated names will be unique. This
                  can lead to much more random and unique (and potentially
                  gibberish) names.
                </p>
              </div>
            </Dialog.Title>
            <Dialog.Description class='flex flex-col justify-center pt-8 md:flex-row md:text-sm '>
              <div class='w-full'>
                <div class='w-full font-semibold md:text-xl'>Names</div>
                <NameTable names={merged.dataset} />
              </div>
              <Show when={merged.surnamesDataset.length > 0}>
                <div class='w-full'>
                  <div class='w-full font-semibold md:text-xl'>Surnames</div>
                  <NameTable names={merged.surnamesDataset} />
                </div>
              </Show>
            </Dialog.Description>
          </Dialog.Content>
        </div>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
