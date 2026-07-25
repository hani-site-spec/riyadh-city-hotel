"use client";

import { FormEvent, useEffect, useState } from "react";
import Image from "next/image";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const assetPath = (path: string) => `${basePath}${path}`;

const units = [
  {
    number: "01",
    label: "فئة ديلوكس",
    title: "شقة عائلية ديلوكس بغرفتي نوم",
    description:
      "شقة فندقية عائلية فاخرة ومتكاملة، تتميز بصالة معيشة واسعة، وغرفة نوم رئيسية بسرير عائلي، وغرفة نوم ثانية بسريرين فرديين، إضافة إلى حمام ومطبخ مجهز بجميع الاحتياجات الأساسية، لتوفير إقامة مريحة ومثالية للعائلات.",
    specifications: [
      { label: "المساحة", value: "102.40 م²" },
      { label: "السعة القصوى", value: "4 نزلاء" },
      { label: "توزيع الأسرّة", value: "سرير عائلي + سريران فرديان" },
      {
        label: "التكييف والإنترنت",
        value: "مكيّفة بالكامل بمكيفات منفصلة في الصالة وغرف النوم، مع خدمة إنترنت لاسلكي (Wi-Fi)",
      },
    ],
  },
  {
    number: "02",
    label: "فئة سوبيريور",
    title: "شقة عائلية سوبيريور بغرفتي نوم",
    description:
      "شقة فندقية عائلية أنيقة ومجهزة بالكامل، تتكون من صالة معيشة مريحة، وغرفة نوم رئيسية بسرير عائلي، وغرفة نوم ثانية بسريرين فرديين، بالإضافة إلى حمام ومطبخ مجهز، وتناسب العائلات الباحثة عن الراحة والخصوصية ضمن مساحة عملية ومنظمة.",
    specifications: [
      { label: "المساحة", value: "73.69 م²" },
      { label: "السعة القصوى", value: "4 نزلاء" },
      { label: "توزيع الأسرّة", value: "سرير عائلي + سريران فرديان" },
      {
        label: "التكييف والإنترنت",
        value: "مكيّفة بالكامل بمكيفات منفصلة في الصالة وغرف النوم، مع خدمة إنترنت لاسلكي (Wi-Fi)",
      },
    ],
  },
];

const gallery = [
  {
    src: "/images/riyadh-city-building-sign.webp",
    alt: "الواجهة الرئيسية ولافتة الرياض سيتي للشقق الفندقية",
    title: "الواجهة الرئيسية",
    note: "هوية الرياض سيتي",
  },
  {
    src: "/images/riyadh-city-building-night.webp",
    alt: "صورة جوية ليلية لمبنى الرياض سيتي للشقق الفندقية",
    title: "إطلالة المبنى ليلًا",
    note: "صورة جوية لواجهة المبنى",
  },
  {
    src: "/images/riyadh-city-reception.webp",
    alt: "منطقة الاستقبال في الرياض سيتي للشقق الفندقية",
    title: "الاستقبال",
    note: "منطقة استقبال النزلاء",
  },
  {
    src: "/images/riyadh-city-kitchen.webp",
    alt: "المطبخ المجهز في إحدى شقق الرياض سيتي الفندقية",
    title: "المطبخ المجهز",
    note: "تجهيزات عملية للإقامة",
  },
  {
    src: "/images/riyadh-city-master-bedroom-1.webp",
    alt: "غرفة النوم الرئيسية بسرير مزدوج في شقق الرياض سيتي الفندقية",
    title: "غرفة النوم الرئيسية",
    note: "سرير مزدوج — الزاوية الأولى",
  },
  {
    src: "/images/riyadh-city-master-bedroom-2.webp",
    alt: "زاوية ثانية لغرفة النوم الرئيسية في شقق الرياض سيتي الفندقية",
    title: "غرفة النوم الرئيسية",
    note: "سرير مزدوج — الزاوية الثانية",
  },
  {
    src: "/images/riyadh-city-twin-bedroom.webp",
    alt: "غرفة النوم الثانية بسريرين فرديين في شقق الرياض سيتي الفندقية",
    title: "غرفة النوم الثانية",
    note: "مجهزة بسريرين فرديين",
  },
  {
    src: "/images/riyadh-city-deluxe-living-room.webp",
    alt: "صالة المعيشة الواسعة في شقة الديلوكس بالرياض سيتي",
    title: "صالة شقة الديلوكس",
    note: "صالة معيشة واسعة",
  },
  {
    src: "/images/riyadh-city-superior-living-room.webp",
    alt: "صالة المعيشة في شقة السوبيريور بالرياض سيتي",
    title: "صالة شقة السوبيريور",
    note: "صالة معيشة عملية ومريحة",
  },
  {
    src: "/images/riyadh-city-corridors.webp",
    alt: "الممرات الداخلية واللوحات الإرشادية في الرياض سيتي للشقق الفندقية",
    title: "الممرات الداخلية",
    note: "لوحات إرشادية واضحة",
  },
];

const stayPolicies = [
  "تسجيل الدخول: يبدأ من الساعة 3:00 مساءً.",
  "تسجيل الخروج: بحد أقصى الساعة 1:00 ظهرًا.",
  "الدخول المبكر أو الخروج المتأخر يخضع لتوفر الشقق وموافقة الإدارة، وقد تترتب عليه رسوم إضافية.",
  "يجب إبراز أصل الهوية أو جواز السفر وتسجيل جميع النزلاء لدى الاستقبال.",
  "يُمنع مبيت أو استقبال أشخاص غير مسجلين دون موافقة الإدارة.",
  "يجب سداد قيمة الإقامة قبل استلام الشقة.",
  "يُمنع منعًا باتًا إدخال الأسلحة والذخائر.",
  "يُمنع التدخين داخل الممرات والمصعد.",
  "يُمنع إقامة الحفلات أو التجمعات أو التسبب في إزعاج النزلاء.",
  "يُرجى الالتزام بالهدوء من الساعة 11:00 مساءً حتى 8:00 صباحًا.",
  "يتحمل النزيل مسؤولية أي تلف أو كسر أو فقدان في محتويات الشقة.",
  "يُمنع نقل الأثاث أو إخراج أي من ممتلكات الشقة.",
  "يتحمل أولياء الأمور مسؤولية سلامة ومراقبة الأطفال.",
  "يُرجى المحافظة على النظافة وعدم إلقاء المخلفات أو الزيوت داخل دورات المياه أو أحواض المطبخ.",
  "يحق للإدارة إنهاء الإقامة عند مخالفة التعليمات، دون استرداد المبالغ المدفوعة.",
  "إتمام الحجز أو تسجيل الدخول يُعد موافقة على جميع سياسات المنشأة.",
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedImage(null);
        setMenuOpen(false);
      }
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const subjects: Record<string, string> = {
      booking: "حجز وإقامة",
      units: "أنواع الشقق",
      other: "استفسار عام",
    };
    const subject = String(formData.get("subject") || "booking");
    const message = [
      "مرحبًا، أرغب في الاستفسار عبر موقع الرياض سيتي للشقق الفندقية.",
      `الاسم: ${String(formData.get("name") || "")}`,
      `رقم التواصل: ${String(formData.get("phone") || "")}`,
      `نوع الاستفسار: ${subjects[subject] || subjects.other}`,
      `الرسالة: ${String(formData.get("message") || "")}`,
    ].join("\n");

    window.open(`https://wa.me/967716662727?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
    setSubmitted(true);
  }

  return (
    <main dir="rtl">
      <header className="site-header">
        <a className="brand" href="#home" aria-label="الرياض سيتي - الصفحة الرئيسية">
          <Image
            className="official-logo"
            src={assetPath("/images/riyadh-city-logo.webp")}
            alt="شعار الرياض سيتي للشقق الفندقية"
            width={714}
            height={720}
            priority
            unoptimized
          />
        </a>

        <nav className={menuOpen ? "nav-links is-open" : "nav-links"} aria-label="التنقل الرئيسي">
          <a href="#about" onClick={() => setMenuOpen(false)}>عن المشروع</a>
          <a href="#units" onClick={() => setMenuOpen(false)}>الشقق</a>
          <a href="#gallery" onClick={() => setMenuOpen(false)}>المعرض</a>
          <a href="#policies" onClick={() => setMenuOpen(false)}>سياسات الإقامة</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>التواصل</a>
        </nav>

        <a
          className="header-cta"
          href="https://wa.me/967716662727?text=%D9%85%D8%B1%D8%AD%D8%A8%D9%8B%D8%A7%D8%8C%20%D8%A3%D8%B1%D8%BA%D8%A8%20%D9%81%D9%8A%20%D8%A7%D9%84%D8%A7%D8%B3%D8%AA%D9%81%D8%B3%D8%A7%D8%B1%20%D8%B9%D9%86%20%D8%A7%D9%84%D8%B1%D9%8A%D8%A7%D8%B6%20%D8%B3%D9%8A%D8%AA%D9%8A%20%D9%84%D9%84%D8%B4%D9%82%D9%82%20%D8%A7%D9%84%D9%81%D9%86%D8%AF%D9%82%D9%8A%D8%A9."
          target="_blank"
          rel="noopener noreferrer"
        >
          استفسر الآن <span aria-hidden="true">←</span>
        </a>
        <button
          className="menu-button"
          type="button"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "إغلاق القائمة" : "فتح القائمة"}
          onClick={() => setMenuOpen((value) => !value)}
        >
          <span />
          <span />
        </button>
      </header>

      <section className="hero" id="home" aria-labelledby="hero-title">
        <Image
          className="hero-image"
          src={assetPath("/images/riyadh-city-building-night.webp")}
          alt="صورة جوية ليلية لمبنى الرياض سيتي للشقق الفندقية"
          width={1536}
          height={1024}
          priority
          unoptimized
        />
        <div className="hero-shade" />
        <div className="hero-content page-shell">
          <div
            className="hero-project-name"
            aria-label="الرياض سيتي للشقق الفندقية — Riyadh City Hotel Apartments"
          >
            <strong>الرياض سيتي</strong>
            <small lang="en" dir="ltr">Riyadh City Hotel Apartments</small>
            <span>للشقق الفندقية</span>
          </div>
          <p className="eyebrow"><span /> مشروع ضيافة حديث في الغيضة</p>
          <h1 id="hero-title">إقامة أهدأ.<br /><em>تفاصيل أذكى.</em></h1>
          <p className="hero-lead">
            الرياض سيتي مفهوم معاصر للشقق الفندقية يجمع الراحة والخصوصية
            والتصميم العملي لإقامة يومية أو ممتدة.
          </p>
          <div className="hero-actions">
            <a className="button button-gold" href="#units">استكشف الشقق <span aria-hidden="true">←</span></a>
            <a className="button button-ghost" href="#about">تعرّف على المشروع</a>
          </div>
        </div>
        <div className="hero-facts" aria-label="معلومات مختصرة">
          <div><strong>14</strong><span>شقة فندقية متكاملة</span></div>
          <div><strong>2</strong><span>فئتان من الشقق العائلية</span></div>
          <div><strong>24/7</strong><span>راحة مصممة للإقامة</span></div>
        </div>
        <a className="scroll-cue" href="#about" aria-label="انتقل إلى نبذة المشروع">
          <span>اكتشف</span><i aria-hidden="true" />
        </a>
      </section>

      <section className="about section page-shell" id="about">
        <div className="section-kicker"><span>01</span><p>نبذة المشروع</p></div>
        <div className="about-grid">
          <div className="about-heading">
            <h2>ضيافة عملية،<br />بروح <em>معاصرة.</em></h2>
          </div>
          <div className="about-copy">
            <p className="large-copy">
              صُمّم مشروع الرياض سيتي ليقدّم تجربة إقامة تجمع سهولة الشقة
              واهتمام الخدمة الفندقية، ضمن بيئة أنيقة وهادئة في مدينة الغيضة.
            </p>
            <p>
              يضم الرياض سيتي شققًا مريحة بتوزيع واضح وتشطيبات عملية وهوية
              بصرية دافئة، صُممت لتوفير إقامة عائلية تجمع الراحة والخصوصية.
            </p>
            <div className="about-features">
              <div><span>✦</span><strong>خصوصية</strong><small>توزيع هادئ ومدروس</small></div>
              <div><span>✦</span><strong>مرونة</strong><small>للإقامة القصيرة والممتدة</small></div>
              <div><span>✦</span><strong>موقع</strong><small>في قلب مدينة الغيضة</small></div>
            </div>
          </div>
        </div>
      </section>

      <section className="units section" id="units">
        <div className="page-shell">
          <div className="section-kicker light"><span>02</span><p>أنواع الشقق</p></div>
          <div className="section-intro light-text">
            <h2>مساحات صُممت<br />حول <em>احتياجك.</em></h2>
            <p>خياران عائليان بتجهيز متكامل وتوزيع مدروس، صُمّما ليوفّرا الراحة والخصوصية في كل إقامة.</p>
          </div>
          <div className="unit-list">
            {units.map((unit) => (
              <article className="unit-card" key={unit.number}>
                <div className="unit-number">{unit.number}</div>
                <div className="unit-main">
                  <span className="tag">{unit.label}</span>
                  <h3>{unit.title}</h3>
                  <p>{unit.description}</p>
                </div>
                <dl className="unit-specifications">
                  {unit.specifications.map((specification) => (
                    <div key={specification.label}>
                      <dt>{specification.label}</dt>
                      <dd>{specification.value}</dd>
                    </div>
                  ))}
                </dl>
                <a href="#contact" aria-label={`استفسر عن ${unit.title}`}>استفسر <span aria-hidden="true">↙</span></a>
              </article>
            ))}
          </div>
          <p className="units-footnote">* للاستفسار عن الأسعار وتفاصيل الحجز، تواصل معنا عبر الهاتف أو واتساب.</p>
        </div>
      </section>

      <section className="gallery section page-shell" id="gallery">
        <div className="section-kicker"><span>03</span><p>معرض الصور</p></div>
        <div className="section-intro">
          <h2>لمحة عن<br /><em>التجربة.</em></h2>
          <p>صور فعلية لواجهة المبنى والاستقبال والشقق والممرات الداخلية. اضغط على أي صورة لمشاهدتها بحجم أكبر.</p>
        </div>
        <div className="gallery-grid">
          {gallery.map((image, index) => (
            <button
              className={`gallery-item gallery-item-${index + 1}`}
              type="button"
              onClick={() => setSelectedImage(index)}
              key={image.src}
            >
              <Image src={assetPath(image.src)} alt={image.alt} width={1586} height={992} loading="eager" unoptimized />
              <span className="gallery-overlay">
                <small>{image.note}</small>
                <strong>{image.title}</strong>
                <i aria-hidden="true">＋</i>
              </span>
            </button>
          ))}
          <div className="gallery-quote">
            <span>RC</span>
            <blockquote>«كل إقامة جيدة تبدأ من تفاصيل تشعرك بأن المكان صُمّم لأجلك.»</blockquote>
            <p>هوية الرياض سيتي</p>
          </div>
        </div>
      </section>

      <section className="policies section" id="policies" aria-labelledby="policies-title">
        <div className="page-shell">
          <div className="section-kicker"><span>04</span><p>سياسات الإقامة</p></div>
          <div className="policies-heading">
            <div>
              <h2 id="policies-title">إقامة مريحة،<br /><em>وقواعد واضحة.</em></h2>
              <p>نرحب بكم، ونأمل الالتزام بالتعليمات التالية لضمان راحة وسلامة الجميع.</p>
            </div>
            <div className="policy-highlights" aria-label="أهم مواعيد الإقامة">
              <div><span>تسجيل الدخول</span><strong dir="rtl">3:00 مساءً</strong></div>
              <div><span>تسجيل الخروج</span><strong dir="rtl">1:00 ظهرًا</strong></div>
              <div><span>ساعات الهدوء</span><strong dir="rtl">11:00 مساءً – 8:00 صباحًا</strong></div>
            </div>
          </div>
          <ol className="policies-list">
            {stayPolicies.map((policy, index) => (
              <li key={policy}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <p>{policy}</p>
              </li>
            ))}
          </ol>
          <div className="policies-note">
            <span aria-hidden="true">✦</span>
            <p>شكرًا لتعاونكم، ونتمنى لكم إقامة سعيدة وآمنة.</p>
            <strong>إدارة الرياض سيتي للشقق الفندقية</strong>
          </div>
        </div>
      </section>

      <section className="contact section" id="contact">
        <div className="contact-glow" />
        <div className="page-shell contact-grid">
          <div className="contact-copy">
            <div className="section-kicker light"><span>05</span><p>تواصل معنا</p></div>
            <h2>لنرتّب لك<br /><em>إقامة مريحة.</em></h2>
            <p>للحجز والاستفسار، تواصل معنا مباشرة عبر الهاتف أو واتساب، وسنكون سعداء بخدمتك.</p>
            <div className="contact-methods">
              <div className="phone-method">
                <span>01</span>
                <p>الهاتف<strong dir="ltr"><a href="tel:05611020">05611020</a><i>—</i><a href="tel:05611050">05611050</a></strong></p>
              </div>
              <a
                className="map-link"
                href="https://maps.app.goo.gl/LtMr5WRQPiZa3xeX8"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="فتح موقع الرياض سيتي في خرائط Google"
              >
                <span>02</span>
                <span className="map-pin" aria-hidden="true" />
                <p>الموقع<strong>الغيضة، محافظة المهرة</strong></p>
                <i aria-hidden="true">↗</i>
              </a>
              <a
                className="contact-link"
                href="https://wa.me/967716662727?text=%D9%85%D8%B1%D8%AD%D8%A8%D9%8B%D8%A7%D8%8C%20%D8%A3%D8%B1%D8%BA%D8%A8%20%D9%81%D9%8A%20%D8%A7%D9%84%D8%AD%D8%AC%D8%B2%20%D8%A3%D9%88%20%D8%A7%D9%84%D8%A7%D8%B3%D8%AA%D9%81%D8%B3%D8%A7%D8%B1."
                target="_blank"
                rel="noopener noreferrer"
                aria-label="التواصل مع الرياض سيتي عبر واتساب"
              >
                <span>03</span><p>واتساب<strong dir="ltr">+967 716 662 727</strong></p>
              </a>
              <a
                className="contact-link"
                href="mailto:riyadhcityho@outlook.com"
                aria-label="مراسلة الرياض سيتي عبر البريد الإلكتروني"
              >
                <span>04</span><p>البريد الإلكتروني<strong dir="ltr">riyadhcityho@outlook.com</strong></p>
              </a>
            </div>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            {submitted ? (
              <div className="form-success" role="status">
                <span>✓</span>
                <h3>تم تجهيز رسالتك عبر واتساب</h3>
                <p>أكمل إرسال الرسالة من نافذة واتساب التي تم فتحها.</p>
                <button type="button" onClick={() => setSubmitted(false)}>إرسال استفسار آخر</button>
              </div>
            ) : (
              <>
                <div className="field-row">
                  <label>الاسم الكامل<input name="name" type="text" placeholder="اكتب اسمك" required /></label>
                  <label>رقم التواصل<input name="phone" type="tel" inputMode="tel" placeholder="مثال: 777 000 000" required /></label>
                </div>
                <label>نوع الاستفسار
                  <select name="subject" defaultValue="booking">
                    <option value="booking">حجز وإقامة</option>
                    <option value="units">أنواع الشقق</option>
                    <option value="other">استفسار عام</option>
                  </select>
                </label>
                <label>رسالتك<textarea name="message" rows={4} placeholder="أخبرنا كيف يمكننا مساعدتك" required /></label>
                <button className="button button-gold form-button" type="submit">إرسال عبر واتساب <span aria-hidden="true">←</span></button>
                <small>سيتم فتح واتساب لإرسال بيانات الاستفسار مباشرة.</small>
              </>
            )}
          </form>
        </div>
      </section>

      <footer>
        <div className="page-shell footer-grid">
          <a className="brand footer-brand" href="#home">
            <Image
              className="official-logo"
              src={assetPath("/images/riyadh-city-logo.webp")}
              alt="شعار الرياض سيتي للشقق الفندقية"
              width={714}
              height={720}
              unoptimized
            />
          </a>
          <p>© 2026 الرياض سيتي للشقق الفندقية — الغيضة، محافظة المهرة. جميع الحقوق محفوظة.</p>
          <a href="#home">العودة للأعلى ↑</a>
        </div>
      </footer>

      {selectedImage !== null && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={gallery[selectedImage].title} onClick={() => setSelectedImage(null)}>
          <button type="button" aria-label="إغلاق الصورة" onClick={() => setSelectedImage(null)}>×</button>
          <figure onClick={(event) => event.stopPropagation()}>
            <Image src={assetPath(gallery[selectedImage].src)} alt={gallery[selectedImage].alt} width={1586} height={992} unoptimized />
            <figcaption><strong>{gallery[selectedImage].title}</strong><span>{gallery[selectedImage].note}</span></figcaption>
          </figure>
        </div>
      )}
    </main>
  );
}
