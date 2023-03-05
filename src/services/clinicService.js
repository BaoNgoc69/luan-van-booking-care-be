import db from "../models/index";



let createClinic = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.name || !data.address || !data.descriptionHTML || !data.descriptionMardown) {
                resolve({

                    errCode: 1,
                    errMessage: 'Missing parameter!'
                })
            }
            else {
                await db.clinic.create({
                    name: data.name,
                    address: data.address,
                    image: data.imageBase64,
                    descriptionHTML: data.descriptionHTML,
                    descriptionMardown: data.descriptionMardown,
                })
                resolve({
                    errCode: 0,
                    errMessage: 'ok'
                })
            }

        } catch (e) {
            reject(e)
        }
    })
}

let getAllClinic = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.clinic.findAll({

            });
            if (data && data.length > 0) {
                data.map(item => {
                    item.image = new Buffer(item.image, 'base64').toString('binary')
                    return item;
                })

            }
            resolve({
                errCode: 0,
                errMessage: 'ok',
                data
            })

        } catch (e) {
            reject(e)
        }



    })

}

let getDeatilClinicById = (inputId) => {
    return new Promise(async (resolve, reject) => {
        try {

            if (!inputId) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter!'
                })
            }
            else {

                let data = await db.clinic.findOne({
                    where: {
                        id: inputId
                    },
                    attributes: ['name', 'address', 'descriptionHTML', 'descriptionMardown'],

                })
                if (data) {
                    let doctorClinic = [];
                    // doctorClinic = ['1'];
                    doctorClinic = await db.Doctor_info.findAll({
                        where: {

                            Id: inputId
                        },
                        attributes: ['doctorId', 'provinceId'],

                    })
                    data.doctorClinic = doctorClinic;
                } else data = {}
                resolve({
                    errCode: 0,
                    errMessage: 'ok',
                    data
                })




            }

        } catch (e) {
            reject(e)
        }
    })

}

module.exports = {
    createClinic: createClinic,
    getDeatilClinicById: getDeatilClinicById,
    getAllClinic: getAllClinic

}