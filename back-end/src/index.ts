import cors from "cors";
import express from "express";
import { userRouter } from "./routers/user.router";
import { profileRouter } from "./routers/profile.router";
import { donationRouter } from "./routers/donation.router";
import { bankCardRouter } from "./routers/bank-card.router";

const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());

app.use("/users", userRouter);
app.use("/profile", profileRouter);
app.use("/donation", donationRouter);
app.use("/bankCard", bankCardRouter);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

// Git rebase

// 1. git fetch --all
// 2. git rebase origin/main
// 3. fix conflict
// 4. git add .
// 5. git rebase --continue
// 6. git push origin HEAD -f

// Prisma migrate

// 1. npx prisma migrate dev
// 2. npx prisma migrate reset
// npx prisma generate
