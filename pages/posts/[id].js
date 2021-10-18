import Layout from '../../components/layout'
import Head from 'next/head'
import { getAllPostIds, getPostDataContentfulByUrl } from '../../lib/posts'
import Date from '../../components/date'
import utilStyles from '../../styles/utils.module.css'
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';

export default function Post({ postData }) {
    return (
        <Layout>
            <Head>
                <title>{postData.title}</title>
            </Head>
            <article>
                <h1 className={utilStyles.headingXl}>{postData.title}</h1>
                <div className={utilStyles.lightText}>
                    <Date dateString={postData.date} />
                </div>
                <div dangerouslySetInnerHTML={{ __html: documentToHtmlString(postData.content) }} />
            </article>
        </Layout>
    )
}

export async function getStaticPaths() {
    const paths = await getAllPostIds()    
    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps({ params }) {    
    const postData = await getPostDataContentfulByUrl(params.id)    
    return {
        props: {
            postData: postData.fields
        }
    }
}
