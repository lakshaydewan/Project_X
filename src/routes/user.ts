import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate';

export const userRouter = new Hono<{
    Bindings: {
      DATABASE_URL: string
    },
    Variables: {
      userID : string;
    }
  }>();

  
userRouter.post("/create-order",async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const body = await c.req.json();
  const newOrder = await prisma.order.create({
    data : {
      orderDetails: body.orderDetails,
      userId: body.email
    }
  })
  
  return c.json(newOrder, 200);
})

userRouter.get("/order-history",async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const body = await c.req.json();

  const all_orders = await prisma.order.findMany({
    where: {userId: body.email},
  })

  return c.json({
    all_orders
  }, 200)
})

userRouter.post("/create-user",async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();

  const user = await prisma.user.create({
    data : {
      email : body.email,
      password: body.password
    }
  })

  return c.text("")
})

userRouter.post("/update-payment",async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const body = await c.req.json();
  const updatedUser = await prisma.order.update({
    where: { id: body.orderId},
    data: {
      paymentStatus : true
    },
  });

  return c.text("updated successfully", 201);
})