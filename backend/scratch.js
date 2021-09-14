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

  let date1 = new Date();
  let date2 = new Date();
  let date3 = new Date();
  let date4 = new Date();
  let date5 = new Date();
  let date6 = new Date();

  date2.setTime(date1.getTime() + 10080 * 60 * 1000);
  date3.setTime(date1.getTime() + 20160 * 60 * 1000);
  date4.setTime(date1.getTime() + 30240 * 60 * 1000);
  date5.setTime(date1.getTime() + 40320 * 60 * 1000);
  date6.setTime(date1.getTime() + 50400 * 60 * 1000);

  fetch("/api/bookings/new", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "XSRF-TOKEN": `OlMeWFyh-U7aMMF1RS746rmyWs7L_2rxih3c`,
    },
    body: JSON.stringify({
      userId: 1,
      spotId: 2,
      startDate: date1,
      endDate: date6
    }),
  })
    .then((res) => res.json())
    .then((data) => console.log(data));
