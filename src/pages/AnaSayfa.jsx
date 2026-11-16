
import { useState, useEffect } from 'react';
import SiparisForm from '../components/SiparisForm';
import SiparisListesi from '../components/SiparisListesi';
import '../App.css';

function AnaSayfa() {
  const [siparisler, setSiparisler] = useState(() => {
    const kayitli = localStorage.getItem('siparisler');

    if (kayitli) return JSON.parse(kayitli);

    return [
      { id: 1, musteri: 'Ayşe Yılmaz', urun: 'Laptop', adet: 1, fiyat: 56000, durum: 'beklemede' },
      { id: 2, musteri: 'Ozan Çubuk', urun: 'Telefon', adet: 2, fiyat: 32000, durum: 'hazirlaniyor' }
    ];
  });

  useEffect(() => {
    localStorage.setItem('siparisler', JSON.stringify(siparisler));
  }, [siparisler]);

  function ekle(veri) {
    const yeni = {
      ...veri,
      id: Date.now(),
      durum: 'beklemede'
    };

    setSiparisler(prev => [...prev, yeni]);
  }

  function sil(id) {
    setSiparisler(prev => prev.filter(s => s.id !== id));
  }

  function durumDegistir(id, yeniDurum) {
    setSiparisler(prev =>
      prev.map(s =>
        s.id === id ? { ...s, durum: yeniDurum } : s
      )
    );
  }

  const toplamTutar = siparisler.reduce(
    (toplam, s) => toplam + s.adet * s.fiyat, 0
  );

  const bekleyen = siparisler.filter(
    s => s.durum === 'beklemede'
  ).length;

  const hazirlanan = siparisler.filter(
    s => s.durum === 'hazirlaniyor'
  ).length;

  const teslimEdilen = siparisler.filter(
    s => s.durum === 'teslim edildi'
  ).length;

  return (
    <div className="dashboard-page">
      <div className="container">

        {/* SAYFA BAŞLIĞI */}
        <header className="dashboard-header">
          <div>
            <span className="page-label">YÖNETİM PANELİ</span>
            <h1>Sipariş Takip</h1>
            <p>Siparişlerinizi tek bir yerden kolayca yönetin.</p>
          </div>

          <div className="header-date">
            <span>TOPLAM SİPARİŞ DEĞERİ</span>
            <strong>
              {toplamTutar.toLocaleString('tr-TR')} ₺
            </strong>
          </div>
        </header>

        {/* İSTATİSTİK KARTLARI */}
        <div className="stats-grid">

          <div className="stat-card stat-blue">
            <div className="stat-top">
              <span>Toplam Sipariş</span>
              <span className="stat-icon">▤</span>
            </div>
            <strong>{siparisler.length}</strong>
            <small>Tüm siparişler</small>
          </div>

          <div className="stat-card stat-orange">
            <div className="stat-top">
              <span>Bekleyen</span>
              <span className="stat-icon">◷</span>
            </div>
            <strong>{bekleyen}</strong>
            <small>İşlem bekleyen siparişler</small>
          </div>

          <div className="stat-card stat-purple">
            <div className="stat-top">
              <span>Hazırlanıyor</span>
              <span className="stat-icon">◉</span>
            </div>
            <strong>{hazirlanan}</strong>
            <small>Hazırlık aşamasındaki siparişler</small>
          </div>

          <div className="stat-card stat-green">
            <div className="stat-top">
              <span>Teslim Edildi</span>
              <span className="stat-icon">✓</span>
            </div>
            <strong>{teslimEdilen}</strong>
            <small>Tamamlanan siparişler</small>
          </div>

        </div>

        {/* YENİ SİPARİŞ FORMU */}
        <SiparisForm onEkle={ekle} />

        {/* SİPARİŞ LİSTESİ */}
        <SiparisListesi
          siparisler={siparisler}
          onSil={sil}
          onDurumDegistir={durumDegistir}
        />

        <footer className="dashboard-footer">
          Sipariş Yönetim Sistemi
        </footer>

      </div>
    </div>
  );
}

export default AnaSayfa;
