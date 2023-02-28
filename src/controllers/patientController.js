
import patientService from '../services/patientService';

let postBookAppoinment = async (req, res) => {
    try {

        let info = await patientService.postBookAppoinment(req.body);
        return res.status(200).json(info)
    }
    catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'

        })

    }
}


let postVerifyAppoinment = async (req, res) => {
    try {

        let info = await patientService.postVerifyAppoinment(req.body);
        return res.status(200).json(info)
    }
    catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'

        })

    }
}

module.exports = {
    postBookAppoinment: postBookAppoinment,
    postVerifyAppoinment: postVerifyAppoinment
} 