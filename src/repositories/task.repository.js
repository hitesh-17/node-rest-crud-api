import { AppError } from "../utils/AppError.js";

const tasks = new Map();

let nextId = 1;

function seed() {
  const samples = [
    {
      title: "Learn Express",
      description: "Routes and middleware",
      status: "in_progress",
    },
    { title: "Write README", description: "Six-part standard", status: "todo" },
    { title: "a Set up CI", description: "GitHub Actions", status: "todo" },
  ];

  for (const s of samples) {
    const now = new Date().toISOString();
    const id = nextId++;
    tasks.set(id, { id, ...s, createdAt: now, updatedAt: now });
  }
}
seed();

export const taskRepository = {
  findAll() {
    return [...tasks.values()];
  },
  findByID(id) {
    return tasks.get(id) ?? null;
  },
  create(data) {
    const now = new Date().toISOString();
    const newTasks = { id: nextId++, ...data, createdAt: now, updatedAt: now };
    tasks.set(newTasks.id, newTasks);
    return newTasks;
  },
  replace(id, data) {
    const existing = tasks.get(id);
    if (!existing) return null;
    const updated = {
      id,
      ...data,
      createdAt: existing.createdAt,
      updatedAt: new Date().toISOString(),
    };
    tasks.set(id, updated);
    return updated;
  },
  update(id, data) {
    const existing = tasks.get(id);
    if (!existing) return null;
    const updated = {
      ...existing,
      ...data,
      updatedAt: new Date().toISOString(),
    };
    tasks.set(id, updated);
    return updated;
  },
};
