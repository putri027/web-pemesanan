let keranjang = [];

/* ==========================================
   TAMBAH KE KERANJANG
   ========================================== */
const tombolKeranjang = document.querySelectorAll(".add-cart");

tombolKeranjang.forEach(btn => {
    btn.addEventListener("click", () => {
        let card = btn.parentElement;
        
        let produk = card.querySelector("h3").innerText;
        let harga = parseInt(card.querySelector("h4").innerText);
        let jumlah = parseInt(card.querySelector(".qty").value);
        let subtotal = harga * jumlah;

        keranjang.push({
            produk,
            harga,
            jumlah,
            subtotal
        });

        tampilkanKeranjang();

        alert(produk + " berhasil ditambahkan ke keranjang");
    });
});

/* ==========================================
   TAMPILKAN KERANJANG
   ========================================== */
function tampilkanKeranjang(){
    let tbody = document.querySelector("#cartTable tbody");
    tbody.innerHTML = "";
    
    let total = 0;

    keranjang.forEach((item, index) => {
        total += item.subtotal;

        tbody.innerHTML += `
        <tr>
            <td data-label="Produk">${item.produk}</td>
            <td data-label="Jumlah">${item.jumlah}</td>
            <td data-label="Harga">Rp ${item.harga.toLocaleString('id-ID')}</td>
            <td data-label="Subtotal">Rp ${item.subtotal.toLocaleString('id-ID')}</td>
            <td data-label="Aksi">
                <button class="hapus" onclick="hapusItem(${index})">Hapus</button>
            </td>
        </tr>
        `;
    });

    document.getElementById("totalBelanja").innerHTML = "Total : Rp " + total.toLocaleString('id-ID');
}

/* ==========================================
   HAPUS ITEM
   ========================================== */
function hapusItem(index){
    keranjang.splice(index, 1);
    tampilkanKeranjang();
}

/* ==========================================
   CHECKOUT (DIUBAH AGAR PINDAH KE HALAMAN CHECKOUT)
   ========================================== */
document.getElementById("checkoutBtn").addEventListener("click", () => {
    
    // 1. Cek apakah keranjang kosong
    if(keranjang.length === 0){
        alert("Keranjang masih kosong! Silakan pilih produk terlebih dahulu.");
        return;
    }

    // 2. Simpan data keranjang ke localStorage agar bisa dibaca di struk.html nanti
    localStorage.setItem("keranjang", JSON.stringify(keranjang));

    // 3. Alihkan pengguna ke halaman pengisian data diri (checkout.html)
    window.location.href = "checkout.html";
});