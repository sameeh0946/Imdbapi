
$(document).ready( function(){


    $('a[href="#search1"]').on('click', function(event) {
        event.preventDefault();
        
        $('#input').attr( 'placeholder', 'search by Title' );
        $('#input2').attr( 'placeholder', 'search by Year`' );
        
        $('#search').addClass('open');
        $('#search > form > #input').focus();
        
        $('form').submit(function() {

            $('#search').removeClass('open');
            $('.paragraph').hide();
        
//        SUBMIT OF SEARCH BY TITLE AND YEAR    
         movieTitle=document.getElementById("input").value;  
         movieYear=document.getElementById("input2").value;

//      FUNCTION CALL
        getDetailbyTitle(movieTitle,movieYear);   
                 
            });   
                                                                    }); //END OF CLICK 1
    
    
    
     $('a[href="#search2"]').on('click', function(event) {
        event.preventDefault();
        $('#input2').hide();
        $('#input').attr( 'placeholder', 'search by imdb-id' );
        
        $('#search').addClass('open');
        $('#search > form > input[type="search"]').focus();
        $('form').submit(function() {
        $('#search').removeClass('open'); 
        $('.paragraph').hide();
            
            
//        SUBMIT OF SEARCH BY ID   
        movieID=document.getElementById("input").value;
//          FUNCTION CALL
        getMoviebyID(movieID);     
    }); 
                                                            });//END CLICK2
                                
                                
     $('a[href="#search3"]').on('click', function(event) {
        event.preventDefault();
        
        $('#input').attr( 'placeholder', 'search 3' );
        
        $('#search').addClass('open');
        $('#search > form > input[type="search"]').focus();
    });
    

    $('#search, #search button.close').on('click keyup', function(event) {
        if (event.target == this || event.target.className == 'close' || event.keyCode == 27) {
            $(this).removeClass('open');
        }
    });
    
    
         
         
    //SEARCH BY TITLE
    
    
    let getDetailbyTitle = (movieTitle,movieYear) => {
    
    console.log("making request");
    
    $.ajax({
        type: 'GET', // request type GET, POST, PUT
        dataType: 'json', // requesting datatype
        url:'https://www.omdbapi.com/?t='+movieTitle+'&y='+movieYear+'/&apikey=9e9f55e2',
        success: (data) => { // in case of success response

          let response = data.Response;
            console.log("Response Returned: " + response);
            
            let poster=data.Poster;
            
            if (response == "True") 
            {
                
                if (data.Poster == "N/A")
                {
                    poster = "images/image-not-found.jpg";
                }
                   else{
                   let responseData = `
                        <tr><td><img src="${poster}" height="200px"></td></tr>
                        <tr><td>Title</td><td>${data.Title}</td></tr>
                        <tr><td>Year</td><td>${data.Year}</td></tr>
                        <tr><td>imdbID</td><td>${data.imdbID}</td></tr>
                        <tr><td>Rated</td><td>${data.Rated}</td></tr>
                        <tr><td>Released</td><td>${data.Released}</td></tr>
                        <tr><td>Runtime</td><td>${data.Runtime}</td></tr>
                        <tr><td>Genre</td><td>${data.Genre}</td></tr>
                        <tr><td>Director</td><td>${data.Director}</td></tr>
                        <tr><td>Plot</td><td>${data.Plot}</td></tr>
                        <tr><td>Actors</td><td>${data.Actors}</td></tr>
                        <tr><td>imdbRating</td><td>${data.imdbRating}</td></tr>  
                       `;
                
            console.log(data);  
            console.log(poster);
		console.log(responseData);
           $('#table-data').html(responseData);      
                }
            }
                
            else if(response=="False")
            {
                responseData = `<tr><td colspan="2" style="text-align: center;">Sorry No Result Found</td></tr>`;
                $('#table-data').html(responseData);
                alert("Sorry No Result Found");
            }

},
        error: (data) => { // in case of error response

            console.log("some error occured");

        },

        beforeSend: () => { // while request is processing.

            // you can use loader here.
            console.log("request is being made. please wait")

        },
        complete: () => {

            // what you want to do while request is completed
            console.log("data fetched success")

        },

        timeout:3000 // this is in milli seconds

    }); // end of FIRST AJAX request
}


let getMoviebyID = (movieID) => {
 alert("making request");

    $.ajax({
        type: 'GET', // request type GET, POST, PUT
        dataType: 'json', // requesting datatype
        url:'https://www.omdbapi.com/?i='+movieID+'&apikey=9e9f55e2', // URL of getting data
        success: (data) => { // in case of success response

          let response = data.Response;
            console.log("Response Returned: " + response);
            
            let poster=data.Poster;
            
            if (response == "True") {
                
                if (data.Poster == "N/A")
                {
                    poster = "images/image-not-found.jpg";
                }
                else
                
                {
                    
                   let responseData = `
                        <tr><td><img src="${poster}" height="200px"></td></tr>
                        <tr><td>Title</td><td>${data.Title}</td></tr>
                        <tr><td>Year</td><td>${data.Year}</td></tr>
                        <tr><td>imdbID</td><td>${data.imdbID}</td></tr>
                        <tr><td>Rated</td><td>${data.Rated}</td></tr>
                        <tr><td>Released</td><td>${data.Released}</td></tr>
                        <tr><td>Runtime</td><td>${data.Runtime}</td></tr>
                        <tr><td>Genre</td><td>${data.Genre}</td></tr>
                        <tr><td>Director</td><td>${data.Director}</td></tr>
                        <tr><td>Plot</td><td>${data.Plot}</td></tr>
                        <tr><td>Actors</td><td>${data.Actors}</td></tr>
                        <tr><td>imdbRating</td><td>${data.imdbRating}</td></tr>  
                       `;
                
            console.log(poster);
		console.log(responseData);
           $('#table-data').html(responseData);      
                }
            }
                
            if(response=="False")
            {
                responseData = `<tr><td colspan="2" style="text-align: center;">Sorry No Result Found</td></tr>`;
                $('#table-data').html(responseData);
                alert("Sorry No Result Found");
            }

},
        error: (data) => { // in case of error response

            console.log("some error occured");

        },

        beforeSend: () => { // while request is processing.

            // you can use loader here.
            console.log("request is being made. please wait")

        },
        complete: () => {

            // what you want to do while request is completed
            console.log("data fetched success")

        },

        timeout:3000 // this is in milli seconds

    }); //END OF SECOND AJAX REQUEST.  
    
    
} // END OF FUNCTION


}); //END OF DOCUMENT READY