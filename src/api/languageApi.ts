import axios from 'axios';
import { Language } from '../models/Language';

const API_URL = 'http://localhost:3000/languages'; // Adjust this to your Nest.js backend URL

export const fetchLanguages = async (): Promise<Language[]> => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const createLanguage = async (language: Language): Promise<Language> => {
    const response = await axios.post(API_URL, language);
    return response.data;
};

export const updateLanguage = async (language: Language): Promise<Language> => {
    const response = await axios.put(`${API_URL}/${language.id}`, language);
    return response.data;
};

export const deleteLanguage = async (id: number): Promise<void> => {
    await axios.delete(`${API_URL}/${id}`);
};