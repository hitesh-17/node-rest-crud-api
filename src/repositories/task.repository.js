import {randomUUID} from "node:crypto";

const task = new Map();

function seed() {
    const samples = [
    { title: "Learn Express", description: "Routes and middleware", status: "in_progress" },
    { title: "Write README", description: "Six-part standard", status: "todo" },
    { title: "Set up CI", description: "GitHub Actions", status: "todo" },
  ];

  for (const s of samples){
    const now = new Date().toISOString();
    const id = randomUUID();
    task.set(id,{id,...s,createdAt:now,updatedAt:now})
  }
}

seed();

export const taskRepository = {
    findall(){
        return [...task.values()];
    },
    findByID(id){
        return task.get(id) ?? null;
    }
}