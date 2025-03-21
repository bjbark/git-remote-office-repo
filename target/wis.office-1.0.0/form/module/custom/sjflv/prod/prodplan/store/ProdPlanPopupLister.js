Ext.define('module.custom.sjflv.prod.prodplan.store.ProdPlanPopupLister', { extend:'Axt.data.Store',

	model: 'module.custom.sjflv.prod.prodplan.model.ProdPlanPopupLister',
	autoLoad: false,
	pageSize: Const.SELECT.rows,

	proxy:{
		api:{
			update	: _global.api_host_info + "/system/custom/sjflv/prod/prodplan/set/prodplan.do"
		},
		actionMethods: {
			read	: 'POST' ,
			update	: 'POST'
		},
		extraParams:{
			token : _global.token_id
		}
	},
	
	listeners: {
		update: function(self, rec, operation, fieldName) {
			if (fieldName[0] === 'plan_date') {
				var deliDate = Ext.util.Format.dateToStr(rec.get('deli_date'));
				var planDate = Ext.util.Format.dateToStr(rec.get('plan_date'));
				if (deliDate < planDate) {
					rec.set('plan_date', rec.get('deli_date'));
				}
			}
		}
	}
});
