import OutLayout from './out-layout';
import InnerLayout from './inner-layout';
import { useEffect } from 'react';
import { useAuth } from '../../hooks/auth';
import { useMatches } from 'react-router-dom';

export default function Layout() {
  const { isAuthenticated } = useAuth();

  // TODO importar o user
  // se o user estiver logado
  // vai acessar tudo pela dashboard
  // se não vai acesar pelo layout com header

  const matches = useMatches();

  useEffect(() => {
    // @ts-expect-error
    const current = matches.find((m) => m.handle?.title);
    if (current) {
      // @ts-expect-error
      document.title = `${current.handle.title as string} • PPGTI`;
    }
  }, [matches]);

  const auth = isAuthenticated();
  useEffect(() => {
    console.log('Auth status:', auth);
  }, [auth]);
  return auth ? <InnerLayout /> : <OutLayout />;
}
