# Estaciones TDA - Mapa

Mapa interactivo de estaciones de Televisión Digital Abierta (TDA) en Argentina. Muestra la ubicación geográfica de cada antena con información detallada al hacer clic.

## Demo en vivo

Una vez publicado en GitHub Pages, el sitio estará disponible en:

`https://<tu-usuario>.github.io/tv-stations-map/`

## Fuente de datos

Los datos se cargan automáticamente desde el repositorio público [OpenDataCordoba/estado_tda](https://github.com/OpenDataCordoba/estado_tda). Cada vez que se actualiza el archivo `antenas_tda.json` en ese repositorio, el mapa refleja los cambios sin necesidad de redesplegar este proyecto.

## Uso local

No requiere instalación. Abra `index.html` en un navegador con conexión a internet, o sirva los archivos con cualquier servidor estático:

```bash
# Python 3
python -m http.server 8000
```

Luego visite `http://localhost:8000`.

## Despliegue en GitHub Pages

1. Cree un repositorio en GitHub (por ejemplo `tv-stations-map`)
2. Suba el contenido de este proyecto a la rama `main`
3. En el repositorio, vaya a **Settings → Pages**
4. En **Source**, seleccione **Deploy from branch**
5. Elija la rama `main` y la carpeta `/ (root)`
6. Guarde. El sitio estará disponible en unos minutos

## Tecnologías

- [Leaflet](https://leafletjs.com/) — mapa interactivo
- [OpenStreetMap](https://www.openstreetmap.org/) — tiles del mapa
- HTML, CSS y JavaScript vanilla (sin pasos de compilación)

## Licencia

El código de este mapa es de libre uso. Los datos pertenecen a [OpenDataCordoba/estado_tda](https://github.com/OpenDataCordoba/estado_tda).
