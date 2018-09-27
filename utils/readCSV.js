var fs = require('fs');
var csvParse = require('csv-parse/lib/sync');

module.exports = (driver_path)=>{
	var testdriver = fs.readFileSync(driver_path);
	var data = csvParse(testdriver,{columns:true/*,auto_parse:true*/,skip_lines_with_empty_values:true,delimiter:"|"});
	data.map((row)=>{
		if(row['execute']!= 'x'){
			delete row;
		}else{
			for(let pi in row){
				if(row[pi]=='') delete row[pi];
			}
			if(row.arrayValue){
				row.arrayValue = row.arrayValue.split('\t');
			}
		}
	});
	//console.log(data);
	return data;
}