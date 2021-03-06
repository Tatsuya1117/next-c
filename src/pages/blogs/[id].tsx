import { Blogs } from '../../interfaces'
import { NextPage, GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import axios from 'axios'
import Link from 'next/link'

interface Props {
  blog: Blogs
  errors?: string
}

const BlogDetail: NextPage<Props> = (props) => {
  return (
    <>
      <Head>
        <title>ブログ詳細</title>
      </Head>
      <h1 className="title">ブログ詳細</h1>
      <Link href="/blogs/">
        <a className="link">ブログトップへ</a>
      </Link>
      <div className="item">
        <h2 className="item__title">{props.blog.title}</h2>
        <p className="item__label">{props.blog.label}</p>
        <p className="item__description">{props.blog.description}</p>
      </div>
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const key = {
      headers: { 'X-API-KEY': process.env.API_KEY }
    }
    const res = await axios.get(
      process.env.END_POINT + 'blogs/' + params?.id
    )
    const data: Blogs = await res.data
    return {
      props: { blog: data }
    }
}

export default BlogDetail