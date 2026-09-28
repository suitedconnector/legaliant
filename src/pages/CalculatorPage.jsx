import { ClientOnly, Head } from 'vite-react-ssg'
import App from '../App.jsx'

// The wrongful-termination calculator stays client-side only: <ClientOnly>
// renders nothing during prerendering, then mounts <App /> in the browser.
export default function CalculatorPage() {
  return (
    <>
      <Head>
        <title>Legaliant — California Wrongful Termination Calculator</title>
        <meta
          name="description"
          content="California Wrongful Termination Settlement Calculator — Know what your case is worth. Free, instant analysis powered by AI."
        />
      </Head>
      <ClientOnly>{() => <App />}</ClientOnly>
    </>
  )
}
