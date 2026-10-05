import React, { useState, useEffect } from 'react';

type Currency = 'IDR' | 'USD';
type Category = 'web' | 'wisuda' | 'sidang' | 'metatah' | 'event' | 'drone';
type MetaGroup = 'software' | 'creative';

interface PricelistSectionProps {
  locale?: 'id' | 'en';
}

interface PriceCardProps {
  title: string;
  price: string;
  anchorPrice?: string;
  badge?: string;
  outputs: string[];
  ctaLink: string;
  ctaText: string;
}

export const PricelistSection: React.FC<PricelistSectionProps> = ({ locale = 'id' }) => {
  const [activeMetaGroup, setActiveMetaGroup] = useState<MetaGroup>('software');
  const [activeTab, setActiveTab] = useState<Category>('web');
  const [currency, setCurrency] = useState<Currency>('IDR');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [isRetainerActive, setIsRetainerActive] = useState<boolean>(false);

  // Listen to external smooth scroll trigger from portfolio tabs
  useEffect(() => {
    const handleTabChangeEvent = (e: Event) => {
      const customEvent = e as CustomEvent;
      const targetCategory = customEvent.detail as Category;
      if (['web'].includes(targetCategory)) {
        setActiveMetaGroup('software');
      } else {
        setActiveMetaGroup('creative');
      }
      setActiveTab(targetCategory);
    };

    window.addEventListener('change-pricelist-tab', handleTabChangeEvent);
    return () => window.removeEventListener('change-pricelist-tab', handleTabChangeEvent);
  }, []);

  const phone = '6283196445746';

  const getWaLink = (message: string) => {
    return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  };

  const isId = locale === 'id';

  const content = {
    title: isId ? 'Daftar Harga & Layanan' : 'Pricing & Services',
    subtitle: isId
      ? 'Pilih kategori layanan web development atau dokumentasi visual sesuai kebutuhanmu'
      : 'Select web development or visual documentation service categories tailored to your needs',
    addonsTitle: isId ? 'Add-Ons & Extras' : 'Add-Ons & Extras',
    addonsSubtitle: isId
      ? 'Layanan tambahan opsional yang bisa dikombinasikan dengan paket utama'
      : 'Optional additional services that can be combined with the main package',
    faqTitle: isId ? 'Pertanyaan Umum & Ketentuan (FAQ)' : 'Frequently Asked Questions (FAQ)',
    ctaBtn: isId ? 'Pesan / Konsultasi ↗' : 'Book / Consult ↗',
  };

  // ADD-ONS
  const webAddons = [
    {
      title: isId ? 'Setup Domain & Hosting' : 'Domain & Hosting Setup',
      desc: isId
        ? 'Pemasangan SSL, konfigurasi DNS (Cloudflare/Vercel/GCP), & setup custom domain.'
        : 'SSL setup, DNS configuration (Cloudflare/Vercel/GCP), & custom domain setup.',
      price: currency === 'IDR' ? 'Rp 499.000' : '$39',
    },
    {
      title: isId ? 'Pengerjaan Kilat (Express Delivery)' : 'Express Delivery / Priority Sprint',
      desc: isId
        ? 'Pengerjaan kilat web application / landing page dengan prioritas pengerjaan utama.'
        : 'Priority high-speed development for web applications or landing pages.',
      price: currency === 'IDR' ? 'Rp 999.000' : '$79',
    },
    {
      title: isId ? 'Sesi Revisi Tambahan' : 'Revision Pass Extra',
      desc: isId
        ? 'Tambahan 2x sesi revisi fitur/desain major di luar kuota paket bawaan.'
        : 'Additional 2x major revision sessions beyond the standard package quota.',
      price: currency === 'IDR' ? 'Rp 349.000' : '$29',
    },
  ];

  const videoAddons = [
    {
      title: isId ? 'Pengiriman Kilat (24-48 Jam)' : 'Express Delivery (24-48 Hours)',
      desc: isId
        ? 'Pengerjaan kilat penyerahan foto & video editan dalam 24-48 jam setelah acara.'
        : 'Express editing and file delivery for photos & videos within 24-48 hours.',
      price: currency === 'IDR' ? 'Rp 249.000' : '$19',
    },
    {
      title: isId ? 'Akses Berkas Mentah RAW' : 'RAW File Access (All Footage)',
      desc: isId
        ? 'Penyerahan seluruh berkas mentah video/foto & project files (Premiere/Davinci).'
        : 'Access to all raw unedited photos, video footage & project source files.',
      price: currency === 'IDR' ? 'Rp 299.000' : '$24',
    },
    {
      title: isId ? 'Paket VIP Priority (RAW + Kilat)' : 'VIP Priority Pass (RAW + Express)',
      desc: isId
        ? 'Bundle hemat penyerahan kilat 24-48 jam sekaligus seluruh berkas mentah RAW.'
        : 'Savings bundle including 24-48hr express delivery and all unedited RAW files.',
      price: currency === 'IDR' ? 'Rp 449.000' : '$34',
    },
  ];

  // FAQ PER KATEGORI
  const faqsData: Record<Category, { q: string; a: string }[]> = {
    web: [
      {
        q: isId
          ? 'Apa saja yang termasuk dalam layanan Retainer / Monthly Maintenance Web?'
          : 'What is included in the Web Retainer / Monthly Maintenance service?',
        a: isId
          ? '• Layanan retainer mencakup pemeliharaan rutin seperti backup data/database, pembaruan keamanan/framework, pemantauan uptime server, perbaikan bug/error, serta pembaruan konten minor (ganti teks/gambar/produk).\n• Layanan ini bertujuan menjaga performa web tetap stabil dan aman setiap bulan.'
          : '• Retainer services include routine maintenance such as database backups, security updates, server uptime monitoring, bug fixes, and minor content updates.\n• Keeps your web application performing optimally and securely.',
      },
      {
        q: isId
          ? 'Apakah layanan Retainer mencakup pembuatan fitur baru skala besar?'
          : 'Does the Retainer service include building major new features?',
        a: isId
          ? '• Tidak. Layanan retainer berfokus pada maintenance, keamanan, dan support operasional bulanan.\n• Pembuatan fitur baru skala besar (misal: integrasi payment gateway baru, modul admin baru, atau redesign) akan dihitung sebagai project terpisah dengan harga diskon khusus klien retainer.'
          : '• No. Retainer focuses on maintenance, security, and monthly operational support.\n• Major new feature development is quoted separately with special client discounts.',
      },
      {
        q: isId
          ? 'Apakah kuota jam kerja bulanan Retainer yang tidak terpakai bisa di-rollover?'
          : 'Can unused monthly retainer hours be rolled over to the next month?',
        a: isId
          ? '• Kuota jam kerja retainer berlaku per bulan berjalan dan TIDAK dapat diakumulasikan (rollover) ke bulan berikutnya.\n• Hal ini agar alokasi kapasitas teknis tetap terencana dengan baik setiap bulannya.'
          : '• Monthly retainer hours apply for the current month only and DO NOT roll over to the next month.',
      },
      {
        q: isId
          ? 'Apakah biaya paket awal sudah termasuk domain & hosting tahun berikutnya?'
          : 'Does the initial package price include domain and hosting for subsequent years?',
        a: isId
          ? '• Biaya paket pengembangan awal mencakup jasa pembuatan web dan setup/konfigurasi hosting & domain untuk TAHUN PERTAMA.\n• Biaya perpanjangan (renewal) domain & hosting di tahun berikutnya ditanggung oleh klien.'
          : '• Initial package covers development and first-year setup.\n• Renewal fees for domain/hosting from year 2 onward are client’s responsibility.',
      },
      {
        q: isId
          ? 'Bagaimana dengan kepemilikan source code dan garansi perbaikan bug?'
          : 'What about source code ownership and bug warranties?',
        a: isId
          ? '• Setelah pelunasan 100%, seluruh source code dan repositori GitHub menjadi hak milik kamu sepenuhnya.\n• Garansi perbaikan bug/error gratis berlaku selama 30 hari sejak web diluncurkan (launching).'
          : '• Full GitHub repo & source code ownership is transferred 100% after final payment.\n• Free 30-day bug fix warranty applies post-launch.',
      },
    ],
    wisuda: [
      {
        q: isId
          ? 'Bagaimana alur DP, pelunasan, dan pembatalan/reschedule tanggal?'
          : 'What is the payment, cancellation, and rescheduling policy?',
        a: isId
          ? '• Slot jadwal resmi terikat setelah pembayaran DP sebesar 50%.\n• Sisa pelunasan 50% dilakukan di Hari-H tepat setelah sesi foto/video selesai.\n• Jika terjadi perubahan jadwal kampus, konfirmasi minimal H-3 untuk koordinasi slot ulang. DP bersifat non-refundable untuk pembatalan sepihak.'
          : '• Event date is locked upon paying a 50% DP.\n• Balance is settled on the event day right after the shoot.\n• Reschedule notification required at least 3 days prior.',
      },
      {
        q: isId
          ? 'Berapa lama estimasi waktu pengerjaan dan pengiriman file?'
          : 'How long is the editing process and file delivery?',
        a: isId
          ? '• Hasil foto editan & video Reels dikirim via Google Drive dalam 2–3 hari kerja (H+2/H+3).\n• Butuh cepat? Tersedia opsi Add-on Express Delivery (24–48 Jam).'
          : '• Final deliverables sent via Google Drive link within 2-3 business days.\n• Express Delivery Add-on (24-48 Hours) is available.',
      },
      {
        q: isId
          ? 'Apakah diperbolehkan foto bersama keluarga atau teman kelompok?'
          : 'Can I take photos with family or group of friends?',
        a: isId
          ? '• Sangat boleh! Dalam durasi liputan yang dipesan, kamu bebas membagi waktu foto untuk solo portrait, foto bersama keluarga, maupun teman-teman.'
          : '• Yes! Within the booked duration, you can freely divide time for solo, family, and group photos.',
      },
    ],
    sidang: [
      {
        q: isId
          ? 'Bagaimana jika jadwal pembacaan hasil sidang saya molor dari jam estimasi?'
          : 'What if my thesis defense schedule is delayed?',
        a: isId
          ? '• Kami memberikan toleransi penyesuaian waktu (grace period) hingga 30 menit. Mohon selalu berikan kabar terbaru di lokasi via WhatsApp.'
          : '• We provide up to a 30-minute grace period for delays. Please keep us updated via WhatsApp.',
      },
      {
        q: isId
          ? 'Apakah ada biaya transportasi tambahan untuk kampus di luar Denpasar?'
          : 'Is there a travel fee for campuses outside Denpasar?',
        a: isId
          ? '• Harga paket berlaku untuk area Denpasar & Badung Selatan.\n• Untuk kampus di luar area tersebut (Singaraja, Tabanan, Gianyar, dll.), dikenakan biaya transportasi nominal yang disepakati di awal.'
          : '• Applies for Denpasar & South Badung. Nominal travel fee applies for other areas.',
      },
    ],
    metatah: [
      {
        q: isId
          ? 'Rangkaian acara apa saja yang tercakup dalam durasi liputan Metatah?'
          : 'What traditional rituals are included in the Metatah coverage?',
        a: isId
          ? '• Paket 4 Jam (Half Day) mencakup: persiapan/rias, prosesi utama metatah di bale, hingga foto bersama keluarga besar.'
          : '• The 4-hour coverage covers preparation/makeup, main ceremony at bale, and family portraits.',
      },
      {
        q: isId
          ? 'Apakah ada batasan jumlah foto yang di-edit untuk paket Metatah?'
          : 'How many photos will be edited for Metatah?',
        a: isId
          ? '• Kamu menerima SELURUH file foto original JPG, plus 30 foto editan pilihan (pencahayaan & color grading).\n• Video highlight dikirim dalam format MP4 HD/4K berdurasi 2–3 menit.'
          : '• You get ALL original JPG photos + 30 edited photos. Video highlight is 2-3 minutes duration.',
      },
      {
        q: isId
          ? 'Apakah ada tambahan biaya akomodasi untuk wilayah Bali luar Denpasar?'
          : 'Is there an additional fee for locations outside Denpasar?',
        a: isId
          ? '• Untuk lokasi upacara di area Bali Tengah, Utara, atau Timur (seperti Singaraja, Karangasem, Tabanan Barat) dikenakan biaya tambahan transportasi & operasional sesuai jarak.'
          : '• Nominal travel/accommodation charges apply for locations outside Greater Denpasar based on distance.',
      },
    ],
    event: [
      {
        q: isId
          ? 'Berapa banyak foto yang akan saya dapatkan dari dokumentasi Event?'
          : 'How many photos will I receive from Event documentation?',
        a: isId
          ? '• Kami menyerahkan SELURUH file foto JPG berpotensi bagus yang diambil selama event (tanpa batasan kaku, rata-rata 100–300+ foto per event).\n• Catatan: Foto event diserahkan dalam format JPG asli dari kamera (tanpa proses color correction/grading).'
          : '• We deliver all good JPG photo files taken during the event (no rigid limit, average 100–300+ photos per event).\n• Note: Photos are delivered in original JPG format without color correction/grading.',
      },
      {
        q: isId
          ? 'Bagaimana aturan dan perhitungan biaya jika acara melebihi durasi (Overtime)?'
          : 'How is overtime calculated if the event runs longer?',
        a: isId
          ? '• Biaya overtime dikenakan flat sebesar Rp 220.000 / jam (dihitung per jam liputan acara, bukan dikali jumlah crew).\n• Contoh: Jika kamu mengambil paket Foto + Video (2 crew) dan overtime 1 jam, biayanya tetap Rp 220.000.'
          : '• Overtime fee is flat at Rp 220,000 / hour (charged per extra hour, NOT per crew member).',
      },
      {
        q: isId
          ? 'Berapa lama waktu penyerahan berkas video & foto Event?'
          : 'How long is the file delivery for Event photos & videos?',
        a: isId
          ? '• Seluruh foto JPG akan diunggah ke Google Drive maksimal H+2 setelah event.\n• Untuk video editan (Highlight/Reels), estimasi pengerjaan adalah 3–5 hari kerja.'
          : '• All JPG photos delivered via Google Drive within D+2. Video editing takes 3-5 business days.',
      },
    ],
    drone: [
      {
        q: isId
          ? 'Apakah sewa Drone DJI Neo 2 sudah termasuk pilot?'
          : 'Does the DJI Neo 2 drone rental include a pilot?',
        a: isId
          ? '• Ya, harga sewa sudah termasuk Pilot Drone berpengalaman demi keamanan perangkat dan hasil visual aerial yang presisi.'
          : '• Yes, price includes an experienced drone pilot for safety and optimal aerial footage.',
      },
      {
        q: isId
          ? 'Bagaimana jika kondisi cuaca di lokasi buruk (hujan / angin kencang)?'
          : 'What happens if weather conditions are bad?',
        a: isId
          ? '• Penerbangan drone sangat bergantung pada keselamatan. Jika cuaca buruk, penerbangan ditunda sementara atau dialihkan ke slot waktu lain pada hari yang sama.'
          : '• Drone flight depends on weather safety. Flights will be rescheduled or adjusted if conditions are bad.',
      },
    ],
  };

  const currentAddons = activeTab === 'web' ? webAddons : videoAddons;
  const currentFaqs = faqsData[activeTab];

  return (
    <section id="pricelist" className="py-8 px-2 max-w-6xl mx-auto text-neutral-100 space-y-10">
      {/* HEADER & CONTROLS */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-2">{content.title}</h2>
          <p className="text-neutral-400 text-sm md:text-base">{content.subtitle}</p>
        </div>

        {/* CURRENCY TOGGLE */}
        <div className="flex bg-neutral-900 border border-neutral-800 rounded-xl p-1 text-xs font-mono font-bold">
          <button
            onClick={() => setCurrency('IDR')}
            className={`px-3 py-1.5 rounded-lg transition ${
              currency === 'IDR' ? 'bg-white text-black shadow' : 'text-neutral-400 hover:text-white'
            }`}
          >
            IDR (Rp)
          </button>
          <button
            onClick={() => setCurrency('USD')}
            className={`px-3 py-1.5 rounded-lg transition ${
              currency === 'USD' ? 'bg-white text-black shadow' : 'text-neutral-400 hover:text-white'
            }`}
          >
            USD ($)
          </button>
        </div>
      </div>

      {/* META-GROUP SEPARATOR (CHOICE OVERLOAD MITIGATION) */}
      <div className="flex flex-col items-center space-y-3">
        <div className="flex bg-neutral-900/90 border border-neutral-800 rounded-2xl p-1.5 w-full max-w-md shadow-lg">
          <button
            onClick={() => {
              setActiveMetaGroup('software');
              setActiveTab('web');
              setOpenFaq(null);
            }}
            className={`flex-1 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition ${
              activeMetaGroup === 'software'
                ? 'bg-gradient-to-r from-blue-600 to-navy-600 text-white shadow-md'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            {isId ? ' Software & Web' : ' Software & Web'}
          </button>
          <button
            onClick={() => {
              setActiveMetaGroup('creative');
              setActiveTab('wisuda');
              setOpenFaq(null);
            }}
            className={`flex-1 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition ${
              activeMetaGroup === 'creative'
                ? 'bg-gradient-to-r from-navy-600 to-indigo-600 text-white shadow-md'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            {isId ? ' Visual & Creative' : ' Visual & Creative'}
          </button>
        </div>

        {/* SUB-TABS BASED ON ACTIVE META GROUP (Hanya muncul jika di kategori Creative) */}
        <div className="flex flex-wrap justify-center gap-2 pt-2">
          {activeMetaGroup === 'creative' && (
            [
              { id: 'wisuda', label: isId ? 'Wisuda' : 'Graduation' },
              { id: 'sidang', label: isId ? 'Sidang TA & Yudisium' : 'Thesis Defense' },
              { id: 'metatah', label: 'Metatah' },
              { id: 'event', label: 'Event' },
              { id: 'drone', label: 'Drone Neo 2' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as Category);
                  setOpenFaq(null);
                }}
                className={`px-4 py-2 rounded-xl font-medium text-xs md:text-sm transition ${
                  activeTab === tab.id
                    ? 'bg-white text-black shadow-lg font-semibold'
                    : 'bg-neutral-800/80 text-neutral-400 hover:text-white hover:bg-neutral-800'
                }`}
              >
                {tab.label}
              </button>
            ))
          )}
        </div>
      </div>

      {/* RETAINER TOGGLE FOR WEB & SCARCITY BANNER */}
      {activeTab === 'web' && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-gradient-to-r from-blue-950/40 via-neutral-900 to-navy-950/40 border border-blue-500/20">
          <div className="text-xs text-blue-200 text-center sm:text-left">
           <strong>{isId ? 'Terbatas:' : 'Scarcity Alert:'}</strong> {isId ? 'Hanya menerima 2 proyek Custom Web per bulan untuk menjaga kualitas pengerjaan.' : 'Limited: Accepting only 2 Custom Web projects per month to ensure quality.'}
          </div>
          <div className="flex items-center gap-3 bg-neutral-900 border border-neutral-700 px-4 py-2 rounded-xl">
            <span className={`text-xs font-bold ${!isRetainerActive ? 'text-white' : 'text-neutral-400'}`}>
              {isId ? 'Paket One-Time' : 'One-Time Plan'}
            </span>
            <button
              onClick={() => setIsRetainerActive(!isRetainerActive)}
              className={`w-12 h-6 flex items-center rounded-full p-1 duration-300 cursor-pointer ${
                isRetainerActive ? 'bg-emerald-500' : 'bg-neutral-700'
              }`}
              aria-label="Toggle Retainer Mode"
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ${
                  isRetainerActive ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
            <span className={`text-xs font-bold ${isRetainerActive ? 'text-emerald-400' : 'text-neutral-400'}`}>
              {isId ? 'Mode Retainer (Maintenance)' : 'Retainer Mode'}
            </span>
          </div>
        </div>
      )}

      {/* CARDS GRID */}
      <div
        className={`grid gap-6 mx-auto ${
          activeTab === 'drone'
            ? 'max-w-md grid-cols-1'
            : 'max-w-6xl grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
        }`}
      >
        {/* WEB DEVELOPMENT */}
        {activeTab === 'web' && (
          <>
            <PriceCard
              title={isId ? 'Landing Page & Company Profile' : 'Landing Page & Company Profile'}
              price={currency === 'IDR' ? 'Rp 2.500.000' : '$250'}
              ctaText={content.ctaBtn}
              outputs={
                isId
                  ? [
                      'Cocok untuk: Company Profile, Portfolio, & UMKM',
                      '1-3 Halaman Web Responsif & Performa Tinggi',
                      'UI/UX Modern & Animasi Interactive',
                      'Integrasi Formulir / WhatsApp Direct',
                      'SEO Dasar & Google Indexing',
                      '2x Sesi Revisi Major',
                      'Bebas Biaya Maintenance Bulan Ke-1',
                    ]
                  : [
                      'Best for: Company Profile, Portfolio, & Small Business',
                      '1-3 High-Performance Responsive Pages',
                      'Modern UI/UX & Interactive Animations',
                      'Form Integration / WhatsApp Direct',
                      'Basic SEO & Google Indexing',
                      '2x Major Revision Sessions',
                      '1st Month Free Maintenance',
                    ]
              }
              ctaLink={getWaLink(
                isId
                  ? 'Halo Justin, saya tertarik dengan paket Landing Page & Company Profile.'
                  : 'Hello Justin, I am interested in the Landing Page & Company Profile package.'
              )}
            />
            <PriceCard
              title={isId ? 'Custom Web Application & System' : 'Custom Web Application & System'}
              anchorPrice={isRetainerActive ? (currency === 'IDR' ? 'Rp 14.000.000' : '$1,400') : (currency === 'IDR' ? 'Rp 10.500.000' : '$1,100')}
              price={
                isRetainerActive
                  ? (currency === 'IDR' ? 'Rp 7.500.000 + Rp 1.500.000/Bln' : '$850 + $120/Mo')
                  : (currency === 'IDR' ? 'Mulai Rp 7.500.000' : '$850+')
              }
              badge={isRetainerActive ? (isId ? 'Retainer Bundled' : 'Retainer Bundled') : 'Recommended'}
              ctaText={content.ctaBtn}
              outputs={
                isId
                  ? [
                      'Cocok untuk: E-voting, Portal Registrasi, E-commerce, & SaaS',
                      'Arsitektur Sistem Kompleks, Database Scalable, & API Integration',
                      'Dashboard Admin & Hak Akses Pengguna',
                      'Sistem Login / Autentikasi & Keamanan Data',
                      'Setup & Deployment Cloud Infrastructure',
                      '4x Sesi Revisi Major',
                      isRetainerActive ? 'Termasuk Maintenance Rutin Bulanan & Uptime Monitoring' : 'Garansi Bug Fix 30 Hari & 100% Hak Milik Source Code',
                    ]
                  : [
                      'Best for: E-voting, Registration Portals, E-commerce, & SaaS',
                      'Complex System Architecture, Scalable Database, & API Integration',
                      'Admin Dashboard & User Access Control',
                      'Authentication / Login System & Security',
                      'Cloud Infrastructure Setup & Deployment',
                      '4x Major Revision Sessions',
                      isRetainerActive ? 'Includes Monthly Routine Maintenance & Uptime Monitoring' : '30-Day Bug Fix Warranty & 100% Full Code Ownership',
                    ]
              }
              ctaLink={getWaLink(
                isId
                  ? `Halo Justin, saya ingin memesan paket Custom Web Application ${isRetainerActive ? 'dengan opsi Retainer Bulanan' : ''}.`
                  : `Hello Justin, I would like to order the Custom Web Application package ${isRetainerActive ? 'with Monthly Retainer option' : ''}.`
              )}
            />
            <PriceCard
              title={isId ? 'Monthly Web Retainer & Maintenance' : 'Monthly Web Retainer & Maintenance'}
              price={currency === 'IDR' ? 'Mulai Rp 750.000 / Bln' : '$55 / Mo'}
              badge="Peace of Mind"
              ctaText={content.ctaBtn}
              outputs={
                isId
                  ? [
                      'Cocok untuk: Web yang sudah berjalan & butuh pengawasan',
                      'Rutinitas Backup Database & Files Bulanan',
                      'Monitoring Uptime & Patch Keamanan Server',
                      'Garansi Perbaikan Bug / System Error Active',
                      'Pembaruan Konten Minor (Teks/Gambar/Produk)',
                      'Priority Technical Support Via WhatsApp',
                      'Diskon 15% untuk Request Pengembangan Fitur Baru',
                    ]
                  : [
                      'Best for: Established websites needing continuous care',
                      'Routine Monthly Database & Files Backup',
                      'Uptime Monitoring & Security Patch Updates',
                      'Active Bug & System Error Fix Warranty',
                      'Minor Content Updates (Text/Image/Products)',
                      'Priority Technical Support via WhatsApp',
                      '15% Off Discount for New Feature Requests',
                    ]
              }
              ctaLink={getWaLink(
                isId
                  ? 'Halo Justin, saya berminat berlangganan paket Monthly Web Retainer & Maintenance.'
                  : 'Hello Justin, I am interested in subscribing to the Monthly Web Retainer & Maintenance package.'
              )}
            />
          </>
        )}

        {/* WISUDA */}
        {activeTab === 'wisuda' && (
          <>
            <PriceCard
              title={isId ? 'Foto Saja (1 Jam)' : 'Photo Only (1 Hour)'}
              price={currency === 'IDR' ? 'Rp 495.000' : '$33'}
              ctaText={content.ctaBtn}
              outputs={
                isId
                  ? ['Durasi Maksimal 1 Jam Liputan', '30 Foto Edit (Grading/Touchup)', 'Semua File Original JPG']
                  : ['1 Hour Max Coverage', '30 Edited Photos (Grading/Touchup)', 'All Original JPG Files']
              }
              ctaLink={getWaLink(
                isId
                  ? 'Halo Justin, saya mau booking paket Wisuda Foto Saja.'
                  : 'Hello Justin, I would like to book the Graduation Photo Only package.'
              )}
            />
            <PriceCard
              title={isId ? 'Video Saja (1 Jam)' : 'Video Only (1 Hour)'}
              price={currency === 'IDR' ? 'Rp 935.000' : '$61'}
              ctaText={content.ctaBtn}
              outputs={
                isId
                  ? ['Durasi Maksimal 1 Jam Liputan', '1 Video Cinematic Reels/TikTok (30-60 detik)', 'Semua Raw Footage (File Mentah)']
                  : ['1 Hour Max Coverage', '1 Cinematic Reels/TikTok Video (30-60s)', 'All Raw Footage Files']
              }
              ctaLink={getWaLink(
                isId
                  ? 'Halo Justin, saya mau booking paket Wisuda Video Saja.'
                  : 'Hello Justin, I would like to book the Graduation Video Only package.'
              )}
            />
            <PriceCard
              title={isId ? 'Bundling Foto + Video (1 Jam)' : 'Photo + Video Bundle (1 Hour)'}
              anchorPrice={currency === 'IDR' ? 'Rp 1.430.000' : '$94'}
              price={currency === 'IDR' ? 'Rp 1.100.000' : '$72'}
              badge={isId ? 'Paling Laris (Best Value)' : 'Best Value'}
              ctaText={content.ctaBtn}
              outputs={
                isId
                  ? [
                      'Durasi Maksimal 1 Jam Liputan',
                      '1 Fotografer + 1 Videografer (2 Crew)',
                      '30 Foto Edit + Semua File Original JPG',
                      '1 Video Cinematic Reels/TikTok (30-60 detik)',
                      'Semua Raw Footage Video',
                      'Garansi Penyerahan File Tepat Waktu (H+3)',
                    ]
                  : [
                      '1 Hour Max Coverage',
                      '1 Photographer + 1 Videographer (2 Crew)',
                      '30 Edited Photos + All Original JPGs',
                      '1 Cinematic Reels/TikTok Video (30-60s)',
                      'All Raw Video Footage',
                      'Guaranteed On-Time Delivery (D+3)',
                    ]
              }
              ctaLink={getWaLink(
                isId
                  ? 'Halo Justin, saya mau booking paket Bundling Wisuda Foto + Video.'
                  : 'Hello Justin, I would like to book the Graduation Photo + Video Bundle.'
              )}
            />
          </>
        )}

        {/* SIDANG TA */}
        {activeTab === 'sidang' && (
          <>
            <PriceCard
              title={isId ? 'Foto Saja' : 'Photo Only'}
              price={currency === 'IDR' ? 'Mulai Rp 165.000' : 'From $11'}
              ctaText={content.ctaBtn}
              outputs={[
                '30 Mins: Rp 165.000 ($11)',
                '45 Mins: Rp 248.000 ($17)',
                '1 Hour (Best Value): Rp 275.000 ($20)',
                isId ? 'Semua Foto Original JPG Dikirimkan' : 'All Original JPG Photos Delivered',
              ]}
              ctaLink={getWaLink(
                isId
                  ? 'Halo Justin, saya mau booking paket Sidang TA Foto Saja.'
                  : 'Hello Justin, I would like to book the Thesis Defense Photo Only package.'
              )}
            />
            <PriceCard
              title={isId ? 'Video Saja' : 'Video Only'}
              price={currency === 'IDR' ? 'Mulai Rp 220.000' : 'From $15.50'}
              ctaText={content.ctaBtn}
              outputs={[
                '30 Mins: Rp 220.000 ($15.50)',
                '45 Mins: Rp 341.000 ($23)',
                '1 Hour (Best Value): Rp 385.000 ($26.50)',
                isId ? 'Output: 1 Video Dokumentasi / Short Reels' : 'Output: 1 Short Doc / Reels Video',
              ]}
              ctaLink={getWaLink(
                isId
                  ? 'Halo Justin, saya mau booking paket Sidang TA Video Saja.'
                  : 'Hello Justin, I would like to book the Thesis Defense Video Only package.'
              )}
            />
            <PriceCard
              title={isId ? 'Bundling Foto + Video (1 Jam)' : 'Photo + Video Bundle (1 Hour)'}
              anchorPrice={currency === 'IDR' ? 'Rp 660.000' : '$46'}
              price={currency === 'IDR' ? 'Rp 495.000' : '$33'}
              badge={isId ? 'Paling Hemat' : 'Best Value'}
              ctaText={content.ctaBtn}
              outputs={
                isId
                  ? [
                      'Durasi 1 Jam Liputan Lengkap',
                      'Dokumentasi Foto + Video oleh Tim',
                      '1 Video Dokumentasi / Reels Pendek',
                      'Semua File Mentah & Edited',
                      'Garansi Penyerahan Tepat Waktu (H+3)',
                    ]
                  : [
                      '1 Hour Full Coverage',
                      'Photo + Video Documentation by Crew',
                      '1 Short Video Doc / Reels',
                      'All Raw & Edited Files',
                      'Guaranteed On-Time Delivery (D+3)',
                    ]
              }
              ctaLink={getWaLink(
                isId
                  ? 'Halo Justin, saya mau booking paket Bundling Sidang TA.'
                  : 'Hello Justin, I would like to book the Thesis Defense Bundle package.'
              )}
            />
          </>
        )}

        {/* METATAH */}
        {activeTab === 'metatah' && (
          <>
            <PriceCard
              title={isId ? 'Foto Saja' : 'Photo Only'}
              price={currency === 'IDR' ? 'Rp 500.000' : '$35'}
              ctaText={content.ctaBtn}
              outputs={
                isId
                  ? ['Durasi Liputan Maksimal 4 Jam', '30 Foto Editan', 'Semua File Foto Original JPG']
                  : ['Max 4 Hours Coverage', '30 Edited Photos', 'All Original JPG Photo Files']
              }
              ctaLink={getWaLink(
                isId
                  ? 'Halo Justin, saya mau booking paket Metatah Foto Saja.'
                  : 'Hello Justin, I would like to book the Metatah Photo Only package.'
              )}
            />
            <PriceCard
              title={isId ? 'Video Saja' : 'Video Only'}
              price={currency === 'IDR' ? 'Rp 850.000' : '$58'}
              ctaText={content.ctaBtn}
              outputs={
                isId
                  ? ['Durasi Liputan Maksimal 4 Jam', '1 Video Highlight (Durasi 2-3 Menit)', 'Semua Raw Footage Video']
                  : ['Max 4 Hours Coverage', '1 Highlight Video (2-3 Mins Duration)', 'All Raw Video Footage']
              }
              ctaLink={getWaLink(
                isId
                  ? 'Halo Justin, saya mau booking paket Metatah Video Saja.'
                  : 'Hello Justin, I would like to book the Metatah Video Only package.'
              )}
            />
            <PriceCard
              title={isId ? 'Bundling Foto + Video' : 'Photo + Video Bundle'}
              anchorPrice={currency === 'IDR' ? 'Rp 1.350.000' : '$93'}
              price={currency === 'IDR' ? 'Rp 1.100.000' : '$75'}
              badge={isId ? 'Paket Lengkap' : 'Full Package'}
              ctaText={content.ctaBtn}
              outputs={
                isId
                  ? [
                      'Durasi Liputan Maksimal 4 Jam',
                      'Semua Foto Original JPG',
                      '30 Foto Editan Spesial',
                      '1 Video Highlight Durasi 2-3 Menit',
                      'Garansi Momen Sakral Adat Ter-cover 100%',
                    ]
                  : [
                      'Max 4 Hours Coverage',
                      'All Original JPG Photos',
                      '30 Special Edited Photos',
                      '1 Highlight Video (2-3 Mins Duration)',
                      '100% Sacred Ceremony Coverage Guarantee',
                    ]
              }
              ctaLink={getWaLink(
                isId
                  ? 'Halo Justin, saya mau booking paket Bundling Metatah Foto + Video.'
                  : 'Hello Justin, I would like to book the Metatah Photo + Video Bundle.'
              )}
            />
          </>
        )}

        {/* EVENT */}
        {activeTab === 'event' && (
          <>
            <PriceCard
              title={isId ? 'Foto Event' : 'Event Photography'}
              price={currency === 'IDR' ? 'Mulai Rp 1.650.000' : 'From $110'}
              ctaText={content.ctaBtn}
              outputs={[
                'Half Day (4 Hours): Rp 1.650.000 ($110)',
                'Full Day (8 Hours): Rp 3.300.000 ($220)',
                isId ? 'Overtime: Rp 220.000 / Jam' : 'Overtime: Rp 220.000 / Hour',
                isId ? 'Semua Hasil Foto Asli (JPG)' : 'All Original Photo Files (JPG)',
              ]}
              ctaLink={getWaLink(
                isId
                  ? 'Halo Justin, saya tertarik dengan paket Foto Event.'
                  : 'Hello Justin, I am interested in the Event Photography package.'
              )}
            />
            <PriceCard
              title={isId ? 'Video Event' : 'Event Videography'}
              price={currency === 'IDR' ? 'Mulai Rp 2.200.000' : 'From $148'}
              ctaText={content.ctaBtn}
              outputs={[
                'Half Day (4 Hours): Rp 2.200.000 ($148)',
                'Full Day (8 Hours): Rp 4.400.000 ($297)',
                isId ? 'Overtime: Rp 220.000 / Jam' : 'Overtime: Rp 220.000 / Hour',
                '+ Add-on Drone Neo 2: Rp 399.000 ($27)',
              ]}
              ctaLink={getWaLink(
                isId
                  ? 'Halo Justin, saya tertarik dengan paket Video Event.'
                  : 'Hello Justin, I am interested in the Event Videography package.'
              )}
            />
            <PriceCard
              title={isId ? 'Foto + Video Event' : 'Event Photo + Video'}
              anchorPrice={currency === 'IDR' ? 'Rp 7.700.000 (Full Day)' : '$517'}
              price={currency === 'IDR' ? 'Mulai Rp 3.850.000' : 'From $258.50'}
              badge={isId ? 'Tim Lengkap' : 'Full Crew'}
              ctaText={content.ctaBtn}
              outputs={[
                'Half Day (4 Hours): Rp 3.850.000 ($258.50)',
                'Full Day (8 Hours): Rp 7.150.000 ($478.50)',
                isId ? 'Overtime: Rp 220.000 / Jam (Flat Tim)' : 'Overtime: Rp 220.000 / Hour (Flat Team)',
                '+ Add-on Drone Neo 2: Rp 399.000 ($27)',
                isId ? 'Jaminan Tim & Backup Peralatan Professional' : 'Professional Team & Equipment Backup Guarantee',
              ]}
              ctaLink={getWaLink(
                isId
                  ? 'Halo Justin, saya tertarik dengan paket Foto + Video Event.'
                  : 'Hello Justin, I am interested in the Event Photo + Video package.'
              )}
            />
          </>
        )}

        {/* DRONE */}
        {activeTab === 'drone' && (
          <PriceCard
            title={isId ? 'Sewa Drone DJI Neo 2 + Pilot' : 'DJI Neo 2 Drone Rental + Pilot'}
            price={currency === 'IDR' ? 'Rp 249.000 / Baterai' : '$19 / Battery'}
            ctaText={content.ctaBtn}
            outputs={
              isId
                ? [
                    'Termasuk Pilot Drone Berpengalaman',
                    'Pengambilan Aerial Shot Cinematic 4K',
                    'Sangat Cocok sebagai Add-on Wisuda / Event',
                    'Jaminan Penerbangan Aman & Izin Area',
                  ]
                : [
                    'Experienced Drone Pilot Included',
                    'Cinematic 4K Aerial Shots',
                    'Best Suitable as an Add-on for Graduation / Event',
                    'Safety Flight & Area Clearance Guarantee',
                  ]
            }
            ctaLink={getWaLink(
              isId
                ? 'Halo Justin, saya tertarik dengan sewa Drone DJI Neo 2 + Pilot.'
                : 'Hello Justin, I am interested in renting the DJI Neo 2 Drone + Pilot.'
            )}
          />
        )}
      </div>

      {/* ADD-ONS SECTION */}
      <div className="p-6 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-4">
        <div>
          <h3 className="text-xl font-bold text-white">{content.addonsTitle}</h3>
          <p className="text-xs text-neutral-400">{content.addonsSubtitle}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {currentAddons.map((addon) => (
            <div
              key={addon.title}
              className="p-4 rounded-xl bg-neutral-800/50 border border-neutral-800 flex flex-col justify-between"
            >
              <div>
                <h4 className="text-sm font-bold text-white">{addon.title}</h4>
                <p className="text-xs text-neutral-400 mt-1">{addon.desc}</p>
              </div>
              <span className="text-xs font-bold text-emerald-400 mt-3">{addon.price}</span>
            </div>
          ))}
        </div>
      </div>

      {/* TRUST BANNER */}
      <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-800/50 text-center text-xs text-emerald-300 flex flex-col sm:flex-row items-center justify-center gap-3">
        <span>🛡️ <strong>{isId ? 'Jaminan Transaksi Aman:' : 'Secure Transaction Guarantee:'}</strong> {isId ? 'Tanpa Biaya Tersembunyi. DP 50% untuk Kunci Slot, Pelunasan Dilakukan Setelah Pekerjaan Selesai.' : 'No Hidden Fees. 50% DP to lock slot, balance settled after completion.'}</span>
      </div>

      {/* FAQ SECTION */}
      <div className="p-6 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-4">
        <div>
          <h3 className="text-xl font-bold text-white">
            {content.faqTitle}
          </h3>
          <p className="text-xs text-neutral-400">
            {isId ? 'Pertanyaan yang sering ditanyakan mengenai kategori ini.' : 'Frequently asked questions regarding this category.'}
          </p>
        </div>
        <div className="space-y-2">
          {currentFaqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div key={faq.q} className="rounded-xl border border-neutral-800 bg-neutral-800/30 overflow-hidden">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  className="w-full text-left p-4 text-xs font-bold text-white flex justify-between items-center hover:bg-neutral-800/50 transition"
                >
                  <span>{faq.q}</span>
                  <span className="text-neutral-400 ml-2 font-mono">{isOpen ? '−' : '+'}</span>
                </button>
                {isOpen && (
                  <div className="p-4 text-xs text-neutral-300 border-t border-neutral-800/80 bg-neutral-900/50 whitespace-pre-line leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const PriceCard: React.FC<PriceCardProps> = ({
  title,
  price,
  anchorPrice,
  badge,
  outputs,
  ctaLink,
  ctaText,
}) => (
  <div className="p-6 rounded-2xl bg-neutral-900/90 border border-neutral-800 flex flex-col justify-between relative hover:border-neutral-700 transition">
    {badge && (
      <span className="absolute -top-3 right-4 px-3 py-1 bg-gradient-to-r from-emerald-400 to-teal-500 text-black text-xs font-bold rounded-full shadow">
        {badge}
      </span>
    )}
    <div>
      <h3 className="text-lg font-bold mb-1 text-white">{title}</h3>
      
      {/* HARGA & ANCHOR PRICING */}
      <div className="mb-4">
        {anchorPrice && (
          <span className="text-xs text-neutral-500 line-through mr-2 font-mono">{anchorPrice}</span>
        )}
        <span className="text-xl font-extrabold text-emerald-400">{price}</span>
      </div>

      <div className="w-full border-t border-neutral-800 mb-4" />
      
      <ul className="space-y-2 text-sm text-neutral-300 mb-6">
        {outputs.map((item) => (
          <li key={item} className="flex items-start gap-2">
            <span className="text-emerald-400">✓</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>

    <div>
      <a
        href={ctaLink}
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full py-2.5 px-4 rounded-xl bg-neutral-800 hover:bg-white hover:text-black font-semibold text-xs text-center text-white transition-all duration-200"
      >
        {ctaText}
      </a>
    </div>
  </div>
);
