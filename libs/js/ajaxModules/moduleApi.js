class moduleApi
{   
    constructor()
    {
        this.url = "http://localhost/tribalMnC/Controllers/search.php";
    }

    //Obtener elementos a mostrar en tabla del index
    get_items(criteria){
        $.ajax({
            type: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            url: this.url,
            data: "search="+criteria,
            beforeSend: function(){
                //Mostrar Loader
                $("#colItems").html(' <img src="libs/img/loader.gif" alt="Cargando" style="width:100%" />');
            },
            success: function (data)
            {   
                if(data.code == 200)
                {   
                    //Traducciones DataTable
                    let  trad = {
                            "sProcessing": "Procesando...",
                            "sLengthMenu": "Mostrar _MENU_ registros",
                            "sZeroRecords": "No se encontraron resultados",
                            "sEmptyTable": "No se encontraron registros disponibles.",
                            "sInfo": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
                            "sInfoEmpty": " ",
                            "sInfoFiltered": "(filtrado de un total de _MAX_ registros)",
                            "sInfoPostFix": "",
                            "sSearch": "Buscar:",
                            "sUrl": "",
                            "sInfoThousands": ",",
                            "sLoadingRecords": "Cargando...",
                            "oPaginate": {
                                "sFirst": "Primero",
                                "sLast": "Último",
                                "sNext": "Siguiente",
                                "sPrevious": "Anterior"
                            },
                            "oAria": {
                                "sSortAscending": ": Activar para ordenar la columna de manera ascendente",
                                "sSortDescending": ": Activar para ordenar la columna de manera descendente"
                            }
                        }
                    //Traducciones DataTable

                    //Tabla
                    $("#colItems").html('<table id="resultado" class="responsive" style="width:100%"></table>');

                    //Instancia y configuración de DataTable
                    $('#resultado').DataTable( {
                        data: data.data,
                        language: trad,
                        responsive: true,
                        columns: [
                            { 
                                title: 'Nombre',
                                data: 'nombre',
                                render: function(data, type, row, meta){
                                    var enlace = data + " ("+ row.tipo +")";
                                    if (row.tipo != "Persona"){
                                         enlace = '<a href="'+ row.url +'" target="_blank" >' + data + " ("+ row.tipo +")" + '</a>'
                                    }
                                    
                                    return enlace;
                                }
                            },
                            { 
                                title: 'Fuente',
                                data: 'fuente',
                                render: function(data) {
                                        var logo = '';
                 
                                        switch (data) {
                                            case 'iTunes':
                                                logo = '<img src="libs/img/itunes.png" alt="Itunes" title="Itunes" style="width:2em !important" />';
                                                break;
                                            case 'TVMaze':
                                                logo = '<img src="libs/img/tvmaze.png" alt="TV Maze" title="TV Maze" style="width:2em !important" />';
                                                break;
                                            case 'Crcind':
                                                logo = '<img src="libs/img/crcind.png" alt="CRCIND" title="CRCIND SOAP Web Service" style="width:2em !important" />';
                                                break;
                                        }
                 
                                        return logo;
                                    
                 
                                }
                            }
                        ]
                    });
                  /*  $.each( data.entries, function( key, value ) 
                    {   
                        //Append html
                        var html = "";
                        if (value.rated == 0)
                        {
                            var rated =  "<div id='" + value.name +"' class='rateProduct rateit' data-rateit-value='" + value.average + "' data-productid='" + value.id + "'></div>";
                        }
                        else
                        {
                            var rated =  "<div id='" + value.name +"' class='rateProduct rateit' data-rateit-readonly='true' data-rateit-value='" + value.average + "' data-productid='" + value.id + "'></div>";
                        }
                        html = 
                        '<div class="col-sm-6 text-center" style="padding-bottom:2em;"><div class="card mb-3"><div class="row no-gutters"><div class="col-md-5"><img src="' + value.img +'" class="card-img" alt="' + value.name + '" style="max-height: 281px;"></div>'
                        + '<div class="col-md-7"><div class="card-body"><h5 class="card-title">'
                        + value.name + " - USD " + value.price + "<hr> <span class='card-text'>Rate Average "
                        + value.average +" <small title='This Product has been rated " + value.count + " time(s)'>("
                        + value.count + ")</small></span><br>"
                        + rated
                        + '</h5><p class="card-text">'
                        + value.description
                        + '</p><div class="form-group row"><label for="quantity_' + value.id + '" class="col-sm-3 offset-sm-3 col-form-label" style="padding-right:0px;margin-right:0px;">Quantity</label>'
                        + '<div class="col-sm-3" style="padding-left:0px;margin-left:0px;"><input type="number" class="form-control quantity" name="quantity_' + value.id + '" data-idproduct="' + value.id + '" value="1" required></div></div>'
                        + '<a href="#" data-idproduct="' + value.id + '" class="btn btn-primary addToCart">'
                        + 'Add to Cart <i class="fas fa-cart-plus" style="color:white;"></i></a></div></div></div></div></div>';
                        
                        $("#rowProducts").append(html);
                    }); 
                    $(".rateProduct").rateit({
                        step: 1,
                        min: 0,
                        max: 5,
                        resetable: false
                    }).bind('rated', function() { 
                        //Creates Rate record
                        moduleRate.set_product_id($(this).data('productid'));
                        moduleRate.set_valoration($(this).rateit('value'));
                        moduleRate.create_rate();
                        window.location.reload();
                    });
                    $(".addToCart").on("click", function()
                    {
                        var productId = $(this).data('idproduct');
                        var quantity = $(".quantity[data-idproduct=" + productId + "]").val();
                        moduleShopcart.set_product_id(productId);
                        moduleShopcart.set_quantity(quantity);
                        moduleShopcart.add_to_cart();
                    });       */            
                }
                else if (data.code == 204){
                    //Muestra imágen de resultados no encontrados
                    $("#colItems").html(' <img src="libs/img/no-resultados.png" alt="No se encontraron resultados" style="width:50%" />');
                }
                else{
                    //Muestra imágen de error 404
                    $("#colItems").html(' <img src="libs/img/404_error.png" alt="Error Desconocido" style="width:50%" />');
                }
            },
            error: function (data) 
            {    
                //Muestra imágen de error 404
                $("#colItems").html(' <img src="libs/img/404_error.png" alt="Error Desconocido" style="width:50%" />');
            }
        });
    }
}
