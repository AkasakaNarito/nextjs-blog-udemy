import path from "path";
import fs from "fs";
import matter from "gray-matter";
import {remark} from "remark";
import html from "remark-html"

const postsDirectory = path.join(process.cwd(),"posts");

export function getPostsData() {
    
    try {
        
        // ディレクトリ内のファイル名を取得
        const fileNames = fs.readdirSync(postsDirectory);
        const allPostsData = fileNames
            .filter((fileName)=>fileName.match(/\.md$/i))
            .map((fileName)=>{
                const id = fileName.replace(/\.md$/i,"");

                // マークダウンファイルを文字列としてよみとる
                const fullPath = path.join(postsDirectory,fileName);
                const fileContents = fs.readFileSync(fullPath,"utf-8");

                // フロントマターを解析
                const matterResult = matter(fileContents);

                // idとデータを返す
                return {
                    id,
                    ...matterResult.data,
                };
            });

            return allPostsData;

    }catch(error) {
        console.error("Error in getPostsData",error.message);
        return[];
    }
}

//getStaticPathで使うpathを取得する
export function getAllPostIds() {
    const fileNames = fs.readdirSync(postsDirectory);
    return fileNames.map((filename)=>{
        return {
            params: {
                id: filename.replace(/\.md$/,""),
            },
        }
    })
}

// idに基づいてブログ投稿データを返す
export async function getPostData(id) {
    const fullPath = path.join(postsDirectory,`${id}.md`);
    const fileContent = fs.readFileSync(fullPath,"utf-8");

    const matterResult = matter(fileContent);

    const blogContent = await remark()
    .use(html)
    .process(matterResult.content);
    //  dataだったら title,date,thumbnailを返すcontentは本文を返す

    const blogContentHTML = blogContent.toString();

    return {
        id,
        blogContentHTML,
        ...matterResult.data,
    }
}