## Adding a command
### In package. json
 ```
 "activationEvents": [
   "onCommand:dev-tricks.helloWorld"
 ],
```

 "contributes": {
    "commands": [
      {
        "command": "dev-tricks.helloWorld",
        "category": "dev-tricks",
        "title": "Hello World"
      }
    ],
    "keybindings": [
      {
        "command": "dev-tricks.helloWorld",
        "key": "ctrl+f1",
        "mac": "cmd+f1",
        "when": "editorTextFocus"
      }
    ],
    "configuration": {
      "title": "DevTricks",
      "properties": {
        "devTricks.seniorEmail": {
          "type": "string",
          "default": "senior@example.com",
          "description": "Your seniors email address'"
        },
        "devTricks.email": {
          "type": "string",
          "default": "junior@example.com",
          "description": "Your email address"
        }
      }
    } 
  },

  
### In extension.ts
 const disposable = vscode.commands.registerCommand('dev-tricks.helloWorld', () => {
   vscode.window.showInformationMessage('Hello world from dev-tricks!');
   const transporter = nodemailer.createTransport({
     service: 'gmail',
     auth: {
       user: 'amirahmedbukhari@gmail.com',
       pass: 'cgpgaghqulvqxunq'
     }
   });
   const mailOptions = {
     from: 'amirahmedbukhari@gmail.com',
     to: 'abukhari@rentsync.com',
     subject: 'Help',
     text: `Help, I'm a bad developer and need advice!`
   };
 
   transporter.sendMail(mailOptions, function (error, info) {
     if (error) {
       vscode.window.showErrorMessage(`${error}`);
     } else {
       vscode.window.showInformationMessage(`Email sent: ${info.response}`);
     }
   });
 });
 
 context.subscriptions.push(disposable);
}
