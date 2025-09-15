document.addEventListener("DOMContentLoaded", () => {
  /* ===============================
     Fade-in Animations on Scroll
  =============================== */
  const fadeElements = document.querySelectorAll(".fade-in");

  function checkVisibility() {
    const windowHeight = window.innerHeight;

    fadeElements.forEach(element => {
      const rect = element.getBoundingClientRect();

      // Jika bagian atas elemen berada di dalam viewport
      if (rect.top < windowHeight - 50) {
        element.classList.add("visible");
      } else {
        element.classList.remove("visible");
      }
    });
  }

  window.addEventListener("scroll", checkVisibility);
  checkVisibility(); // Jalankan sekali saat halaman dimuat


  /* ===============================
     Smooth Scroll Navigation
  =============================== */
  const navLinks = document.querySelectorAll('nav ul li a');

  navLinks.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();

      const targetId = link.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 70, // offset agar tidak tertutup navbar
          behavior: "smooth"
        });
      }
    });
  });


  /* ===============================
     Navbar Style on Scroll
  =============================== */
  const header = document.querySelector("header");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });


  /* ===============================
     Back to Top Button
  =============================== */
  const backToTopBtn = document.createElement("button");
  backToTopBtn.innerText = "↑";
  backToTopBtn.classList.add("back-to-top");
  document.body.appendChild(backToTopBtn);

  window.addEventListener("scroll", () => {
    if (window.scrollY > 400) {
      backToTopBtn.classList.add("show");
    } else {
      backToTopBtn.classList.remove("show");
    }
  });

  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });

  document.getElementById('contact-form').addEventListener('submit', function(e) {
  e.preventDefault(); // Mencegah reload halaman

  // Ambil data dari form
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  if (!name || !email || !message) {
    alert("Harap isi semua field sebelum mengirim pesan!");
    return;
  }

  // Buat PDF menggunakan jsPDF
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  // Judul PDF
  doc.setFont("Helvetica", "bold");
  doc.setFontSize(18);
  doc.text("Pesan dari Website", 20, 20);


  // Garis pembatas
  doc.setDrawColor(0, 102, 204); // biru
  doc.setLineWidth(0.8);
  doc.line(20, 25, 190, 25);

  // Isi data dari form
  doc.setFont("Helvetica", "normal");
  doc.setFontSize(12);
  doc.text(`Nama   : ${name}`, 20, 40);
  doc.text(`Email  : ${email}`, 20, 50);
  doc.text("Pesan:", 20, 65);

  // Teks pesan ditulis multi-line agar rapi
  const splitMessage = doc.splitTextToSize(message, 170);
  doc.text(splitMessage, 20, 75);


  // Footer
  const today = new Date();
  const date = today.toLocaleDateString();
  doc.setFontSize(10);
  doc.text(`Dikirim pada: ${date}`, 20, 280);

  // Unduh PDF
  doc.save(`pesan-${name}.pdf`);

  // Reset form setelah submit
  document.getElementById('contact-form').reset();

  alert("Pesan berhasil dibuat menjadi PDF dan diunduh!");
});

  let savedData = null; // Variabel untuk menyimpan data dari form

  // Simpan data saat tombol "Kirim Pesan" ditekan
  document.getElementById('save-data').addEventListener('click', function () {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !message) {
      alert("Harap isi semua field sebelum mengirim pesan!");
      return;
    }

    // Simpan data ke variabel
    savedData = { name, email, message };

    alert("Pesan berhasil disimpan! Sekarang Anda bisa mengunduh PDF.");
  });

  // Unduh data ke PDF saat tombol "Unduh PDF" ditekan
  document.getElementById('download-pdf').addEventListener('click', function () {
    if (!savedData) {
      alert("Belum ada data yang disimpan! Silakan tekan tombol Kirim Pesan dulu.");
      return;
    }

    const { name, email, message } = savedData;

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Judul PDF
    doc.setFontSize(16);
    doc.text("Data Pesan Kontak", 20, 20);

    // Isi data
    doc.setFontSize(12);
    doc.text(`Nama   : ${name}`, 20, 40);
    doc.text(`Email  : ${email}`, 20, 50);
    doc.text("Pesan  :", 20, 60);

    // Jika pesan panjang, gunakan splitTextToSize agar teks otomatis wrap
    const splitMessage = doc.splitTextToSize(message, 170);
    doc.text(splitMessage, 20, 70);

    // Simpan PDF
    doc.save(`pesan-${name}.pdf`);

    alert("PDF berhasil diunduh!");
  });



});
