# Migración `superpowers` → `frame-ship`

> Based on [obra/superpowers](https://github.com/obra/superpowers) (MIT).

El 2026-10-03 la marca `superpowers` se retiró de este repo (corte limpio).
Nada de `superpowers:` sobrevive como alias funcional: las invocaciones
viejas responden con error ruidoso y la equivalencia correcta.

## Tabla de equivalencias

| Antes | Ahora |
|---|---|
| `superpowers:brainstorming` | `frame-ship:dev:brainstorming` |
| `superpowers:systematic-debugging` | `frame-ship:dev:systematic-debugging` |
| `superpowers:<skill>` (cualquiera del core) | `frame-ship:dev:<skill>` |
| `using-superpowers` | `using-frame-ship` (router de dominios) |
| `diagnosing-superpowers` | `diagnosing-frame-ship` |
| `superpowers:product-discovery` | `frame-ship:product:product-discovery` |
| `superpowers:threat-modeling` | `frame-ship:security:threat-modeling` |
| `superpowers:<skill>` (dominio X) | `frame-ship:<dominio>:<skill>` (tercer segmento = nombre exacto del directorio del skill) |
| `~/.config/superpowers/` | `~/.config/frame-ship/` |
| `.superpowers/` (workspace local) | `.frame-ship/` |
| `~/.superpowers/` (workspace global) | `~/.frame-ship/` |
| `SUPERPOWERS_DISABLE_TELEMETRY` | eliminado (el visual companion y su telemetría se retiraron; no hay nada que desactivar) |
| repo upstream | `github.com/deuriib/frame-ship` |

Los 10 dominios: `dev`, `product`, `security`, `devops`, `finance`,
`legal`, `marketing`, `people`, `revenue`, `automation-roi`.

## Qué hacer

1. Reinstala desde `github.com/deuriib/frame-ship` según tu harness ([README.md](README.md)).
2. Mueve tu workspace local si lo usabas: `mv .superpowers .frame-ship`
   (y `mv ~/.superpowers ~/.frame-ship` para el global).
3. Reemplaza `superpowers:` por `frame-ship:dev:` (o tu dominio) en prompts
   guardados, plantillas de subagentes y scripts.
4. La historia (`RELEASE-NOTES.md`, `docs/plans/`, `docs/superpowers/`)
   conserva la marca vieja a propósito: es el registro, no el producto.
