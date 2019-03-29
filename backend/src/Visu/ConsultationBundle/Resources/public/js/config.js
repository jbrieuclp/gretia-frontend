window.ofsa_config = 
{
	'key_ign' : 'v0bxp1xur57ztiai9djszgjw'
}

window.dynatableOptions = {
    features: {
      paginate: true,
      sort: true,
      pushState: false,
      search: true,
      recordCount: true,
      perPageSelect: true
    },
    table: {
      defaultColumnIdStyle: 'camelCase',
      columns: null,
      headRowSelector: 'thead tr', // or e.g. tr:first-child
      bodyRowSelector: 'tbody tr',
      headRowClass: null
    },
    inputs: {
      queries: null,
      sorts: null,
      multisort: ['ctrlKey', 'shiftKey', 'metaKey'],
      page: null,
      queryEvent: 'blur change',
      recordCountTarget: null,
      recordCountPlacement: 'after',
      paginationLinkTarget: null,
      paginationLinkPlacement: 'after',
      paginationPrev: 'Préc',
      paginationNext: 'Suiv',
      paginationGap: [1,2,2,1],
      searchTarget: null,
      searchPlacement: 'before',
      perPageTarget: null,
      perPagePlacement: 'before',
      perPageText: 'Afficher : ',
      recordCountText: 'Affiche ',
      processingText: 'Processing...'
    },
    dataset: {
      ajax: false,
      ajaxUrl: null,
      ajaxCache: null,
      ajaxOnLoad: false,
      ajaxMethod: 'GET',
      ajaxDataType: 'json',
      totalRecordCount: null,
      queries: null,
      queryRecordCount: null,
      page: null,
      perPageDefault: 15,
      perPageOptions: [15,30,50,100],
      sorts: null,
      sortsKeys: null,
      sortTypes: {},
      records: null
    },
    params: {
      dynatable: 'dynatable',
      queries: 'queries',
      sorts: 'sorts',
      page: 'page',
      perPage: 'perPage',
      offset: 'offset',
      records: 'éléments',
      record: null,
      queryRecordCount: 'queryRecordCount',
      totalRecordCount: 'totalRecordCount'
    }
  }


    window.datatables_config = {
        "pageLength": 50,
        "language": {
            "aria": {
                "paginate": {
                    "first": "Premier",
                    "last": "Dernier",
                    "next": "Suivant",
                    "previous": "Précédent",
                }
            },
            "paginate": {
                "first": "Premier",
                "last": "Dernier",
                "next": "Suivant",
                "previous": "Précédent",
            },
            "lengthMenu": 'Afficher <select>'+
                          '<option value="25">25</option>'+
                          '<option value="50">50</option>'+
                          '<option value="100">100</option>'+
                          '<option value="500">500</option>'+
                          '<option value="-1">All</option>'+
                          '</select> enregistrements par page',
            "zeroRecords": "Aucune donnée trouvée",
            "info": "_TOTAL_ sur _MAX_ enregistrement(s)",
            "infoEmpty": "Aucun enregistrement",
            "infoFiltered": "(filtré sur _MAX_ enregistrements totaux)",
            "decimal": ",",
            "thousands": " ",
            "search": "Rechercher"
        }
    }

  function centerIB(div, cbl) {
     
    var cible;
 
    if(cbl == 'body'){
        cible = $(window);
    }else{
        cible = $(cbl);
    }
     
    div.css("position","absolute");
    div.css("top", Math.max(0, ((cible.height()/2 - $(div).outerHeight()/ 2)) + cible.scrollTop()) + "px");
    div.css("left", Math.max(0, ((cible.width()/2 - $(div).outerWidth()/ 2)) + cible.scrollLeft()) + "px");
}
 
//function infobulle_grise(html, w, h, id, c){ //(contenu html, width, height, centrer) centrer= oui par defaut
function infobulle_grise(obj){ //(contenu html, width, height, centrer) centrer= oui par defaut
 
    var text_align, id, cible;
 
 
    if(obj.center == 'center' || obj.center == 'left' || obj.center == 'right'){
        text_align = obj.center
    }else{
        text_align = 'left';
    }
     
     
    if(!obj.id || obj.id == ''){
        id = 'tooltip';
    }else{
        id = 'tooltip_'+obj.id;
    }
     
    if(!obj.cible || obj.cible == ''){
        cible = "body";
    }else{
        cible = "#"+obj.cible;
    }
     
    var tooltip = {
        'position': 'absolute',
        'display': 'block',
        'background-color': 'white', 
        'z-index': '99999', 
        'top':'10px',
        'left':'10px',
        'z-index':'10000000',
        'opacity': '1',
        'border-width': '1px',
        'border-style': 'solid',
        'border-color': '#9A9A9A',
        'border-radius': '4px',
        'box-shadow': '0px 0px 45px 3px rgb(210, 210, 210) inset, 2px 3px 10px 1px rgb( 60, 60, 60)'
    };
     
    var tooltipCorp = {
        'position': 'absolute',
        'display':'block',
        'top':'3px',
        'left':'3px',
        'background-color': 'white',
        'border-width': '1px',
        'border-style': 'solid',
        'border-color': '#aaa',
        'border-radius': '4px',
        'font-family': 'Arial, sans-serif',
        'font-size': '15px',
        'text-align':'left',
        'color': '#646464',
        'padding': '5px',
        'width': (obj.width-18) + 'px',
        'height': (obj.height-18) + 'px',
        'text-align':text_align
    };  
 
    var divTT = $("<div/>", {'id': id}).css(tooltip);
    divTT.css({
        "width": obj.width + "px",          //largeur de l'infobulle
        "height": obj.height + "px"         //hauteur de l'infobulle
    });
     
    $("<div />", {
        id: "corp",
        html: obj.html
    }).css(tooltipCorp).appendTo(divTT);
    $(cible).append(divTT);
     
    centerIB(divTT, cible);
}
 
function del_infobulle_grise(id){
 
    var infob;
 
    if(!id){
        infob = '';
    }else{
        infob = '_'+id;
    }
     
    $('#tooltip'+infob).remove();
 
}