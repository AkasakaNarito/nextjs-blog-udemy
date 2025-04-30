import Link from "next/link";
import Head from "next/head";


const firstPost = () => {
    
    return (
        
        <div>
            <Head>
                <title>first post</title>
            </Head>
            <h1>最初の投稿</h1>
            <Link href="/">最初の投稿</Link>
        </div>
    )
}

export default firstPost