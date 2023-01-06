import db from "../models/index";
import bcrypt from 'bcryptjs';

let handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};

            let isExist = await checkUserEmail(email);
            if (isExist) {
                let user = await db.user_info.findOne({
                    attributes: ['email', 'roleId', 'password'],
                    where: { email: email },
                    raw: true

                });
                if (user) {
                    let check = await bcrypt.compareSync(password, user.password);
                    // let check = true;
                    if (check) {
                        userData.errCode = 0,
                            userData.errMessage = 'ok',
                            delete user.password;
                        userData.user = user;
                    }
                    else {
                        userData.errCode = 3,
                            userData.errMessage = `Wrong password`;

                    }
                } else {
                    userData.errCode = 2,
                        userData.errMessage = `User's isn't not found`;
                }

            }
            else {
                userData.errCode = 1;
                userData.errMessage = `Your's email isn't exist your system`;

            }
            resolve(userData)
        } catch (e) {
            reject(e)
        }
    })
}
let checkUserEmail = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.user_info.findOne({
                where: { email: userEmail }
            })
            if (user) {
                resolve(true)
            } else {
                resolve(false)
            }
        } catch (e) {
            reject(e)
        }
    })
}
module.exports = {
    handleUserLogin: handleUserLogin
}