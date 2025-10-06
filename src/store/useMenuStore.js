import { create } from 'zustand';

const useMenuStore = create((set) => ({
  category: null, // 선택된 카테고리
  height: '',
  weight: '',
  prompt: '',     // 프롬프트 입력값
  filters: {      // 선택된 필터
    price: { min: 0, max: 9999999 },
    meal: ["아침", "점심", "저녁"],
    location: ["문과 캠퍼스", "이과 캠퍼스"],
  },

  results: [],    // 검색 결과

  setCategory: (category) => set({ category }),
  setHeight: (height) => set({ height }),
  setWeight: (weight) => set({ weight }),
  setPrompt: (prompt) => set({ prompt }),
  setFilter: (key, value) =>
      set((state) => ({
        filters: { ...state.filters, [key]: value },
      })),
  setResults: (results) => set({ results }),

  resetFilters: () =>
      set({
        filters: {
          price: { min: 0, max: 9999999 },
          meal: ["아침", "점심", "저녁"],
          location: ["문과 캠퍼스", "이과 캠퍼스"],
        },
      }),

  resetAll: () =>
      set({
        category: null,
        height: '',
        weight: '',
        prompt: '',
        results: [],
        filters: {
          price: { min: 0, max: 9999999 },
          meal: ["아침", "점심", "저녁"],
          location: ["문과 캠퍼스", "이과 캠퍼스"],
        },
      }),
}));

export default useMenuStore;