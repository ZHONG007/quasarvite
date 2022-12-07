import { VectorEffectProperty } from "csstype";

export class VideoInput {
  public id: number | null = null;
  public name: string = "";
  public description: string = "";
  public coverUrl: string = "";

  public result: Video[] = [];
  public async apiRequest(): Promise<Video[]> {
    const response = await fetch(
      "http://localhost:8080/api/videos"
    );
    const data = await response.json();
    return data.code;
  }
}

export class Video {
  public id: number | null = null;
  public name: string = "";
  public description: string = "";
  public coverUrl: string = "";
}


