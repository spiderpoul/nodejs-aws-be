export const basicAuthorizer = async (event, context, callback) => {
    console.log("Event", JSON.stringify(event));

    if (event.type !== 'TOKEN') {
        callback("Unauthorized");
    }
    try {
        const authorizationToken = event.authorizationToken;
        const [,encodedCreds] = authorizationToken.split(" ");
        const buff = Buffer.from(encodedCreds, "base64");
        const plainCreds = buff.toString("utf-8").split(":");
        const [username, password] = plainCreds;

        console.log(`username ${username} and password ${password}`);

        const storedUserPassword = process.env[username];
        const effect =
            !storedUserPassword || storedUserPassword !== password
                ? "Deny"
                : "Allow";

        const policy = generatePolicy(encodedCreds, event.methodArn, effect);

        callback(null, policy);
    } catch (error) {
        console.log("Unauthorized", error);

        callback(`Unauthorized: ${error.message}`);
    }
};

const generatePolicy = (principalId, resource, effect = "Allow") => {
    return {
        principalId,
        policyDocument: {
            Version: "2012-10-17",
            Statement: [
                {
                    Action: "execute-api:Invoke",
                    Effect: effect,
                    Resource: resource,
                },
            ],
        },
    };
};
