import Insight from "../model/insights.model.js";

export const getAllData = async (req, res) => {
    try {
        const insights = await Insight.find({});

        res.status(200).json({ insights });

    } catch (error) {
        console.error("Error in fetching data:", error);
        res.status(500).json({ message: "Error in fetching data" });
    }
};
