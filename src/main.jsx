import { ViteReactSSG } from 'vite-react-ssg'
import './index.css'
import { routes } from './routes.jsx'

// vite-react-ssg owns rendering: at build time it prerenders every static route
// in `routes` to HTML; in the browser it hydrates (replaces createRoot).
export const createRoot = ViteReactSSG({ routes })
