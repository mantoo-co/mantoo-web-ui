export type Money = { amount: string; currencyCode: string };

export type CartCost = {
  subtotalAmount: Money;
  totalAmount: Money;
  totalTaxAmount?: Money | null;
  totalDutyAmount?: Money | null;
};

export type MerchandiseSelectedOption = { name: string; value: string };

export type Merchandise = {
  __typename: "ProductVariant";
  id: string;
  title: string;
  product: { id: string; handle: string; title: string };
  selectedOptions: MerchandiseSelectedOption[];
  image?: { url: string; altText?: string | null; width?: number | null; height?: number | null } | null;
  price?: Money | null;
};

export type CartLine = {
  id: string;
  quantity: number;
  merchandise: Merchandise;
  cost: {
    amountPerQuantity: Money;
    subtotalAmount: Money;
    totalAmount: Money;
    compareAtAmountPerQuantity?: Money | null;
  };
};

export type CartBuyerIdentity = {
  countryCode?: string | null;
  email?: string | null;
  phone?: string | null;
};

export type Cart = {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  lines: {
    edges: { cursor: string; node: CartLine }[];
  };
  cost: CartCost;
  buyerIdentity?: CartBuyerIdentity | null;
};

/** Inputs */
export type AddLineInput = { merchandiseId: string; quantity: number; attributes?: { key: string; value: string }[] };
export type UpdateLineInput = { id: string; quantity?: number; attributes?: { key: string; value: string }[] };
export type RemoveLineInput = { id: string };
