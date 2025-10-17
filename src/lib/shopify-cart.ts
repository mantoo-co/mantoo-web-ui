import { shopifyFetch } from "./shopify";
import type { Cart, AddLineInput, UpdateLineInput } from "@/types/shopify-cart";

const CART_FRAGMENT = /* GraphQL */ `
fragment CartFragment on Cart {
  id
  checkoutUrl
  totalQuantity
  cost {
    subtotalAmount { amount currencyCode }
    totalAmount { amount currencyCode }
    totalTaxAmount { amount currencyCode }
  }
  lines(first: 100) {
    edges {
      cursor
      node {
        id
        quantity
        cost {
          amountPerQuantity { amount currencyCode }
          subtotalAmount { amount currencyCode }
          totalAmount { amount currencyCode }
        }
        merchandise {
          __typename
          ... on ProductVariant {
            id
            title
            image { url altText width height }
            price { amount currencyCode }
            selectedOptions { name value }
            product { id handle title }
          }
        }
      }
    }
  }
  buyerIdentity {
    countryCode
    email
    phone
  }
}
`;

export const CART_QUERY = /* GraphQL */ `
  query Cart($cartId: ID!) {
    cart(id: $cartId) {
      ...CartFragment
    }
  }
  ${CART_FRAGMENT}
`;

export const CART_CREATE = /* GraphQL */ `
  mutation CartCreate($lines: [CartLineInput!], $buyerIdentity: CartBuyerIdentityInput) {
    cartCreate(input: { lines: $lines, buyerIdentity: $buyerIdentity }) {
      cart { ...CartFragment }
      userErrors { field message }
    }
  }
  ${CART_FRAGMENT}
`;

export const CART_ADD_LINES = /* GraphQL */ `
  mutation CartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart { ...CartFragment }
      userErrors { field message }
    }
  }
  ${CART_FRAGMENT}
`;

export const CART_UPDATE_LINES = /* GraphQL */ `
  mutation CartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart { ...CartFragment }
      userErrors { field message }
    }
  }
  ${CART_FRAGMENT}
`;

export const CART_REMOVE_LINES = /* GraphQL */ `
  mutation CartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart { ...CartFragment }
      userErrors { field message }
    }
  }
  ${CART_FRAGMENT}
`;

export const CART_SET_BUYER = /* GraphQL */ `
  mutation CartBuyerIdentityUpdate($cartId: ID!, $buyerIdentity: CartBuyerIdentityInput!) {
    cartBuyerIdentityUpdate(cartId: $cartId, buyerIdentity: $buyerIdentity) {
      cart { ...CartFragment }
      userErrors { field message }
    }
  }
  ${CART_FRAGMENT}
`;

/** Helpers de capa Storefront */
export async function getCart(cartId: string) {
  const data = await shopifyFetch<{ cart: Cart }>(CART_QUERY, { cartId });
  return data.cart;
}

export async function createCart(lines?: AddLineInput[], buyerIdentity?: { countryCode?: string; email?: string; phone?: string }) {
  const data = await shopifyFetch<{ cartCreate: { cart: Cart; userErrors: { message: string }[] } }>(
    CART_CREATE,
    { lines, buyerIdentity }
  );
  if (data.cartCreate.userErrors?.length) {
    throw new Error(data.cartCreate.userErrors.map(u => u.message).join(", "));
  }
  return data.cartCreate.cart;
}

export async function addLines(cartId: string, lines: AddLineInput[]) {
  const data = await shopifyFetch<{ cartLinesAdd: { cart: Cart; userErrors: { message: string }[] } }>(
    CART_ADD_LINES,
    { cartId, lines }
  );
  if (data.cartLinesAdd.userErrors?.length) {
    throw new Error(data.cartLinesAdd.userErrors.map(u => u.message).join(", "));
  }
  return data.cartLinesAdd.cart;
}

export async function updateLines(cartId: string, lines: UpdateLineInput[]) {
  const data = await shopifyFetch<{ cartLinesUpdate: { cart: Cart; userErrors: { message: string }[] } }>(
    CART_UPDATE_LINES,
    { cartId, lines }
  );
  if (data.cartLinesUpdate.userErrors?.length) {
    throw new Error(data.cartLinesUpdate.userErrors.map(u => u.message).join(", "));
  }
  return data.cartLinesUpdate.cart;
}

export async function removeLines(cartId: string, lineIds: string[]) {
  const data = await shopifyFetch<{ cartLinesRemove: { cart: Cart; userErrors: { message: string }[] } }>(
    CART_REMOVE_LINES,
    { cartId, lineIds }
  );
  if (data.cartLinesRemove.userErrors?.length) {
    throw new Error(data.cartLinesRemove.userErrors.map(u => u.message).join(", "));
  }
  return data.cartLinesRemove.cart;
}
