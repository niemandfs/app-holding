// Isi halaman "sedang dikembangkan" dalam bentuk HTML
const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <!-- Minta mesin pencari tidak memasukkan halaman ini ke hasil pencarian -->
  <meta name="robots" content="noindex">
  <title>Coming soon | novanfs.my.id</title>
  <style>
    /* Tema gelap, isi di tengah layar */
    body {
      margin: 0;
      min-height: 100vh;
      display: grid;
      place-items: center;
      background: #0b0d12;
      color: #e8eaef;
      font-family: system-ui, -apple-system, "Segoe UI", sans-serif;
      text-align: center;
      padding: 24px;
    }
    /* Label kecil gaya terminal */
    .label {
      font-family: ui-monospace, monospace;
      font-size: 0.8rem;
      color: #9aa1ad;
      margin: 0 0 12px;
    }
    h1 {
      margin: 0;
      font-size: clamp(2rem, 6vw, 3.2rem);
    }
    p {
      color: #9aa1ad;
    }
    a {
      color: #e8eaef;
    }
  </style>
</head>
<body>
  <main>
    <p class="label">$ status app {{ENV}} </p>
    <h1>Coming soon.</h1>
    <p>This page is not ready yet. Check back soon.</p>
    <p><a href="https://novanfs.my.id">Back to novanfs.my.id</a></p>
  </main>
</body>
</html>`

export default {
  // Dijalankan setiap ada pengunjung. env berisi variabel dari wrangler.jsonc
  async fetch(request, env) {
    // Kalau staging, tampilkan tulisan STAGING. Kalau production, kosong
    const label = env.ENVIRONMENT === 'staging' ? '[STAGING]' : ''
    const page = html.replace('{{ENV}}', label)

    return new Response(page, {
      headers: {
        'content-type': 'text/html; charset=UTF-8',
        'x-robots-tag': 'noindex',
        'cache-control': 'no-store',
      },
    })
  },
}