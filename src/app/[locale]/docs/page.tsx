'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  FileText, 
  Terminal, 
  Cpu, 
  Zap, 
  Radio, 
  Database, 
  ShieldCheck, 
  Layers, 
  Activity, 
  Server, 
  Code, 
  Settings,
  ArrowRight,
  Github
} from 'lucide-react'
import { fadeUp, staggerContainer } from '@/lib/animations'
import Card from '@/components/ui/Card'
import { useTranslation, useLocale } from '@/lib/useTranslation'
import DecorativeShapes from '@/components/ui/DecorativeShapes'
import { cn } from '@/lib/utils'

const MotionLink = motion(Link)

const quickLinkClass =
  'group inline-flex items-center gap-3 rounded-xl border border-[var(--color-border-subtle)] bg-[var(--color-surface-elevated)] px-6 py-3 text-sm font-bold text-[var(--color-foreground)] transition-all hover:border-brand-primary hover:scale-105 active:scale-95'

export default function DocsPage() {
  const t = useTranslation()
  const locale = useLocale()

  return (
    <div className="relative min-h-screen bg-[var(--color-background)] overflow-hidden">
      <DecorativeShapes />

      {/* ── Hero Header ── */}
      <section className="relative z-10 pt-24 sm:pt-40 pb-12 sm:pb-16">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="section-container text-center px-4 sm:px-6"
        >
          <motion.div variants={fadeUp} className="mb-4 sm:mb-6 inline-flex items-center gap-2 rounded-full border border-brand-primary/20 bg-brand-primary/10 px-3 py-1.5 sm:px-4 sm:py-2">
            <FileText size={14} className="text-brand-primary sm:size-4" />
            <span className="text-[10px] sm:text-sm font-medium text-brand-primary uppercase tracking-widest">{t.Docs.hero_tag}</span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="font-heading text-3xl font-bold leading-tight text-[var(--color-foreground)] sm:text-5xl md:text-6xl"
          >
            {t.Docs.hero_title_1} <span className="text-gradient">{t.Docs.hero_title_2}</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mx-auto mt-4 sm:mt-6 max-w-2xl text-base sm:text-lg text-[var(--color-muted)] leading-relaxed"
          >
            {t.Docs.hero_desc}
          </motion.p>
        </motion.div>
      </section>

      {/* ── Quick Links ── */}
      <section className="relative z-10 pb-12 sm:pb-20">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="section-container flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3 sm:gap-4 px-4 sm:px-6"
        >
          {(
            [
              {
                label: locale === 'ar' ? 'مصدر لوحة التحكم' : locale === 'fr' ? 'Code du tableau de bord' : 'Dashboard Source',
                icon: <Github size={18} />,
                external: true,
                href: 'https://github.com/mcy-e/TAZROUT-Dashboard',
              },
              {
                label: locale === 'ar' ? 'عتاد ESP32' : locale === 'fr' ? 'Matériel ESP32' : 'ESP32 Hardware',
                icon: <Cpu size={18} />,
                external: true,
                href: 'https://github.com/moussakh189/tazrout-esp32-module',
              },
              {
                label: locale === 'ar' ? 'المعمارية (الوثيقة الكاملة)' : locale === 'fr' ? 'Architecture (document complet)' : 'Architecture (full doc)',
                icon: <Layers size={18} />,
                external: false,
                href: '/docs/architecture',
              },
            ] as const
          ).map((link, i) =>
            link.external ? (
              <motion.a
                key={i}
                variants={fadeUp}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(quickLinkClass, "w-full sm:w-auto justify-center")}
              >
                <span className="text-brand-primary">{link.icon}</span>
                {link.label}
                <ArrowRight size={14} className="opacity-40 transition-transform group-hover:translate-x-1" />
              </motion.a>
            ) : (
              <MotionLink key={i} variants={fadeUp} href={`/${locale}${link.href}`} className={cn(quickLinkClass, "w-full sm:w-auto justify-center")}>
                <span className="text-brand-primary">{link.icon}</span>
                {link.label}
                <ArrowRight size={14} className="opacity-40 transition-transform group-hover:translate-x-1" />
              </MotionLink>
            )
          )}
        </motion.div>
      </section>

      {/* ── Main Content Grid ── */}
      <section className="relative z-10 py-8 sm:py-12 px-4 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8 lg:gap-12">
            
            {/* Sidebar Navigation (Sticky) */}
            <aside className="lg:col-span-3 w-full lg:w-auto">
              <div className="lg:sticky lg:top-32 space-y-6 lg:space-y-8">
                <div className="bg-[var(--color-surface)] lg:bg-transparent p-4 lg:p-0 rounded-2xl border border-[var(--color-border-subtle)] lg:border-none shadow-sm lg:shadow-none">
                  <h4 className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-brand-primary opacity-60 px-2 lg:px-4 mb-3">
                    {t.Docs.sidebar_sections}
                  </h4>
                  <nav className="flex lg:flex-col gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-hide">
                    {[
                      {
                        id: 'architecture',
                        label: locale === 'ar' ? 'المعمارية' : locale === 'fr' ? 'Architecture' : 'Architecture',
                        icon: <Layers size={18} />,
                      },
                      { id: 'deployment', label: locale === 'ar' ? 'التركيب' : locale === 'fr' ? 'Déploiement' : 'Deployment', icon: <Server size={18} /> },
                      { id: 'mqtt', label: 'MQTT', icon: <Radio size={18} /> },
                      { id: 'database', label: 'Postgres', icon: <Database size={18} /> },
                      { id: 'ai', label: 'AI', icon: <Activity size={18} /> },
                      {
                        id: 'security',
                        label: locale === 'ar' ? 'الأمان' : locale === 'fr' ? 'Sécurité' : 'Security',
                        icon: <ShieldCheck size={18} />,
                      },
                    ].map((item) => (
                      <a 
                        key={item.id}
                        href={`#${item.id}`}
                        className="flex items-center gap-2 sm:gap-3 px-4 py-2.5 rounded-xl text-sm font-bold text-[var(--color-muted)] hover:text-brand-primary hover:bg-brand-primary/10 transition-all whitespace-nowrap lg:whitespace-normal border border-transparent lg:border-none bg-[var(--color-surface-elevated)] lg:bg-transparent"
                      >
                        <span className="text-brand-primary/70">{item.icon}</span>
                        {item.label}
                      </a>
                    ))}
                  </nav>
                </div>

                <div className="hidden lg:block p-6 rounded-2xl bg-brand-primary/5 border border-brand-primary/10">
                  <div className="flex items-center gap-2 text-brand-primary mb-3">
                    <ShieldCheck size={18} />
                    <span className="text-xs font-bold uppercase tracking-tight">{t.Docs.security_alert_title}</span>
                  </div>
                  <p className="text-[10px] text-[var(--color-muted)] leading-relaxed">
                    {t.Docs.security_alert_desc}
                  </p>
                </div>
              </div>
            </aside>

            {/* Main Documentation Body */}
            <main className="lg:col-span-9 space-y-24 pb-32">
              
              {/* Architecture Section */}
              <section id="architecture" className="scroll-mt-36 sm:scroll-mt-40 space-y-10 px-4 sm:px-0">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 flex items-center justify-center rounded-xl bg-brand-primary/10 text-brand-primary">
                    <Layers size={24} />
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-heading font-bold text-[var(--color-foreground)]">
                    {locale === 'ar' ? 'معمارية LAN فقط' : locale === 'fr' ? 'Architecture LAN uniquement' : 'LAN‑Only Architecture'}
                  </h2>
                </div>

                <div className="space-y-6 sm:space-y-8">
                  <p className="text-base sm:text-lg text-[var(--color-muted)] leading-relaxed">
                    {locale === 'ar'
                      ? 'تم تصميم تازروت للعمل بالكامل دون إنترنت داخل شبكة المزرعة (LAN). تقوم البوابة بربط LoRa ↔ MQTT، بينما يستضيف الخادم المركزي Mosquitto وPostgreSQL ومحرك الذكاء الاصطناعي والـBackend (جسر WebSocket) على نفس الجهاز لتقليل زمن الاستجابة.'
                      : locale === 'fr'
                        ? 'Tazrout est conçu pour fonctionner entièrement hors ligne sur le LAN de la ferme. La passerelle fait le pont LoRa ↔ MQTT, tandis que le serveur central héberge Mosquitto, PostgreSQL, le moteur IA et le backend (pont WebSocket) sur la même machine pour une latence minimale.'
                        : 'Tazrout is designed to run fully offline on the farm LAN. The gateway bridges LoRa ↔ MQTT, while the central server hosts Mosquitto, PostgreSQL, the AI engine, and the backend (WebSocket bridge) on the same machine for low latency.'}
                  </p>

                  <Card className="overflow-hidden border-[var(--color-border-subtle)] bg-[var(--color-surface)]">
                    <div className="px-6 py-3 border-b border-[var(--color-border-subtle)] flex items-center justify-between bg-[var(--color-surface-elevated)]">
                      <span className="text-[10px] sm:text-xs font-mono text-brand-primary font-bold uppercase tracking-widest">
                        {locale === 'ar' ? 'مخطط النظام (5 طبقات)' : locale === 'fr' ? 'Schéma du système (5 couches)' : '5-Layer System Diagram'}
                      </span>
                      <span className="text-[10px] sm:text-xs font-mono text-[var(--color-muted)] italic">
                        {locale === 'ar'
                          ? 'الحقل → البوابة → الوسيط → الخلفية/الذكاء الاصطناعي → الواجهة'
                          : locale === 'fr'
                            ? 'Terrain → Passerelle → Broker → Backend/IA → UI'
                            : 'Field → Gateway → Broker → Backend/AI → UI'}
                      </span>
                    </div>
                    <div className="p-4 sm:p-6 bg-[#0a0a0a] overflow-hidden">
                      <div className="overflow-x-auto custom-scrollbar">
                        <pre className={cn(
                          "text-[10px] sm:text-xs font-mono text-brand-primary/90 leading-relaxed whitespace-pre min-w-[600px] sm:min-w-0",
                          locale === 'ar' ? 'text-right' : 'text-left'
                        )} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
{locale === 'ar'
  ? `الطبقة 1 — العتاد الميداني (المناطق)
  مستشعرات → ESP32 + ريلاي + صمام → LoRa

الطبقة 2 — البوابة (مستقبل LoRa)
  تستقبل إطارات LoRa → تفك JSON → تنشر MQTT
  تشترك بأوامر الصمامات → ترسل Downlink عبر LoRa

الطبقة 3 — وسيط MQTT (Mosquitto)
  يمرر المواضيع (بدون منطق). LAN فقط.

الطبقة 4 — الخلفية + الذكاء الاصطناعي
  محرك AI: يشترك ببيانات المستشعرات → ينشر القرارات + أوامر الصمامات + التنبيهات
  Spring Boot: يشترك بالبيانات والقرارات → يحفظ في Postgres → جسر WebSocket للواجهة

الطبقة 5 — الواجهة
  لوحة التحكم تتلقى WebSocket (قراءة غالباً) مع زر إيقاف طارئ.`
  : locale === 'fr'
    ? `Couche 1 — Matériel terrain (zones)
  Capteurs → ESP32 + relais + vanne → LoRa

Couche 2 — Passerelle (récepteur LoRa)
  Reçoit les trames LoRa → décode JSON → publie MQTT
  S'abonne aux commandes de vanne → downlink LoRa

Couche 3 — Broker MQTT (Mosquitto)
  Route les topics (sans logique). LAN uniquement.

Couche 4 — Backend + IA
  Moteur IA : capteurs → décisions + commandes + alertes
  Spring Boot : capteurs + décisions → Postgres → pont WebSocket vers l'UI

Couche 5 — Frontend
  Dashboard via WebSocket ; lecture principalement + arrêt d'urgence.`
    : `L1 — Field Hardware (Zones)
  Sensors → ESP32 MCU + Relay + Valve → LoRa

L2 — Gateway (LoRa Receiver)
  Receives LoRa frames → decodes JSON → publishes MQTT
  Subscribes valve commands → forwards LoRa downlink

L3 — MQTT Broker (Mosquitto)
  Routes topics (no logic). LAN only.

L4 — Backend + AI
  AI Engine: subscribes sensors → publishes decisions + valve commands + alerts
  Spring Boot: subscribes sensors + decisions → persists to Postgres → WS bridge to UI

L5 — Frontend
  Dashboard consumes WebSocket stream; read-mostly with Emergency Stop.`}
                        </pre>
                      </div>
                      <div className="mt-2 text-[9px] text-[var(--color-muted)] flex items-center gap-1 sm:hidden">
                        <ArrowRight size={10} /> {locale === 'ar' ? 'اسحب لليمين لرؤية المزيد' : 'Swipe right to see more'}
                      </div>
                    </div>
                  </Card>

                  <div className="p-5 rounded-2xl bg-brand-primary/5 border border-brand-primary/10">
                    <p className="text-sm text-[var(--color-muted)] leading-relaxed">
                      {locale === 'ar'
                        ? 'تتدفق البيانات من حساسات الحقل عبر LoRa إلى البوابة، ثم يوزّعها وسيط MQTT إلى محرك الذكاء الاصطناعي والخلفية.'
                        : locale === 'fr'
                          ? "Les données transitent des capteurs via LoRa jusqu'à la passerelle. Le broker MQTT les distribue au moteur IA et au backend."
                          : 'Data flows from field sensors over LoRa to the gateway. The MQTT broker distributes it to the AI engine and backend.'}
                    </p>
                  </div>
                </div>
              </section>

              {/* Deployment Section */}
              <section id="deployment" className="scroll-mt-32 space-y-10">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 flex items-center justify-center rounded-xl bg-brand-primary/10 text-brand-primary">
                    <Server size={24} />
                  </div>
                  <h2 className="text-3xl font-heading font-bold text-[var(--color-foreground)]">{t.Docs.deployment_title}</h2>
                </div>

                <div className="space-y-8">
                  <p className="text-[var(--color-muted)] leading-relaxed">
                    {t.Docs.deployment_desc}
                  </p>

                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {[
                      { layer: locale === 'ar' ? 'الحساسات والاتصال' : locale === 'fr' ? 'Capteurs & radio' : 'Sensors & radio', tech: 'ESP32 + LoRa' },
                      { layer: locale === 'ar' ? 'وسيط الرسائل' : locale === 'fr' ? 'Broker de messages' : 'Message broker', tech: 'Mosquitto MQTT' },
                      { layer: locale === 'ar' ? 'الخلفية والتخزين' : locale === 'fr' ? 'Backend & stockage' : 'Backend & storage', tech: 'Spring Boot + PostgreSQL' },
                      { layer: locale === 'ar' ? 'محرك الذكاء الاصطناعي' : locale === 'fr' ? 'Moteur IA' : 'AI engine', tech: 'Python (scikit-learn)' },
                      { layer: locale === 'ar' ? 'لوحة التحكم' : locale === 'fr' ? 'Tableau de bord' : 'Dashboard', tech: 'Flutter Desktop' },
                      { layer: locale === 'ar' ? 'الشبكة المحلية' : locale === 'fr' ? 'Réseau local' : 'Network', tech: 'LAN only' },
                    ].map((row, i) => (
                      <div key={i} className="p-4 rounded-xl border border-[var(--color-border-subtle)] bg-[var(--color-surface)]">
                        <div className="text-[10px] uppercase tracking-wider text-[var(--color-muted)] mb-1">{row.layer}</div>
                        <div className="text-sm font-bold text-brand-primary">{row.tech}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* MQTT Section */}
              <section id="mqtt" className="scroll-mt-32 space-y-10">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 flex items-center justify-center rounded-xl bg-brand-primary/10 text-brand-primary">
                    <Radio size={24} />
                  </div>
                  <h2 className="text-3xl font-heading font-bold text-[var(--color-foreground)]">{t.Docs.mqtt_title}</h2>
                </div>

                <div className="grid gap-8">
                  <Card className="overflow-hidden border-[var(--color-border-subtle)] bg-[var(--color-surface)]">
                    <div className="px-6 py-3 border-b border-[var(--color-border-subtle)] flex items-center justify-between bg-[var(--color-surface-elevated)]">
                      <span className="text-[10px] font-mono text-brand-primary font-bold uppercase tracking-widest">Topic Structure</span>
                      <span className="text-[10px] font-mono text-[var(--color-muted)] italic">Payload: JSON</span>
                    </div>
                    <div className="p-6 font-mono text-xs leading-relaxed overflow-x-auto">
                      <div className="space-y-4">
                        <div className="group">
                          <span className="text-brand-primary font-bold">tazrout/zones/+/sensors</span>
                          <p className="text-[10px] text-[var(--color-muted)] mt-1 ml-4 opacity-60 group-hover:opacity-100 transition-opacity">
                            Telemetry (QoS 1): temp, humidity, soil_moisture, water_level (+ RSSI/SNR diagnostics)
                          </p>
                        </div>
                        <div className="group">
                          <span className="text-brand-primary font-bold">tazrout/zones/&lt;zoneId&gt;/valve/command</span>
                          <p className="text-[10px] text-[var(--color-muted)] mt-1 ml-4 opacity-60 group-hover:opacity-100 transition-opacity">
                            Control (QoS 2): OPEN_VALVE / CLOSE_VALVE with duration + trace IDs
                          </p>
                        </div>
                        <div className="group">
                          <span className="text-brand-primary font-bold">tazrout/system/emergency/stop</span>
                          <p className="text-[10px] text-[var(--color-muted)] mt-1 ml-4 opacity-60 group-hover:opacity-100 transition-opacity">
                            Global Shutdown (QoS 2): the only dashboard command that can affect valves.
                          </p>
                        </div>
                      </div>
                    </div>
                  </Card>

                  <div className="p-5 rounded-2xl bg-brand-primary/5 border border-brand-primary/10">
                    <p className="text-sm text-[var(--color-muted)] leading-relaxed">
                      {locale === 'ar'
                        ? 'أوامر الصمامات تستخدم QoS 2 لضمان التنفيذ مرة واحدة. بيانات الحساسات بـQoS 1. الحالة الدائمة فقط هي المحتفظ بها في الوسيط.'
                        : locale === 'fr'
                          ? "Les commandes de vanne utilisent QoS 2 (exactement une fois). La télémétrie utilise QoS 1. Seul l'état persistant est retenu sur le broker."
                          : 'Valve commands use QoS 2 for exactly-once delivery. Sensor telemetry uses QoS 1. Only device state topics are retained on the broker.'}
                    </p>
                  </div>
                </div>
              </section>

              {/* Database Section */}
              <section id="database" className="scroll-mt-32 space-y-10">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 flex items-center justify-center rounded-xl bg-brand-primary/10 text-brand-primary">
                    <Database size={24} />
                  </div>
                  <h2 className="text-3xl font-heading font-bold text-[var(--color-foreground)]">{t.Docs.db_title}</h2>
                </div>

                <div className="space-y-6">
                  <p className="text-[var(--color-muted)] leading-relaxed">
                    {t.Docs.db_desc}
                  </p>
                  
                  <div className="p-5 rounded-2xl bg-brand-primary/5 border border-brand-primary/10">
                    <p className="text-sm text-[var(--color-muted)] leading-relaxed">
                      {locale === 'ar'
                        ? 'يستخدم النظام PostgreSQL مع Hibernate ORM. تبقى بيانات الاعتماد على الخادم المحلي وخارج أي مستودع عام.'
                        : locale === 'fr'
                          ? 'Le système utilise PostgreSQL avec Hibernate ORM. Les identifiants restent sur le serveur local, hors de tout dépôt public.'
                          : 'The system uses PostgreSQL with Hibernate ORM. All credentials stay on the local server, out of any public repository.'}
                    </p>
                  </div>
                </div>
              </section>

              {/* AI Section */}
              <section id="ai" className="scroll-mt-32 space-y-10">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 flex items-center justify-center rounded-xl bg-brand-primary/10 text-brand-primary">
                    <Activity size={24} />
                  </div>
                  <h2 className="text-3xl font-heading font-bold text-[var(--color-foreground)]">{t.Docs.ai_title}</h2>
                </div>

                <div className="space-y-8">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-4">
                      <h4 className="text-sm font-bold flex items-center gap-2">
                        <Cpu size={16} className="text-brand-primary" /> {t.Docs.ai_model_arch}
                      </h4>
                      <p className="text-xs text-[var(--color-muted)] leading-relaxed">
                        {t.Docs.ai_model_desc}
                      </p>
                    </div>
                    <div className="space-y-4">
                      <h4 className="text-sm font-bold flex items-center gap-2">
                        <Database size={16} className="text-brand-primary" /> {t.Docs.ai_training_title}
                      </h4>
                      <p className="text-xs text-[var(--color-muted)] leading-relaxed">
                        {t.Docs.ai_training_desc}
                      </p>
                    </div>
                  </div>

                  <div className="p-5 rounded-2xl bg-brand-primary/5 border border-brand-primary/10">
                    <p className="text-sm text-[var(--color-muted)] leading-relaxed">
                      {locale === 'ar'
                        ? 'يعمل المحرك على مرحلتين: يحدد ما إذا كانت المنطقة تحتاج ريّاً، ثم يحسب الحجم المطلوب. المعالجة كلها محلية.'
                        : locale === 'fr'
                          ? "Le moteur fonctionne en deux phases : décider si la zone a besoin d'irrigation, puis calculer le volume. Tout est local."
                          : 'The engine runs in two stages: decide if a zone needs water, then estimate the volume. All processing is local.'}
                    </p>
                  </div>
                </div>
              </section>

              {/* Security Section */}
              <section id="security" className="scroll-mt-32 space-y-10">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 flex items-center justify-center rounded-xl bg-brand-primary/10 text-brand-primary">
                    <ShieldCheck size={24} />
                  </div>
                  <h2 className="text-3xl font-heading font-bold text-[var(--color-foreground)]">
                    {locale === 'ar' ? 'الأمان والسلامة' : locale === 'fr' ? 'Sécurité & sûreté' : 'Security & Safety'}
                  </h2>
                </div>
                <div className="space-y-6">
                  <Card className="p-6 border-[var(--color-border-subtle)] bg-[var(--color-surface)]">
                    <h3 className="text-sm font-bold text-brand-primary mb-3">
                      {locale === 'ar' ? 'قواعد صارمة' : locale === 'fr' ? 'Règles strictes' : 'Hard Rules'}
                    </h3>
                      <ul className="text-sm text-[var(--color-muted)] space-y-3">
                        <li>
                          - {locale === 'ar' ? 'لا تقم بتعريض منفذ MQTT' : locale === 'fr' ? 'Ne jamais exposer le port MQTT' : 'Never expose MQTT port'}{' '}
                          <code className="text-brand-primary">1883</code>{' '}
                          {locale === 'ar' ? 'للإنترنت العام.' : locale === 'fr' ? 'à l’internet public.' : 'to the public internet.'}
                        </li>
                        <li>
                          - {locale === 'ar'
                            ? 'أبقِ جميع الخدمات داخل LAN المزرعة بدون اعتماد على السحابة.'
                            : locale === 'fr'
                              ? 'Gardez tous les services sur le LAN de la ferme, sans dépendances cloud.'
                              : 'Keep all services on the farm LAN; no cloud dependencies required.'}
                        </li>
                        <li>
                          - {locale === 'ar'
                            ? 'لوحة التحكم للقراءة غالباً: لا تحكم يدوي بالصمامات (إلا الإيقاف الطارئ).'
                            : locale === 'fr'
                              ? 'Dashboard principalement en lecture : pas de contrôle manuel des vannes (sauf arrêt d’urgence).'
                              : 'Dashboard is read-mostly: no manual valve control (except Emergency Stop).'}
                        </li>
                      </ul>
                  </Card>
                  <div className="p-6 rounded-2xl bg-brand-primary/5 border border-brand-primary/10">
                    <p className="text-xs text-[var(--color-muted)] leading-relaxed">
                      <span className="font-bold text-brand-primary uppercase text-[10px] mr-2">
                        {locale === 'ar' ? 'إيقاف طارئ:' : locale === 'fr' ? 'Arrêt d’urgence :' : 'Emergency Stop:'}
                      </span>
                      {locale === 'ar' ? 'نشر' : locale === 'fr' ? 'Publier' : 'Publishing'}{' '}
                      <code className="text-brand-primary">tazrout/system/emergency/stop</code>{' '}
                      {locale === 'ar'
                        ? 'يغلق جميع المناطق ويوقف قرارات الذكاء الاصطناعي مؤقتاً.'
                        : locale === 'fr'
                          ? 'force la fermeture de toutes les zones et met en pause les décisions IA.'
                          : 'forces all zones closed and pauses AI decisions.'}
                    </p>
                  </div>
                </div>
              </section>


            </main>
          </div>
        </div>
      </section>

      {/* ── Technical Footer ── */}
      <section className="relative z-10 py-24 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="section-container"
        >
          <p className="text-[var(--color-muted)] text-[10px] mb-6 font-mono tracking-widest uppercase">
            {locale === 'ar'
              ? 'نهاية مركز التوثيق • مشروع ENSCS 2026'
              : locale === 'fr'
                ? 'Fin du centre de documentation • Projet ENSCS 2026'
                : 'End of Documentation Hub • NSCS Project 2026'}
          </p>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-brand-primary/30 to-transparent mx-auto" />
        </motion.div>
      </section>
    </div>
  )
}
