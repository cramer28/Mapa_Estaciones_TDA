Con el temita del mundial recorde que existia un mapa oficial de TDA con la ubicacion de las antenas en el pais pero parece que el sitio original https://mapatda.arsat.com.ar/index.php ya no funciona, por suerte encontre el repo de [Open Data Cordoba](https://github.com/OpenDataCordoba) que tiene un json con los estados de las antenas actualizado hasta el 11/11/25 asi que use eso con un poco de ayuda de Cursor para armar un mapa con OpenStreetMap y Leaflet, para acceder al mapa usa el link de Github Pages en la seccion #Demo mas abajo.

# Estaciones TDA - Mapa

Mapa interactivo de estaciones de Televisión Digital Abierta (TDA) en Argentina. Muestra la ubicación geográfica de cada antena con información detallada al hacer clic.

## Demo en vivo

[Ver Mapa de Estaciones/Antenas TDA en Argentina](https://cramer28.github.io/Mapa_Estaciones_TDA/)

## Fuente de datos

Los datos se cargan automáticamente desde el repositorio público [OpenDataCordoba/estado_tda](https://github.com/OpenDataCordoba/estado_tda). Cada vez que se actualiza el archivo `antenas_tda.json` en ese repositorio, el mapa refleja los cambios sin necesidad de redesplegar este proyecto.

## Uso local

No requiere instalación. Abra `index.html` en un navegador con conexión a internet, o sirva los archivos con cualquier servidor estático:

```bash
# Python 3
python -m http.server 8000
```

Luego visite `http://localhost:8000`.

## Tecnologías

- [Leaflet](https://leafletjs.com/) — mapa interactivo
- [OpenStreetMap](https://www.openstreetmap.org/) — tiles del mapa
- HTML, CSS y JavaScript vanilla (sin pasos de compilación)

## Licencia

El código de este mapa es de libre uso. Los datos pertenecen a [OpenDataCordoba/estado_tda](https://github.com/OpenDataCordoba/estado_tda).
