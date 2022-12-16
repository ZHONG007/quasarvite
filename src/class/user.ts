import { api } from "src/boot/axios";

export class User {
    public id: number | null = null;
    public username: string | null = '';
    public email: string | null = '';
    public password: string | null = '';
    public created_at: string | null = null;
    public updated_at: string | null = null;
    public async apiRequest() {
        // api.get("/users");
        // api.get("/users/" + '{' + this.id?.toString() + '}');
        // api.post("/users", this);
        // api.put("/users/" + '{' + this.id?.toString() + '}');
        api.delete("/users/" + '{' + this.id?.toString() + '}')
    }
    public async register() {
        return await api.post("users/register", {
            username: this.username,
            password: this.password,
        });
    }

    public async login() {
        return await api.post("users/login", {
            username: this.username,
            password: this.password,
        });
    }


}

export class VideoTag {
    id: number | null = null;
    content: string | null = '';
    createdAt: string | null = null;
    updatedAt: string | null = null;

    public async create() {
        return await api.post("videotags", {
            content: this.content
        });
    }

    public static async getAllVideoTags() {
        return await api.get("videotags");
    }

    public static async getVideoTagById(id: number) {
        return await api.get("videotags/" + id);
    }

    public static async deleteAll() {
        return await api.delete("video-tags");
    }
}

export class Video {
    id: number | null = null;
    title: string | null = '';
    description: string | null = '';
    coverUrl: string | null = '';
    videoTags: VideoTag[] = [];
    createdAt: string | null = null;
    updatedAt: string | null = null;

    public async create() {
        return await api.post("videos", {
            title: this.title,
            description: this.description,
            coverUrl: this.coverUrl,
            videoTags: this.videoTags
        });
    }

    public static async getAllVideos() {
        return await api.get("videos");
    }

    public static async getVideoById(id: number) {
        return await api.get("videos/" + id);
    }

    public static async updateVideobyId(id: number) {
      //  console.log(id);
        return await api.post("videosupdate", { id: id.toString() });
    }

    public static async deleteAll() {
        return await api.delete("videos");
    }
}



