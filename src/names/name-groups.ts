import amazigh from './datasets/amazigh.json'
import aztec from './datasets/aztec.json'
import comicalLong from './datasets/comical-long.json'
import comicalShort from './datasets/comical-short.json'
import dutch from './datasets/dutch.json'
import egyptian from './datasets/egyptian.json'
import english from './datasets/english.json'
import englishAristocratic from './datasets/english-aristocratic.json'
import finnish from './datasets/finnish.json'
import french from './datasets/french.json'
import german from './datasets/german.json'
import incan from './datasets/inca.json'
import indian from './datasets/indian.json'
import irish from './datasets/irish.json'
import japanese from './datasets/japanese.json'
import korean from './datasets/korean.json'
import mongolian from './datasets/mongolian.json'
import norse from './datasets/norse.json'
import polish from './datasets/polish.json'
import scottishGaelic from './datasets/scottish.json'
import chinese from './datasets/chinese.json'

import goblin from './datasets/goblin.json'
import dragon from './datasets/dragon.json'
import elven from './datasets/elven.json'
import dwarven from './datasets/dwarven.json'
import celestial from './datasets/celestial.json'
import abyssal from './datasets/abyssal.json'
import orc from './datasets/orc.json'
import gnomish from './datasets/gnomish.json'

export const realNameGroups = [
  amazigh,
  egyptian,
  aztec,
  chinese,
  dutch,
  english,
  englishAristocratic,
  finnish,
  french,
  german,
  incan,
  indian,
  irish,
  japanese,
  korean,
  mongolian,
  norse,
  polish,
  scottishGaelic,
]

export const fantasyNameGroups = [
  abyssal,
  celestial,
  comicalLong,
  comicalShort,
  dragon,
  dwarven,
  elven,
  gnomish,
  goblin,
  orc
]

export const nameGroups = [...realNameGroups, ...fantasyNameGroups]

export type NameGroupType = {
  female: Array<string>
  key: string
  male: Array<string>
  name: string
  surnameFirst: boolean
  surnames: Array<string>
}

export const getGroupByKey = (key: string): NameGroupType | undefined =>
  nameGroups.find((group) => {
    return group.key === key
  })
