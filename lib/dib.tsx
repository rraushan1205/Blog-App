import { createClient } from "redis";

const client = createClient({
  password: "4LEeqmZfS0jclVoLFYq90JFYYqkPEsb9",
  socket: {
    host: "redis-12505.c257.us-east-1-3.ec2.redns.redis-cloud.com",
    port: 12505,
  },
});
client.on("error", (err) => console.log(err));

if (!client.isOpen) {
  client.connect();
}

export { client };
