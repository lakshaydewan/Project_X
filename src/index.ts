import { Hono } from 'hono'
import { userRouter } from './routes/user';

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string
    JWT_SECRET: string
  },
  Variables: {
    userID : string;
  }
 
}>();
 
app.route("/api/v1/", userRouter)

export default app
