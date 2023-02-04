// should I put this in a .env?
const secretKey = 'my2w7wjd7yXF64FIADfJxNs1oupTGAuW';

export const protectFunction = (authorization) => {
  
  try {
    const verified = jwt.verify(authorization, secretKey);
    
    if(verified) {
      return 'Success!';
    }
  } catch (error) {
    return res.status(401).send(error);
  }
}
