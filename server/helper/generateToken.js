import jsonWeb from "jsonwebtoken";

const generateToken = async (id) => {
  let token = jsonWeb.sign({ id }, process.env.SECRET_KEY, {
    expiresIn: "24h",
  });
  return token;
};

export { generateToken };
