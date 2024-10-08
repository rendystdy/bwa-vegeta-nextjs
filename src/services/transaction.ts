import BaseResponse from "@/types/response";
import { Checkout, DeliveryType, Product, Transaction } from "@prisma/client";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

interface CheckoutResponse extends BaseResponse {
  data: Checkout;
}

interface CheckoutsResponse extends BaseResponse {
  data: {
    id: string;
    userId: string;
    productId: string;
    qty: number;
    pridcePerItem: number;
    createdAt: string;
    updatedAt: string;
    product: Product;
  }[];
}

interface PaymentResponse extends BaseResponse {
  data: Transaction;
}

interface CheckoutPayload {
  product_id: string;
  qty: number;
}

interface PaymentPayload {
  application_fee: number;
  ansurance_fee: number;
  delivery_fee: number;
  delivery_type: DeliveryType;
}

export interface TransactionWithCheckout {
  id: string;
  userId: string;
  totalPrice: number;
  deliveryFee: number;
  ansuranceFee: number;
  applicationFee: number;
  grandTotalPrice: number;
  deliveryType: string;
  createdAt: string;
  updatedAt: string;
  Checkout: CheckoutWithProducts[];
}

interface CheckoutWithProducts {
  id: string;
  userId: string;
  productId: string;
  transactionId: string;
  qty: number;
  pridcePerItem: number;
  createdAt: string;
  updatedAt: string;
  product: Product;
}

interface HistoryResponse extends BaseResponse {
  data: {
    data: TransactionWithCheckout[];
    total: number;
  };
}

interface HistoryApiParams {
  page?: string | undefined;
}

export const transactionApi = createApi({
  reducerPath: "transactionApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/transaction",
  }),
  tagTypes: ["checkout", "transaction"],
  endpoints: (builder) => ({
    checkout: builder.mutation<CheckoutResponse, CheckoutPayload>({
      query: (body) => ({
        url: "/checkout",
        method: "POST",
        body,
      }),
      invalidatesTags: ["checkout"],
    }),
    checkouts: builder.query<CheckoutsResponse, any>({
      query: () => ({
        url: "/checkout",
      }),
      providesTags: ["checkout"],
    }),
    payment: builder.mutation<PaymentResponse, PaymentPayload>({
      query: (body) => ({
        url: "/payment",
        method: "POST",
        body,
      }),
      invalidatesTags: ["transaction"],
    }),
    history: builder.query<HistoryResponse, HistoryApiParams>({
      query: () => ({
        url: "/history",
      }),
      providesTags: ["transaction"],
    }),
  }),
});

export const {
  useCheckoutMutation,
  useCheckoutsQuery,
  usePaymentMutation,
  useHistoryQuery,
} = transactionApi;
