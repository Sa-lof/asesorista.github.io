const SUPABASE_URL = 'https://fhowgaxtehxvtcpiziyy.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZob3dnYXh0ZWh4vnRjcGl6aXl5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTA2OTA1NjQsImV4cCI6MjAwNjI2NjU2NH0.ZOc7XrEmDevg35_FT-s0HUQgA4uvq900D80j31G7R20';

const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

let selectedImages = [];

$(document).ready(async function() {
  $('#profilePhoto').change(async function() {
    if (this.files && this.files[0]) {
      selectedImages.push(this.files[0]);
      const reader = new FileReader();
      reader.onload = async function(e) {
        const newImageDiv = `
          <div class="col-lg-3">
            <div class="profile-box position-relative d-md-flex align-items-end mb50">
              <div class="profile-img position-relative overflow-hidden bdrs12 mb20-sm">
                <img class="w-100" src="${e.target.result}" alt="Uploaded Image">
                <a href="#" class="tag-del" data-bs-toggle="tooltip" data-bs-placement="top" title="" aria-label="Delete Item"><span class="fas fa-trash-can"></span></a>
              </div>
            </div>
          </div>
        `;
        $('#imageContainer').append(newImageDiv);
        // Iniciar tooltips (si estás usando Bootstrap)
        $('[data-bs-toggle="tooltip"]').tooltip();
      };
      reader.readAsDataURL(this.files[0]);
    }
  });

  async function uploadSelectedImages() {
    // Borra las imágenes existentes en el contenedor "imageContainer2"
    $('#imageContainer2').empty();

    for (let i = 0; i < selectedImages.length; i++) {
      const file = selectedImages[i];
      const filePath = `uploads/0/${file.name}`;

      // Usa Supabase para subir el archivo
      const { error } = await _supabase.storage.from('Images_propiedades').upload(filePath, file);

      if (error) {
        console.error("Error al subir la imagen:", error);
      } else {
        console.log("Imagen subida exitosamente");
      }
    }
    // Una vez que se han subido todas las imágenes, puedes limpiar la variable.
    selectedImages = [];
  }

  // Para manejar la eliminación de la imagen
  $(document).on('click', '.tag-del', function(e) {
    e.preventDefault();
    const imageIndex = $(this).closest('.col-lg-3').index();
    selectedImages.splice(imageIndex, 1); // Elimina la imagen del arreglo
    $(this).closest('.col-lg-3').remove();
  });

  $('[data-bs-toggle="tooltip"]').tooltip();
  $(document).on('click', '.tag-del', function(e) {
    e.preventDefault();
    $(this).closest('.col-lg-3').remove();
  });

  $(document).ready(function() {
    $('#uploadButton').click(function() {
      uploadSelectedImages();
    });
  });

  async function fetchAndDisplayImages() {
    // Consultar Supabase para obtener la lista de imágenes
    const { data, error } = await _supabase.storage.from('Images_propiedades').list('uploads/');

    if (error) {
      console.error("Error al obtener la lista de imágenes:", error);
      return;
    }

    if (data && data.length) {
      // Iterar sobre cada imagen y generar el HTML
      data.forEach(async (image) => {
        const imageUrl = await _supabase.storage.from('Images_propiedades').getPublicUrl('uploads/' + image.name);

        const newImageDiv = `
          <div class="col-lg-3">
            <div class="profile-box position-relative d-md-flex align-items-end mb50">
              <div class="profile-img position-relative overflow-hidden bdrs12 mb20-sm">
                <img class="w-100" src="${imageUrl.publicURL}" alt="Image">
                <a href="#" class="tag-del" data-bs-toggle="tooltip" data-bs-placement="top" title="" aria-label="Delete Item"><span class="fas fa-trash-can"></span></a>
              </div>
            </div>
          </div>
        `;

        $('#imageContainer2').append(newImageDiv);
        $('[data-bs-toggle="tooltip"]').tooltip();
      });
    }
  }

  $(document).ready(function() {
    fetchAndDisplayImages();
  });
});
