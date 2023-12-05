import { Dialog } from '@kobalte/core'
import { Button } from '@kobalte/core'
import { Index, Show, mergeProps } from 'solid-js'
import NameTable from './NameTable'
import { HiSolidXMark } from 'solid-icons/hi'
import { NameGroupType, nameGroups } from '../names/name-groups'

type PropsType = {
  nameGroup: NameGroupType
}

export default function DatasetDialog(props: PropsType) {
  const merged = mergeProps(
    {
      nameGroup: null,
    },
    props
  )

  const hasFemNames = merged.nameGroup.female?.length > 0
  const hasSurnames = merged.nameGroup.surnames?.length > 0

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button.Root class='w-full text-xs font-semibold text-blue-500 hover:underline'>
          View
        </Button.Root>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay class='fixed inset-0 z-[100] bg-gray-600 bg-opacity-20' />
        <div class='fixed inset-0 z-[100] flex flex-row justify-center p-8 md:p-24'>
          <Dialog.Content class='z-[100] min-w-fit overflow-x-hidden overflow-y-scroll rounded-md border-gray-200 bg-white px-12 py-4 shadow-lg md:min-w-[900px]'>
            <Dialog.Title>
              <div class='flex w-full items-center justify-between pt-4 text-lg font-semibold md:text-3xl'>
                Previewing {merged.nameGroup.name} Dataset
                <Dialog.CloseButton>
                  <div class='rounded-md p-2 outline-none transition-all duration-100 hover:bg-gray-200 focus-visible:ring-4'>
                    <HiSolidXMark size={32} />
                  </div>
                </Dialog.CloseButton>
              </div>
            </Dialog.Title>
            <Dialog.Description class='flex w-full flex-row justify-between pt-8 md:text-sm '>
              <Show when={hasFemNames}>
                <div class='w-full border-r-grey'>
                  <div class='font-semibold md:text-xl'>Masculine Names</div>
                  <NameTable names={merged.nameGroup.male} />
                </div>

                <div class='w-full'>
                  <div class='font-semibold md:text-xl'>Feminine Names</div>
                  <NameTable names={merged.nameGroup.female} />
                </div>
              </Show>

              <Show when={!hasFemNames}>
                <div class='w-full'>
                  <div class='w-full font-semibold md:text-xl'>Names</div>
                  <NameTable names={merged.nameGroup.male} />
                </div>
              </Show>

              <Show when={hasSurnames}>
                <div class='w-full'>
                  <div class='font-semibold md:text-xl'>Surnames</div>
                  <NameTable names={merged.nameGroup.surnames} />
                </div>
              </Show>

              {/* <Show when={merged.surnamesDataset.length > 0}>
                <div class='w-full'>
                  <div class='w-full font-semibold md:text-xl'>Surnames</div>
                  <NameTable names={merged.surnamesDataset} />
                </div>
              </Show> */}
            </Dialog.Description>
          </Dialog.Content>
        </div>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
