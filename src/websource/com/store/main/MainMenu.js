Ext.define('com.store.main.MainMenu', {extend:'Axt.data.TreeStore',
	root : { expanded: false },
	autoLoad: false,
	proxy:{
		api:{
			read : _global.api_host_info + '/' + _global.app_site + '/auth/screen.do'
		},
		actionMethods: { read: 'POST' }
	}
});
