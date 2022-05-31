function buatTombol(tipeTombol, ikonTombol, teksTombol, warnaTombol) {
  const icon = document.createElement("img");
  icon.setAttribute("src", ikonTombol);

  const teks = document.createElement("p");
  teks.classList.add(warnaTombol);
  teks.innerText = teksTombol;

  const tombol = document.createElement("button");
  tombol.classList.add(tipeTombol);
  tombol.append(icon, teks);

  return tombol;
}

function tambahKeSelesai(bukudId) {
  const bukutTarget = findBuku(bukudId);
  if (bukutTarget == null) return;
  bukutTarget.checkbox = true;

  document.dispatchEvent(new Event(RENDER_EVENT));

  simpanBuku();
}

function tombolSelesai() {
  return buatTombol("btn-sc", "img/icon-completed.svg", "selesai", "hijau");
}

function tambahKeBelum(bukudId) {
  const bukutTarget = findBuku(bukudId);
  if (bukutTarget == null) return;
  bukutTarget.checkbox = false;

  document.dispatchEvent(new Event(RENDER_EVENT));

  simpanBuku();
}

function tombolBelum() {
  return buatTombol("btn-sc", "img/icon-undo.svg", "belum", "hijau");
}

function hapus(bukudId) {
  const konfirmasi = confirm("Yakin ingin dihapus list baca buku kamu?");

  if (konfirmasi === true) {
    const bukutTarget = findBookIndex(bukudId);
    if (bukutTarget === -1) return;
    arrBuku.splice(bukutTarget, 1);

    document.dispatchEvent(new Event(RENDER_EVENT));

    alert("Yahh, kamu baru saja kehilangan sumber ilmu mu");
  } else {
    alert("YEEYY, sumber ilmu mu masih aman sekarang");
  }

  simpanBuku();
}

function tombolHapus() {
  return buatTombol("btn-sc", "img/icon-trash.svg", "hapus", "merah");
}
