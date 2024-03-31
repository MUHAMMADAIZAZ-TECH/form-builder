import * as Page from '../views/index';

const AppRoutes = [
    { index: true, element: <Page.FormList />, },
    { path: 'eCRF', element: <Page.FormList /> },
    { path: 'add', element: <Page.AddForm /> },
    { path: 'form-builder', element: <Page.FormBuilder /> },

]

export { AppRoutes }