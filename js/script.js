let keranjang = [];

// ==========================================
// MENGAMBIL DATA DARI HTML CARD KETIKA KLIK
// ==========================================
const tombolKeranjang = document.querySelectorAll(".add-cart");

tombolKeranjang.forEach(btn => {
    btn.addEventListener("click", () => {
        // Ambil elemen card terdekat dari tombol yang diklik
        let card = btn.closest('.card');
        
        let produk = card.getAttribute("data-nama");
        let harga = parseInt(card.getAttribute("data-harga"));
        let jumlah = 1; // Default tambah 1 saat diklik dari halaman depan

        // Cek apakah item sudah ada di keranjang
        let itemExists = keranjang.find(item => item.produk === produk);

        if (itemExists) {
            itemExists.jumlah += jumlah;
            itemExists.subtotal = itemExists.harga * itemExists.jumlah;
        } else {
            keranjang.push({
                produk: produk,
                harga: harga,
                jumlah: jumlah,
                subtotal: harga * jumlah
            });
        }

        updateBadgeKeranjang();
        tampilkanKeranjang();
        tampilkanToast(produk + " masuk keranjang!");
    });
});

// ==========================================
// TAMPILKAN KE TABEL KERANJANG
// ==========================================
function tampilkanKeranjang() {
    let tbody = document.querySelector("#cartTable tbody");
    tbody.innerHTML = "";
    
    let total = 0;

    if (keranjang.length === 0) {
        tbody.innerHTML = `<tr><td colspan="5" class="empty-cart">Keranjang masih kosong, ayo belanja!</td></tr>`;
        document.getElementById("totalBelanja").innerHTML = "Total: <span>Rp 0</span>";
        return;
    }

    keranjang.forEach((item, index) => {
        total += item.subtotal;

        tbody.innerHTML += `
        <tr>
            <td><strong>${item.produk}</strong></td>
            <td>Rp ${item.harga.toLocaleString('id-ID')}</td>
            <td>
                <button class="qty-btn" onclick="ubahJumlah(${index}, -1)">-</button>
                <input type="text" class="qty-input" value="${item.jumlah}" readonly>
                <button class="qty-btn" onclick="ubahJumlah(${index}, 1)">+</button>
            </td>
            <td>Rp ${item.subtotal.toLocaleString('id-ID')}</td>
            <td>
                <button class="hapus" onclick="hapusItem(${index})"><i class="fas fa-trash"></i> Hapus</button>
            </td>
        </tr>
        `;
    });

    document.getElementById("totalBelanja").innerHTML = "Total: <span>Rp " + total.toLocaleString('id-ID') + "</span>";
}

// ==========================================
// FUNGSI UBAH JUMLAH (+ / -)
// ==========================================
function ubahJumlah(index, perubahan) {
    if (keranjang[index].jumlah + perubahan > 0) {
        keranjang[index].jumlah += perubahan;
        keranjang[index].subtotal = keranjang[index].harga * keranjang[index].jumlah;
    } else {
        // Jika jumlah menjadi 0, hapus dari keranjang
        keranjang.splice(index, 1);
    }
    updateBadgeKeranjang();
    tampilkanKeranjang();
}

// ==========================================
// FUNGSI HAPUS ITEM
// ==========================================
function hapusItem(index) {
    keranjang.splice(index, 1);
    updateBadgeKeranjang();
    tampilkanKeranjang();
}

// ==========================================
// UPDATE BADGE KERANJANG (DI NAVBAR)
// ==========================================
function updateBadgeKeranjang() {
    let totalItem = 0;
    keranjang.forEach(item => {
        totalItem += item.jumlah;
    });
    document.getElementById("cart-badge").innerText = totalItem;
}

// ==========================================
// TOAST NOTIFICATION (PENGGANTI ALERT)
// ==========================================
function tampilkanToast(pesan) {
    let toast = document.getElementById("toast");
    toast.innerText = pesan;
    toast.className = "toast show";
    setTimeout(function() { 
        toast.className = toast.className.replace("show", ""); 
    }, 3000);
}

// ==========================================
// CHECKOUT
// ==========================================
document.getElementById("checkoutBtn").addEventListener("click", () => {
    if(keranjang.length === 0){
        tampilkanToast("Keranjang kosong! Silakan pilih produk.");
        return;
    }
    localStorage.setItem("keranjang", JSON.stringify(keranjang));
    window.location.href = "checkout.html";
});
