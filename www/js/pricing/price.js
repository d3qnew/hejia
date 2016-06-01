$(document).ready(function(){
    
    
    
    $("#price").click(function () {   
        var getXML1 = getXML.createNew("data/menchuang/m76.xml");
//        a=getXML1.get();
        alert(getXML1.get());
    });
    
    var getXML={
        createNew: function(gURL){
            var gxml = {};
            gxml.get = function(){ 
                var gtemp;
                $.ajax({//读取xml文件
                    url: gURL,
                    dataType: 'xml',
                    type: 'GET',
                    timeout: 1000,
                    async:false,
                    error: function ()
                    {
                        alert("读取 "+gURL+" 错误");
                    },
                    success: function (xml)
                    {
                        gtemp = $(xml).find("doors").text(); 
                    }
                });
//                alert(temp);
                return gtemp;
            };
            return gxml;
        }
    };
    $([name=XiLie]).each(function(){
//        alert(1);
        $(this).append("<option value='Value'>爱车安</option><option value='Value'>爱车安2</option>")
        $(this).selectmenu('refresh', true);
    });
});
//
//( function( $ ) {
//function pageIsSelectmenuDialog( page ) {
//        var isDialog = false,
//                id = page && page.attr( "id" );
//        $( ".filterable-select" ).each( function() {
//                if ( $( this ).attr( "id" ) + "-dialog" === id ) {
//                        isDialog = true;
//                        return false;
//                }
//        });
//        return isDialog;
//}
//$.mobile.document
//        .on( "selectmenucreate", ".filterable-select", function( event ) {
//                var input,
//                        selectmenu = $( event.target ),
//                        list = $( "#" + selectmenu.attr( "id" ) + "-menu" ),
//                        form = list.jqmData( "filter-form" );
//                if ( !form ) {
//                        input = $( "<input data-type='search'></input>" );
//                        form = $( "<form></form>" ).append( input );
//                        input.textinput();
//                        list
//                                .before( form )
//                                .jqmData( "filter-form", form ) ;
//                        form.jqmData( "listview", list );
//                }
//                selectmenu
//                        .filterable({
//                                input: input,
//                                children: "> option[value]"
//                        })
//                        .on( "filterablefilter", function() {
//                                selectmenu.selectmenu( "refresh" );
//                        });
//        })
//        .on( "pagecontainerbeforeshow", function( event, data ) {
//                var listview, form;
//                if ( !pageIsSelectmenuDialog( data.toPage ) ) {
//                        return;
//                }
//                listview = data.toPage.find( "ul" );
//                form = listview.jqmData( "filter-form" );
//                data.toPage.jqmData( "listview", listview );
//                listview.before( form );
//        })
//        .on( "pagecontainerhide", function( event, data ) {
//                var listview, form;
//                if ( !pageIsSelectmenuDialog( data.toPage ) ) {
//                        return;
//                }
//                listview = data.prevPage.jqmData( "listview" ),
//                form = listview.jqmData( "filter-form" );
//                listview.before( form );
//        });
//})( jQuery );