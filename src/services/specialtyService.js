
import { reject } from "lodash";
import { resolve } from "path";
import db from "../models/index";


let createSpecialty = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.name || !data.imageBase64 || !data.descriptionHTML || !data.descriptionMardown) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter!'
                })
            }
            else {
                await db.specialty.create({
                    name: data.name,
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


let getAllSpecialty = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.specialty.findAll({

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


let getDeatilSpecialtyById = (inputId, location) => {
    return new Promise(async (resolve, reject) => {
        try {

            if (!inputId || !location) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter!'
                })
            }
            else {

                let data = await db.specialty.findOne({
                    where: {
                        id: inputId
                    },
                    attributes: ['descriptionHTML', 'descriptionMardown'],

                })
                if (data) {
                    let doctorSpecialty = [];
                    if (location === 'ALL') {
                        // doctorSpecialty = ['1'];
                        doctorSpecialty = await db.Doctor_info.findAll({
                            where: {

                                specialtyId: inputId
                            },
                            attributes: ['doctorId', 'provinceId'],

                        })
                    } else {

                        doctorSpecialty = await db.Doctor_info.findAll({
                            where: {
                                specialtyId: inputId,
                                provinceId: location
                            },
                            attributes: ['doctorId', 'provinceId'],
                        })

                    }


                    data.doctorSpecialty = doctorSpecialty;


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
    createSpecialty: createSpecialty,
    getAllSpecialty: getAllSpecialty,
    getDeatilSpecialtyById: getDeatilSpecialtyById
}