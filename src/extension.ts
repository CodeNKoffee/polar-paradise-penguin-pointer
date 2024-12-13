import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	// Create Penguin Decoration
	const createPenguinDecoration = () => {
		return vscode.window.createTextEditorDecorationType({
			after: {
				contentText: '🐧', // Penguin emoji
				margin: '0 0 0 5px',
				color: 'rgba(255, 255, 255, 0.8)'
			}
		});
	};

	// Function to update decorations
	const updateDecorations = (editor: vscode.TextEditor, decoration: vscode.TextEditorDecorationType) => {
		if (!editor) {
			return;
		}

		// Get cursor position
		const cursorPosition = editor.selection.active;

		// Apply penguin emoji decoration at the cursor
		const ranges = [new vscode.Range(cursorPosition, cursorPosition)];
		editor.setDecorations(decoration, ranges);
	};

	// Enable penguin cursor if configuration is enabled
	const config = vscode.workspace.getConfiguration('penguin-pointer');
	if (config.get('enable')) {
		const penguinDecoration = createPenguinDecoration();

		// Update decorations on cursor change
		vscode.window.onDidChangeTextEditorSelection(event => {
			if (event.textEditor) {
				updateDecorations(event.textEditor, penguinDecoration);
			}
		}, null, context.subscriptions);

		// Ensure initial decoration is set
		if (vscode.window.activeTextEditor) {
			updateDecorations(vscode.window.activeTextEditor, penguinDecoration);
		}
	}
}

export function deactivate() { }