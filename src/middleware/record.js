import path from 'path';
import fs from 'fs';
import fsExtra from 'fs-extra';

export default function record(req, data, options) {
  const method = req.method.toLowerCase();
  const dir = path.join(options.configDir, 'data', req.baseUrl, req.path);
  const file = path.join(dir, `${method}.json`);
  console.log('record response to', file);
  fsExtra.mkdirsSync(dir);
  fs.writeFileSync(file, data);
}
