const databaseService = require("./database.services");
const bookingService = require("./booking.services");
const { genderOptions } = require("../config");
const PNF = require('google-libphonenumber').PhoneNumberFormat;
const phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();
var moment = require('moment');


function validateEmail(email) {
    return new Promise((resolve, reject) => {
        const emailRE = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (emailRE.test(email)) {
            databaseService.emailExists(email.toLowerCase()).then(() => {
                return resolve();
            }).catch((err) => {
                return reject(err);
            });
        } else {
            return reject("Formato incorrecto del correo electrónico");
        }
    });
}

function validatePassword(password) {
    return new Promise((resolve, reject) => {
        if (password.length < 8) {
            return reject("La contraseña debe tener al menos 8 caracteres");
        }
        if (password.search(/[a-z]/i) < 0) {
            return reject("La contraseña debe tener al menos una letra");
        }
        if (password.search(/[0-9]/) < 0) {
            return reject("La contraseña debe tener al menos un digito");
        }
        return resolve();
});
}

function validateDNI(dni) {
    return new Promise((resolve, reject) => {
        const dniRE = /^[XYZ]?\d{5,8}[A-Za-z]$/;
        if(dniRE.test(dni) === true){
            var numero = dni.substr(0,dni.length-1);
            numero = numero.replace('X', 0);
            numero = numero.replace('Y', 1);
            numero = numero.replace('Z', 2);
            var letraDNI = dni.substr(dni.length-1, 1).toUpperCase();
            numero = numero % 23;
            var letrasValidar = 'TRWAGMYFPDXBNJZSQVHLCKET';
            letrasValidar = letrasValidar.substring(numero, numero+1);
            if (letrasValidar != letraDNI) {
                return reject("La letra del DNI no coincide");
            }else{
                return resolve();
            }
        }else {
            return reject("Formato erroneo de DNI");
        }
    });
}


function validateBirthDate(dateBirth) {
    return new Promise((resolve, reject) => {
        const dateRE = /^\d{4}-\d{1,2}-\d{1,2}$/;
        if (dateRE.test(dateBirth)) {
            const day = new Date(dateBirth);
            const dayNumber = day.getTime();
            if (!dayNumber && dayNumber !== 0) {
                return reject("Fecha inválida");
            } else {
                if (day.toISOString().slice(0, 10) === dateBirth) {
                    if (day < new Date()) {
                        return resolve();
                    } else {
                        return reject("Fecha inválida");
                    }
                } else {
                    return reject("Fecha inválida");
                }
            }
        } else {
            return reject("Fecha inválida");
        }
    });
}

function validatePhoneNumber(phoneNumber) {
    return new Promise((resolve, reject) => {
        const number = phoneUtil.parse("+" + phoneNumber);
        if (phoneUtil.isValidNumber(number)) {
            return resolve();
        } else {
            return reject("Número de teléfono inválido")
        }
    });
}

function validateName(name) {
    return new Promise((resolve, reject) => {
        if (name.length >= 1) {
            const nameRegex = /^[a-zA-Z\s]+$/;
            if (nameRegex.test(name)) {
                return resolve();
            } else {
                return reject("Nombre no válido. No pongas números ni caracteres ambiguos");
            }
        } else {
            return reject("Introduce tu nombre");
        }
    });
}


function validateFirstSurname(firstSurname) {
    return new Promise((resolve, reject) => {
        if (firstSurname.length >= 1) {
            const firstSurnameRegex = /^[a-zA-Z\s]+$/;
            if (firstSurnameRegex.test(firstSurname)) {
                return resolve();
            } else {
                return reject("Primer apellido no válido. No pongas números ni caracteres ambiguos");
            }
        } else {
            return reject("Introduce tu primer apellido");
        }
    });
}

function validateSecondSurname(secondSurname) {
    return new Promise((resolve, reject) => {
        const secondSurnameRegex = /^[a-zA-Z\s]*$/;
        if (secondSurnameRegex.test(secondSurname)) {
            return resolve();
        } else {
            return reject("Segundo apellido no válido. No pongas números ni caracteres ambiguos");
        }
    });
}

function validateGender(gender) {
    return new Promise((resolve, reject) => {
        if (genderOptions.includes(gender)) {
            return resolve();
        } else {
            return reject("Introduce un sexo válido");
        }
    });
}


function validateDirection(direction) {
    return new Promise((resolve, reject) => {
        const directionRE = /^[a-zA-Z0-9ªº-\s]*$/;
        if (directionRE.test(direction)) {
           return resolve();
        } else {
            return reject("Directión no válida. No pongas caracteres ambiguos");
        }
    });
}

function validatePoblation(poblation) {
    return new Promise((resolve, reject) => {
        const poblationRE = /^[a-zA-Z\s]*$/;
        if (poblationRE.test(poblation)) {
            return resolve();
        } else {
            return reject("Población no válida. No pongas números ni caracteres ambiguos");
        }
    });
}

function validateProvince(province) {
    return new Promise((resolve, reject) => {
        const provinceRE = /^[a-zA-Z\s]*$/;
        if (provinceRE.test(province)) {
            return resolve();
        } else {
            return reject("Provincia no válida. No pongas números ni caracteres ambiguos");
        }
    });
}


function validatePostalCode(postalCode) {
    return new Promise((resolve, reject) => {
        //TO-DO
        return resolve();
    });
}

function validateEmailRegex(email) {
    const emailRE = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (emailRE.test(email)) {
        return true;
    } else {
        return false;
    }
}


function validateDisponibilityDate(date, courtName) {
    return new Promise((resolve, reject) => {
        const dateRE = /^\d{4}-\d{1,2}-\d{1,2}$/;
        if (dateRE.test(date)) {
            var day = new Date(date);
            const dayNumber = day.getTime();
            if (!dayNumber && dayNumber !== 0) {
                return reject("Fecha inválida");
            } else {
                if (day.toISOString().slice(0, 10) === date) {
                    var today = moment();
                    day = moment(day);
                    today.set("hour", 0);
                    today.set("minute", 0);
                    today.set("second", 0);
                    today.set("millisecond", 0);
                    day.set("hour", 0);
                    day.set("minute", 0);
                    day.set("second", 0);
                    day.set("millisecond", 0);
                    
                   if (day < today) {
                    return reject("Fecha pasada");
                   } else {
                        databaseService.getCourtData(courtName).then((courtData) => {
                            if (today.clone().add(courtData.numberOfDaysToBookBefore, "days") >= day) {
                                return resolve();
                            } else {
                                return reject(`No se puede reservar con más de ${courtData.numberOfDaysToBookBefore} dias de antelación`);
                            }
                        }).catch((err) => {
                            return reject(err);
                        });
                   }
                } else {
                    return reject("Fecha inválida");
                }
            }
        } else {
            return reject("Fecha inválida");
        }
    });
}

function validateCourtName(court) {
    return new Promise((resolve, reject) => {
        const courtRE = /^[a-zA-Z0-9ªº-\s]*$/;
        if (courtRE.test(court)) {
            databaseService.courtNameExists(court).then(() => {
                return resolve();
            }).catch((err) => {
                return reject(err);
            });
        } else {
            return reject("Nombre de pista no válido. No introduzcas caracteres ambiguos")
        }
    });
}

function validateBookingDate(bookingDate, courtName) {
    return new Promise((resolve, reject) => {
        const date = moment(bookingDate, "YYYY-MM-DD HH:mm");
        if (date.isValid() && date >= moment()) {
            validateDisponibilityDate(date.format("YYYY-MM-DD"), courtName).then(() => {
                bookingService.getDisponibility(date.format("YYYY-MM-DD"), courtName).then((availableTimes) => {
                    if (availableTimes.find((element) => date.format("HH:mm") === element) != undefined) {
                        return resolve();
                    } else {
                        return reject("La fecha introducida no es válida");
                    }
                }).catch((err) => {
                    return reject(err);
                });
            }).catch((err) => {
                return reject(err);
            });
        } else {
            return reject("La fecha introducida no es válida");
        }
    });
}

function validateBooleanWithLight(boolean) {
    return new Promise((resolve, reject) => {
        if (boolean === "true" || boolean === "false") {
            return resolve();
        } else {
            return reject("Valor para luz no válido");
        }
    });
}

function validateBooleanOnlyActiveBookings(boolean) {
    return new Promise((resolve, reject) => {
        if (boolean === "true" || boolean === "false") {
            return resolve();
        } else {
            return reject("Valor para todas / activas (reservas a mostrar) no válido");
        }
    });
}


function validateDateOnly(date) {
    return new Promise((resolve, reject) => {
        const dateRE = /^\d{4}-\d{1,2}-\d{1,2}$/;
        if (dateRE.test(date)) {
            const day = new Date(date);
            const dayNumber = day.getTime();
            if (!dayNumber && dayNumber !== 0) {
                return reject("Fecha inválida");
            } else {
                if (day.toISOString().slice(0, 10) === date) {
                    return resolve();
                } else {
                    return reject("Fecha inválida");
                }
            }
        } else {
            return reject("Fecha inválida");
        }
    });
}

function validateBookingIdIsInteger(bookingId) {
    return new Promise((resolve, reject) => {
        if (Number.isInteger(Number(bookingId))) {
            return resolve();
        } else {
            return reject("Id de reserva incorrecto");
        }
    });
}

function validateBookingCancelation(userId, bookingId) {
    return new Promise((resolve, reject) => {
        databaseService.getBookingData(userId, bookingId).then((data) => {
            const bookingDate = moment(data.day + " " + data.startTime, "YYYY-MM-DD HH:mm:ss");
            if (moment().add(data["court.numberOfHoursToCancelCourt"], "hours") < bookingDate) {
                return resolve();
            } else {
                return reject("Ya no es posible cancelar la pista");
            }
        }).catch((err) => {
            return reject(err);
        });
    });
}


function validateCourtId(courtId) {
    return new Promise((resolve, reject) => {
        const i = Number(courtId);
        if (Number.isInteger(i)) {
            databaseService.courtExists(courtId).then(() => {
                return resolve();
            }).catch((err) => {
                return reject(err);
            });
        } else {
            reject("El identificador de la pista es incorrecto");
        }
    });
}

function hasPendingBookingsToPay(userId) {
    return new Promise((resolve, reject) => {
        databaseService.userDoesNotHavePendingBookingsToPay(userId).then((data) => {
            return resolve(data);
        }).catch((err) => {
            return reject(err);
        });
    });
}

function isUserInscribedOnRanking(rankingId, userId) {
    return new Promise((resolve, reject) => {
        databaseService.isUserInscribedOnRanking(rankingId, userId).then((data) => {
            return resolve(data);
        }).catch((err) => {
            return reject(err);
        });
    });
}


module.exports = {
    validateDNI,
    validateName,
    validateFirstSurname,
    validateSecondSurname,
    validateBirthDate,
    validateGender,
    validateEmail,
    validatePhoneNumber,
    validatePassword,
    validateDirection,
    validatePoblation,
    validatePostalCode,
    validateProvince,
    validatePostalCode,
    validateEmailRegex,
    validateDisponibilityDate,
    validateCourtName,
    validateBookingDate,
    validateBooleanWithLight,
    validateBooleanOnlyActiveBookings,
    validateDateOnly,
    validateBookingIdIsInteger,
    validateBookingCancelation,
    validateCourtId,
    hasPendingBookingsToPay,
    isUserInscribedOnRanking,
}