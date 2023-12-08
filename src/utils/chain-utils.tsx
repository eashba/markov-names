import { NameGroupType } from '../names/name-groups'
import Foswig from 'foswig'

export type ChainSettingsType = {
  constraints: {
    minLength: number
    allowDuplicates: boolean
    maxLength: number
  }
  useMale: boolean
  useFemale: boolean
  generateSurnames: boolean
  quantity: number
}

export interface MultiDatasetChainSettingsType extends ChainSettingsType {
  balanceDatasets: boolean
}

export const defaultChainSettings: ChainSettingsType = {
  constraints: {
    minLength: 2,
    allowDuplicates: true,
    maxLength: 20,
  },
  useMale: true,
  useFemale: true,
  generateSurnames: true,
  quantity: 10,
}

export const defaultMultiDatasetChainSettings: MultiDatasetChainSettingsType = {
  ...defaultChainSettings,
  balanceDatasets: true,
}

export const buildNamesPoolFromGroupAndSettings = (
  nameGroup: NameGroupType,
  settings: ChainSettingsType
) => [
  ...(settings.useMale ? nameGroup.male : []),
  ...(settings.useFemale ? nameGroup.female : []),
]

export const buildNamesPoolFromMultipleGroupsAndSettings = (
  nameGroups: NameGroupType[],
  settings: MultiDatasetChainSettingsType
) => {
  const namesPools = nameGroups.map((nameGroup: NameGroupType) =>
    buildNamesPoolFromGroupAndSettings(nameGroup, settings)
  )

  return balanceAndCombineNamePools(namesPools)
}

export const balanceAndCombineNamePools = (namesPools: string[][]) => {
  const filteredNamesPools = namesPools.filter((pool) => pool.length > 0)

  //For each namePool, determine the length of the shortest one
  const shortestLength = Math.min(
    ...filteredNamesPools.map((pool) => pool.length)
  )

  //For each namePool, shuffle the array and then slice it to the shortest length
  const balancedNamesPools = namesPools.map((pool) => {
    const shuffled = pool.sort(() => 0.5 - Math.random())
    return shuffled.slice(0, shortestLength)
  })

  //combine the balancedNamesPools into a single array
  return balancedNamesPools.flat().sort()
}

export const buildChain = (
  namesPool: string[],
  settings: ChainSettingsType
) => {
  return new Foswig(settings.constraints.minLength, namesPool)
}

export const generateNamesWithChains = (
  nameChain: NonNullable<any>,
  surnameChain: any,
  chainSettings: ChainSettingsType,
  surnameFirst?: boolean
) => {
  const names = []
  const generateSurnames = surnameChain && chainSettings.generateSurnames
  for (let i = 0; i < chainSettings.quantity; i++) {
    const name: string = nameChain.generate(chainSettings.constraints)

    if (generateSurnames) {
      const surname: string = generateSurnames
        ? surnameChain.generate(chainSettings.constraints)
        : undefined
      const fullname = surnameFirst
        ? `${surname} ${name}`
        : `${name} ${surname}`
      names.push(fullname)
    } else {
      names.push(name)
    }
  }
  return names
}
