import NameGroupLink from '../components/NameGroupLink'
import {
  NameGroupType,
  fantasyNameGroups,
  realNameGroups,
} from '../names/name-groups'
import { Banner } from '../components/Banner'

export default function NamesIndex() {
  return (
    <>
      <Banner showHome={false} />
      <div class='p-12 text-center'>
        <p class='font-baskerville text-4xl font-semibold'>Dataset Index</p>

        <div class='text-md'>
          <div class='pt-8 font-baskerville text-xl font-semibold '>
            Modern/Historical Names
          </div>
          {realNameGroups.map((nameGroup: NameGroupType) => {
            return <NameGroupLink nameGroup={nameGroup} />
          })}

          <div class='pt-8 font-baskerville text-xl font-semibold '>
            Fantasy Names
          </div>

          {fantasyNameGroups.map((nameGroup: NameGroupType) => {
            return <NameGroupLink nameGroup={nameGroup} />
          })}
        </div>
      </div>
    </>
  )
}
