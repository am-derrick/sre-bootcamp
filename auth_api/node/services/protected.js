const jwt = require('jsonwebtoken');

// should I put this in a .env?
const secretKey = 'my2w7wjd7yXF64FIADfJxNs1oupTGAuW';

export const protectFunction = (authorization) => {
  
  try {
    const verified = jwt.verify(authorization, secretKey);
    
    if(verified) {
      return "You are under protected data";
    }
  } catch (error) {
    console.error("Invalid Token");
    return null;
  }
}
