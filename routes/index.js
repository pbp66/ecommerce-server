import { Router as router } from "express";
import apiRoutes from "./api";

router.use('/api', apiRoutes);

router.use((req, res) => {
  res.send("<h1>Wrong Route!</h1>")
});

export { router };