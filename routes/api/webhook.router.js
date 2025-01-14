import { Router } from 'express';
import WebhookController from '../../controllers/webhook.controller';
import { ROUTES } from '../../helpers/constants';
import Validators from '../../validation/index.validation';

const router = Router();

const {
  webhooks: { internalFlutterwave, internalCrons },
} = ROUTES;

router.post(internalFlutterwave, WebhookController.listenFlutterwave);

router.post(
  internalCrons,
  Validators.cronListenerValidator,
  WebhookController.listenCrons
);

export default router;
