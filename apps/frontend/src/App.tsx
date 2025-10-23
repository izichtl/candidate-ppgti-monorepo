import { RouterProvider } from 'react-router-dom';
import Providers from './providers';
import router from './router/routes';

const App = () => {
  return (
    <Providers>
      <RouterProvider router={router} />
    </Providers>
  );
};

export default App;
