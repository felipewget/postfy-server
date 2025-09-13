import * as fs from 'fs';
import pdf from 'pdf-parse';
import * as mammoth from 'mammoth';
import * as xlsx from 'xlsx';

export const extractTextFromFile = async (
  filePath: string,
): Promise<string> => {
  const ext = filePath.split('.').pop()?.toLowerCase();

  if (!ext) throw new Error('File without extension');

  switch (ext) {
    case 'pdf':
      return extractPdf(filePath);
    case 'docx':
      return extractDocx(filePath);
    case 'xlsx':
      return extractXlsx(filePath);
    case 'txt':
      return extractTxt(filePath);
    default:
      throw new Error(`Unsupported file type: ${ext}`);
  }
};

const extractPdf = async (filePath: string): Promise<string> => {
  const dataBuffer = fs.readFileSync(filePath);
  const pdfData = await pdf(dataBuffer);
  
  return pdfData.text;
};

const extractDocx = async (filePath: string): Promise<string> => {
  const dataBuffer = fs.readFileSync(filePath);
  const result = await mammoth.extractRawText({ buffer: dataBuffer });
  return result.value;
};

const extractXlsx = async (filePath: string): Promise<string> => {
  const workbook = xlsx.readFile(filePath);
  return workbook.SheetNames.map((name) =>
    xlsx.utils.sheet_to_csv(workbook.Sheets[name]),
  ).join('\n');
};

const extractTxt = async (filePath: string): Promise<string> => {
  return fs.readFileSync(filePath, 'utf-8');
};
