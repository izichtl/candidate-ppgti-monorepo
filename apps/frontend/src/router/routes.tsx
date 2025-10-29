import { createBrowserRouter } from 'react-router-dom';
import ErrorComponent from '../pages/error';
import Login from '../pages/cadidate-login';
import LandingPage from '../pages/landpage';
import Layout from '../pages/layout';
import UnderConstructionComponent from '../pages/under-contruction';
// import EditaisTable from '../pages/documents';
import ComissaoLoginPage from '../pages/comissao-login';
import ComissaoDashboardPage from '../pages/comissao-dashboard';
import CandidateDashboard from '../pages/candidate-dashboard';
import ApplicationsHomolog from '../pages/application-homolog';
import DocumentsPage from '../pages/documents';
import ProcessAplicationList from '../pages/application-process-list';
import CandidateApplications from '../pages/candidate-applications';

const router = createBrowserRouter(
  [
    {
      element: <Layout />,
      children: [
        {
          path: '/',
          element: <LandingPage />,
          handle: { title: 'Início' },
        },
        {
          path: '/login',
          element: <Login />,
          handle: { title: 'Login' },
        },
        {
          path: '/blog',
          element: <UnderConstructionComponent />,
          // element: <Blog />,
          handle: { title: 'Blog' },
        },
        {
          path: '/candidate/dashboard',
          element: <CandidateDashboard />,
          handle: { title: 'Dashboard' },
        },
        {
          path: '/candidate/applications',
          element: <CandidateApplications />,
          handle: { title: 'Dashboard' },
        },
        {
          path: '/application-homolog',
          element: <ApplicationsHomolog />,
          handle: { title: 'Dashboard' },
        },
        {
          path: '/documents',
          element: <DocumentsPage />,
          handle: { title: 'Documentos' },
        },
        {
          path: '/process',
          element: <UnderConstructionComponent />,
          handle: { title: 'Processo Seletivo' },
        },
        {
          path: '/about',
          element: <UnderConstructionComponent />,
          handle: { title: 'Sobre' },
        },
        {
          path: '/error',
          element: <ErrorComponent />,
          handle: { title: 'Erro' },
        },
        {
          path: '*',
          element: <ErrorComponent />,
          handle: { title: 'Página não encontrada' },
        },
        {
          path: '/comissao/login',
          element: <ComissaoLoginPage />,
          handle: { title: 'Login Comissão' },
        },
        {
          path: '/comissao/dashboard',
          element: <ComissaoDashboardPage />,
          handle: { title: 'Dashboard Comissão' },
        },
        {
          path: '/comissao/processos',
          element: <ComissaoDashboardPage />,
          handle: { title: 'Processos Seletivos' },
        },
        {
          path: '/comissao/processos/:id',
          element: <ProcessAplicationList />,
          handle: { title: 'Processos Seletivos' },
        },
        {
          path: '/comissao/processos/:processId/inscricoes/:applicationId',
          element: <ApplicationsHomolog />,
          handle: { title: 'Dashboard' },
        },
        {
          path: '/comissao/candidatos',
          element: <UnderConstructionComponent />,
          handle: { title: 'Candidatos' },
        },
        {
          path: '/comissao/documentos',
          element: <UnderConstructionComponent />,
          handle: { title: 'Documentos da Comissão' },
        },
        {
          path: '/comissao/relatorios',
          element: <UnderConstructionComponent />,
          handle: { title: 'Relatórios' },
        },
      ],
    },
  ],
  {
    basename: '/inscricoesppgti',
  }
);
export default router;
