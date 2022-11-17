const express = require("express");
const router = express.Router();

const categoriaRules = require("../rules/categoria");

router.get("/:idEmpresa", async (req, res) => {
    const idEmpresa = +req.params.idEmpresa;
    const arr = await categoriaRules.get(idEmpresa);
    return res.json(arr);
});

router.get("/:idEmpresa/:idCategoria", async (req, res) => {
    const idCategoria = +req.params.idCategoria;
    const idEmpresa = +req.params.idEmpresa;
    const obj = await categoriaRules.get(idEmpresa, idCategoria);
    return res.json(obj);
});

router.post("/:idEmpresa", async (req, res) => {
    let idEmpresa = +req.params.idEmpresa;
    const result = await categoriaRules.post(req.body, idEmpresa);
    return res.json(result);
});

router.put("/:idEmpresa/:idCategoria", async (req, res) => {
    const idEmpresa = +req.params.idEmpresa;
    const idCategoria = +req.params.idCategoria;
    const result = await categoriaRules.put(req.body, idEmpresa, idCategoria);
    return res.json(result);
});

router.delete("/:idEmpresa/:idCategoria", async (req, res) => {
    const idEmpresa = +req.params.idEmpresa;
    const idCategoria = +req.params.idCategoria;
    const result = await categoriaRules.delete(idEmpresa, idCategoria);
    return res.json(result);
});

module.exports = router;