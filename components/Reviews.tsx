import React, { useState, useEffect } from "react";
import { Review, ReviewTarget } from "@/api/reviews";

const Reviews: React.FC<{ target: ReviewTarget }> = (props) => {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [showReviews, setShowReviews] = useState(false);
    const [errorText, setErrorText] = useState("");

    const getReviews = async () => {
        const data: Review[] = await (
            await fetch(`/api/reviews?target=${props.target}`)
        ).json();
        data.forEach((review) => (review.date = new Date(review.date)));
        data.sort((a, b) => b.date.getTime() - a.date.getTime());
        setReviews(data);
    };

    const addReview = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        const target = e.target as typeof e.target & {
            text: { value: string };
            user: { value: string };
        };
        if (target.text.value.length == 0) {
            setErrorText("текст отзыва не может быть пустым");
            return;
        }
        if (target.user.value.length == 0) {
            setErrorText("имя пользователя не может быть пустым");
            return;
        }
        const review: Review = {
            text: target.text.value,
            user: target.user.value,
            target: props.target,
            date: new Date(),
        };
        await fetch("/api/reviews", {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(review),
        })
            .then(() => {
                target.text.value = "";
                target.user.value = "";
                setErrorText("");
                getReviews();
            })
            .catch(() => {
                setErrorText("не удалось добавить отзыв");
            });
    };

    useEffect(() => {
        getReviews();
    });

    return (
        <>
            <button
                className="text-center bg-white w-full p-2 my-4 rounded border border-slate-50 hover:border-red-500"
                onClick={() => setShowReviews(!showReviews)}
            >
                показать отзывы
            </button>
            {showReviews && (
                <>
                    <form
                        className="w-full grid  grid-rows-2 grid-cols-2 gap-2"
                        onSubmit={addReview}
                    >
                        <textarea
                            name="text"
                            className="row-span-2 col-span-1 bg-white p-2 rounded border border-slate-50 hover:border-red-500"
                            placeholder="Введите текст отзыва"
                        />
                        <input
                            name="user"
                            className="bg-white p-2 rounded border border-slate-50 hover:border-red-500"
                            placeholder="Введите имя"
                        />
                        <input
                            type="submit"
                            className="bg-white p-2 rounded border border-slate-50 hover:border-red-500"
                            value="оставить отзыв"
                        ></input>
                    </form>
                    {errorText.length > 0 && <b className="text-red-500">{errorText}</b>}
                    <ul className="mt-4">
                        {reviews.map((review, index) => {
                            return (
                                <li className="bg-white mb-2 p-2 rounded" key={index}>
                                    <b className="flex justify-between mb-2">
                                        <span> {review.user}</span>
                                        <span>{review.date.toLocaleDateString("ru-RU")}</span>
                                    </b>
                                    <p>{review.text}</p>
                                </li>
                            );
                        })}
                    </ul>
                </>
            )}
        </>
    );
};

export default Reviews;
