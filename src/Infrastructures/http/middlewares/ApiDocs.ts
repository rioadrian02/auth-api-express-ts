import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import path from 'path';
import { fileURLToPath } from 'url';
import { Router } from 'express';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const swaggerDocument = YAML.load(
    path.join(__dirname, '../../../../docs/openapi.yaml')
) as object;

const router = Router();
router.use('/', swaggerUi.serve);
router.get('/', swaggerUi.setup(swaggerDocument));

export default router;