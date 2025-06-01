import { create } from "zustand";

type Variant = {
  color?: string;
  size?: string;
};

type CartState = {
  product: {
    title: string;
    price: number;
    description: string;
    image: string;
    variant: Variant;
    quantity: number;
  };
  setProduct: (product: Partial<CartState["product"]>) => void;
  resetProduct: () => void;
};

export const useCartStore = create<CartState>((set) => ({
  product: {
    title: "",
    price: 0,
    description: "",
    image: "",
    variant: {},
    quantity: 1,
  },
  setProduct: (product) =>
    set((state) => ({
      product: {
        ...state.product,
        ...product,
      },
    })),
  resetProduct: () =>
    set(() => ({
      product: {
        title: "",
        price: 0,
        description: "",
        image: "",
        variant: {},
        quantity: 1,
      },
    })),
}));
