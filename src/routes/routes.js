import * as Page from '../pages/index';

const AppRoutes = [
    { index: true, element: <Page.CodeList />, },
    { path: 'list', element: <Page.CodeList /> },
    { path: 'add', element: <Page.AddForm /> },
]

export { AppRoutes }