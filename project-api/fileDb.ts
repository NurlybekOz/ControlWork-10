import {promises as fs} from 'fs';

import {CommentaryWithId, CommentaryWithoutId, DataDb, NewsWithoutId} from "./types";
import {existsSync} from "node:fs";
import * as crypto from "node:crypto";



const filename = './db.json';
let data: DataDb = {
    news: [],
    commentaries: [],
};

const fileDb = {
    async init() {
        try {
            if (!existsSync(filename)) {
                return fs.writeFile(filename, JSON.stringify({news: [], commentaries: []}));

            } else {
                const fileContent = await fs.readFile(filename);
                data = JSON.parse(fileContent.toString()) as DataDb;
            }
        } catch (e) {
            data = {news: [], commentaries: []};
            console.error(e);
        }
    },
    async getNewsById(param_id: string) {
        return data.news.find((p) => p.id === param_id);
    },
    async getAllNews() {
        return data.news;
    },
    async getAllCommentaries() {
        return data.commentaries;
    },
    async deleteNews(param_id: string) {
        data.news = data.news.filter(info => info.id !== param_id);
        data.commentaries = data.commentaries.filter(info => info.news_id !== param_id);

        await this.save();
    },
    async deleteCommentary(param_id: string) {
      data.commentaries = data.commentaries.filter(commentary => commentary.id !== param_id);
      await this.save();
    },
    async addNewInfo(infoToAdd: NewsWithoutId) {
        const datetime = new Date().toISOString();
        const newInfo = {
            id: crypto.randomUUID(),
            ...infoToAdd, datetime};
        data.news.push(newInfo)
        await this.save();
        return newInfo;
    },
    async addNewCommentary (commentaryToAdd: CommentaryWithoutId) {
        const newCommentary = {id: crypto.randomUUID(), ...commentaryToAdd};
        data.commentaries.push(newCommentary);
        await this.save();
        return newCommentary;
    },
    async save () {
        return fs.writeFile(filename, JSON.stringify(data));
    }
};
export default fileDb;
