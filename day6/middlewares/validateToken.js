export default (req, res, next) => {
  console.log("I am from route middleware");
  const token = req.headers.token;
  if (token && token ==="abc") {
    next();
  } else {
    res.status(403).send({ success: false, message: "Invalid API token" });
  }
};
