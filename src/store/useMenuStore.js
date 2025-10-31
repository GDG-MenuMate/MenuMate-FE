import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const useMenuStore = create(
    persist (
        (set) => ({
          category: null, // 선택된 카테고리
          dietInfo: {
            height: '',
            weight: '',
          },
          // 선택된 필터
          price: {min: 0, max: 9999999},
          meals: ["BREAKFAST", "LUNCH", "DINNER"],
          campus: ["humanities_campus", "science_campus"],
          prompt: '',     // 프롬프트 입력값

          searchTriggered: false, // 검색 요청 여부
          results: [],    // 검색 결과
          error: null,

          setCategory: (category) => set({category}),
          setDietInfo: (info) =>
              set((state) => ({
                dietInfo: {...state.dietInfo, ...info},
              })),
          setPrompt: (prompt) => set({prompt}),
          setFilter: (key, value) =>
              set((state) => {
                if (key === "price") return {price: value};
                if (key === "meals") return {meals: value};
                if (key === "campus") return {campus: value};
                return state;
              }),
          setSearchTriggered: (value) => set({searchTriggered: value}),
          setResults: (results) => set({results}),
          setError: (err) => set({error: err}),

          resetFilters: () =>
              set({
                price: {min: 0, max: 9999999},
                meals: ["BREAKFAST", "LUNCH", "DINNER"],
                campus: ["humanities_campus", "science_campus"],
              }),

          resetAll: () =>
              set({
                category: null,
                dietInfo: {height: '', weight: ''},
                price: {min: 0, max: 9999999},
                meals: ["BREAKFAST", "LUNCH", "DINNER"],
                campus: ["humanities_campus", "science_campus"],
                prompt: '',
                searchTriggered: false,
                results: [],
              }),
        }),
        {
          name: "menu-storage", // storage의 key 이름
          // persist 저장소로 sessionStorage를 사용 (탭 닫으면 초기화)
          storage: createJSONStorage(() => sessionStorage),
          partialize: (state) => ({
            // persist 하고 싶은 값만 저장
            category: state.category,
            dietInfo: state.dietInfo,
            price: state.price,
            meals: state.meals,
            campus: state.campus,
            prompt: state.prompt,
            results: state.results,
          }),
        }
    )
);

export default useMenuStore;