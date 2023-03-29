import { PrismaClient } from "@prisma/client";
import { formatDistanceToNow } from "date-fns";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import styles from '../../page.module.css';

const prisma = new PrismaClient();

const fetchPostById = async (
  id: number,
  select: {
    createdAt: boolean,
    author: boolean,
    content: boolean
  }
) => {
  const post = await prisma.post.findUnique({
    where: {
      id: Number(id)
    },
    select: {
      title: true,
      ...select
    }
  });
  return post;
}

export async function generateMetadata({ params }: { params: { id: number } }): Promise<Metadata> {
  if (!isNaN(params.id)) {
    const post = await fetchPostById(params.id, {
      createdAt: false,
      author: false,
      content: false
    });
    if (post) {
      return { title: post.title }
    } else {
      return { title: "Post Not Found!!!" }
    }
  } else {
    return { title: "Post Not Found!!!" }
  }
}

export default async function Post({ params }: { params: { id: number } }) {
  const { id } = params;

  if (isNaN(id)) {
    throw new Error("The url you entred is invalid, please check it and try again!");
  }

  const post = await fetchPostById(id, {
    createdAt: true,
    author: true,
    content: true,
  });

  if (!post) {
    notFound();
  }

  const nameMatch = post.author.email.match(/^([^@]*)@/);
  const username = nameMatch ? nameMatch[1] : null;

  return (
    <div>
      <h1>{post.title}</h1>
      <p className={styles.postDesc}>
        Written by
        <Link href={`/author/${username}`}>
          {post.author.firstName} {post.author.lastName}
        </Link>
        <span> · {formatDistanceToNow(post.createdAt, { addSuffix: true })}</span>
      </p>

      <p className={styles.postContent}>{post.content}</p>
    </div>
  )
}

