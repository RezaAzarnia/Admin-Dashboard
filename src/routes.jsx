import { lazy, Suspense } from "react";

const Loader = lazy(() => import('./Components/Loader/Loader'))
const Layout = lazy(() => import('./Components/Layout/Layout'))
const Index = lazy(() => import('./pages/Index/Index'))
const ErrorPage = lazy(() => import('./pages/ErrorPage/ErrorPage'))
const AddProduct = lazy(() => import('./pages/AddProduct/AddProduct'))
const AddArticle = lazy(() => import('./pages/AddArticle/AddArticle'))
const ManageUsers = lazy(() => import('./pages/ManageUsers/ManageUsers'))
const ProductsList = lazy(() => import('./pages/ProductsList/ProductsList'))
const ProductDetail = lazy(() => import('./pages/ProductDetail/ProductDetail'))
const ManageCategory = lazy(() => import('./pages/ManageCategory/ManageCategory'))
const ArticlesList = lazy(() => import('./pages/ArticlesList/ArticlesList'))
const ArticleDetail = lazy(() => import('./pages/ArticleDetail/ArticleDetail'))
const ManageProducts = lazy(() => import("./pages/ManageProducts/ManageProducts"));
const ManageComments = lazy(() => import("./pages/ManageComments/ManageComments"));
const ManageOrders = lazy(() => import("./pages/ManageOrders/ManageOrders"));
const ManageArticles = lazy(() => import('./pages/ManageArticles/ManageArticles'))
export const routes = [
    {
        path: "",
        element: (
            <Suspense fallback={<Loader />}>
                <Layout />
            </Suspense>
        ),
        children: [
            { path: '/', element: <Index /> },
            { path: '/addProduct', element: <AddProduct /> },
            { path: '/addArticle', element: <AddArticle /> },
            { path: '/ProductsList', element: <ProductsList /> },
            { path: '/products/:id', element: <ProductDetail /> },
            { path: '/ArticlesList', element: <ArticlesList /> },
            { path: '/article/:id', element: <ArticleDetail /> },
            { path: '/ManageUsers', element: <ManageUsers /> },
            { path: '/ManageCategory', element: <ManageCategory /> },
            { path: '/ManageProducts', element: <ManageProducts /> },
            { path: '/ManageArticles', element: <ManageArticles /> },
            { path: '/ManageComments', element: <ManageComments /> },
            { path: '/ManageOrders', element: <ManageOrders /> },
        ]
    },

    { path: '*', element: <ErrorPage /> },
];
