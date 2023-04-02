import db from "../models/index";
require("dotenv").config();
import emailService from "./emailService";
import { v4 as uuidv4 } from "uuid";
import { resolve } from "path";
import { reject } from "lodash";

let buildUrlEmail = (doctorId, token) => {
  console.log(token);
  let result = `${process.env.URL_REACT}/verify-booking?token=${token}&doctorId=${doctorId}`;
  return result;
};

let postBookAppoinment = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !data.email ||
        !data.doctorId ||
        !data.timeType ||
        !data.date ||
        !data.fullName ||
        !data.selectedGender ||
        !data.address
      ) {
        resolve({
          errCode: 1,
          errMessage: "Missing parameter!",
        });
      } else {
        let user = await db.users.findOrCreate({
          where: { email: data.email },
          defaults: {
            email: data.email,
            roleId: "R3",
            gender: data.selectedGender,
            address: data.address,
            firstName: data.fullName,
          },
        });

        if (user && user[0]) {
          const booking = await db.booking.findOne({
            where: {
              timeType: data.timeType,
              doctorId: data.doctorId,
            },
          });

          if (booking && booking["id"]) {
            resolve({
              data: user,
              errCode: -1,
              errMessage: "This time is already picked",
            });
          }
          else {
            let token = uuidv4();
          await emailService.sendSimpleEmail({
            reciverEmail: data.email,
            patientName: data.fullName,
            time: data.timeString,
            doctorName: data.doctorName,
            language: data.language,
            redirectLink: `${process.env.URL_REACT}/verify-booking?token=${token}&doctorId=${data.doctorId}`,
          });

          // update patient
        //   let user = await db.users.findOrCreate({
        //     where: { email: data.email },
        //     defaults: {
        //       email: data.email,
        //       roleId: "R3",
        //       gender: data.selectedGender,
        //       address: data.address,
        //       firstName: data.fullName,
        //     },
        //   });
          // create a booking record

            await db.booking.findOrCreate({
              where: {
                patientId: null,
              },
              defaults: {
                statusId: "S1",
                doctorId: data.doctorId,
                patientId: user[0].id,
                date: data.date,
                timeType: data.timeType,
                token: token,
              },
            });
          

          resolve({
            data: user,
            errCode: 0,
            errMessage: "Save info patient succeed!",
          });
          }
        } else {
            resolve({
                data: user,
                errCode: 0,
                errMessage: "Save info patient succeed!",
              });
        //   let token = uuidv4();
        //   await emailService.sendSimpleEmail({
        //     reciverEmail: data.email,
        //     patientName: data.fullName,
        //     time: data.timeString,
        //     doctorName: data.doctorName,
        //     language: data.language,
        //     redirectLink: `${process.env.URL_REACT}/verify-booking?token=${token}&doctorId=${data.doctorId}`,
        //   });

          // update patient
        //   let user = await db.users.findOrCreate({
        //     where: { email: data.email },
        //     defaults: {
        //       email: data.email,
        //       roleId: "R3",
        //       gender: data.selectedGender,
        //       address: data.address,
        //       firstName: data.fullName,
        //     },
        //   });
          // create a booking record
        //   if (user && user[0]) {
        //     await db.booking.findOrCreate({
        //       where: {
        //         patientId: null,
        //       },
        //       defaults: {
        //         statusId: "S1",
        //         doctorId: data.doctorId,
        //         patientId: user[0].id,
        //         date: data.date,
        //         timeType: data.timeType,
        //         token: token,
        //       },
        //     });
        //   }

          resolve({
            data: user,
            errCode: 0,
            errMessage: "Save info patient succeed!",
          });
        }
      }
    } catch (e) {
      reject(e);
    }
  });
};

let postVerifyAppoinment = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.token || !data.doctorId) {
        resolve({
          errCode: 1,
          errMessage: "Missing parameter!",
        });
      } else {
        let appoiment = await db.booking.findOne({
          where: {
            doctorId: data.doctorId,
            token: data.token,
            statusId: "S1",
          },
          raw: false,
        });

        if (appoiment) {
          appoiment.statusId = "S2";
          await appoiment.save();

          resolve({
            errCode: 0,
            errMessage: "Update the apoinment succeed!",
          });
        } else {
          resolve({
            errCode: 0,
            errMessage: "Update the apoinment succeed!",
          });
        }
      }
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  postBookAppoinment: postBookAppoinment,
  postVerifyAppoinment: postVerifyAppoinment,
};
