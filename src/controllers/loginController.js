require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.login = async (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ msg: "Acesso negado" });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    res.status(200).json({ user: decoded, token });
  } catch (error) {
    res.status(400).json({ msg: "Token inválido" });
  }
};

exports.authRegister = async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    return res.status(422).json({ msg: "O email é obrigatório" });
  }

  if (!password) {
    return res.status(422).json({ msg: "A senha é obrigatória" });
  }

  try {
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);
    const user = new User({ email, password: passwordHash });
    await user.save();
    res.status(201).json({ msg: "Usuário criado com sucesso" });
  } catch (error) {
    res.status(500).json({ msg: "Erro no servidor" });
  }
};

const DUMMY_HASH = "$2b$12$invalidhashfortimingprotectionxxxxxxxxxxxxxxxxxxxxxxxxxxxx";

exports.authLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    const hashToCompare = user ? user.password : DUMMY_HASH;
    const checkPassword = await bcrypt.compare(password, hashToCompare);

    if (!user || !checkPassword) {
      return res.status(401).json({ msg: "Credenciais inválidas" });
    }

    const token = jwt.sign({ id: user._id, email: user.email }, process.env.SECRET);
    res.status(200).json({ msg: "Autenticação realizada com sucesso", token });
  } catch (error) {
    res.status(500).json({ msg: "Erro no servidor" });
  }
};

exports.authUser = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ msg: "Erro ao buscar usuários" });
  }
};

exports.authPassword = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.newPassword, 10);
    await User.findByIdAndUpdate(req.params.id, { password: hashedPassword });
    res.status(200).json({ msg: "Senha atualizada" });
  } catch (error) {
    res.status(500).json({ msg: "Erro ao atualizar senha" });
  }
};