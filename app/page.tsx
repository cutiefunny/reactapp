"use client"

import Image from "next/image";
import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient()

export interface PostTestResponse {
  message: string;
  time: Date;
}

export default function Home() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <Example />
    </QueryClientProvider>
  );
}

function Example() {
  const { isPending, error, data: PostTestResponse, isFetching, isStale } = useQuery({
    queryKey: ['delay'],
    queryFn: async () => (await fetch('https://api.heropy.dev/v0/delay?t=1000')).json(),
    staleTime: 1000* 10        
  })

  if (isPending) return 'Loading...'

  if (error) return 'An error has occurred: ' + error.message

  return (
    <div>
      <div>데이터가 {isStale ? '상했어요..' : '신선해요!'}</div>

      <h1>{JSON.stringify(PostTestResponse)}</h1>           
      <h1>{PostTestResponse.message}</h1>           
      <h1>{PostTestResponse.time}</h1>           
    </div>
  )
}