# Formulario de contacto: envío real con Web3Forms

El formulario de `/contacto` envía por AJAX a `https://api.web3forms.com/submit`.
Web3Forms en plan gratuito **solo acepta envíos desde el navegador** (las
llamadas desde servidor requieren Pro), por eso la `access_key` viaja en el
JS compilado. Es una clave **pública por diseño**: su seguridad no es el
secreto, sino restringir qué dominios pueden usarla.

## Cómo se protege la clave

1. **Nunca en el repo**: el código solo referencia
   `PUBLIC_WEB3FORMS_ACCESS_KEY` (variable de entorno). La clave vive en
   `.env.local` (ignorado por git) y como secreto/variable del proyecto
   `portafolio-marcio` en Cloudflare Pages.
2. **Dominio restringido (paso del propietario)**: en
   [web3forms.com](https://web3forms.com) → tu formulario → *Allowed Domains*,
   agrega únicamente `dev.apiscusco.com`. Así, aunque alguien vea la clave
   inspeccionando el sitio, no podrá usarla desde otro dominio.
3. En inspeccionar/red se verá la petición a `api.web3forms.com` con la clave:
   es el funcionamiento previsto por Web3Forms para claves públicas.

## Rotar o configurar la clave

```bash
# Local (build)
# .env.local (NO versionado): PUBLIC_WEB3FORMS_ACCESS_KEY=<clave>

# Cloudflare Pages
npx wrangler pages secret put PUBLIC_WEB3FORMS_ACCESS_KEY --project-name=portafolio-marcio
```

> Nota: para despliegues desde integración Git de Cloudflare, la variable
> debe existir también en *Settings → Environment variables* del proyecto,
> porque el build de Astro la necesita en tiempo de compilación.

## Flujo

1. El visitante envía nombre, correo y mensaje.
2. El JS valida, descarta bots por el campo `_honey` y POSTea JSON a Web3Forms.
3. Web3Forms entrega el correo en la bandeja configurada, con el correo del
   visitante como remitente/`Reply-To`.
4. Si el envío falla, la página indica escribir directo al correo de contacto.

## Verificación

```bash
npm run verify   # incluye tests/contactForm.test.ts (clave nunca en git)
```
