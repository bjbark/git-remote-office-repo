Ext.define('module.custom.aone.prod.order.sorderworkreport.SorderWorkReport', { extend:'Axt.app.Controller',

	requires:[
	  		'lookup.popup.view.CstmPopup',
	  		'lookup.popup.view.UserPopup',
	  		'lookup.popup.view.ItemPopup',
	  		'lookup.popup.view.ItemPopupAone',
	  	],

	models:[
		'module.custom.aone.prod.order.sorderworkreport.model.SorderWorkReportMaster',
		'module.custom.aone.prod.order.sorderworkreport.model.SorderWorkReportDetail',
		'module.custom.aone.prod.order.sorderworkreport.model.SorderWorkReportFile',
	],
	stores:[
		'module.custom.aone.prod.order.sorderworkreport.store.SorderWorkReportMaster',
		'module.custom.aone.prod.order.sorderworkreport.store.SorderWorkReportDetail',
		'module.custom.aone.prod.order.sorderworkreport.store.SorderWorkReportFile',
	],
	views: [
		'module.custom.aone.prod.order.sorderworkreport.view.SorderWorkReportLayout',
		'module.custom.aone.prod.order.sorderworkreport.view.SorderWorkReportSearch',
		'module.custom.aone.prod.order.sorderworkreport.view.SorderWorkReportFile',
		'module.custom.aone.prod.order.sorderworkreport.view.SorderWorkReportImage',
		'module.custom.aone.prod.order.sorderworkreport.view.SorderWorkReportListerMaster',
		'module.custom.aone.prod.order.sorderworkreport.view.SorderWorkReportListerDetail',
	],
	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
	},

	init: function() {
		var me = this;
		me.control({
			'module-sorderworkreport-layout button[action=selectAction]'			: { click : me.selectAction	},	// 조회

			'module-sorderworkreport-lister-master' : {
				itemclick       : me.selectDetail,
			},
			'module-sorderworkreport-file'		: {
				selectionchange	: me.selectImage
			}
		});
		me.callParent(arguments);
	},
	pocket : {
		layout : function () { return Ext.ComponentQuery.query('module-sorderworkreport-layout')[0] },
		search : function () { return Ext.ComponentQuery.query('module-sorderworkreport-search')[0] },
		lister : {
			master   : function () { return Ext.ComponentQuery.query('module-sorderworkreport-lister-master')[0] },
			detail   : function () { return Ext.ComponentQuery.query('module-sorderworkreport-lister-detail')[0] },
			file     : function () { return Ext.ComponentQuery.query('module-sorderworkreport-file')[0] },
		},
		image     : function () { return Ext.ComponentQuery.query('module-sorderworkreport-image')[0] },
	},

	//조회
	selectAction:function() {
		var me = this,
			master	= me.pocket.lister.master(),
			detail	= me.pocket.lister.detail(),
			file	= me.pocket.lister.file(),
			store	= master.getStore(),
			search	= me.pocket.search(),
			param	= search.getValues()
		;
		if(param.invc1_date > param.invc2_date || param.deli1_date > param.deli2_date){
			Ext.Msg.alert("알림","기간을 다시 입력해주시기 바랍니다.");
		}else{
			detail.getStore().clearData();
			detail.getStore().loadData([],false);

			file.getStore().clearData();
			file.getStore().loadData([],false);

			var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask});
			mask.show();

			master.select({
				 callback:function(records, operation, success) {
					if (success) {
					} else { }
					mask.hide();
				}, scope:me
			}, Ext.merge(param, { stor_grp : _global.stor_grp
				}
			));
		}
		store.reload();
	},

	//선택
	selectDetail : function(grid, record ){
		var me = this,
			detail	= me.pocket.lister.detail(),
			file	= me.pocket.lister.file()
		;

		detail.getStore().clearData();
		detail.getStore().loadData([],false);

		file.getStore().clearData();
		file.getStore().loadData([],false);

		if(record.get("work_invc_numb")){
			detail.select({
				 callback:function(records, operation, success) {
					if (success) {

					} else { }
				}, scope:me
			}, { work_invc_numb : record.get('work_invc_numb'),
			});
			file.select({
				callback:function(records, operation, success) {
					if (success) {
					} else { }
				}, scope:me
			}, Ext.merge({
				stor_grp : _global.stor_grp,
				invc_numb: record.get('invc_numb'),
				orgn_dvcd: 'acpt_mast',
				line_seqn: 0,
				uper_seqn: record.get('amnd_degr'),
				file_dvcd_1fst : "3100"
			}));
		}
	},
	selectImage:function(grid, record){
		var me = this,
			image = me.pocket.image()
		;

		image.down('[name=imge_1fst]').setSrc('');
		var reg = new RegExp('\.(jpeg|jpg|gif|png)', 'i')
		if(record.length > 0 && record[0].get('file_name').search(reg)){
			Ext.Ajax.request({
				url		: _global.location.http() + '/custom/aone/sale/order/sordermast/get/image.do',
				params	: {
					token : _global.token_id,
					param : JSON.stringify({
						stor_id			: _global.stor_id,
						hqof_idcd		: _global.hqof_idcd,
						invc_numb		: record[0].get('invc_numb'),
						line_seqn		: record[0].get('line_seqn'),
						assi_seqn		: record[0].get('assi_seqn'),
						uper_seqn		: record[0].get('uper_seqn'),
					})
				},
				async	: false,
				method	: 'POST',
				success	: function(response, request) {
					var result = Ext.decode(response.responseText);
					if	(!result.success ){
						Ext.Msg.error(result.message );
					} else {
						if(result){
							var file_name = result.records[0].file_name;
							if(file_name != undefined){
								var url = _global.img_http+'/'+file_name;
								image.down('[name=imge_1fst]').setSrc(url+'?'+new Date().getTime());    // 브라우저 캐시 변경
								image.down('[name=imge_1fst]').setSrc(url);
							}
						}
					}
				},
				failure : function(result, request) {
				},
				callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
				}
			});
		}
	},

});

