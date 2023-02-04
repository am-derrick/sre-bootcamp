// should I put this in a .env?
const secretKey = 'my2w7wjd7yXF64FIADfJxNs1oupTGAuW';

export const protectFunction = (authorization) => {
  
  const token = req.header('Authorization');

  // check that token exists
  if(!token) {
    return res.status(403).send('Please add token');
  }

  try {
    const verified = jwt.verify(token, secretKey);
    
    if(verified) {
      res.send('Success!');
    } else {
      return res.status(401).send(error);
    }
  } catch (error) {
    return res.status(401).send(error);
  }
}
