const BELUM_SELESAI_BACA = "belum-dibaca";
const SUDAH_SELESAI_BACA = "sudah-dibaca";
const btnBuat = document.getElementById("buat");
const popUp = document.getElementById("pop-up");
const bg = document.getElementById("bg");
const cari = document.getElementById("search");
const belumBaca = document.getElementById(BELUM_SELESAI_BACA);
const sudahBaca = document.getElementById(SUDAH_SELESAI_BACA);
const belumbacaCount = document.getElementById("count-belum-baca");
const sudahbacaCount = document.getElementById("count-sudah-baca");
const currentTime = new Date();
const years = currentTime.getFullYear();

document.addEventListener("DOMContentLoaded", () => {
  const submitBuku = document.getElementById("form");

  submitBuku.addEventListener("submit", (e) => {
    e.preventDefault();

    buatList();

    document.getElementById("judul").value = "";
    document.getElementById("penulis").value = "";
    document.getElementById("tahun").value = "";
    document.getElementById("checkbox").checked = false;
  });

  if (isStorageExist()) {
    loadDataFromStorage();
  }
});

btnBuat.addEventListener("click", () => {
  popUp.classList.remove("display-none");
  bg.classList.remove("display-none");
});

bg.addEventListener("click", () => {
  popUp.classList.add("display-none");
  bg.classList.add("display-none");
});

document.addEventListener(RENDER_EVENT, () => {
  belumBaca.innerHTML = "";
  sudahBaca.innerHTML = "";

  for (itemBuku of arrBuku) {
    const list = buatBuku(itemBuku);
    belumBaca.append(list);

    if (itemBuku.checkbox == false) {
      belumBaca.append(list);
    } else {
      sudahBaca.append(list);
    }
  }

  let belum = belumBaca.querySelectorAll(".list-buku");
  let sudah = sudahBaca.querySelectorAll(".list-buku");

  belumbacaCount.textContent = belum.length;
  sudahbacaCount.textContent = sudah.length;
});

cari.addEventListener("keyup", (e) => {
  const target = e.target.value.toLowerCase();

  let itemBuku = document.querySelectorAll(".list-buku");

  itemBuku.forEach((item) => {
    const isi = item.firstChild.textContent.toLowerCase();

    if (isi.indexOf(target) != -1) {
      item.classList.remove("display-none");
    } else {
      item.classList.add("display-none");
    }
  });
});

function buatList() {
  const judul = document.getElementById("judul").value;
  const penulis = document.getElementById("penulis").value;
  const tahun = document.getElementById("tahun").value;
  const checkbox = document.getElementById("checkbox").checked;

  if (judul === "" || judul === " " || penulis === "" || penulis === " ") {
    window.alert("fieldsnya kosong kayak hati kamu. YUK ISI ULANG!");
  } else if (tahun.length <= 3 || tahun.length >= 5 || tahun < 1100 || tahun > years) {
    window.alert("lama amet tahun segitu atau salah lagi?. YUK ISI ULANG!");
  } else {
    const id = generateId();
    const bukuObjek = bukuKeObjek(id, judul, penulis, tahun, checkbox);
    arrBuku.push(bukuObjek);

    document.dispatchEvent(new Event(RENDER_EVENT));

    popUp.classList.add("display-none");
    bg.classList.add("display-none");
  }

  simpanBuku();
}

function buatBuku(bukuKeObjek) {
  const judulBuku = document.createElement("h3");
  judulBuku.classList.add("judul-buku");
  judulBuku.innerText = bukuKeObjek.judul;

  const paragraf = document.createElement("div");
  paragraf.classList.add("paragraf");
  paragraf.append(paragrafPenulis(bukuKeObjek.penulis), paragrafTahun(bukuKeObjek.tahun));

  const container = document.createElement("div");
  container.classList.add("buku");
  container.append(judulBuku, paragraf);

  const section = document.createElement("div");
  section.classList.add("list-buku");
  section.append(container);
  section.setAttribute("id", `${bukuKeObjek.id}`);

  if (bukuKeObjek.checkbox) {
    const tombols = document.createElement("div");
    tombols.classList.add("tombols");
    tombols.append(tombolBelum(), tombolHapus());

    tombols.children[0].addEventListener("click", () => {
      tambahKeBelum(bukuKeObjek.id);
    });
    tombols.children[1].addEventListener("click", () => {
      hapus(bukuKeObjek.id);
    });

    section.append(tombols);
  } else {
    const tombols = document.createElement("div");
    tombols.classList.add("tombols");
    tombols.append(tombolSelesai(), tombolHapus());

    tombols.children[0].addEventListener("click", () => {
      tambahKeSelesai(bukuKeObjek.id);
    });
    tombols.children[1].addEventListener("click", () => {
      hapus(bukuKeObjek.id);
    });

    section.append(tombols);
  }

  return section;
}
