import db from "./lib/db.js";

db.prepare("DELETE FROM students").run();

const students = [
  { code: "1001", name: "Ali", password: "1111", average: 18.5, rank: 1, math: 19, physics: 18, literature: 18 },
  { code: "1002", name: "Sara", password: "2222", average: 17.8, rank: 2, math: 18, physics: 17, literature: 18 },
  { code: "1003", name: "Reza", password: "3333", average: 16.2, rank: 3, math: 16, physics: 17, literature: 15 },
  { code: "1004", name: "Nima", password: "4444", average: 15.9, rank: 4, math: 15, physics: 16, literature: 16 },
  { code: "1005", name: "Mina", password: "5555", average: 19.1, rank: 1, math: 20, physics: 19, literature: 18 }
];

const stmt = db.prepare(`
INSERT INTO students (code, name, password, average, rank, math, physics, literature)
VALUES (?, ?, ?, ?, ?, ?, ?, ?)
`);

for (const s of students) {
  stmt.run(s.code, s.name, s.password, s.average, s.rank, s.math, s.physics, s.literature);
}

console.log("Students inserted");
