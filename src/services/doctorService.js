import db from "../models/index";

let getTopDoctorHome = (limitInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            let User = await db.users.findAll({
                limit: limitInput,
                where: { roleId: 'R2' },
                order: [['createdAt', 'DESC']],
                attributes: {
                    exclude: ['password']
                },
                include: [
                    { model: db.allcode, as: 'positionData', attributes: ['valueEn', 'valueVi'] },
                    { model: db.allcode, as: 'genderData', attributes: ['valueEn', 'valueVi'] },

                ],
                raw: true,
                nest: true

            })
            resolve({
                errCode: 0,
                data: User
            })
        } catch (e) {
            reject(e)
        }
    })
}
module.exports = {
    getTopDoctorHome: getTopDoctorHome
}