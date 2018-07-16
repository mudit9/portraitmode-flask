$(document).ready(function () {
    // Init
    $('.image-section').hide();
    $('.loader').hide();
    $('#result').hide();
    $('#processing').hide();


    // Upload Preview
    function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                $('#imagePreview').css('background-image', 'url(' + e.target.result + ')');
                $('#imagePreview').hide();
                $('#imagePreview').fadeIn(650);
            }
            reader.readAsDataURL(input.files[0]);
        }
        console.log('in upload preview function');
    }
    $("#imageUpload").change(function () {
        $('.image-section').show();
        $('#btn-predict').show();
        $('#result').text('');
        $('#result').hide();
        readURL(this);
        console.log('in image upload function');
    });

    // Predict
    $('#btn-predict').click(function () {
        var form_data = new FormData($('#upload-file')[0]);

        // Show loading animation
        $(this).hide();
        $('.loader').show();
        $('#processing').show();

        console.log('clicked start button')
        // Make prediction by calling api /predict
        $.ajax({
            type: 'POST',
            url: '/predict',
            data: form_data,
            contentType: false,
            cache: false,
            processData: false,
            async: true,
            success: function (data) {
                // Get and display the result
                $('.loader').hide();
                $('#result').fadeIn(600);
                error_message = 'Something went wrong. Please try again with another image.' ;
                file_size_error = 'Please try with an image with better resolution.' ;
                invalid_image_errror = 'Invalid image. No human found in image. Please try with a different photo.' ;
                if (data === error_message){
                    $('#processing').hide();
                    $('#result').text('Result: ' + data);
                    console.log('Error.');
                }
                else if (data === file_size_error){
                  $('#processing').hide();

                  $('#result').text('Result: ' + data);
                  console.log('Error 2.');
                }
                else if (data === invalid_image_errror) {
                  $('#result').text('Result: ' + data);
                  console.log('Error 3.');
                }
                else {
                  console.log('Success!');
                 // window.location.href = '/' + data;
                  window.location.href = "/static/output/view_image.html?Name=" + data;
              }
            },
        });
    });



});
