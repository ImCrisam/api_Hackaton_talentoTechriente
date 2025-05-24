import fs from 'fs/promises';
import path from 'path';

export async function cargarContexto(): Promise<string> {
  const panelInfoPath = path.resolve(__dirname, '../utils/panelInfo.json');
  const infoMdPath = path.resolve(__dirname, '../utils/info.md');
  const promptPath = path.resolve(__dirname, '../utils/promp.ts');

  const panelInfoRaw = await fs.readFile(panelInfoPath, 'utf-8');
  const infoMd = await fs.readFile(infoMdPath, 'utf-8');

  const promptModule = await import(promptPath);
  const promptText: string = promptModule.prompt ?? '';

  return `
Datos del panel:
${JSON.stringify(JSON.parse(panelInfoRaw), null, 2)}

Información adicional:
${infoMd}

Prompt base:
${promptText}
`.trim();
}