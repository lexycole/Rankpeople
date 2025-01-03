"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const twrnc_1 = require("twrnc");
const tailwind_config_1 = __importDefault(require("../../tailwind.config"));
const tw = (0, twrnc_1.create)(tailwind_config_1.default);
exports.default = tw;
