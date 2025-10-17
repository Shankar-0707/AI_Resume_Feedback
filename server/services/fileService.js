import fs from "fs";

export const deleteOldFile = (path) => {
    try{
        if(fs.existsSync(path)) fs.unlinkSync(path);
    }
    catch(err){
        console.error("Error deleteing file : ", err);
    }
}