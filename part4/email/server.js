const app = require("./index");
const config = require("./utils/config");
const PORT = config.portNum;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
