import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

interface UIState {
  isDrawerOpen: boolean
  isDeleteModalOpen: boolean
  selectedRequestId: string | null
}

const initialState: UIState = {
  isDrawerOpen: false,
  isDeleteModalOpen: false,
  selectedRequestId: null,
}

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleDrawer: (state) => {
      state.isDrawerOpen = !state.isDrawerOpen
    },
    closeDrawer: (state) => {
      state.isDrawerOpen = false
    },
    openDeleteModal: (state, action: PayloadAction<string>) => {
      state.isDeleteModalOpen = true
      state.selectedRequestId = action.payload
    },
    closeDeleteModal: (state) => {
      state.isDeleteModalOpen = false
      state.selectedRequestId = null
    },
  },
})

export const {
  toggleDrawer,
  closeDrawer,
  openDeleteModal,
  closeDeleteModal,
} = uiSlice.actions