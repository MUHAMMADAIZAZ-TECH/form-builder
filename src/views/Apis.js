import { DataService } from "../config/dataService/dataService";

export const CreateForm = async (body, handleSnackbarOpen, navigate) => {
    try {
        const response = await DataService.post("/forms/", body);
        if (response.status === 201) {
            handleSnackbarOpen("success", 'Form created successfully!');
            navigate(response.data.id)
            return;
        }
    } catch (error) {
        handleSnackbarOpen("error", error.response.data);
        console.error(error.response);
    }
}

export const FormDeleteByID = async (id, handleSnackbarOpen) => {
    try {
        const response = await DataService.delete(`/forms/${id}`);
        if (response.status === 204) {
            handleSnackbarOpen("success", 'Form delete successfully!');
            return;
        }
    } catch (error) {
        handleSnackbarOpen("error", error.response.data);
        console.error(error.response);
    }
}

export const CreateFields = async (body, handleSnackbarOpen, ReloadOnAdd) => {
    try {
        const response = await DataService.post("/form-fields/", body);
        if (response.status === 201) {
            handleSnackbarOpen("success", 'New field added successfully!');
            ReloadOnAdd()
            return;
        }
    } catch (error) {
        handleSnackbarOpen("error", error.response.data[body.label]);
        console.error(error.response);
    }
}
export const UpdateFields = async (body, handleSnackbarOpen, ReloadOnAdd) => {
    try {
        const response = await DataService.patch(`/form-fields/${body.id}/`, body);
        if (response.status === 200) {
            handleSnackbarOpen("success", 'field updated successfully!');
            ReloadOnAdd()
            return;
        }
    } catch (error) {
        handleSnackbarOpen("error", error.response.data);
        console.error(error.response);
    }
}
export const FormsGetAll = async (setForms, handleSnackbarOpen) => {
    try {
        const response = await DataService.get(`/forms/`);
        if (response.status === 200) {
            setForms(response.data)
            return response.data;
        }
    } catch (error) {
        handleSnackbarOpen("error", error.response.data);
        console.error(error.response);
    }
}

export const FieldDeleteByID = async (id) => {
    try {
        const response = await DataService.delete(`/form-fields/${id}`);
        if (response.status === 204) {
            return;
        }
    } catch (error) {
        console.error(error.response);
    }
}

export const CreateResponse = async (id, handleSnackbarOpen, ReloadOnAdd) => {
    try {
        const response = await DataService.post("/form-responses/", {
            "form": id
        });
        if (response.status === 201) {
            ReloadOnAdd(id, response.data.id)
            return;
        }
    } catch (error) {
        handleSnackbarOpen("error", error.response.data);
        console.error(error.response);
    }
}
export const GetResponse = async (id, setResponse, handleSnackbarOpen) => {
    try {
        const response = await DataService.get(`/form-responses/${id}/`);
        if (response.status === 200) {
            setResponse(response.data)
            return;
        }
    } catch (error) {
        handleSnackbarOpen("error", error.response.data);
        console.error(error.response);
    }
}
export const CreateValue = async (Body, handleSnackbarOpen, ReloadOnAdd) => {
    try {
        const response = await DataService.post("/form-values/", {
            "value": Body.value,
            "field": Body.field,
            "form_submission": Body.formID,
            "status": "completed"
        });
        if (response.status === 201) {
            ReloadOnAdd()
            return;
        }
    } catch (error) {
        handleSnackbarOpen("error", error.response.data);
        console.error(error.response);
    }
}
export const FormsGetAllResponses = async (setForms, handleSnackbarOpen) => {
    try {
        const response = await DataService.get(`/form-responses/`);
        if (response.status === 200) {
            setForms(response.data)
            return response.data;
        }
    } catch (error) {
        handleSnackbarOpen("error", error.response.data);
        console.error(error.response);
    }
}
export const FormGetByID = async (id, setForm, handleSnackbarOpen) => {
    try {
        const response = await DataService.get(`/forms/${id}`);
        if (response.status === 200) {
            setForm(response.data)
            return response.data;
        }
    } catch (error) {
        handleSnackbarOpen("error", error.response.data);
        console.error(error.response);
    }
}
export const FormsGetResponseByID = async (id, formId, setValues, setForms, handleSnackbarOpen) => {
    try {
        const [form, response] = await Promise.all([
            FormGetByID(formId, setForms, handleSnackbarOpen),
            DataService.get(`/form-responses/${id}`)
        ]);

        if (response.status === 200) {
            const result = combineObjects(form.form_fields, response.data.values);
            setValues(result);
            return result;
        }
    } catch (error) {
        handleSnackbarOpen("error", error);
        console.error(error);
    }
}

function combineObjects(formFields, values) {
    return values.map(value => {
        let formField = formFields.find(field => field.id === value.field);
        return { ...formField, ...value };
    });
}