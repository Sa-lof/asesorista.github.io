
const SUPABASE_URL = 'https://fhowgaxtehxvtcpiziyy.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZob3dnYXh0ZWh4dnRjcGl6aXl5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTA2OTA1NjQsImV4cCI6MjAwNjI2NjU2NH0.ZOc7XrEmDevg35_FT-s0HUQgA4uvq900D80j31G7R20'

const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
async function addVendedor2() {

const nombre = document.querySelector('[name="nombre"]').value;
const apellidoMaterno = document.querySelector('[name="apellido_materno"]').value;
const apellidoPaterno = document.querySelector('[name="apellido_paterno"]').value;
const correo = document.querySelector('[name="correo_electronico"]').value;
const telefono = document.querySelector('[name="telefono"]').value;
const puesto = document.querySelector('[name="puesto"]').value;

const { data: dataVendedor, error: errorVendedor } = await _supabase
    .from('vendedores')
    .insert([
        {
            nombre: nombre,
            apellido_materno: apellidoMaterno,
            apellido_paterno: apellidoPaterno,
            correo_electronico: correo,
            telefono: telefono,
            puesto: puesto,
        }
]);

if (errorVendedor) {
    console.error('Error inserting vendedor:', errorVendedor);
    return;
} else {
    console.log('Inserted vendedor:', dataVendedor);
    if (dataVendedor && dataVendedor.length > 0) {
        const newVendedorId = dataVendedor[0].id;
        if (!newVendedorId) {
            console.error('Unable to extract vendedor ID. Check the structure of the response.');
            return;
        }
    } else {
        console.error('No data returned after inserting vendedor.');
        return;
    }
}

// Selección de los checkboxes
const garageCheckbox = document.getElementById('garageCheckbox');
const aticoCheckbox = document.getElementById('aticoCheckbox');
const estacionamientoCheckbox = document.getElementById('estacionamientoCheckbox');
const terrazaCheckbox = document.getElementById('terrazaCheckbox');
const lavadoCheckbox = document.getElementById('lavadoCheckbox');
const areaCheckbox = document.getElementById('areaCheckbox');



// Obtener el valor true o false de los checkboxes
let garageChecked = garageCheckbox.checked; // Será true si está marcado, false si no lo está.
let aticoChecked = aticoCheckbox.checked;   // Será true si está marcado, false si no lo está.
let estacionamientoChecked = estacionamientoCheckbox.checked; // Será true si está marcado, false si no lo está.
let terrazaChecked = terrazaCheckbox.checked;
let lavadoChecked = lavadoCheckbox.checked; // Será true si está marcado, false si no lo está.
let areaChecked = areaCheckbox.checked;

// Si quieres reaccionar cuando los checkboxes cambian de estado, puedes usar un event listener:
garageCheckbox.addEventListener('change', function() {
    garageChecked = garageCheckbox.checked;
    console.log('Garage:', garageChecked);  // Puedes ver el estado en la consola
});

aticoCheckbox.addEventListener('change', function() {
    aticoChecked = aticoCheckbox.checked;
    console.log('Atico:', aticoChecked);    // Puedes ver el estado en la consola
});

// Si quieres reaccionar cuando los checkboxes cambian de estado, puedes usar un event listener:
estacionamientoCheckbox.addEventListener('change', function() {
    estacionamientoChecked = estacionamientoCheckbox.checked;
    console.log('Estacionamiento:', estacionamientoChecked);  // Puedes ver el estado en la consola
});

terrazaCheckbox.addEventListener('change', function() {
    terrazaChecked = terrazaCheckbox.checked;
    console.log('terraza:', terrazaChecked);    // Puedes ver el estado en la consola
});

// Si quieres reaccionar cuando los checkboxes cambian de estado, puedes usar un event listener:
lavadoCheckbox.addEventListener('change', function() {
    lavadoChecked = lavadoCheckbox.checked;
    console.log('Estacionamiento:', lavadoChecked);  // Puedes ver el estado en la consola
});

areaCheckbox.addEventListener('change', function() {
    areaChecked = areaCheckbox.checked;
    console.log('terraza:', areaChecked);    // Puedes ver el estado en la consola
});

const nombrePropiedad = document.querySelector('[name="nombre_propiedad_in"]').value;
const descrip = document.querySelector('[name="description_in"]').value;
const tipoPropiedad = document.querySelector('[name="tipo_propiedad_in"]').value;
const precioIn = document.querySelector('[name="precio_in"]').value;
const antiguedadIn = document.querySelector('[name="anos_antiguedad_in"]').value;
const direccionIn = document.querySelector('[name="direccion_in"]').value;
const ciudadIn = document.querySelector('[name="ciudad_in"]').value;
const estadoIn = document.querySelector('[name="estado_in"]').value;
const paisIn = document.querySelector('[name="pais_in"]').value;
const codigoIn = document.querySelector('[name="codigo_in"]').value;
const mapsIn = document.querySelector('[name="maps_url_in"]').value;
const habitacionesIn = document.querySelector('[name="habitaciones_in"]').value;
const banosIn = document.querySelector('[name="banos_in"]').value;
const construccionIn = document.querySelector('[name="construccion_in"]').value;
const pisosIn = document.querySelector('[name="pisos_in"]').value;
const terrenoIn = document.querySelector('[name="terreno_in"]').value;


const { data: dataPropiedad, error: errorPropiedad } = await _supabase
    .from('propiedades')
    .insert([
        {
            nombre: nombrePropiedad,
            descripcion: descrip,
            tipo_propiedad: tipoPropiedad,
            precio: precioIn,
            antiguedad: antiguedadIn,
            direccion: direccionIn,
            ciudad: ciudadIn,
            estado: estadoIn,
            pais: paisIn,
            codigo_postal: codigoIn,
            url_maps: mapsIn,
            habitaciones: habitacionesIn,
            banos: banosIn,
            pisos: pisosIn,
            metros_construccion: construccionIn,
            metros_terreno: terrenoIn,
            garage: garageChecked,
            atico: aticoChecked,
            estacionamiento: estacionamientoChecked,
            terraza: terrazaChecked,
            cuarto_lavado: lavadoChecked,
            areas_verdes: areaChecked,
            vendedor_id: dataVendedor[0].id,
        }
    ]);
    if (errorPropiedad) {
        console.error('Error inserting propiedad:', errorPropiedad);
    } else {
        console.log('Inserted propiedad:', dataPropiedad);
        location.reload()
    }
}
