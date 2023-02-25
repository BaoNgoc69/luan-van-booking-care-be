import db from "../models/index";
require('dotenv').config();



let postBookAppoinment = (data) => {
    return new Promise(async (resolve, reject) => {
        try {

            if (!data.email || !data.doctorId || !data.timeType || !data.date) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter!'
                })
            }
            else {
                //update patient
                let user = await db.users.findOrCreate({
                    where: { email: data.email },
                    defaults: {
                        email: data.email,
                        roleId: 'R3'
                    }
                });
                // create a booking record
                if (user && user[0]) {
                    await db.booking.findOrCreate({
                        where: {
                            patientId: user[0].id
                        },
                        defaults: {
                            statusId: 'S1',
                            doctorId: data.doctorId,
                            patientId: user[0].id,
                            date: data.date,
                            timeType: data.timeType
                        }


                    })
                }



                resolve({
                    data: user,
                    errCode: 0,
                    errMessage: 'Save info patient succeed!'
                })

            }




        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    postBookAppoinment: postBookAppoinment
}