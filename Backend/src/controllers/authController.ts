import { Request, Response } from "express";
import { pool } from "../config/db";
import crypto from "crypto";

export async function login(req: Request, res: Response) {
  try {
    const { email, password_hash } = req.body;
    console.log(req.body);

    if (!email || !password_hash) {
      return res.status(400).json({ message: "E-mail e senha são obrigatórios" });
    }

    const hashedPassword = crypto.createHash("md5").update(password_hash).digest("hex");

    const query = `
      SELECT id, name, email, type 
      FROM users
      WHERE email = $1 AND password_hash = $2
    `;
    const result = await pool.query(query, [email, hashedPassword]);

    if (result.rows.length === 0) {
      return res.status(401).json({ message: "E-mail ou senha incorretos" });
    }

    const user = result.rows[0];
    res.json({ message: "Login bem-sucedido", user });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: "Erro no servidor" });
  }
}
