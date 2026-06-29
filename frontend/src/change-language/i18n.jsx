import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
    resources: {
        tr: {
            translation: {
                dashboard: "Dashboard",
                products: "Ürünler",
                movements: "Hareketler",
                suppliers: "Tedarikçiler",
                orders: "Siparişler",
                mainmenu: "Ana Menü",
                productname:"Ürün ADI",
                productcode:"Ürün Kodu",
                productcategory:"Kategori",
                productstock:"Stok",
                productprice:"Fiyat",
                productstatus:"Durum",
                productsprocess:"İşlemler",
                searchProduct: "Ürün arayınız",
                allCategories: "Tüm kategoriler",
                newProduct: "+ Yeni Ürün",
                addProduct: "Ürün Ekle",
                stockQuantity: "Stok Adedi",
                save: "Kaydet",
                close: "Kapat",

                finished: "Bitti",
                low: "Az",
                enough: "Yeterli",

                totalProduct: "Toplam Ürün",
                allProducts: "Tüm ürünler",
                lowStock: "Düşük Stok",
                lowStockLevel: "Stok seviyesi düşük",
                totalValue: "Toplam Değer",
                totalStockPrice: "Stokların toplam fiyatı",
                totalmove:'Toplam Hareket',
                enterence:'Giriş',
                productrelease:'Çıkış',
                alltime:'Tüm Zamanlar',
                addMovement:'Hareket Ekle',

                in:'Giriş',
                out:'Çıkış',

                lowstock:'Düşük Stok Uyarıları',


                searchMovementPlaceholder: "Ürün, kod veya açıklama ara",
                allMovements: "Tüm hareketler",

                productCode: "Ürün Kodu",
                selectProcess: "İşlem seçiniz",

                description: "Açıklama",
                quantity: "Miktar",
                product: "Ürün",
                code: "Kod",
                process: "İşlem",
                category: "Kategori",
                date: "Tarih",


                monthlyMovementChart: "Aylık Giren / Çıkan Ürünler",
                january: "Ocak",
                february: "Şubat",
                march: "Mart",
                april: "Nisan",
                may: "Mayıs",
                june: "Haziran",
                july: "Temmuz",
                august: "Ağustos",
                september: "Eylül",
                october: "Ekim",
                november: "Kasım",
                december: "Aralık",
            },
        },

        en: {
            translation: {
                dashboard: "Dashboard",
                products: "Products",
                movements: "Movements",
                suppliers: "Suppliers",
                orders: "Orders",
                mainmenu: "Main Menu",
                productname:"Product Name",
                productcode:"Product Code",
                productcategory:"Category",
                productstock:"Stock",
                productprice:"Price",
                productstatus:"Status",
                productsprocess:"Process",
                searchProduct: "Search product",
                allCategories: "All categories",
                newProduct: "+ New Product",
                addProduct: "Add Product",
                stockQuantity: "Stock Quantity",
                save: "Save",
                close: "Close",

                finished: "Finished",
                low: "Low",
                enough: "Enough",

                totalProduct: "Total Products",
                allProducts: "All products",
                lowStock: "Low Stock",
                lowStockLevel: "Low stock level",
                totalValue: "Total Value",
                totalStockPrice: "Total stock value",
                totalmove:'Total Movements',
                enterence:'Enterence',
                productrelease:'Release',
                alltime:'All Times',
                addMovement:'Add Movement',

                in:'In',
                out:'Out',

                lowstock:'Low Stock Alerts',

                searchMovementPlaceholder: "Search product, code or description",
                allMovements: "All movements",

                productCode: "Product Code",
                selectProcess: "Select process",


                description: "Description",
                quantity: "Quantity",
                product: "Product",
                code: "Code",
                process: "Process",
                category: "Category",
                date: "Date",

                monthlyMovementChart: "Monthly In / Out Products",
                january: "January",
                february: "February",
                march: "March",
                april: "April",
                may: "May",
                june: "June",
                july: "July",
                august: "August",
                september: "September",
                october: "October",
                november: "November",
                december: "December",


            },
        },
    },

    lng: localStorage.getItem("lang") || "tr",
    fallbackLng: "tr",

    interpolation: {
        escapeValue: false,
    },
});

export default i18n;