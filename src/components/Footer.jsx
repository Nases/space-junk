import { Container } from '@/components/Container'

export function Footer() {
  return (
    <footer className="py-16">
      <Container className="flex flex-col items-center justify-between md:flex-row">
        <p className="mt-6 text-base text-slate-500 md:mt-0">
          Copyright &copy; {new Date().getFullYear()} Hasan Sefa Ozalp
        </p>
      </Container>
    </footer>
  )
}
