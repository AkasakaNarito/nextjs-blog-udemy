import { getAllPostIds,getPostData } from "@/lib/post";
import Layout from "../../components/Layout";
import utilStyle from "../../styles/utils.module.css";
import styles from "@/styles/Home.module.css";
import Link from "next/link";
import Head from "next/head"

export async function getStaticPaths() {
    const paths = getAllPostIds();

    return {
        paths,
        fallback:false,
    };
}

export async function getStaticProps({params}) {
    const postData = await getPostData(params.id);

    return {
        props: {
            postData,
        },
    };
}

export default function Post({postData}) {
    return (
        <Layout>
            <Head>
                <title>{postData.title}</title>
            </Head>
            <h1 className={utilStyle.headingMd}>{postData.title}</h1>

            <img className={utilStyle.imgLayout} src={postData.thumbnail} alt="" />
            
            <div className={utilStyle.ligntText}>{postData.date}</div>
           
            <div dangerouslySetInnerHTML={{__html:postData.blogContentHTML}}></div>

            
        </Layout>
    )
}