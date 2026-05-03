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
      <section className="relative z-10 pt-32 sm:pt-40 pb-16">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="section-container text-center"
        >
          <motion.div variants={fadeUp} className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-primary/20 bg-brand-primary/10 px-4 py-2">
            <FileText size={16} className="text-brand-primary" />
            <span className="text-sm font-medium text-brand-primary uppercase tracking-widest">{t.Docs.hero_tag}</span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="font-heading text-4xl font-bold leading-tight text-[var(--color-foreground)] sm:text-5xl md:text-6xl"
          >
            {t.Docs.hero_title_1} <span className="text-gradient">{t.Docs.hero_title_2}</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mx-auto mt-6 max-w-2xl text-lg text-[var(--color-muted)] leading-relaxed"
          >
            {t.Docs.hero_desc}
          </motion.p>
        </motion.div>
      </section>

      {/* ── Quick Links ── */}
      <section className="relative z-10 pb-20">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="section-container flex flex-wrap items-center justify-center gap-4"
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
                className={quickLinkClass}
              >
                <span className="text-brand-primary">{link.icon}</span>
                {link.label}
                <ArrowRight size={14} className="opacity-40 transition-transform group-hover:translate-x-1" />
              </motion.a>
            ) : (
              <MotionLink key={i} variants={fadeUp} href={`/${locale}${link.href}`} className={quickLinkClass}>
                <span className="text-brand-primary">{link.icon}</span>
                {link.label}
                <ArrowRight size={14} className="opacity-40 transition-transform group-hover:translate-x-1" />
              </MotionLink>
            )
          )}
        </motion.div>
      </section>

      {/* ── Main Content Grid ── */}
      <section className="relative z-10 py-12">
        <div className="section-container max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-12">
            
            {/* Sidebar Navigation (Sticky) */}
            <aside className="lg:col-span-3 hidden lg:block">
              <div className="sticky top-32 space-y-8">
                <div className="space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-brand-primary opacity-60 px-4">{t.Docs.sidebar_sections}</h4>
                  <nav className="flex flex-col gap-1">
                    {[
                      {
                        id: 'architecture',
                        label: locale === 'ar' ? 'المعمارية (LAN فقط)' : locale === 'fr' ? 'Architecture (LAN uniquement)' : 'Architecture (LAN-only)',
                        icon: <Layers size={16} />,
                      },
                      { id: 'deployment', label: t.Docs.sidebar_deployment, icon: <Server size={16} /> },
                      { id: 'mqtt', label: t.Docs.sidebar_mqtt, icon: <Radio size={16} /> },
                      { id: 'database', label: t.Docs.sidebar_database, icon: <Database size={16} /> },
                      { id: 'ai', label: t.Docs.sidebar_ai, icon: <Activity size={16} /> },
                      {
                        id: 'security',
                        label: locale === 'ar' ? 'الأمان والسلامة' : locale === 'fr' ? 'Sécurité & sûreté' : 'Security & Safety',
                        icon: <ShieldCheck size={16} />,
                      },
                      {
                        id: 'testing',
                        label: locale === 'ar' ? 'الاختبار والتحقق' : locale === 'fr' ? 'Tests & vérification' : 'Testing & Verification',
                        icon: <Zap size={16} />,
                      },
                    ].map((item) => (
                      <a 
                        key={item.id}
                        href={`#${item.id}`}
                        className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-[var(--color-muted)] hover:text-brand-primary hover:bg-brand-primary/5 transition-all"
                      >
                        {item.icon}
                        {item.label}
                      </a>
                    ))}
                  </nav>
                </div>

                <div className="p-6 rounded-2xl bg-brand-primary/5 border border-brand-primary/10">
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
              <section id="architecture" className="scroll-mt-32 space-y-10">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 flex items-center justify-center rounded-xl bg-brand-primary/10 text-brand-primary">
                    <Layers size={24} />
                  </div>
                  <h2 className="text-3xl font-heading font-bold text-[var(--color-foreground)]">
                    {locale === 'ar' ? 'معمارية LAN فقط' : locale === 'fr' ? 'Architecture LAN uniquement' : 'LAN‑Only Architecture'}
                  </h2>
                </div>

                <div className="space-y-8">
                  <p className="text-[var(--color-muted)] leading-relaxed">
                    {locale === 'ar'
                      ? 'تم تصميم تازروت للعمل بالكامل دون إنترنت داخل شبكة المزرعة (LAN). تقوم البوابة بربط LoRa ↔ MQTT، بينما يستضيف الخادم المركزي Mosquitto وPostgreSQL ومحرك الذكاء الاصطناعي والـBackend (جسر WebSocket) على نفس الجهاز لتقليل زمن الاستجابة.'
                      : locale === 'fr'
                        ? 'Tazrout est conçu pour fonctionner entièrement hors ligne sur le LAN de la ferme. La passerelle fait le pont LoRa ↔ MQTT, tandis que le serveur central héberge Mosquitto, PostgreSQL, le moteur IA et le backend (pont WebSocket) sur la même machine pour une latence minimale.'
                        : 'Tazrout is designed to run fully offline on the farm LAN. The gateway bridges LoRa ↔ MQTT, while the central server hosts Mosquitto, PostgreSQL, the AI engine, and the backend (WebSocket bridge) on the same machine for low latency.'}
                  </p>

                  <Card className="overflow-hidden border-[var(--color-border-subtle)] bg-[var(--color-surface)]">
                    <div className="px-6 py-3 border-b border-[var(--color-border-subtle)] flex items-center justify-between bg-[var(--color-surface-elevated)]">
                      <span className="text-[10px] font-mono text-brand-primary font-bold uppercase tracking-widest">
                        {locale === 'ar' ? 'مخطط النظام (5 طبقات)' : locale === 'fr' ? 'Schéma du système (5 couches)' : '5-Layer System Diagram'}
                      </span>
                      <span className="text-[10px] font-mono text-[var(--color-muted)] italic">
                        {locale === 'ar'
                          ? 'الحقل → البوابة → الوسيط → الخلفية/الذكاء الاصطناعي → الواجهة'
                          : locale === 'fr'
                            ? 'Terrain → Passerelle → Broker → Backend/IA → UI'
                            : 'Field → Gateway → Broker → Backend/AI → UI'}
                      </span>
                    </div>
                    <div className="p-6">
                      <pre className="text-[10px] sm:text-xs font-mono text-[var(--color-body)] leading-relaxed overflow-x-auto whitespace-pre">
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
                  </Card>

                  <div className="grid gap-6 md:grid-cols-2">
                    <Card className="p-6 border-[var(--color-border-subtle)] bg-[var(--color-surface)]">
                      <h3 className="text-sm font-bold text-brand-primary mb-3 flex items-center gap-2">
                        <Zap size={16} />{' '}
                        {locale === 'ar'
                          ? 'تدفق البيانات (المستشعرات → لوحة التحكم)'
                          : locale === 'fr'
                            ? 'Flux de données (capteurs → dashboard)'
                            : 'Data Flow (Sensors → Dashboard)'}
                      </h3>
                      <ol className="text-xs text-[var(--color-muted)] space-y-2">
                        <li>
                          {locale === 'ar'
                            ? '1) يقرأ ESP32 المستشعرات ويرسل إطار LoRa.'
                            : locale === 'fr'
                              ? '1) L’ESP32 lit les capteurs et transmet une trame LoRa.'
                              : '1) ESP32 reads sensors and transmits a LoRa frame.'}
                        </li>
                        <li>
                          {locale === 'ar'
                            ? '2) تفك البوابة البيانات وتنشرها إلى'
                            : locale === 'fr'
                              ? '2) La passerelle décode et publie sur'
                              : '2) Gateway decodes and publishes to'}{' '}
                          <code className="text-brand-primary">tazrout/zones/&lt;zoneId&gt;/sensors</code>.
                        </li>
                        <li>
                          {locale === 'ar'
                            ? '3) يتحقق الـBackend ويحفظ القراءات في Postgres.'
                            : locale === 'fr'
                              ? '3) Le backend valide et persiste dans Postgres.'
                              : '3) Backend validates and persists readings to Postgres.'}
                        </li>
                        <li>
                          {locale === 'ar'
                            ? '4) يعيد الـBackend بث الأحداث عبر WebSocket إلى لوحة التحكم.'
                            : locale === 'fr'
                              ? '4) Le backend rediffuse via WebSocket vers le dashboard.'
                              : '4) Backend rebroadcasts frames over WebSocket to the dashboard.'}
                        </li>
                      </ol>
                    </Card>

                    <Card className="p-6 border-[var(--color-border-subtle)] bg-[var(--color-surface)]">
                      <h3 className="text-sm font-bold text-brand-primary mb-3 flex items-center gap-2">
                        <Cpu size={16} />{' '}
                        {locale === 'ar'
                          ? 'تدفق البيانات (الذكاء الاصطناعي → أمر صمام → تأكيد)'
                          : locale === 'fr'
                            ? 'Flux de données (IA → commande vanne → ACK)'
                            : 'Data Flow (AI → Valve Command → ACK)'}
                      </h3>
                      <ol className="text-xs text-[var(--color-muted)] space-y-2">
                        <li>
                          {locale === 'ar'
                            ? '1) يشترك محرك AI بمواضيع المستشعرات ويقرر الري.'
                            : locale === 'fr'
                              ? '1) Le moteur IA s’abonne aux capteurs et décide l’irrigation.'
                              : '1) AI Engine subscribes sensor topics and decides irrigation.'}
                        </li>
                        <li>
                          {locale === 'ar'
                            ? '2) ينشر القرار إلى'
                            : locale === 'fr'
                              ? '2) Publie la décision sur'
                              : '2) Publishes decision to'}{' '}
                          <code className="text-brand-primary">tazrout/ai/decisions</code>.
                        </li>
                        <li>
                          {locale === 'ar'
                            ? '3) ينشر الأمر إلى'
                            : locale === 'fr'
                              ? '3) Publie la commande sur'
                              : '3) Publishes command to'}{' '}
                          <code className="text-brand-primary">tazrout/zones/&lt;zoneId&gt;/valve/command</code> (QoS 2).
                        </li>
                        <li>
                          {locale === 'ar'
                            ? '4) ترسل البوابة Downlink؛ تنفّذ الـMCU وتؤكد إلى'
                            : locale === 'fr'
                              ? '4) Downlink via passerelle; le MCU exécute et ACK sur'
                              : '4) Gateway forwards downlink; MCU executes and ACKs to'}{' '}
                          <code className="text-brand-primary">.../valve/ack</code>.
                        </li>
                      </ol>
                    </Card>
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

                  <div className="grid gap-6 md:grid-cols-2">
                    <Card className="p-6 border-[var(--color-border-subtle)] bg-[var(--color-surface)]">
                      <h3 className="text-sm font-bold text-brand-primary mb-4 flex items-center gap-2">
                        <Terminal size={16} /> 1. Core Dependencies
                      </h3>
                      <pre className="text-[10px] font-mono text-[var(--color-body)] space-y-1 leading-relaxed overflow-x-auto">
                        {`# Install PostgreSQL\nsudo apt install postgresql postgresql-contrib\n\n# Install MQTT Broker\nsudo apt install mosquitto mosquitto-clients\n\n# Install Java 17 & Maven\nsudo apt install openjdk-17-jdk maven`}
                      </pre>
                    </Card>

                    <Card className="p-6 border-[var(--color-border-subtle)] bg-[var(--color-surface)]">
                      <h3 className="text-sm font-bold text-brand-primary mb-4 flex items-center gap-2">
                        <Settings size={16} /> 2. Configuration Check
                      </h3>
                      <ul className="text-xs text-[var(--color-muted)] space-y-3">
                        <li className="flex items-start gap-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-brand-primary mt-1.5 flex-shrink-0" />
                          <span>Verify <code className="text-brand-primary">mosquitto.conf</code> allows external listeners.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-brand-primary mt-1.5 flex-shrink-0" />
                          <span>Ensure PostgreSQL port 5432 is open on the LAN.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-brand-primary mt-1.5 flex-shrink-0" />
                          <span>Update Spring Boot <code className="text-brand-primary">application.properties</code> with server IP.</span>
                        </li>
                      </ul>
                    </Card>
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

                  <div className="grid sm:grid-cols-3 gap-4">
                    {[
                      { label: 'QoS (Sensors)', value: '1 (At least once)', desc: 'Best effort reliability for telemetry.' },
                      { label: 'QoS (Commands)', value: '2 (Exactly once)', desc: 'Valve commands must never execute twice.' },
                      { label: 'Retained', value: 'State topics only', desc: 'Device state/status retained; sensor stream is not.' },
                    ].map((spec, i) => (
                      <div key={i} className="p-4 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border-subtle)] shadow-[var(--shadow-card)]">
                        <div className="text-[10px] text-[var(--color-muted)] uppercase mb-1 font-bold">{spec.label}</div>
                        <div className="text-sm font-bold text-brand-primary mb-1">{spec.value}</div>
                        <p className="text-[9px] text-[var(--color-muted)] leading-tight">{spec.desc}</p>
                      </div>
                    ))}
                  </div>

                  <Card className="p-6 border-[var(--color-border-subtle)] bg-[var(--color-surface)]">
                    <h3 className="text-sm font-bold text-brand-primary mb-4 flex items-center gap-2">
                      <Code size={16} /> Example Payload (Valve Command)
                    </h3>
                    <pre className="text-[10px] sm:text-xs font-mono text-[var(--color-body)] leading-relaxed overflow-x-auto">
{`{
  "packet_type": "VALVE_COMMAND",
  "command_id": "CMD-2026-0112",
  "issued_by": "AI_ENGINE",
  "issued_at": "2026-02-15T10:31:06Z",
  "zone_id": "zone_a",
  "device_id": "MCU-ZONE-A-001",
  "command": "OPEN_VALVE",
  "duration_minutes": 20,
  "priority": "NORMAL",
  "linked_decision_id": "DEC-2026-0047",
  "reason": "AI irrigation decision — moisture below threshold"
}`}
                    </pre>
                  </Card>
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
                  
                  <div className="bg-[var(--color-surface)] rounded-xl border border-[var(--color-border-subtle)] p-8 relative overflow-hidden shadow-[var(--shadow-card)]">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                      <Code size={48} />
                    </div>
                    <pre className="text-xs font-mono text-[var(--color-body)] space-y-2 leading-relaxed overflow-x-auto">
                      {`CREATE DATABASE tazrout_db;\nCREATE USER tazrout_user WITH PASSWORD 'tazrout_pass123';\nGRANT ALL PRIVILEGES ON DATABASE tazrout_db TO tazrout_user;\nALTER DATABASE tazrout_db OWNER TO tazrout_user;`}
                    </pre>
                  </div>

                  <div className="flex items-start gap-3 p-4 rounded-xl bg-brand-primary/5 border border-brand-primary/10">
                    <Zap size={20} className="text-brand-primary flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-[var(--color-muted)] leading-relaxed">
                      <span className="font-bold text-brand-primary uppercase text-[10px] mr-2">Pro Tip:</span>
                      Use the <code className="text-brand-primary px-1">mqtt_simulator.py</code> with real Postgres connection to test analytical chart growth before field deployment.
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

                  <div className="bg-brand-primary/10 rounded-2xl p-8 border border-brand-primary/20">
                    <div className="grid gap-8 sm:grid-cols-3 text-center">
                      {[
                        { label: 'Model Type', value: 'XGBoost v2' },
                        { label: 'Accuracy', value: '94.72%' },
                        { label: 'Optimization', value: 'MAE' },
                      ].map((metric, i) => (
                        <div key={i}>
                          <div className="text-[10px] text-brand-primary font-bold uppercase mb-1 tracking-widest">{metric.label}</div>
                          <div className="text-2xl font-heading font-bold text-[var(--color-foreground)]">{metric.value}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Card className="p-6 border-[var(--color-border-subtle)] bg-[var(--color-surface)]">
                    <h3 className="text-sm font-bold text-brand-primary mb-4 flex items-center gap-2">
                      <Terminal size={16} /> AI Inference (Classification → Regression)
                    </h3>
                    <ol className="text-xs text-[var(--color-muted)] space-y-2">
                      <li>1) Classifier predicts \(irrigate = 0/1\) from humidity/temperature/soil_moisture/water_level + plant type.</li>
                      <li>2) If \(irrigate = 0\), the engine returns 0 liters and publishes a non-action decision.</li>
                      <li>3) If \(irrigate = 1\), regressor predicts liters and publishes the irrigation plan + valve command.</li>
                    </ol>
                  </Card>
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
                    <ul className="text-xs text-[var(--color-muted)] space-y-2">
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

              {/* Testing Section */}
              <section id="testing" className="scroll-mt-32 space-y-10">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 flex items-center justify-center rounded-xl bg-brand-primary/10 text-brand-primary">
                    <Zap size={24} />
                  </div>
                  <h2 className="text-3xl font-heading font-bold text-[var(--color-foreground)]">
                    {locale === 'ar' ? 'الاختبار والتحقق' : locale === 'fr' ? 'Tests & vérification' : 'Testing & Verification'}
                  </h2>
                </div>
                <div className="space-y-6">
                  <Card className="p-6 border-[var(--color-border-subtle)] bg-[var(--color-surface)]">
                    <h3 className="text-sm font-bold text-brand-primary mb-4 flex items-center gap-2">
                      <Terminal size={16} />{' '}
                      {locale === 'ar' ? 'راقب كل رسائل MQTT' : locale === 'fr' ? 'Observer tout le trafic MQTT' : 'Observe all MQTT traffic'}
                    </h3>
                    <pre className="text-[10px] sm:text-xs font-mono text-[var(--color-body)] leading-relaxed overflow-x-auto">
{`mosquitto_sub -t "tazrout/#" -u tazrout_admin -P tazrout123 -v`}
                    </pre>
                    <p className="mt-3 text-xs text-[var(--color-muted)]">
                      {locale === 'ar'
                        ? 'يجب أن ترى حزم المستشعرات كل 30 ثانية لكل منطقة، بالإضافة إلى تغيّر الحالة والقرارات وACK.'
                        : locale === 'fr'
                          ? 'Vous devriez voir des paquets capteurs toutes les 30s par zone, ainsi que les changements d’état, décisions et ACK.'
                          : 'You should see sensor packets every 30s per zone, plus state changes, decisions, and ACKs.'}
                    </p>
                  </Card>
                  <Card className="p-6 border-[var(--color-border-subtle)] bg-[var(--color-surface)]">
                    <h3 className="text-sm font-bold text-brand-primary mb-3">
                      {locale === 'ar' ? 'قائمة تحقق' : locale === 'fr' ? 'Checklist' : 'Checklist'}
                    </h3>
                    <ul className="text-xs text-[var(--color-muted)] space-y-2">
                      <li>
                        - {locale === 'ar'
                          ? 'يصل نبض البوابة مرة واحدة على الأقل كل 30 ثانية.'
                          : locale === 'fr'
                            ? 'Heartbeat passerelle au moins toutes les 30s.'
                            : 'Gateway heartbeat received at least once every 30s.'}
                      </li>
                      <li>
                        - {locale === 'ar'
                          ? 'يحفظ الـBackend القراءات (جداول Postgres تُنشأ تلقائياً عبر Hibernate).'
                          : locale === 'fr'
                            ? 'Le backend persiste les lectures (tables Postgres auto-créées par Hibernate).'
                            : 'Backend persists readings (Postgres tables auto-created by Hibernate).'}
                      </li>
                      <li>
                        - {locale === 'ar' ? 'يمكن تتبع قرارات AI عبر' : locale === 'fr' ? 'Décisions IA traçables via' : 'AI decisions are traceable via'}{' '}
                        <code className="text-brand-primary">linked_decision_id</code>{' '}
                        {locale === 'ar' ? 'داخل الأوامر.' : locale === 'fr' ? 'dans les commandes.' : 'on commands.'}
                      </li>
                      <li>
                        - {locale === 'ar'
                          ? 'الإيقاف الطارئ يغلق جميع الصمامات وينشر تحديثات الحالة.'
                          : locale === 'fr'
                            ? 'L’arrêt d’urgence ferme toutes les vannes et publie l’état.'
                            : 'Emergency Stop closes all valves and publishes status updates.'}
                      </li>
                    </ul>
                  </Card>
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
              ? 'نهاية مركز التوثيق • مشروع ENSCS 2024'
              : locale === 'fr'
                ? 'Fin du centre de documentation • Projet ENSCS 2024'
                : 'End of Documentation Hub • NSCS Project 2024'}
          </p>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-brand-primary/30 to-transparent mx-auto" />
        </motion.div>
      </section>
    </div>
  )
}
