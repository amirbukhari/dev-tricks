"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
const activate = (context) => {
    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "dev-tricks" is now active!');
    // The command has been defined in the package.json file
    // Now provide the implementation of the command with registerCommand
    // The commandId parameter must match the command field in package.json
};
exports.activate = activate;
// this method is called when your extension is deactivated
const deactivate = () => { };
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map