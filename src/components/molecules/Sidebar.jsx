import { NavLink } from "react-router-dom"
import { useState } from "react"
import ApperIcon from "@/components/ApperIcon"
import Button from "@/components/atoms/Button"
import CreatePlaylistModal from "@/components/organisms/CreatePlaylistModal"

const Sidebar = () => {
  const [showCreateModal, setShowCreateModal] = useState(false)

  const navItems = [
    { path: "/", label: "Home", icon: "Home" },
    { path: "/playlists", label: "Your Playlists", icon: "ListMusic" },
    { path: "/liked-songs", label: "Liked Songs", icon: "Heart" },
    { path: "/following", label: "Following", icon: "Users" }
  ]

  return (
    <>
      <aside className="fixed left-0 top-0 h-screen w-64 bg-surface border-r border-gray-800 flex flex-col">
        <div className="p-6">
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <ApperIcon name="Music2" size={20} className="text-white" />
            </div>
            <span className="text-xl font-display font-bold text-white">VibeStream</span>
          </div>

          <nav className="space-y-2">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/"}
                className={({ isActive }) =>
                  `flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                    isActive
                      ? "bg-primary/20 text-primary"
                      : "text-gray-400 hover:text-white hover:bg-gray-800/50"
                  }`
                }
              >
                <ApperIcon name={item.icon} size={20} />
                <span className="font-medium">{item.label}</span>
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="mt-auto p-6 border-t border-gray-800">
          <Button
            onClick={() => setShowCreateModal(true)}
            variant="gradient"
            className="w-full"
          >
            <ApperIcon name="Plus" size={20} className="mr-2" />
            Create Playlist
          </Button>
        </div>
      </aside>

      <CreatePlaylistModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
      />
    </>
  )
}

export default Sidebar