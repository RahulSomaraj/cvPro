
const list = async (request, response) => {
    let responsetoclient = {}
    response.render(__dirname + '/../public/Jobhunt/admin_views/categories.ejs', {
        data: {...responsetoclient},
        request: request,
        response: response
    })
}


const form_render = async (request, response, id) => {
    /* if id in url params, render update form else render create form */
    response.render(__dirname + '/../public/Jobhunt/admin_views/categories_form.ejs', {
        data: {...responsetoclient},
        request: request,
        response: response
    })
}


const form_api = async (request, response, id) => {
    /* if id in url params, update else create */
    let responsetoclient = {}
    response.send(JSON.stringify({status: true}));
}


const delete_object_and_redirect = async (request, response) => {
    /* if id in url params, delete and redirect */
    let responsetoclient = {}
    response.redirect('/admin/candidates/');
}


module.exports = {
    list,
    form_render,
    form_api,
    delete_object_and_redirect,
};


