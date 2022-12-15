import Head from 'next/head'

import { Footer } from '@/components/Footer'
import { Hero } from '@/components/Hero'
import { Newsletter } from '@/components/Newsletter'
import { Schedule } from '@/components/Schedule'
import { Speakers } from '@/components/Speakers'
import { Sponsors } from '@/components/Sponsors'

export default function Home() {
  return (
    <>
      <Head>
        <title>Why we need to clean up space junk</title>
      </Head>
      <main>
        <Hero />
        <Speakers />
        <Schedule />
      </main>
      <Footer />
    </>
  )
}
