fetch("/api/test", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "XSRF-TOKEN": `Vdw4jq4X-2HcuZRkVi3MAfrMmCalwKlipgTM`,
  },
  body: JSON.stringify({ hello: "world" }),
})
  .then((res) => res.json())
  .then((data) => console.log(data));

//

fetch("/api/session", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "XSRF-TOKEN": `X4oD9Pql-o_9ii8eyIE-V6YHq2iZwYkAXxaE`,
  },
  body: JSON.stringify({ credential: "Demo-lition", password: "password" }),
})
  .then((res) => res.json())
  .then((data) => console.log(data));

//

fetch("/api/session", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "XSRF-TOKEN": `oNpM9xCO-tuTGnJhCGWvA6NvRQoeyOlGzq0Y`,
  },
  body: JSON.stringify({ credential: "demo@user.io", password: "password" }),
})
  .then((res) => res.json())
  .then((data) => console.log(data));

//

fetch("/api/session", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "XSRF-TOKEN": `oNpM9xCO-tuTGnJhCGWvA6NvRQoeyOlGzq0Y`,
  },
  body: JSON.stringify({ credential: "Demo-lition", password: "Hello World!" }),
})
  .then((res) => res.json())
  .then((data) => console.log(data));

//

fetch("/api/session", {
  method: "DELETE",
  headers: {
    "Content-Type": "application/json",
    "XSRF-TOKEN": `X4oD9Pql-o_9ii8eyIE-V6YHq2iZwYkAXxaE`,
  },
})
  .then((res) => res.json())
  .then((data) => console.log(data));

//

fetch("/api/users", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "XSRF-TOKEN": `YSiiEmjf-T452sQTgVf0iwsK3_0XE9AMl4Ws`,
  },
  body: JSON.stringify({
    email: "spidey@spider.man",
    username: "Spidey",
    password: "password",
  }),
})
  .then((res) => res.json())
  .then((data) => console.log(data));

//

fetch("/api/users", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "XSRF-TOKEN": `YSiiEmjf-T452sQTgVf0iwsK3_0XE9AMl4Ws`,
  },
  body: JSON.stringify({
    email: "spidey@spider.man",
    username: "Spidey",
    password: "password",
  }),
})
  .then((res) => res.json())
  .then((data) => console.log(data));

//

fetch("/api/session", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "XSRF-TOKEN": `TR6s4gpU-Xo9N1QR1ak9_dL-S7XX9vDsiHqU`,
  },
  body: JSON.stringify({ credential: "", password: "password" }),
})
  .then((res) => res.json())
  .then((data) => console.log(data));

//

fetch("/api/session", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "XSRF-TOKEN": `TR6s4gpU-Xo9N1QR1ak9_dL-S7XX9vDsiHqU`,
  },
  body: JSON.stringify({ credential: "Demo-lition", password: "" }),
})
  .then((res) => res.json())
  .then((data) => console.log(data));

//

fetch("/api/users", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "XSRF-TOKEN": `c2i583FV-1DMzZWkhdnZn5yuypkQvQn6s_P0`,
  },
  body: JSON.stringify({
    email: "",
    username: "turd",
    password: "password",
  }),
})
  .then((res) => res.json())
  .then((data) => console.log(data));
