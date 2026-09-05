/**
 * UNIVERSUM — local media (IndexedDB) for Tagebuch photos.
 * Blobs stay out of localStorage (feldlicht-v15). DB: universum-media.
 */
(function (global) {
  'use strict';

  const DB_NAME = 'universum-media';
  const DB_VERSION = 1;
  const STORE = 'photos';
  const MAX_EDGE = 1280;
  const JPEG_QUALITY = 0.7;

  let dbPromise = null;

  function openDb() {
    if (dbPromise) return dbPromise;
    dbPromise = new Promise((resolve, reject) => {
      if (!global.indexedDB) {
        reject(new Error('IndexedDB nicht verfügbar'));
        return;
      }
      const req = indexedDB.open(DB_NAME, DB_VERSION);
      req.onupgradeneeded = () => {
        const db = req.result;
        if (!db.objectStoreNames.contains(STORE)) {
          db.createObjectStore(STORE, { keyPath: 'id' });
        }
      };
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error || new Error('IndexedDB open failed'));
    });
    return dbPromise;
  }

  function txStore(mode) {
    return openDb().then(db => {
      const tx = db.transaction(STORE, mode);
      return tx.objectStore(STORE);
    });
  }

  function putPhoto(id, blob, meta) {
    meta = meta || {};
    return openDb().then(db => new Promise((resolve, reject) => {
      const tx = db.transaction(STORE, 'readwrite');
      tx.objectStore(STORE).put({
        id: String(id),
        blob: blob,
        mime: blob.type || meta.mime || 'image/jpeg',
        w: meta.w || null,
        h: meta.h || null,
        bytes: blob.size || null,
        created: meta.created || new Date().toISOString()
      });
      tx.oncomplete = () => resolve(id);
      tx.onerror = () => reject(tx.error || new Error('put failed'));
    }));
  }

  function getPhoto(id) {
    if (!id) return Promise.resolve(null);
    return openDb().then(db => new Promise((resolve, reject) => {
      const tx = db.transaction(STORE, 'readonly');
      const req = tx.objectStore(STORE).get(String(id));
      req.onsuccess = () => resolve(req.result || null);
      req.onerror = () => reject(req.error);
    }));
  }

  function removePhoto(id) {
    if (!id) return Promise.resolve();
    return openDb().then(db => new Promise((resolve, reject) => {
      const tx = db.transaction(STORE, 'readwrite');
      tx.objectStore(STORE).delete(String(id));
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    }));
  }

  function blobToDataUrl(blob) {
    return new Promise((resolve, reject) => {
      const r = new FileReader();
      r.onload = () => resolve(r.result);
      r.onerror = () => reject(r.error);
      r.readAsDataURL(blob);
    });
  }

  function dataUrlToBlob(dataUrl) {
    const m = String(dataUrl || '').match(/^data:([^;]+);base64,(.+)$/);
    if (!m) return null;
    const mime = m[1];
    const bin = atob(m[2]);
    const len = bin.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) bytes[i] = bin.charCodeAt(i);
    return new Blob([bytes], { type: mime });
  }

  function getDataUrl(id) {
    return getPhoto(id).then(rec => {
      if (!rec || !rec.blob) return null;
      return blobToDataUrl(rec.blob);
    });
  }

  function getObjectUrl(id) {
    return getPhoto(id).then(rec => {
      if (!rec || !rec.blob) return null;
      return URL.createObjectURL(rec.blob);
    });
  }

  /** Compress image file / blob → JPEG blob + dataURL, max edge ~1280, q~0.7 */
  function compressImage(fileOrBlob, opts) {
    opts = opts || {};
    const maxEdge = opts.maxEdge || MAX_EDGE;
    const quality = opts.quality != null ? opts.quality : JPEG_QUALITY;
    return new Promise((resolve, reject) => {
      if (!fileOrBlob) {
        reject(new Error('Keine Datei'));
        return;
      }
      const url = URL.createObjectURL(fileOrBlob);
      const img = new Image();
      img.onload = () => {
        try {
          let w = img.naturalWidth || img.width;
          let h = img.naturalHeight || img.height;
          if (!w || !h) {
            URL.revokeObjectURL(url);
            reject(new Error('Bildgröße unbekannt'));
            return;
          }
          const scale = Math.min(1, maxEdge / Math.max(w, h));
          w = Math.max(1, Math.round(w * scale));
          h = Math.max(1, Math.round(h * scale));
          const canvas = document.createElement('canvas');
          canvas.width = w;
          canvas.height = h;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, w, h);
          URL.revokeObjectURL(url);
          canvas.toBlob(blob => {
            if (!blob) {
              reject(new Error('Kompression fehlgeschlagen'));
              return;
            }
            blobToDataUrl(blob).then(dataUrl => {
              resolve({ blob: blob, dataUrl: dataUrl, w: w, h: h, mime: 'image/jpeg' });
            }).catch(reject);
          }, 'image/jpeg', quality);
        } catch (e) {
          URL.revokeObjectURL(url);
          reject(e);
        }
      };
      img.onerror = () => {
        URL.revokeObjectURL(url);
        reject(new Error('Bild konnte nicht geladen werden'));
      };
      img.src = url;
    });
  }

  function uid(prefix) {
    const p = prefix || 'ph';
    return p + '-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 9);
  }

  /* ——— Minimal ZIP (STORE) for on-device backup ——— */
  function crc32(buf) {
    let c = ~0;
    for (let i = 0; i < buf.length; i++) {
      c ^= buf[i];
      for (let k = 0; k < 8; k++) c = (c >>> 1) ^ (0xedb88320 & -(c & 1));
    }
    return ~c >>> 0;
  }

  function u16(n) {
    const b = new Uint8Array(2);
    b[0] = n & 255; b[1] = (n >>> 8) & 255;
    return b;
  }

  function u32(n) {
    const b = new Uint8Array(4);
    b[0] = n & 255; b[1] = (n >>> 8) & 255;
    b[2] = (n >>> 16) & 255; b[3] = (n >>> 24) & 255;
    return b;
  }

  function concatBytes(parts) {
    let len = 0;
    parts.forEach(p => { len += p.length; });
    const out = new Uint8Array(len);
    let o = 0;
    parts.forEach(p => { out.set(p, o); o += p.length; });
    return out;
  }

  function strBytes(s) {
    return new TextEncoder().encode(s);
  }

  /**
   * files: [{ name: string, data: Uint8Array|string|Blob }]
   * returns Blob (application/zip)
   */
  async function buildZip(files) {
    const locals = [];
    const centrals = [];
    let offset = 0;
    for (let i = 0; i < files.length; i++) {
      const f = files[i];
      let data;
      if (f.data instanceof Uint8Array) data = f.data;
      else if (typeof f.data === 'string') data = strBytes(f.data);
      else if (f.data instanceof Blob) data = new Uint8Array(await f.data.arrayBuffer());
      else data = strBytes(String(f.data || ''));
      const nameBytes = strBytes(f.name);
      const crc = crc32(data);
      const local = concatBytes([
        u32(0x04034b50),
        u16(20), u16(0), u16(0),
        u16(0), u16(0),
        u32(crc), u32(data.length), u32(data.length),
        u16(nameBytes.length), u16(0),
        nameBytes, data
      ]);
      const central = concatBytes([
        u32(0x02014b50),
        u16(20), u16(20), u16(0), u16(0),
        u16(0), u16(0),
        u32(crc), u32(data.length), u32(data.length),
        u16(nameBytes.length), u16(0), u16(0),
        u16(0), u16(0), u32(0), u32(offset),
        nameBytes
      ]);
      locals.push(local);
      centrals.push(central);
      offset += local.length;
    }
    const centralDir = concatBytes(centrals);
    const end = concatBytes([
      u32(0x06054b50),
      u16(0), u16(0),
      u16(files.length), u16(files.length),
      u32(centralDir.length), u32(offset),
      u16(0)
    ]);
    return new Blob([concatBytes(locals.concat([centralDir, end]))], { type: 'application/zip' });
  }

  function downloadBlob(blob, filename) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 4000);
  }

  /** Collect media map id → dataUrl for export */
  async function collectMediaMap(ids) {
    const map = {};
    const list = (ids || []).filter(Boolean);
    for (let i = 0; i < list.length; i++) {
      const id = list[i];
      try {
        const du = await getDataUrl(id);
        if (du) map[id] = du;
      } catch (_) { /* skip */ }
    }
    return map;
  }

  /** Restore media map (dataUrls) into IndexedDB */
  async function restoreMediaMap(map) {
    if (!map || typeof map !== 'object') return 0;
    let n = 0;
    const ids = Object.keys(map);
    for (let i = 0; i < ids.length; i++) {
      const id = ids[i];
      const blob = dataUrlToBlob(map[id]);
      if (!blob) continue;
      await putPhoto(id, blob, { mime: blob.type, created: new Date().toISOString() });
      n++;
    }
    return n;
  }

  global.UniversumMedia = {
    DB_NAME,
    MAX_EDGE,
    JPEG_QUALITY,
    openDb,
    putPhoto,
    getPhoto,
    removePhoto,
    getDataUrl,
    getObjectUrl,
    blobToDataUrl,
    dataUrlToBlob,
    compressImage,
    uid,
    buildZip,
    downloadBlob,
    collectMediaMap,
    restoreMediaMap
  };
})(typeof window !== 'undefined' ? window : globalThis);
