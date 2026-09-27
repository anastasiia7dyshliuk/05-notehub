import axios from "axios";
import type { Note, NoteTag } from "../types/note";

const notehubApi = axios.create({
  baseURL: "https://notehub-public.goit.study/api",
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`,
  },
});

export interface FetchNotesParams {
  page: number;
  perPage: number;
  search?: string;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async (
  params: FetchNotesParams
): Promise<FetchNotesResponse> => {
  const { page, perPage, search } = params;

  const response = await notehubApi.get<FetchNotesResponse>("/notes", {
    params: {
      page,
      perPage,

      ...(search ? { search } : {}),
    },
  });

  return response.data;
};

export interface CreateNotePayload {
  title: string;
  content: string;
  tag: NoteTag;
}

export const createNote = async (
  payload: CreateNotePayload
): Promise<Note> => {
  const response = await notehubApi.post<Note>("/notes", payload);
  return response.data;
};

export const deleteNote = async (noteId: string): Promise<Note> => {
  const response = await notehubApi.delete<Note>(`/notes/${noteId}`);
  return response.data;
};