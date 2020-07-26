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
