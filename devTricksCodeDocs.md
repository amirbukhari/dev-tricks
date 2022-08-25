
# Dev Tricks VSCode Extension 
## Registering a command
### In package. json
 ```json
  "activationEvents": [
    "onCommand:dev-tricks.sendNotification"
  ],
```
Other examples
```json
"onLanguage:typescript"
"onStartupFinished"
```
---
In package json under the contributes object add the following
```json
  "commands": [
    {
      "command": "dev-tricks.sendNotification",
      "category": "dev-tricks",
      "title": "Dev Tricks Send Notification"
    }
  ],
```

in extension.ts, in the activate lifecycle function
```ts
	const disposable = vscode.commands.registerCommand('dev-tricks.sendNotification', async () => { 
  	vscode.window.showInformationMessage(`Hello Rentsync Devs`);
});

context.subscriptions.push(disposable);
```
We can trigger this command by pressing f1 and typing in dev-tricks sendNotification

---

## Adding a keybinding
in package json under the contributes object add the following
```json
  "keybindings": [
    {
      "command": "dev-tricks.sendNotification",
      "key": "ctrl+f1",
      "mac": "cmd+f1",
      "when": "editorTextFocus"
    }
  ],
```

## Adding Settings
in package json under the contributes object add the following
``` json
"configuration": {
    "title": "dev-tricks",
    "properties": {
      "dev-tricks.seniorEmail": {
        "type": "string",
        "default": "senior@example.com",
        "description": "Your seniors email address"
      },
      "dev-tricks.email": {
        "type": "string",
        "default": "junior@example.com",
        "description": "Your email address"
      }
    }
  } 
```
in extenstion.ts activate function
```ts
const configuration = vscode.workspace.getConfiguration('dev-tricks');

const seniorEmail = configuration.get<string>('seniorEmail');
const juniorEmail = configuration.get<string>('email');
		
```


## Adding our notification functionality  
### In extension.ts under the activate function
```ts
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
```