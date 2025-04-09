import Jadwal from "./app.js";

// Inisialisasi jadwal dengan async
const initJadwal = async () => {
  const jadwal = new Jadwal();
  await jadwal.loadJadwal(); // Pastikan data terload
  return jadwal;
};

// --------------------------------------------------------------
// Check auth dan tampil jadwal
// --------------------------------------------------------------
const startApp = async () => {
  // Cek user login
  const user = localStorage.getItem("User");
  if (!user) {
    window.location.href = "login.html";
    return;
  }

  const parsedUser = JSON.parse(user);
  document.getElementById(
    "welcomeMessage"
  ).textContent = `Hello, ${parsedUser.name}.`;

  // Inisialisasi jadwal
  const jadwal = await initJadwal();
  tampilJadwal(jadwal);
  setupEventHandlers(jadwal);
};

// --------------------------------------------------------------
// Fungsi tampil jadwal
// --------------------------------------------------------------
const tampilJadwal = (jadwal) => {
  const jadwalBox = document.getElementById("jadwalBox");

  if (jadwal.parsedJadwal.length > 0) {
    const tampilJadwal = document.getElementById("tampilJadwal");
    tampilJadwal.innerHTML = `
      <table>
        <thead>
          <tr>
            <th>Nama Mata Kuliah</th>
            <th>Hari</th>
            <th>Jam Mulai</th>
            <th>Ruangan</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          ${jadwal.parsedJadwal
            .map(
              (item, index) => `
            <tr>
              <td>${item.namaMatkul}</td>
              <td>${item.hari}</td>
              <td>${item.jamMulai}</td>
              <td>${item.ruang}</td>
              <td>
                <div class="aksi">
                  <span class="edit flex items-center justify-center cursor-pointer bg-green-600 hover:bg-green-700 rounded text-white hover:text-gray-100 transition duration-300" data-index="${index}">
                    <i class="ph-fill ph-pencil-line"></i>
                  </span>
                  <span class="hapus flex items-center justify-center cursor-pointer bg-red-600 hover:bg-red-700 rounded text-white hover:text-gray-100 transition duration-300" data-index="${index}">
                    <i class="ph-fill ph-trash"></i>
                  </span>
                </div>
              </td>
            </tr>
          `
            )
            .join("")}
        </tbody>
      </table>
    `;
  } else {
    jadwalBox.innerHTML = "There is no jadwal yet.";
  }
};

// --------------------------------------------------------------
// Setup semua event handler
// --------------------------------------------------------------
const setupEventHandlers = (jadwal) => {
  // Logout
  document.getElementById("logout").addEventListener("click", () => {
    localStorage.removeItem("User");
    window.location.href = "login.html";
  });

  // Hapus & Edit
  document.getElementById("jadwalBox").addEventListener("click", async (e) => {
    const target = e.target.closest(".hapus, .edit");
    if (!target) return;

    const index = target.dataset.index;

    if (target.classList.contains("hapus")) {
      try {
        await jadwal.hapusJadwal(index);
        window.location.reload(); // Refresh setelah hapus
      } catch (error) {
        alert(error);
      }
    }

    if (target.classList.contains("edit")) {
      try {
        await jadwal.editJadwal(index);
      } catch (error) {
        alert(error);
      }
    }
  });

  // Tambah jadwal
  document
    .getElementById("tambahJadwal")
    .addEventListener("click", async (e) => {
      e.preventDefault();
      try {
        await jadwal.tambahJadwal();
        window.location.href = "index.html";
      } catch (error) {
        alert(error);
      }
    });
};

// Jalankan aplikasi
startApp();
