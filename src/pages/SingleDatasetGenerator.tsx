// DEPRECATED: This page is no longer used, but is kept for reference

import { createSignal, onMount, For, createEffect } from 'solid-js'
import { NameGroupType, getGroupByKey } from '../names/name-groups'
import { A, useParams } from '@solidjs/router'
import {
  buildNamesPoolFromGroupAndSettings,
  defaultChainSettings,
  generateNamesWithChains,
} from '../utils/chain-utils'
import { ChainSettingsType, buildChain } from '../utils/chain-utils'
import SettingsTable from '../components/SettingsTable'
import StyledButton from '../components/StyledButton'
import NameTable from '../components/NameTable'
import DatasetDialog from '../components/DatasetDialog'
import { Banner } from '../components/Banner'

export default function SingleDatasetEditor() {
  const params = useParams()
  const [nameGroup, setNameGroup] = createSignal<NameGroupType | undefined>(
    undefined
  ) //Name group that all data comes from
  const [namesPool, setNamesPool] = createSignal<string[]>([]) //Pool of names to generate from
  const [surnamesPool, setSurnamesPool] = createSignal<string[]>([]) //Pool of surnames to generate from

  const [chainSettings, setChainSettings] =
    createSignal<ChainSettingsType>(defaultChainSettings) //Settings for the chain and dataset (min length, allow duplicates, etc.)
  const [nameChain, setNameChain] = createSignal<any>(undefined) //Built chain for names
  const [surnameChain, setSurnameChain] = createSignal<any>(undefined) //Built chain for optional surnames

  const [generatedNames, setGeneratedNames] = createSignal<string[]>([]) //Built chain for optional surnames

  onMount(() => {
    const key = params.key
    const nameGroupForKey = getGroupByKey(key)

    if (nameGroupForKey) {
      setNameGroup(nameGroupForKey)
      setNamesPool(
        buildNamesPoolFromGroupAndSettings(nameGroup()!, chainSettings())
      )
      setSurnamesPool(nameGroup()!.surnames)
    }
  })

  createEffect(() => {
    if (nameGroup() === undefined) {
      window.location.href = '/'
    }
  })

  createEffect(() => {
    setNamesPool(
      buildNamesPoolFromGroupAndSettings(nameGroup()!, chainSettings())
    )
  })

  //Build names chain whenever the names pool changes
  createEffect(() => {
    if (namesPool().length > 0) {
      setNameChain(buildChain(namesPool(), chainSettings()))
    }
  })

  //Build surnames chain whenever the surnames pool changes
  createEffect(() => {
    if (surnamesPool().length > 0) {
      setSurnameChain(buildChain(surnamesPool(), chainSettings()))
    }
  })

  //Derived signal function
  const deriveGenerateAndSetNames = () => {
    setGeneratedNames(
      generateNamesWithChains(
        nameChain(),
        surnameChain(),
        chainSettings(),
        nameGroup()?.surnameFirst
      )
    )
  }

  //Whenever a there are derived changes for generateAndSetNames, run it
  createEffect(() => deriveGenerateAndSetNames())

  const updateChainSettings = (settings: any) => {
    setChainSettings({
      ...chainSettings(),
      ...settings,
    })
  }

  return (
    <>
      <Banner />

      <div class='px-12 py-2'>
        <div class='pb-12 text-center'>
          <p class='font-baskerville text-4xl font-semibold'>
            Generating{' '}
            <span class='text-4xl text-blue-500'>{nameGroup()?.name}</span>{' '}
            Names
          </p>
        </div>

        <div class='flex flex-col justify-center gap-20 md:flex-row'>
          <div>
            <p class='mb-3 text-xl font-semibold'>Settings</p>
            <SettingsTable
              updateSettings={updateChainSettings} //Providing setter function
              chainSettings={chainSettings()}
              nameGroup={nameGroup()!}
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
      </div>
    </>
  )
}
