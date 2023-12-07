import { For, Show, createEffect, createSignal, onMount } from 'solid-js'
import {
  MultiDatasetChainSettingsType,
  balanceAndCombineNamePools,
  buildChain,
  buildNamesPoolFromMultipleGroupsAndSettings,
  defaultMultiDatasetChainSettings,
} from '../utils/chain-utils'
import { useParams, useSearchParams } from '@solidjs/router'
import { Banner } from '../components/Banner'
import { NameGroupType, getGroupByKey, nameGroups } from '../names/name-groups'
import DatasetSelectorDialog from '../components/DatasetSelectorDialog'
import SettingsTable from '../components/SettingsTable'
import DatasetDialog from '../components/DatasetDialog'
import StyledButton from '../components/StyledButton'

import { generateNamesWithChains } from '../utils/chain-utils'
import NameTable from '../components/NameTable'
import MultiSettingsTable from '../components/MultiSettingsTable'

export default function MultiDatasetGenerator() {
  const [selectedNamesGroups, setSelectedNamesGroups] = createSignal<
    NameGroupType[]
  >([]) //All selected name groups

  const [namesPool, setNamesPool] = createSignal<string[]>([]) //Final pool of names to generate from
  const [surnamesPool, setSurnamesPool] = createSignal<string[]>([]) //Pool of surnames to generate from
  const [chainSettings, setChainSettings] =
    createSignal<MultiDatasetChainSettingsType>(
      defaultMultiDatasetChainSettings
    ) //Settings for the chain and dataset (min length, allow duplicates, etc.)

  const [nameChain, setNameChain] = createSignal<any>(undefined) //Built chain for names
  const [surnameChain, setSurnameChain] = createSignal<any>(undefined) //Built chain for optional surnames

  const [generatedNames, setGeneratedNames] = createSignal<string[]>([]) //Built chain for optional surnames

  const [allowNameGeneration, setAllowNameGeneration] =
    createSignal<boolean>(false)

  const [searchParams, setSearchParams] = useSearchParams()

  onMount(() => {
    const datasets = searchParams.datasets?.split(',')
    const nameGroups = datasets?.map((dataset) => getGroupByKey(dataset)) ?? []
    setSelectedNamesGroups(nameGroups as NameGroupType[])
  })

  //When there are updates to the nameGroups, rebuild the namesPools, and settings.
  createEffect(() => {
    // console.log('settomg defai;t settings')

    if (selectedNamesGroups().length === 0) {
      setNamesPool([])
      setSurnamesPool([])
    } else {
      setNamesPool(
        buildNamesPoolFromMultipleGroupsAndSettings(
          selectedNamesGroups(),
          chainSettings()
        )
      )

      const relevantSurnamePools = selectedNamesGroups().map(
        (selectedNamesGroup) => {
          return selectedNamesGroup.surnames
        }
      )

      setSurnamesPool(
        setSurnamesPool(balanceAndCombineNamePools(relevantSurnamePools))
      )
    }
  })

  const updateChainSettings = (settings: any) => {
    setChainSettings({
      ...chainSettings(),
      ...settings,
    })
  }

  //Build names chain whenever the names pool changes
  createEffect(() => {
    if (namesPool().length > 0) {
      setNameChain(buildChain(namesPool(), chainSettings()))
      setAllowNameGeneration(true)
    } else {
      setNameChain(null)
      setAllowNameGeneration(false)
    }
  })

  //Build surnames chain whenever the surnames pool changes
  createEffect(() => {
    if (surnamesPool().length > 0) {
      setSurnameChain(buildChain(surnamesPool(), chainSettings()))
    } else {
      setSurnameChain(null)
    }
  })

  const deriveGenerateAndSetNames = () => {
    if (!nameChain()) {
      setGeneratedNames([])
    } else {
      setGeneratedNames(
        generateNamesWithChains(
          nameChain(),
          surnameChain(),
          chainSettings(),
          false
        )
      )
    }
  }

  createEffect(() => {
    setSearchParams({
      datasets: selectedNamesGroups()
        .map((nameGroup) => nameGroup.key)
        .join(','),
    })
  })

  //Whenever a there are derived changes for generateAndSetNames, run it
  createEffect(() => deriveGenerateAndSetNames())

  const doSetSelectedNameGroups = (newNameGroups: NameGroupType[]) => {
    //Reset the settings first.
    console.log('Resetting settings')
    setChainSettings(defaultMultiDatasetChainSettings)
    setSelectedNamesGroups(newNameGroups)
  }

  return (
    <>
      <Banner />
      <div class='px-12 py-16'>
        <div class='pb-12 text-center'>
          <Show
            when={selectedNamesGroups().length > 0}
            fallback={
              <p class='text-xl'>
                Select one or more datasets to get started.
              </p>
            }
          >
            <p class='font-baskerville text-2xl md:text-4xl font-semibold  leading-normal'>
              Generating{'  '}
              <For each={selectedNamesGroups()}>
                {(selectedNameGroup, i) => (
                  <>
                    <span class='text-blue-500'>{selectedNameGroup.name}</span>
                    <Show when={i() < selectedNamesGroups().length - 1}>
                      <span> + </span>
                    </Show>
                  </>
                )}
              </For>
              {'  '}
              Names
            </p>
          </Show>
          <DatasetSelectorDialog
            selectedNameGroups={selectedNamesGroups()}
            setSelectedNameGroups={doSetSelectedNameGroups}
          />
        </div>

        <Show when={selectedNamesGroups().length > 0}>
          <div class='flex flex-col justify-center md:gap-20 md:flex-row gap-4'>
            <div>
              <p class='mb-3 text-xl font-semibold'>Settings</p>
              {/* TODO: make a multi-namegroup settings*/}
              {/* <SettingsTable
              updateSettings={updateChainSettings} //Providing setter function
              chainSettings={chainSettings()}
              nameGroup={nameGroup()!}
            /> */}

              <MultiSettingsTable
                updateSettings={updateChainSettings} //Providing setter function
                chainSettings={chainSettings()}
                nameGroups={selectedNamesGroups()}
              />

              <div class='flex justify-end py-4'>
                <DatasetDialog
                  dataset={namesPool()}
                  surnamesDataset={surnamesPool()}
                />
              </div>
              <div class='flex w-full justify-end py-4'>
                <StyledButton
                  onClick={() => deriveGenerateAndSetNames()} //Providing derived signal function
                  label='Generate!'
                  disabled={!nameChain()}
                />
              </div>
            </div>

            <div>
              <p class='xs:min-w-[100%] mb-3 min-w-[350px] text-xl font-semibold'>
                Names
              </p>
              <NameTable names={generatedNames()} />
            </div>
          </div>
        </Show>
      </div>
    </>
  )
}
