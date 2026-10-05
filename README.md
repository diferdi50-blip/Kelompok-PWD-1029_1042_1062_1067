Program ini adalah halaman web pendaftaran Workshop Web Programming untuk siswa SMK Nusantara. Isinya header sekolah, bagian hero, panel syarat pendaftaran dan informasi kegiatan, serta formulir dengan lima isian: nama lengkap, email, nomor HP (opsional), pilihan sesi (Pagi, Siang, atau Malam), dan checkbox persetujuan tata tertib. Jika semua isian valid, halaman menampilkan kartu konfirmasi berisi data pendaftar. Tampilannya responsif dan mengikuti mode terang atau gelap perangkat.

Cara kerjanya, HTML membentuk kerangka halaman, tempat pesan error di bawah setiap isian, dan `<div id="kartu">` kosong untuk kartu konfirmasi. CSS mengatur warna lewat variabel di `:root` agar mode gelap mudah diganti, serta memberi class `.salah` (border merah), `.aktif` (border biru), dan animasi pada kartu. jQuery berjalan setelah halaman dimuat: saat tombol "Daftar sekarang" ditekan, `preventDefault()` mencegah halaman reload, lalu nilai semua isian diambil dan divalidasi (nama minimal 3 karakter, email memuat `@` dan titik, HP hanya angka jika diisi, sesi dipilih, dan checkbox dicentang). Isian yang gagal ditandai lewat fungsi `tampilError()`, dan jika semuanya lolos, kartu konfirmasi dibuat dengan `.append()` dan `.text()` lalu form dikosongkan. Interaksi tambahannya meliputi tombol "Kosongkan" untuk mereset form, efek hover pada tombol daftar, penanda `.aktif` saat isian difokuskan, pesan peringatan saat kolom nama ditinggalkan kosong, dan tombol "Tutup kartu" yang memakai event delegation karena baru dibuat setelah pendaftaran berhasil.

Ringkasan materi yang dipakai
1. Menghubungkan jQuery dan ready()
html
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
<script src="script.js"></script>
js
$(document).ready(function () {
  // semua kode jQuery ditulis di sini
});
jQuery adalah library JavaScript. Baris pertama memuat library-nya, baris kedua memuat kode kita. Urutannya tidak boleh ditukar.
ready() menjalankan kode setelah halaman selesai dimuat. Tanpa ini, kode bisa gagal karena elemennya belum ada.
Pola dasar jQuery selalu sama: $(selektor).aksi();
2. Selektor
Jenis	Sintaks	Contoh di kode	Memilih
ID	$("#id")	$("#nama"), $("#formDaftar"), $("#kartu")	Tepat 1 elemen
Class	$(".class")	$(".error"), $(".field")	Semua elemen ber-class itu
Tag	$("tag")	$("<div>"), $("<p>") (saat membuat elemen)	Semua tag itu

Ingat: # untuk satu elemen (unik), . untuk banyak elemen.

3. Event
Event	Dipakai di	Fungsinya
submit	$("#formDaftar").submit(...)	Menjalankan validasi saat form dikirim
click	$("#btnReset").click(...)	Mengosongkan form
click (delegasi)	$("#kartu").on("click", ".tutup", ...)	Menutup kartu. Memakai .on() karena tombol dibuat setelah halaman dimuat
focus	$(".field").focus(...)	Input aktif: hapus tanda merah, beri garis biru
blur	$("#nama").blur(...)	Validasi langsung saat input ditinggalkan
mouseover / mouseout	$("#btnDaftar").mouseover(...)	Tombol sedikit lebih terang saat disentuh kursor

event.preventDefault(): perilaku bawaan submit adalah mengirim data dan memuat ulang halaman. Kita menahannya supaya data bisa dicek dulu di layar.

$(this): berarti "elemen yang sedang memicu event". Satu kode .focus() melayani semua input .field tanpa menulis ulang selektor.

4. Manipulasi DOM
Metode	Dipakai untuk
.val()	Mengambil isi input dan dropdown
.val().trim()	Mengambil isi sambil membuang spasi di ujung, jadi " " dianggap kosong
.prop("checked")	Membaca status checkbox (bukan .val())
.text()	Mengisi pesan error dan data pada kartu
.addClass() / .removeClass()	Menandai field salah (salah) atau aktif (aktif)
.append()	Menyusun kartu konfirmasi dari elemen-elemen kecil
.empty()	Mengosongkan wadah kartu sebelum diisi, supaya kartu tidak bertumpuk
.trigger("reset")	Mengosongkan seluruh form dengan satu perintah

Kenapa .text(), bukan .html()? Data kartu berasal dari pengguna. .html() bisa menjalankan tag <script> yang diselipkan (serangan XSS), sedangkan .text() menampilkannya sebagai teks biasa. Aturannya: untuk teks dari pengguna, selalu pakai .text().

5. Validasi form

Polanya memakai variabel bendera:

js
var valid = true;                          // bendera dinaikkan
if (nama.length < 3) {                     // aturan dilanggar...
  tampilError("nama", "...");
  valid = false;                           // ...bendera diturunkan
}
// ...aturan lain...
if (valid) { /* tampilkan kartu */ }       // di akhir baru cek bendera
Setiap aturan diperiksa satu per satu dan semua error muncul sekaligus, jadi pengguna tidak perlu submit berulang untuk tahu semua kesalahannya.
email.indexOf("@") === -1 artinya "@" tidak ditemukan. Tiga tanda sama dengan (===) wajib.
No. HP hanya dicek jika tidak kosong (hp !== ""), karena sifatnya opsional.
