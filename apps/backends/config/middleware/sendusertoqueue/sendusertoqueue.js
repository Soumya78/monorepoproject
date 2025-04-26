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
Object.defineProperty(exports, "__esModule", { value: true });
const notificationservice_1 = require("/Users/soumya/Documents/my-monorepo/apps/backends/services/notifcationservice/notificationservice");
const sendusertoqueue = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.saveusertodb;
    if (!user || !user.emailid) {
        console.warn("User not found in request");
        return next();
    }
    const channel = (0, notificationservice_1.getChannel)();
    if (!channel) {
        console.warn("Channel not found");
        return next();
    }
    const message = JSON.stringify({ emailid: user.emailid });
    channel.sendToQueue("registrationqueue", Buffer.from(message), { persistent: true });
    next();
});
exports.default = sendusertoqueue;
