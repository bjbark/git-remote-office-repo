Ext.define('module.custom.sjflv.stock.isos.ostttrntmast.OsttTrntMast', { extend:'Axt.app.Controller',
	requires:[
		'lookup.popup.view.ItemPopup',
		'lookup.popup.view.CstmPopup',
		'lookup.popup.view.CstmDeliPopup',
		'lookup.popup.view.LottPopup',
		'lookup.popup.view.HdcoPopup',
		'lookup.popup.view.HdcoPopup',
		'module.custom.sjflv.stock.isos.ostttrntmast.view.OsttTrntMastSearchPopup',
		'lookup.popup.view.LottPopupSjflv'
	],
	models	: [
		'module.custom.sjflv.stock.isos.ostttrntmast.model.OsttTrntMastMaster1',
		'module.custom.sjflv.stock.isos.ostttrntmast.model.OsttTrntMastDetail1'
	],
	stores	: [
		'module.custom.sjflv.stock.isos.ostttrntmast.store.OsttTrntMastMaster1',
		'module.custom.sjflv.stock.isos.ostttrntmast.store.OsttTrntMastSearchPopup',
		'module.custom.sjflv.stock.isos.ostttrntmast.store.OsttTrntMastDetail1'
	],
	views	: [
		'module.custom.sjflv.stock.isos.ostttrntmast.view.OsttTrntMastLayout',
		'module.custom.sjflv.stock.isos.ostttrntmast.view.OsttTrntMastListerMaster1',
		'module.custom.sjflv.stock.isos.ostttrntmast.view.OsttTrntMastListerDetail1',
		'module.custom.sjflv.stock.isos.ostttrntmast.view.OsttTrntMastSearch',
		'module.custom.sjflv.stock.isos.ostttrntmast.view.OsttTrntMastExcelPopup',
		'module.custom.sjflv.stock.isos.ostttrntmast.view.OsttTrntMastPricPopup',
		'module.custom.sjflv.stock.isos.ostttrntmast.view.OsttTrntMastSerachPopup'
	],
	initPermission : function(workspace, permission) {
		this.callParent([workspace, permission]);
	},
	init: function() {
		var me = this;
		me.control({
			// layout event
			'module-ostttrntmast-layout button[action=selectAction]'			: { click : me.selectAction	},			// 조회
			// master event
			'module-ostttrntmast-lister-master1 button[action=trntInsertAction]': { click : me.trntInsertAction 	}, 	// 운송비 등록
			'module-ostttrntmast-lister-master1 button[action=trntUpdateAction]': { click : me.trntUpdateAction 	}, 	// 운송비 수정
			'module-ostttrntmast-lister-master1 button[action=trntDeleteAction]': { click : me.trntDeleteAction 	}, 	// 운송비 삭제
			'module-ostttrntmast-lister-master1 button[action=trntUploadAction]': { click : me.trntUploadAction 	}, 	// 운송장 업로드
			'module-ostttrntmast-lister-master1 button[action=exportAction]'	: { click : me.exportAction	},			// 엑셀
			// detail event
			'module-ostttrntmast-lister-detail1 button[action=exportAction]'	: { click : me.exportDetailAction	},	// 엑셀

			'module-ostttrntmast-lister-master1' : {
				itemdblclick : me.selectLister1 ,
				selectionchange : me.attachRecord
			}
		});
		me.callParent(arguments);
	},

	pocket  : {
		layout			: function () { return Ext.ComponentQuery.query('module-ostttrntmast-layout') [0] },
		search			: function () { return Ext.ComponentQuery.query('module-ostttrntmast-search') [0] },
		listermaster1	: function () { return Ext.ComponentQuery.query('module-ostttrntmast-lister-master1')[0] },
		listerdetail1	: function () { return Ext.ComponentQuery.query('module-ostttrntmast-lister-detail1')[0] },
	},

	//조회
	selectAction : function() {
		var me = this,
			master1  = me.pocket.listermaster1()
			search  = me.pocket.search(),
			param   = search.getValues(),
			tpanel = me.pocket.layout().down('#mainpanel'),
			tindex = tpanel.items.indexOf(tpanel.getActiveTab())
		;

		if (param.work_strt_dttm1 > param.work_strt_dttm2) {
			Ext.Msg.alert("알림", "조회기간을 다시 입력해주십시오.");
			return;
		}
		var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
		mask.show();

		master1.select({
			callback:function(records, operation, success) {
				if (success) {
					master1.getSelectionModel().select(0);
				} else { }
				mask.hide();
			}, scope:me
		}, Ext.merge( param, {stor_id : _global.stor_id}));
	},

	selectLister1:function( grid, record ){
		var me = this,
			master = me.pocket.listermaster1(),
			detail = me.pocket.listerdetail1(),
			record = master.getSelectionModel().getSelection()[0]
		;
		detail.select({
			 callback : function(records, operation, success) {
					if (success) {
					} else {}
				}, scope : me
		}, { invc_numb : record.get('dlvy_dinv_numb') });
	},

	attachRecord:function( grid, records ){
		var me = this,
			listerdetail1 = me.pocket.listerdetail1()
		;
		listerdetail1.getStore().clearData();
		listerdetail1.getStore().loadData([],false);
	},

	// 엑셀
	exportAction : function(self) {
		this.pocket.listermaster1().writer({enableLoadMask:true});
	},
	// 엑셀 상세
	exportDetailAction : function(self) {
		this.pocket.listerdetail1().writer({enableLoadMask:true});
	},

	// 운송비 등록
	trntInsertAction : function() {
		var me = this,
		    select = undefined
		;

		select = [{data : {
			invc_numb		: "",
			ostt_yorn 		: "1",
			invc_date 		: "",
			cstm_idcd 		: "",
			cstm_name		: "",
			dlvy_cstm_idcd	: "",
			dlvy_cstm_name	: "",
			dlvy_mthd_dvcd	: "",
			hdco_idcd		: "",
			hdco_name		: "",
			dlvy_exps		: "",
			dlvy_taxn_yorn	: "",
			dlvy_memo		: ""
		}}][0];

		me.trntPopupAction(select);
	},

	// 운송비 수정
	trntUpdateAction : function() {
		var me = this,
			master = me.pocket.listermaster1(),
			select = master.getSelectionModel().getSelection();
		;
		if (!select || select.length!=1) {
			Ext.Msg.alert("알림", " 1건을 선택 후 진행하십시오.");
			return;
		}

		me.trntPopupAction(select[0]);
	},

	trntPopupAction : function(select) {
		resource.loadPopup({
			widget : 'module-sjflv-ostttrntmast-pric-popup',
			params : select
		});
	},

	// 운송비 삭제
	trntDeleteAction : function() {
		var me = this,
			master = me.pocket.listermaster1(),
			select = master.getSelectionModel().getSelection();
		;
		if (!select || select.length!=1) {
			Ext.Msg.alert("알림", " 1건을 선택 후 진행하십시오.");
			return;
		}

		Ext.Msg.confirm("확인", "삭제하시겠습니까?", function(button) {
			if (button == 'yes') {
				var mask = new Ext.LoadMask(Ext.getBody(), { msg : Const.DELETE.mask });
				mask.show()

				Ext.Ajax.request({
					url			: _global.api_host_info + '/' + _global.app_site + '/custom/sjflv/stock/ostttrntmast/set/delTrntCost.do',
					method		: "POST",
					params		: {
					 	token	: _global.token_id,
						param	: Ext.encode({
							invc_numb	: select[0].get('invc_numb')
						})
					},
					success	: function(response, request) {
						var result = Ext.decode(response.responseText);
						master.getStore().reload();
						if	(!result.success ){
							Ext.Msg.error(result.message );
							return;
						}
					},
					failure : function(response, request) {
						resource.httpError(response);
					},
					callback : function() {
						mask.hide();
					}
				})
			}
		});
	},

	trntPopupAction : function(select) {
		resource.loadPopup({
			widget : 'module-sjflv-ostttrntmast-pric-popup',
			params : select
		});
	},

	// 운송장 업로드
	trntUploadAction:function(){
		var me		= this
		;
		resource.loadPopup({
			widget : 'module-sjflv-ostttrntmast-excel-popup',
			sample : {
				xtype	: 'button' ,
				text	: '엑셀양식 받기' ,
				iconCls	: Const.FINISH.icon ,
				handler:function(){
					window.open('/resource/sample/삼정_송장_업로드 양식.xlsx','download');
				}
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
	}
});