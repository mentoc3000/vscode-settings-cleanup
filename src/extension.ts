// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { organizeSettings } from './settings';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log(
    'Congratulations, your extension "settings-organizer" is now active!'
  );

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand(
    'settings-organizer.organize',
    () => {
      if (!confirmFile()) {
        return;
      }

      // The code you place here will be executed every time your command is executed
      // Display a message box to the user
      const file = vscode.window.activeTextEditor?.document.getText();
      // Default spacing of JSON files
      const workbenchConfig = vscode.workspace.getConfiguration('workbench');
      const spacing = workbenchConfig.get<number>('editor.tabSize');
      const defaultSpacing = 4;

      const organizedSettings = organizeSettings(
        file || '',
        spacing || defaultSpacing
      );
      // Replace contents of file
      vscode.window.activeTextEditor?.edit((editBuilder) => {
        editBuilder.replace(
          new vscode.Range(
            new vscode.Position(0, 0),
            new vscode.Position(
              vscode.window.activeTextEditor?.document.lineCount || 0,
              0
            )
          ),
          organizedSettings
        );
      });
    }
  );

  context.subscriptions.push(disposable);
}

function confirmFile(): boolean {
  // Check that the file is a settings file
  const fileName = vscode.window.activeTextEditor?.document.fileName;
  if (!fileName || !fileName.endsWith('settings.json')) {
    // show dialog
    vscode.window
      .showInformationMessage(
        'This might not be a VS Code settings file. Do you want to proceed?',
        'No',
        'Yes'
      )
      .then((answer) => {
        return answer === 'Yes';
      });
  }
  return true;
}

// This method is called when your extension is deactivated
export function deactivate() {}
