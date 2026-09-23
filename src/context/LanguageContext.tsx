"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type Language = "EN" | "ES" | "FR";

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  toggleLang: () => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  EN: {
    // Navigation
    nav_home: "Home",
    nav_about: "About",
    nav_articles: "Articles",
    nav_features: "Features",
    nav_podcasts: "Podcasts",
    nav_survivors: "Survivors",
    btn_read_articles: "Read Articles",
    btn_view_podcasts: "View podcasts",

    // Hero
    hero_headline_1: "Know the Why.",
    hero_headline_cancer: "Find the Gaps.",
    hero_headline_2: "Change the System.",
    hero_headline_everyone: "",
    hero_headline_3: "",
    hero_desc: "From rural cancer care and veterinary oncology to cancer literacy for better detection and outcomes, we turn knowledge into action.",

    // Articles Section
    art_title_1: "Article",
    art_title_2: "Gallery",
    art_subtitle: "Here's the latest collection of articles we offer, tailored to be understandable by everyone, made with love and care by our Writing Team.",
    art_cat_all: "All",
    art_cat_medical: "Medical Insights",
    art_cat_survivor: "Survivor Stories",
    art_cat_caregiver: "Caregiver Guide",
    art_cat_wellness: "Wellness & Recovery",
    btn_explore_articles: "Explore All Articles",

    // Features Section
    feat_title: "features",
    feat_subtitle: "Compassionate resources, clinical pathways, and real patient networks built to support you at every milestone of your journey.",
    feat_1_badge: "TCF TRUSTED CARE",
    feat_1_title: "Compassionate Support",
    feat_1_desc: "Connect directly with verified clinical experts and oncology networks specializing in carcinoid care.",
    feat_2_badge: "TCF TREATMENT NAV",
    feat_2_title: "Diagnosis Guidance",
    feat_2_desc: "A step-by-step, interactive navigator designed to demystify the critical first 30 days after your diagnosis.",
    feat_3_badge: "TCF CONNECTION",
    feat_3_title: "Community Spaces",
    feat_3_desc: "Join safe, moderated peer discussion groups to share experiences with patients and caregivers who understand.",
    feat_4_badge: "TCF VOICES",
    feat_4_title: "Survivor Stories",
    feat_4_desc: "Explore a curated collection of deep-dive interviews detailing real paths through survivorship and recovery.",

    // Podcast Section
    pod_title: "Podcast",
    pod_subtitle: "Compassionate conversations on cancer support, patient stories, caregiving, survivorship, and practical guidance.",
    pod_ep1_title: "Ft. Dr. Jyotirup Goswami",
    pod_ep1_desc: "Insights into Radiation Oncology & Advanced Tumor Therapeutics with Dr. Jyotirup Goswami.",
    pod_ep2_title: "Ft. Dr. Soirindhri Banerjee",
    pod_ep2_desc: "Clinical Care & Patient Advocacy Pathways with Dr. Soirindhri Banerjee.",
    pod_ep3_title: "Ft. Amelia Corl",
    pod_ep3_desc: "Youth Cancer Leadership & Community Empowerment with Amelia Corl.",

    // Footer
    foot_brand: "THE CARCINO FOUNDATION",
    foot_contact: "CONTACT",
    foot_tribute: "Our Tribute",
    foot_rights: "All Rights Reserved. © 2026 The Carcino Foundation.",
    foot_privacy: "Privacy Policy",
    foot_terms: "Terms of Service",

    // Articles Gallery Page
    gal_search_placeholder: "Search articles...",
    gal_search_btn: "Search",
    gal_sub_title: "Clinical clarity delivered to your inbox",
    gal_sub_desc: "Stay connected with verified clinical insights, caregiver support strategies, and inspiring survivor stories.",
    gal_sub_btn: "Subscribe",

    // Vision / Mission Section
    vis_our: "Our",
    vis_vision: "Mission",
    vis_desc: "Empowering every patient, caregiver, and clinical ally with compassionate resources and clear pathways to demystify carcinoid care and inspire hope.",
  },
  ES: {
    // Navigation
    nav_home: "Inicio",
    nav_about: "Nosotros",
    nav_articles: "Artículos",
    nav_features: "Funcionalidades",
    nav_podcasts: "Podcasts",
    nav_survivors: "Supervivientes",
    btn_read_articles: "Leer Artículos",
    btn_view_podcasts: "Ver podcasts",

    // Hero
    hero_headline_1: "Comprendiendo el",
    hero_headline_cancer: "Cáncer",
    hero_headline_2: "para",
    hero_headline_everyone: "Todos",
    hero_headline_3: "con orgullo.",
    hero_desc: "Desde la atención del cáncer en zonas rurales y la oncología veterinaria hasta la alfabetización sobre el cáncer para una mejor detección y resultados, transformamos el conocimiento en acción.",

    // Articles Section
    art_title_1: "Galería de",
    art_title_2: "Artículos",
    art_subtitle: "Aquí está la colección más reciente de artículos que ofrecemos, adaptados para ser comprensibles para todos, hechos con amor por nuestro Equipo de Redacción.",
    art_cat_all: "Todos",
    art_cat_medical: "Perspectivas Médicas",
    art_cat_survivor: "Historias de Supervivientes",
    art_cat_caregiver: "Guía del Cuidador",
    art_cat_wellness: "Bienestar y Recuperación",
    btn_explore_articles: "Explorar Todos los Artículos",

    // Features Section
    feat_title: "características",
    feat_subtitle: "Recursos compasivos, vías clínicas y redes de pacientes reales construidos para apoyarte en cada hito de tu camino.",
    feat_1_badge: "ATENCIÓN DE CONFIANZA TCF",
    feat_1_title: "Apoyo Compasivo",
    feat_1_desc: "Conéctate directamente con expertos clínicos verificados y redes de oncología especializadas en atención carcinoide.",
    feat_2_badge: "NAVEGADOR DE TRATAMIENTO TCF",
    feat_2_title: "Guía de Diagnóstico",
    feat_2_desc: "Un navegador interactivo paso a paso diseñado para desmitificar los primeros 30 días críticos tras tu diagnóstico.",
    feat_3_badge: "CONEXIÓN TCF",
    feat_3_title: "Espacios Comunitarios",
    feat_3_desc: "Únete a grupos de discusión moderados y seguros para compartir experiencias con pacientes y cuidadores que comprenden.",
    feat_4_badge: "VOCES TCF",
    feat_4_title: "Historias de Supervivientes",
    feat_4_desc: "Explora una colección seleccionada de entrevistas detalladas sobre rutas reales de supervivencia y recuperación.",

    // Podcast Section
    pod_title: "Podcast",
    pod_subtitle: "Conversaciones compasivas sobre apoyo al cáncer, historias de pacientes, cuidado, supervivencia y orientación práctica.",
    pod_ep1_title: "Ft. Dr. Jyotirup Goswami",
    pod_ep1_desc: "Perspectivas sobre Oncología Radioterápica y Terapéutica Tumoral Avanzada con el Dr. Jyotirup Goswami.",
    pod_ep2_title: "Ft. Dr. Soirindhri Banerjee",
    pod_ep2_desc: "Atención Clínica y Vías de Defensoría del Paciente con la Dra. Soirindhri Banerjee.",
    pod_ep3_title: "Ft. Amelia Corl",
    pod_ep3_desc: "Liderazgo Juvenil contra el Cáncer y Empoderamiento Comunitario con Amelia Corl.",

    // Footer
    foot_brand: "LA FUNDACIÓN CARCINO",
    foot_contact: "CONTACTO",
    foot_tribute: "Nuestro Tributo",
    foot_rights: "Todos los derechos reservados. © 2026 La Fundación Carcino.",
    foot_privacy: "Política de Privacidad",
    foot_terms: "Términos de Servicio",

    // Articles Gallery Page
    gal_search_placeholder: "Buscar artículos...",
    gal_search_btn: "Buscar",
    gal_sub_title: "Claridad clínica entregada en tu bandeja de entrada",
    gal_sub_desc: "Mantente conectado con perspectivas clínicas verificadas, estrategias de apoyo al cuidador e historias inspiradoras.",
    gal_sub_btn: "Suscribirse",

    // Vision Section
    vis_our: "Nuestra",
    vis_vision: "Visión",
    vis_desc: "Empoderando a cada paciente, cuidador y aliado clínico con recursos compasivos y vías claras para desmitificar la atención carcinoide e inspirar esperanza.",
  },
  FR: {
    // Navigation
    nav_home: "Accueil",
    nav_about: "À propos",
    nav_articles: "Articles",
    nav_features: "Fonctionnalités",
    nav_podcasts: "Podcasts",
    nav_survivors: "Survivants",
    btn_read_articles: "Lire les Articles",
    btn_view_podcasts: "Voir les podcasts",

    // Hero
    hero_headline_1: "Démystifier el",
    hero_headline_cancer: "Cancer",
    hero_headline_2: "pour",
    hero_headline_everyone: "Tous",
    hero_headline_3: "avec fierté.",
    hero_desc: "La Fondation Carcino aide les personnes à naviguer dans les réalités émotionnelles et pratiques du cancer. Nous travaillons aux côtés des équipes de soins locales et des organisations communautaires.",

    // Articles Section
    art_title_1: "Galerie",
    art_title_2: "d'Articles",
    art_subtitle: "Voici la dernière collection d'articles que nous proposons, conçus pour être compréhensibles par tous, préparés avec soin par notre équipe de rédaction.",
    art_cat_all: "Tous",
    art_cat_medical: "Perspectives Médicales",
    art_cat_survivor: "Histoires de Survivants",
    art_cat_caregiver: "Guide de l'Aidant",
    art_cat_wellness: "Bien-être & Rétablissement",
    btn_explore_articles: "Explorer Tous les Articles",

    // Features Section
    feat_title: "fonctionnalités",
    feat_subtitle: "Ressources compatissantes, parcours cliniques et réseaux de patients réels conçus pour vous soutenir à chaque étape.",
    feat_1_badge: "SOINS DE CONFIANCE TCF",
    feat_1_title: "Soutien Compatissant",
    feat_1_desc: "Connectez-vous directement avec des experts cliniques vérifiés et des réseaux d'oncologie spécialisés dans les soins carcinoïdes.",
    feat_2_badge: "NAVIGATEUR DE TRAITEMENT TCF",
    feat_2_title: "Orientation Diagnostique",
    feat_2_desc: "Un navigateur interactif étape par étape conçu pour démystifier les 30 premiers jours critiques après votre diagnostic.",
    feat_3_badge: "CONNEXION TCF",
    feat_3_title: "Espaces Communautaires",
    feat_3_desc: "Rejoignez des groupes de discussion modérés et sécurisés pour partager des expériences avec des patients et des aidants.",
    feat_4_badge: "VOIX TCF",
    feat_4_title: "Histoires de Survivants",
    feat_4_desc: "Explorez une collection d'interviews détaillant des parcours réels de survie et de rétablissement.",

    // Podcast Section
    pod_title: "Podcast",
    pod_subtitle: "Conversations compatissantes sur le soutien du cancer, les histoires de patients, l'aide aux aidants et la survie.",
    pod_ep1_title: "Naviguer dans le Diagnostic",
    pod_ep1_desc: "Un guide compatissant pour les 30 premiers jours après avoir reçu un diagnostic de cancer.",
    pod_ep2_title: "Épuisement de l'Aidant",
    pod_ep2_desc: "Stratégies pratiques pour les aidants afin de maintenir leur propre santé mentale et physique.",
    pod_ep3_title: "Survie 101",
    pod_ep3_desc: "Reconstruire sa vie après le traitement: trouver de nouvelles habitudes et gérer les effets à long terme.",

    // Footer
    foot_brand: "LA FONDATION CARCINO",
    foot_contact: "CONTACT",
    foot_tribute: "Notre Hommage",
    foot_rights: "Tous droits réservés. © 2026 La Fondation Carcino.",
    foot_privacy: "Politique de Confidentialité",
    foot_terms: "Conditions d'Utilisation",

    // Articles Gallery Page
    gal_search_placeholder: "Rechercher des articles...",
    gal_search_btn: "Rechercher",
    gal_sub_title: "La clarté clinique livrée dans votre boîte de réception",
    gal_sub_desc: "Restez connecté avec des informations cliniques vérifiées, des stratégies pour les aidants et des témoignages.",
    gal_sub_btn: "S'abonner",

    // Vision Section
    vis_our: "Notre",
    vis_vision: "Vision",
    vis_desc: "Donner à chaque patient, aidant et allié clinique des ressources compatissantes et des parcours clairs pour démystifier les soins carcinoïdes et inspirer l'espoir.",
  },
};

const LanguageContext = createContext<LanguageContextType>({
  lang: "EN",
  setLang: () => {},
  toggleLang: () => {},
  t: (key: string) => key,
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Language>("EN");

  useEffect(() => {
    const saved = localStorage.getItem("carcino_lang") as Language;
    if (saved && (saved === "EN" || saved === "ES" || saved === "FR")) {
      setLangState(saved);
    }
  }, []);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem("carcino_lang", newLang);
  };

  const toggleLang = () => {
    const languages: Language[] = ["EN", "ES", "FR"];
    const currentIndex = languages.indexOf(lang);
    const nextLang = languages[(currentIndex + 1) % languages.length];
    setLang(nextLang);
  };

  const t = (key: string): string => {
    return translations[lang]?.[key] || translations["EN"]?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
