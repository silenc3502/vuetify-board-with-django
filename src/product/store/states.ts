export interface ProductState {
    products: Product[];
    product: Product | null;
}

export interface Product {
    productId: number;
    name: string;
    description: string;
    price: number;
    imageName: string;
    createdAt: string;
    updatedAt: string;
}

const state: ProductState = {
    products: [],
    product: null,
};

export default state;
