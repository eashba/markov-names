import { Dialog } from '@kobalte/core'
import { Button } from '@kobalte/core'
import { Show, createEffect, mergeProps } from 'solid-js'
import NameTable from './NameTable'
import { HiSolidXMark } from 'solid-icons/hi'
import { Separator } from '@kobalte/core'

import {
  NameGroupType,
  fantasyNameGroups,
  realNameGroups,
  nameGroups,
} from '../names/name-groups'
import { StyledCheckbox } from './StyledCheckbox'
import DatasetDialog from './DatasetDialog'
import NameGroupDialog from './NameGroupDialog'
import StyledButton, { STYLED_BUTTON_SIZES } from './StyledButton'

type PropsType = {
  selectedNameGroups: NameGroupType[]
  setSelectedNameGroups: (value: NameGroupType[]) => void
}

type NameGroupCheckboxListPropsType = {
  nameGroups: NameGroupType[]
  label: string
  updateSelected: (nameGroupKey: string) => (value: boolean) => void
  selectedNameGroups: NameGroupType[]
}

const NameGroupCheckboxList = (props: NameGroupCheckboxListPropsType) => {
  const merged = mergeProps(
    {
      nameGroups: [],
      label: '',
      updateSelected: () => {},
      selectedNameGroups: [],
    },
    props
  )

  return (
    <>
      <p class='pb-2 pt-4 text-lg font-semibold'>{merged.label}</p>
      <div class='border-grey overflow-x-auto overflow-y-auto rounded-lg border'>
        {merged.nameGroups.map((nameGroup: NameGroupType, idx: number) => {
          return (
            <div class='border-b-grey w-full border-b py-1 last:border-b-0 md:px-6 md:py-2'>
              <div class='flex justify-between gap-6'>
                <div class='flex justify-between gap-2'>
                  <p>{nameGroup.name}</p>
                  <NameGroupDialog nameGroup={nameGroup} />
                </div>
                <StyledCheckbox
                  setChecked={merged.updateSelected(nameGroup.key)}
                  checked={merged.selectedNameGroups.some(
                    (selectedNameGroup: NameGroupType) =>
                      selectedNameGroup.key === nameGroup.key
                  )}
                />
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default function DatasetSelectorDialog(props: PropsType) {
  const merged = mergeProps(
    {
      selectedNameGroups: [],
      setSelectedNameGroups: () => {},
    },
    props
  )

  const addOrRemoveNameGroupFromSelected =
    (nameGroupKey: string) => (value: boolean) => {
      if (value) {
        const newNameGroup = nameGroups.find(({ key }) => key === nameGroupKey)
        if (newNameGroup) {
          merged.setSelectedNameGroups([
            ...merged.selectedNameGroups,
            newNameGroup,
          ])
        }
      } else {
        merged.setSelectedNameGroups(
          merged.selectedNameGroups.filter(({ key }) => key !== nameGroupKey)
        )
      }
    }

  const clearSelections = () => {
    merged.setSelectedNameGroups([])
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button.Root class='m-2 w-full rounded-md p-2 text-xl font-semibold text-blue-500 transition-colors duration-200 hover:bg-blue-100'>
          Manage Datasets
        </Button.Root>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay class='fixed inset-0 z-50 bg-gray-600 bg-opacity-20' />
        <div class='fixed inset-0 z-50 flex flex-row justify-center p-8 md:p-24'>
          <Dialog.Content class='z-50 min-w-fit overflow-x-hidden overflow-y-scroll rounded-md border-gray-200 bg-white px-12 py-4 shadow-lg md:min-w-[600px]'>
            <Dialog.Title>
              <div class='flex w-full items-center justify-between pt-4'>
                <div class='flex items-center gap-4'>
                  <span class='text-lg font-semibold md:text-3xl'>
                    Datasets
                  </span>
                  <StyledButton
                    onClick={clearSelections}
                    label='Clear all selections'
                    size={STYLED_BUTTON_SIZES.xs}
                  />
                </div>
                <Dialog.CloseButton>
                  <div class='rounded-md p-2 outline-none transition-all duration-100 hover:bg-gray-200 focus-visible:ring-4'>
                    <HiSolidXMark size={32} />
                  </div>
                </Dialog.CloseButton>
              </div>
            </Dialog.Title>
            <Dialog.Description>
              <div class='md:text-md flex max-w-sm flex-col gap-4 pt-2 text-sm'>
                <p>
                  Selecting multiple datasets allows you to combine the lists of
                  names to generate new, novel names based on your settings.
                  Combined datasets are balanced for equal weighting.
                </p>
                <p>
                  To create surnames, you need to select at least one dataset
                  that includes surnames. The surnames generated will only come
                  from those datasets that have surname information.
                </p>
                <p>
                  Masculine and feminine options will only be present if all
                  selected datasets contain both masculine and feminine names.
                  Otherwise, all names will be considered unisex.
                </p>
              </div>

              <NameGroupCheckboxList
                nameGroups={realNameGroups}
                label='Modern/Historical Names'
                updateSelected={addOrRemoveNameGroupFromSelected}
                selectedNameGroups={merged.selectedNameGroups}
              />
              <NameGroupCheckboxList
                nameGroups={fantasyNameGroups}
                label='Fantasy Names'
                updateSelected={addOrRemoveNameGroupFromSelected}
                selectedNameGroups={merged.selectedNameGroups}
              />
            </Dialog.Description>
          </Dialog.Content>
        </div>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
