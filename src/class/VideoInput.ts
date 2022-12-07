
import { api } from "boot/axios";
export class MainVo { public id: number | null = null;
  public email: string|null = null
  public apiRequest() { const result = api.get("/api/Mains");
  const results = api.get("/api/Mains",{params: {id:this.id}});
  const resultCreate = api.post("/api/Mains", {data: { firstName: 'Fred', lastName: 'Flintstone'}});
  const resultUpdate = api.put("/api/Mains/{id}");
  const resultDelete = api.delete("/api/Mains/{id}");
  const resultAllDelete = api.delete("/api/Mains/{id}");
  }};

  export class Main { public id: number | null = null;
  public createdAt: string|null = null;
  public updatedAt: string|null = null;
  public email: string|null = null
  }


