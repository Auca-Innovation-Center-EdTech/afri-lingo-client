import React, { useState, useEffect } from 'react';
import { Language } from '../models/Language';
import { fetchLanguages, createLanguage, updateLanguage, deleteLanguage } from '@/src/api/languageApi';

const LanguageManager: React.FC = () => {
    const [languages, setLanguages] = useState<Language[]>([]);
    const [newLanguage, setNewLanguage] = useState<Partial<Language>>({});

    useEffect(() => {
        loadLanguages();
    }, []);

    const loadLanguages = async () => {
        const fetchedLanguages = await fetchLanguages();
        setLanguages(fetchedLanguages);
    };

    const handleCreateLanguage = async () => {
        await createLanguage(newLanguage as Language);
        setNewLanguage({});
        loadLanguages();
    };

    const handleUpdateLanguage = async (language: Language) => {
        await updateLanguage(language);
        loadLanguages();
    };

    const handleDeleteLanguage = async (id: number) => {
        await deleteLanguage(id);
        loadLanguages();
    };

    return (
        <div>
            <h2>Language Manager</h2>
            <div>
                <input
                    type="text"
                    placeholder="Name"
                    value={newLanguage.name || ''}
                    onChange={(e) => setNewLanguage({ ...newLanguage, name: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Code"
                    value={newLanguage.code || ''}
                    onChange={(e) => setNewLanguage({ ...newLanguage, code: e.target.value })}
                />
                <select
                    value={newLanguage.level || ''}
                    onChange={(e) => setNewLanguage({ ...newLanguage, level: e.target.value as Language['level'] })}
                >
                    <option value="">Select Level</option>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                </select>
                <button onClick={handleCreateLanguage}>Add Language</button>
            </div>
            <ul>
                {languages.map((language) => (
                    <li key={language.id}>
                        {language.name} ({language.code}) - {language.level}
                        <button onClick={() => handleUpdateLanguage({ ...language, name: language.name + ' (Updated)' })}>
                            Update
                        </button>
                        <button onClick={() => handleDeleteLanguage(language.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default LanguageManager;