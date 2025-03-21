Ext.define('lookup.popup.project.store.TablePopup', { extend:'Axt.data.Store',

	model:'lookup.popup.project.model.TablePopup',
	autoLoad: false,
	pageSize: 17,
	proxy:{
		api:{
			read   : _global.location.http() + '/project/tablemanager/get/tablelookup.do'
		},
		actionMethods: { read: 'POST'  },
		extraParams:{ token : _global.token_id }
	}
});