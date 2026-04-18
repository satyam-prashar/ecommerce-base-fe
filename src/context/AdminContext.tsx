import React, { createContext, useContext, useState, useCallback } from 'react';
import type { Section, Subsection, GoldPrice, PromoCode } from '../types';
import { mockSections, mockGoldPrice, mockPromoCodes } from '../mock-data';

interface AdminContextType {
  // Gold price management
  goldPrice: GoldPrice;
  updateGoldPrice: (pricePerGram: number) => void;
  
  // Section management
  sections: Section[];
  addSection: (section: Section) => void;
  updateSection: (sectionId: string, section: Partial<Section>) => void;
  deleteSection: (sectionId: string) => void;
  
  // Subsection management
  addSubsection: (sectionId: string, subsection: Subsection) => void;
  updateSubsection: (sectionId: string, subsectionId: string, subsection: Partial<Subsection>) => void;
  deleteSubsection: (sectionId: string, subsectionId: string) => void;
  
  // Promo code management
  promoCodes: PromoCode[];
  addPromoCode: (promoCode: PromoCode) => void;
  updatePromoCode: (promoCodeId: string, promoCode: Partial<PromoCode>) => void;
  deletePromoCode: (promoCodeId: string) => void;
  validatePromoCode: (code: string) => PromoCode | null;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [goldPrice, setGoldPrice] = useState<GoldPrice>(mockGoldPrice);
  const [sections, setSections] = useState<Section[]>(mockSections);
  const [promoCodes, setPromoCodes] = useState<PromoCode[]>(mockPromoCodes);

  const updateGoldPrice = useCallback((pricePerGram: number) => {
    setGoldPrice((prev) => ({
      ...prev,
      pricePerGram,
      lastUpdated: new Date(),
      updatedBy: 'admin', // In real app, would be current user ID
    }));
  }, []);

  const addSection = useCallback((section: Section) => {
    setSections((prev) => [...prev, section]);
  }, []);

  const updateSection = useCallback((sectionId: string, updates: Partial<Section>) => {
    setSections((prev) =>
      prev.map((section) =>
        section.id === sectionId ? { ...section, ...updates } : section
      )
    );
  }, []);

  const deleteSection = useCallback((sectionId: string) => {
    setSections((prev) => prev.filter((section) => section.id !== sectionId));
  }, []);

  const addSubsection = useCallback((sectionId: string, subsection: Subsection) => {
    setSections((prev) =>
      prev.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              subsections: [...section.subsections, subsection],
            }
          : section
      )
    );
  }, []);

  const updateSubsection = useCallback(
    (sectionId: string, subsectionId: string, updates: Partial<Subsection>) => {
      setSections((prev) =>
        prev.map((section) =>
          section.id === sectionId
            ? {
                ...section,
                subsections: section.subsections.map((sub) =>
                  sub.id === subsectionId ? { ...sub, ...updates } : sub
                ),
              }
            : section
        )
      );
    },
    []
  );

  const deleteSubsection = useCallback((sectionId: string, subsectionId: string) => {
    setSections((prev) =>
      prev.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              subsections: section.subsections.filter(
                (sub) => sub.id !== subsectionId
              ),
            }
          : section
      )
    );
  }, []);

  const addPromoCode = useCallback((promoCode: PromoCode) => {
    setPromoCodes((prev) => [...prev, promoCode]);
  }, []);

  const updatePromoCode = useCallback((promoCodeId: string, updates: Partial<PromoCode>) => {
    setPromoCodes((prev) =>
      prev.map((code) =>
        code.id === promoCodeId ? { ...code, ...updates } : code
      )
    );
  }, []);

  const deletePromoCode = useCallback((promoCodeId: string) => {
    setPromoCodes((prev) => prev.filter((code) => code.id !== promoCodeId));
  }, []);

  const validatePromoCode = useCallback(
    (code: string) => {
      const promoCode = promoCodes.find(
        (p) =>
          p.code.toUpperCase() === code.toUpperCase() &&
          p.isActive &&
          (!p.expiryDate || new Date(p.expiryDate) > new Date()) &&
          (!p.maxUsage || p.usedCount < p.maxUsage)
      );
      return promoCode || null;
    },
    [promoCodes]
  );

  return (
    <AdminContext.Provider
      value={{
        goldPrice,
        updateGoldPrice,
        sections,
        addSection,
        updateSection,
        deleteSection,
        addSubsection,
        updateSubsection,
        deleteSubsection,
        promoCodes,
        addPromoCode,
        updatePromoCode,
        deletePromoCode,
        validatePromoCode,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within AdminProvider');
  }
  return context;
};
