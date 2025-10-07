
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { LanguageCode, Theme, Translations, FormDataShape, SparkType, AppContextType, WorkHistoryEntry, ReferenceEntry, SparkResult, SectionError } from './types';
import { mockTranslations } from './constants'; 
import { INITIAL_FORM_DATA, SECTIONS_CONFIG, DEFAULT_LANGUAGE, DEFAULT_THEME } from './constants';
import CareersPage from './components/careers/CareersPage'; 
import { TooltipProvider } from './components/ui/Tooltip'; 

// Helper to get translations
const getTranslatedText = (lang: LanguageCode, key: string, options?: Record<string, string | number>): Translations[string] => {
  const langTranslations = mockTranslations[lang] || mockTranslations[DEFAULT_LANGUAGE];
  const translationValue = langTranslations[key] || key;

  if (typeof translationValue === 'string' && options) {
    let text = translationValue;
    Object.keys(options).forEach(k => {
      // Ensure text is a string before calling replace.
      if (typeof text === 'string') {
        text = text.replace(`{${k}}`, String(options[k]));
      }
    });
    return text;
  }
  return translationValue;
};

const App: React.FC = () => {
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>(() => {
    return (localStorage.getItem('appLanguage') as LanguageCode) || DEFAULT_LANGUAGE;
  });
  const [theme, setThemeState] = useState<Theme>(() => {
    const storedTheme = localStorage.getItem('appTheme') as Theme;
    if (storedTheme) return storedTheme;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : DEFAULT_THEME;
  });
  const [formData, setFormData] = useState<FormDataShape>(INITIAL_FORM_DATA);
  const [currentSectionIndex, setCurrentSectionIndex] = useState<number>(0); // Initialize to 0 for the first actual form section. Hero/WhyWork will be handled by `showIntro`.
  const [applicationStatus, setApplicationStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [isLoadingSpark, setIsLoadingSpark] = useState<Record<SparkType, boolean>>({
    coverLetter: false,
    interviewPrep: false,
    strengths: false,
  });
  const [sparkResults, setSparkResults] = useState<Record<SparkType, SparkResult | null>>({
    coverLetter: null,
    interviewPrep: null,
    strengths: null,
  });
  const [formErrors, setFormErrors] = useState<SectionError>({});


  useEffect(() => {
    localStorage.setItem('appLanguage', currentLanguage);
  }, [currentLanguage]);

  useEffect(() => {
    localStorage.setItem('appTheme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.style.setProperty('--color-primary', '#3B82F6'); 
      document.documentElement.style.setProperty('--color-primary-hover', '#2563EB');
      document.documentElement.style.setProperty('--color-card', '#1F2937'); 
      document.documentElement.style.setProperty('--color-card-foreground', '#F3F4F6'); 
      document.documentElement.style.setProperty('--color-background', '#111827'); 
      document.documentElement.style.setProperty('--color-foreground', '#F9FAFB'); 
      document.documentElement.style.setProperty('--color-muted', '#374151'); 
      document.documentElement.style.setProperty('--color-muted-foreground', '#9CA3AF'); 
      document.documentElement.style.setProperty('--color-border', '#374151'); 
      document.documentElement.style.setProperty('--color-input', '#4B5563'); 
      document.documentElement.style.setProperty('--color-accent', '#374151'); 
      document.documentElement.style.setProperty('--color-accent-foreground', '#F9FAFB'); 


    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.style.setProperty('--color-primary', '#2563EB'); 
      document.documentElement.style.setProperty('--color-primary-hover', '#1D4ED8');
      document.documentElement.style.setProperty('--color-card', '#FFFFFF');
      document.documentElement.style.setProperty('--color-card-foreground', '#111827');
      document.documentElement.style.setProperty('--color-background', '#FFFFFF');
      document.documentElement.style.setProperty('--color-foreground', '#111827');
      document.documentElement.style.setProperty('--color-muted', '#F3F4F6');
      document.documentElement.style.setProperty('--color-muted-foreground', '#6B7280');
      document.documentElement.style.setProperty('--color-border', '#D1D5DB');
      document.documentElement.style.setProperty('--color-input', '#D1D5DB');
      document.documentElement.style.setProperty('--color-accent', '#F3F4F6');
      document.documentElement.style.setProperty('--color-accent-foreground', '#1F2937');
    }
  }, [theme]);

  const t = useCallback((key: string, options?: Record<string, string | number>): Translations[string] => {
    return getTranslatedText(currentLanguage, key, options);
  }, [currentLanguage]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  const handleChange = useCallback((section: keyof FormDataShape, field: string, value: any, subIndex?: number, subField?: string) => {
    setFormData(prev => {
      const newSectionData = { ...prev[section] };
      if (subIndex !== undefined && subField && Array.isArray(newSectionData[field as keyof typeof newSectionData])) {
        const arrayField = newSectionData[field as keyof typeof newSectionData] as any[];
        if (arrayField[subIndex]) {
          arrayField[subIndex] = { ...arrayField[subIndex], [subField]: value };
        }
      } else if (typeof newSectionData[field as keyof typeof newSectionData] === 'object' && !Array.isArray(newSectionData[field as keyof typeof newSectionData]) && newSectionData[field as keyof typeof newSectionData] !== null) {
         (newSectionData[field as keyof typeof newSectionData] as Record<string, any>)[subField as string] = value;
      }
      else {
        (newSectionData as Record<string, any>)[field] = value;
      }
      return { ...prev, [section]: newSectionData };
    });
  }, []);
  
  const handleMultiCheckboxChange = useCallback((section: keyof FormDataShape, field: string, option: string, checked: boolean) => {
    setFormData(prev => {
      const sectionData = prev[section] as any;
      const currentValues = { ...sectionData[field] } as Record<string, boolean>;
      currentValues[option] = checked;
      return {
        ...prev,
        [section]: {
          ...sectionData,
          [field]: currentValues,
        },
      };
    });
  }, []);

  const addWorkHistoryEntry = useCallback(() => {
    setFormData(prev => ({
      ...prev,
      workHistory: {
        ...prev.workHistory,
        entries: [...prev.workHistory.entries, { companyName: '', streetAddress: '', city: '', zipCode: '', fromDate: '', toDate: '', position: '', supervisor: '', reasonForLeaving: '', mayContact: '' }]
      }
    }));
  }, []);

  const removeWorkHistoryEntry = useCallback((index: number) => {
    setFormData(prev => ({
      ...prev,
      workHistory: {
        ...prev.workHistory,
        entries: prev.workHistory.entries.filter((_, i) => i !== index)
      }
    }));
  }, []);

  const addReferenceEntry = useCallback(() => {
    setFormData(prev => ({
      ...prev,
      references: {
        ...prev.references,
        entries: [...prev.references.entries, { name: '', relationship: '', phone: '' }]
      }
    }));
  }, []);

  const removeReferenceEntry = useCallback((index: number) => {
    setFormData(prev => ({
      ...prev,
      references: {
        ...prev.references,
        entries: prev.references.entries.filter((_, i) => i !== index)
      }
    }));
  }, []);
  
  const handleFileUpload = useCallback((field: 'driversLicense' | 'resume', file: File | null) => {
    setFormData(prev => ({
      ...prev,
      uploads: {
        ...prev.uploads,
        [field]: file,
      }
    }));
  }, []);


  const appContextValue: AppContextType = useMemo(() => ({
    currentLanguage,
    setCurrentLanguage,
    theme,
    setTheme,
    t,
    formData,
    setFormData,
    handleChange,
    handleMultiCheckboxChange,
    addWorkHistoryEntry,
    removeWorkHistoryEntry,
    addReferenceEntry,
    removeReferenceEntry,
    handleFileUpload,
    currentSectionIndex,
    setCurrentSectionIndex,
    SECTIONS_CONFIG,
    applicationStatus,
    setApplicationStatus,
    isLoadingSpark,
    setIsLoadingSpark,
    sparkResults,
    setSparkResults,
    formErrors,
    setFormErrors
  }), [
    currentLanguage, theme, t, formData, handleChange, handleMultiCheckboxChange,
    addWorkHistoryEntry, removeWorkHistoryEntry, addReferenceEntry, removeReferenceEntry, handleFileUpload,
    currentSectionIndex, applicationStatus, isLoadingSpark, sparkResults, formErrors, setCurrentLanguage, setFormErrors, setApplicationStatus, setIsLoadingSpark, setSparkResults, setThemeState, setFormData, setCurrentSectionIndex
  ]);

  return (
    <AppContext.Provider value={appContextValue}>
      <TooltipProvider>
        <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
          <CareersPage />
        </div>
      </TooltipProvider>
    </AppContext.Provider>
  );
};

export const AppContext = React.createContext<AppContextType | undefined>(undefined);

export default App;
