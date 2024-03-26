# RPL
https://ybarokah-gacor.vercel.app/
# YBarokah

## About YBarokah

YBarokah merupakan Web Application yang menyediakan layanan foodcourt yang di dalamnya terdapat 7 macam tenant yang dapat dipilih oleh user untuk melakukan pemesanan makanan. Setiap user akan mendapatkan kode unik ketika melakukan pemesanan makanan dan kode unik tersebut akan dipakai user dalam melakukann pembayaran di kasir sentral. dan ketika kasir melakukan input kode unik maka pesanan akan langsung masuk ke riwayat pesanan pada kasir dan tenant.

Link Deploy : 
https://ybarokah-gacor.vercel.app/

## How to run

```
cd my-app  <!-- pastikan pada directory my-app  -->
npm run dev
```

## Usecase dan pj
- 18221042 / Ghaylan Muhammad Fatih : 
1. Melihat Daftar Pesanan dan Mengelola Pesanan
![Daftar dan Mengelola Pesanan](/my-app/doc/Tenant/2.MengelolaPesanan.png)


- 18221064 / Muhammad Thoriq Ramadhan : 
1. Melihat Daftar Tenant
![Daftar Tenant](/my-app/doc/Customer/1.DashboardCustomer.png)
2. Melihat Daftar Menu
![Daftar Tenant](/my-app/doc/Customer/2.DaftarMenu(Customer).png)
3. Memesan Menu
![Pesan](/my-app/doc/Customer/3.DaftarCart.png)


- 18221074 / Hafidz Shidqi : 
1. Login
![LandingPage](/my-app/doc/1.LandingPage.png)
![LoginCustomer](/my-app/doc/1a.LoginCustomer.png)
![LoginStaff](/my-app/doc/1b.LoginStaff.png)
2. Register Tenant
![RegisterTenant](/my-app/doc/Kasir/4.RegisterTenant.png)
![RegisterTenant](/my-app/doc/Kasir/4a.DetailRegisterTenant.png)
3. Melihat Daftar Menu dan Mengelola Menu
![MenuTenant](/my-app/doc/Tenant/3.MengelolaMenu.png)
![MenuTenant](/my-app/doc/Tenant/3a.TambahMenu.png)
![MenuTenant](/my-app/doc/Tenant/3b.UpdateMenu.png)
4. Melihat Hasil Penjualan
![HasilPenjualan](/my-app/doc/Tenant/4.HasilPenjualan.png)


- 18221092 / Dwicakra Danielle : 
1. Melakukan pembayaran
![Pembayaran](/my-app/doc/Kasir/2.MengelolaPembayaran.png)
2. Melihat riwayat pembayaran
![RiwayatPembayaran](/my-app/doc/Kasir/3.RiwayatPembayaran.png)


## Daftar Tabel
Customer:
- "id" : int
- "created_at" : timestamptz
- "isFull" : bool


Kasir :
- "id" : int
- "username" : text
- "password" : text
- "hasLogin" : bool


Menu : 
- "id" : int
- "idTenant" : int
- "nama" : text
- "harga" : int
- "stok" : int
- "deskripsi" : text
- "gambar" : text


Pesanan : 
- "idPesanan" : int
- "idMenu" : int
- "detail" : json
- "totalHarga" : int
- "kodeUnik" : int
- "status" : bool
- "idTenant" : int


Tenant : 
- "idTenant" : int
- "username" : text
- "password" : text
- "deskripsi" : text
- "gambar" : text
- "nama" : text


Transaksi : 
- "idTransaksi" : int
- "idPesanan" : int
- "idKasir" : int
- "waktu" : text
- "totalPembayaran" : int
- "idTenant" : int

