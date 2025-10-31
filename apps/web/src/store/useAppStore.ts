import { create } from 'zustand'

interface AppStore {
  searchQuery: string
  setSearchQuery: (query: string) => void
}

export const useAppStore = create<AppStore>((set) => ({
  searchQuery: '',
  setSearchQuery: (query) => set({ searchQuery: query }),
}))
