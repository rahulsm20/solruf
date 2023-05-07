import db from "../db/connect";
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { RowDataPacket } from "mysql2";

interface User {
  id: number;
  email: string;
  password: string;
}

const secret = "your_secret_key";

export const signin = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    db.query("SELECT * FROM users WHERE email = ?", [email],async(err, result:RowDataPacket[]) => {
      if (err) {
        res.status(400).json(err);
      } else {
        const user: {[index: string]:any} = result[0];
        console.log(user.password)

        if (!user) {
          res.status(404).json({ message: "User not found" });
          return;
        }
        try{
            const isPasswordCorrect =  await bcrypt.compare(password, user.password);
            if (!isPasswordCorrect) {
                res.status(404).json({ message: "Invalid credentials" });
                return;
            }
            const token = jwt.sign({ email: user.email, id: user.id }, secret, {
                expiresIn: "1h",
            });
            res.status(200).json({ result: user, token });
        }
        catch (error) {
            res.status(500).json({ message: "Server Error" });
          }
      }
    });
  };
  

export const signup = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  db.query(
    "INSERT INTO users (email, password) VALUES (?, ?)",
    [email, hashedPassword],
    (err, result) => {
      if (err) {
        res.status(400).json(err);
      } else {
        res.status(200).json({ message: "New user added" });
      }
    }
  );
};
