import { getEnabledHTTPHeaderValues } from '../../session-store';
import type { SchemaStoreActions } from '../schema-store.types';
import { useSchemaStore } from '../use-schema-store';

export const httpFetcher: SchemaStoreActions['httpFetcher'] = async ({
  graphQLParams,
  fetchOptions,
}) => {
  const body = JSON.stringify(graphQLParams);

  const fetchResponse = await fetch(fetchOptions.endpoint, {
    method: 'POST',
    headers: fetchOptions.headers
      ? getEnabledHTTPHeaderValues({ headers: fetchOptions.headers })
      : undefined,
    credentials: 'same-origin',
    body,
  }).catch((error) => {
    console.warn('Error during fetch attempt:', {
      error,
    });
  });

  if (fetchResponse && !fetchResponse.ok) {
    useSchemaStore.setState({
      isIntrospecting: false,
      introspectionErrors: ['Response not OK. Do you need to add headers?'],
    });
  } else {
    return fetchResponse;
  }
};
