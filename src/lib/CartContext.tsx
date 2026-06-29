"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface KorpaStavka {
  id: string;
  slug: string;
  naziv: string;
  cijena: number;
  slika: string;
  kolicina: number;
  tezina?: string;
}

interface KorpaContext {
  stavke: KorpaStavka[];
  dodaj: (stavka: Omit<KorpaStavka, "kolicina">) => void;
  ukloni: (id: string) => void;
  promijeniKolicinu: (id: string, kolicina: number) => void;
  ocisti: () => void;
  ukupno: number;
  brojStavki: number;
  korpaOtvorena: boolean;
  setKorpaOtvorena: (v: boolean) => void;
}

const Korpa = createContext<KorpaContext | null>(null);

export function KorpaProvider({ children }: { children: ReactNode }) {
  const [stavke, setStavke] = useState<KorpaStavka[]>([]);
  const [korpaOtvorena, setKorpaOtvorena] = useState(false);

  useEffect(() => {
    try {
      const sacuvano = localStorage.getItem("korpa");
      if (sacuvano) setStavke(JSON.parse(sacuvano));
    } catch {}
  }, []);

  useEffect(() => {
    localStorage.setItem("korpa", JSON.stringify(stavke));
  }, [stavke]);

  const dodaj = (stavka: Omit<KorpaStavka, "kolicina">) => {
    setStavke((prev) => {
      const postoji = prev.find((s) => s.id === stavka.id);
      if (postoji) {
        return prev.map((s) => s.id === stavka.id ? { ...s, kolicina: s.kolicina + 1 } : s);
      }
      return [...prev, { ...stavka, kolicina: 1 }];
    });
    setKorpaOtvorena(true);
  };

  const ukloni = (id: string) => setStavke((prev) => prev.filter((s) => s.id !== id));

  const promijeniKolicinu = (id: string, kolicina: number) => {
    if (kolicina < 1) return ukloni(id);
    setStavke((prev) => prev.map((s) => s.id === id ? { ...s, kolicina } : s));
  };

  const ocisti = () => setStavke([]);

  const ukupno = stavke.reduce((s, i) => s + i.cijena * i.kolicina, 0);
  const brojStavki = stavke.reduce((s, i) => s + i.kolicina, 0);

  return (
    <Korpa.Provider value={{ stavke, dodaj, ukloni, promijeniKolicinu, ocisti, ukupno, brojStavki, korpaOtvorena, setKorpaOtvorena }}>
      {children}
    </Korpa.Provider>
  );
}

export function useKorpa() {
  const ctx = useContext(Korpa);
  if (!ctx) throw new Error("useKorpa mora biti unutar KorpaProvider");
  return ctx;
}
