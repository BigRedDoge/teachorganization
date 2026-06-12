import { SESv2Client, SendEmailCommand } from "@aws-sdk/client-sesv2";


const ses = new SESv2Client({});

export const handler = async (event) => {
    if (event.requestContext.http.method !== "POST")
        return { statusCode: 405, body: "Method not allowed" };

    let data;
    try { data = JSON.parse(event.body); } 
    catch { return resp(400, "Invalid JSON"); }

    const { name = "", email = "", message = "", website = "" } = data;

    if (website) return resp(200, "ok");                    // honeypot: pretend success
    if (!name.trim() || !message.trim()) return resp(400, "Missing fields");
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return resp(400, "Invalid email");
    if (name.length > 200 || email.length > 200 || message.length > 5000)
        return resp(400, "Too long");

    await ses.send(new SendEmailCommand({
        FromEmailAddress: "noreply@teachorganization.com",
        Destination: { ToAddresses: [process.env.RECIPIENT] },
        ReplyToAddresses: [email],
        Content: { Simple: {
        Subject: { Data: `Website inquiry from ${name}` },
        Body: { Text: { Data: `Name: ${name}\nEmail: ${email}\n\n${message}` } },
        }},
    }));
    return resp(200, "ok");
};

const resp = (statusCode, msg) => ({
    statusCode,
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ message: msg }),
});