import express from "express";
import { indexcontroller } from "../controllers/index.js";


const indexrouter = express.Router();

indexrouter.get("/", indexcontroller.home);

indexrouter.post("/post", indexcontroller.post);

indexrouter.post("/postP", indexcontroller.postP);

indexrouter.get("/verif", indexcontroller.verif);

indexrouter.get("/puestos", indexcontroller.puestos);

export default indexrouter;