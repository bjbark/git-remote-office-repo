Ext.define('module.prod.order.workbookv4.store.WorkBookV4Detail', { extend:'Axt.data.Store',
	model: 'module.prod.order.workbookv4.model.WorkBookV4Detail',
	autoLoad  : false,
	remoteSort: true,
	pageSize: 200,
	proxy:{
		api:{
			read	: _global.location.http() + "/prod/order/workbookv4/get/searchDetail.do",
			update	: _global.location.http() + "/prod/order/workbookv4/set/setMaster.do"
		},
		actionMethods: { read   : 'POST' , update : 'POST' },
		extraParams:{
			token	: _global.token_id
		}
	},
	listeners:{
		load:function(){
			setTimeout(function(){
				var	me			= this,
					detail		= Ext.ComponentQuery.query('module-workbookv4-detail')[0],
					mid			= Ext.ComponentQuery.query('module-workbookv4-middlesearch')[0],
					wkod_numb,
					wkod_seqn
				;
				mid.getForm().reset(true);
				if(detail.getStore().data.items.length){
					wkod_numb = detail.getStore().data.items[0].get('wkod_numb');
					wkod_seqn = detail.getStore().data.items[0].get('wkod_seqn');
					Ext.Ajax.request({
						url			: _global.api_host_info + '/' + _global.app_site + '/prod/order/workbookv4/get/midsearch.do',
						method		: "POST",
						async: false,
						params		: {
							token	: _global.token_id,
							param	: Ext.encode({
								hqof_idcd	: _global.hqof_idcd,
								stor_grp	: _global.stor_grp,
								invc_numb	: wkod_numb,
								line_seqn	: wkod_seqn,
							})
						},
						success : function(response, request) {
							var object = response,
								result = Ext.decode(object.responseText)
							;
							if(result.records.length){
								mid.down('[name=indn_qntt]').setValue(result.records[0].indn_qntt);
								mid.down('[name=runn_shot]').setValue(result.records[0].runn_shot);
								mid.down('[name=sum_qntt]').setValue(result.records[0].sum_qntt);
								mid.down('[name=deff_qntt]').setValue(result.records[0].deff_qntt);
								mid.down('[name=succ_pcnt]').setValue(((result.records[0].sum_qntt/result.records[0].indn_qntt)*100).toFixed(2));
							}else{
							}
						},
						failure : function(response, request) {
							resource.httpError(response);
						},
						callback : function() {
						}
					});
				}
			},200);
		}
	},
	midSearch:function(invc_numb,line_seqn){
		var	me = this,
			mid = Ext.ComponentQuery.query('module-workbookv4-middlesearch')[0]
		;
		Ext.Ajax.request({
			url			: _global.api_host_info + '/' + _global.app_site + '/prod/order/workbookv4/get/midsearch.do',
			method		: "POST",
			async: false,
			params		: {
				token	: _global.token_id,
				param	: Ext.encode({
					hqof_idcd	: _global.hqof_idcd,
					stor_grp	: _global.stor_grp,
					invc_numb	: invc_numb,
					line_seqn	: line_seqn,
				})
			},
			success : function(response, request) {
				var object = response,
					result = Ext.decode(object.responseText)
				;
				if(result.records.length){
					mid.down('[name=indn_qntt]').setValue(result.records[0].indn_qntt);
					mid.down('[name=runn_shot]').setValue(result.records[0].runn_shot);
					mid.down('[name=sum_qntt]').setValue(result.records[0].sum_qntt);
					mid.down('[name=deff_qntt]').setValue(result.records[0].deff_qntt);
					mid.down('[name=succ_pcnt]').setValue(((result.records[0].sum_qntt/result.records[0].indn_qntt)*100).toFixed(2));
				}else{
				}
			},
			failure : function(response, request) {
				resource.httpError(response);
			},
			callback : function() {
			}
		});
	}
});
