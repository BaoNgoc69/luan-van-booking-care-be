import bcrypt from 'bcryptjs';
import db from '../models/index';
const salt = bcrypt.genSaltSync(10);
let createNewUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPasswordFromBcrypt = await hashUserPassword(data.password);
            await db.users.create({
                email: data.email,
                password: hashPasswordFromBcrypt,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                phonenumber: data.phone,
                gender: data.gender === '1' ? true : false,
                roleId: data.roleid,


            })
            resolve('ok create new user succeed')
        } catch (e) {
            reject(e);
        }
    })

}
let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword);
        } catch (e) {
            reject(e);
        }
    })
}
let getUserInfoById = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.users.findOne({
                where: { id: userId },
                raw: true,



            })
            if (user) {
                resolve(user)
            } else {
                resolve({})
            }
        } catch (e) {
            reject(e);
        }
    })

}
let getAllUser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = db.users.findAll({
                raw: true,
            });
            resolve(users)
        } catch (e) {
            reject(e);
        }
    })
}
let updataUserData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.users.findOne({
                where: { id: data.id }
            })
            if (user) {
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.address = data.address;
                await user.save();
                let allUsers = await db.users.findAll();

                resolve(allUsers);
            }
            else {
                resolve();
            }



        } catch (e) {
            reject(e);
        }
    })
}
let deleteUserById = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.users.findOne({
                where: { id: userId }
            })
            if (user) {
                await user.destroy();
            }
            resolve();
        } catch (e) {
            reject(e);
        }
    })
}
module.exports = {
    createNewUser: createNewUser,
    getAllUser: getAllUser,
    getUserInfoById: getUserInfoById,
    updataUserData: updataUserData,
    deleteUserById: deleteUserById,

}