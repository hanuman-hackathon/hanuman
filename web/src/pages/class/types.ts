export type Class = {
  class_id: string;
  created_at: Date;
  name: string;
  description: string;
  files: string[];
};

export type Message = {
  role: "user" | "assistant";
  content: string;
};
