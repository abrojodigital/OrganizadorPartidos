const express = require('express');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

app.get('/health', async (_req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.status(200).json({ status: 'ok', database: 'up' });
  } catch (error) {
    res.status(500).json({ status: 'error', database: 'down', message: error.message });
  }
});

app.get('/sports', async (_req, res) => {
  const sports = await prisma.sport.findMany({ orderBy: { name: 'asc' } });
  res.json(sports);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`API running on port ${port}`);
});
