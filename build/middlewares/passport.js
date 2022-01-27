"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
//Comprueba los datos del token
const passport_jwt_1 = require("passport-jwt");
const keys_1 = __importDefault(require("../keys"));
//Permite vereficar el token del header de la aplicacion
const opts = {
    jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: keys_1.default.jwtSecret
};
exports.default = new passport_jwt_1.Strategy(opts, (payload, done) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Me llaman');
    try {
        const user = yield database_1.default.query(`
        call userIdentify
        ('${payload.user}')
        `);
        console.log('***', user[0]);
        if (user[0].length > 0) {
            return done(null, user);
        }
        else {
            return done(null, false);
        }
    }
    catch (error) {
        console.log('Error de strategy', error);
    }
}));