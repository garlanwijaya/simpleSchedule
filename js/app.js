// --------------------------------------------------------------
// Jadwal
// --------------------------------------------------------------
class Jadwal {
  constructor() {
    this.loadJadwal();
  }

  // --------------------------------------------------------------
  // Load Jadwal
  // --------------------------------------------------------------
  async loadJadwal() {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.jadwal = localStorage.getItem("Jadwal") || "[]";
        this.parsedJadwal = JSON.parse(this.jadwal);
        resolve();
      }, 0);
    });
  }

  // --------------------------------------------------------------
  // Hapus Jadwal
  // --------------------------------------------------------------
  async hapusJadwal(index) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          if (this.parsedJadwal.length > 0) {
            this.parsedJadwal.splice(index, 1);
            if (this.parsedJadwal.length === 0) {
              localStorage.removeItem("Jadwal");
            } else {
              localStorage.setItem("Jadwal", JSON.stringify(this.parsedJadwal));
            }
            resolve();
          } else {
            reject("Data tidak ditemukan");
          }
        } catch (error) {
          reject(error);
        }
      }, 0);
    });
  }

  // --------------------------------------------------------------
  // Edit Jadwal
  // --------------------------------------------------------------
  async editJadwal(index) {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (this.parsedJadwal.length > 0) {
          const jadwalToEdit = this.parsedJadwal[index];
          const namaMatkul = document.getElementById("editNamaMatkul");
          const hari = document.getElementById("editHari");
          const jamMulai = document.getElementById("editJamMulai");
          const ruang = document.getElementById("editRuang");

          namaMatkul.value = jadwalToEdit.namaMatkul;
          hari.value = jadwalToEdit.hari;
          jamMulai.value = jadwalToEdit.jamMulai;
          ruang.value = jadwalToEdit.ruang;

          const editForm = document.getElementById("editForm");
          const popup = document.getElementById("popup");
          const cancelButton = document.getElementById("editJadwalCancel");

          editForm.classList.remove("hidden");
          popup.classList.add("show");

          const handlePopupClick = () => {
            editForm.classList.add("hidden");
            popup.classList.remove("show");
          };

          const handleCancelClick = () => {
            editForm.classList.add("hidden");
            popup.classList.remove("show");
          };

          popup.addEventListener("click", handlePopupClick);
          cancelButton.addEventListener("click", handleCancelClick);

          const editJadwalForm = document.getElementById("editJadwalForm");
          editJadwalForm.onsubmit = async (e) => {
            e.preventDefault();
            await this.updateJadwal(index, {
              namaMatkul: namaMatkul.value,
              hari: hari.value,
              jamMulai: jamMulai.value,
              ruang: ruang.value,
            });
            window.location.href = "index.html";
          };

          resolve();
        } else {
          alert("Data tidak ditemukan");
        }
      }, 0);
    });
  }

  // --------------------------------------------------------------
  // Update Jadwal
  // --------------------------------------------------------------
  async updateJadwal(index, newData) {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.parsedJadwal[index] = newData;
        localStorage.setItem("Jadwal", JSON.stringify(this.parsedJadwal));
        resolve();
      }, 0);
    });
  }

  // --------------------------------------------------------------
  // Tambah Jadwal
  // --------------------------------------------------------------
  async tambahJadwal() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          const namaMatkul = document.getElementById("namaMatkul");
          const hari = document.getElementById("hari");
          const jamMulai = document.getElementById("jamMulai");
          const ruang = document.getElementById("ruang");

          if (
            namaMatkul.value.trim() === "" ||
            hari.value.trim() === "" ||
            jamMulai.value.trim() === "" ||
            ruang.value.trim() === ""
          ) {
            reject("Harap mengisi seluruh kolom");
          }

          const newJadwal = {
            namaMatkul: namaMatkul.value,
            hari: hari.value,
            jamMulai: jamMulai.value,
            ruang: ruang.value,
          };

          this.parsedJadwal.push(newJadwal);
          localStorage.setItem("Jadwal", JSON.stringify(this.parsedJadwal));
          resolve();
        } catch (error) {
          reject(error);
        }
      }, 0);
    });
  }
}

export default Jadwal;
