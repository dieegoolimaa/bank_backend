const app = require("./app");
const { connectDB } = require("./mongodb/connect");

// Set the port
const PORT = process.env.PORT || 5000;

// Start the server
connectDB(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`);
  });
});

module.exports = app;
