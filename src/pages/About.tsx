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
              process to procedurally generate new, unique names from original
              datasets of existing names.
              <br />
              <br />
              In the context of name generation, a Markov chain analyzes a set
              of existing names and calculates the likelihood of one letter
              following another. One advantage of this technique is that we are
              able to easily combine multiple sets of names, and generate
              interesting and new names with elements of each name set. One
              disadvantage of this technique is that generated names are likely
              to break existing naming conventions, and risk sounding completely
              gibberish or alien.
              <br />
              <br />
              This project relies heavily on{' '}
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

            <p class='mb-2 mt-10 text-2xl font-semibold'>TODOs</p>
            <p>Some other features I'd like to add to this project include:</p>
            <ul class='list-inside list-disc'>
              <li>Support for custom lists in-browser</li>
              <li>
                The ability to control the weighting of each dataset when
                combining them
              </li>
              <li>
                Adding more datasets, and further refinement of existing ones
              </li>
            </ul>

            <p class='mb-2 mt-10 text-2xl font-semibold'>Usage</p>
            <p>
              This is a free and open source project, provided under the MIT
              license. Source code is avalable{' '}
              <a
                href='https://github.com/eashba/markov-names'
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
