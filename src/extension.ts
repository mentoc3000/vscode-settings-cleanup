import * as vscode from 'vscode';
import { organizeSettings } from './settings';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand(
    'settings-organizer.organize',
    organize
  );

  context.subscriptions.push(disposable);
}

/// Organize the settings file
async function organize() {
  if (!(await proceedWithFile()) || !(await proceedWithComments())) {
    return;
  }

  // The code you place here will be executed every time your command is executed
  // Display a message box to the user
  const file = vscode.window.activeTextEditor?.document.getText();

  // Default spacing of JSON files
  const workbenchConfig = vscode.workspace.getConfiguration();
  const tabSize = workbenchConfig.get<number>('editor.tabSize');
  const defaultTabSize = 4;

  const organizedSettings = organizeSettings(
    file || '',
    tabSize || defaultTabSize
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

/// Check if the file is a settings file
async function proceedWithFile(): Promise<boolean> {
  // Check that the file is a settings file
  const fileName = vscode.window.activeTextEditor?.document.fileName;
  if (!fileName || !fileName.endsWith('settings.json')) {
    // show dialog
    const answer = await vscode.window.showInformationMessage(
      'This might not be a VS Code settings file. Do you want to proceed?',
      'No',
      'Yes'
    );
    return answer === 'Yes';
  }
  return true;
}

/// Check if the file has comments
async function proceedWithComments(): Promise<boolean> {
  // Check that the file has no comments
  const fileContent = vscode.window.activeTextEditor?.document.getText();

  if (!fileContent) {
    return true;
  }

  // Regular expressions for detecting comments
  const singleLineComment = /\/\/.*/g; // Matches // comments
  const multiLineComment = /\/\*[\s\S]*?\*\//g; // Matches /* */ comments

  if (
    singleLineComment.test(fileContent) ||
    multiLineComment.test(fileContent)
  ) {
    // show dialog
    const answer = await vscode.window.showInformationMessage(
      'This settings file may contain contain comments, which will be lost after organizing. Do you want to proceed?',
      'No',
      'Yes'
    );
    return answer === 'Yes';
  }
  return true;
}

// This method is called when your extension is deactivated
export function deactivate() {}
