export type Class = {
  class_id: number;
  created_at: Date;
  name: string;
  description: string;
  files: File[];
};

export type Message = {
  role: "user" | "assistant";
  content: string;
};

export type File = {
  file_id: string;
  name: string;
};

export type ClassResponse = {
  classes: Class[];
};

export type MessageResponse = {
  error: string;
  message: Message;
};
