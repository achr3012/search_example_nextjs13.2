import {hash} from 'bcrypt'
import { PrismaClient } from '@prisma/client';
import {NextResponse} from 'next/server'

const prisma = new PrismaClient();

export async function POST(req: Request) {
	const {firstN, lastN, email, password} = await req.json()
	const hashed = await hash(password, 12)

	const user = await prisma.user.create({
		data: {
			email,
			firstName: firstN,
			lastName: lastN,
			password: hashed
		}
	})

	return NextResponse.json({
		user: {
			email: user.email
		}
	})
}