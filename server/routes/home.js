import { Router } from 'express';
import { resolve } from 'path';

const router = new Router();

router.get('/', (req, res) => {
  res.sendFile('/Users/mvargeson/projects/wonky-mongoose/src/server/views/index.html');
});

export default router;
