import { ReactElement } from 'react';
import { AuthProvider } from './hooks/auth';
import { SWRConfig } from 'swr';

interface ProviderProps {
  children: ReactElement;
  theme?: any;
}

export default function Providers(props: ProviderProps): ReactElement {
  return (
    <SWRConfig
      value={{
        refreshInterval: 60000 * 2,
        fetcher: (resource, init) =>
          fetch(resource, init).then((res) => res.json()),
      }}
    >
      <AuthProvider>{props.children}</AuthProvider>
    </SWRConfig>
  );
}
