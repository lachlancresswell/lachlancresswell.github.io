"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AutoR1 = require("../../autor1");
const TEMPLATES = './templates.r2t';
const GROUP_NAME = 'AutoR1';
const SUFFIX = '_AUTO';
const templateReader = new FileReader();
fetch(TEMPLATES).then(response => {
    if (!response.ok) {
        printToTerminal(`Could not load templates.`);
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    response.arrayBuffer().then(buffer => {
        templateReader.onload = async (event) => {
            const fileContent = event.target.result; // This will be a ArrayBuffer
            // Convert the ArrayBuffer to a Uint8Array (Buffer-like)
            const buffer = new Uint8Array(fileContent);
            printToTerminal('Templates loaded.');
            const templates = await AutoR1.AutoR1TemplateFile.build(Buffer.from(buffer));
        };
        templateReader.readAsArrayBuffer(buffer);
    });
});
const terminal = document.getElementById('terminal');
const printToTerminal = (message) => {
    const line = document.createElement('div');
    line.textContent = message;
    terminal.appendChild(line);
};
printToTerminal('**AutoR1**');
printToTerminal('Ready.');
// async function uploadFile() {
//     const fileInput = document.getElementById('fileInput')! as HTMLInputElement;
//     const file = fileInput.files![0]
//     if (file) {
//         const reader = new FileReader();
//         reader.onload = async (event) => {
//             const fileContent = event.target!.result! as ArrayBuffer; // This will be a ArrayBuffer
//             // Convert the ArrayBuffer to a Uint8Array (Buffer-like)
//             const buffer = new Uint8Array(fileContent);
//             printToTerminal('File loaded.');
//             const projectFile = await AutoR1.AutoR1ProjectFile.build(Buffer.from(buffer))
//             const existingGroupId = projectFile.getGroupIdFromName(GROUP_NAME)
//             // Update UI
//             const statusDiv = document.getElementById('status')!;
//             statusDiv.style.display = 'block';
//             document.getElementById('responseText')!.textContent = 'Completed!';
//             const downloadLink = document.getElementById('downloadLink')! as HTMLAnchorElement;
//             downloadLink.style.display = 'block';
//             // downloadLink.href = data.downloadUrl; // Provide the actual URL to download the processed file
//             downloadLink.setAttribute('download', 'processed-file.txt'); // Set desired file name
//         };
//     }
// }
//# sourceMappingURL=index.js.map