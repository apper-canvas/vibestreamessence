import { createBrowserRouter } from "react-router-dom"
import { Suspense, lazy } from "react"
import Layout from "@/components/organisms/Layout"

const Home = lazy(() => import("@/components/pages/Home"))
const Playlists = lazy(() => import("@/components/pages/Playlists"))
const LikedSongs = lazy(() => import("@/components/pages/LikedSongs"))
const Following = lazy(() => import("@/components/pages/Following"))
const PlaylistDetail = lazy(() => import("@/components/pages/PlaylistDetail"))
const NotFound = lazy(() => import("@/components/pages/NotFound"))

const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-surface">
    <div className="text-center space-y-4">
      <svg className="animate-spin h-12 w-12 text-primary mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 714 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
      </svg>
    </div>
  </div>
)

const mainRoutes = [
  {
    path: "",
    index: true,
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <Home />
      </Suspense>
    )
  },
  {
    path: "playlists",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <Playlists />
      </Suspense>
    )
  },
  {
    path: "playlists/:id",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <PlaylistDetail />
      </Suspense>
    )
  },
  {
    path: "liked-songs",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <LikedSongs />
      </Suspense>
    )
  },
  {
    path: "following",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <Following />
      </Suspense>
    )
  },
  {
    path: "*",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <NotFound />
      </Suspense>
    )
  }
]

const routes = [
  {
    path: "/",
    element: <Layout />,
    children: mainRoutes
  }
]

export const router = createBrowserRouter(routes)