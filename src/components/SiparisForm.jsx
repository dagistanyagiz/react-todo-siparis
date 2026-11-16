
import { useState } from 'react';

function SiparisForm({ onEkle }) {
  const [musteri, setMusteri] = useState('');
  const [urun, setUrun] = useState('');
  const [adet, setAdet] = useState(1);
  const [fiyat, setFiyat] = useState('');

  function gonder(e) {
    e.preventDefault();

    if (!musteri || !urun || !fiyat) return;

    onEkle({
      musteri: musteri,
      urun: urun,
      adet: Number(adet),
      fiyat: Number(fiyat)
    });

    setMusteri('');
    setUrun('');
    setAdet(1);
    setFiyat('');
  }

  return (
    <div className="card order-card mb-4">
      <div className="card-header order-card-header">
        <div>
          <h5>Yeni Sipariş</h5>
          <p>Sipariş bilgilerini aşağıdan ekleyebilirsiniz.</p>
        </div>
      </div>

      <div className="card-body order-card-body">
        <form onSubmit={gonder} className="row g-3">

          <div className="col-md-3">
            <label>Müşteri</label>
            <input
              className="form-control"
              placeholder="Müşteri adı"
              value={musteri}
              onChange={e => setMusteri(e.target.value)}
            />
          </div>

          <div className="col-md-3">
            <label>Ürün</label>
            <input
              className="form-control"
              placeholder="Ürün adı"
              value={urun}
              onChange={e => setUrun(e.target.value)}
            />
          </div>

          <div className="col-md-2">
            <label>Adet</label>
            <input
              type="number"
              min="1"
              className="form-control"
              value={adet}
              onChange={e => setAdet(e.target.value)}
            />
          </div>

          <div className="col-md-2">
            <label>Fiyat (₺)</label>
            <input
              type="number"
              min="0"
              className="form-control"
              placeholder="0.00"
              value={fiyat}
              onChange={e => setFiyat(e.target.value)}
            />
          </div>

          <div className="col-md-2 d-flex align-items-end">
            <button className="btn btn-primary add-order-btn w-100">
              + Sipariş Ekle
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default SiparisForm;
