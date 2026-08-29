export {};

declare global {
  /**
   * Bindings y secretos del Worker (wrangler.jsonc + `wrangler secret put`).
   * Ver ARCHITECTURE.md §7 y §8, y PHASE_1_PLAN.md — Setup / Variables de entorno.
   */
  interface Env {
    /** Binding de assets estáticos (`./out`), declarado en wrangler.jsonc. */
    ASSETS: {
      fetch(request: Request): Promise<Response>;
    };

    /** Autentica contra Resend. Su ausencia activa la degradación grácil en el sitio. */
    RESEND_API_KEY: string;
    /** Correo de Waiki que recibe los mensajes del formulario. */
    CONTACTO_DESTINO: string;
    /** Remitente en el dominio verificado de Ignacio. */
    CONTACTO_REMITENTE: string;
    /** Valida el token de Cloudflare Turnstile en el Worker. */
    TURNSTILE_SECRET_KEY: string;

    /**
     * Límite de tasa nativo de Workers para `POST /api/contacto` (Bloque 10
     * de PHASE_1_PLAN.md, tarea 10.2). Binding `ratelimits` declarado en
     * wrangler.jsonc, tipo `simple`.
     *
     * ⚠️ El binding real solo admite `period` de 10 o 60 segundos (no 3600):
     * ver el comentario junto a `ratelimits` en wrangler.jsonc para la
     * limitación verificada y la decisión tomada ("5 por hora" del plan se
     * aproxima con "5 por minuto", la ventana más larga que la API permite).
     */
    LIMITADOR_CONTACTO: {
      limit(opciones: { key: string }): Promise<{ success: boolean }>;
    };
  }
}
