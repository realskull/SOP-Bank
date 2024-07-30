// src/utils/fileUtils.js
import { PDFDocument } from 'pdf-lib';
import mammoth from 'mammoth';

export const readFileAsText = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = async (event) => {
            const fileType = file.type;

            try {
                let text = '';
                
                if (fileType.includes('pdf')) {
                    const pdfDoc = await PDFDocument.load(event.target.result);
                    const pages = pdfDoc.getPages();
                    text = pages.map(page => page.getTextContent().items.map(item => item.str).join(' ')).join('\n');
                } else if (fileType.includes('doc') || fileType.includes('docx')) {
                    const result = await mammoth.extractRawText({arrayBuffer: event.target.result});
                    text = result.value;
                } else if (fileType.includes('txt')) {
                    text = event.target.result;
                }

                resolve(text);
            } catch (error) {
                reject(error);
            }
        };
        reader.onerror = (error) => reject(error);
        reader.readAsArrayBuffer(file);
    });
};
