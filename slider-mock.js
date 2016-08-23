var Mock = require('mockjs');
var mock_data =  Mock.mock( {
	    'slider|4': [{
	    	'photo': 1,
	    	// 'photo|+1': 1,
	    	'url|+1': 1,
	    	'title|+1': 1
	    }]
	});

module.exports = mock_data;

