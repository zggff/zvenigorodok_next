import { Collection } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../lib/mongodb";

export interface Review {
    text: string;
    user: string;
    date: Date;
    target: ReviewTarget;
}
export type ReviewTarget = "Tyres" | "Cleaning" | "HomeMaster";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const client = await clientPromise;
        const collection = client.db("zvenigorodok").collection("reviews");

        if (req.method === "POST") {
            post(req, res, collection);
        } else if (req.method === "GET") {
            get(req, res, collection);
        } else {
            res.status(404);
        }
    } catch (e) {
        console.error(e);
    }
};

const post = async (
    req: NextApiRequest,
    res: NextApiResponse,
    collection: Collection
) => {
    const review = req.body as Review;
    if (
        typeof review.text === "undefined" ||
        typeof review.user === "undefined" ||
        typeof review.date === "undefined" ||
        typeof review.target === "undefined"
    ) {
        res.status(400).end();
        return;
    }
    await collection.insertOne(review);
    res.status(200).end();
};

const get = async (
    req: NextApiRequest,
    res: NextApiResponse<Review[]>,
    collection: Collection
) => {
    const filter =
        typeof req.query.target === "undefined" ? {} : { target: req.query.target };

    const reviews = (await collection
        .find(filter)
        .limit(10)
        .toArray()) as unknown as Review[];

    res.json(reviews);
};

export default handler;
