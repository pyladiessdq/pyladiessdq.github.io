$(document).ready(function () {

    // Add smooth scrolling to all links
    $('a').on('click', function (event) {
        // Make sure this.hash has a value before overriding default behavior
        if (this.hash !== '') {
            // Prevent default anchor click behavior
            event.preventDefault();
            // Store hash
            var hash = this.hash;
            // Using jQuery's animate() method to add smooth page scroll
            // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 800, function () {
                // Add hash (#) to URL when done scrolling (default click behavior)
                window.location.hash = hash;
            });
        } // End if
    });

    //animated header class
    $(window).scroll(function () {
        var scroll = $(window).scrollTop();
        //console.log(scroll);
        if (scroll > 200) {
            //console.log('a');
            $(".navigation").addClass("animated");
        } else {
            //console.log('a');
            $(".navigation").removeClass("animated");
        }
    });



    /*$(".gallery-slider").owlCarousel(
        {
        pagination : true,
        autoPlay : 5000,
        itemsDesktop  :  [1500,4],
        itemsDesktopSmall :  [979,3]
        }
    );*/
    

    $(function () {
        const $content = $('#jsonContent');
        const data = {
            rss_url: 'https://medium.com/feed/@pyladiessdq'
        };
        $.get('https://api.rss2json.com/v1/api.json', data, function (response) {
            if (response.status === 'ok') {
                let output = '';
                $.each(response.items, function (k, item) {
                    let visibleSm;
                    if (k < 3) {
                        visibleSm = '';
                    } else {
                        visibleSm = ' visible-sm';
                    }
                    output += '<div class="col-sm-6 col-md-4' + visibleSm + '">';
                    output += '<div class="blog-post"><header>';
                    output += '<h4 class="date">' + $.format.date(item.pubDate, 'dd<br>MMM') + '</h4>';
                    const tagIndex = item.description.indexOf('<img'); // Find where the img tag starts
                    const srcIndex = item.description.substring(tagIndex).indexOf('src=') + tagIndex; // Find where the src attribute starts
                    const srcStart = srcIndex + 5; // Find where the actual image URL starts; 5 for the length of 'src="'
                    const srcEnd = item.description.substring(srcStart).indexOf('"') + srcStart; // Find where the URL ends
                    const src = item.description.substring(srcStart, srcEnd); // Extract just the URL
                    // tslint:disable-next-line:max-line-length
                    output += '<div class="blog-element"><img class="img-fluid" src="' + src + '" width="360px" height="240px"></div></header>';
                    output += '<div class="blog-content"><h4><a href="' + item.link + '">' + item.title + '</a></h4>';
                    output += '<div class="post-meta"><span>By ' + item.author + '</span></div>';
                    const yourString = item.description.replace(/<img[^>]*>/g, ''); // replace with your string.
                    const maxLength = 120; // maximum number of characters to extract
                    // trim the string to the maximum length
                    let trimmedString = yourString.substr(0, maxLength);
                    // re-trim if we are in the middle of a word
                    trimmedString = trimmedString.substr(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(' ')));
                    output += '<p>' + trimmedString + '...</p>';
                    output += '</div></div></div>';
                    return k < 2;
                });
                $content.html(output);
            }
        });
    });


    // Gallery Popup
    $('.image-popup').magnificPopup({ type: 'image' });



});







