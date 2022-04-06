const http = require("http");
const server = http.createServer();
const PORT = 3000;

const friends = [
  { id: 0, name: "Taimoor" },
  { id: 1, name: "Talha" },
  { id: 2, name: "Junaid" },
];

server.on("request", (req, res) => {
  const items = req.url.split("/");
  if (req.method === "POST" && items[1] === "user") {
    res.on("data", (data) => {
      const friend = data.toString();
      console.log("Request", friend);
      friends.push(JSON.parse(friend));
    });
  } else if (req.method === "GET" && items[1] === "user") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    if (items.length === 3) {
      const index = Number(items[2]);
      res.end(JSON.stringify(friends[index]));
    } else {
      res.end(JSON.stringify(friends));
    }
  } else if (items[1] === "checkhtml") {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<body>");
    res.write("<h1>Helllooo</h1>");
    res.write("</body>");
    res.write("</>");
    res.end();
  } else {
    res.statusCode = 404;
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<body>");
    res.write("<h1>Page Not Found</h1>");
    res.write("</body>");
    res.write("</>");
    res.end();
  }
});

server.listen(PORT, () => {
  console.log(`listen on port ${PORT}`);
});
