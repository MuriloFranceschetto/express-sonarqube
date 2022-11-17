const express = require("express");
const router = express.Router();

const empresaRules = require("../rules/empresa");

router.get("/", async (req, res) => {
    const arr = await empresaRules.get();
    return res.json(arr);
});

router.get("/:idEmpresa", async (req, res) => {
    const idEmpresa = +req.params.idEmpresa;
    const obj = await empresaRules.get(idEmpresa);
    return res.json(obj);
});

router.post("/", async (req, res) => {
    const result = await empresaRules.post(req.body);
    return res.json(result);
});

router.put("/:idEmpresa", async (req, res) => {
    const idEmpresa = +req.params.idEmpresa;
    const result = await empresaRules.put(req.body, idEmpresa);
    return res.json(result);
});

router.delete("/:idEmpresa", async (req, res) => {
    const idEmpresa = +req.params.idEmpresa;
    const result = await empresaRules.delete(idEmpresa);
    return res.json(result);
});

module.exports = router;