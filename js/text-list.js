function buatParagraf(teksParagraf, teksIntiParagraf) {
  const teks = document.createElement("p");
  teks.innerText = teksParagraf;

  const teksInti = document.createElement("p");
  teksInti.classList.add("text-buku");
  teksInti.innerText = teksIntiParagraf;

  const paragrafBuku = document.createElement("div");
  paragrafBuku.classList.add("paragraf-buku");
  paragrafBuku.append(teks, teksInti);

  return paragrafBuku;
}

function paragrafPenulis(penulis) {
  return buatParagraf("penulis", penulis);
}

function paragrafTahun(tahun) {
  return buatParagraf("tahun", tahun);
}
