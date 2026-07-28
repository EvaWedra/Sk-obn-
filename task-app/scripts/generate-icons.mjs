// Generates real PNG PWA icons (no external deps) from the brand colors.
// A teal→dark-teal gradient square with a bold white checkmark and a gold accent dot.
import fs from "fs";
import path from "path";
import zlib from "zlib";

const OUT_DIR = path.join(process.cwd(), "public", "icons");

const CRC_TABLE = (() => {
  const table = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) {
      c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    }
    table[n] = c >>> 0;
  }
  return table;
})();

function crc32(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    c = CRC_TABLE[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  }
  return (c ^ 0xffffffff) >>> 0;
}

function chunk(type, data) {
  const typeBuf = Buffer.from(type, "ascii");
  const lenBuf = Buffer.alloc(4);
  lenBuf.writeUInt32BE(data.length, 0);
  const crcBuf = Buffer.alloc(4);
  crcBuf.writeUInt32BE(crc32(Buffer.concat([typeBuf, data])), 0);
  return Buffer.concat([lenBuf, typeBuf, data, crcBuf]);
}

function encodePNG(width, height, rgba) {
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(width, 0);
  ihdrData.writeUInt32BE(height, 4);
  ihdrData[8] = 8; // bit depth
  ihdrData[9] = 6; // color type RGBA
  ihdrData[10] = 0;
  ihdrData[11] = 0;
  ihdrData[12] = 0;
  const ihdr = chunk("IHDR", ihdrData);

  const raw = Buffer.alloc((width * 4 + 1) * height);
  for (let y = 0; y < height; y++) {
    const rowStart = y * (width * 4 + 1);
    raw[rowStart] = 0; // filter type: none
    rgba.copy(raw, rowStart + 1, y * width * 4, (y + 1) * width * 4);
  }
  const idatData = zlib.deflateSync(raw, { level: 9 });
  const idat = chunk("IDAT", idatData);

  const iend = chunk("IEND", Buffer.alloc(0));

  return Buffer.concat([signature, ihdr, idat, iend]);
}

function hexToRgb(hex) {
  const v = hex.replace("#", "");
  return [parseInt(v.slice(0, 2), 16), parseInt(v.slice(2, 4), 16), parseInt(v.slice(4, 6), 16)];
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function distToSegment(px, py, x1, y1, x2, y2) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const lenSq = dx * dx + dy * dy;
  let t = lenSq === 0 ? 0 : ((px - x1) * dx + (py - y1) * dy) / lenSq;
  t = Math.max(0, Math.min(1, t));
  const cx = x1 + t * dx;
  const cy = y1 + t * dy;
  return Math.hypot(px - cx, py - cy);
}

function drawIcon(size, { primary, primaryDark, accent }) {
  const [r1, g1, b1] = hexToRgb(primary);
  const [r2, g2, b2] = hexToRgb(primaryDark);
  const [ra, ga, ba] = hexToRgb(accent);

  const buf = Buffer.alloc(size * size * 4);

  // Checkmark geometry in unit space (0..1), scaled to `size`.
  const A = [0.28, 0.52];
  const B = [0.44, 0.68];
  const C = [0.74, 0.32];
  const stroke = size * 0.09;

  // Accent dot (top-right, hints "notifications").
  const dotCx = size * 0.78;
  const dotCy = size * 0.24;
  const dotR = size * 0.09;

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const idx = (y * size + x) * 4;
      const t = (x / size + y / size) / 2;
      let r = lerp(r1, r2, t);
      let g = lerp(g1, g2, t);
      let b = lerp(b1, b2, t);

      const d = distToSegment(x, y, A[0] * size, A[1] * size, B[0] * size, B[1] * size, stroke);
      const d2 = distToSegment(x, y, B[0] * size, B[1] * size, C[0] * size, C[1] * size, stroke);
      const onCheck = Math.min(d, d2) < stroke / 2;

      const dotDist = Math.hypot(x - dotCx, y - dotCy);
      const onDot = dotDist < dotR;

      if (onDot) {
        r = ra;
        g = ga;
        b = ba;
      } else if (onCheck) {
        r = 255;
        g = 255;
        b = 255;
      }

      buf[idx] = Math.round(r);
      buf[idx + 1] = Math.round(g);
      buf[idx + 2] = Math.round(b);
      buf[idx + 3] = 255;
    }
  }

  return buf;
}

function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const palette = { primary: "#5cc9b0", primaryDark: "#2e716a", accent: "#F5A623" };
  const sizes = [192, 512];
  for (const size of sizes) {
    const rgba = drawIcon(size, palette);
    const png = encodePNG(size, size, rgba);
    const outPath = path.join(OUT_DIR, `icon-${size}.png`);
    fs.writeFileSync(outPath, png);
    console.log(`Wrote ${outPath} (${png.length} bytes)`);
  }
}

main();
