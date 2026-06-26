import { prisma } from "../src";

async function main() {
  await prisma.source.upsert({
    where: { id: "stablecoin-africa-report" },
    update: {},
    create: {
      id: "stablecoin-africa-report",
      title: "Stablecoin settlement rails for African digital creators",
      publisher: "Creator Economy Research Lab",
      url: "https://example.com/research/stablecoin-africa-creators",
      type: "x402",
      trustScore: 94,
      relevanceScore: 97,
      freshnessScore: 91,
      citationPriceUsd: 0.0045,
      walletAddress: "0x9A4f8d3e2C0A901F44e92Ff8B0c1E339F0E72E10",
      excerpt: "Compares USDC, local ramps, mobile money bridges, settlement finality, and creator payout reliability.",
      license: "pay-per-citation"
    }
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
