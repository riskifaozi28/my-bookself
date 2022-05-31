const arrBuku = [];
const RENDER_EVENT = "render-buku";

const SAVED_EVENT = "simpan-buku";
const STORAGE_KEY = "BOOKSHELF";

function generateId() {
  return +new Date();
}

function bukuKeObjek(id, judul, penulis, tahun, checkbox) {
  return {
    id,
    judul,
    penulis,
    tahun,
    checkbox,
  };
}

function findBuku(bukudId) {
  for (itemBuku of arrBuku) {
    if (itemBuku.id === bukudId) {
      return itemBuku;
    }
  }
  return null;
}

function findBookIndex(bukudId) {
  for (index in arrBuku) {
    if (arrBuku[index].id === bukudId) {
      return index;
    }
  }
  return -1;
}

function isStorageExist() /* boolean */ {
  if (typeof Storage === undefined) {
    alert("Browser kamu tidak mendukung local storage");
    return false;
  }
  return true;
}

function simpanBuku() {
  if (isStorageExist()) {
    const parsed = JSON.stringify(arrBuku);
    localStorage.setItem(STORAGE_KEY, parsed);
    document.dispatchEvent(new Event(SAVED_EVENT));
  }
}

function loadDataFromStorage() {
  const serializedData = localStorage.getItem(STORAGE_KEY);

  let data = JSON.parse(serializedData);

  if (data !== null) {
    for (itemBuku of data) {
      arrBuku.push(itemBuku);
    }
  }

  document.dispatchEvent(new Event(RENDER_EVENT));
}
