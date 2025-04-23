export const LanguageEnum = {
    ENG: 'eng',
    ID: 'id',
} as const;
  
export type LanguageType = (typeof LanguageEnum)[keyof typeof LanguageEnum];