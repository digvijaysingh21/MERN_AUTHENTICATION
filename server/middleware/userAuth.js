import jwt from "jsonwebtoken";

// const userAuth = async (req, res, next) =>{

//     const {token} = req.cookies;

//     if(!token){
//         return res.status(401).json({success:false, message: 'Not authorised login again'})
//     }

//     try{
//         const tokenDecode = jwt.verify(token,process.env.JWT_SECRET)

//         if(tokenDecode.id){
//             req.body.userId = tokenDecode.id
//         }else{
//             return res.json({success:false, message: 'Not Authorized. Login Again'})
//         }

//         next();

//     }catch(error){
//         res.json({success: false, messag: error.message})
//     }
// }

// export default userAuth;

const userAuth = (req, res, next) => {
  try {
    const token = req.cookies?.token;
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Not authorized. Login again" });
    }

    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

    if (tokenDecode.id) {
      req.userId = tokenDecode.id; // ✅ safe
      next();
    } else {
      return res
        .status(401)
        .json({ success: false, message: "Not authorized. Login again" });
    }
  } catch (error) {
    return res.status(401).json({ success: false, message: error.message });
  }
};

export default userAuth;
