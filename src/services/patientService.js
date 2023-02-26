import db from "../models/index";
require('dotenv').config();
import emailService from "./emailService";



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

                await emailService.sendSimpleEmail({
                    reciverEmail: data.email,
                    patientName: "Bảo Ngọc",
                    time: "8:00 - 9:00 Chủ nhật 26/2/2023",
                    doctorName: "Bảo Xuyên",
                    redirectLink: "https://www.youtube.com/watch?v=0GL--Adfqhc&list=PLncHg6Kn2JT6E38Z3kit9Hnif1xC_9VqI&index=97&ab_channel=H%E1%BB%8FiD%C3%A2nIT"


                })



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