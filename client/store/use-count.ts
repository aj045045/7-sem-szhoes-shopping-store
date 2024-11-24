import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface CountState {
    count: number;
}

interface CountActions {
    incrementCount: () => void;
    decrementCount: () => void;
}

export const useCountStore = create<CountState & CountActions>()(
    persist(
        (set) => ({
            count: 0,
            incrementCount: () => set((state) => ({ count: state.count + 1 })),
            decrementCount: () => set((state) => ({ count: state.count - 1 }))
        }),
        {
            name: 'count-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
);
