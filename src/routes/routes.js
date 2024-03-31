import * as Page from '../views/index';

const AppRoutes = [
    { index: true, element: <Page.FormList />, },
    { path: 'eCRF', element: <Page.FormList /> },
    { path: 'form-builder/:id', element: <Page.FormBuilder Response={false}/> },
    { path: 'form-builder/response/:id/:responseID', element: <Page.FormBuilder Response={true} /> },
    { path: 'form-builder/responses', element: <Page.CompletedForms /> },
    { path: '/form-builder/submited-response/:id/form/:formId', element: <Page.SubmitedForm /> },
]

export { AppRoutes }