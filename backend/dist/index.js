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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const mongoose_1 = __importDefault(require("mongoose"));
const MyUserRoute_1 = __importDefault(require("./routes/MyUserRoute"));
console.log('MONGODB_CONNECTION_STRING:', process.env.MONGODB_CONNECTION_STRING);
mongoose_1.default.connect(process.env.MONGODB_CONNECTION_STRING).then(() => console.log('connected to database'));
const app = (0, express_1.default)(); //create a new express server
app.use(express_1.default.json()); //middlware - convert the body of any request to API server to json 
app.use((0, cors_1.default)());
app.get("/health", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send({ message: "health OK!" });
}));
app.use("/api/my/user", MyUserRoute_1.default);
const server = app.listen(8000, () => {
    console.log("server start on localhost:8000");
});
