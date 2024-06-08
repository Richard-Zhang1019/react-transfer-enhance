import { createSlice } from '@reduxjs/toolkit'

export interface CountState {
  value: number
}

const initialState: CountState = {
  value: 0
}

// 创建一个 Slice
export const countSlice = createSlice({
  name: 'count',
  initialState,
  // 定义 reducers 并生成关联的操作
  reducers: {
    increment: state => {
      state.value += 1
    },
    decrement: state => {
      state.value -= 1
    }
  }
})

export const { increment, decrement } = countSlice.actions

export default countSlice.reducer
