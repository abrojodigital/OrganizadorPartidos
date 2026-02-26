import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const sports = [
    { name: 'Fútbol 5', minPlayers: 10, maxPlayers: 10, teamBased: true, requiresPositions: true },
    { name: 'Fútbol 7', minPlayers: 14, maxPlayers: 14, teamBased: true, requiresPositions: true },
    { name: 'Básquet', minPlayers: 6, maxPlayers: 10, teamBased: true, requiresPositions: true },
    { name: 'Vóley', minPlayers: 8, maxPlayers: 12, teamBased: true, requiresPositions: true },
    { name: 'Hockey', minPlayers: 12, maxPlayers: 22, teamBased: true, requiresPositions: true },
    { name: 'Handball', minPlayers: 10, maxPlayers: 14, teamBased: true, requiresPositions: true },
    { name: 'Rugby reducido', minPlayers: 10, maxPlayers: 14, teamBased: true, requiresPositions: true },
    { name: 'Pádel', minPlayers: 2, maxPlayers: 4, teamBased: true, requiresPositions: false },
    { name: 'Tenis dobles', minPlayers: 4, maxPlayers: 4, teamBased: true, requiresPositions: false }
  ];

  for (const sport of sports) {
    await prisma.sport.upsert({
      where: { name: sport.name },
      update: sport,
      create: sport
    });
  }
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
