import express from 'express';
import 'dotenv/config';
import swaggerUi from 'swagger-ui-express';
import { router } from './routes';

const app = express();

app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup());
app.use(router);

app.get('/', (_, response) => {
  return response.json({ ok: true });
});

const port = process.env.PORT || '3333';
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
