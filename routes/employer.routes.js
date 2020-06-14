const express = require('express');
const router = express.Router();
const employerService = require('../services/employer.service');
router.use(express.json());


async function get_context_data(request) {
    return await userService.findOne({_id : request.cookies['userId']})
}


router.get('employer_profile.html', async (request,response) => {
    var data = await get_context_data(request);
    response.render(path.join(__dirname,'../public/JobHunt/candidates_single.ejs'), {data : {...data,resume:{...resume}}});
});


module.exports =  router;