
import { api } from "boot/axios";
export class BookVo {
  public id: number | null = null;
  public email: string | null = null
  public async apiRequest(method: string) {
    const requestType = ['getAll', 'getById', 'create', 'update', 'deleteById']; switch (method) {
      case requestType[0]: return await api.get("/books");
      case requestType[1]:
        return await api.get("/books/" + '{' + this.id?.toString() + '}');
      case requestType[2]:
        return await api.post("/books", this);
      case requestType[3]:
        return await api.put("/books/" + '{' + this.id?.toString() + '}', this);
      case requestType[4]:
        return await api.delete("/books/" + '{' + this.id?.toString() + '}');
      default:
        return await api.get("/books");
    }
  }
};

export class Book {
  public id: number | null = null;
  public createdAt: string | null = null;
  public updatedAt: string | null = null;
  public email: string | null = null
}
