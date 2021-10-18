import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import remark from 'remark'
import html from 'remark-html'

const space = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID
const accessToken = process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN

const client = require('contentful').createClient({
    space: space,
    accessToken: accessToken,
})

export async function getAllPostIds() {
    const entries = await client.getEntries({
        content_type: "post"
    })

    var ids = entries.items.map((e) => e.fields.url);

    return ids.map(id => {
        return {
            params: {
                id: id
            }
        }
    });
}

export async function getPostDataContentful() {
    const entries = await client.getEntries({
        content_type: "post"
    })
    if (entries.items) return entries.items
    console.log(`Error getting Entries for ${contentType.name}.`)
}

export async function getPostDataContentfulByUrl(url) {
    const post = await client.getEntry({
        'url': url,
        content_type: "post"
    });
    if (post) return post
    console.log(`Error getting Entries for ${contentType.name}.`)
}