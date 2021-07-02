import express from "express";
import { config } from "dotenv";
import axios from "axios";

config();

const app = express();

app.use(express.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

const PORT = process.env.PORT || 3001;

app.all("/*", (req, res) => {
    try {
        const { originalUrl, method, body } = req;
        const recipient = originalUrl.split("/")[1];

        const recipientURL = process.env[recipient];
        console.log("recipientURL", recipientURL);

        if (recipientURL) {
            const axiosConfig = {
                method,
                url: `${recipientURL}${originalUrl}`,
                ...(Object.keys(body || {}).length > 0 && { data: body }),
            };            

            axios(axiosConfig)
                .then((response) => {
                    console.log("response from recipient", response.data);

                    res.json(response.data);
                })
                .catch((error) => {
                    console.log("some error: ", JSON.stringify(error));

                    if (error.response) {
                        const { status, data } = error.response;
                        res.status(status).json(data);
                    } else {
                        res.status(500).json({ error: error.message });
                    }
                });
        } else {
            res.status(502).json({ error: "Cannot process request" });
        }
    } catch (error) {
        console.error(error);
    }
});

app.listen(PORT, () => {
    console.log(`app is running on port ${PORT}`);
});
