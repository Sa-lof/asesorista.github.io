
$(document).ready(function(){
    $(".selection label, .selection input[type='radio']").click(function(e) {
        e.stopPropagation();
    });
    $("[name='aplicarhabitaciones']").click(function() {
        $(this).closest('.dropdown-menu').prev('.dropdown-toggle').dropdown('toggle');
    });
});

$(document).ready(function(){
    $(".checkbox-style1 label").click(function(e) {
        e.stopPropagation();
    });

    $(".aplicartipo").click(function() {
        $(this).closest('.dropdown-menu').prev('.dropdown-toggle').dropdown('toggle');
    });
});

$(document).ready(function(){
    $(".restaurarbtn").click(function() {
        location.reload();
    });
});

let selectedProperties = [];
let selectedRooms = -1;
let selectedBaths = -1;
let priceMin = null;
let priceMax = null;
let searchedZone = "";

document.querySelector('.aplicarzona').addEventListener('click', function() {
    searchedZone = document.querySelector('.zonabuscar').value;
    console.log("Zona buscada:", searchedZone);
    loadData(currentPage, selectedProperties, selectedRooms, selectedBaths, priceMin, priceMax, searchedZone);
});

document.querySelector('button[name="aplicarprecio"]').addEventListener('click', function() {

    priceMin = document.querySelector('.rango1').value;
    priceMax = document.querySelector('.amount2').value;
    priceMin = parseFloat(priceMin.replace('$', '').trim());
    priceMax = parseFloat(priceMax.replace('$', '').trim());

    console.log("Rango de precio seleccionado:", priceMin, "a", priceMax);
    loadData(currentPage, selectedProperties, selectedRooms, selectedBaths, priceMin, priceMax, searchedZone);
});

    function getRoomCountFromId(id) {
        switch (id) {
            case 'any': return -1;
            case 'oneplus': return 1;
            case 'twoplus': return 2;
            case 'threeplus': return 3;
            case 'fourplus': return 4;
            case 'fiveplus': return 5;
            default: return -1;
        }
    }

    function getBathCountFromId(id) {
        switch (id) {
            case 'baany': return -1;
            case 'baoneplus': return 1;
            case 'batwoplus': return 2;
            case 'bathreeplus': return 3;
            case 'bafourplus': return 4;
            case 'bafiveplus': return 5;
            default: return -1;
        }
    }

    document.querySelector('button[name="aplicarhabitaciones"]').addEventListener('click', function() {
        const selectedRadio = document.querySelector('input[name="beds"]:checked');
        if (selectedRadio) {
            selectedRooms = getRoomCountFromId(selectedRadio.id);
            loadData(currentPage, selectedProperties, selectedRooms, selectedBaths, priceMin, priceMax, searchedZone);
        }
    });

    document.querySelector('button[name="aplicarhabitaciones"]').addEventListener('click', function() {
        const selectedRadio2 = document.querySelector('input[name="bath"]:checked');
        if (selectedRadio2) {
            selectedBaths = getBathCountFromId(selectedRadio2.id);
            loadData(currentPage, selectedProperties, selectedRooms, selectedBaths, priceMin, priceMax, searchedZone);
        }
    });

document.querySelector('.aplicartipo').addEventListener('click', function() {
    selectedProperties = [];
    let checkboxes = document.querySelectorAll('.custom_checkbox input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            selectedProperties.push(checkbox.value);
        }
    });

    loadData(currentPage, selectedProperties, selectedRooms, selectedBaths, priceMin, priceMax, searchedZone);
    });
    
const SUPABASE_URL = 'https://fhowgaxtehxvtcpiziyy.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZob3dnYXh0ZWh4dnRjcGl6aXl5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTA2OTA1NjQsImV4cCI6MjAwNjI2NjU2NH0.ZOc7XrEmDevg35_FT-s0HUQgA4uvq900D80j31G7R20'

const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
let currentPage = 1;
const propertiesPerPage = 9;

function createPropertyDiv(propiedad) {
    const templateDiv = document.getElementById('propertyTemplate');
    const clonedDiv = templateDiv.cloneNode(true); 

    clonedDiv.querySelector('.list-title a').textContent = propiedad.nombre || "Nombre de Propiedad";
    const propertyLink = clonedDiv.querySelector('.list-title a');
    propertyLink.href = `page-property-single-v1.html?id=${propiedad.id}`;
    propertyLink.textContent = propiedad.nombre || "Nombre de Propiedad";
    clonedDiv.querySelector('.list-price').textContent = `$${propiedad.precio} / `;
    const span = document.createElement('span');
    span.textContent = 'mo';
    clonedDiv.querySelector('.list-price').appendChild(span);
    clonedDiv.querySelector('.list-title a').href = `page-property-single-v1.html?id=${propiedad.id}`;
    clonedDiv.querySelector('.list-text').textContent = `${propiedad.ciudad}, ${propiedad.estado}, ${propiedad.pais}`;
    clonedDiv.querySelector('.list-meta a:nth-child(1)').textContent = `${propiedad.habitaciones} habitaciones`;
    clonedDiv.querySelector('.list-meta a:nth-child(2)').textContent = `${propiedad.banos} baños`;
    clonedDiv.querySelector('.list-meta a:nth-child(3)').textContent = `${propiedad.metros_construccion} mts`;

    clonedDiv.style.display = "block";

    return clonedDiv;
}

async function loadData(page = 1, selectedProperties = [], selectedRooms = -1, selectedBaths = -1, priceMin = null, priceMax = null, searchedZone = "") {
    currentPage = page;
    console.log("banos seleccionadas:", priceMax);
    
    const start = (currentPage - 1) * propertiesPerPage;
    const end = start + propertiesPerPage - 1;

    let query = _supabase.from('propiedades').select('*', { count: 'exact' });

    if (selectedProperties.length > 0) {
        query = query.in('tipo_propiedad', selectedProperties);
    }

    if (selectedRooms != -1) {
        query = query.eq('habitaciones', selectedRooms);
    }

    if (selectedBaths != -1) {
        query = query.eq('banos', selectedBaths);
    }

    if (priceMin !== null && priceMax !== null) {
        query = query.gte('precio', priceMin).lte('precio', priceMax);
    }

    if (searchedZone) {
        query = query.or(
            `pais.ilike.%${searchedZone}%,ciudad.ilike.%${searchedZone}%,estado.ilike.%${searchedZone}%`
        );
    }

    const { data, error, count } = await query.range(start, end);

    if (error) {
        console.error('Error al consultar la base de datos:', error);
        return;
    }

    const container = document.getElementById('propertiesContainer');
    container.innerHTML = '';
    data.forEach(propiedad => {
        const propertyDiv = createPropertyDiv(propiedad);
        container.appendChild(propertyDiv);
    });

    generatePaginationControls(count);
}

function generatePaginationControls(totalProperties) {
    const totalPages = Math.ceil(totalProperties / propertiesPerPage);
    const paginationContainer = document.querySelector('.mbp_pagination .page_navigation');
    paginationContainer.innerHTML = ''; 

    for (let i = 1; i <= totalPages; i++) {
    const pageItem = document.createElement('li');
    pageItem.className = 'page-item';
    if (i === currentPage) pageItem.classList.add('active');

    const pageLink = document.createElement('a');
    pageLink.className = 'page-link';
    pageLink.href = '#';
    pageLink.textContent = i;
    pageLink.addEventListener('click', (e) => {
        e.preventDefault();
        loadData(i);
    });

    pageItem.appendChild(pageLink);
    paginationContainer.appendChild(pageItem);
    }
}

document.addEventListener('DOMContentLoaded', () => loadData(currentPage));