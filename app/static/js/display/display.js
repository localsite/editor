function SearchFormTextCheck(t, dirn) {
	if (dirn == 1 && t.value == "") {
		t.value = "";
		$(".fieldSelector").show();
		//console.log('boo');
	}
	//return false;
	event.stopPropagation();
}
function SearchEnter(event1) {
	var kCode = String.fromCharCode(event1.keyCode);
	//if (kCode == "\n" || kCode == "\r") {
        $("#goSearch").click();
	//	return false;
	//}
}
function isInt(value) {
  var x;
  return isNaN(value) ? !1 : (x = parseFloat(value), (0 | x) === x);
}
String.prototype.split2 = function(separator) {
    return this == "" ? [] : this.split(separator); // Avoid returning 1 when null.
}
function clickClearButton(){
  	$("#clearButton").click();
}
function displayResults() {
	console.log("displayResults");
	$("#resultsPanel").hide();
	$("#eTable_alert").hide();
	$("#nomatchPanel").hide();
	var productMatchFound = 0;
	var dataMatchCount = 0;
	// Keyword Search
	var keyword = $("#keywordsTB").val().toLowerCase();
	var products = $("#keywordsTB").val().replace(";",",");
	// For each product ID
	var productcodes = $("#productCodes").val().replace(";",",");

	//$(".eTable > table > tr").hide(); // Hide all rows
	//$(".eTable > table > tr:first-child").show(); // Show the header row

	//var products_array = products.split(/\s*,\s*/);
	var products_array = products.split2(/\s*,\s*/);
	var productcode_array = productcodes.split2(/\s*,\s*/); // Removes space when splitting on comma

	// Display DataList
	var foundMatch = 0;
	$("#resultsHeader").html("");
	$("#dataList").html("");
	for(var i = 0; i < dataSet.length; i++) {
		foundMatch = 0;
		if (keyword.length > 0 || products_array.length > 0 || productcode_array.length > 0) {

			//$("#dataList").html("");
			if (keyword.length > 0) {

				console.log("Search for " + keyword);

				if ($("#findKeywords").is(":checked") > 0 && dataSet[i][5].toString().toLowerCase().indexOf(keyword) >= 0) {
					console.log("foundMatch keywords");
					foundMatch++;
				}

				//if ($(dataSet[i][0].length > 0)) {
					if ($("#findCompany").is(":checked") > 0 && dataSet[i][0].toString().toLowerCase().indexOf(keyword) >= 0) {
						console.log("foundMatch A");
						foundMatch++;
					}
				//}
				if ($("#findAddress").is(":checked") > 0 && dataSet[i][1].toString().toLowerCase().indexOf(keyword) >= 0) {
					console.log("foundMatch B");
					foundMatch++;
				}
				if ($("#findDetails").is(":checked") > 0 && dataSet[i][2].toString().toLowerCase().indexOf(keyword) >= 0) {
					console.log("foundMatch C");
					foundMatch++;
				}
				if ($("#findProduct").is(":checked") > 0 && dataSet[i][3].toString().toLowerCase().indexOf(keyword) >= 0) {
					console.log("foundMatch D");
					foundMatch++;
				}
				if ($("#findProduct").is(":checked") > 0 && dataSet[i][4].toString().toLowerCase().indexOf(keyword) >= 0) { // Description
					console.log("foundMatch E");
					foundMatch++;
				}
			}

			for(var p = 0; p < products_array.length; p++) {
				if (products_array[p].length > 0) {
					//if (isInt(products_array[p])) { // Int
						// Column 0


						//console.log("Does " + codesArray[j] + " start with " + productcode_array[p]);
						if (dataSet[i][0].toString().toLowerCase().startsWith(products_array[p])) { // If columns values start with search values.

							productMatchFound++;
							//console.log("productMatchFound " + productMatchFound);

							console.log("foundMatch: " + dataSet[i][0] + " startsWith: " + products_array[p]);
							//foundMatch++;
							//$(this).show();
						}
					
					//} else {
					//	console.log("Not int")
					//	productMatchFound++;
					//}
				}
			}

			console.log("Check if listing's product HS codes match.");
			for(var pc = 0; pc < productcode_array.length; pc++) { 
				if (productcode_array[pc].length > 0) {
					if (isInt(productcode_array[pc])) { // Int
						//var codesArray = $(this.childNodes[3]).text().replace(";",",").split(/\s*,\s*/);
						var codesArray = dataSet[i][5].toString().replace(";",",").split2(/\s*,\s*/);
						for(var j = 0; j < codesArray.length; j++) {
							if (isInt(codesArray[j])) {
								if (codesArray[j].startsWith(productcode_array[pc])) { // If columns values start with search values.
									console.log("codesArray " + j + " " + codesArray[j] + " starts with " + productcode_array[pc]);
								
									console.log("foundMatch D");
									productMatchFound++; // Might not be needed here
									foundMatch++;
									//$(this).show();
								}
							}
						}
					} else {
						console.log("productcode not int")
						// TO DO: Match the product description instead.

							//productMatchFound++;

					}
				}
			}

		} else {
			// Automatically find match since there are no filters
			//console.log("foundMatch E");
			foundMatch++;
		}

      	if (i > 0) { // BUGBUG Skip the header row
      		//if (entry[0] > (startRange*100) && entry[0] < (endRange*100+99)) {

      		if (foundMatch > 0) { // keyword match.  Not product match. // && dataSet[i][4] == "GA"
      			dataMatchCount++;
      			//console.log("foundMatch: " + i + " column 0: " + dataSet[i][0]);
		    	//console.log(entry[0]);
		    	//displayRow(dataSet[i]); // Works, but copy the following there. More bold lables:

		    	if (dataSet[i][0].length > 0) {
					console.log(loggedin);
			    	//console.log("display the row: " + dataSet[i][0]);
			    	var dataRow = ("<div style='position:relative'><div class='localonlyX' style='float:left;min-width:28px;margin-top:2px'><input name='contact' type='checkbox' value='" + dataSet[i][0] + "'></div><div style='overflow:auto'><div>" + ( loggedin ? "<div class='showItemMenu' style='float:right'>&mldr;</div>" : "")  + dataSet[i][0] + "</div>");
			    	if (dataSet[i][1].length > 0) {
			    		if (!dataSet[i][1].toLowerCase().startsWith('http')) {
			    			dataSet[i][1] = "http://" + dataSet[i][1]; // Since not all are https
			    		}

		    			dataRow += "<a href='" + dataSet[i][1] + "' target='_blank'>" + dataSet[i][1].replace("https://","").replace("http://","").replace("wwww.","").replace(/^\/|\/$/g, '') + "</a>";
		    		}

			    		dataRow += ("<div><b class='exporter'>Export Categories: </b><span class='exporter'> ");
			    		 
			    		if (dataSet[i][2]) {
			    			dataRow += (dataSet[i][2]);
			    		}
			    		if (dataSet[i][2] && dataSet[i][3]) {
			    			dataRow += ("; ");
			    		}
			    		if (dataSet[i][3]) {
			    			dataRow += (dataSet[i][3] + " ");
			    		}    
			    		// registered: u00ae and u2122
			    		// copyright: u00a9 and u0174
			    		// Need to replace before converted to "?" symbol to tell if it was a tm or reg symbol.
			    		dataRow += ("</span></div><div><b>Description: </b>" + dataSet[i][4].replace("�","") + "</div>");

			    	// <div><b>Hidden: </b>" + dataSet[i][5] + "</div>");
			    	if (dataSet[i][5].length > 0) {
			    		dataRow += ("<div>");
			    		if (1==1) {
							dataRow += ("<b>Product HS Code: </b>");
				    		dataRow += (dataSet[i][5].replace(".",""));
			    		} else if (dataSet[i][5].includes(",")) { 
				    		dataRow += ("<b>Product HS Codes: </b>"); // HS Codes
				    			var hs_array = dataSet[i][5].split2(/\s*,\s*/); // Removes space when splitting on comma
				    			// To do: Add comma split here for multiple HS codes
				    			for(var m = 0; m < hs_array.length; m++) {
				    				dataRow += ("<a href='#hs=" + hs_array[m].substr(0,4) + "'>" + hs_array[m] + "</a>");
				    				if (m < hs_array.length -1) {
				    					dataRow += ", ";
				    				}
				    			}
				    	} else {
				    		dataRow += ("<b>Product HS Code: </b>");
				    		dataRow += ("<a href='#hs=" + dataSet[i][5].substr(0,4) + "'>" + dataSet[i][5].replace(".","") + "</a>");
				    	}
			    		dataRow += ("</div>");
			    	}
			    	
			    	dataRow += ("</div></div>");

			    	$("#dataList").append(dataRow);
			    		//<div>" + dataSet[i][6] + "</div><div>" + dataSet[i][7] + "</div>
			    }
			}
      	}
    }
	$('.showItemMenu').click(function () {
		//alert("click")
		$("#itemMenu").show();

		$("#itemMenu").appendTo($(this).parent().parent());

		event.stopPropagation();
		//$("#map").show();
		// $(this).css('border', 'solid 1px #aaa');
	});
	$('#itemMenu div').click(function () {
		console.log($(this));
	});
	$('#showLocalNews').click(function () {
		mainframe.location='https://georgiadata.github.io/explorer/news/'
		// mainframe.location='map/leaflet/#columns=' + columns;
		$("#mainframe").show();
	});

	

    if (dataMatchCount > 0) {
    	//alert("show") // was twice BUGBUG
    	//$("#dataList").prepend(dataMatchCount + " results displayed from " + (dataSet.length - 1) + " records.<br><br>");
  		$("#resultsPanel").show();
  		$("#dataList").show();
  	} else {
  		// href='javascript:;' onclick='return false;'
  		
		var noMatch = "<div>No match found in " + (dataSet.length - 1) + " records. <a href='#' onclick='clickClearButton();return false;'>Clear filters</a>.</div>"
		$("#nomatchText").html(noMatch);
		$("#nomatchPanel").show();
	}

	console.log("productMatchFound: " + productMatchFound);

	// products_array.length > 0
	if (productMatchFound > 0) {
		if ($("#keywordsTB").val().length > 0 && $("#productCodes").val().length > 0) {
			var resultsHeader = "";
			if ($("#keywordsTB").val().length > 0) {
				resultsHeader += $("#keywordsTB").val() + " OR ";
			}
			resultsHeader += "product code contains " + $("#productCodes").val() + ".";
			$("#resultsHeader").text(resultsHeader);
		}
		//$("#productSubcats > div:first-child").show(); // Show the header row
		$('#productSubcats > div').each(function(index) {
			for(var i = 0; i < productcode_array.length; i++) {
				if (productcode_array[i].length > 0) {
					if ($(this.childNodes[1]).length > 0) {
						if ($(this.childNodes[1]).text().toLowerCase().indexOf(productcode_array[i].toLowerCase()) >= 0) {
							//matchFound++;
							$(this).show();
						}
					}
				}
			}
		});
	} else {
		//$(".eTable > table > tr").hide();
		//$("#resultsPanel").hide();
		//$("#eTable_alert").text("No matching records."); 
		//$("#eTable_alert").show();
	}
	//console.log("displayResults done.");
	//SearchProductCodes(event);
}
function displayRow(rowArray) {
	// NOT USED?
	// <input name='contact' type='checkbox' value='" + rowArray[0] + "'> 
	$("#dataList").append( "<div><div><div style='float:right'>Add</div>" + rowArray[0] + "</div><div><b class='exporter'>Export Categories: </b><span class='exporter'> " + rowArray[2] + "</span></div><div>" + rowArray[3] + "</div><div>" + rowArray[4] + "</div><div><b>Product HS Codes: </b>" + rowArray[5] + "</div></div>");
	//<div>" + rowArray[6] + "</div><div>" + rowArray[7] + "</div>
}

// For massive CSV files, try papaparse.
// https://www.papaparse.com/docs#csv-to-json
// https://code.tutsplus.com/tutorials/how-to-upload-and-download-csv-files-with-angularjs--cms-31489
// Better yet, find a working example with a D3 marker cluster map.

var overlays = {};
var dataParameters = [];
var dp = {};
var layerControl = false;
var dataSet = []; // This will be eliminated
function loadHtmlTable(applyFilter) {
	//var csvdata = "data/locations-final-cleaned.csv";
	// var csvdata = "static/data/toy.csv";
	var csvdata = "toycsv";
	//d3.text("exporters/export.csv", function(data) {
	d3.text(csvdata).then(function(data) {
      //dataSet = d3.csv.parseRows(data);
      dataSet = d3.csvParseRows(data);
      var listHeader = [];
      console.log("loadHtmlTable - dataSet row count: " + dataSet.length);
      
      for(var i = 0; i < dataSet.length; i++) {
      	/*
      	if (i == 0) { // Header row
      		// Possible https://www.papaparse.com/demo - Keys data by field name rather than an array.
      		for(var j = 0; j < dataSet.length; j++) {
				console.log(dataSet[i][j]) // Header values
				listHeader.push(dataSet[i][j])
			}
      	}
      	*/
      	       	
      }
      displayGrid(applyFilter);

      	dp = {
	      numColumnsX: ["zip","lat","lon"],
	      valueColumn: "name",
	      latColumnX: "lat",
	      lonColumnX: "lon",
	      //scaleType: "scaleQuantile",
	      scaleType: "scaleOrdinal",
	    }
	    dp.name = "Smart Data Projects"; // Must match "map.addLayer(overlays" below.
	    dp.data = readCsvData(data, dp.numColumns, dp.valueColumn);

	    // To activate when swicthing to mapable data
	    //dp.scale = getScale(dp.data, dp.scaleType, dp.valueColumn);
	    dp.group = L.layerGroup();
	    dp.iconName = 'star';
	    dataParameters.push(dp);
	    overlays[dp.name] = dp.group; // Allows for use of dp.name with removeLayer and addLayer

	    if(layerControl === false) {
	      // To activate - how to handle baseLayers
	      //layerControl = L.control.layers(baseLayers, overlays).addTo(map);
	    }
	    // To activate 
	    //layerControl.addOverlay(dp.group, dp.name); // Appends to existing layers
	    // To activate 
	    //addIcons(dp);

    }); 	
}
function readCsvData(_data, columnsNum, valueCol) {
    //console.log(_data);
    
    if (typeof columnsNum !== "undefined") {
      _data.forEach( function (row) {
        //row = removeWhiteSpaces(row);
        convertToNumber(row, columnsNum);
      });
    }
    console.log(_data);
    return _data;
}
function convertToNumber(d, _columnsNum) {
    for (var perm in d) {
      if (_columnsNum.indexOf(perm) > -1)
        if (Object.prototype.hasOwnProperty.call(d, perm)) {
          d[perm] = +d[perm];
        }
      }  
    return d;
}
// Scales: http://d3indepth.com/scales/
function getScale(data, scaleType, valueCol) {
    var scale;
    if (scaleType === "scaleThreshold") {
      var min = d3.min(data, function(d) { return d[valueCol]; });
      var max = d3.max(data, function(d) { return d[valueCol]; });
      var d = (max-min)/7;
      scale = d3.scaleThreshold()
        .domain([min+1*d,min+2*d,min+3*d,min+4*d,min+5*d,min+6*d])
        .range(['#ffffe0','#ffd59b','#ffa474','#f47461','#db4551','#b81b34','#8b0000']);
    } else if (scaleType === "scaleQuantize") {
      scale = d3.scaleQuantize()
        .domain(d3.extent(data, function(d) { return d[valueCol]; }))
        .range(['#ffffe0','#ffd59b','#ffa474','#f47461','#db4551','#b81b34','#8b0000']);
    } else if (scaleType === "scaleQuantile") {
      scale = d3.scaleQuantile()
        .domain(data.map(function(d) { return d[valueCol]; }).sort(function(a, b){return a-b}))
        .range(['#ffffe0','#ffd59b','#ffa474','#f47461','#db4551','#b81b34','#8b0000']);            
    } else if (scaleType === "scaleOrdinal") {
      scale = d3.scaleOrdinal()
        .domain(data.map(function(d) { return d[valueCol]; }))
        .range(d3.schemePaired);
    }
    return scale;
}
function addIcons(dp) {
    var circle;
    var iconColor, iconColorRGB, iconName;
    var colorScale = dp.scale;
    dp.data.forEach(function(element) {
      iconColor = colorScale(element[dp.valueColumn]);
      if (dp.color) {
        iconColor = dp.color;
      }
      // How to make element always lowercase?
      console.log("element " + element + " iconColor: " + iconColor)
      if (typeof dp.latColumn == "undefined") {
        dp.latColumn = "lat";
      }
      if (typeof dp.lonColumn == "undefined") {
        dp.lonColumn = "lon";
      }
      iconColorRGB = hex2rgb(iconColor);
      iconName = dp.iconName;

    var busIcon = L.IconMaterial.icon({
      icon: iconName,            // Name of Material icon
      iconColor: '#fff',              // Material icon color (could be rgba, hex, html name...)
      markerColor: 'rgba(' + iconColorRGB + ',0.7)',  // Marker fill color
      outlineColor: 'rgba(' + iconColorRGB + ',0.7)',            // Marker outline color
      outlineWidth: 1,                   // Marker outline width 
    })
    
    // Attach the icon to the marker and add to the map
    //L.marker([element[dp.latColumn], element[dp.lonColumn]], {icon: busIcon}).addTo(map)
    circle = L.marker([element[dp.latColumn], element[dp.lonColumn]], {icon: busIcon}).addTo(dp.group);


      var output = "<b>" + element[dp.valueColumn] + "</b><br>" + element.address + "<br>" + element.city + " " + element.state + " " + element.zip + "<br>" + element.phone + " " + element.phone_afterhours + "<br>Hours: " + element.schedule + "<br>";
      if (element[dp.latColumn]) {
          output += "<a href='https://www.waze.com/ul?ll=" + element[dp.latColumn] + "%2C" + element[dp.lonColumn] + "&navigate=yes&zoom=17'>Waze  Directions</a><br>";
      }
      circle.bindPopup(output);
        // "<br>Latitude: " + element[dp.latColumn] + 

      //alert(output);
    });
}

function displayListX() {
	console.log("displayList");
	var matchCount = 0;

	$("#dataList").html("");
	for(var i = 0; i < dataSet.length; i++) {
      	if (i > 2) { // && dataSet[i][3] == "GA"
      		//if (entry[0] > (startRange*100) && entry[0] < (endRange*100+99)) {
		    	matchCount++;
		    	// <input name='contact' type='checkbox' value='" + dataSet[i][0] + "'> 
		    	$("#dataList").append( "<div><div style='float:right'>Add<div></div>" + dataSet[i][0] + "</div><div><b class='exporter'>Export Categories: </b><span class='exporter'> " + dataSet[i][2] + "</span></div><div><b>Description: </b>" + dataSet[i][3] + "</div>");
		    	$("#dataList").append( "<div><b>Product HS Codes: </b>" + dataSet[i][5] + "</div></div>");
		    		//<div>" + dataSet[i][6] + "</div><div>" + dataSet[i][7] + "</div>
			//}
      	}
      	if (matchCount > 0) {
      		$("#resultsPanel").show();
      	}
     }
     if (matchCount > 0) {
  		$("#resultsPanel").show();
  	}
}
function displayGrid(applyFilter) {
	var container = d3.select("#d3div")
      .html('').append("table") // Empty the div to clear previous before appending

      .selectAll("tr")
          .data(dataSet).enter()
          .append("tr")

      .selectAll("td")
          .data(function(d) { return d; }).enter()
          .append("td")
          .text(function(d) { return d; });

    if (applyFilter) {
  		// initial load for URL hash params
		displayResults();
	}
}
function SearchProductCodes(event1) {
	console.log("SearchProductCodes")
	var kCode = String.fromCharCode(event1.keyCode);
	//alert($("#productCodes").val())
	
	//if ($("#productCodes").val().length==0) {
		loadHtmlTable(true);
	//} else {
		//if (kCode == "\n" || kCode == "\r") {
			//alert("SearchProductCodes")
	        
			//return false;
		//}
	//}
	event.stopPropagation();
}
