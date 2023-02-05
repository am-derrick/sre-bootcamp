const jwt = require('jsonwebtoken');

// should I put this in a .env?
const secretKey = 'my2w7wjd7yXF64FIADfJxNs1oupTGAuW';

export const protectFunction = (authorization) => {
  
  try {
    const verified = jwt.verify(authorization, secretKey);
    
    if(verified) {
      return 'Success!';
    }
  } catch (error) {
    console.error("You are under protected data");
    return null;
  }
}
