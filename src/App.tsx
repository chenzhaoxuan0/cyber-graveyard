import { Suspense, lazy } from 'react'
import { Routes, Route, Outlet } from 'react-router-dom'
import { HelpButton } from '@/components/layout/HelpButton'
import { Footer } from '@/components/layout/Footer'

const HomePage = lazy(() => import('@/pages/HomePage'))
const TributePage = lazy(() => import('@/pages/TributePage'))
const LiteraryDetailPage = lazy(() => import('@/pages/LiteraryDetailPage'))
const HeritagePage = lazy(() => import('@/pages/HeritagePage'))
const CreatePage = lazy(() => import('@/pages/CreatePage'))
const EditorPage = lazy(() => import('@/pages/EditorPage'))
const PreviewPage = lazy(() => import('@/pages/PreviewPage'))
const FormsPage = lazy(() => import('@/pages/FormsPage'))
const FormDetailPage = lazy(() => import('@/pages/FormDetailPage'))
const CulturePage = lazy(() => import('@/pages/CulturePage'))
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'))

function PageFallback() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="animate-flicker font-serif text-2xl text-candle">
        载入中…
      </div>
    </div>
  )
}

function Layout() {
  return (
    <div className="flex min-h-screen flex-col bg-garden bg-noise text-mist">
      <main className="flex-1">
        <Suspense fallback={<PageFallback />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
      <HelpButton />
    </div>
  )
}

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="tribute" element={<TributePage />} />
        <Route path="tribute/literary/:id" element={<LiteraryDetailPage />} />
        <Route path="tribute/heritage" element={<HeritagePage />} />
        <Route path="create" element={<CreatePage />} />
        <Route path="editor" element={<EditorPage />} />
        <Route path="preview" element={<PreviewPage />} />
        <Route path="forms" element={<FormsPage />} />
        <Route path="forms/:id" element={<FormDetailPage />} />
        <Route path="culture" element={<CulturePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default App
