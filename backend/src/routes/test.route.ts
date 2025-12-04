import { Router } from "express";

const router = Router();

router.get("/ping", (_, res) => {
    console.log("✔ /ping was hit");
    res.json({ message: "pong" });
});

export default router;
