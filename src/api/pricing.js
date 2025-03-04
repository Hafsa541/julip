import useSWR from 'swr';
import { useMemo } from 'react';
// utils
import { isEmpty } from 'lodash';
import { fetcher, endpoints, postFetcher } from 'src/utils/axios';

// ----------------------------------------------------------------------
const options = {
  revalidateIfStale: false,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
};
export function useSelectPricing(pricingData) {
  const URL = [endpoints.pricing.select];

  const payload = useMemo(() => (isEmpty(pricingData) ? {} : pricingData), [pricingData]);
  const { data, isLoading, error, isValidating } = useSWR([URL, payload], postFetcher);
  console.log('pricingdata', data);

  const memoizedValue = useMemo(
    () => ({
      pricingData: data?.data,
      pricingLoading: isLoading,
      pricingError: error,
      pricingValidating: isValidating,
    }),
    [data?.data, error, isLoading, isValidating]
  );

  return memoizedValue;
}
