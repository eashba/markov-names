// import NameGroupLink from '../components/NameGroupLink'
// import {
//   NameGroupType,
//   fantasyNameGroups,
//   realNameGroups,
// } from '../names/name-groups'
import { Banner } from '../components/Banner'

export default function About() {
  return (
    <>
      <Banner showAbout={false} />
      <div class='flex justify-center'>
        <div class='mx-5 my-10 w-[60vw] min-w-[300px] text-center'>
          <p class='font-baskerville text-5xl font-semibold'>Markov Names</p>
          <div class='text-left text-lg'>
            <p class='mb-2 mt-10 text-2xl font-semibold'>What is this?</p>
            <p>
              This is a simple name generator that utilizes a{' '}
              <a
                href='https://en.wikipedia.org/wiki/Markov_chain'
                target='_blank'
                class='font-bold  text-blue-500 hover:underline'
              >
                Markov Chain
              </a>{' '}
              process to procedurally generate new, unique names from original datasets
              of existing names. This project relies heavily on{' '}
              <a
                href='https://github.com/mrsharpoblunto/foswig.js'
                target='_blank'
                class='font-bold  text-blue-500 hover:underline'
              >
                Foswig.js
              </a>{' '}
              for its Markov Chain implementation.
            </p>
            <p class='mb-2 mt-10 text-2xl font-semibold'>Tech Stack</p>
            <p>
              The tech stack for this project includes: Typescript • SolidJS •
              Tailwind CSS • Kobalte • Vercel
            </p>

            <p class='mb-2 mt-10 text-2xl font-semibold'>Usage</p>
            <p>
              This is a free and open source project, provided under the MIT
              license. Source code is avalable{' '}
              <a
                href='https://github.com/eashba/markovs-names'
                target='_blank'
                class='font-bold  text-blue-500 hover:underline'
              >
                here.
              </a>
              <br /> Built with ❤️ by Evan
            </p>
          </div>

          <div class='mt-5 flex justify-center'></div>
        </div>
      </div>
    </>
  )
}
