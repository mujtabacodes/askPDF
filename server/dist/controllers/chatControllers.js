"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startChat = void 0;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const pdf_parse_1 = __importDefault(require("pdf-parse"));
const standalone_1 = require("../ai/standalone");
const ExtractFileName = (fileName) => {
    const cleanedFileName = fileName.substring(fileName.indexOf('-') + 1);
    console.log(cleanedFileName);
    return cleanedFileName;
};
const processPDF = async (userId, fileNames) => {
    const filePaths = fileNames.map(fileName => path.join(__dirname, '..', 'assets', 'uploads', userId, fileName));
    // Read PDF files
    const pdfTexts = await Promise.all(filePaths.map(filePath => (0, pdf_parse_1.default)(fs.readFileSync(filePath))));
    // Extracted text content from each PDF
    const pdfTextArray = pdfTexts.map(data => data.text);
    // Generate a question for ChatGPT based on the PDF content
    const chatGPTResponses = await Promise.all(pdfTextArray.map(pdfText => /*ChatGPT(pdfText)*/ console.log(pdfText)));
    // const chatGPTResponse = await ChatGPT(pdfTextArray)
    console.log(pdfTextArray);
    // return
    return 'send to code splitter';
    //   return chatGPTResponses;
};
const startChat = (io) => (socket) => {
    console.log('user connected :' + socket.id);
    socket.emit('server_response', { type: 'bot', message: 'Welcome to AskPDF!' });
    let fileNames = [];
    let userId = null;
    let chatGPTResponses = null;
    socket.on('files_send', async (data) => {
        fileNames = data.files;
        userId = data.user_id;
        const query = `Your files are received. Now you can chat!!`;
        console.log('filesNames');
        console.log(fileNames);
        console.log('user-id is ' + userId + ' and file names are ' + fileNames.join(', '));
        socket.emit('server_response', { type: 'bot', message: query });
        // Process the PDFs and initiate conversation with ChatGPT
        chatGPTResponses = await processPDF(userId, fileNames);
        socket.emit('server_response', { type: 'bot', message: chatGPTResponses });
    });
    socket.on('send_message', async (data) => {
        socket.emit('user_message', { type: 'user', message: data.message });
        const res = await (0, standalone_1.Standalone)(data.message);
        // Continue the conversation with ChatGPT based on user's message
        // chatGPTResponses = await ChatGPT(data.message);
        chatGPTResponses = ['ChatGPT response is cooking....']; // Adjust as needed
        socket.emit('server_response', { type: 'bot', message: res });
    });
};
exports.startChat = startChat;
