Ext.define('module.mtrl.po.purcstokwork.PurcStokWork', { extend:'Axt.app.Controller',
	requires:[
		'lookup.popup.view.WrhsPopup',
		'lookup.popup.view.BasePopup',
	],
	models	: [
		'module.mtrl.po.purcstokwork.model.PurcStokWorkLister'
	],
	stores	: [
		'module.mtrl.po.purcstokwork.store.PurcStokWorkLister'
	],
	views	: [
		'module.mtrl.po.purcstokwork.view.PurcStokWorkLayout',
		'module.mtrl.po.purcstokwork.view.PurcStokWorkLister',
		'module.mtrl.po.purcstokwork.view.PurcStokWorkSearch'
	],
	initPermission : function(workspace, permission) {
		this.callParent([workspace, permission]);
	},
	init: function() {
		var me = this;
		me.control({
			// layout event
			'module-purcstokwork-layout button[action=selectAction]'		: { click : me.selectAction	},		// 조회
			// lister master
			'module-purcstokwork-lister-master' : {
				selectionchange	: me.attachRecord
			},
			// lister event
			'module-purcstokwork-lister button[action=orderAction]'  : { click : me.orderAction	},		// 발주요청
			'module-purcstokwork-lister button[action=exportAction]' : { click : me.exportAction},		// 엑셀
		});
		me.callParent(arguments);
	},
	pocket  : {
		layout		: function () { return Ext.ComponentQuery.query('module-purcstokwork-layout') [0] },
		search		: function () { return Ext.ComponentQuery.query('module-purcstokwork-search') [0] },
		lister		: function () { return Ext.ComponentQuery.query('module-purcstokwork-lister')[0] },
		listermaster: function () { return Ext.ComponentQuery.query('module-purcstokwork-lister-master')[0] },
		listerdetail: function () { return Ext.ComponentQuery.query('module-purcstokwork-lister-detail')[0] },

	},

	//조회
	selectAction : function() {
		var me = this,
			lister	= me.pocket.lister(),
			search	= me.pocket.search(),
			select	= me.pocket.lister().getSelectionModel().getSelection()[0],
			param	= search.getValues()
		;
		if(param.invc1_date == ''|| param.invc2_date == '') {
			Ext.Msg.alert("알림","조회기간을 입력해주십시오.");
		}else if(param.invc1_date>param.invc2_date) {
			Ext.Msg.alert("알림","조회기간을 다시 입력해주십시오.");
		} else {
			var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
			mask.show();
			lister.select({
				callback:function(records, operation, success) {
					if (success) {
					} else { }
					mask.hide();
				}, scope:me
			}, Ext.merge( param, {stor_id : _global.stor_id}) );
		}
	},

	attachRecord:function( smodel, record ){
		var me	= this,
		listermaster= smodel ? smodel.view.ownerCt : me.pocket.listermaster(),
		record		= record ? record[0] : listermaster.getSelectionModel().getSelection()[0]
		;
		me.pocket.listerdetail().eraser() ;
		if (record) {
		}
	},

	//발주요청
	orderAction : function() {
		var me = this,
			lister	= me.pocket.lister(),
			select	= me.pocket.lister().getSelectionModel().getSelection()[0],
			selects	= me.pocket.lister().getSelectionModel().getSelection(),
			search	= me.pocket.search(),
			store	= lister.getStore(),
			changes = lister.getStore().getUpdatedRecords().length,
			new_invc_numb, new_line_seqn,
			param	= search.getValues(),
			tpanel = me.pocket.layout().down('#mainpanel'),
			err_msg = ""
		;
		Ext.each(selects, function(record) {
			console.log(record.get("rqst_offr_qntt"));
			if(record.get("rqst_offr_qntt") < 0 || record.get("rqst_offr_qntt") == 0){
				err_msg = "발주수량을 확인해주십시오.";
				record.set("rqst_offr_qntt", 0);
				return false;
			}
		});
			if (err_msg != "") {
				Ext.Msg.alert("알림", err_msg);
				return;
			}
		Ext.each(select, function(record) {
			record.set('modify', 'y');
		});
		Ext.Msg.confirm("확인", "발주요청을 하시겠습니까?", function(button) {
			if (button == 'yes') {
				Ext.Ajax.request({
					url			: _global.location.http() + '/mtrl/po/purcstokwork/get/invc.do',
					params		: {
						token	: _global.token_id ,
						param	: JSON.stringify({
							stor_id		: _global.stor_id,
							table_nm	: 'purc_trst_mast'
						})
					},
					async	: false,
					method	: 'POST',
					success	: function(response, request) {
						var result = Ext.decode(response.responseText);
						new_invc_numb = result.records[0].seq;
					}
				});
				var x = 1;	//순번
				for (var a = 0; a < changes; a++) {
					lister.getStore().getUpdatedRecords()[a].data.new_line_seqn = x++;
					lister.getStore().getUpdatedRecords()[a].data.new_invc_numb = new_invc_numb;
				}

				var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.UPDATE.mask });
				mask.show();
				var store = lister.getStore();
				lister.getStore().sync({
					success : function(operation){
						tpanel.items.indexOf(tpanel.setActiveTab(1));
						search.getForm().reset(true);
						store.clearData();
						store.removeAll();
					},
					failure : function(operation){ },
					callback: function(operation){
						mask.hide();
						store.reload();
						}
					}
			);
			}
		})
	},

	// 엑셀
	exportAction : function() {
		this.pocket.lister().writer({enableLoadMask:true});
	}
});