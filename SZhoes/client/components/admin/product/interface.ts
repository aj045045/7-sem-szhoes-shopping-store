export interface ProductInterface {
    id: string;
    name: string;
    title: string;
    categoryIds: string[];
    itemIds: string[];
    about: string;
    description: Record<string, string>; 
    referenceProductId: string[];
    images: string[];
    createdAt: string;
    updatedAt: string;
    isActive?: boolean;
}

export interface ProductItemInterface {
  _id: string;
  category: string;
  categoryId: string;
  itemCount: number;
  name: string;
}