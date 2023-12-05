import { NameGroupType } from '../names/name-groups'
import { ChainSettingsType, defaultChainSettings } from '../utils/chain-utils'
import { createEffect, mergeProps, onMount, Show } from 'solid-js'
import { Separator } from '@kobalte/core'
import { Select } from '@kobalte/core'
import { StyledDropdown } from './StyledDropdown'
import { StyledCheckbox } from './StyledCheckbox'

type PropsType = {
  updateSettings: (settings: any) => void
  chainSettings: ChainSettingsType
  nameGroup: NameGroupType
}

export default function SettingsTable(props: PropsType) {
  const merged = mergeProps(
    {
      names: [],
      chainSettings: defaultChainSettings,
      updateSettings: () => {},
    },
    props
  )

  const updateChainSettingsQuantity = (value: number) => {
    if (value) {
      merged.updateSettings({ quantity: value })
    }
  }

  const updateChainSettingsGenerateSurnames = (value: boolean) => {
    merged.updateSettings({ generateSurnames: value })
  }

  const updateChainSettingsToggleMale = () => {
    const newMaleValue = !merged.chainSettings.useMale

    if (!newMaleValue && !merged.chainSettings.useFemale) {
      merged.updateSettings({ useMale: newMaleValue, useFemale: true })
    } else {
      merged.updateSettings({ useMale: newMaleValue })
    }
  }

  const updateChainSettingsToggleFemale = () => {
    const newFemaleValue = !merged.chainSettings.useFemale

    if (!newFemaleValue && !merged.chainSettings.useMale) {
      merged.updateSettings({ useFemale: newFemaleValue, useMale: true })
    } else {
      merged.updateSettings({ useFemale: newFemaleValue })
    }
  }

  const updateAllowGenerationOfNamesInDataset = (value: boolean) => {
    const existingConstraints = merged.chainSettings.constraints
    merged.updateSettings({
      constraints: {
        ...existingConstraints,
        allowDuplicates: value,
      },
    })
  }

  const showMaleFemaleOptions = () =>
    merged.nameGroup?.male.length > 0 && merged.nameGroup?.female.length > 0

  return (
    <div class='w-full text-sm'>
      <div class='flex items-center justify-between gap-4'>
        Number to Generate
        <StyledDropdown
          options={[5, 10, 25, 50]}
          defaultOption={10}
          onChange={updateChainSettingsQuantity}
          selected={merged.chainSettings.quantity}
        />
      </div>

      <Separator.Root />

      <Show when={merged.nameGroup?.surnames.length > 0}>
        <div class='flex items-center justify-between gap-4 py-3'>
          Generate surnames
          <StyledCheckbox
            setChecked={updateChainSettingsGenerateSurnames}
            checked={merged.chainSettings.generateSurnames}
          />
        </div>
        <Separator.Root />
      </Show>

      <Show when={showMaleFemaleOptions()}>
        <div class='flex items-center justify-between gap-4 py-3'>
          Include masculine names in dataset
          <StyledCheckbox
            setChecked={updateChainSettingsToggleMale}
            checked={merged.chainSettings.useMale}
          />
        </div>
        <Separator.Root />
      </Show>

      <Show when={showMaleFemaleOptions()}>
        <div class='flex items-center justify-between gap-4 py-3'>
          Include feminine names in dataset
          <StyledCheckbox
            setChecked={updateChainSettingsToggleFemale}
            checked={merged.chainSettings.useFemale}
          />
        </div>
        <Separator.Root />
      </Show>

      <div class='flex items-center justify-between gap-4 py-3'>
        Allow generation of names in dataset
        <StyledCheckbox
          setChecked={updateAllowGenerationOfNamesInDataset}
          checked={merged.chainSettings.constraints.allowDuplicates}
        />
      </div>
    </div>
  )
}
