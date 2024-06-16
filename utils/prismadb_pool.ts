import { PrismaClient } from "@prisma/client";

// const db = new PrismaClient();

class prismaPool {
	public static pool: PrismaClient;

	constructor() {
		prismaPool.pool = new PrismaClient();
	}

	public generateClient() {
		if (prismaPool.pool) return false;
		prismaPool.pool = new PrismaClient();
		return true;
	}
	public getClient() {
		return prismaPool.pool;
	}
}

const prismadb = new prismaPool();

export default prismadb;
