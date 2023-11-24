import { lazy, Suspense } from "react";
import Layout from "./components/Layout/Layout";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import Index from "./pages/Index/Index";
// const Index = lazy(() => import('./pages/Index/Index'))
// const ErrorPage = lazy(() => import('./pages/ErrorPage/ErrorPage'))
// const Layout = lazy(() => import('./components/Layout/Layout'))
export const routes = [

    {
        path: '/',

        element: (
            // <Suspense fallback={<h1>Loading.......</h1>}>
                <Layout />
            // </Suspense>
        ),
        children: [
            { path: '', element: <Index /> },
            { path: '*', element: <ErrorPage /> }
        ]
    }
];
