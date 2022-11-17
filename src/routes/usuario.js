const express = require("express");
const router = express.Router();

const usuarioRules = require("../rules/usuario");

router.get("/:idEmpresa", async (req, res) => {
    const idEmpresa = +req.params.idEmpresa;
    const arr = await usuarioRules.get(idEmpresa);
    return res.json(arr);
});

router.get("/:idEmpresa/:idUsuario", async (req, res) => {
    const idUsuario = +req.params.idUsuario;
    const idEmpresa = +req.params.idEmpresa;
    const obj = await usuarioRules.get(idEmpresa, idUsuario);
    return res.json(obj);
});

router.post("/:idEmpresa", async (req, res) => {
    let idEmpresa = +req.params.idEmpresa;
    const result = await usuarioRules.post(req.body, idEmpresa);
    return res.json(result);
});

router.put("/:idEmpresa/:idUsuario", async (req, res) => {
    const idEmpresa = +req.params.idEmpresa;
    const idUsuario = +req.params.idUsuario;
    const result = await usuarioRules.put(req.body, idEmpresa, idUsuario);
    return res.json(result);
});

router.delete("/:idEmpresa/:idUsuario", async (req, res) => {
    const idEmpresa = +req.params.idEmpresa;
    const idUsuario = +req.params.idUsuario;
    const result = await usuarioRules.delete(idEmpresa, idUsuario);
    return res.json(result);
});

module.exports = router;