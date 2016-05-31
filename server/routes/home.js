import { Router } from 'express';
import { resolve } from 'path';

const router = new Router();

router.get('/', (req, res) => {
  res.sendFile(resolve('build/index.html'));
});

export default router;
