"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.STRIPE_SECRET_KEY = exports.STRIPE_PUBLIC_KEY = exports.SUPABASE_URL = exports.SUPABASE_API_KEY = exports.OPENAI_KEY = exports.FRONTEND_URL = exports.PORT = exports.DB = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.DB = process.env.DB;
exports.PORT = parseInt(process.env.PORT);
exports.FRONTEND_URL = process.env.FRONTEND_URL;
exports.OPENAI_KEY = process.env.OPENAI_KEY;
exports.SUPABASE_API_KEY = process.env.SUPABASE_API_KEY;
exports.SUPABASE_URL = process.env.SUPABASE_URL;
exports.STRIPE_PUBLIC_KEY = process.env.STRIPE_PUBLIC_KEY;
exports.STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
//# sourceMappingURL=index.js.map