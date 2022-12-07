
import { api } from "boot/axios";
export class BookVo {
  public id: number | null = null;
  public author: string | null = null
  public synopsis: string | null = null
  public apiRequest() {
    const result = api.get("/api/Books");
    console.log(result);
    // const results = api.get("/api/Books",{params: {id:this.id}});
    // const resultCreate = api.post("/api/Books", {data: { firstName: 'Fred', lastName: 'Flintstone'}});
    // const resultUpdate = api.put("/api/Books/{id}");
    // const resultDelete = api.delete("/api/Books/{id}");
    // const resultAllDelete = api.delete("/api/Books/{id}");
  }
};

export class Book {
  public id: number | null = null;
  public createdAt: string | null = null;
  public updatedAt: string | null = null;
  public author: string | null = null
  public synopsis: string | null = null
}

