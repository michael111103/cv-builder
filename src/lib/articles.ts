export interface Article {
  slug: string;
  image: string;
  minRead: number;
  category: { en: string; id: string };
  title: { en: string; id: string };
  excerpt: { en: string; id: string };
  body: { en: string[]; id: string[] };
}

export const articles: Article[] = [
  {
    slug: "briquette-or-lump-charcoal",
    image: "blog-briquette-vs-lump.jpg",
    minRead: 6,
    category: { en: "Guide", id: "Panduan" },
    title: {
      en: "Briquette or Lump Charcoal for Grilling? The Difference Explained",
      id: "Briket atau Arang Lump untuk Panggangan? Ini Bedanya",
    },
    excerpt: {
      en: "Both come from coconut shells, but they burn differently and suit different kinds of buyers.",
      id: "Keduanya berasal dari batok kelapa, tapi cara bakarnya berbeda dan cocok untuk jenis pembeli yang berbeda.",
    },
    body: {
      en: [
        "Briquettes and lump charcoal both start from the same raw material, coconut shells, but they are produced in different ways. Lump charcoal is simply carbonized shell, broken into pieces of varying size. Briquettes are made by grinding carbonized shell into powder, mixing it with a natural binder, and pressing it into a uniform shape.",
        "That difference in production shows up at the grill. Lump charcoal lights faster and burns hotter at first, then cools down more quickly. Briquettes take a little longer to light, but they hold a steady temperature for a longer stretch of time, which restaurants and shisha lounges tend to prefer.",
        "For buyers planning high volume orders, briquettes also pack and ship more predictably because every piece is close to the same size and weight. If your customers care most about consistency from batch to batch, briquettes are usually the safer choice.",
        "PT Bara Karbon Energi supplies both formats, so talk to us about which one fits the market you are selling into.",
      ],
      id: [
        "Briket dan arang lump sama-sama berasal dari bahan baku yang sama, yaitu batok kelapa, tapi cara pembuatannya berbeda. Arang lump adalah hasil karbonisasi batok yang dipecah menjadi potongan dengan ukuran bervariasi. Briket dibuat dengan menggiling arang hasil karbonisasi menjadi bubuk, mencampurnya dengan perekat alami, lalu mencetaknya menjadi bentuk yang seragam.",
        "Perbedaan proses produksi ini terasa saat dipakai memanggang. Arang lump lebih cepat menyala dan awalnya membakar lebih panas, tapi lebih cepat turun suhunya. Briket butuh waktu sedikit lebih lama untuk menyala, tapi suhunya lebih stabil dalam waktu yang lebih panjang, yang biasanya lebih disukai restoran dan lounge shisha.",
        "Untuk pembeli yang merencanakan order dalam jumlah besar, briket juga lebih mudah diprediksi saat dikemas dan dikirim karena ukuran dan beratnya relatif seragam. Kalau pelanggan kamu paling peduli soal konsistensi antar batch, briket biasanya pilihan yang lebih aman.",
        "PT Bara Karbon Energi menyediakan dua format ini, jadi diskusikan dengan kami mana yang paling cocok untuk pasar yang kamu tuju.",
      ],
    },
  },
  {
    slug: "is-coconut-shell-charcoal-safe",
    image: "blog-coconut-charcoal-safety.jpg",
    minRead: 5,
    category: { en: "Education", id: "Edukasi" },
    title: {
      en: "Is Coconut Shell Charcoal Safe to Use?",
      id: "Apakah Arang Batok Kelapa Aman Dipakai?",
    },
    excerpt: {
      en: "A look at what makes natural coconut charcoal different from chemical quick light charcoal.",
      id: "Penjelasan soal apa yang membuat arang batok kelapa alami berbeda dari arang kimia cepat nyala.",
    },
    body: {
      en: [
        "Not all charcoal is made the same way, and that matters for anyone using it around food or in an enclosed space like a shisha lounge. Some low cost charcoal on the market is treated with chemical accelerants so it lights in seconds. That convenience comes at a cost, since those chemicals can affect taste and air quality when burned.",
        "Natural coconut shell charcoal, whether in lump or briquette form, contains no added chemicals. It is made purely from carbonized coconut shells, sometimes bound with a small amount of natural tapioca starch for briquettes. It takes a little longer to light, but what you get is a cleaner burn with less odor and lower ash content.",
        "This is also why lab testing matters. A Certificate of Analysis shows the actual ash content, moisture, and fixed carbon of a batch, which tells you whether the product is genuinely natural or cut with lower grade material.",
        "Every batch we export is tested by an independent laboratory, and the results are available to buyers before they commit to an order.",
      ],
      id: [
        "Tidak semua arang dibuat dengan cara yang sama, dan ini penting buat siapa pun yang memakainya dekat makanan atau di ruangan tertutup seperti lounge shisha. Sebagian arang murah di pasaran diberi bahan kimia pemicu supaya bisa menyala dalam hitungan detik. Kepraktisan itu ada harganya, karena bahan kimia tersebut bisa memengaruhi rasa dan kualitas udara saat dibakar.",
        "Arang batok kelapa alami, baik dalam bentuk lump maupun briket, tidak mengandung bahan kimia tambahan. Bahan dasarnya murni batok kelapa yang dikarbonisasi, kadang diikat dengan sedikit perekat tapioka alami untuk briket. Memang butuh waktu sedikit lebih lama untuk menyala, tapi hasilnya pembakaran yang lebih bersih dengan bau yang lebih minim dan kadar abu yang lebih rendah.",
        "Ini juga kenapa uji laboratorium itu penting. Certificate of Analysis menunjukkan kadar abu, kadar air, dan fixed carbon sebenarnya dari satu batch, yang memberi tahu apakah produknya benar benar alami atau dicampur material kelas bawah.",
        "Setiap batch yang kami ekspor diuji oleh laboratorium independen, dan hasilnya tersedia untuk pembeli sebelum mereka memutuskan order.",
      ],
    },
  },
  {
    slug: "export-documents-charcoal-briquettes",
    image: "blog-export-documents.jpg",
    minRead: 7,
    category: { en: "Export", id: "Ekspor" },
    title: {
      en: "Export Documents You Need Before Shipping Charcoal Briquettes",
      id: "Dokumen Ekspor yang Dibutuhkan Sebelum Mengirim Briket Arang",
    },
    excerpt: {
      en: "A short overview of the paperwork that moves a container from a factory in Semarang to a port overseas.",
      id: "Ringkasan singkat soal dokumen yang membuat satu kontainer bisa bergerak dari pabrik di Semarang sampai ke pelabuhan luar negeri.",
    },
    body: {
      en: [
        "Shipping a container of charcoal briquettes out of Indonesia involves more than agreeing on a price. A handful of documents need to be in place before the cargo can legally leave the port, and most buyers will ask to see some of them before they place a serious order.",
        "A Certificate of Analysis confirms the product matches the grade you agreed on, covering figures like ash content and fixed carbon. A Material Safety Data Sheet describes how the product should be handled and stored, which matters for a combustible material. A Certificate of Origin confirms the goods were produced in Indonesia, which the buyer often needs for customs clearance on their end.",
        "On the exporter side, an export declaration has to be filed with customs for every shipment. This is usually handled through a licensed freight forwarder rather than by the exporter directly.",
        "None of this needs to slow a deal down if it is planned for from the start. We prepare these documents as part of every order, so buyers know exactly what they will receive alongside the shipment.",
      ],
      id: [
        "Mengirim satu kontainer briket arang keluar dari Indonesia itu lebih dari sekadar sepakat soal harga. Ada beberapa dokumen yang harus siap sebelum barang bisa keluar pelabuhan secara sah, dan kebanyakan buyer akan minta lihat sebagian dokumen itu sebelum mereka berani order serius.",
        "Certificate of Analysis memastikan produk sesuai dengan grade yang disepakati, mencakup angka seperti kadar abu dan fixed carbon. Material Safety Data Sheet menjelaskan cara penanganan dan penyimpanan produk, yang penting karena ini material mudah terbakar. Certificate of Origin memastikan barang diproduksi di Indonesia, yang sering dibutuhkan buyer untuk proses bea cukai di negara mereka.",
        "Di sisi eksportir, dokumen pemberitahuan ekspor wajib diajukan ke bea cukai untuk setiap pengiriman. Ini biasanya diurus lewat freight forwarder berizin, bukan langsung oleh eksportir.",
        "Semua ini tidak perlu memperlambat transaksi kalau sudah direncanakan dari awal. Kami menyiapkan dokumen dokumen ini sebagai bagian dari setiap order, jadi buyer tahu persis apa yang akan mereka terima bersama pengiriman.",
      ],
    },
  },
];
