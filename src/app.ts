import "@/dependency-injection";
import { diContainer } from "@/dependency-injection/di-container";

import express, { json } from "express";
import { useContainer, useExpressServer } from "routing-controllers";

export const app = express();

app.use(json());

useContainer(diContainer);
useExpressServer(app);