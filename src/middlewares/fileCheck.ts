import { Request, Response, NextFunction } from "express";
import fs from "node:fs";
import path from "node:path";

export default function isAllowedFile(req: Request,res: Response,next: NextFunction) {
  const maxFileSizes = {
    image: 1024 * 1024 * 5,
    doc: 1024 * 1024 * 15,
  };
  const file = req.file;
  if (!file) {
    res.status(400).json({
      msg: "Nenhum arquivo enviado",
    });
    return;
  }

  const absoluteFilepath = process.cwd() + "/" + file.path;
  // Atualização de perfil
  if (req.url.includes("profile")) {
    const allowedImagesTypes = ["image/jpeg", "image/png"];
    if (!allowedImagesTypes.includes(file.mimetype)) {
      res.status(400).json({
        msg: "Formato incorreto de imagem",
      });
      fs.unlinkSync(path.join(absoluteFilepath))
    }else if (file.size > maxFileSizes.image) {
      res.status(400).json({
        msg: "Imagem muito grande",
      });
      fs.unlinkSync(path.join(absoluteFilepath));
    }else{
      next();
    }
    return;
  } else {
    //upload de conteudos Documentos 
    const alloweDocumentTypes = ["application/pdf", "application/msword" , "text/plain"];
    if (!alloweDocumentTypes.includes(file.mimetype)) {
      res.status(400).json({
        msg: "Documento não suportado",
      });
      fs.unlinkSync(path.join(absoluteFilepath));
    } else if (file.size > maxFileSizes.doc) {
      res.status(400).json({
        msg: "Pdf muito grande",
      });
      fs.unlinkSync(path.join(absoluteFilepath));
    } else{
      next()
    }
    return
  }
}
