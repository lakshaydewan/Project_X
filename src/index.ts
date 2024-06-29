import { Hono } from 'hono'
import { userRouter } from './routes/user';

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string
  },
  Variables: {
    userID : string;
  }
 
}>();
 
app.route("/api/v1/", userRouter)

export default app
