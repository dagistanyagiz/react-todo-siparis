
function durumSinifi(durum) {
  if (durum === 'beklemede') return 'status-beklemede';
  if (durum === 'hazirlaniyor') return 'status-hazirlaniyor';
  if (durum === 'teslim edildi') return 'status-teslim';
  return '';
}

function durumAdi(durum) {
  if (durum === 'beklemede') return 'Beklemede';
  if (durum === 'hazirlaniyor') return 'Hazırlanıyor';
  if (durum === 'teslim edildi') return 'Teslim Edildi';
  return durum;
}

function SiparisListesi({ siparisler, onSil, onDurumDegistir }) {
  const toplam = siparisler.reduce(
    (t, s) => t + s.adet * s.fiyat,
    0
  );

  return (
    <div className="card order-list-card">

      <div className="card-header list-header">
        <div>
          <h5>Siparişler</h5>
          <span className="order-count">
            {siparisler.length} kayıtlı sipariş
          </span>
        </div>

        <div className="total-box">
          <span>Toplam Tutar</span>
          <strong>
            {toplam.toLocaleString('tr-TR')} ₺
          </strong>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table order-table align-middle mb-0">

          <thead>
            <tr>
              <th>Müşteri</th>
              <th>Ürün</th>
              <th>Adet</th>
              <th>Fiyat</th>
              <th>Durum</th>
              <th>İşlem</th>
            </tr>
          </thead>

          <tbody>

            {siparisler.length === 0 && (
              <tr>
                <td colSpan="6">
                  <div className="empty-state">

                    <h6>Henüz sipariş bulunmuyor</h6>
                    <p>Yeni sipariş ekleyerek başlayabilirsiniz.</p>
                  </div>
                </td>
              </tr>
            )}

            {siparisler.map(s => (
              <tr key={s.id}>

                <td className="customer-cell">
                  {s.musteri}
                </td>

                <td>{s.urun}</td>

                <td>{s.adet}</td>

                <td className="price-cell">
                  {(s.fiyat * s.adet).toLocaleString('tr-TR')} ₺
                </td>

                <td>
                  <div className="status-wrapper">

                    <span className={`status-badge ${durumSinifi(s.durum)}`}>
                      {durumAdi(s.durum)}
                    </span>

                    <select
                      className="status-select"
                      value={s.durum}
                      onChange={e =>
                        onDurumDegistir(s.id, e.target.value)
                      }
                    >
                      <option value="beklemede">Beklemede</option>
                      <option value="hazirlaniyor">Hazırlanıyor</option>
                      <option value="teslim edildi">Teslim Edildi</option>
                    </select>

                  </div>
                </td>

                <td>
                  <button
                    className="delete-order-btn"
                    onClick={() => onSil(s.id)}
                  >
                    Sil
                  </button>
                </td>

              </tr>
            ))}

          </tbody>
        </table>
      </div>

    </div>
  );
}

export default SiparisListesi;
