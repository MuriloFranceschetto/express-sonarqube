const express = require("express");
const router = express.Router();

const subcategoriaRules = require("../rules/subcategoria");

router.get("/:idEmpresa/:idCategoria", async (req, res) => {
    const idEmpresa = +req.params.idEmpresa;
    const idCategoria = +req.params.idCategoria;
    const arr = await subcategoriaRules.get(idEmpresa, idCategoria);
    return res.json(arr);
});

router.get("/:idEmpresa/:idCategoria/:idSubCategoria", async (req, res) => {
    const idEmpresa = +req.params.idEmpresa;
    const idCategoria = +req.params.idCategoria;
    const idSubCategoria = +req.params.idSubCategoria;
    const obj = await subcategoriaRules.get(idEmpresa, idCategoria, idSubCategoria);
    return res.json(obj);
});

router.post("/:idEmpresa/:idCategoria", async (req, res) => {
    let idEmpresa = +req.params.idEmpresa;
    let idCategoria = +req.params.idCategoria;
    const result = await subcategoriaRules.post(req.body, idEmpresa, idCategoria);
    return res.json(result);
});

router.put("/:idEmpresa/:idCategoria/:idSubCategoria", async (req, res) => {
    const idEmpresa = +req.params.idEmpresa;
    const idCategoria = +req.params.idCategoria;
    const idSubCategoria = +req.params.idSubCategoria;
    const result = await subcategoriaRules.put(req.body, idEmpresa, idCategoria, idSubCategoria);
    return res.json(result);
});

router.delete("/:idEmpresa/:idCategoria/:idSubCategoria", async (req, res) => {
    const idEmpresa = +req.params.idEmpresa;
    const idCategoria = +req.params.idCategoria;
    const idSubCategoria = +req.params.idSubCategoria;
    const result = await subcategoriaRules.delete(idEmpresa, idCategoria, idSubCategoria);
    return res.json(result);
});

module.exports = router;