import { create } from 'zustand';

const useMenuStore = create((set) => ({
  category: null, // 선택된 카테고리
  dietInfo: {
    height: '',
    weight: '',
  },
  // 선택된 필터
  price: { min: 0, max: 9999999 },
  meals: ["BREAKFAST", "LUNCH", "DINNER"],
  campus: ["humanities_campus", "science_campus"],
  prompt: '',     // 프롬프트 입력값

  results: [],    // 검색 결과

  setCategory: (category) => set({ category }),
  setDietInfo: (info) =>
      set((state) => ({
        dietInfo: { ...state.dietInfo, ...info },
      })),
  setPrompt: (prompt) => set({ prompt }),
  setFilter: (key, value) =>
      set((state) => {
        if (key === "price") return { price: value };
        if (key === "meals") return { meals: value };
        if (key === "campus") return { campus: value };
        return state;
      }),
  setResults: (results) => set({ results }),

  resetFilters: () =>
      set({
        price: { min: 0, max: 9999999 },
        meals: ["BREAKFAST", "LUNCH", "DINNER"],
        campus: ["humanities_campus", "science_campus"],
      }),

  resetAll: () =>
      set({
        category: null,
        dietInfo: { height: '', weight: '' },
        price: { min: 0, max: 9999999 },
        meals: ["BREAKFAST", "LUNCH", "DINNER"],
        campus: ["humanities_campus", "science_campus"],
        prompt: '',
        results: [],
      }),
}));

export default useMenuStore;