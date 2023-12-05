import NameGroupLink from '../components/NameGroupLink'
import {
  NameGroupType,
  fantasyNameGroups,
  realNameGroups,
} from '../names/name-groups'
import { Banner } from '../components/Banner'

export default function FourOhFour() {
  return (
    <>
      <Banner />
      <div class='flex h-screen flex-col gap-6 text-center'>
        <div>
          <p class='pt-64 font-baskerville text-9xl font-bold'>404</p>
          <p class='font-baskerville text-xl font-bold'>page not found</p>
        </div>
      </div>
    </>
  )
}
