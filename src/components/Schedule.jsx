import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Tab } from '@headlessui/react'
import clsx from 'clsx'

import { Container } from '@/components/Container'
import backgroundImage from '@/images/background.jpg'

import spacebot from '@/images/space/spacebot.png'

const schedule = [
  {
    date: 'April 4',
    dateTime: '2022-04-04',
    summary:
      'The first day of the conference is focused on dark patterns for ecommerce.',
    timeSlots: [
      {
        name: 'Steven McHail',
        description: 'Not so one-time payments',
        start: '9:00AM',
        end: '10:00AM',
      },
      {
        name: 'Jaquelin Isch',
        description: 'The finer print',
        start: '10:00AM',
        end: '11:00AM',
      },
      {
        name: 'Dianne Guilianelli',
        description: 'Post-purchase blackmail',
        start: '11:00AM',
        end: '12:00PM',
      },
      {
        name: 'Lunch',
        description: null,
        start: '12:00PM',
        end: '1:00PM',
      },
      {
        name: 'Ronni Cantadore',
        description: 'Buy or die',
        start: '1:00PM',
        end: '2:00PM',
      },
      {
        name: 'Erhart Cockrin',
        description: 'In-person cancellation',
        start: '2:00PM',
        end: '3:00PM',
      },
      {
        name: 'Parker Johnson',
        description: 'The pay/cancel switcheroo',
        start: '3:00PM',
        end: '4:00PM',
      },
    ],
  },
]

function ScheduleTabbed() {
  let [tabOrientation, setTabOrientation] = useState('horizontal')

  useEffect(() => {
    let smMediaQuery = window.matchMedia('(min-width: 640px)')

    function onMediaQueryChange({ matches }) {
      setTabOrientation(matches ? 'vertical' : 'horizontal')
    }

    onMediaQueryChange(smMediaQuery)
    smMediaQuery.addEventListener('change', onMediaQueryChange)

    return () => {
      smMediaQuery.removeEventListener('change', onMediaQueryChange)
    }
  }, [])

  return (
    <Tab.Group
      as="div"
      className="mx-auto grid max-w-2xl grid-cols-1 gap-y-6 sm:grid-cols-2 lg:hidden"
      vertical={tabOrientation === 'vertical'}
    >
      <Tab.List className="-mx-4 flex gap-x-4 gap-y-10 overflow-x-auto pl-4 pb-4 sm:mx-0 sm:flex-col sm:pb-0 sm:pl-0 sm:pr-8">
        {({ selectedIndex }) =>
          schedule.map((day, dayIndex) => (
            <div
              key={day.dateTime}
              className={clsx(
                'relative w-3/4 flex-none pr-4 sm:w-auto sm:pr-0',
                dayIndex !== selectedIndex && 'opacity-70'
              )}
            >
              <DaySummary
                day={{
                  ...day,
                  date: (
                    <Tab className="[&:not(:focus-visible)]:focus:outline-none">
                      <span className="absolute inset-0" />
                      {day.date}
                    </Tab>
                  ),
                }}
              />
            </div>
          ))
        }
      </Tab.List>
      <Tab.Panels>
        {schedule.map((day) => (
          <Tab.Panel
            key={day.dateTime}
            className="[&:not(:focus-visible)]:focus:outline-none"
          >
            <TimeSlots day={day} />
          </Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  )
}

function DaySummary({ day }) {
  return (
    <>
      <h3 className="text-2xl font-semibold tracking-tight text-blue-900">
        <time dateTime={day.dateTime}>{day.date}</time>
      </h3>
      <p className="mt-1.5 text-base tracking-tight text-blue-900">
        {day.summary}
      </p>
    </>
  )
}

function TimeSlots({ day, className }) {
  return (
    <ol
      role="list"
      className={clsx(
        className,
        'space-y-8 bg-white/60 py-14 px-10 text-center shadow-xl shadow-blue-900/5 backdrop-blur'
      )}
    >
      {day.timeSlots.map((timeSlot, timeSlotIndex) => (
        <li
          key={timeSlot.start}
          aria-label={`${timeSlot.name} talking about ${timeSlot.description} at ${timeSlot.start} - ${timeSlot.end} PST`}
        >
          {timeSlotIndex > 0 && (
            <div className="mx-auto mb-8 h-px w-48 bg-indigo-500/10" />
          )}
          <h4 className="text-lg font-semibold tracking-tight text-blue-900">
            {timeSlot.name}
          </h4>
          {timeSlot.description && (
            <p className="mt-1 tracking-tight text-blue-900">
              {timeSlot.description}
            </p>
          )}
          <p className="mt-1 font-mono text-sm text-slate-500">
            <time dateTime={`${day.dateTime}T${timeSlot.start}-08:00`}>
              {timeSlot.start}
            </time>{' '}
            -{' '}
            <time dateTime={`${day.dateTime}T${timeSlot.end}-08:00`}>
              {timeSlot.end}
            </time>{' '}
            PST
          </p>
        </li>
      ))}
    </ol>
  )
}

function ScheduleStatic() {
  return (
    <div className="hidden lg:grid lg:grid-cols-3 lg:gap-x-8">
      {schedule.map((day) => (
        <section key={day.dateTime}>
          <DaySummary day={day} />
          <TimeSlots day={day} className="mt-10" />
        </section>
      ))}
    </div>
  )
}

export function Schedule() {
  return (
    <>
      <section id="schedule" aria-label="Schedule" className="py-20 sm:py-32">
        <Container className="relative z-10">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-4xl lg:pr-24">
            <h2 className="font-display text-4xl font-medium tracking-tighter text-blue-600 sm:text-5xl">
              What Can We Do About Space Junk?
            </h2>
            <p className="mt-4 font-display text-2xl tracking-tight text-blue-900">
              Space junk is a growing problem that is threatening our space
              environment. This debris can cause significant damage to
              space-based infrastructure, such as satellites, and can even lead
              to catastrophic collisions with other objects in space.
            </p>
            <p className="mt-4 font-display text-2xl tracking-tight text-blue-900">
              In order to address this growing danger, we must take immediate
              action. We must start by improving our understanding of the debris
              in our orbit and the threats it poses. This includes improving
              tracking technologies to monitor and track debris, as well as
              developing better models to predict the trajectories of space
              debris. Additionally, we must also strengthen international
              regulations to reduce the volume of debris we generate and how it
              is disposed of in space.
            </p>
            <p className="mt-4 font-display text-2xl tracking-tight text-blue-900">
              In addition to these actions, we must also invest in research and
              development of technologies that can actively remove space debris
              from our orbit. These technologies include the use of robotic arms
              and nets to capture debris, as well as the use of lasers and other
              directed energy systems to push debris out of orbit. We must also
              explore the potential of using gravity to naturally pull debris
              out of orbit.
            </p>
            <p className="mt-4 font-display text-2xl tracking-tight text-blue-900">
              Ultimately, the solution to our space junk problem must be a
              collaborative effort between governments, private industry, and
              the scientific community. We must come together to develop
              solutions to reduce the amount of debris we generate and actively
              remove debris from our orbit. With the right commitment, we can
              protect our space environment and ensure a safer future for all.
            </p>
          </div>
        </Container>
      </section>

      <section id="schedule" aria-label="Schedule" className="py-20 sm:py-32">
        <Container className="relative z-10">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-4xl lg:pr-24">
            <h2 className="font-display text-4xl font-medium tracking-tighter text-blue-600 sm:text-5xl">
              Solution: Spacebot
            </h2>

            <Image
              className="m-auto mt-10 mb-10 w-[550px] object-cover transition duration-300 group-hover:scale-110"
              src={spacebot}
              alt=""
              priority
              sizes="(min-width: 1280px) 17.5rem, (min-width: 1024px) 25vw, (min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
            />

            <p className="mt-4 font-display text-2xl tracking-tight text-blue-900">
              Are you worried about the ever-increasing amounts of space junk in
              the Earth’s orbit? Do you want to help make a difference in the
              conservation of our environment? Then Spacebot is the perfect
              solution for you!
            </p>
            <p className="mt-4 font-display text-2xl tracking-tight text-blue-900">
              Spacebot is the first space junk cleaner robot of its kind,
              designed to help reduce the amount of space junk in Earth’s orbit.
              It uses advanced technology to detect and collect space junk,
              before safely disposing of it. Spacebot is capable of operating
              autonomously, meaning it can work effectively without needing any
              human intervention.
            </p>
            <p className="mt-4 font-display text-2xl tracking-tight text-blue-900">
              Spacebot is also incredibly efficient. It can cover up to five
              times the area of a manned spacecraft in the same amount of time.
              This makes it ideal for those who want to help reduce the amount
              of space junk in our environment, but don’t have the time or
              resources to do it themselves.
            </p>
            <p className="mt-4 font-display text-2xl tracking-tight text-blue-900">
              Spacebot is also cost-effective, making it an ideal choice for
              those on a budget. With its low-cost operation, you can help make
              a difference in the conservation of our environment without
              breaking the bank.
            </p>
            <p className="mt-4 font-display text-2xl tracking-tight text-blue-900">
              So don’t wait – join the fight against space junk today and get
              your own Spacebot now!
            </p>
          </div>
        </Container>
      </section>
    </>
  )
}
