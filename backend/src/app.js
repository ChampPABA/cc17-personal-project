require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const limiter = require("./middlewares/rate-limit");
const notFoundMiddleware = require("./middlewares/not-found");
const errorMiddleware = require("./middlewares/error");
const userRouter = require("./routes/user-route");
const quotationRouter = require("./routes/quotation-route");
const authenticate = require("./middlewares/authenticate");

const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(limiter);
app.use(express.json());

app.use("/user", userRouter);

app.use("/quotation", authenticate, quotationRouter);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
