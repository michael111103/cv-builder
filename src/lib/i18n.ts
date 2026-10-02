export type Locale = "en" | "id";

export interface Translations {
  nav: {
    products: string;
    documents: string;
    faq: string;
    blog: string;
    contact: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    ctaWhatsapp: string;
    ctaProducts: string;
    badge1: string;
    badge2: string;
    stat1: string;
    stat2: string;
    stat3: string;
    waMessage: string;
  };
  why: {
    tag: string;
    title: string;
    items: { title: string; desc: string }[];
  };
  about: {
    tag: string;
    title: string;
    badge: string;
    p1: string;
    p2: string;
  };
  products: {
    tag: string;
    title: string;
    items: {
      name: string;
      desc: string;
      specs: string[][];
    }[];
  };
  quality: {
    tag: string;
    title: string;
    points: { title: string; desc: string }[];
    labTitle: string;
    labSource: string;
    labHeaders: string[];
    labRows: string[][];
  };
  order: {
    tag: string;
    title: string;
    steps: { title: string; desc: string }[];
  };
  production: {
    tag: string;
    title: string;
    steps: { title: string; desc: string }[];
  };
  certs: {
    tag: string;
    title: string;
    items: { title: string; desc: string }[];
  };
  faq: {
    tag: string;
    title: string;
    items: { q: string; a: string }[];
  };
  contact: {
    title: string;
    desc: string;
    namePh: string;
    productPh: string;
    quantityPh: string;
    destinationPh: string;
    notesPh: string;
    submit: string;
    waIntro: string;
  };
  footer: {
    tagline: string;
  };
  blog: {
    tag: string;
    title: string;
    subtitle: string;
    searchPh: string;
    filterAll: string;
    readMore: string;
    minRead: string;
    backToBlog: string;
  };
}

const en: Translations = {
  nav: { products: "Products", documents: "Documents", faq: "FAQ and MOQ", blog: "Blog", contact: "Contact" },
  hero: {
    eyebrow: "Coconut Charcoal Export",
    title: "Reliable Export Partner for Premium Shisha and BBQ Charcoal Briquettes",
    subtitle:
      "PT Bara Karbon Energi sources, quality checks, and exports coconut shell charcoal briquettes from Central Java. FOB Semarang, ready for shipment worldwide.",
    ctaWhatsapp: "WhatsApp",
    ctaProducts: "View Products",
    badge1: "Partnered with a certified manufacturer",
    badge2: "Export document support",
    stat1: "Capacity per container",
    stat2: "Partner production capacity per month",
    stat3: "PT Bara Karbon Energi founded",
    waMessage: "Hello, I am interested in your coconut charcoal briquettes. Could you share more information?",
  },
  why: {
    tag: "Why Coconut Charcoal",
    title: "Natural, Renewable, High Performance",
    items: [
      { title: "Long Burn", desc: "Extended and consistent heat" },
      { title: "Low Ash", desc: "Cleaner burn with less residue" },
      { title: "100% Natural", desc: "No chemical accelerants" },
      { title: "High Heat", desc: "Ideal for shisha and BBQ" },
    ],
  },
  about: {
    tag: "Who We Are",
    title: "Export Partner, Not Just a Middleman",
    badge: "Semarang, Indonesia",
    p1: "PT Bara Karbon Energi is an export supplier of coconut shell charcoal briquettes, working with a certified manufacturing partner near Tanjung Emas Port in Semarang.",
    p2: "We handle quality control, export documentation, and logistics, so buyers get one reliable point of contact from quotation to shipment.",
  },
  products: {
    tag: "Our Products",
    title: "Shisha and BBQ Charcoal Briquettes",
    items: [
      {
        name: "Shisha Briquettes",
        desc: "Available in Medium, Premium, and Super Premium grades.",
        specs: [
          ["Ash content", "2% to 3%"],
          ["Material", "Coconut shell charcoal"],
          ["Packaging", "Inner plastic, inner box, outer box"],
        ],
      },
      {
        name: "BBQ Briquettes",
        desc: "Hexagonal shape with a consistent size and a long burn time.",
        specs: [
          ["Shape", "Hexagonal, 5x10cm"],
          ["Ash content", "5% to 6%"],
          ["Packaging", "Box, inner plastic"],
        ],
      },
    ],
  },
  quality: {
    tag: "Quality Proof",
    title: "Quality You Can Verify, Not Just Promises",
    points: [
      { title: "Independent Lab Test", desc: "Verified by a third party inspection body" },
      { title: "Pre Production Sampling", desc: "Approved by the buyer before mass production" },
      { title: "Written Specification", desc: "Stated in the contract, not just spoken" },
      { title: "Moisture Control", desc: "Checked before pressing to prevent cracking" },
    ],
    labTitle: "Certificate of Analysis, Coconut Shell Charcoal Briquette, Hexagonal",
    labSource: "Tested by Carsurin",
    labHeaders: ["Parameter", "Wet Basis", "Dry Basis"],
    labRows: [
      ["Moisture", "6.57%", "-"],
      ["Ash Content", "1.94%", "2.08%"],
      ["Volatile Matter", "14.90%", "15.95%"],
      ["Fixed Carbon", "76.59%", "81.97%"],
    ],
  },
  order: {
    tag: "Order Flow",
    title: "From First Conversation to Shipment",
    steps: [
      { title: "Initial Discussion", desc: "Needs, volume, and specification" },
      { title: "Letter of Intent", desc: "Formal interest confirmed by the buyer" },
      { title: "Quotation", desc: "Price, quality, and shipping terms" },
      { title: "Buyer PO", desc: "Purchase order issued" },
      { title: "Approval", desc: "Agreement from both sides" },
      { title: "Contract and DP", desc: "Agreement signed and deposit paid" },
    ],
  },
  production: {
    tag: "Production Process",
    title: "From Coconut Shell to Container",
    steps: [
      { title: "Sourcing", desc: "Coconut shells from Central Java" },
      { title: "Production and QC", desc: "Pressing, drying, and quality testing" },
      { title: "Packing", desc: "Export standard packaging" },
      { title: "Export", desc: "FOB Tanjung Emas Port, Semarang" },
    ],
  },
  certs: {
    tag: "Documents",
    title: "Paperwork You Can Verify",
    items: [
      { title: "Certificate of Analysis (COA)", desc: "Confirms the product meets the stated grade" },
      { title: "MSDS", desc: "Material safety data for handling and storage" },
      { title: "Certificate of Origin (COO)", desc: "Confirms the goods are made in Indonesia" },
    ],
  },
  faq: {
    tag: "FAQ and MOQ",
    title: "Good to Know Before You Order",
    items: [
      { q: "What is the MOQ?", a: "1 x 20FT container (about 18 tons) or 1 x 40FT container (about 25 tons)." },
      { q: "What shipping term do you use?", a: "FOB Tanjung Emas Port, Semarang." },
      { q: "What is the payment scheme?", a: "Bank transfer (TT). 50% deposit before production, 50% before stuffing." },
      { q: "Are samples available?", a: "Yes, on request. Factory visits can also be arranged." },
    ],
  },
  contact: {
    title: "Request a Quotation",
    desc: "Tell us your product, quantity, and destination. The more complete your first message, the faster we can reply.",
    namePh: "Name or company",
    productPh: "Select a product",
    quantityPh: "Quantity, for example 1x20FT, 18 tons",
    destinationPh: "Destination country",
    notesPh: "Additional notes",
    submit: "Send via WhatsApp",
    waIntro: "Hello, I would like to request a quotation.",
  },
  footer: {
    tagline: "Semarang, Central Java, Indonesia. Coconut charcoal export supplier.",
  },
  blog: {
    tag: "Insights",
    title: "Charcoal and Export Guides, Straight from the Supplier",
    subtitle: "What buyers usually ask us about, written down: quality, specification, export documents, and usage tips.",
    searchPh: "Search articles",
    filterAll: "All",
    readMore: "Read more",
    minRead: "min read",
    backToBlog: "Back to all articles",
  },
};

const id: Translations = {
  nav: { products: "Produk", documents: "Dokumen", faq: "FAQ dan MOQ", blog: "Blog", contact: "Kontak" },
  hero: {
    eyebrow: "Ekspor Briket Arang Kelapa",
    title: "Mitra Ekspor Terpercaya untuk Briket Shisha dan BBQ Premium",
    subtitle:
      "PT Bara Karbon Energi menyediakan, mengontrol mutu, dan mengekspor briket arang batok kelapa dari Jawa Tengah. FOB Semarang, siap dikirim ke seluruh dunia.",
    ctaWhatsapp: "WhatsApp",
    ctaProducts: "Lihat Produk",
    badge1: "Bermitra dengan pabrik bersertifikat",
    badge2: "Dukungan dokumen ekspor",
    stat1: "Kapasitas per kontainer",
    stat2: "Kapasitas produksi mitra per bulan",
    stat3: "PT Bara Karbon Energi berdiri",
    waMessage: "Halo, saya tertarik dengan briket arang kelapa Anda. Boleh minta info lebih lanjut?",
  },
  why: {
    tag: "Kenapa Arang Kelapa",
    title: "Alami, Terbarukan, Performa Tinggi",
    items: [
      { title: "Bakar Tahan Lama", desc: "Panas stabil dan konsisten" },
      { title: "Kadar Abu Rendah", desc: "Bakar bersih, minim residu" },
      { title: "100% Alami", desc: "Tanpa bahan kimia pemicu" },
      { title: "Panas Tinggi", desc: "Ideal untuk shisha dan BBQ" },
    ],
  },
  about: {
    tag: "Siapa Kami",
    title: "Mitra Ekspor, Bukan Sekadar Perantara",
    badge: "Semarang, Indonesia",
    p1: "PT Bara Karbon Energi adalah eksportir briket arang batok kelapa yang bermitra dengan pabrik produksi bersertifikat di dekat Pelabuhan Tanjung Emas, Semarang.",
    p2: "Kami menangani kontrol mutu, dokumen ekspor, dan logistik, sehingga buyer punya satu titik kontak yang andal dari penawaran sampai pengiriman.",
  },
  products: {
    tag: "Produk Kami",
    title: "Briket Arang Shisha dan BBQ",
    items: [
      {
        name: "Briket Shisha",
        desc: "Tersedia grade Medium, Premium, dan Super Premium.",
        specs: [
          ["Kadar abu", "2% sampai 3%"],
          ["Material", "Arang batok kelapa"],
          ["Kemasan", "Inner plastic, inner box, outer box"],
        ],
      },
      {
        name: "Briket BBQ",
        desc: "Bentuk hexagonal, ukuran konsisten, bakar tahan lama.",
        specs: [
          ["Bentuk", "Hexagonal, 5x10cm"],
          ["Kadar abu", "5% sampai 6%"],
          ["Kemasan", "Box, inner plastic"],
        ],
      },
    ],
  },
  quality: {
    tag: "Bukti Mutu",
    title: "Mutu yang Bisa Diperiksa, Bukan Sekadar Dijanjikan",
    points: [
      { title: "Uji Lab Independen", desc: "Diverifikasi lembaga inspeksi pihak ketiga" },
      { title: "Sampling Sebelum Produksi", desc: "Disetujui buyer sebelum produksi massal" },
      { title: "Spesifikasi Tertulis", desc: "Dicantumkan dalam kontrak, bukan lisan" },
      { title: "Kontrol Kadar Air", desc: "Diperiksa sebelum pencetakan untuk cegah retak" },
    ],
    labTitle: "Certificate of Analysis, Briket Arang Batok Kelapa, Hexagonal",
    labSource: "Diuji oleh Carsurin",
    labHeaders: ["Parameter", "Basis Basah", "Basis Kering"],
    labRows: [
      ["Kadar Air", "6.57%", "-"],
      ["Kadar Abu", "1.94%", "2.08%"],
      ["Zat Terbang", "14.90%", "15.95%"],
      ["Fixed Carbon", "76.59%", "81.97%"],
    ],
  },
  order: {
    tag: "Alur Order",
    title: "Dari Diskusi Awal Sampai Barang Berangkat",
    steps: [
      { title: "Diskusi Awal", desc: "Kebutuhan, volume, dan spesifikasi" },
      { title: "Pengajuan Minat", desc: "Konfirmasi minat resmi dari buyer" },
      { title: "Penawaran", desc: "Harga, mutu, dan ketentuan pengiriman" },
      { title: "PO Buyer", desc: "Purchase order diterbitkan" },
      { title: "Approval", desc: "Kesepakatan kedua pihak" },
      { title: "Kontrak dan DP", desc: "Perjanjian ditandatangani dan DP dibayar" },
    ],
  },
  production: {
    tag: "Proses Produksi",
    title: "Dari Batok Kelapa Sampai ke Kontainer",
    steps: [
      { title: "Sourcing", desc: "Batok kelapa dari Jawa Tengah" },
      { title: "Produksi dan QC", desc: "Pencetakan, pengeringan, uji mutu" },
      { title: "Packing", desc: "Kemasan standar ekspor" },
      { title: "Ekspor", desc: "FOB Tanjung Emas Port, Semarang" },
    ],
  },
  certs: {
    tag: "Dokumen",
    title: "Kelengkapan yang Bisa Diverifikasi",
    items: [
      { title: "Certificate of Analysis (COA)", desc: "Memastikan produk sesuai grade yang dijanjikan" },
      { title: "MSDS", desc: "Data keamanan material untuk penanganan dan penyimpanan" },
      { title: "Certificate of Origin (COO)", desc: "Memastikan barang diproduksi di Indonesia" },
    ],
  },
  faq: {
    tag: "FAQ dan MOQ",
    title: "Yang Perlu Diketahui Sebelum Order",
    items: [
      { q: "Berapa MOQ-nya?", a: "1 x 20FT container (sekitar 18 ton) atau 1 x 40FT container (sekitar 25 ton)." },
      { q: "Term pengiriman apa yang dipakai?", a: "FOB Tanjung Emas Port, Semarang." },
      { q: "Bagaimana skema pembayarannya?", a: "Transfer bank (TT). 50% DP sebelum produksi, 50% sebelum stuffing." },
      { q: "Apakah sample tersedia?", a: "Tersedia atas permintaan. Kunjungan pabrik juga bisa diatur." },
    ],
  },
  contact: {
    title: "Minta Penawaran",
    desc: "Sebutkan produk, jumlah, dan tujuan yang Anda butuhkan. Makin lengkap pesan pertama, makin cepat kami balas.",
    namePh: "Nama atau perusahaan",
    productPh: "Pilih produk",
    quantityPh: "Jumlah, misalnya 1x20FT, 18 ton",
    destinationPh: "Negara tujuan",
    notesPh: "Catatan tambahan",
    submit: "Kirim via WhatsApp",
    waIntro: "Halo, saya ingin meminta penawaran.",
  },
  footer: {
    tagline: "Semarang, Jawa Tengah, Indonesia. Eksportir briket arang batok kelapa.",
  },
  blog: {
    tag: "Wawasan",
    title: "Panduan Arang dan Ekspor, Langsung dari Supplier",
    subtitle: "Yang paling sering ditanyakan buyer, kami tuliskan: mutu, spesifikasi, dokumen ekspor, dan tips pemakaian.",
    searchPh: "Cari artikel",
    filterAll: "Semua",
    readMore: "Baca selengkapnya",
    minRead: "menit baca",
    backToBlog: "Kembali ke semua artikel",
  },
};

export const translations: Record<Locale, Translations> = { en, id };
