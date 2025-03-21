Ext.define('module.qc.insp.inspentry51.InspEntry51', { extend:'Axt.app.Controller',

	requires : [
		'lookup.popup.view.WrhsPopup',
		'lookup.popup.view.CstmPopup',
		'lookup.popup.view.InspTypePopup',
		'lookup.popup.view.UserPopup',
		'lookup.popup.view.ItemPopup',
		'lookup.popup.view.ItemClassPopup',
		'lookup.popup.view.UnitPopup',
		'lookup.popup.view.WkctPopup',
		'lookup.popup.view.CvicPopup',
		'lookup.popup.view.MoldPopup',
	],

	models:[
		'module.qc.insp.inspentry51.model.InspEntry51Lister1',
		'module.qc.insp.inspentry51.model.InspEntry51Lister2',
		'module.qc.insp.inspentry51.model.InspEntry51Detail',
		'module.qc.insp.inspentry51.model.InspEntry51Popup'
	],
	stores:[
		'module.qc.insp.inspentry51.store.InspEntry51Lister1',
		'module.qc.insp.inspentry51.store.InspEntry51Lister2',
		'module.qc.insp.inspentry51.store.InspEntry51Detail',
		'module.qc.insp.inspentry51.store.InspEntry51Popup'
	],
	views:
	[
		'module.qc.insp.inspentry51.view.InspEntry51Layout',
		'module.qc.insp.inspentry51.view.InspEntry51Search',
		'module.qc.insp.inspentry51.view.InspEntry51Popup',
		'module.qc.insp.inspentry51.view.InspEntry51Lister1',
		'module.qc.insp.inspentry51.view.InspEntry51Lister2',
		'module.qc.insp.inspentry51.view.InspEntry51Detail'
	],
	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
	},

	init: function() {
		var me = this;
		me.control({
			// layout event
			'module-inspentry51-layout button[action=selectAction]'		: { click : me.selectAction },	// 조회
			'module-inspentry51-layout #mainpanel'	: { tabchange : me.selectAction },
			// lister event
			'module-inspentry51-lister1 button[action=insertAction]'	: { click : me.insertAction },			// 검사실적등록
			'module-inspentry51-lister1 button[action=exportAction]'	: { click : me.exportLister1Action	},	// 엑셀
			'module-inspentry51-lister2 button[action=exportAction]'	: { click : me.exportLister2Action	},	// 엑셀
			// detail event
			'module-inspentry51-detail button[action=updateAction]'		: { click : me.updateAction },	// 저장
			// lister event
			'module-inspentry51-lister1' : {
				itemdblclick      : me.selectDetail,
				selectionchange   : me.selectRecord,												// 메뉴 선택시 이벤트
			}

		});
		me.callParent(arguments);
	},
	pocket :
		{
		layout : function () { return Ext.ComponentQuery.query('module-inspentry51-layout')[0] },
		search : function () { return Ext.ComponentQuery.query('module-inspentry51-search')[0] },
		lister1 : function () { return Ext.ComponentQuery.query('module-inspentry51-lister1')[0] },
		lister2 : function () { return Ext.ComponentQuery.query('module-inspentry51-lister2')[0] },
		detail : function () { return Ext.ComponentQuery.query('module-inspentry51-detail')[0] }
		},


	//조회
	selectAction:function(callbackFn)
		{
		var me = this,
			lister1 = me.pocket.lister1(),
			lister2 = me.pocket.lister2()
		;

		var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask});
		mask.show();
		lister1.select({
			 callback:function(records, operation, success) {
				if (success) {
					lister1.getSelectionModel().select(0);
				} else {
				}
				mask.hide();
			}, scope:me
		}, Ext.merge(me.pocket.search().getValues(), { stor_grp : _global.stor_grp }));

		lister2.select({
			 callback:function(records, operation, success) {
				if (success) {
					lister2.getSelectionModel().select(0);
				} else {
				}
				mask.hide();
			}, scope:me
		}, Ext.merge(me.pocket.search().getValues(), { stor_grp : _global.stor_grp }));

	},

	selectRecord:function( grid, records ){
		var me = this,
			detail = me.pocket.detail()
		;
		detail.getStore().clearData();
		detail.getStore().loadData([],false);
	},


	//선택
	selectDetail : function(grid, record) {
		var me = this,
			detail	= me.pocket.detail(),
			param	= me.pocket.search().getValues(),
			lister	= me.pocket.lister1(),
			record	= lister.getSelectionModel().getSelection()[0]
		;
		if (record) {
			var mask = new Ext.LoadMask(Ext.getBody(), { msg : Const.SELECT.mask });
			mask.show();
			detail.select({
				 callback : function(records, operation, success) {
					if (success) {
						detail.getSelectionModel().select(0);
					} else {}
					mask.hide();
				}, scope : me
			},{	pjod_idcd : record.get('pjod_idcd')
			});
		}
	},

	//검사실적등록
	insertAction:function() {
		var me  = this,
			lister		= me.pocket.lister1() ,
			select		= lister.getSelectionModel().getSelection(),
			popup		= Ext.ComponentQuery.query('module-inspentry51-popup')[0],
			detail		= me.pocket.detail(),
			detalis		= detail.getSelectionModel().getSelection(),
			invc_numb
			acpt_numb
			record = select[0]
		;
		var records	= lister.getSelectionModel().getSelection();

		if(select.length == 0){
			Ext.Msg.alert("알림","출고검사할 항목을 선택해주십시오.");
		}else
			if(detalis.length == 1){
				Ext.Msg.show({ title: '알림', msg: '출고검사항목내에서 수정하십시오.', icon: Ext.Msg.INFO, buttons: Ext.Msg.YES, defaultFocus: 'yes', scope: me });
			}else{	var acpt_numb = records[0].get('pjod_idcd');
					Ext.Ajax.request({
						url : _global.location.http() + '/listener/seq/maxid.do',
						object		: resource.keygen,
						params		: {
						token		: _global.token_id ,
						param		: JSON.stringify({
						stor_id		: _global.stor_id,
						table_nm	: 'ostt_insp',
						invc_numb	: invc_numb,
						acpt_numb	: select.acpt_numb
					})
				},
				async		: false,
				success		: function(response, request) {
					var result	= Ext.decode(response.responseText);
					invc_numb	= result.records[0].seq;
				},
				failure : function(response, request) {
					resource.httpError(response);
				},
				callback : function() {
				}
			});
			var me = this
			resource.loadPopup({
				widget : 'module-inspentry51-popup',
				params : {
					invc_numb		: invc_numb,
					acpt_numb		: records[0].data.pjod_idcd,
				},
				result : function(result) {
				}
			})
		}
	},

	//detail 저장
	updateAction : function() {
		var me = this,
		detail = me.pocket.detail(),
		changes = detail.getStore().getUpdatedRecords().length
	;
		if (changes == 0) {
			Ext.Msg.alert("알림","변경된 사항이 없습니다.");
		} else {
			var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.UPDATE.mask });
			mask.show();
			var store = detail.getStore();
			store.sync({
				success : function(operation){ },
				failure : function(operation){ },
				callback: function(operation){
					mask.hide();
					store.reload();
				}
			});
		}
	},

	//엑셀
	exportLister1Action : function(self) {
		this.pocket.lister1().writer({enableLoadMask:true});
	},
	exportLister2Action : function(self) {
		this.pocket.lister2().writer({enableLoadMask:true});
	},

});
