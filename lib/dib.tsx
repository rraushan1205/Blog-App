import { createClient } from "redis";

const client = createClient({
  password: "9rYeKu0eH4kBXqRZMU6K37LXl1WOsOX3",
  socket: {
    host: "redis-16287.c270.us-east-1-3.ec2.redns.redis-cloud.com",
    port: 16287,
  },
});
client.on("error", (err) => console.log(err));

if (!client.isOpen) {
  client.connect();
}

export { client };
