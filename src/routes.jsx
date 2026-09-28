import CalculatorPage from './pages/CalculatorPage.jsx'
import SsdiLayout from './pages/ssdi/SsdiLayout.jsx'
import SsdiHome from './pages/ssdi/SsdiHome.jsx'
import Chapter01 from './pages/ssdi/Chapter01LaidOffNowWhat.jsx'
import Chapter02 from './pages/ssdi/Chapter02AiLayoffsYourRights.jsx'
import Chapter03 from './pages/ssdi/Chapter03UnemploymentSdiSsdi.jsx'
import Chapter04 from './pages/ssdi/Chapter04DoYouQualify.jsx'
import Chapter05 from './pages/ssdi/Chapter05SsdiVsSsi.jsx'
import Chapter06 from './pages/ssdi/Chapter06BuildingYourCase.jsx'
import Chapter07 from './pages/ssdi/Chapter07ApplyingStepByStep.jsx'
import Chapter08 from './pages/ssdi/Chapter08DeniedAppeals.jsx'
import Chapter09 from './pages/ssdi/Chapter09WaitingPeriod.jsx'
import Chapter10 from './pages/ssdi/Chapter10ChoosingHelp.jsx'
import Chapter11 from './pages/ssdi/Chapter11Checklists.jsx'

// Every static path here is prerendered by vite-react-ssg (it has no per-route
// "prerender" flag; static routes are included by default).
// "/" prerenders only its <Head> and an empty shell: the calculator itself is
// wrapped in <ClientOnly>, so it renders purely in the browser.
export const routes = [
  { path: '/', Component: CalculatorPage },
  {
    path: '/ssdi',
    Component: SsdiLayout,
    children: [
      { index: true, Component: SsdiHome },
      { path: 'laid-off-now-what', Component: Chapter01 },
      { path: 'ai-layoffs-your-rights', Component: Chapter02 },
      { path: 'unemployment-sdi-ssdi', Component: Chapter03 },
      { path: 'do-you-qualify', Component: Chapter04 },
      { path: 'ssdi-vs-ssi', Component: Chapter05 },
      { path: 'building-your-case', Component: Chapter06 },
      { path: 'applying-step-by-step', Component: Chapter07 },
      { path: 'denied-appeals', Component: Chapter08 },
      { path: 'waiting-period', Component: Chapter09 },
      { path: 'choosing-help', Component: Chapter10 },
      { path: 'checklists', Component: Chapter11 },
    ],
  },
]
