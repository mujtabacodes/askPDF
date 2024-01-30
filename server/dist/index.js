"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// app.ts
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const mongoose_1 = __importDefault(require("mongoose"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const http_errors_1 = __importDefault(require("http-errors"));
const config_1 = require("./config");
const errorHanlder_1 = require("./middleware/errorHanlder");
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const uploadRoutes_1 = __importDefault(require("./routes/uploadRoutes"));
const getfilesRoutes_1 = __importDefault(require("./routes/getfilesRoutes"));
const chatRoutes_1 = __importDefault(require("./routes/chatRoutes"));
const stripeRoute_1 = __importDefault(require("./routes/stripeRoute"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: config_1.FRONTEND_URL,
    credentials: true,
}));
app.use(express_1.default.json());
app.use((0, morgan_1.default)('tiny'));
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: config_1.FRONTEND_URL,
        methods: ['GET', 'POST'], // Adjust with required methods
    },
});
app.use('/users', userRoutes_1.default);
app.use('/upload', uploadRoutes_1.default);
app.use('/get', getfilesRoutes_1.default);
app.use('/', (0, chatRoutes_1.default)(io));
app.use('/payment', stripeRoute_1.default);
app.use(() => {
    throw (0, http_errors_1.default)(404, 'Route not found');
});
app.use(errorHanlder_1.errorHandler);
mongoose_1.default
    .connect(config_1.DB)
    .then(() => {
    console.log('Connected to db');
    server.listen(config_1.PORT, () => {
        console.log(`Listening On PORT ${config_1.PORT}`);
    });
})
    .catch(() => {
    throw (0, http_errors_1.default)(501, 'Unable to connect to the database');
});
//# sourceMappingURL=index.js.map