Ext.define('module.custom.sjflv.sale.sale.noteiomy.NoteIomy', { extend:'Axt.app.Controller',

	requires: [
		'lookup.popup.view.CstmPopup',
		],

	models	: [
		'module.custom.iypkg.stock.isos.sptsmast.model.NoteIomy'
		],
	stores	: [
		'module.custom.sjflv.sale.sale.noteiomy.store.NoteIomyLister',
		'module.custom.sjflv.sale.sale.noteiomy.store.NoteIomyLister2',
		'module.custom.sjflv.sale.sale.noteiomy.store.NoteIomyLister3',
	 	],
	views	: [
		'module.custom.sjflv.sale.sale.noteiomy.view.NoteIomyLayout',
		'module.custom.sjflv.sale.sale.noteiomy.view.NoteIomySearch',
		'module.custom.sjflv.sale.sale.noteiomy.view.NoteIomyLister',
		'module.custom.sjflv.sale.sale.noteiomy.view.NoteIomyLister2',
		'module.custom.sjflv.sale.sale.noteiomy.view.NoteIomyLister3',
		'module.custom.sjflv.sale.sale.noteiomy.view.NoteIomyPopup',
	],
	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
	},


	init: function() {
		var me = this;
		/* 사용자타입에 따라 searchAction()이 유동적으로 움직여야 할 때 사용 >> 현재는 autoLoad 사용 */
		me.control({
			// layout event
			'module-noteiomy-layout #mainpanel'					: { tabchange : me.selectAction		},
			'module-noteiomy-layout button[action=selectAction]' : { click : me.selectAction },	// 조회

			// lister event
			'module-noteiomy-lister button[action=insertAction]' : { click : me.insertAction },	// 등록
			'module-noteiomy-lister button[action=deleteAction]' : { click : me.deleteAction },	// 삭제
			'module-noteiomy-lister button[action=exportAction]' : { click : me.exportAction },// 엑셀

			'module-noteiomy-lister2 button[action=exportAction]' : { click : me.exportAction2 },// 엑셀
			'module-noteiomy-lister3 button[action=exportAction]' : { click : me.exportAction3 },// 엑셀

		});
		me.callParent(arguments);
	},
	pocket :{
		layout : function () { return Ext.ComponentQuery.query('module-noteiomy-layout')[0] },
		search : function () { return Ext.ComponentQuery.query('module-noteiomy-search')[0] },
		lister : function () { return Ext.ComponentQuery.query('module-noteiomy-lister')[0] },
		lister2 : function () { return Ext.ComponentQuery.query('module-noteiomy-lister2')[0] },
		lister3 : function () { return Ext.ComponentQuery.query('module-noteiomy-lister3')[0] },
		popup : function () { return Ext.ComponentQuery.query('module-noteiomy-popup')[0] },
	},


	//조회
	selectAction:function(){
		var me = this,
			lister = me.pocket.lister(),
			lister2 = me.pocket.lister2(),
			lister3 = me.pocket.lister3(),
			tpanel = me.pocket.layout().down('#mainpanel'),
			tindex = tpanel.items.indexOf(tpanel.getActiveTab()),
			search = me.pocket.search(),
			param = search.getValues()
		;
		var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
		mask.show();
		if(tindex==0){
			search.down('[name=row_type]').show();
			lister.select({
				 callback:function(records, operation, success) {
					mask.hide();
				}, scope:me
			}, Ext.merge(me.pocket.search().getValues() , { stor_grp : _global.stor_grp  }));
		}else{
			search.down('[name=row_type]').hide();
			lister2.select({
				 callback:function(records, operation, success) {
					mask.hide();
				}, scope:me
			}, Ext.merge(me.pocket.search().getValues() , { stor_grp : _global.stor_grp  }));
			lister3.select({
				 callback:function(records, operation, success) {
					mask.hide();
				}, scope:me
			}, Ext.merge(me.pocket.search().getValues() , { stor_grp : _global.stor_grp  }));
		}
	},

	insertAction : function() {
		var me = this,
			master = me.pocket.lister()
		;
		var err_msg = "";
		var records = master.getSelectionModel().getSelection();
		if (!records || records.length!=1) {
			Ext.Msg.alert("알림", "입금등록 하려는 목록 1건을 선택 후 진행하십시오.");
			return;
		}

		resource.loadPopup({
			widget : 'module-noteiomy-popup',
		});
		Ext.ComponentQuery.query('#invc_numb')[0].setValue(records[0].data.invc_numb);
		Ext.ComponentQuery.query('#cstm_name')[0].setValue(records[0].data.cstm_name);
		Ext.ComponentQuery.query('#stot_bass')[0].setValue(records[0].data.stot_bass);
		Ext.ComponentQuery.query('#iomy_amnt')[0].setValue(records[0].data.plan_amnt);
		Ext.ComponentQuery.query('#remk_text')[0].setValue(records[0].data.remk_text);
		Ext.ComponentQuery.query('#plan_amnt')[0].setValue(records[0].data.plan_amnt);
	},

	deleteAction:function() {
		var me = this,
			master = me.pocket.lister(),
			select	= me.pocket.lister().getSelectionModel().getSelection()[0],
			store  = master.getStore()
		;

		var err_msg = "";
		var records = master.getSelectionModel().getSelection();


		if (!records || records.length!=1) {
			Ext.Msg.alert("알림", "삭제 하시려는 1건을 선택 후 진행하십시오!");
			return;
		}

		for(var i=0;i <records.length;i++){
			if(records[0].get('iomy_date')== null || records[0].get('iomy_date')==''){
				Ext.Msg.alert("알림","입금이 되어있지 않은 어음입니다. 다시 선택해주십시오.");
				return;
			}
		}

		Ext.Msg.confirm("확인", "삭제하시겠습니까?", function(button) {
			if (button == 'yes') {

				var mask = new Ext.LoadMask(Ext.getBody(), { msg : Const.DELETE.mask });
				mask.show();

				Ext.Ajax.request({
					url			: _global.api_host_info + '/' + _global.app_site + '/custom/sjflv/sale/sale/noteiomy/set/del_yn.do',
					method		: "POST",
					params		: {
					 	token	: _global.token_id,
						param	: Ext.encode({
							invc_numb	: records[0].get('invc_numb')
						})
					},
					success	: function(response, request) {
						var result = Ext.decode(response.responseText);
						master.getStore().reload();
						if	(!result.success ){
							Ext.Msg.error(result.message );
							return;
						} else {
						}
					},
					failure : function(response, request) {
						resource.httpError(response);
					},
					callback : function() {
						mask.hide();
					}
				});
			}
		});
	},



	//엑셀
	exportAction : function(){
		this.pocket.lister().excelExport();
	},

	exportAction2 : function(button){
		this.pocket.lister2().excelExport();
	},

	exportAction3 : function(button){
		this.pocket.lister3().excelExport();
	},
});

