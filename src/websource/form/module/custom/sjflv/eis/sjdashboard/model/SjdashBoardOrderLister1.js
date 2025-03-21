Ext.define('module.custom.sjflv.eis.sjdashboard.model.SjdashBoardOrderLister1',{ extend:'Axt.data.Model',
	fields:[
		{name: 'dvcd'			, type: 'string'  },
		{name: 'today'			, type: 'float '  , defaultValue: 0},
		{name: '1day_ago'		, type: 'float '  , defaultValue: 0},
		{name: '2day_ago'		, type: 'float '  , defaultValue: 0},
		{name: '3day_ago'		, type: 'float '  , defaultValue: 0},
		{name: '4day_ago'		, type: 'float '  , defaultValue: 0},
		{name: '5day_ago'		, type: 'float '  , defaultValue: 0},
		{name: 'weak_ago'		, type: 'float '  , defaultValue: 0}
	]
});
