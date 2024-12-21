export interface ProductItemInterface {
    id: string;
    name: string;
    title: string;
    categoryId: string;
    about: string;
    description: Record<string, string>;
    referenceProductId: null;
    images: string[];
    createdAt: string;
    updatedAt: null;
    items: Item[];
    active: boolean;
}

export interface Item {
    id: string;
    size: number;
    price: number;
    discount: Discount | null;
    images: string[];
    color: ColorKeys;
    detail: Record<string, string>;
    isActive: boolean;
    warehouseId: null | string;
    quantity: number;
    maxReorderLevel: number;
    minReorderLevel: number;
    lastRestockAt: null | string[];
    createdAt: string;
    updatedAt: null | string;
}

interface Discount {
    discountPercentage: string;
    startedAt: string;
    endedAt: string;
    updatedAt: string;
}

export type ColorKeys = "SLATE" | "GRAY" | "ZINC" | "NEUTRAL" | "STONE" | "RED" | "ORANGE" | "AMBER" | "YELLOW" | "LIME" | "GREEN" | "EMERALD" | "TEAL" | "CYAN" | "SKY" | "BLUE" | "INDIGO" | "VIOLET" | "PURPLE" | "FUCHSIA" | "PINK" | "ROSE";

export const colorBackground: Record<ColorKeys, string> = {
    "SLATE": "bg-slate-100",
    "GRAY": "bg-gray-100",
    "ZINC": "bg-zinc-100",
    "NEUTRAL": "bg-neutral-100",
    "STONE": "bg-stone-100",
    "RED": "bg-red-100",
    "ORANGE": "bg-orange-100",
    "AMBER": "bg-amber-100",
    "YELLOW": "bg-yellow-100",
    "LIME": "bg-lime-100",
    "GREEN": "bg-green-100",
    "EMERALD": "bg-emerald-100",
    "TEAL": "bg-teal-100",
    "CYAN": "bg-cyan-100",
    "SKY": "bg-sky-100",
    "BLUE": "bg-blue-100",
    "INDIGO": "bg-indigo-100",
    "VIOLET": "bg-violet-100",
    "PURPLE": "bg-purple-100",
    "FUCHSIA": "bg-fuchsia-100",
    "PINK": "bg-pink-100",
    "ROSE": "bg-rose-100",
};

export const colorPill: Record<ColorKeys, string> = {
    "SLATE": "bg-slate-500",
    "GRAY": "bg-gray-500",
    "ZINC": "bg-zinc-500",
    "NEUTRAL": "bg-neutral-500",
    "STONE": "bg-stone-500",
    "RED": "bg-red-500",
    "ORANGE": "bg-orange-500",
    "AMBER": "bg-amber-500",
    "YELLOW": "bg-yellow-500",
    "LIME": "bg-lime-500",
    "GREEN": "bg-green-500",
    "EMERALD": "bg-emerald-500",
    "TEAL": "bg-teal-500",
    "CYAN": "bg-cyan-500",
    "SKY": "bg-sky-500",
    "BLUE": "bg-blue-500",
    "INDIGO": "bg-indigo-500",
    "VIOLET": "bg-violet-500",
    "PURPLE": "bg-purple-500",
    "FUCHSIA": "bg-fuchsia-500",
    "PINK": "bg-pink-500",
    "ROSE": "bg-rose-500",
};

export const colorBorder: Record<ColorKeys, string> = {
    "SLATE": "border-slate-400",
    "GRAY": "border-gray-400",
    "ZINC": "border-zinc-400",
    "NEUTRAL": "border-neutral-400",
    "STONE": "border-stone-400",
    "RED": "border-red-400",
    "ORANGE": "border-orange-400",
    "AMBER": "border-amber-400",
    "YELLOW": "border-yellow-400",
    "LIME": "border-lime-400",
    "GREEN": "border-green-400",
    "EMERALD": "border-emerald-400",
    "TEAL": "border-teal-400",
    "CYAN": "border-cyan-400",
    "SKY": "border-sky-400",
    "BLUE": "border-blue-400",
    "INDIGO": "border-indigo-400",
    "VIOLET": "border-violet-400",
    "PURPLE": "border-purple-400",
    "FUCHSIA": "border-fuchsia-400",
    "PINK": "border-pink-400",
    "ROSE": "border-rose-400",
};
