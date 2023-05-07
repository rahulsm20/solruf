import db from '../db/connect'
import {Request,Response} from 'express'

export const deleteAsset= async (req:Request,res:Response):Promise<void>=>{
    const category=req.query.category;
    db.query("DELETE FROM assets WHERE category=?",[category],   
    (err,result)=>{
        if(err)
        {
            res.status(400).json(err)
        }
        else{
              res.status(202).json(`Asset deleted: ${category}`)
        }
    })
    }

export const addAsset= async (req:Request,res:Response):Promise<void>=>{
    const category:string=req.body.category;
    const amount:number=req.body.amount;
    db.query("INSERT INTO assets (category,amount) VALUES (?,?)",[category,amount],   
    (err,result)=>{
        if(err)
        {
            res.status(400).json(err)
        }
        else{
              res.status(202).json('Asset added')
        }
    })
    }

export const getAssets = async(req:Request,res:Response): Promise<void> => {
    db.query("SELECT * FROM assets",   
    (err,result)=>{
        if(err)
        {
            res.status(400).json(err)
        }
        else{
              res.status(202).json(result)
        }
    })
}

export const updateAsset = async(req:Request,res:Response)=>{
    const {amount,category}=req.query
    db.query("UPDATE assets SET amount=? WHERE category=?",[amount,category],   
    (err,result)=>{
        if(err)
        {
            res.status(400).json(err)
        }
        else{
              res.status(202).json(`Asset updated: ${category}`)
        }
    })
    }
