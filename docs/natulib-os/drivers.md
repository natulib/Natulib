---
title: "Matériel — Drivers"
parent: Natulib OS
statut: publie
---

# 🔌 Matériel — Drivers

Chaque périphérique (capteur, actionneur, écran, radio) est décrit par un petit fichier JSON dans `/dev/`. Le champ `type` choisit le driver ; les champs ci-dessous sont ceux que ce driver lit réellement — c'est la référence à consulter en cas de doute sur un nom de paramètre.

Trois règles communes à tous les drivers :
- `active: true` est nécessaire pour que le périphérique soit chargé.
- `id` sert d'identifiant dans la télémétrie et dans les automatisations (`id.metrique`).
- `interval_ms`, quand il est pris en charge, fixe l'intervalle minimal entre deux lectures.

---

## 🧩 Paramètres par type de driver

| `type` | Champs de configuration | Métriques | Actions |
|---|---|---|---|
| `bme280` | `pins.sda`, `pins.scl` | `t`, `h_air`, `p` | — |
| `analog` | `pins.adc`, `calibration.min` (déf. 1400), `calibration.max` (déf. 3200) | `value` (%), `raw` | — |
| `relay` | `pins.pin`, `invert` | `state` | `on_<id>`, `off_<id>`, `toggle_<id>` |
| `hx711` | `pins.dt`, `pins.scl` (broche SCK), `calibration.scale` | `weight_g` | `tare_<id>` |
| `pir` | `pins.pin` | `motion`, `idle_time_sec` | — |
| `buzzer` | `pins.pin` | — | `beep_<id>`, `alert_<id>` |
| `virtual` | `default` | `state` | `toggle_<id>`, `set_<id>_<val>`, `add_<id>_<val>`, `sub_<id>_<val>` |
| `screen` / `smart_display` | `driver` (gc9a01/st7789/ili9341/ili9488), `width`/`height`, `pins.sclk/mosi/dc/cs/rst/blk` | — | `on_<id>`, `off_<id>`, `diag_<id>` |
| `servo` | `pins.pin`, `default_angle` | — | `servo_0_<id>`, `servo_90_<id>`, `angle_<id>_<degrés>` |
| `neopixel` | `pins.pin`, `num_leds` | — | `color_red_<id>`, `color_blue_<id>`, `off_<id>` |
| `distance` | `pins.trig`, `pins.echo` | `distance_cm` | — |
| `pwm` | `pins.pin` | — | `off_<id>`, `pwm_50_<id>`, `pwm_100_<id>`, `pwm_<id>_<0-255>` |
| `button` | `pins.pin`, `pullup` (déf. `true`), `invert` (déf. `true`) | `pressed` | — |
| `health` | — | `heap_kb`, `temp_c`, `rssi` | — |
| `scd40` | `pins.sda`, `pins.scl` | `co2_ppm`, `t`, `h_air` | — |
| `bh1750` | `pins.sda`, `pins.scl` | `lux` | — |
| `ds18b20` | `pins.pin` | `t_eau` | — |
| `ds3231` | `pins.sda`, `pins.scl` | `t_rtc`, `timestamp` | `sync_ntp` |
| `tcrt5000` | `pins.digital`, `pins.adc`, `invert` | `detected`, `raw` | — |
| `lora_radio` | `pins.*` (cs/irq/rst/busy/sck/miso/mosi), `chip`, `frequency_mhz`, `tx_power_dbm`… | `rssi` | `sendlora_<id>:<texte>` |
| `agro_light` | `input_metric`, `spectrum` (ex. `4000k`) | `ppfd`, `dli` | `reset_dli_<id>` |
| `agro_climate` | `input_temp`, `input_hum` | `vpd_kpa`, `dew_point_c` | — |
| `agro_irrigation` | `flow_rate_ml_s` | `water_today_ml` | `log_water_<id>_<durée_s>`, `reset_water_<id>` |
| `ina219` | `pins.sda`, `pins.scl` | `voltage_v`, `current_ma`, `power_mw` | — |
| `rain_analog` | `pins.digital`, `pins.adc`, `invert`, `calibration.min/max` | `rain_detected`, `intensity_pct` | — |

> 🔵 `espnow_radio`, `zigbee_radio` et `system_monitor` existent aussi dans le code mais leurs champs de configuration n'ont pas encore été vérifiés avec certitude pour cette page.

---

## 📎 À savoir

- Les fiches modules (`docs/hardware/NL-xxx.md`) ont été relues et corrigées pour correspondre exactement à cette table — en cas de doute, cette page fait référence.
- Certains drivers n'ont pas encore de fiche module dédiée : `hx711`, `ds18b20`, `ds3231`, `neopixel`, `servo`, `distance`, `scd40`, `buzzer`, `virtual`, `health`, `lora_radio`, `agro_*`.

---

## 🔗 Ressources

- ⬅️ [Retour à 🧠 Natulib OS](../Natulib-OS.md)
- 🗂️ [Matériel — Filesystem](./filesystem.md)
- ⚙️ [Fonctionnement — API REST](./api.md)
- 🤝 [Contribuer à cette page](../Contribuer.md)
