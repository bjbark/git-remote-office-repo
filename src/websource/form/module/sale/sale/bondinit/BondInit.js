Ext.define('module.sale.sale.bondinit.BondInit', {  extend   : 'Axt.app.Controller',

	requires : [
		'lookup.popup.view.CstmPopup',
		'lookup.popup.view.UserPopup',
		'lookup.popup.view.CstmPopup2'
	],
	models	: [
		'module.sale.sale.bondinit.model.BondInit',
	],
	stores	: [
		'module.sale.sale.bondinit.store.BondInit',
	],
	views	: [
		'module.sale.sale.bondinit.view.BondInitLayout',
		'module.sale.sale.bondinit.view.BondInitLister',
		'module.sale.sale.bondinit.view.BondInitExcelPopup',
		'module.sale.sale.bondinit.view.BondInitSearch',
		'module.sale.sale.bondinit.view.FileUpload'

	],
	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
	},
	init: function() {
		var me = this;
		me.control({
			'module-bondinit-layout button[action=selectAction]' : { click : me.selectAction },
			'module-bondinit-lister button[action=uploadAction]'	: { click : me.excelUploadAction }, /* TLB excel*/
			'module-bondinit-lister button[action=updateAction]' : { click : me.updateAction },
			'module-bondinit-lister button[action=cancelAction]' : { click : me.cancelAction },	// 취소
			'module-bondinit-lister button[action=exportAction]' : { click : me.exportAction },
		});
		me.callParent(arguments);
	},
	pocket : {
		layout	: function () { return Ext.ComponentQuery.query('module-bondinit-layout')[0] },
		search	: function () { return Ext.ComponentQuery.query('module-bondinit-search')[0] },
		lister	: function () { return Ext.ComponentQuery.query('module-bondinit-lister')[0] },
	},

	//조회
	selectAction:function(grid, record) {
		var me = this,
			lister = me.pocket.lister(),
			search = me.pocket.search(),
			param = search.getValues(),
			optn_1= me.pocket.search().getValues().optn_1
		;
		var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
		mask.show();
		lister.select({
			callback:function(records, operation, success) {
				if (success) {
				} else {}
				mask.hide();
			}, scope:me
		}, Ext.merge( param, {stor_id : _global.stor_id}) );

	},

	excelUploadAction : function () {
		var me		= this
		;
		// 엑셀 업로드 팝업
		resource.loadPopup({
			widget : 'module-bondinit-excel-popup',
			sample : {
				xtype	: 'button' ,
				text	: '엑셀양식 받기' ,
				iconCls	: Const.FINISH.icon ,
				href	: 'resource/sample/매출채권이월_업로드양식.xlsx'
			},
			params : {
			},
			waitMsg			: '업로드중...',							// upload시 progress bar의 wait message (옵션)
			allowExtension	: ['xls', 'xlsx'],						// 지정하지 않으면 확장자 무제한 (옵션)
			uploadBtnConfig	: {										// upload버튼의 config속성 (속성은 api참고) (옵션)
				text : '엑셀 Upload'
			},
			listeners: {
				close:function(){
				}
			}
		});
	},

	//저장
	updateAction:function() {
		var me   = this,
		lister   = me.pocket.lister(),
		store   = lister.getStore(),
		changes  = lister.getStore().getUpdatedRecords().length,
		change   = lister.getStore().data.items,
		length   = lister.getStore().data.items.length,
		remove   = lister.getStore().removed.length	//삭제유무,
		trns_yymm= me.pocket.search().getValues().trns_yymm,
		check = '0'
	;

		if(length == 0){
			var modify = 'Y';
				cstm_idcd = ' ';
		}else {
			var modify   = change[length-1].get('modify'),		//수정유무
			cstm_idcd    = change[length-1].get('cstm_idcd');	//거래처유무
		}
//		if(modify == 'Y' && cstm_idcd== ''){
//			Ext.Msg.alert("알림","거래처를 반드시 입력해주십시오.");
//		}else{

			if(changes == 0){
				if (modify != 'Y'&& remove == 0) {
					Ext.Msg.alert("알림","변경된 사항이 없습니다.");
				}else{
					if(trns_yymm == null || trns_yymm == ''){
						Ext.Msg.alert("알림","년월을 반드시 입력해주십시오.");
						return;
					}

					for (var a = 0; a < changes; a++) {
						var txbl_amnt = lister.getStore().getUpdatedRecords()[a].data.txbl_amnt;

						lister.getStore().getUpdatedRecords()[a].data.trns_yymm = trns_yymm;

					}

					if(check == '1'){
						Ext.Msg.confirm("확인", "입력한 값들이 모두 0인 경우 해당 내역은 저장되지 않습니다. 계속 진행하시겠습니까?", function(button) {
							if (button == 'yes') {
								var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.UPDATE.mask });
								mask.show();
								var store = lister.getStore();
								lister.getStore().sync({
									success : function(operation){ me.selectAction();},
									failure : function(operation){ },
									callback: function(operation){
										mask.hide();
									}
								});
							}
						});
					}else{
						var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.UPDATE.mask });
						mask.show();
						var store = lister.getStore();
						lister.getStore().sync({
							success : function(operation){ me.selectAction();},
							failure : function(operation){ },
							callback: function(operation){
								mask.hide();
							}
						});
					}
				}
			}else {
				if(trns_yymm == null || trns_yymm == ''){
					Ext.Msg.alert("알림","년월을 반드시 입력해주십시오.");
					return;
				}

				for (var a = 0; a < changes; a++) {
					var txbl_amnt = lister.getStore().getUpdatedRecords()[a].data.txbl_amnt;

					lister.getStore().getUpdatedRecords()[a].data.trns_yymm = trns_yymm;
				}

				if(check == '1'){
					Ext.Msg.confirm("확인", "입력한 값들이 모두 0인 경우 해당 내역은 저장되지 않습니다. 계속 진행하시겠습니까?", function(button) {
						if (button == 'yes') {
							var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.UPDATE.mask });
							mask.show();
							var store = lister.getStore();
							lister.getStore().sync({
								success : function(operation){ me.selectAction();},
								failure : function(operation){ },
								callback: function(operation){
									mask.hide();
								}
							});
						}
					});
				}else{
					var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.UPDATE.mask });
					mask.show();
					var store = lister.getStore();
					lister.getStore().sync({
						success : function(operation){ me.selectAction();},
						failure : function(operation){ },
						callback: function(operation){
							mask.hide();
						}
					});
				}
			}
//		}
	},

	cancelAction : function() {
		var	me = this,
			tpanel = me.pocket.layout().down('#mainpanel'),
			tindex = tpanel.items.indexOf(tpanel.getActiveTab()),
			lister = me.pocket.lister()
		;

		lister.getStore().reload();
	},

	//엑셀
	exportAction : function(button){
		var value = button.button ;
		this.pocket.lister().writer({enableLoadMask:true});
	}
});

