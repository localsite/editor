

// From common.js
function loadParamsX(paramStr,hashStr) {
  // Priority: 1st hash, 2nd url search
    var request = {};
    var pairs = paramStr.substring(paramStr.indexOf('?') + 1).split('&');
    for (var i = 0; i < pairs.length; i++) {
        if(!pairs[i])
            continue;
        var pair = pairs[i].split('=');
        request[decodeURIComponent(pair[0]).toLowerCase()] = decodeURIComponent(pair[1]);
     }
     // Next we override with the Hash for older browser that cannot update the URL from script.
     // And for embedding where URL variables may not be usable.
    var hashPairs = hashStr.substring(hashStr.indexOf('#') + 1).split('&');
    for (var i = 0; i < hashPairs.length; i++) {
        if(!hashPairs[i])
            continue;
        if (i==0 && hashPairs[i].indexOf("=") == -1) {
          request[""] = hashPairs[i];  // Allows for initial # param without =.
          continue;
        }
        var hashPair = hashPairs[i].split('=');
        request[decodeURIComponent(hashPair[0]).toLowerCase()] = decodeURIComponent(hashPair[1]);
     }
     return request;
}
function populateFieldsFromHash() {
	$("#productCodes").val(param["hs"]);
}
var param = loadParams(location.search,location.hash);


$(document).ready(function () {
	//loadMarkupPage("intro.md", "introDiv", "_parent");
	if (! ('webkitSpeechRecognition' in window) ) {
		$(".si-btn").hide();
	}
	catArray = [];
	$.get('static/data/hs.txt', function(data) {
		var catLines = data.split("\n");
		
		catLines.forEach(function(element) {
		  // 
		  catArray.push([element.substr(0,4), element.substr(5)]);
		});
		//$('#mainCats > div:nth-child(11)').trigger("click"); // Specific category
		productList("01","99","Harmonized System (HS) Product Categories")
	}, 'text');

	populateFieldsFromHash();
	$("#productCodes").css('width','200px');

	$('#catListHolderShow').click(function () {
		if ($('#catListHolder').css('display') == 'none') {
			$('#catListHolder').show();
			$('#catListHolderShow').text('Hide Industries');
		} else {
			$('#catListHolder').hide();
			$('#catListHolderShow').text('Industries . . .');
		}
    });

	$('#industryCatList > div').click(function () {
		var catTitle = $(this).text();
		$('#keywordsTB').val(catTitle);
		//$('#findLocationWith input[type=checkbox]').prop("checked", true);
		$('#findDetails').prop("checked", true);
		
		$('#industryCatList > div').css('border', 'solid 1px #fff');
        $(this).css('border', 'solid 1px #aaa');
        $(this).css('border-right', 'solid 5px #aaf');
        displayResults();
	    hideNonListPanels();
        event.stopPropagation();
    });
	$('#hsCatList > div').click(function () {
		//consoleLog('.menuRectLink click ' + $(this).attr("data-section").toLowerCase());
        $('#hsCatList > div').css('border', 'solid 1px #fff');
        //$('#mainCats > div:first-child').css('background-color', '#3B99FC');
        $(this).css('border', 'solid 1px #aaa');

        var attr = $(this).attr("range");
        if (typeof attr !== typeof undefined && attr !== false) {
	        //productList($(this).html().substr(0,2), $(this).html().substr(3,2), $(this).html().substr(6));
	        // + " (HS " + $(this).attr("range").replace("-","00 to ") + "00)"
	        productList($(this).attr("range").substr(0,2), $(this).attr("range").substr(3,2), $(this).html());

	        $('#topPanel').show();
	        $('#allProductCats').show();
	    }
        event.stopPropagation();
    });
	$('#allProductCats, #subcatHeader').click(function () {
		$('#hsCatList').show();
		$('#allProductCats').hide();
		$("#subcatHeader").html("Harmonized System (HS) Product Categories");
		$('#hsCatList > div').css('border', 'solid 1px #fff');
		productList("01","99","Harmonized System (HS) Product Categories");
	});
	
	$('.showaccount').click(function () {
		if ($('#accountPanel').css('display') === 'none') {
        	$('#accountPanel').show();
        	// To activate
        	//$('body').append($.gravatar('loren@dreamstudio.com'));
    	} else {
    		$('#accountPanel').hide();
    	}
        event.stopPropagation();
    });
	$('#botButton').click(function () {
		if ($('#botPanel').css('display') === 'none') {
        	$('#botPanel').show();
    	} else {
    		$('#botPanel').hide();
    	}
       	//$(".fieldSelector").hide();
        event.stopPropagation();
    });
    $('#mapButton').click(function () {
		if ($('#mapPanel').css('display') === 'none') {
        	$('#mapPanel').show();
    	} else {
    		$('#mapPanel').hide();
    	}
       	$("#introText").hide();
        event.stopPropagation();
    });
    $('#topPanel').click(function () {
    	event.stopPropagation(); // Allows HS codes to remain visible when clicking in panel.
    });

    $('#mainCats > div').each(function(index) { // Initial load
    	$(this).attr("text", $(this).text());
    });
	$('#productCodes').click(function () {
		if ($('#topPanel').css('display') === 'none') {
			$('#productSubcats').css("max-height","300px");
			$('#topPanelFooter').show();
        	$('#topPanel').show();
        	$('#introText').hide();
        	$('#mainCats > div').each(function(index) {
	        	if ($(this).attr("range")) {
	        		$(this).html($(this).attr("text") + ' (' + $(this).attr("range") + ')');
	        	}
        	});

    	} else {
    		$('#topPanel').hide();
    		$('#mainCats > div').each(function(index) {
    			if ($(this).attr("range")) {
	        		$(this).html($(this).attr("text"));
	        	}
        	});
    	}
       	$(".fieldSelector").hide();
       	event.stopPropagation();
    });
    
    $('#topPanelFooter').click(function () {
    	$('#productSubcats').css("max-height","none");
    	$('#topPanelFooter').hide();
    	event.stopPropagation();
    });
	$('#hideAdvanced').click(function(event) {
		$(".fieldSelector").hide();
	});
    $(document).click(function() { // Hide open menus
    	$(".fieldSelector").hide();
    	$('#topPanel').hide();
    	$('#itemMenu').hide();
	});
	// 
	$('#findLocationWith input[type=checkbox]').change(function() {
		//$(".fieldSelector").hide();
	    $('#topPanel').hide();
	    displayResults();
	    event.stopPropagation();
	});
	function hideNonListPanels() {
		$(".fieldSelector").hide();
    	$('#topPanel').hide();
    	$("#introText").hide();
    	$("#mapPanel").hide();
    	if(location.host.indexOf('localhost') >= 0) {
    		$('#mapButton').show();
    	}
    }
	$("#goSearch").click(function() {
	    hideNonListPanels();

	    if ($('#catListHolder').css('display') == 'none' && $('#catListHolderShow').css('display') == 'none') {
	    	// In case user has resized from mobile to full and industry list is not available.
	    	// Coule be moved to a screen width watcher.
			$('#catListHolderShow').show();
			$('#catListHolderShow').text('Industries . . .');
		}

    	displayResults();
	    event.stopPropagation();
   	});


	$("#keywordsTB").click(function() {
	    $(".fieldSelector").show();
	    event.stopPropagation();
   	});
   	$("#findWhat, #productCodeHolder").click(function() { /* Stop drilldown */
	    event.stopPropagation();
   	});
   	$("#hideCatPanel").click(function() {
   		$("#mainCats").hide();
   		//$("#hideCatPanel").hide();
   		$("#showCatPanel").show();
	    event.stopPropagation();
   	});
   	$("#showCatPanel").click(function() {
   		$("#showCatPanel").hide();
   		$("#mainCats").show();
	    event.stopPropagation();
   	});
   	$("#hideBotPanel").click(function() {
	    $("#botPanel").hide();
	    event.stopPropagation();
   	});
   	$("#hideTopPanel").click(function() {
	    $("#topPanel").hide();
   	});
   	$("#hideMapPanel").click(function() {
	    $("#mapPanel").hide();
	    $("#mapButton").show();
	    event.stopPropagation();
   	});
   	function clearFields() {
   		$('#industryCatList > div').css('border', 'solid 1px #fff');
   		$("#keywordsTB").val("");
   		$("#products").val("");
   		$("#productCodes").val("");
   		$("#productCatTitle").html("");
   		$("#eTable_alert").hide();
   		$("#mainframe").hide();
   		$("input[name='hs']").prop('checked',false);
   	}
   	$("#clearButton").click(function() {
   		clearFields();
   		$("#introText").show();
   		history.pushState("", document.title, window.location.pathname);
   		loadHtmlTable(true); // New list
   		event.stopPropagation();
   	});
   	$("#botGo").click(function() {
   		alert("Chat Bot under development.");
   	});
   	
   	$('showMap').click(function () {

   	});
   	$('#toggleList').click(function () {
		if ($('#dataList').css('display') != 'none') {
			$('#dataGrid').show();
        	$('#dataList').hide();
    	} else {
    		$('#dataList').show();
    		$('#dataGrid').hide();
    	}
       	//event.stopPropagation();
    });
    function escapeRegExp(str) {
    	return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
	}
    function replaceAll(str, find, replace) {
    	return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
	}
   	$('#requestInfo').click(function () {
   		var checkedCompaniesArray = $('[name="contact"]:checked').map(function() {return replaceAll(this.value,",","");}).get();
   		var checkedCompanies = checkedCompaniesArray.join(', ').trim();
   		if (checkedCompaniesArray.length <= 0) {
   			alert("Select one or more companies to pre-fill our request form.");
   			return;
   		}
   		else if (checkedCompaniesArray.length > 10) {
   			alert("Please reduce your selected companies to 10 or less. You've selected " + checkedCompaniesArray.length + ".");
   			return;
   		}
   		//alert("Please select 1 to 10 exporters to request contact info.\r(Under development, please return soon. Thank you!)")
   		//window.location = "https://www.cognitoforms.com/GDECD1/ExportGeorgiaUSARequestForSupplierIntroduction";

   		


   		window.open(
		  'https://www.cognitoforms.com/GDECD1/ExportGeorgiaUSARequestForSupplierIntroduction?entry={"RequestForIntroduction":{"Suppliers":"' + checkedCompanies + '"}}',
		  '_blank' // open in a new tab.
		);
   	});
   	$('#addCompany').click(function () {
   		//window.location="exporters/add";
   		window.open(
		  'exporters/add',
		  '_blank' // open in a new tab.
		);
   	});

	function productList(startRange, endRange, text) {

		if ($("#productCodes").val() == "") {
			//return;
		}
		$("#productSubcats").html("");
		$("#productCatTitle").html("");
		console.log("productList " + startRange + ' to ' + endRange + " " + text);
		$("#subcatHeader").html(text);

		//alert("pcodes " + $("#productCodes").val())
		var productcodes = $("#productCodes").val().replace(";",",");
		var productcode_array = productcodes.split(/\s*,\s*/); // Removes space when splitting on comma
		//alert("productcode_array " + productcode_array[0].length);

		if (catArray.length > 0) {
			$("#catRowCount").html(catArray.length);
			$("#botWelcome").show();
		}
		//console.log("catArray " + catArray)
		var checkProductBox;
		catArray.forEach(function(entry) {
			checkProductBox = false;
			for(var i = 0; i < productcode_array.length; i++) {
				if (productcode_array[i].length > 0) {
					if (isInt(productcode_array[i])) { // Int
							// Reduce to four digits
							productcode_truncated = productcode_array[i].substring(0,4);
							//console.log("Does " + entry[0] + " start with " + productcode_truncated);

							if (entry[0].startsWith(productcode_truncated)) { // If columns values start with search values.
								$("#productCatTitle").append(entry[0] + " - " + entry[1] + "<br>");
								checkProductBox = true;
								// To activate on list of HS types is displayed.
								$("#productCodesHolder").removeClass("localonly");
							} else {
								//console.log("Not Found");
							}
						
					} else {
						console.log("Alert: productcode " + productcode_array[i] + " not integer.")
						//productMatchFound++;
					}
				}
			}

			if (entry[0] > (startRange*100) && entry[0] < (endRange*100+99)) {
		    	//console.log(entry[0]);
		    	var ischecked = "";
		    	if (checkProductBox) {
		    		ischecked = "checked";
		    	}
		    	$("#productSubcats").append( "<div><div><input name='hs' type='checkbox' " + ischecked + " value='" + entry[0] + "'> " + entry[0] + "</div><div>" + entry[1] + "</div></div>" );
			}
		});
		if ($(window).width() < 600) {
			//$('#mainCats').hide();
		}
		
		$('#productSubcats > div').click(function () {
	    	$(this).find('input[type=checkbox]').prop("checked", !$(this).find('input[type=checkbox]').prop("checked")); // toggle
	    	updateHash();
	        event.stopPropagation();
	    });

	    //$('#productSubcats > div:first-child').click(function () {
		//	$('#mainCats').show();
		//	$('.backArrow').hide();
	    //    event.stopPropagation();
	    //});
	}
	
	function updateHash() {
	  var hsHash = '';
	  
	  hsHash = $('[name="hs"]:checked').map(function() {return this.value;}).get().join(',');

	  var pathname = window.location.pathname;
	  var queryString = "";
	  if (hsHash) {
	    queryString = "#hs=" + hsHash;
	  }
	  $("#productCodes").val(hsHash);
	  $("#productCodes").width("200px");
	  var searchTitle = hsHash; // TODO: Use titles instead
	  window.history.pushState("", searchTitle, pathname + queryString);
	  refreshMain();
	}

	$(document).ready(function () {
		if(location.host.indexOf('localhost') < 0) {
			// Inject style rule
			  var div = $("<div />", {
			    html: '&shy;<style>.localonly{display:none}#mapPanel{display:none}</style>'
			  }).appendTo("body");
		} else {
			var div = $("<div />", {
			    html: '&shy;<style>.localonly{display:block !important}#mapPanel{display:none;}</style>'
			  }).appendTo("body");
		}
	});
	loadHtmlTable(true);

	$(window).on('hashchange', function() { // Refresh param values when user changes the URL after #.
		console.log('hashchange');
		clearFields();
		param = loadParams(location.search,location.hash); // Refresh with new hash values
		populateFieldsFromHash();
		productList("01","99","All Harmonized System Categories"); // Sets title for new HS hash.
		refreshMain();
	});
	function refreshMain() { // refresh search results
		loadHtmlTable(true);
	}

});