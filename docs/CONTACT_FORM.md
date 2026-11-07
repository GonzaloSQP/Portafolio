# Formulario de contacto: envío real al correo del propietario

La página `/contacto` ya no depende solo de `mailto:` (que no hace nada si el
visitante no tiene cliente de correo configurado). Ahora incluye un formulario
que envía el mensaje por AJAX al correo del propietario mediante
[FormSubmit](https://formsubmit.co/), sin servidor propio (el sitio es estático).

## Activación obligatoria (una sola vez)

1. Despliega el sitio con el formulario.
2. Envía un mensaje de prueba desde `/contacto`.
3. FormSubmit enviará un correo de **activación** a `chalot_6@hotmail.com`.
4. Haz clic en el enlace de activación de ese correo.
5. Desde entonces, cada mensaje del formulario llegará a ese correo, con el
   remitente del visitante como `Reply-To` (responder va directo al visitante).

> Sin este paso, FormSubmit no entrega los mensajes. Revisa también la carpeta
> de spam de Hotmail en el primer envío y, si hace falta, marca los mensajes
> como «no es spam».

## Cómo funciona

- Campos: nombre, correo, asunto y mensaje (validación en cliente).
- Campo oculto `_honey` anti-bots: si se rellena, se finge éxito sin enviar.
- Si el envío en línea falla, el enlace `mailto:` de respaldo se reescribe con
  asunto y cuerpo ya redactados a partir de lo escrito en el formulario.
- El endpoint se puede cambiar sin tocar código con la variable
  `PUBLIC_CONTACT_FORM_ENDPOINT` (p. ej. una clave de Web3Forms o un
  Cloudflare Worker propio con Resend/SendGrid).

## Verificación

```bash
npm run verify   # incluye tests/contactForm.test.ts y check:links
```
