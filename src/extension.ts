// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as nodemailer from 'nodemailer';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	const configuration = vscode.workspace.getConfiguration('dev-tricks')

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "dev-tricks" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	const disposable = vscode.commands.registerCommand('dev-tricks.helloWorld', async () => { 
		const password = await vscode.window.showInputBox({
			prompt:'Please enter your password',
			password:true
		});
		
		const seniorEmail = configuration.get<string>('seniorEmail');
		const juniorEmail = configuration.get<string>('email');
		
		const transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				user: juniorEmail,
				pass: password
			}
		});
		const mailOptions = {
			from: juniorEmail,
			to: seniorEmail,
			subject: 'James help',
			text: `James help`
		};

		transporter.sendMail(mailOptions, (error, info) => {
			if (error) {
				vscode.window.showErrorMessage(`${error}`);
			} else {
				vscode.window.showInformationMessage(`Email sent: ${info.response}`);
			}
		});
	});

	context.subscriptions.push(disposable);
 }

// this method is called when your extension is deactivated
export function deactivate() { }
