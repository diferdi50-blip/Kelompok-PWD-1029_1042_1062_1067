  $(document).ready(function () {
      function tampilError(id, pesan) {
        $("#err-" + id).text(pesan);
        $("#" + id).addClass("salah");
      }
      function baris(label, nilai) {
        return $("<p>").append($("<span>").text(label), $("<b>").text(nilai));
      }

      $("#formDaftar").submit(function (event) {
        event.preventDefault();
        var nama = $("#nama").val().trim();
        var email = $("#email").val().trim();
        var hp = $("#hp").val().trim();
        var sesi = $("#sesi").val();
        var setuju = $("#setuju").prop("checked");
        var valid = true;

        $(".error").text("");
        $(".field").removeClass("salah");

        if (nama.length < 3) { tampilError("nama", "Nama wajib diisi, minimal 3 huruf."); valid = false; }
        var at = email.indexOf("@");
        if (at === -1 || email.indexOf(".", at) === -1) { tampilError("email", "Email harus memuat @ dan titik, contoh: budi@sekolah.id"); valid = false; }
        if (hp !== "" && !/^[0-9]+$/.test(hp)) { tampilError("hp", "No. HP hanya boleh berisi angka."); valid = false; }
        if (sesi === "") { tampilError("sesi", "Pilih salah satu sesi."); valid = false; }
        if (!setuju) { tampilError("setuju", "Centang persetujuan untuk melanjutkan."); valid = false; }

        if (valid) {
          $("#kartu").empty().append(
            $("<div>").addClass("kartu-ok").append(
              $("<h3>").text("Pendaftaran berhasil!"),
              baris("Nama", nama),
              baris("Email", email),
              baris("No. HP", hp === "" ? "-" : hp),
              baris("Sesi", sesi),
              $("<button>").attr("type", "button").addClass("sec tutup").text("Tutup kartu")
            )
          );
          $("#formDaftar").trigger("reset");
          $(".field").removeClass("aktif");
        }
      });

      $("#btnReset").click(function () {
        $("#formDaftar").trigger("reset");
        $(".error").text("");
        $(".field").removeClass("salah aktif");
        $("#kartu").empty();
      });

      $("#btnDaftar").mouseover(function () { $(this).addClass("hover-aktif"); })
        .mouseout(function () { $(this).removeClass("hover-aktif"); });

      $(".field").focus(function () { $(this).removeClass("salah").addClass("aktif"); });
      $("#nama").blur(function () {
        $(this).removeClass("aktif");
        if ($(this).val().trim() === "") { tampilError("nama", "Kamu keluar tanpa mengisi nama!"); }
        else { $("#err-nama").text(""); }
      });

      $("#kartu").on("click", ".tutup", function () { $("#kartu").empty(); });
    });