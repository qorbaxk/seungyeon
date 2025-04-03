import { PropsWithChildren } from 'react';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
  QueryFunction,
  QueryKey,
} from '@tanstack/react-query';

export interface IHydrate<T> extends PropsWithChildren {
  queryKey: QueryKey;
  queryFn: QueryFunction<T>;
}

/**
 * SSR 을 사용하기 위해서 미리 데이터 페칭을 진행하는 컴포넌트
 */
const Hydrate = async <T,>({ children, queryKey, queryFn }: IHydrate<T>) => {
  const queryClient = new QueryClient();

  // 서버에서 데이터를 미리 가져와서 `dehydratedState` 생성
  await queryClient.prefetchQuery({ queryKey, queryFn });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>{children}</HydrationBoundary>
  );
};
export default Hydrate;
