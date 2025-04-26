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
exports.processtransaction = void 0;
const processtransaction = function (transactiondata) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Simulating processing time
            yield new Promise((resolve) => setTimeout(resolve, 1000));
            // Approve if the amount is less than or equal to 1000
            const isApproved = transactiondata.amount <= 1000;
            const status = isApproved ? "APPROVED" : "REJECTED";
            return {
                transactionId: transactiondata.transactionId,
                status,
            };
        }
        catch (err) {
            console.log("Error in processing transaction", err);
            // You can optionally throw an error if you want the caller to handle it.
        }
    });
};
exports.processtransaction = processtransaction;
