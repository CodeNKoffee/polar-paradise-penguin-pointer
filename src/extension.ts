import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	// Penguin Emoji Cursor Configuration
	const configurePenguinCursor = () => {
		// Unicode for penguin emoji: 🐧 (U+1F427)
		const penguinEmoji = '🐧';

		const cursorDecoration = vscode.window.createTextEditorDecorationType({
			after: {
				contentText: penguinEmoji,
				margin: '0 0 0 5px',
				color: 'rgba(255, 255, 255, 0.5)'
			},
			cursor: 'pointer'
		});

		return cursorDecoration;
	};

	// Configuration
	const config = vscode.workspace.getConfiguration('penguinCursor');

	if (config.get('enabled')) {
		const cursorDecoration = configurePenguinCursor();
		context.subscriptions.push(cursorDecoration);
	}
}

export function deactivate() { }